import React, { useState, useEffect } from 'react';
import { fetchNaverNews } from '../apis/naverNews/naverNews';

const NewsComponent = () => {
  const [news, setNews] = useState([]);
  const [query, setQuery] = useState('latest news');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getNews = async () => {
      setLoading(true);
      try {
        const response = await fetchNaverNews(query);
        console.log("🚀 ~ getNews ~ data:", response.data)
        if (response.data && response.data.items) {
          setNews(response.data.items);
        } else {
          setError('No news items found.');
        }
      } catch (error) {
        setError(error.message);
      }
      setLoading(false);
    };

    getNews();
  }, [query]);

  const handleSearch = () => {
    setQuery(document.getElementById('news-query').value);
  };

  return (
    <div>
      <h1>News</h1>
      <input id="news-query" type="text" placeholder="Search for news" />
      <button onClick={handleSearch}>Search</button>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {news && news.length > 0 ? (
        <ul>
          {news.map((item, index) => (
            <li key={index}>
              <a href={item.link} target="_blank" rel="noopener noreferrer">
                {item.title}
              </a>
              <p>{item.description}</p>
            </li>
          ))}
        </ul>
      ) : (
        !loading && <p>No news items found.</p>
      )}
    </div>
  );
};

export default NewsComponent;
