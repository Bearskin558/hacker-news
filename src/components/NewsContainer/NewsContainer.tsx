import React, { useCallback, useEffect, useRef, useState } from 'react';

import HackerNew from '../HackerNew/';
import styles from './NewsContainer.module.css';

type TypeSortBy = 'beststories' | 'topstories ' | 'newstories';

const NewsContainer = () => {
  const [newsId, setNewsId] = useState<number[]>([]);
  const [sortBy, setSortBy] = useState<TypeSortBy>('beststories');
  const url = import.meta.env.VITE_BASE_URL;
  const [currentPage, setCurrentPage] = useState(1);
  const countNews = 20;
  const toFetchNews = useCallback(async () => {
    try {
      const response = await fetch(`${url}/${sortBy}.json?print=pretty`);
      const news = await response.json();
      if (
        Array.isArray(news) &&
        news.length > 0 &&
        news.every((item) => typeof item === 'number')
      )
        setNewsId((prev) => [...news]);
    } catch (error) {
      console.log(error);
    }
  }, [sortBy]);

  const newsObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          console.log(1);
          setCurrentPage((prev) => prev + 1);
          observer.unobserve(entry.target);
        }
      });
    },
    { rootMargin: '100px' },
  );

  useEffect(() => {
    const updateInterval = setInterval(() => {
      toFetchNews();
    }, 18000);
    return () => clearInterval(updateInterval);
  }, []);

  useEffect(() => {
    toFetchNews();
  }, [sortBy]);

  const onChangeSortBy = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortBy(e.target.selectedOptions[0].text as TypeSortBy);
  };
  console.log(1);

  return (
    <div className={styles.wrapper}>
      <div className={styles.sortByWrapper}>
        <label htmlFor="choose-sort-by">Sort by:</label>
        <select
          id="choose-sort-by"
          className={styles.sortBy}
          onChange={(e) => onChangeSortBy(e)}
        >
          <option value="">beststories</option>
          <option value="">topstories</option>
          <option value="">newstories</option>
        </select>
      </div>

      <div className={styles.newsContainer}>
        {newsId.slice(0, countNews + currentPage * countNews).map((item, i) => {
          if (i === countNews + currentPage * countNews - 1)
            return <HackerNew key={item} id={item} obrerver={newsObserver} />;
          return <HackerNew key={item} id={item} />;
        })}
      </div>
    </div>
  );
};

export default NewsContainer;
