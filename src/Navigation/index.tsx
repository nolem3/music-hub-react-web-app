import { useState, useEffect } from "react"
import HomeNav from "./HomeNav"
import SearchNav from "./SearchNav"
import LoginNav from "./LoginNav"
import ProfileNav from "./ProfileNav"
import "./index.css"
import * as client from "../Users/client"

export default function Navigation() {
    const [loggedIn, setLoggedIn] = useState(false);
    const fetchProfile = async () => {
        try {
            const account = await client.profile();
            setLoggedIn(true);
        } catch (err: any) {
            setLoggedIn(false);
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