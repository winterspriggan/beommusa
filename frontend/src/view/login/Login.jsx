import React, { useState } from 'react';
import './Login.css';
import axios from 'axios';
import swal from 'sweetalert';
import TextInput from '../../component/TextInput/TextInput';
import Button from '../../component/Button/Button';
// import Register from '../register/Register';
import {Link} from "react-router-dom";
import { SocialKakao } from "./KakaoLogin.jsx";
import ExternalHtmlComponent from "../main/Main";

export default function Login({ setAuthenticated, setUser }) {
    const [userId, setUserId] = useState('');
    const [userPassword, setUserPassword] = useState('');
    const [currentPage, setCurrentPage] = useState('login');

    const handleSubmit = async (e) => {
        e.preventDefault();
        axios
            .get('http://localhost:40040/login', {
                params: {
                    id: userId,
                    password: userPassword,
                },
            })
            .then((response) => {
                if (response.data === '')
                    swal({
                        title: '로그인 실패',
                        text: '아이디 및 비밀번호를 다시 확인해주세요.',
                        icon: 'error',
                        button: '확인',
                    });
                else {
                    swal({
                        title: '로그인 성공',
                        text: '환영합니다, ' + response.data.name + '님!',
                        icon: 'success',
                        button: '확인',
                    });
                    setUser({
                        id: response.data.id,
                        name: response.data.name,
                    });
                    setAuthenticated(true);
                }
            })
            .catch((e) => {
                swal({
                    title: '시스템 오류',
                    text: '잠시후 다시 시도해주세요. 불편을 드려 죄송합니다.',
                    icon: 'error',
                    button: '확인',
                });
            });
    };



    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    return (
        <body>
        <div className="login-space">
            <h2>띵근마켓 로그인</h2>
            {currentPage === 'login' && (
                <form onSubmit={handleSubmit}>
                    <TextInput
                        text={'아이디'}
                        value={userId}
                        onChange={(e) => setUserId(e.target.value)}
                    />
                    <TextInput
                        text={'비밀번호'}
                        type={'password'}
                        value={userPassword}
                        onChange={(e) => setUserPassword(e.target.value)}
                    />

                    <Button text={'로그인'} onClick={() => handlePageChange('login')}/>
                    <Link to={"/register"}>
                        <Button text={'회원가입'}/>
                    </Link>
                </form>
            )}
            {/*{currentPage === 'register' && <Register />}*/}
            {/*<Button text={'회원가입'} onClick={() => handlePageChange('register')} />*/}
            <SocialKakao setAuthenticated={setAuthenticated} setUser={setUser}/>
        </div>
        </body>
    );
}


