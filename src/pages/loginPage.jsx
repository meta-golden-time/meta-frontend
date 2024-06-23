import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { useAuth } from '../context/AuthContext'; // AuthContext를 import 합니다.
import { postLogin } from '../apis/userApi/user';
import { signInWithGoogle } from '../firebase-config';
import logImg from '../img/main/golden_time_logo.svg';
import logIcon3 from '../img/main/m_log_i3.svg';
import logIcon2 from '../img/main/m_log_i2.svg';
import googleIcon from '../img/main/icons8-google-logo.svg';
import '../styles/users/loginForm.css'; // CSS 파일을 import 합니다.

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { setIsLogin } = useAuth(); // setIsLogin 함수를 AuthContext에서 가져옵니다.
  const navigate = useNavigate();

  const validateInputs = () => {
    if (email === '' || password === '') {
      Swal.fire({
        icon: 'warning',
        title: '로그인 정보 누락',
        text: '아이디 및 비밀번호를 작성해 주세요.',
      });
      return false;
    }
    return true;
  }

  const submitClick = async (e) => {
    e.preventDefault(); // 기본 동작 방지

    if (!validateInputs()) {
      return;
    }

    const data = {
      userID: email,
      password: password
    };

    try {
      const result = await postLogin(data);
      if(result.success == true){
        setIsLogin(true); // 로그인 성공 시 상태 업데이트
        Swal.fire({
          title: '성공',
          text: '로그인에 성공하셨습니다.',
          icon: 'success'
        }).then(() => {
          navigate('/');
        });
      }
      else{
        setIsLogin(false); // 로그인 실패 시 상태 업데이트
        Swal.fire({
          title: '실패',
          text: '로그인에 실패하셨습니다.',
          icon: 'warring'
        }).then(() => {
          navigate('/');
        });
      }
     
    } catch (error) {
      Swal.fire('Error', '아이디와 비밀번호를 확인해주세요', 'error');
    }
  }

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithGoogle();
      console.log("🚀 ~ handleGoogleLogin ~ result:", result)
      
      setIsLogin(true); // 구글 로그인 성공 시 상태 업데이트
      Swal.fire({
        title: '성공',
        text: '구글 로그인에 성공하셨습니다.',
        icon: 'success'
      }).then(() => {
        navigate('/');
      });
    } catch (error) {
      Swal.fire('Error', '구글 로그인에 실패하였습니다.', 'error');
    }
  }

  return (
    <section className="main">
      <div className="m_login">
        <h3>
          <span>
            <a href='/'>
              <img src={logImg} alt="login logo" />
            </a>
          </span>
          <p>LOGIN</p>
        </h3>
        <div className="log_box">
          <div className="in_ty1">
            <span>
              <img src={logIcon3} alt="id icon" />
            </span>
            <input 
              type="text" 
              id="id_val" 
              placeholder="아이디" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
            />
          </div>
          <div className="in_ty1">
            <span className="ic_2">
              <img src={logIcon2} alt="password icon" />
            </span>
            <input 
              type="password" 
              id="pwd_val" 
              placeholder="비밀번호" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
            />
          </div>
        </div>
        <div>
          <button className="s_bt" type="button" onClick={submitClick}>로그인</button>
        </div>
        <div className="additional_links">
          <p>아직 계정이 없으신가요?</p>
          <Link to={'/register'}>회원가입  -&raquo;</Link>
        </div>
        <div className="social_login">
          <img src={googleIcon} />
          <button className="google" onClick={handleGoogleLogin}>구글</button>
        </div>
      </div>
    </section>
  );
}

export default LoginForm;
