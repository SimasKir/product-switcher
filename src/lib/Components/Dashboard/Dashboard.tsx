import Cookies from 'js-cookie';
import { useEffect, useContext } from 'react';
import ProductList from './ProductList';
import TakenProducts from './TakenProducts';
import { DataContext } from '@/lib/Context/DataContext';

function Dashboard() {

    const { products, fetchProductsData } = useContext(DataContext) as { products: any, fetchProductsData: () => Promise<any> };
  
    useEffect(() => {
      fetchProductsData();
    }, []);

    const userCookie = Cookies.get('IBAUTH');

    return (
        <div className='container mx-auto h-screen'>
            { userCookie ? <h1 className='my-4'>Hello, {userCookie}</h1> : <h1 className='my-4'>Error logging in</h1> }
            <div className="grid grid-cols-2 gap-4">
              {products ? (
                <ProductList products={products} />
              ) : (
                <p>Loading products...</p>
              )}
              {products ? (
                  
                  <TakenProducts products={products}/>
              ) : (
                <p>Loading products...</p>
              )}
            </div>

            
        </div>
    );
}

export default Dashboard;
