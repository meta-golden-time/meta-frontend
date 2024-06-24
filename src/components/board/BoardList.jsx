import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getPosts } from '../../apis/board/api';
import Sidebar from './Sidebar';
import '../../styles/board/BoardList.css';

const BoardList = () => {
  const [posts, setPosts] = useState([]);
  const [allPosts, setAllPosts] = useState([]); // 모든 게시물을 저장하기 위한 상태
  const [searchType, setSearchType] = useState('title');
  const [searchQuery, setSearchQuery] = useState('');
  const [loginUser, setLoginUser] = useState(''); // 로그인 체크 상태

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await getPosts();
      setLoginUser(response.data.user.userID);
      setPosts(response.data.result);
      setAllPosts(response.data.result); // 모든 게시물을 저장
    } catch (error) {
      console.error('Error fetching posts', error);
    }
  };

  const handleSearch = () => {
    if (searchQuery.trim() === '') {
      setPosts(allPosts); // 검색어가 없으면 모든 게시물을 표시
    } else {
      const filteredPosts = allPosts.filter(post => {
        if (searchType === 'title') {
          return post.title.includes(searchQuery);
        } else if (searchType === 'content') {
          return post.content.includes(searchQuery);
        } else if (searchType === 'author') {
          return post.name.includes(searchQuery);
        }
        return false;
      });
      setPosts(filteredPosts);
    }
  };

  return (
    <div className="board-page">
      <Sidebar />
      <div className="board-list">
        <h2>고객센터</h2>
        <div className='board-button-top'>
          <Link to="/board/create">
              <button className="create-button">글쓰기</button>
          </Link>
          <div className="search-container">
            <select value={searchType} onChange={(e) => setSearchType(e.target.value)}>
              <option value="title">제목</option>
              <option value="content">내용</option>
              <option value="author">작성자</option> {/* 작성자 옵션 추가 */}
            </select>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="검색어를 입력하세요"
            />
            <button onClick={handleSearch}>검색</button>
          </div>
        </div>
        <table>
          <thead>
            <tr>
              <th>제목</th>
              <th>작성자</th>
              <th>작성일</th>
              <th>비밀글</th>
            </tr>
          </thead>
          <tbody>
            {posts.map(post => (
              <tr key={post.id}>
                <td className='list-title'>
                  <Link to={`/board/view/${post.id}`}>
                    {post.isPrivate ? '비밀글입니다.' : post.title}
                  </Link>
                </td>
                <td>{post.name}</td>
                <td>{new Date(post.createdAt).toLocaleDateString()}</td>
                <td>{post.isPrivate ? 'O' : 'X'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BoardList;
