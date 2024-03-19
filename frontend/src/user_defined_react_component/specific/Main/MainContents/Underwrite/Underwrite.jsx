import React, {useEffect, useState} from "react";
import axios from "axios";
import {ENDPOINT_GET_PRODUCTS, ENDPOINT_POST_UNDERWRITE} from "../../../../common/Endpoint/Endpoint";
import TextInput from "../../../../common/TextInput/TextInput";
import Button from "../../../../common/Button/Button";
import SelectInput from "../../../../common/SelectInput/SelectInput";
import swal from "sweetalert";
import './Underwrite.css'
import {isWhitespace} from "../../../../common/utils";

export default function Underwrite({employee}) {

    const [products, setProducts] = useState(null);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [seniorRate, setSeniorRate] = useState(1.0);
    const [maleRate, setMaleRate] = useState(1.0);
    const [femaleRate, setFemaleRate] = useState(1.0);
    const [occupationalHazardRate, setOccupationalHazardRate] = useState(1.0);
    const [smokingRate, setSmokingRate] = useState(1.0);

    function checkInput(s) {
        if (isWhitespace(s)) return false;
        console.log(typeof s);
        return typeof s === 'number';
    }

    useEffect(() => {
        axios.get(ENDPOINT_GET_PRODUCTS)
            .then(response => {
                setProducts(response.data);
                console.log(response.data);
                if (response.data.filter(p => p.released === 0).length === 0) setSelectedProduct(null);
                else setSelectedProduct(response.data.filter(p => p.released === 0)[0].name);
            })
            .catch(error => {
                console.log(error);
                swal({
                    title: '시스템 오류',
                    text: '잠시후 다시 시도해주세요. 불편을 드려 죄송합니다.',
                    icon: 'error',
                    button: '확인',
                });
            });
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!checkInput(seniorRate) || !checkInput(maleRate)
            || !checkInput(femaleRate) || !checkInput(occupationalHazardRate) || !checkInput(smokingRate)) {
            swal({
                title: '요율 결정 실패',
                text: '숫자만 입력해주세요.',
                icon: 'error',
                button: '확인',
            });
            return;
        }
        await axios.post(ENDPOINT_POST_UNDERWRITE, null, {
            params: {
                id: products.find(p => p.name === selectedProduct)?.id,
                senior_rate: seniorRate,
                male_rate: maleRate,
                female_rate: femaleRate,
                occupational_hazard_rate: occupationalHazardRate,
                smoking_rate: smokingRate,
            }
        })
            .then(response => {
                if (response.data === false)
                    swal({
                        title: '요율 결정 실패',
                        text: '입력을 다시 확인해주세요.',
                        icon: 'error',
                        button: '확인',
                    });
                else
                    swal({
                        title: '요율 결정 성공',
                        text: '요율이 결정되어 상품이 공개 상태로 전환되었습니다.',
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

    if (employee.department !== "UNDERWRITING") {
        swal({
            title: '권한 없음',
            text: '언더라이팅팀만 이용 가능한 메뉴입니다.',
            icon: 'error',
            button: '확인',
        });
        return null;
    } else if (products === null) return null;


    return (
        <form onSubmit={handleSubmit} className={'underwrite'}>
            <SelectInput text={'상품 이름'} values={products.filter(p => p.released === 0).map(p => p.name)}
                         onChange={(e) => setSelectedProduct(e.target.value)}/>
            <TextInput text={'고령 요율'} value={seniorRate} onChange={(e) => setSeniorRate(e.target.value)}/>
            <TextInput text={'남성 요율'} value={maleRate} onChange={(e) => setMaleRate(e.target.value)}/>
            <TextInput text={'여성 요율'} value={femaleRate} onChange={(e) => setFemaleRate(e.target.value)}/>
            <TextInput text={'위험 직업 요율'} value={occupationalHazardRate}
                       onChange={(e) => setOccupationalHazardRate(e.target.value)}/>
            <TextInput text={'흡연 요율'} value={smokingRate} onChange={(e) => setSmokingRate(e.target.value)}/>
            <Button text={'제출'}/>
        </form>
    );
}