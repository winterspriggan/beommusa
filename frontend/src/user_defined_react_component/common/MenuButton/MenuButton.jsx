import React, {useState} from 'react';
import './MenuButton.css'

export default function MenuButton({text, name, setMainContents}) {

    return (
        <button className='menu_button' onClick={e => setMainContents(name)}>{text}</button>
    );
}