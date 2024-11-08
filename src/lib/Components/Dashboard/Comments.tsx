import { useState, useEffect } from "react";

import { Card } from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import deleteComments from "@/lib/utils/deleteComments";

type CommentsListProps = {
    comments: string[];
  };
function CommentsList({ comments }: CommentsListProps) {

  const [ commentsList, setCommentsList] = useState(comments);

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

  return (
    <Card className='flex flex-col bg-white/10 border-none'>
      <h2 className="my-4 text-ib-light font-black uppercase">Comments</h2>
      <ul>
      {commentsList.map((comment, index) => (
        <li key={index} className="m-2">
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

export default CommentsList;