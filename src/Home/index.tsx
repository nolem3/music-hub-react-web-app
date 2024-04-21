import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { HubState } from "../store";
import * as userClient from "../Users/client";
import * as playlistClient from "../Playlists/client";
import * as followsClient from "../Follows/client";
import CardGrid from "../components/CardGrid";
import "./index.css";

export default function Home() {

    /*
        TODO
        Following (for listeners)
        Recent Likes, Comments, and Follows (for creators)
    */
    const [currentUsername, setCurrentUsername] = useState();
    const fetchProfile = async () => {
        try {
            const account = await userClient.profile();
            setCurrentUsername(account.username);
        } catch (err: any) {
        }
    };
    useEffect(() => {
        fetchProfile();
        fetchPlaylists();
    }, []);

    const [playlists, setPlaylists] = useState<any>([]);
    const fetchPlaylists = async () => {
        const allPlaylists = await playlistClient.findAllPlaylists();
        setPlaylists(allPlaylists);
    }

    const [following, setFollowing] = useState<any>([]);
    const fetchFollowData = async () => {
        if (currentUsername) {
            const userFollowingFollows = await followsClient.fetchFollowsByFollower(currentUsername);
            console.log(userFollowingFollows);
            setFollowing(userFollowingFollows.map((f: any) => f.followed));
        }
    };
    useEffect(() => {
        fetchFollowData();
    }, [currentUsername]);

    const userIsListener = useSelector((state: HubState) => state.hubReducer.userIsListener);

    return (
        <div className="mh-home">
            <h1>{currentUsername ? `Welcome back to Music Hub, ${currentUsername}!` : "Welcome to Music Hub!"}</h1>
            {userIsListener &&
                <>
                    <h2>Following Playlists</h2>
                    <hr />
                    {playlists[0] &&
                        <CardGrid cardDetails={playlistClient.playlistsToCardDetails(
                            playlists.filter((p: any) => following.includes(p.creatorName)))} />}
                </>}
            <h2>Trending Playlists</h2>
            <hr />
            {playlists[0] && <CardGrid cardDetails={playlistClient.playlistsToCardDetails(playlists)} />}
        </div>
    )
}