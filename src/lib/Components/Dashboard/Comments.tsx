import { useState, useEffect } from "react";

import { Card } from "@/components/ui/card";

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

  return (
    (<Card className='flex flex-col'>
      <h2 className="my-4">Comments</h2>
      <ul>
      {commentsList.map((comment, index) => (
        <li key={index} className="m-2">
        <Card className="flex items-center justify-between px-3 py-2">
          <span>{comment}</span>
        </Card>
      </li>
)
)}
      </ul>
    </Card>)
  );
}

export default CommentsList;