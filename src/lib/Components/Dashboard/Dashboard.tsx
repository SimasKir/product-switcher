import Cookies from 'js-cookie';
import { useEffect, useState, useCallback } from 'react';
import getData from '@/lib/utils/getData';
import ProductList from './ProductList';

function Dashboard() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<null | Error>(null);

    const fetchProducts = useCallback(async () => {
        try {
          const productsResponse = await getData('https://products-switcher-api.onrender.com/json');
          setProducts(productsResponse ?? []);
        } catch (error) {
          setError(error as Error);
        } finally {
          setLoading(false);
        }
      }, []);
    
      useEffect(() => {
        fetchProducts();
      }, [fetchProducts]);


    const userCookie = Cookies.get('IBAUTH');

    console.log(products);

    return (
        <>
            { userCookie ? <h1>Hello, {userCookie}</h1> : <h1>Error logging in</h1> }

            {loading ? (
                <p>Loading products...</p>
            ) : error ? (
                <p>{error?.message}</p>
            ) : (
                <ProductList products={products} />
            )}
        </>
    );
}

export default Dashboard;
