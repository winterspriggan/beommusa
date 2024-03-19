import React, {useState} from "react";
import axios from "axios";
import swal from "sweetalert";
import TextInput from "../../../../common/TextInput/TextInput";
import Button from "../../../../common/Button/Button";
import {ENDPOINT_POST_PRODUCT} from "../../../../common/Endpoint/Endpoint";
import {isWhitespace} from "../../../../common/utils.js";
import './DevelopProduct.css'

export default function DevelopProduct({employee}) {

    const [name, setName] = useState('');
    const [premium, setPremium] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (isWhitespace(name)){
            swal({
                title: '상품 등록 실패',
                text: '공백이 입력되었습니다.',
                icon: 'error',
                button: '확인',
            });
            return;
        }
        // if (typeof premium !== 'number'){
        //     swal({
        //         title: '상품 등록 실패',
        //         text: '보험료를 숫자로 입력해주세요',
        //         icon: 'error',
        //         button: '확인',
        //     });
        //     return;
        // }
        await axios.post(ENDPOINT_POST_PRODUCT, null, {
            params: {
                name: name,
                premium: premium
            }
        })
            .then(response => {
                if (response.data === '')
                    swal({
                        title: '상품 등록 실패',
                        text: '입력을 다시 확인해주세요.',
                        icon: 'error',
                        button: '확인',
                    });
                else if (response.data.id === 'SameNameException')
                    swal({
                        title: '상품 등록 실패',
                        text: '같은 이름의 상품이 존재합니다.',
                        icon: 'error',
                        button: '확인',
                    });
                else swal({
                    title: '상품 등록 성공',
                    text: '상품이 등록되었습니다.',
                    icon: 'success',
                    button: '확인',
                });
            })
            .catch(error => {
                swal({
                    title: '시스템 오류',
                    text: '잠시후 다시 시도해주세요. 불편을 드려 죄송합니다.',
                    icon: 'error',
                    button: '확인',
                });
            });
    };

    if (employee.department !== "DEVELOPMENT") {
        swal({
            title: '권한 없음',
            text: '개발팀만 이용 가능한 메뉴입니다.',
            icon: 'error',
            button: '확인',
        });
        return null;
    }

    return (
        <form onSubmit={handleSubmit} className={'develop_product'}>
            <h2>상품 개발</h2>
            <TextInput text={'상품 이름'} value={name} onChange={(e) => setName(e.target.value)}/>
            <TextInput text={'보험료'} value={premium} onChange={(e) => setPremium(e.target.value)}/>
            <Button text={'제출'}/>
        </form>
    );
}