import { useState, useEffect } from "react";
import Cookies from 'js-cookie';
import { useToast } from "@/hooks/use-toast"

import { Switch } from "@/components/ui/switch";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Clip from "./Clip";

import updateData from "@/lib/utils/updateData";
import updateComments from "@/lib/utils/updateComments";
import { ProductListProps, brandLisType, Product } from "@/lib/utils/Types";

function ProductList({ products }: ProductListProps) {

  const [ productList, setProductList] = useState<Product[]>(products);
  const [ brands, setBrands ] = useState<brandLisType>([]);

  const userCookie = Cookies.get('IBAUTH');

  const { toast } = useToast()

  useEffect(() => {
    if (products) {
      setProductList(products);

      const brands = new Set(products.map(product => product.brand));
      setBrands([...brands]);
    }
  }, [products]);

  const switchProductState = async (product: Product) => {

    if (userCookie && typeof userCookie === "string" && (product.owner === userCookie || product.owner === "none")) {
      const newState = product.state === "active" ? "inactive" : "active";
    
      const newOwner = product.state === "active" ? "none" : userCookie;
      
      setProductList(prevProducts => 
        prevProducts.map(p => p.product === product.product ? { ...p, state: newState, owner: newOwner } : p)
      );
  
      try {
        await updateData('https://products-switcher-api.onrender.com/json', {
          product: product.product,
          state: newState,
          owner: newOwner
        });

        await updateComments('https://products-switcher-api.onrender.com/comments', {
          comment: `${product.brand} ${product.product} set to ${newState} by ${userCookie}`
        });
      } catch (error) {
        console.error(`Failed to update product ${product.product}`, error);
        
        setProductList(prevProducts => 
          prevProducts.map(p => p.product === product.product ? { ...p, state: product.state, owner: newOwner } : p)
        );
      }
    } else {
      toast({
        title: `${product.brand} ${product.product} can only be updated by owner`,
      })
      return;
    }
  };

  useEffect(() => {
    const eventSource = new EventSource('https://products-switcher-api.onrender.com/events');

    eventSource.onmessage = (event) => {
      const updatedProducts = JSON.parse(event.data);
      setProductList(updatedProducts);
    };

    return () => {
      eventSource.close();
    };
  }, []);

  return (
    (<Card className='flex flex-col bg-white/10 border-none'>
      <h2 className="my-4 text-ib-light font-black uppercase">All products</h2>
      <Tabs defaultValue="TRUMETA">
        <TabsList className="w-full bg-transparent">
          {brands.map((brand) => (
            <TabsTrigger className="text-white" value={brand} key={brand}>{brand}</TabsTrigger>
          ))}
        </TabsList>
        {brands.map((brand) => (
          <TabsContent value={brand} key={brand}>
            {productList.filter(product => product.brand === brand).map(product => (
              <Card key={product.product} className={`flex items-center justify-between px-3 py-2 m-2 bg-white/10 text-ib-light border-none ${product.state === 'active' && "ring-2 ring-ib-light ring-inset" }`}>
                <span>{product.product}</span>
                <div className="flex flex-row">
                  {(product.owner === userCookie) && 
                    <Clip text={product.repo}/>
                  }
                  <Switch 
                    className="ml-2" 
                    checked={product.state === 'active'} 
                    onCheckedChange={() => switchProductState(product)}
                  />
                </div>
            </Card>
            ))}
          </TabsContent>
        ))}
      </Tabs>
    </Card>)
  );
}

export default ProductList