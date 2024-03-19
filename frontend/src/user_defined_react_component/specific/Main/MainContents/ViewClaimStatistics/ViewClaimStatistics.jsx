import React, {useEffect, useState} from "react";
import axios from "axios";
import './ViewClaimStatistics.css'
import {
    ENDPOINT_GET_CLAIM_STATISTICS,
} from "../../../../common/Endpoint/Endpoint";
import swal from "sweetalert";

export default function ViewClaimStatistics({employee}) {

    const [claimStatistics, setClaimStatistics] = useState(null);

    useEffect(() => {
            axios.get(ENDPOINT_GET_CLAIM_STATISTICS)
                .then(response => {
                    setClaimStatistics(response.data);
                })
                .catch(error => {
                    swal({
                        title: '시스템 오류',
                        text: '잠시후 다시 시도해주세요. 불편을 드려 죄송합니다.',
                        icon: 'error',
                        button: '확인',
                    });
                });
        },
        []
    );

    if (claimStatistics === null) return null;
    return (
        <div className={'view_claim_statistics'}>
            <h2>고객 통계</h2>
            <table>
                <tr>
                    <td>평균 보상금</td>
                    <td>{claimStatistics.average_compensation}</td>
                </tr>
            </table>
        </div>
    );
}