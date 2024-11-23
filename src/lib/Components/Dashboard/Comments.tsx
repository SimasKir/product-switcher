import { useState, useEffect } from "react";

import { Card } from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import deleteComments from "@/lib/utils/deleteComments";
import { useNavigate } from "react-router-dom";
import { setCookie } from "../Login/Form";
import Cookies from 'js-cookie';

type CommentsListProps = {
    comments: string[];
  };
function Comments({ comments }: CommentsListProps) {

  const [ commentsList, setCommentsList] = useState(comments);

  const userCookie = Cookies.get('IBAUTH');

  const navigate = useNavigate();

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

  const flushComments = async () => {
    try {
      await deleteComments('https://products-switcher-api.onrender.com/comments');
    } catch (error) {
      console.error('Failed to flush comments', error);
    }
  }

  const showFullComments = () => {
    if (userCookie) {
      setCookie(userCookie);
      navigate('/comments');
    }
  }

  return (
    <Card className='flex flex-col bg-white/10 border-none relative'>
      <div className="absolute top-[6px] left-[6px]" onClick={() => showFullComments()}>
        <img className="h-[40px]" src="/assets/plus-circle.svg"/>
      </div>
      <h2 className="my-4 text-ib-light font-black uppercase">Comments</h2>
      <ul>
      {commentsList.slice(-10).map((comment, index) => (
        <li key={index} className={`m-2${index === 0 && commentsList.length === 2 ? ' opacity-75' : ''}${index === 0 && commentsList.length === 3 ? ' opacity-50' : ''}${index === 0 && commentsList.length > 3 ? ' opacity-25' : ''}${index === 1 && commentsList.length === 3 ? ' opacity-75' : ''}${index === 1 && commentsList.length > 3 ? ' opacity-50' : ''}${index === 2 && commentsList.length > 3 ? ' opacity-75' : ''}`}>
            <Card className="flex items-center justify-between px-3 py-2 border-none bg-white/20 text-ib-light">
            <span>{comment}</span>
            </Card>
      </li>
)
)}
      </ul>
      <Button className="m-2" variant="outline" onClick={() => flushComments()}>Flush comments</Button>
    </Card>
  );
}

export default Comments;