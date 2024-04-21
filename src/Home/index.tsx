import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { HubState } from "../store";
import * as userClient from "../Users/client";
import * as playlistClient from "../Playlists/client";
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

    return (
        <div className="mh-home">
            <h1>{currentUsername ? `Welcome back to Music Hub, ${currentUsername}!` : "Welcome to Music Hub!"}</h1>
            <h2>Trending Playlists</h2>
            <hr/>
            {playlists[0] && <CardGrid cardDetails={playlistClient.playlistsToCardDetails(playlists)} />}
        </div>
    )
}