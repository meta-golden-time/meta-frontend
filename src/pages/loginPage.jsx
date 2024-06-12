import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from "axios";
import Swal from 'sweetalert2';
import $ from 'jquery';

// 이미지 파일을 상단에서 import
import logImg from '../img/main/log_img.png';
import logIcon3 from '../img/main/m_log_i3.png';
import logIcon2 from '../img/main/m_log_i2.png';
import logIcon1 from '../img/main/m_log_i1.png';

import '../styles/users/loginForm.css'; // CSS 파일을 import 합니다.

class LoginForm extends Component {
    submitClick = (e) => {
        this.email_val = $('#id_val').val();
        this.pwd_val = $('#pwd_val').val();
        if (this.id_val === '' || this.pwd_val === '') {
            this.sweetalert('아이디와 비밀번호를 확인해주세요.', '', 'info', '닫기')
        } else {
            axios.post('/api/LoginForm?type=signin', {
                is_Id: this.id_val,
                is_Password: this.pwd_val
            })
                .then(response => {
                    // 처리 로직 추가
                })
                .catch(error => {
                    this.sweetalert('아이디와 비밀번호를 확인해주세요.', '', 'info', '닫기');
                });
        }
    }

    sweetalert = (title, contents, icon, confirmButtonText) => {
        Swal.fire({
            title: title,
            text: contents,
            icon: icon,
            confirmButtonText: confirmButtonText
        });
    }

    render() {
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
                            <input type="text" id="id_val" placeholder="아이디" />
                        </div>
                        <div className="in_ty1">
                            <span className="ic_2">
                                <img src={logIcon2} alt="password icon" />
                            </span>
                            <input type="password" id="pwd_val" placeholder="비밀번호" />
                        </div>
                        <button className="s_bt" type="button" onClick={(e) => this.submitClick(e)}>로그인</button>
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
}

export default LoginForm;
