import { useState, useEffect } from "react";
import * as userClient from "../Users/client"
import * as playlistClient from "../Playlists/client"
import { useSelector, useDispatch } from "react-redux";
import { HubState } from "../store";
import {
    toggleUserRole,
    logout
} from "../reducer";
import "./index.css"
import CardGrid from "../components/CardGrid";
import { useNavigate } from "react-router";

export default function Profile() {

    const [profile, setProfile] = useState({
        username: "", password: "",
        firstName: "", lastName: "", email: ""
    });
    const [error, setError] = useState<any>(null)
    const fetchProfile = async () => {
        try {
            const account = await userClient.profile();
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
        const response = await userClient.logout();
        dispatch(logout());
    };

    const [playlists, setPlaylists] = useState<any>([]);
    const createPlaylist = async () => {
        const playlist = await playlistClient.createPlaylist({ name: "New Playlist", creatorName: profile.username, tracks: [] });
        setPlaylists([...playlists, playlist]);
    }
    const fetchPlaylists = async () => {
        const resultingPlaylists = await playlistClient.findPlaylistsOfCreator(profile.username);
        setPlaylists(resultingPlaylists);
    }
    useEffect(() => {
        fetchPlaylists();
    }, [profile]);

    const navigate = useNavigate();

    return (
        <>
            {error ? <h3>{error}</h3> :
                <div className="mh-profile">
                    <h1>{profile.username}'s Profile</h1>
                    <h5>{profile.firstName} {profile.lastName}</h5>
                    <div className="mh-profile-buttons">
                        <button className="mh-edit-profile-button" onClick={() => navigate("/Profile/Edit")}>Edit Profile</button>
                        <button className="mh-toggle-role-button" onClick={() => dispatch(toggleUserRole())}>Toggle Role</button>
                        <button className="mh-logout-button" onClick={userLogout}>Logout</button>
                    </div>
                    <div className="mh-profile-playlists">
                        <h2>Playlists</h2>
                        {!userIsListener && <button onClick={createPlaylist}>New Playlist</button>}
                    </div>
                    <hr />
                    <div>
                        <CardGrid cardDetails={playlistClient.playlistsToCardDetails(playlists)} />
                    </div>

                </div >
            }
        </>
    )
}