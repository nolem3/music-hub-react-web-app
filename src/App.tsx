import React from 'react';
import { HashRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from './Home';
import Profile from './Profile';
import Navigation from './Navigation';
import Details from './Details';
import Login from './Login';
import Signup from './Login/Signup';
import Search from './Search';
//import './App.css';

function App() {
    return (
        <div className="App">
            <HashRouter>
                <Navigation />
                <Routes>
                    <Route path="/" element={<Navigate to="/Home" />}></Route>
                    <Route path="/Home/*" element={<Home />}></Route>
                    <Route path="/Profile/*" element={<Profile />}></Route>
                    <Route path="/Details/*" element={<Details />}></Route>
                    <Route path="/Login/" element={<Login />}></Route>
                    <Route path="/Login/Signup/" element={<Signup />}></Route>
                    <Route path="/Search/*" element={<Search />}></Route>
                </Routes>
            </HashRouter>
        </div>
    );
}

export default App;
