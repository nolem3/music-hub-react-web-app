import { useEffect } from 'react';
import { HashRouter, Routes, Route, Navigate } from "react-router-dom";
import { Provider } from 'react-redux';
import { useSelector, useDispatch } from "react-redux";
import { HubState } from "./store"
import axios from "axios";
import store from "./store"
import Home from './Home';
import Profile from './Profile';
import Navigation from './Navigation';
import Details from './Details';
import Login from './Login';
import Signup from './Login/Signup';
import Search from './Search';
import ProfileEdit from './Profile/Edit';
import {
    setAccessToken
} from "./reducer";
import ProfileFollows from './Profile/Follows';
import CreatorView from './Profile/Creator';
//import './App.css';

function App() {

    //const accessToken = useSelector((state: HubState) => state.hubReducer.accessToken);
    const dispatch = useDispatch();
    const getAccessToken = async () => {
        //console.log(`grant_type=client_credentials&client_id=${process.env.REACT_APP_CLIENT_ID}&client_secret=${process.env.REACT_APP_CLIENT_SECRET}`)
        const response = await axios.post("https://accounts.spotify.com/api/token",
            `grant_type=client_credentials&client_id=${process.env.REACT_APP_CLIENT_ID}&client_secret=${process.env.REACT_APP_CLIENT_SECRET}`);
        dispatch(setAccessToken(response.data.access_token));
    }
    useEffect(() => {
        getAccessToken();
    }, []);

    return (
        <div className="App">
            <HashRouter>
                <Navigation />
                <Routes>
                    <Route path="/" element={<Navigate to="/Home" />}></Route>
                    <Route path="/Home/*" element={<Home />}></Route>
                    <Route path="/Profile/Edit" element={<ProfileEdit />}></Route>
                    <Route path="/Profile/Follows/*" element={<ProfileFollows />}></Route>
                    <Route path="/Profile/Creator" element={<CreatorView />}></Route>
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
