import React, {useState} from 'react';
import Login from '../Login/Login';
import Main from '../Main/Main';


export default function OurInsurance() {

    const [authenticated, setAuthenticated] = useState(false);
    const [employee, setEmployee] = useState(null);

    return (
        authenticated ? <Main employee={employee}/> : <Login setAuthenticated={setAuthenticated} setEmployee={setEmployee}/>
    );
}