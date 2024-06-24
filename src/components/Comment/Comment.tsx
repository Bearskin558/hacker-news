import { useEffect, useState } from 'react';

type Comment = {
  text: string;
  kids: number[];
  by: string;
};

const Comment = ({ id }: { id: number }) => {
  const [comment, setComment] = useState<Comment>();
  const url = import.meta.env.VITE_BASE_URL;

  useEffect(() => {
    const fetchComment = async () => {
      try {
        const response = await fetch(url + `item/${id}.json`);
        const responseComment = await response.json();
        setComment(responseComment);
      } catch (error) {
        console.log(error);
      }
    };
    fetchComment();
  }, []);

  return (
    <div>
      <p>Author: {comment?.by}</p>
      <p>{comment?.text}</p>
    </div>
  );
};

export default Comment;
