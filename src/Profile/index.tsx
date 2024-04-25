import { useState, useEffect } from "react";
import * as userClient from "../Users/client";
import * as playlistClient from "../Playlists/client";
import * as followsClient from "../Follows/client";
import { useSelector, useDispatch } from "react-redux";
import { HubState } from "../store";
import {
    toggleUserRole,
    logout
} from "../reducer";
import "./index.css"
import CardGrid from "../components/CardGrid";
import { useNavigate } from "react-router";
import { useLocation } from "react-router";
import { Link } from "react-router-dom";

export default function Profile() {
    const { pathname } = useLocation();
    const publicUser = pathname.split("Profile/")[1]

    const [visitorUsername, setVisitorUsername] = useState<any>(null);
    const [profile, setProfile] = useState({
        username: "", password: "",
        firstName: "", lastName: "", email: ""
    });
    const [error, setError] = useState<any>(null)
    const fetchProfile = async () => {
        if (!publicUser) {
            try {
                const account = await userClient.profile();
                setProfile(account);
            } catch (err: any) {
                setError("Not logged in");
            }
        } else {
            try {
                const user = await userClient.findUser(publicUser);
                setProfile(user);
            } catch (err) {
                setError(`User ${publicUser} not found`);
            }
            try {
                const account = await userClient.profile();
                setVisitorUsername(account.username);
            } catch (err: any) {
            }
        }
    };
    useEffect(() => {
        fetchProfile();
    }, [pathname]);
    const userIsListener = useSelector((state: HubState) => state.hubReducer.userIsListener);

    const dispatch = useDispatch();
    const userLogout = async () => {
        const response = await userClient.logout();
        dispatch(logout());
        navigate("/Home");
    };

    const [playlists, setPlaylists] = useState<any>([]);
    const createPlaylist = async () => {
        const playlist = await playlistClient.createPlaylist({ name: "New Playlist", creatorName: profile.username, tracks: [] });
        setPlaylists([...playlists, playlist]);
    }
    const fetchPlaylists = async () => {
        if (profile.username !== "") {
            const resultingPlaylists = await playlistClient.findPlaylistsOfCreator(profile.username);
            console.log(resultingPlaylists);
            setPlaylists(resultingPlaylists);
        }
    }
    useEffect(() => {
        fetchPlaylists();
        fetchFollowData();
    }, [profile]);

    const navigate = useNavigate();

    const [followers, setFollowers] = useState<any>([]);
    const [following, setFollowing] = useState<any>([]);
    const fetchFollowData = async () => {
        if (profile.username) {
            const userFollowerFollows = await followsClient.fetchFollowsByFollowed(profile.username);
            const userFollowingFollows = await followsClient.fetchFollowsByFollower(profile.username);
            setFollowers(userFollowerFollows.map((f: any) => f.follower));
            setFollowing(userFollowingFollows.map((f: any) => f.followed));
        }
    };

    const visitorFollow = async () => {
        if (visitorUsername) {
            try {
                const response = await followsClient.createFollow(visitorUsername, profile.username);
                fetchFollowData();
            } catch (err) { }
        }
    }

    const visitorUnfollow = async () => {
        if (visitorUsername) {
            try {
                const response = await followsClient.deleteFollow(visitorUsername, profile.username);
                fetchFollowData();
            } catch (err) { }
        }
    }

    return (
        <>
            {error ? <h3>{error}</h3> :
                <div className="mh-profile">
                    <h1>{profile.username}'s Profile</h1>
                    <h5>{profile.firstName} {profile.lastName}</h5>
                    {!publicUser && <h5>{profile.email}</h5>}
                    <h5><Link to={`/Profile/Follows/${profile.username}`}>{followers.length} Followers</Link></h5>
                    <h5><Link to={`/Profile/Follows/${profile.username}`}>{following.length} Following</Link></h5>
                    {!publicUser ?
                        <div className="mh-profile-buttons">
                            <button className="mh-edit-profile-button" onClick={() => navigate("/Profile/Edit")}>Edit Profile</button>
                            <button className="mh-toggle-role-button" onClick={() => dispatch(toggleUserRole())}>Toggle Role</button>
                            <button className="mh-logout-button" onClick={userLogout}>Logout</button>
                        </div> :
                        <div className="mh-profile-buttons">
                            {visitorUsername && userIsListener &&
                                (followers.includes(visitorUsername) ?
                                    <button onClick={visitorUnfollow}>Unfollow</button> :
                                    <button onClick={visitorFollow}>Follow</button>)}
                        </div>}
                    <div className="mh-profile-playlists">
                        <h2>Playlists</h2>
                        {!userIsListener && !publicUser &&
                            <div className="mh-profile-playlists-buttons">
                                <button onClick={() => navigate("/Profile/Creator")}>Creator View</button>
                                <button onClick={createPlaylist}>New Playlist</button>
                            </div>}
                    </div>
                    <hr />
                    <div className="mh-profile-playlist-details">
                        <CardGrid cardDetails={playlistClient.playlistsToCardDetails(playlists)} />
                    </div>
                </div >
            }
        </>
    )
}