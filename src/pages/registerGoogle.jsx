import React, { useState } from 'react';
import Swal from 'sweetalert2';
import SimpleDialogDemo from '../components/Modal/addressSearch';
import ReCAPTCHA from 'react-google-recaptcha';
import Button from '@mui/material/Button';
import logImg from '../img/main/golden_time_logo.svg';

import logIcon from '../img/main/user_icon.svg';
import idIcon from '../img/main/user_icon.svg';
import pwIcon from '../img/main/lock_icon.svg';
import nameIcon from '../img/main/user_icon.svg';
import emailIcon from '../img/main/email_icon.svg';
import addrIcon from '../img/main/home_icon.svg';
import phoneIcon from '../img/main/new_phone_icon.svg';

import { Link, useNavigate } from 'react-router-dom';

// api 요청
import { postRegister, postIdCheck } from '../apis/userApi/user';

// CSS 파일을 import 합니다.
import '../styles/users/register.css';

const Register = () => {
    const navigate = useNavigate();
    const [address, setAddress] = useState('');
    const [recaptchaValue, setRecaptchaValue] = useState(null);
    const [termsAccepted, setTermsAccepted] = useState(false); // 약관 동의 상태
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordMatch, setPasswordMatch] = useState(true);

    const handleAddressSelect = (address) => {
        console.log("🚀 ~ Register ~ address:", address);
        setAddress(address);
    };

    const onRecaptchaChange = (value) => {
        setRecaptchaValue(value);
    };

    const mustNumber = (id) => {
        const input = document.getElementById(id);
        input.value = input.value.replace(/[^0-9]/g, '');
    };

    const validateInputs = () => {
        const data = {
            userID: document.getElementById('id_val').value.trim(),
            email1: document.getElementById('email_val').value.trim(),
            email2: document.getElementById('email2_val').value.trim(),
            password: document.getElementById('pwd_val').value.trim(),
            confirmPassword: document.getElementById('pwd_cnf_val').value.trim(),
            name: document.getElementById('name_val').value.trim(),
            phone1: document.getElementById('phone1_val').value.trim(),
            phone2: document.getElementById('phone2_val').value.trim(),
            phone3: document.getElementById('phone3_val').value.trim(),
            userAddress: address,
        };
        console.log("🚀 ~ validateInputs ~ data:", data);

        if (!data.userID || !data.email1 || !data.email2 || !data.password || !data.confirmPassword || !data.name || !data.phone1 || !data.phone2 || !data.phone3 || !data.userAddress) {
            Swal.fire({
                icon: 'warning',
                title: '필수 입력 항목 누락',
                text: '모든 필수 입력 항목을 작성해 주세요.',
            });
            return false;
        }

        if (data.password !== data.confirmPassword) {
            Swal.fire({
                icon: 'warning',
                title: '비밀번호 불일치',
                text: '비밀번호가 다릅니다. 다시 확인해 주세요.',
            });
            return false;
        }

        return true;
    };

    const handleTermsClick = () => {
        Swal.fire({
            title: '약관 동의',
            html: `<div style="text-align: left; font-size: 14px; max-height: 300px; overflow-y: auto;">
                <p>개인정보이용정책</p>
                <p>단카 (이하 ‘회사’라 함)는 [개인정보보호법], [정보통신망 이용촉진 및 정보보호 등에 관한 법률](이하 ‘정보통신망법’이라 함) 등 관련 법령에 따라 이용자의 개인정보를 보호하고 개인정보와 관련된 이용자의 고충을 원활하게 처리할 수 있도록 다음과 같은 개인정보처리방침을 수립하여 공개하고 있습니다.</p>
                <p>본 개인정보처리방침은 회사가 운영하는 날씨 및 정보제공 플랫폼(이하 ‘골든타임’라 함) 및 관련 제반 서비스의 이용에 적용되며, 본 개인정보처리방침에서 사용하는 용어의 의미는 관련 법령 및 회사의 이용약관에서 정한 바에 따르되, 그 밖의 사항은 일반적인 상관례에 따릅니다.</p>
                <p>제1조 개인정보의 수집 항목 및 이용 목적</p>
                <p>이용자가 회원가입을 할 경우, 회사는 각 서비스의 원활한 제공을 위해 필요한 최소한의 개인정보를 수집합니다. 회원가입 시점에 회사가 이용자로부터 수집하는 개인정보는 아래와 같습니다.</p>
                <p>이메일 정보</p>
                <p>단카 내의 개별 서비스 이용과정에서 해당 서비스의 이용자에 한해 추가 개인정보 수집이 발생할 수 있습니다. 회사가 추가로 개인정보를 수집할 경우에는 해당 개인정보 수집 시점에서 이용자에게 ‘수집하는 개인정보 항목, 개인정보의 수집 및 이용목적, 개인정보의 보관기간’에 대해 안내하고 동의를 받고 있습니다.</p>
                <p>서비스 이용 과정에서 IP 주소, 쿠키, 서비스 이용 기록, 기기정보, 위치정보가 생성되어 수집될 수 있습니다.</p>
                <p>구체적으로 1) 서비스 이용 과정에서 이용자에 관한 정보를 정보통신서비스 제공자가 자동화된 방법으로 생성하여 이를 저장(수집)하거나, 2) 이용자 기기의 고유한 정보를 원래의 값을 확인하지 못 하도록 안전하게 변환한 후에 수집하는 경우를 의미합니다.</p>
                <p>제2조 개인정보의 보관 및 보호</p>
                <p>회사는 이용자로부터 개인정보 수집 시에 동의 받은 개인정보 보유·이용기간 또는 법령에 따른 개인정보 보유·이용기간 내에서 개인정보를 처리·보유합니다.</p>
                <p>회원가입 및 서비스 이용 관리</p>
                <p>회원 가입 의사 확인, 회원제 서비스 제공에 따른 본인 식별·인증, 회원자격 유지·관리, 제한적 본인확인제 시행에 따른 본인확인, 만14세 미만 아동 개인정보 수집 시 법정대리인 동의 여부 확인, 약관 개정 등의 고지사항 전달 등 서비스 이용 관련 각종 고지·통지 등을 목적으로 개인정보를 처리합니다.</p>
                <p>민원사무 처리</p>
                <p>민원인의 신원 확인, 민원사항 확인, 사실조사를 위한 연락·통지, 처리결과 통보 등을 목적으로 개인정보를 처리합니다.</p>
                <p>재화 또는 서비스 제공</p>
                <p>서비스 제공, 콘텐츠 제공, 맞춤 서비스 제공, 본인인증, 연령인증, 요금결제·정산, 채권추심 등을 목적으로 개인정보를 처리합니다.</p>
                <p>마케팅 및 광고에의 활용</p>
                <p>신규 서비스(제품) 개발 및 맞춤 서비스 제공, 이벤트 및 광고성 정보 제공 및 참여기회 제공, 인구통계학적 특성에 따른 서비스 제공 및 광고 게재, 서비스의 유효성 확인, 접속빈도 파악 또는 회원의 서비스 이용에 대한 통계 등을 목적으로 개인정보를 처리합니다.</p>
                <p>부정 이용 등 회원에 대한 관리</p>
                <p>법령 및 이용약관을 위반하는 회원에 대한 이용 제한 조치, 부정 이용 행위를 포함하여 서비스의 원활한 운영에 지장을 주는 행위에 대한 방지 및 제재, 계정도용 및 부정거래 방지, 분쟁조정을 위한 기록 보존, 민원처리 등 부정 이용 등을 한 회원 관리를 위한 목적으로 개인정보를 처리합니다.</p>
                <p>제3조 개인정보 처리 및 보유기간</p>
                <p>회사는 이용자로부터 개인정보 수집 시에 동의 받은 개인정보 보유·이용기간 또는 법령에 따른 개인정보 보유·이용기간 내에서 개인정보를 처리·보유합니다.</p>
                <p>회사가 이용자로부터 동의 받은 개인정보 처리 및 보유기간은 다음과 같습니다.</p>
                <p>회원가입 및 서비스 이용 관리</p>
                <p>보관 항목: 가입시 제공하는 모든 개인정보(제1조 제1항 참고)</p>
                <p>보관 기간: 회원탈퇴 또는 이용계약 해지 시까지</p>
                <p>부정가입 및 이용방지를 위한 이용기록</p>
                <p>보관 항목: 이메일</p>
                <p>보관 기간: 탈퇴일로부터 6개월</p>
                <p>관계 법령에 개인정보의 보유기간에 대한 근거가 있는 경우는 다음과 같습니다.</p>
                <p>계약 또는 청약철회 등에 관한 기록</p>
                <p>보관 근거 : 전자상거래 등에서의 소비자보호에 관한 법률</p>
                <p>보관 기간 : 5년</p>
                <p>대금결제 및 재화 등의 공급에 관한 기록</p>
                <p>보관 근거 : 전자상거래 등에서의 소비자보호에 관한 법률</p>
                <p>보관 기간 : 5년</p>
                <p>소비자의 불만 또는 분쟁 처리에 관한 기록</p>
                <p>보관 근거 : 전자상거래 등에서의 소비자보호에 관한 법률</p>
                <p>보관 기간 : 3년</p>
                <p>통신사실확인자료 보관</p>
                <p>보존 근거 : 통신비밀보호법</p>
                <p>보존 기간 : 3개월</p>
            </div>`,
            showCancelButton: true,
            confirmButtonText: '동의',
            cancelButtonText: '취소'
        }).then((result) => {
            if (result.isConfirmed) {
                setTermsAccepted(true);
            } else {
                setTermsAccepted(false);
            }
        });
    };

    const duplicatecheck = async () => {
        const data = {
            userID: document.getElementById('id_val').value.trim()
        }
        const result = await postIdCheck(data);
        console.log("🚀 ~ duplicatecheck ~ result:", result)
        Swal.fire({
            icon: result.success ? 'success' : 'error',
            title: '아이디 체크',
            text: result.message,
        });

    }

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
        setPasswordMatch(e.target.value === confirmPassword);
    };

    const handleConfirmPasswordChange = (e) => {
        setConfirmPassword(e.target.value);
        setPasswordMatch(password === e.target.value);
    };

    const submitClick = async (type, e) => {
        e.preventDefault();

        if (!recaptchaValue) {
            Swal.fire({
                icon: 'warning',
                title: 'AI 체크',
                text: '리캡챠 체크가 안되었습니다.',
            });
            return;
        }

        if (!termsAccepted) {
            Swal.fire({
                icon: 'warning',
                title: '약관 동의 필요',
                text: '약관에 동의해야 회원가입을 진행할 수 있습니다.',
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
            recaptcha: recaptchaValue, // 올바른 상태 사용
        };

        try {
            const result = await postRegister(data);

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
                        <h2 className="s_tit1">
                            <a href='/'>
                                <img src={logImg} alt="login logo" />
                            </a>
                            회원가입
                        </h2>
                        <form method="post" name="frm">
                            <div className="re1_wrap">
                                <div className="re_cnt ct2">
                                    <div className='form_list'>
                                        <div className='form_item id'>
                                            <span className="icon">
                                                <img src={idIcon} alt="id icon" />
                                            </span>
                                            <input
                                                id="id_val"
                                                type="text"
                                                name="is_Userid"
                                                placeholder="아이디"
                                            />
                                            <div className='btn'>
                                                <Button onClick={duplicatecheck} variant="outlined" className='id_validation'>중복 확인</Button>
                                            </div>
                                        </div>
                                        <div className='form_item'>
                                            <span className="icon">
                                                <img src={pwIcon} alt="pw icon" />
                                            </span>
                                            <input
                                                id="pwd_val"
                                                type="password"
                                                name="is_Password"
                                                placeholder="비밀번호"
                                                value={password}
                                                onChange={handlePasswordChange}
                                            />
                                        </div>
                                        <div className='form_item'>
                                            <span className="icon">
                                                <img src={pwIcon} alt="pw icon" />
                                            </span>
                                            <input
                                                id="pwd_cnf_val"
                                                type="password"
                                                name="is_Password"
                                                placeholder="비밀번호 확인"
                                                value={confirmPassword}
                                                onChange={handleConfirmPasswordChange}
                                            />
                                            {!passwordMatch && (
                                                <span style={{ color: 'red', marginLeft: '10px' }}>
                                                    비밀번호가 일치하지 않습니다.
                                                </span>
                                            )}
                                        </div>
                                        <div className='form_item'>
                                            <span className="icon">
                                                <img src={nameIcon} alt="name icon" />
                                            </span>
                                            <input
                                                id="name_val"
                                                type="text"
                                                name="is_Username"
                                                placeholder="이름"
                                            />
                                        </div>
                                        <div className='form_item'>
                                            <span className="icon">
                                                <img src={emailIcon} alt="email icon" />
                                            </span>
                                            <input
                                                id="email_val"
                                                type="text"
                                                name="is_Useremail1"
                                                placeholder="이메일"
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
                                            <div className='btn'>
                                                <Button onClick={duplicatecheck} variant="outlined" className='id_validation'>중복 확인</Button>
                                            </div>
                                        </div>
                                        <div className='form_item'>
                                            <span className="icon">
                                                <img src={addrIcon} alt="addr icon" />
                                            </span>
                                            <SimpleDialogDemo onAddressSelect={handleAddressSelect} />
                                            <div className='address_out'>{address}</div>
                                        </div>
                                        <div className='form_item'>
                                            <span className="icon">
                                                <img src={phoneIcon} alt="phone icon" />
                                            </span>
                                            <input
                                                id="phone1_val"
                                                type="text"
                                                name="is_Userphone1"
                                                maxLength="3"
                                                placeholder='010'
                                            />
                                            <span className="tel_dot">-</span>
                                            <input
                                                id="phone2_val"
                                                name="is_Userphone2"
                                                type='text'
                                                max="9999"
                                                maxLength="4"
                                                onChange={(e) => mustNumber('phone2_val')}
                                            />
                                            <span className="tel_dot">-</span>
                                            <input
                                                id="phone3_val"
                                                name="is_Userphone3"
                                                type='text'
                                                max="9999"
                                                maxLength="4"
                                                onChange={(e) => mustNumber('phone3_val')}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="re1_wrap">
                                <ReCAPTCHA
                                    sitekey="6Ld9Y_UpAAAAAJGCq3NInWaTCDtH6nHjA9_rP6AU" // 자신의 사이트 키로 대체하세요.
                                    onChange={onRecaptchaChange}
                                />
                            </div>
                            <div className="terms_wrap">
                                <div className="terms_details">
                                    <label>
                                        <input type="checkbox" checked={termsAccepted} onChange={handleTermsClick} />
                                        약관에 동의합니다.
                                    </label>
                                </div>
                            </div>
                            <div className="btn_confirm">
                                <button className="bt_ty bt_ty2 submit_ty1" onClick={(e) => submitClick('signup', e)}>
                                    회원가입
                                </button>
                            </div>
                        </form>
                    </div>
                </article>
            </section>
        </div>
    );
}

export default Register;
