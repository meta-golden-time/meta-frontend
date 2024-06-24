import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { getPosts, deletePost } from '../../apis/board/api';
import Swal from 'sweetalert2';
import Sidebar from './Sidebar';

import xIcon from '../../img/main/X_icon.svg'
import '../../styles/board/BoardView.css';



const BoardView = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [inputPassword, setInputPassword] = useState('');
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [deleteAuthorization, setDeleteAuthorization] = useState(false);
  const [currentUser, setCurrentUser] = useState(null); // 현재 로그인한 사용자 정보
  const navigate = useNavigate();
  console.log("🚀 ~ BoardView ~ isAuthorized:", isAuthorized)

  useEffect(() => {
    fetchPost(id);
  }, [id]);

  const fetchPost = async (postId) => {
    try {
      const response = await getPosts();
      const fetchedPost = response.data.result.find(p => p.id == postId);
      console.log("🚀 ~ fetchPost ~ fetchedPost:", fetchedPost)
      setPost(fetchedPost);

      setCurrentUser({ id: response.data.user.userID }); // response.data.userID로 유저 ID 설정
    } catch (error) {
      console.error('Error fetching post', error);
    }
  };

  const handleDelete = async () => {
    if (inputPassword !== post.password) {
      Swal.fire('Error', '비밀번호가 일치하지 않습니다.', 'error');
      return;
    }

    try {
      await deletePost(id, inputPassword);
      Swal.fire('삭제 완료', '게시물이 삭제되었습니다.', 'success');
      navigate('/board');
    } catch (error) {
      console.error('Error deleting post', error);
      Swal.fire('Error', '게시물 삭제 중 오류가 발생했습니다.', 'error');
    }
  };

  const handlePasswordSubmit = () => {
    if (inputPassword === post.password) {
      setIsAuthorized(true);
    } else {
      Swal.fire('비밀번호 오류', '비밀번호가 일치하지 않습니다.', 'error');
    }
  };

  const handleDeletePasswordSubmit = () => {
    if (inputPassword === post.password) {
      handleDelete();
    } else {
      Swal.fire('비밀번호 오류', '비밀번호가 일치하지 않습니다.', 'error');
    }
  };

  if (!post) {
    return <div>Loading...</div>;
  }

  return (
    <div className='board-page'>
      <Sidebar />
      <div className='board-view'>
        <div className="board-header">
          <div className='header-container'>
            <Link to={`/board`}>
              <img src={xIcon} alt='xIcon'/>
            </Link>
            <div className='header-post'>
              <h2 className="post-title">{post.title}</h2>
              <div className='title-container'>
                <p className="post-author">작성자: {post.name}</p>
                <p>|</p>
                <p className="post-date">작성일: {new Date(post.createdAt).toLocaleDateString()}</p>
              </div>
            </div>
          </div>
        </div>
        <div className="board-content">
          <p className="post-content">{post.content}</p>
        </div>
        <div className='board-bottom'>
        {post.isPrivate && !isAuthorized ? (
          <div className="password-form">
            <h2>비밀번호 입력</h2>
            <input
              type="password"
              value={inputPassword}
              onChange={(e) => setInputPassword(e.target.value)}
            />
            <button onClick={handleDeletePasswordSubmit}>확인</button>
          </div>
        ) : (
          <>
            <button className='button-left' onClick={() => navigate(-1)}>뒤로가기</button>
            {currentUser && currentUser.id === post.userID && (
              <div className="actions">
                <button onClick={() => navigate(`/board/edit/${post.id}`)}>수정</button>
                <button onClick={() => setDeleteAuthorization(true)}>삭제</button>
              </div>
            )}
            {deleteAuthorization && (
              <div className="delete-confirm">
                <p>비밀번호 입력</p>
                <input
                  type="password"
                  value={inputPassword}
                  onChange={(e) => setInputPassword(e.target.value)}
                />
                <button onClick={handleDeletePasswordSubmit}>확인</button>
              </div>
            )}
          </>
        )}
        </div>
      </div>
    </div>
  );
};

export default BoardView;
