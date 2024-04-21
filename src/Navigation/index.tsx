import HomeNav from "./HomeNav"
import SearchNav from "./SearchNav"
import LoginNav from "./LoginNav"
import ProfileNav from "./ProfileNav"
import "./index.css"
import { useDispatch, useSelector } from "react-redux"
import { HubState } from "../store"
import {login, logout} from "../reducer"
import { useEffect } from "react"
import * as client from "../Users/client"

export default function Navigation() {

    const loggedIn = useSelector((state: HubState) => state.hubReducer.loggedIn);
    const dispatch = useDispatch();
    const fetchProfile = async () => {
        try {
            const account = await client.profile();
            dispatch(login());
        } catch (err: any) {
            dispatch(logout());
        }
    };
    useEffect(() => {
        fetchProfile();
    }, []);

    return (
        <nav>
            <HomeNav />
            <SearchNav />
            {loggedIn ? <ProfileNav /> : <LoginNav />}
        </nav>
    )
}