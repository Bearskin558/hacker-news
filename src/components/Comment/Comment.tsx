import { useEffect, useState } from 'react';

import styles from './Comment.module.css';

type Comment = {
  text: string;
  kids: number[];
  by: string;
  id: number;
};

const isCorrect = (comment: unknown): comment is Comment => {
  return (
    comment !== null &&
    typeof comment === 'object' &&
    'text' in comment &&
    'kids' in comment &&
    'by' in comment
  );
};

const Comment = ({ id }: { id: number }) => {
  const [comment, setComment] = useState<Comment>();
  const [childComments, setChildComments] = useState<Comment[]>([]);
  const url = import.meta.env.VITE_BASE_URL;

  useEffect(() => {
    const fetchComment = async () => {
      try {
        const response = await fetch(url + `item/${id}.json`);
        const responseComment = await response.json();
        if (isCorrect(responseComment)) {
          setComment(responseComment);
          if (responseComment.kids.length) {
            const childs = await Promise.all(
              responseComment.kids.map((item) =>
                fetch(url + `item/${item}.json`),
              ),
            );
            childs.map(async (item) => {
              const comment = await item.json();
              setChildComments((prev) => [...prev, comment]);
            });
          }
        }
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
