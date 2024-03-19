import React, {useState} from 'react'
import './MyInfo.css'

function EmployeeTableRow({attr, content}) {
    if (attr === null) {
        return (
            <tr>
                <td colSpan={2}><h3>{content}</h3></td>
            </tr>);
    } else {
        return (
            <tr>
                <td>{attr}</td>
                <td>{content}</td>
            </tr>
        );
    }
}


export default function MyInfo({employee}) {
    return (
        <div className={'info'}>
            <table>
                <EmployeeTableRow attr={null} content={'나의 정보'}/>
                <EmployeeTableRow attr={'이름'} content={employee.name}/>
                <EmployeeTableRow attr={'성별'} content={employee.gender === 0 ? '남' : '여'}/>
                <EmployeeTableRow attr={'부서'} content={employee.department}/>
            </table>
        </div>
    );
}