import React from "react";
import './TextInput.css';

export default function TextInput({text, type = 'text', value, onChange}) {
    return (
        <div className="text_input">
            <label>{text}</label>
            <input type={type} value={value} onChange={onChange} required/>
        </div>
    );
}