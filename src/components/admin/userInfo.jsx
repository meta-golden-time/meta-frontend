import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import { getAllUsers, deleteUser, updateUser } from '../../apis/userApi/user';
import "../../styles/admin/UserInfo.css";

const UserInfo = () => {
  const [users, setUsers] = useState([]);
  const [editingUserId, setEditingUserId] = useState(null);
  const [editingUserData, setEditingUserData] = useState({});
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await getAllUsers();
      setUsers(response);
    } catch (error) {
      console.error('Error fetching users', error);
    }
  };

  const handleDelete = async (userId) => {
    try {
      await deleteUser(userId);
      setUsers(users.filter(user => user.id !== userId));
    } catch (error) {
      console.error('Error deleting user', error);
    }
  };

  const handleEdit = (user) => {
    setEditingUserId(user.id);
    setEditingUserData({
      name: user.name,
      phone: user.phone,
      password: ''
    });
    setConfirmPassword('');
    setPasswordError('');
    setIsModalOpen(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'phone') {
      setEditingUserData({ ...editingUserData, [name]: formatPhoneNumber(value) });
    } else {
      setEditingUserData({ ...editingUserData, [name]: value });
    }
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  const handleSave = async () => {
    if (editingUserData.password && editingUserData.password !== confirmPassword) {
      setPasswordError('비밀번호가 일치하지 않습니다.');
      return;
    }

    try {
      await updateUser(editingUserId, editingUserData);
      setUsers(users.map(user => (user.id === editingUserId ? editingUserData : user)));
      setEditingUserId(null);
      setIsModalOpen(false);
    } catch (error) {
      console.error('Error updating user', error);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const formatPhoneNumber = (phoneNumber) => {
    const cleaned = ('' + phoneNumber).replace(/\D/g, '');
    const match = cleaned.match(/^(\d{3})(\d{3,4})(\d{4})$/);
    if (match) {
      return `${match[1]}-${match[2]}-${match[3]}`;
    }
    return phoneNumber;
  };

  return (
    <div>
      <h2>회원 정보 보기</h2>
      <table>
        <thead>
          <tr>
            <th>아이디</th>
            <th>이름</th>
            <th>이메일</th>
            <th>핸드폰 번호</th>
            <th>비밀번호</th>
            <th>가입일</th>
            <th>액션</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id}>
              <td>{user.userID}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.phone}</td>
              <td>********</td> {/* 비밀번호를 별표로 표시 */}
              <td>{new Date(user.createdAt).toLocaleDateString()}</td>
              <td>
                <button onClick={() => handleEdit(user)}>수정</button>
                <button onClick={() => handleDelete(user.id)}>삭제</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="User Edit Modal"
        className="Modal"
        overlayClassName="Overlay"
      >
        <h2>회원 정보 수정</h2>
        <div>
          <label>이름</label>
          <input
            type="text"
            name="name"
            value={editingUserData.name}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>전화번호</label>
          <input
            type="text"
            name="phone"
            value={editingUserData.phone}
            onChange={handleChange}
            placeholder="010-1234-5678"
          />
        </div>
        <div>
          <label>비밀번호</label>
          <input
            type="password"
            name="password"
            value={editingUserData.password}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>비밀번호 확인</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
          />
        </div>
        {passwordError && <div className="error">{passwordError}</div>}
        <div>
          <button onClick={handleSave}>저장</button>
          <button onClick={closeModal}>취소</button>
        </div>
      </Modal>
    </div>
  );
};

export default UserInfo;
