import React, {useEffect, useState} from "react";
import axios from "axios";
import './CreateAnswer.css'
import {ENDPOINT_GET_BOARDS, ENDPOINT_POST_ANSWER_BOARD} from "../../../../common/Endpoint/Endpoint";
import swal from "sweetalert";
import Button from "../../../../common/Button/Button";

function BoardRecord({board, employee}) {
    function answerBoard() {
        swal({
            content: "input",
        }).then(answer => {
            if (answer === '') {
                swal({
                    title: '답변 등록 실패',
                    text: '입력이 비어있습니다.',
                    icon: 'error',
                    button: '확인',
                });
            } else {
                axios.post(ENDPOINT_POST_ANSWER_BOARD, null, {
                    params: {
                        id: board.id,
                        answer: answer,
                        answerer: employee.id,
                        is_answered: 1
                    }
                })
                    .then(response => {
                        if (response.data === true) {
                            swal({
                                title: '답변 등록 성공',
                                text: '답변이 등록되었습니다.',
                                icon: 'success',
                                button: '확인',
                            });
                        } else {
                            swal({
                                title: '답변 등록 실패',
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
            }
        });
    }

    return (
        <tr>
            <td>{board.title}</td>
            <td>{board.author}</td>
            <td>{board.content}</td>
            <td><Button text={'답변하기'} onClick={answerBoard}/></td>
        </tr>
    );
}

export default function CreateAnswer({employee}) {

    const [boards, setBoards] = useState(null);

    function refreshBoards() {
        axios.get(ENDPOINT_GET_BOARDS)
            .then(response => {
                setBoards(response.data);
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
        refreshBoards();
    }, []);

    return (
        <div className={'create_answer'}>
            <h2>문의 게시판</h2>
            <table>
                <tr>
                    <th>제목</th>
                    <th>작성자</th>
                    <th>내용</th>
                    <th>답변 버튼</th>
                </tr>
                {boards !== null ? boards.filter(board => board.is_answered === 0).map(board => <BoardRecord
                        board={board} employee={employee}/>)
                    : "LOADING..."
                }
            </table>
        </div>
    );
}