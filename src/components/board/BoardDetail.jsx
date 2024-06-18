import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getPosts, deletePost } from '../../apis/board/api';
import '../../styles/board/BoardDetail.css';

const BoardDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [password, setPassword] = useState('');
  const [editPassword, setEditPassword] = useState('');
  const [deletePassword, setDeletePassword] = useState('');
  const [showEditPasswordInput, setShowEditPasswordInput] = useState(false);
  const [showDeletePasswordInput, setShowDeletePasswordInput] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPost();
  }, [id]);

  const fetchPost = async () => {
    try {
      const response = await getPosts();
      const post = response.data.find((p) => p.id == id);
      setPost(post || { error: 'Post not found' });
    } catch (error) {
      console.error('Error fetching post', error);
      setPost({ error: 'Error fetching post' });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    try {
      const confirmPassword = window.confirm('정말 삭제하시겠습니까?');
      if (confirmPassword) {
        await deletePost(id, deletePassword);
        navigate('/');
      }
    } catch (error) {
      console.error('Error deleting post', error);
    }
  };

  const handleEditPasswordSubmit = (e) => {
    e.preventDefault();
    if (editPassword === post.password) {
      navigate(`/edit/${id}`);
    } else {
      alert('비밀번호가 일치하지 않습니다.');
    }
  };

  if (loading) return <div>Loading...</div>;
  if (post.error) return <div>{post.error}</div>;

  return (
    <div className="board-detail">
      <h2>{post.title}</h2>
      <p>{post.content}</p>
      {post.image && <img src={URL.createObjectURL(post.image)} alt="첨부 이미지" className="attached-image" />}
      <div>
        <button onClick={() => setShowEditPasswordInput(true)}>수정</button>
        {showEditPasswordInput && (
          <form onSubmit={handleEditPasswordSubmit}>
            <label>비밀번호</label>
            <input
              type="password"
              value={editPassword}
              onChange={(e) => setEditPassword(e.target.value)}
              required
            />
            <button type="submit">확인</button>
          </form>
        )}
      </div>
      <div>
        <button onClick={() => setShowDeletePasswordInput(true)}>삭제</button>
        {showDeletePasswordInput && (
          <form onSubmit={(e) => { e.preventDefault(); handleDelete(); }}>
            <label>비밀번호</label>
            <input
              type="password"
              value={deletePassword}
              onChange={(e) => setDeletePassword(e.target.value)}
              required
            />
            <button type="submit">확인</button>
          </form>
        )}
      </div>
    </div>
  );
};

export default BoardDetail;
