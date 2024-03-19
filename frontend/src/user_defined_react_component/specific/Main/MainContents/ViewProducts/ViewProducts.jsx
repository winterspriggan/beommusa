import React, {useEffect, useState} from "react";
import axios from "axios";
import './ViewProducts.css'
import {ENDPOINT_GET_PRODUCTS} from "../../../../common/Endpoint/Endpoint";
import swal from "sweetalert";

export default function ViewProducts({employee}) {

    const [products, setProducts] = useState(null);

    useEffect(() => {
            axios.get(ENDPOINT_GET_PRODUCTS)
                .then(response => {
                    setProducts(response.data);
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

    return (
        <div className={'view_products'}>
            <h2>전체 상품 조회</h2>
            <table>
                <tr>
                    <th>아이디</th>
                    <th>이름</th>
                    <th>보험료</th>
                    <th>고령 요율</th>
                    <th>남성 요율</th>
                    <th>여성 요율</th>
                    <th>위험 직업 요율</th>
                    <th>흡연 요율</th>
                    <th>공개 여부</th>
                </tr>
                {products !== null ? products.map(product => <tr>
                    <td>{product.id}</td>
                    <td>{product.name}</td>
                    <td>{product.premium}</td>
                    <td>{product.senior_rate}</td>
                    <td>{product.male_rate}</td>
                    <td>{product.female_rate}</td>
                    <td>{product.occupational_hazard_rate}</td>
                    <td>{product.smoking_rate}</td>
                    <td>{product.released === 0 ? '아니오' : '네'}</td>
                </tr>) : 'LOADING...'}
            </table>
        </div>
    );
}