import React, {useState} from 'react';
import Login from './login/Login';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Register from "./register/Register";
import ExternalHtmlComponent from "./main/Main";




export default function DdinggeunMarket() {

    const [authenticated, setAuthenticated] = useState(false);
    const [user, setUser] = useState(null);



    return (
        authenticated ? <ExternalHtmlComponent user={user}/> : <Login setAuthenticated={setAuthenticated} setUser={setUser}/>
    );
}