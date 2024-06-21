import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { createPost, updatePost, getPosts } from '../../apis/board/api';
import Swal from 'sweetalert2';
import '../../styles/board/BoardForm.css';

const BoardForm = ({ isEdit }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [password, setPassword] = useState('');
  const [isPrivate, setIsPrivate] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (isEdit && id) {
      fetchPost(id);
    }
  }, [isEdit, id]);

  const fetchPost = async (postId) => {
    try {
      const response = await getPosts();
      const post = response.data.result.find((p) => p.id == postId);
      setTitle(post.title);
      setContent(post.content);
      setPassword(post.password || ''); // 기존 비밀번호를 설정합니다.
      setIsPrivate(post.isPrivate);
    } catch (error) {
      console.error('Error fetching post', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!password && !isEdit) {
      Swal.fire('Error', '비밀번호를 입력해야 합니다.', 'error');
      return;
    }

    const formData = {
      title,
      content,
      password,
      isPrivate,
    };

    try {
      if (isEdit) {
        await updatePost(id, formData);
        Swal.fire('수정 완료', '게시물이 수정되었습니다.', 'success');
      } else {
        await createPost(formData);
        Swal.fire('등록 완료', '게시물이 등록되었습니다.', 'success');
      }
      navigate('/board');
    } catch (error) {
      console.error('Error creating/updating post', error);
      Swal.fire('Error', '게시물 등록/수정 중 오류가 발생했습니다.', 'error');
    }
  };

  return (
    <div className="board-form">
      <h2>{isEdit ? '게시물 수정' : '게시물 작성'}</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>제목</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>내용</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>비밀글 설정</label>
          <input
            type="checkbox"
            checked={isPrivate}
            onChange={(e) => setIsPrivate(e.target.checked)}
          />
        </div>
        <div className="form-group">
          <label>비밀번호</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            disabled={isEdit} // 수정 모드일 때 비밀번호 필드를 비활성화
          />
        </div>
        <button type="submit">{isEdit ? '수정' : '등록'}</button>
      </form>
    </div>
  );
};

export default BoardForm;
