import React, { useState } from 'react';
import Swal from 'sweetalert2';
import SimpleDialogDemo from '../components/Modal/addressSearch';
import ReCAPTCHA from 'react-google-recaptcha';
import { Link, useNavigate } from 'react-router-dom';
// api 요청
import { postRegister } from '../apis/userApi/user';

// CSS 파일을 import 합니다.
import '../styles/users/register.css';

const Register = () => {
    const navigate = useNavigate();
    const [address, setAddress] = useState('');
    const [recaptchaValue, setRecaptchaValue] = useState(null);

    const handleAddressSelect = (address) => {
        console.log("🚀 ~ Register ~ address:", address)
        setAddress(address);
    };

    const onRecaptchaChange = (value) => {
        console.log("🚀 ~ Register ~ value:", value)
        setRecaptchaValue(value);
    };

    const mustNumber = (id) => {
        const input = document.getElementById(id);
        input.value = input.value.replace(/[^0-9]/g, '');
    };

    const validateInputs = () => {
        const userID = document.getElementById('id_val').value.trim();
        const email1 = document.getElementById('email_val').value.trim();
        const email2 = document.getElementById('email2_val').value.trim();
        const password = document.getElementById('pwd_val').value.trim();
        const confirmPassword = document.getElementById('pwd_cnf_val').value.trim();
        const name = document.getElementById('name_val').value.trim();
        const phone1 = document.getElementById('phone1_val').value.trim();
        const phone2 = document.getElementById('phone2_val').value.trim();
        const phone3 = document.getElementById('phone3_val').value.trim();

        if (!userID || !email1 || !email2 || !password || !confirmPassword || !name || !phone1 || !phone2 || !phone3 || !address) {
            Swal.fire({
                icon: 'warning',
                title: '필수 입력 항목 누락',
                text: '모든 필수 입력 항목을 작성해 주세요.',
            });
            return false;
        }

        if (password !== confirmPassword) {
            Swal.fire({
                icon: 'warning',
                title: '비밀번호 불일치',
                text: '비밀번호가 다릅니다. 다시 확인해 주세요.',
            });
            return false;
        }

        return true;
    };

    const submitClick = async (e) => {
        e.preventDefault();

        if (!recaptchaValue) {
            Swal.fire({
                icon: 'warning',
                title: 'AI 체크',
                text: '리캡챠 체크가 안되었습니다.',
            });
            return;
        }

        if (!validateInputs()) {
            return;
        }

        const data = {
            userID: document.getElementById('id_val').value,
            email: document.getElementById('email_val').value + "@" + document.getElementById('email2_val').value,
            password: document.getElementById('pwd_val').value,
            confirmPassword: document.getElementById('pwd_cnf_val').value,
            name: document.getElementById('name_val').value,
            address: address,
            phone: document.getElementById('phone1_val').value + "-" + document.getElementById('phone2_val').value + "-" + document.getElementById('phone3_val').value,
            role: document.getElementById('admin2_val').value,
            recaptcha: recaptchaValue,
        };
        console.log("🚀 ~ Register ~ submitClick= ~ data:", data)

        try {
            const result = await postRegister(data);
            console.log("🚀 ~ Register ~ submitClick= ~ result:", result)

            if (result.success) {
                Swal.fire('Success', 'You have registered successfully', 'success');
                navigate('/');
            } else {
                Swal.fire('Error', result.message, 'error');
            }
        } catch (error) {
            Swal.fire('Error', 'There was an error during registration', 'error');
        }
    };

    return (
        <div>
            <section className="sub_wrap">
                <article className="s_cnt re_1 ct1">
                    <div className="li_top">
                        <h2 className="s_tit1">회원가입</h2>
                        <form method="post" name="frm">
                            <div className="re1_wrap">
                                <div className="re_cnt ct2">
                                    <table className="table_ty1">
                                        <tbody>
                                            <tr className="re_admin">
                                                {/* <th>가입유형</th> */}
                                                <td>
                                                    <select id="admin2_val" name="is_Useradmin2" className="select_ty1">
                                                        <option value="user">user</option>
                                                        <option value="admin">admin</option>
                                                    </select>
                                                </td>
                                            </tr>
                                            <tr className="re_id">
                                                {/* <th>아이디</th> */}
                                                <td>
                                                    <input
                                                        id="id_val"
                                                        type="text"
                                                        name="is_Userid"
                                                        placeholder="아이디을 입력해주세요."
                                                    />
                                                </td>
                                            </tr>
                                            <tr>
                                                {/* <th>성명</th> */}
                                                <td>
                                                    <input
                                                        id="name_val"
                                                        type="text"
                                                        name="is_Username"
                                                        placeholder="성명을 입력해주세요."
                                                    />
                                                </td>
                                            </tr>
                                            <tr>
                                                {/* <th>비밀번호</th> */}
                                                <td>
                                                    <input
                                                        id="pwd_val"
                                                        type="password"
                                                        name="is_Password"
                                                        placeholder="비밀번호를 입력해주세요."
                                                    />
                                                </td>
                                            </tr>
                                            <tr>
                                                {/* <th>비밀번호 확인</th> */}
                                                <td>
                                                    <input
                                                        id="pwd_cnf_val"
                                                        type="password"
                                                        name="is_Password"
                                                        placeholder="비밀번호를 다시 입력해주세요."
                                                    />
                                                </td>
                                            </tr>
                                            <tr className="re_email">
                                                {/* <th>이메일</th> */}
                                                <td>
                                                    <input
                                                        id="email_val"
                                                        type="text"
                                                        name="is_Useremail1"
                                                        placeholder="이메일을 입력해주세요."
                                                    />
                                                    <span className="e_goll">@</span>
                                                    <select id="email2_val" name="is_Useremail2" className="select_ty1">
                                                        <option value="">선택하세요</option>
                                                        <option value="naver.com">naver.com</option>
                                                        <option value="hanmail.net">hanmail.net</option>
                                                        <option value="nate.com">nate.com</option>
                                                        <option value="hotmail.com">hotmail.com</option>
                                                        <option value="gmail.com">gmail.com</option>
                                                        <option value="yahoo.co.kr">yahoo.co.kr</option>
                                                        <option value="yahoo.com">yahoo.com</option>
                                                    </select>
                                                </td>
                                            </tr>
                                            <tr>
                                                {/* <th>주소</th> */}
                                                <td>
                                                    <SimpleDialogDemo onAddressSelect={handleAddressSelect} />
                                                    <div className='address_out'>{address}</div>
                                                </td>
                                            </tr>
                                            <tr className="tr_tel">
                                                {/* <th>핸드폰</th> */}
                                                <td>
                                                    <select id="phone1_val" name="is_Userphone1" className="select_ty1">
                                                        <option value="">선택</option>
                                                        <option value="010">010</option>
                                                        <option value="011">011</option>
                                                        <option value="016">016</option>
                                                        <option value="017">017</option>
                                                        <option value="018">018</option>
                                                        <option value="019">019</option>
                                                    </select>
                                                    <span className="tel_dot">-</span>
                                                    <input
                                                        id="phone2_val"
                                                        name="is_Userphone2"
                                                        max="9999"
                                                        maxLength="4"
                                                        onChange={(e) => mustNumber('phone2_val')}
                                                    />
                                                    <span className="tel_dot">-</span>
                                                    <input
                                                        id="phone3_val"
                                                        name="is_Userphone3"
                                                        max="9999"
                                                        maxLength="4"
                                                        onChange={(e) => mustNumber('phone3_val')}
                                                    />
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            <div className="re1_wrap">
                                <ReCAPTCHA
                                    sitekey="6Ld9Y_UpAAAAAJGCq3NInWaTCDtH6nHjA9_rP6AU" // 자신의 사이트 키로 대체하세요.
                                    onChange={onRecaptchaChange}
                                />
                            </div>
                            <div className="btn_confirm">
                                <button className="bt_ty bt_ty2 submit_ty1" onClick={(e) => submitClick(e)}>
                                    회원가입
                                </button>
                            </div>
                        </form>
                    </div>
                </article>
            </section>
        </div>
    );
};

export default Register;
