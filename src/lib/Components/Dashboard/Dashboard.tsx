import Cookies from 'js-cookie';
import { useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import ProductList from './ProductList';
import TakenProducts from './TakenProducts';
import { DataContext } from '@/lib/Context/DataContext';
import Comments from './Comments';
import { Toaster } from "@/components/ui/toaster"
import { Skeleton } from "@/components/ui/skeleton"

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

    return (
      <div className="bg-gradient-to-tl from-ib-dark from-60% to-ib-secondary">
        <div className='container mx-auto min-h-screen'>
          <div className="grid grid-cols-1 px-4">
            { userCookie ? <h1 className='py-4 text-left text-ib-light text-4xl lg:text-5xl font-black'>Hello, {userCookie}!</h1> : <h1 className='my-4'>Error logging in</h1> }
          </div>
          <div className="grid grid-cols-1 px-4 mb-4">
            {products.length > 0 ? (
              <ProductList products={products} />
            ) : (
              <Skeleton className="w-full h-full rounded-xl bg-white/10">
                <h2 className="my-4 text-ib-light font-black uppercase">Loading products...</h2>
              </Skeleton>          
            )}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 px-4">
            {comments.length > 0 ? (
              <Comments comments={comments} />
            ) : (
              <Skeleton className="w-full h-full rounded-xl bg-white/10 animate-none">
                <h2 className="my-4 text-ib-light font-black uppercase">Comments</h2>
              </Skeleton> 
            )}
            {products.length > 0 ? (
              <TakenProducts products={products} />
            ) : (
              <Skeleton className="w-full h-full rounded-xl bg-white/10 animate-none">
                <h2 className="my-4 text-ib-light font-black uppercase">Active products</h2>
              </Skeleton>
            )}
            <Toaster/>
          </div>  
        </div>
      </div>
    );
}

export default Dashboard;
