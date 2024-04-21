import { useState, useEffect } from "react";
import * as client from "../Users/client"
import { useSelector, useDispatch } from "react-redux";
import { HubState } from "../store";
import {
    toggleUserRole,
    logout
} from "../reducer";

export default function Profile() {
    const [profile, setProfile] = useState({
        username: "", password: "",
        firstName: "", lastName: "", email: ""
    });
    const [error, setError] = useState<any>(null)
    const fetchProfile = async () => {
        try {
            const account = await client.profile();
            setProfile(account);
        } catch (err: any) {
            setError("Not logged in");
        }
    };
    useEffect(() => {
        fetchProfile();
    }, []);
    const userIsListener = useSelector((state: HubState) => state.hubReducer.userIsListener);
    const dispatch = useDispatch();

    const userLogout = async () => {
        const response = await client.logout();
        dispatch(logout());
    }

    return (
        <>
            {error ? <h3>{error}</h3> :
                <div>
                    <h2>{profile.username}</h2>
                    <br/>
                    <button onClick={() => dispatch(toggleUserRole())}>Toggle Role</button>
                    <br/>
                    <h2>Role: {userIsListener ? "Listener" : "Creator"}</h2>
                    <br/>
                    <button onClick={userLogout}>Logout</button>
                </div>
            }
        </>
    )
}