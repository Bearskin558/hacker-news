import React, { useEffect, useRef, useState } from 'react';

import styles from './New.module.css';
import { Link } from 'react-router-dom';

export type HackerNew = {
  score: number;
  title: string;
  by: string;
  kids: number[];
  url: string;
};

type Props = {
  id: number;
  obrerver?: IntersectionObserver;
};

export const isCorrectNew = (obj: unknown): obj is HackerNew => {
  return (
    typeof obj === 'object' &&
    obj !== null &&
    'score' in obj &&
    'title' in obj &&
    'by' in obj &&
    'url' in obj &&
    'kids' in obj
  );
};

const New = ({ id, obrerver }: Props) => {
  const observeRef = useRef(null);
  useEffect(() => {
    if (obrerver && observeRef.current) {
      obrerver.observe(observeRef.current);
    }
  });
  const [hackerNew, setHackerNew] = useState<HackerNew>();
  const url = import.meta.env.VITE_BASE_URL;
  useEffect(() => {
    const fetchNew = async () => {
      const response = await fetch(url + `item/${id}.json`);
      const responseNew = await response.json();
      if (isCorrectNew(responseNew)) setHackerNew(responseNew);
    };
    fetchNew();
  }, []);
  return (
    <div className={styles.wrapper} ref={observeRef}>
      <Link className={styles.title} to={`/new/${id}`}>
        {hackerNew?.title}
      </Link>
      <p className={styles.score}>score: {hackerNew?.score}</p>
      <p className={styles.author}>Author: {hackerNew?.by}</p>
      <a className={styles.link} href={hackerNew?.url} target="_blank">
        read
      </a>
    </div>
  );
};

export default New;
