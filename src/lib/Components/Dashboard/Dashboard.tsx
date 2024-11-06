import Cookies from 'js-cookie';
import { useEffect, useContext, Suspense } from 'react';
import { useNavigate } from 'react-router-dom';
import ProductList from './ProductList';
import TakenProducts from './TakenProducts';
import { DataContext } from '@/lib/Context/DataContext';
import Comments from './Comments';
import { Button } from '@/components/ui/button';
import deleteComments from '@/lib/utils/deleteComments';

function Dashboard() {

    const navigate = useNavigate();

    const userCookie = Cookies.get('IBAUTH');

    useEffect(() => {
      !userCookie && navigate('/');
    }, []);

    const { products, fetchProductsData, comments, fetchCommentsData } = useContext(DataContext) as { products: any, comments:any, fetchProductsData: () => Promise<any>, fetchCommentsData: () => Promise<any> };
  
    useEffect(() => {
      fetchProductsData();
      fetchCommentsData();
    }, []);

    const flushComments = async () => {
      try {
        await deleteComments('https://products-switcher-api.onrender.com/comments');
      } catch (error) {
        console.error('Failed to flush comments', error);
      }
    }

    return (
        <div className='container mx-auto h-screen'>
            { userCookie ? <h1 className='my-4'>Hello, {userCookie}</h1> : <h1 className='my-4'>Error logging in</h1> }
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 px-4 mb-4">
              <Suspense fallback={<p>Loading products...</p>}>
                <ProductList products={products} />
              </Suspense>
              <Suspense fallback={<p>Loading products...</p>}>
                <TakenProducts products={products}/>
              </Suspense>
            </div>
            <div className="grid grid-cols-1 px-4">
              <Comments comments={comments}/>
              <Button variant="outline" onClick={() => flushComments()}>Flush comments</Button>
            </div>
            
        </div>
    );
}

export default Dashboard;
