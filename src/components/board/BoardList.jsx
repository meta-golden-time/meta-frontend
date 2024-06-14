import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getPosts } from '../../apis/board/api';
import Sidebar from './Sidebar';
import '../../styles/board/BoardList.css';

const BoardList = () => {
  const [posts, setPosts] = useState([]);
  const [searchType, setSearchType] = useState('title');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await getPosts();
      setPosts(response.data);
    } catch (error) {
      console.error('Error fetching posts', error);
    }
  };

  const handleSearch = () => {
    const filteredPosts = posts.filter(post => {
      if (searchType === 'title') {
        return post.title.includes(searchQuery);
      } else {
        return post.content.includes(searchQuery);
      }
    });
    setPosts(filteredPosts);
  };

  return (
    <div className="board-page">
      <Sidebar />
      <div className="board-list">
        <h2>고객센터</h2>
        <div className="search-container">
          <select value={searchType} onChange={(e) => setSearchType(e.target.value)}>
            <option value="title">제목</option>
            <option value="content">내용</option>
          </select>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="검색어를 입력하세요"
          />
          <button onClick={handleSearch}>검색</button>
        </div>
        <table>
          <thead>
            <tr>
              <th>제목</th>
              <th>작성자</th>
              <th>작성일</th>
              <th>비밀글 여부</th>
            </tr>
          </thead>
          <tbody>
            {posts.map(post => (
              <tr key={post.id}>
                <td>
                  <Link to={`/board/view/${post.id}`}>
                    {post.isPrivate ? '비밀글입니다.' : post.title}
                  </Link>
                </td>
                <td>{post.author}</td>
                <td>{new Date(post.createdAt).toLocaleDateString()}</td>
                <td>{post.isPrivate ? 'Lock' : 'unLock'}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <Link to="/board/create">
          <button className="create-button">글쓰기</button>
        </Link>
      </div>
    </div>
  );
};

export default BoardList;
