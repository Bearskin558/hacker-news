import { Route, Routes } from 'react-router-dom';

import NewsContainer from './components/NewsContainer';
import styles from './App.module.css';
import NewsPage from './components/NewsPage';
import Header from './components/Header';

function App() {
  return (
    <div className={styles.container}>
      <Header />
      <Routes>
        <Route path="/" element={<NewsContainer />} />
        <Route path="/new/:id" element={<NewsPage />} />
      </Routes>
    </div>
  );
}

export default App;
