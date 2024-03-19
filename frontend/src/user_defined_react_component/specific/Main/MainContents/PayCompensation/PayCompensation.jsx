import React, {useEffect, useState} from "react";
import axios from "axios";
import './PayCompensation.css'
import {
    ENDPOINT_GET_ACCEPTED_CLAIMS,
    ENDPOINT_GET_MANAGING_CLAIMS,
    ENDPOINT_POST_ANSWER_BOARD, ENDPOINT_POST_PAY_COMPENSATION, ENDPOINT_POST_REPORT
} from "../../../../common/Endpoint/Endpoint";
import swal from "sweetalert";
import Button from "../../../../common/Button/Button";

function ClaimRecord({claim, employee}) {
    function payCompensation() {
        axios.post(ENDPOINT_POST_PAY_COMPENSATION, null, {
            params: {id: claim.id}
        })
            .then(response => {
                if (response.data === true) {
                    swal({
                        title: '보상금 지급 성공',
                        text: '보상금이 지급되었습니다.',
                        icon: 'success',
                        button: '확인',
                    });
                } else {
                    swal({
                        title: '보상금 지급 실패',
                        text: '잠시후 다시 시도해주세요.',
                        icon: 'error',
                        button: '확인',
                    });
                }
            })
            .catch(error => {
                swal({
                    title: '시스템 오류',
                    text: '잠시후 다시 시도해주세요. 불편을 드려 죄송합니다.',
                    icon: 'error',
                    button: '확인',
                });
            });
    }

    return (
        <tr>
            <td>{claim.id}</td>
            <td>{claim.contract_id}</td>
            <td>{claim.compensation}</td>
            <td>{claim.date}</td>
            <td>{claim.description}</td>
            <td>{claim.investigator}</td>
            <td>{claim.reviewer}</td>
            <td><Button text={'지급'} onClick={payCompensation}/></td>
        </tr>
    );
}

export default function PayCompensation({employee}) {

    const [claims, setClaims] = useState(null);

    function refreshClaims() {
        axios.get(ENDPOINT_GET_ACCEPTED_CLAIMS)
            .then(response => {
                setClaims(response.data);
            })
            .catch(error => {
                swal({
                    title: '시스템 오류',
                    text: '잠시후 다시 시도해주세요. 불편을 드려 죄송합니다.',
                    icon: 'error',
                    button: '확인',
                });
            });
    }

    useEffect(() => {
        refreshClaims();
    }, []);

    if (employee.department !== 'SUPPORTING') {
        swal({
            title: '권한 없음',
            text: '보험지원팀만 이용 가능한 메뉴입니다.',
            icon: 'error',
            button: '확인',
        });
        return null;
    }

    return (
        <div className={'pay_compensation'}>
            <h2>보상금 지급</h2>
            <table>
                <tr>
                    <th>청구 아이디</th>
                    <th>계약 아이디</th>
                    <th>보상금</th>
                    <th>날짜</th>
                    <th>내용</th>
                    <th>조사 담당자</th>
                    <th>심사 담당자</th>
                    <th>지급 버튼</th>
                </tr>
                {claims !== null ? claims.map(claim => <ClaimRecord
                        claim={claim} employee={employee}/>)
                    : "LOADING..."
                }
            </table>
        </div>
    );
}