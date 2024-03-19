import React, {useEffect, useState} from "react";
import axios from "axios";
import './CreateReport.css'
import {
    ENDPOINT_GET_MANAGING_CLAIMS,
    ENDPOINT_POST_ANSWER_BOARD, ENDPOINT_POST_REPORT
} from "../../../../common/Endpoint/Endpoint";
import swal from "sweetalert";
import Button from "../../../../common/Button/Button";
import {isWhitespace} from "../../../../common/utils";

function ClaimRecord({claim, employee}) {
    function submitReport() {

        let report;
        let compensation = 0;

        swal({
            text: '조사보고서 입력',
            content: "input",
        }).then(input => {
            report = input
            swal({
                text: '보상금 입력',
                content: "input",
            }).then(input => {
                compensation = input
                if (isWhitespace(report) || isNaN(compensation)){
                    swal({
                        title: '조사보고서 제출 실패',
                        text: '입력을 다시 확인해주세요.',
                        icon: 'error',
                        button: '확인',
                    });
                    return;
                }
                axios.post(ENDPOINT_POST_REPORT, null, {
                    params: {
                        id: claim.id,
                        compensation: compensation,
                        report: report
                    }
                })
                    .then(response => {
                        if (response.data === true) {
                            swal({
                                title: '조사보고서 제출 성공',
                                text: '조사보고서가 제출되었습니다.',
                                icon: 'success',
                                button: '확인',
                            });
                        } else {
                            swal({
                                title: '조사보고서 제출 실패',
                                text: '입력을 다시 확인해주세요.',
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
            <td><Button text={'제출'} onClick={submitReport}/></td>
        </tr>
    );
}

export default function CreateReport({employee}) {

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

    if (employee.department !== 'INVESTIGATING') {
        swal({
            title: '권한 없음',
            text: '보험조사팀만 이용 가능한 메뉴입니다.',
            icon: 'error',
            button: '확인',
        });
        return null;
    }

    return (
        <div className={'create_report'}>
            <h2>조사보고서 제출</h2>
            <table>
                <tr>
                    <th>청구 아이디</th>
                    <th>계약 아이디</th>
                    <th>날짜</th>
                    <th>내용</th>
                    <th>조사 담당자</th>
                    <th>심사 담당자</th>
                    <th>제출 버튼</th>
                </tr>
                {claims !== null ? claims.map(claim => <ClaimRecord
                        claim={claim} employee={employee}/>)
                    : "LOADING..."
                }
            </table>
        </div>
    );
}