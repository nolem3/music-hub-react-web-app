import React from 'react';
import { HashRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from './Home';
import Navigation from './Navigation';

import './App.css';

function App() {
    return (
        <div className="App">
            <Navigation />
            <HashRouter>
                <Routes>
                    <Route path="/" element={<Navigate to="/Home" />}></Route>
                    <Route path="/Home" element={<Home />}></Route>
                </Routes>
            </HashRouter>
        </div>
    );
}

export default App;
