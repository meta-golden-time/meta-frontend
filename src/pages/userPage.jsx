import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '@styles/users/userPage.scss';
import { postLogout, postLoginCheck } from '../apis/userApi/user'; // 로그인 체크 진행
import { getBookMark } from '../apis/userApi/bookMark'; // 북마크와 게시판 API 요청
import { getPosts } from '../apis/board/api';

const UserPage = () => {
  const [bookmarks, setBookmarks] = useState([]);
  const [users, setUsers] = useState([]); // 초기값을 null로 설정
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      const bookmarksResponse = await getBookMark();
      console.log("🚀 ~ fetchUserData ~ bookmarksResponse:", bookmarksResponse)
      const response = await getPosts();
      console.log("🚀 ~ fetchUserData ~ response:", response)
      const myPosts = response.data.result.filter(post => post.userID === response.data.user.userID); // 실제 로그인된 사용자 이름으로 변경
      setBookmarks(bookmarksResponse);
      setUsers( response.data.user || null); // 데이터가 없으면 null로 설정
      setPosts(myPosts)
    } catch (error) {
      console.error('Error fetching user data', error);
    }
  };

  const userLogout = async () => {
    try {
      const result = await postLogout();
      console.log("🚀 ~ userLogout ~ result:", result);
    } catch (error) {
      console.error('Error during logout', error);
    }
  };

  if (users === null) {
    return <div>Loading...</div>; // 데이터가 없을 때 로딩 표시 또는 다른 처리를 할 수 있습니다.
  }

  return (
    <div style={{paddingTop:'65px'}}>
      <div className="user-page">
        <div className="sidebar">
          <div className="user-info">
            <div className="user-photo"></div>
            <div className="user-info-text">
              <p>{users.name} 님</p>
              <div className="user-info-text-p-button">
                <p>{users.userID}</p>
              </div>
              <button>수정</button>
              <button onClick={userLogout}>로그아웃</button>
            </div>
          </div>
          <div className="sidebar-links">
            <p><a href="#address">주소</a></p>
            <p><a href="#bookmarks">북마크 목록</a></p>
            <p><a href="#posts">내 게시판 목록</a></p>
          </div>
        </div>
        <div className="content">
          <div id="address" className="address">
            <h3>주소</h3>
            <p>{users.address}</p>
          </div>
          <div id="bookmarks" className="bookmarks">
            <h3>북마크 목록</h3>
            {bookmarks.length > 0 ? (
              bookmarks.map((bookmark) => (
                <div key={bookmark.id} className="bookmark-item">
                  <span>{bookmark.location_S}</span>
                  <span>➡</span>
                  <span>{bookmark.location_E}</span>
                </div>
              ))
            ) : (
              <p>북마크 없음</p>
            )}
          </div>
          <div id="posts" className="posts">
            <h3>내 게시판 목록</h3>
            {posts && posts.length > 0 ? (
              posts.map((post) => (
                <div key={post.id} className="post-item">
                  <Link to={`/board/view/${post.id}`}>{post.title}</Link>
                </div>
              ))
            ) : (
              <p>게시판 없음</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserPage;
