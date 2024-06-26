import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getPosts } from '../../apis/board/api';
import Swal from 'sweetalert2';
import Sidebar from './Sidebar';
import '../../styles/board/MyPosts.scss';
import xIcon from '@img/main/X_icon.svg'

const MyPosts = () => {
  const [posts, setPosts] = useState([]);
  const [loginUser, setLoginUser] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await getPosts();
      const myPosts = response.data.result.filter(post => post.userID === response.data.user.userID); // 실제 로그인된 사용자 이름으로 변경
      setLoginUser(response.data.user.userID);
      setPosts(myPosts);
    } catch (error) {
      console.error('Error fetching posts', error);
    }
  };

  const handlePrivatePostClick = (post) => {
    Swal.fire({
      title: '비밀번호 입력',
      input: 'password',
      inputPlaceholder: '비밀번호를 입력하세요',
      showCancelButton: true,
      confirmButtonText: '확인',
      cancelButtonText: '취소',
      inputValidator: (value) => {
        if (!value) {
          return '비밀번호를 입력하세요!';
        }
      }
    }).then((result) => {
      if (result.isConfirmed) {
        navigate(`/board/view/${post.id}`, { state: { password: result.value } });
      }
    });
  };

  return (
    <div className="board-page">
      <Sidebar />
      <div className="my-posts">
      <div className='myPage-header'>
        <Link to={`/board`}>
          <img src={xIcon} alt='xIcon'/>
        </Link>
        <h2>나의 문의사항</h2>
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
                  {post.isPrivate ? (
                    <Link to={`/board/view/${post.id}`}>비밀글입니다.</Link>
                  ) : (
                    <Link to={`/board/view/${post.id}`}>{post.title}</Link>
                  )}
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

export default MyPosts;
