import { useState, useEffect } from "react";

import { Switch } from "@/components/ui/switch";
import { Card } from "@/components/ui/card";

import updateData from "@/lib/utils/updateData";

type ProductListProps = {
  products: Product[];
}

type Product = {
  product: string;
  state: "active" | "inactive";
}

function ProductList({ products }: ProductListProps) {

  const [ productList, setProductList] = useState(products);

  const switchProductState = async (product: Product) => {
    const newState = product.state === "active" ? "inactive" : "active";
    
    setProductList(prevProducts => 
      prevProducts.map(p => p.product === product.product ? { ...p, state: newState } : p)
    );

    try {
      await updateData('https://products-switcher-api.onrender.com/json', {
        product: product.product,
        state: newState,
      });
      console.log(`Successfully updated product ${product.product} to ${newState}`);
    } catch (error) {
      console.error(`Failed to update product ${product.product}`, error);
      
      setProductList(prevProducts => 
        prevProducts.map(p => p.product === product.product ? { ...p, state: product.state } : p)
      );
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
    <div className='flex '>
      <ul>
        {productList.map((product) => (
          <li key={product.product}>
            <Card className="flex items-center justify-between px-3 py-2">
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
    </div>
  )
}

export default ProductList