import React from "react";
import './SelectInput.css';

export default function SelectInput({text, values, onChange}) {

    let options = null;
    if (values !== null) {
        options = values.map(value =>
            <option value={value}>{value}</option>
        );
    }

    return (
        <div className="select_input">
            <label>{text}</label>
            <select onChange={onChange}>
                {options}
            </select>
        </div>
    );
}