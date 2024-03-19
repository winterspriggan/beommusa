import React, {useState} from 'react';
import MainContents from './MainContents/MainContents'
import MenuButton from '../../common/MenuButton/MenuButton'
import './Main.css';

export default function Main({employee}) {

    const [mainContents, setMainContents] = useState('MyInfo');

    return (
        <div className='main'>
            <div className="menu">
                <ul>
                    <MenuButton text={'나의 정보'} name={'MyInfo'} setMainContents={setMainContents}></MenuButton>
                    <MenuButton text={'상품 개발'} name={'DevelopProduct'} setMainContents={setMainContents}></MenuButton>
                    <MenuButton text={'요율 결정'} name={'Underwrite'} setMainContents={setMainContents}></MenuButton>
                    <MenuButton text={'상품 조회'} name={'ViewProducts'} setMainContents={setMainContents}></MenuButton>
                    <MenuButton text={'문의 답변'} name={'CreateAnswer'} setMainContents={setMainContents}></MenuButton>
                    <MenuButton text={'조사보고서 제출'} name={'CreateReport'} setMainContents={setMainContents}></MenuButton>
                    <MenuButton text={'청구 심사'} name={'ReviewClaim'} setMainContents={setMainContents}></MenuButton>
                    <MenuButton text={'보상금 지급'} name={'PayCompensation'} setMainContents={setMainContents}></MenuButton>
                </ul>
            </div>
            <div className="main_contents">
                <MainContents panelName={mainContents} employee={employee}/>
            </div>
        </div>
    );
}