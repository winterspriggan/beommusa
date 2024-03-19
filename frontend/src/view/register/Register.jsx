import React, {useState} from 'react';
import './Register.css';
import axios from "axios";
import swal from 'sweetalert'
import TextInput from "../../component/TextInput/TextInput";
import Button from "../../component/Button/Button";
import { useNavigate } from 'react-router-dom';

export default function Register() {

    const [id, setId] = useState('');
    const [password, setPassword] = useState('');
    const [phoneNumb, setPhoneNumb] = useState('');
    const [dob, setDob] = useState('');
    const [email, setEmail] = useState('');
    const [address, setAddress] = useState('');
    const [name, setName] = useState('');
    const [currentPage, setCurrentPage] = useState('login');
    const navigate = useNavigate();





    const handleSubmit = async (e) => {
        e.preventDefault();
        // axios.post('http://localhost:40040/user/create', {
        await axios.post('http://localhost:40040/user/create',  {
                id: id,
                password: password,
                phoneNumb: phoneNumb,
                dob: dob,
                email: email,
                address: address,
                name: name
        })
            .then(response => {
                if (response.data === '')
                    swal({
                        title: '회원가입 실패',
                        text: '입력정보를 다시 확인해주세요.',
                        icon: 'error',
                        button: '확인',
                    });
                else {
                    swal({
                        title: '회원가입 성공',
                        text: '환영합니다, ' + response.data.name + '님!',
                        icon: 'success',
                        button: '확인',
                    });

                }
                navigate('/');
            })
            .catch(e => {
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

            <h2>띵근마켓 회원가입</h2>
            <form onSubmit={handleSubmit}>
                <TextInput text={'아이디'} value={id} onChange={(e) => setId(e.target.value)}/>
                <TextInput text={'비밀번호'} type={'password'} value={password}
                           onChange={(e) => setPassword(e.target.value)}/>
                <TextInput text={'전화번호'} value={phoneNumb} onChange={(e) => setPhoneNumb(e.target.value)}/>
                <TextInput text={'생년월일'} value={dob} onChange={(e) => setDob(e.target.value)}/>
                <TextInput text={'이메일'} value={email} onChange={(e) => setEmail(e.target.value)}/>
                <TextInput text={'주소'} value={address} onChange={(e) => setAddress(e.target.value)}/>
                <TextInput text={'이름'} value={name} onChange={(e) => setName(e.target.value)}/>

                <Button text={'가입하기'}/>
            </form>
        </div>
        </body>
    );
}