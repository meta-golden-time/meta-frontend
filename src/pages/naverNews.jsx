import React, { useState, useEffect } from 'react';
import { fetchNaverNews } from '../apis/naverNews/naverNews';
import '../styles/naverNews/NewsComponent.scss'; // SCSS 파일을 import 합니다.

const NewsComponent = () => {
  const [news, setNews] = useState([]);
  const [query, setQuery] = useState('latest news');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [newsPerPage] = useState(10);

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

  // 뉴스 페이지네이션 관련 로직
  const indexOfLastNews = currentPage * newsPerPage;
  const indexOfFirstNews = indexOfLastNews - newsPerPage;
  const currentNews = news.slice(indexOfFirstNews, indexOfLastNews);

  const paginate = pageNumber => setCurrentPage(pageNumber);

  return (
    <div className="news-container">
      <h1>뉴스 리스트</h1>
      <div className="search-bar">
        <input id="news-query" type="text" placeholder="Search for news" />
        <button onClick={handleSearch}>Search</button>
      </div>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {news && news.length > 0 ? (
        <>
          <table>
            <thead>
              <tr>
                <th>카테고리 1</th>
                <th>카테고리 2</th>
                <th>제목</th>
                <th>URL</th>
                <th>날짜</th>
              </tr>
            </thead>
            <tbody>
              {currentNews.map((item, index) => (
                <tr key={index}>
                  <td>{item.category1}</td>
                  <td>{item.category2}</td>
                  <td>{item.title}</td>
                  <td><a href={item.link} target="_blank" rel="noopener noreferrer">사이트 바로가기</a></td>
                  <td>{new Date(item.pubDate).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="pagination">
            {Array.from({ length: Math.ceil(news.length / newsPerPage) }, (_, index) => (
              <button key={index} onClick={() => paginate(index + 1)}>{index + 1}</button>
            ))}
          </div>
        </>
      ) : (
        !loading && <p>No news items found.</p>
      )}
    </div>
  );
};

export default NewsComponent;
