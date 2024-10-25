import { useState, useEffect } from "react";
import Cookies from 'js-cookie';

import { Switch } from "@/components/ui/switch";
import { Card } from "@/components/ui/card";

import updateData from "@/lib/utils/updateData";

export type ProductListProps = {
  products: Product[];
}

export type Product = {
  product: string;
  state: "active" | "inactive";
  owner: string;
}

function ProductList({ products }: ProductListProps) {

  const [ productList, setProductList] = useState(products);
  const switchProductState = async (product: Product) => {

    const userCookie = Cookies.get('IBAUTH');
    if (userCookie) {
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
        console.log(`Successfully updated product ${product.product} to ${newState}`);
      } catch (error) {
        console.error(`Failed to update product ${product.product}`, error);
        
        setProductList(prevProducts => 
          prevProducts.map(p => p.product === product.product ? { ...p, state: product.state, owner: newOwner } : p)
        );
      }
    } else {
      return;
    }
  };

  useEffect(() => {
    const eventSource = new EventSource('https://products-switcher-api.onrender.com/events');

    eventSource.onmessage = (event) => {
      const updatedProducts = JSON.parse(event.data);
      setProductList(updatedProducts); // Update the product list
    };

    // Clean up the connection when component unmounts
    return () => {
      eventSource.close();
    };
  }, []);

  return (
    (<Card className='flex flex-col'>
      <h2 className="my-4">All products</h2>
      <ul>
        {productList.map((product) => (
          <li key={product.product} className="m-2">
            <Card className={`flex items-center justify-between px-3 py-2 ${product.state === 'active' && "bg-red-200"}`}>
              <span>{product.product}</span>
              <Switch 
                className="ml-2" 
                checked={product.state === 'active'} 
                onCheckedChange={() => switchProductState(product)}
              />
            </Card>
          </li>
        ))}
      </ul>
    </Card>)
  );
}

export default ProductList