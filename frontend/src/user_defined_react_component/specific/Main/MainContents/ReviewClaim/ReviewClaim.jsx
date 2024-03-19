import React, {useEffect, useState} from "react";
import axios from "axios";
import './ReviewClaim.css'
import {
    ENDPOINT_GET_MANAGING_CLAIMS,
    ENDPOINT_POST_ANSWER_BOARD, ENDPOINT_POST_REPORT, ENDPOINT_POST_REVIEW_CLAIM
} from "../../../../common/Endpoint/Endpoint";
import swal from "sweetalert";
import Button from "../../../../common/Button/Button";

function ClaimRecord({claim, employee}) {
    function reviewClaim(result) {
        axios.post(ENDPOINT_POST_REVIEW_CLAIM, null, {
            params: {
                id: claim.id,
                status: result
            }
        })
            .then(response => {
                if (response.data === true) {
                    swal({
                        title: '보상금 청구 심사 완료',
                        text: '보상금 청구 심사가 완료되었습니다.',
                        icon: 'success',
                        button: '확인',
                    });
                } else {
                    swal({
                        title: '보상금 청구 심사 실패',
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
            <td>{claim.date}</td>
            <td>{claim.description}</td>
            <td>{claim.investigator}</td>
            <td>{claim.reviewer}</td>
            <td>{claim.report}</td>
            <td><Button text={'승인'} onClick={e => reviewClaim('ACCEPTED')}/>
                <Button text={'거부'} onClick={e => reviewClaim('REJECTED')}/></td>
        </tr>
    );
}

export default function ReviewClaim({employee}) {

    const [claims, setClaims] = useState(null);

    function refreshClaims() {
        axios.get(ENDPOINT_GET_MANAGING_CLAIMS, {
            params: {id: employee.id}
        })
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

    if (employee.department !== "SUPPORTING") {
        swal({
            title: '권한 없음',
            text: '보험지원팀만 이용 가능한 메뉴입니다.',
            icon: 'error',
            button: '확인',
        });
        return null;
    }

    return (
        <div className={'review_claim'}>
            <h2>보상금 청구 심사</h2>
            <table>
                <tr>
                    <th>청구 아이디</th>
                    <th>계약 아이디</th>
                    <th>날짜</th>
                    <th>내용</th>
                    <th>조사 담당자</th>
                    <th>심사 담당자</th>
                    <th>조사보고서</th>
                    <th>심사 버튼</th>
                </tr>
                {claims !== null ? claims.map(claim => <ClaimRecord
                        claim={claim} employee={employee}/>)
                    : "LOADING..."
                }
            </table>
        </div>
    );
}