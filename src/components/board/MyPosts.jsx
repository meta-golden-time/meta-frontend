import React, { useEffect, useState } from 'react';
import { getPosts } from '../../apis/board/api';
import '../../styles/board/MyPosts.css';

const MyPosts = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await getPosts();
      const myPosts = response.data.filter(post => post.author === '로그인된 사용자 이름'); // 실제 로그인된 사용자 이름으로 변경
      setPosts(myPosts);
    } catch (error) {
      console.error('Error fetching posts', error);
    }
  };

  return (
    <div className="my-posts">
      <h2>내가 쓴 글</h2>
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
              <td>{post.isPrivate ? '비밀글입니다.' : post.title}</td>
              <td>{post.author}</td>
              <td>{new Date(post.createdAt).toLocaleDateString()}</td>
              <td>{post.isPrivate ? 'Lock' : 'unLock'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MyPosts;
