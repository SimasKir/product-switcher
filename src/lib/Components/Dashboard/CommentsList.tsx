import Cookies from 'js-cookie';
import { useEffect, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { DataContext } from '@/lib/Context/DataContext';

import { Card } from "@/components/ui/card";
import { Button } from '@/components/ui/button';
// import { Button } from '@/components/ui/button';

function CommentsList() {

    const navigate = useNavigate();

    const userCookie = Cookies.get('IBAUTH');

    useEffect(() => {
      console.log(userCookie);
      !userCookie && navigate('/');
    }, []);

    const { comments, fetchCommentsData } = useContext(DataContext) as { products: any, comments:any, fetchProductsData: () => Promise<any>, fetchCommentsData: () => Promise<any> };
  
    useEffect(() => {
      fetchCommentsData();
    }, []);

    const [commentsList, setCommentsList] = useState(comments);

    useEffect(() => {
      if (comments) {
        setCommentsList(comments);
      }
    }, [comments]);

    useEffect(() => {
      const eventSource = new EventSource('https://products-switcher-api.onrender.com/events-comments');
    
      eventSource.onmessage = (event) => {
        const newComment = JSON.parse(event.data);
        setCommentsList(newComment);
      };
    
      return () => {
        eventSource.close();
      };
    }, []);

    return (
      <div className="bg-gradient-to-tl from-ib-dark from-60% to-ib-secondary">
        <div className='container mx-auto min-h-screen'>
          <Card className='flex flex-col bg-white/10 border-none relative'>
          <h2 className="my-4 text-ib-light font-black uppercase">Comments</h2>
          <ul>
            {commentsList && commentsList.map((comment: string, index: any) => (
              <li key={index} className="m-2">
                  <Card className="flex items-center justify-between px-3 py-2 border-none bg-white/20 text-ib-light">
                    <span>{comment}</span>
                  </Card>
              </li>
            ))}
          </ul>
          <Button className="m-2" variant="outline" onClick={() => navigate('/dashboard')}>Back to Dashboard</Button>
        </Card>  
        </div>
      </div>
    );
}

export default CommentsList;
