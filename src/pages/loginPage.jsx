import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import axios from "axios";
import logImg from '../img/main/log_img.png';
import logIcon3 from '../img/main/m_log_i3.png';
import logIcon2 from '../img/main/m_log_i2.png';
import logIcon1 from '../img/main/m_log_i1.png';

import { postLogin } from '../apis/userApi/user';

import '../styles/users/loginForm.css'; // CSS 파일을 import 합니다.


const LoginForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
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
            Swal.fire({
                title: '성공',
                text: '로그인에 성공하셨습니다.',
                icon: 'success'
            }).then(() => {
                navigate('/');
            });
        } catch (error) {
            Swal.fire('Error', '아이디와 비밀번호를 확인해주세요', 'error');
        }
    }

    return (
        <section className="main">
            <div className="m_login signin">
                <h3>
                    <span>
                        <img src={logImg} alt="login logo" />
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
                    <button className="s_bt" type="button" onClick={submitClick}>로그인</button>
                </div>
                <ul className="additional_links">
                    <li><Link to={'/register'}>회원가입</Link></li>
                    <li><Link to={'/forgot-password'}>아이디/비밀번호 찾기</Link></li>
                </ul>
                <div className="social_login">
                    <button className="google">구글</button>
                    <button className="kakao">카카오</button>
                    <button className="naver">네이버</button>
                </div>
            </div>
        </section>
    );
}

export default LoginForm;
