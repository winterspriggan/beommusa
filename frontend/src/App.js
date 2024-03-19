import logo from './logo.svg';
import './App.css';
// import './component/DdinggeunMarket'
import DdinggeunMarket from "./view/DdinggeunMarket";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Login from "./view/login/Login";
import Register from "./view/register/Register";
import React from "react";

function App() {
  return (
      <div className="App">
          <BrowserRouter>
              <Routes>
                  <Route path="/" element={<DdinggeunMarket/>} />
                  <Route path="register" element={<Register />} />
              </Routes>
          </BrowserRouter>
      </div>
  );
}

export default App;
