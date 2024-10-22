
import { ProductListProps, Product } from "./ProductList";
import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";

const TakenProducts = ({ products }: ProductListProps) => {

    const inactiveProducts = products.filter((product : Product) => product.state === 'active');

    const [ productList, setProductList] = useState(inactiveProducts);

    useEffect(() => {
        const eventSource = new EventSource('https://products-switcher-api.onrender.com/events');
    
        eventSource.onmessage = (event) => {
          const updatedProducts = JSON.parse(event.data);
          const inactiveProducts = updatedProducts.filter((product : Product) => product.state === 'active');
          setProductList(inactiveProducts); // Update the product list
        };
    
        return () => {
          eventSource.close();
        };
      }, []);

      console.log(productList);
    

    return (
        <Card className='flex flex-col'>
            <h2 className="my-4">Active products</h2>
            <ul>
                {productList && productList.map((product) => (
                    <li key={product.product} className="m-2">
                        <Card className="flex items-center justify-between px-3 py-2">
                            <span>{product.product}</span>
                            <span>{product.owner !== "none" && product.owner}</span>
                        </Card>
                    </li>
                ))}
            </ul>
        </Card>
    )
}

export default TakenProducts;

