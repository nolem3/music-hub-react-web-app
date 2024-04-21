import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { HubState } from "../store";
import "./index.css"
import * as spotifyClient from "../Spotify/client";
import * as playlistClient from "../Playlists/client";
import * as userClient from "../Users/client";
import CardGrid from "../components/CardGrid";

export default function Search() {

    const { pathname } = useLocation();
    const config = useSelector((state: HubState) => state.hubReducer.config);
    const searchQuery = pathname.split("Search/")[1]
    const [spotifyTracks, setSpotifyTracks] = useState<any>([])

    const fetchSpotifyTracks = async () => {
        if (searchQuery !== "") {
            const tracks = await spotifyClient.fetchSearchResult(searchQuery, config)
            setSpotifyTracks(tracks)
        }
    };
    useEffect(() => {
        fetchSpotifyTracks();
        fetchPlaylists();
    }, [pathname]);

    const [playlists, setPlaylists] = useState<any>([]);
    const fetchPlaylists = async () => {
        if (searchQuery !== "") {
            const allPlaylists = await playlistClient.findAllPlaylists();
            const filteredPlaylists = allPlaylists.filter((p: any) => p.name.toLowerCase().includes(searchQuery.toLowerCase())
                || searchQuery.toLowerCase().includes(p.name.toLowerCase()));
            setPlaylists(filteredPlaylists);
        }
    };

    const [currentUsername, setCurrentUsername] = useState<any>(null);
    const fetchProfile = async () => {
        try {
            const account = await userClient.profile();
            setCurrentUsername(account.username);
        } catch (err: any) {
        }
    };
    useEffect(() => {
        fetchProfile();
    }, []);
    const userIsListener = useSelector((state: HubState) => state.hubReducer.userIsListener);

    return (
        <div className="mh-search">
            {/* TODO: other search results here */}
            {!userIsListener &&
                <div>
                    <h2>My Playlists</h2>
                    <hr />
                    {playlists[0] && <CardGrid cardDetails={playlistClient.playlistsToCardDetails(
                        playlists.filter((p: any) => p.creatorName === currentUsername))} />}
                </div>}
            <h2>All Playlists</h2>
            <hr />
            {playlists[0] && <CardGrid cardDetails={playlistClient.playlistsToCardDetails(playlists)} />}
            <h2>Songs</h2>
            <hr />
            {spotifyTracks[0] && <CardGrid cardDetails={spotifyClient.tracksToCardDetails(spotifyTracks)} />}
        </div>
    )
}