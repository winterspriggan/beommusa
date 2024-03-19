import React from "react";
import './Button.css';

export default function Button({text, type = 'submit', onClick}) {
    return (
        <button className='Button' type={type} onClick={onClick}>{text}</button>
    );
}