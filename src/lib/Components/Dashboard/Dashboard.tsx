import Cookies from 'js-cookie';
import { useEffect, useContext } from 'react';
import ProductList from './ProductList';
import TakenProducts from './TakenProducts';
import { DataContext } from '@/lib/Context/DataContext';
import Comments from './Comments';

function Dashboard() {

    const { products, fetchProductsData, comments, fetchCommentsData } = useContext(DataContext) as { products: any, comments:any, fetchProductsData: () => Promise<any>, fetchCommentsData: () => Promise<any> };
  
    useEffect(() => {
      fetchProductsData();
      fetchCommentsData();
    }, []);

    console.log(comments);

    const userCookie = Cookies.get('IBAUTH');

    return (
        <div className='container mx-auto h-screen'>
            { userCookie ? <h1 className='my-4'>Hello, {userCookie}</h1> : <h1 className='my-4'>Error logging in</h1> }
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 px-4 mb-4">
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
            <div className="grid grid-cols-1 px-4">
              <Comments comments={comments}/>
            </div>
            
        </div>
    );
}

export default Dashboard;
