import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

import { HackerNew, isCorrectNew } from '../HackerNew/New';
import styles from './NewsPage.module.css';
import Comment from '../Comment/Comment';

const NewsPage = () => {
  const [hackerNew, setHackerNew] = useState<HackerNew>();
  const id = useParams().id;
  const url = import.meta.env.VITE_BASE_URL;
  useEffect(() => {
    const fetchNew = async () => {
      try {
        const response = await fetch(url + `item/${id}.json`);
        const responseNew = await response.json();
        if (isCorrectNew(responseNew)) setHackerNew(responseNew);
      } catch (error) {
        console.log(error);
      }
    };
    fetchNew();
  }, []);

  return (
    <div className={styles.wrapper}>
      <h1 className={styles.title}>{hackerNew?.title}</h1>
      <p className={styles.score}>score: {hackerNew?.score}</p>
      <p className={styles.author}>Author: {hackerNew?.by}</p>
      <a className={styles.link} href={hackerNew?.url} target="_blank">
        read
      </a>
      <Link to="/">
        <button className={styles.backButton}>Back</button>
      </Link>
      <div className={styles.commentBlock}>
        {hackerNew?.kids.map((item) => {
          return <Comment id={item} key={item} />;
        })}
      </div>
    </div>
  );
};

export default NewsPage;
