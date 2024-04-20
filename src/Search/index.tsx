import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { HubState } from "../store";
import "./index.css"
import * as spotifyClient from "../Spotify/client";
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
    }

    useEffect(() => {
        fetchSpotifyTracks();
    }, [pathname])

    return (
        <div className="mh-search">
            {/* TODO: other search results here */}
            <h2>Songs</h2>
            <hr/>
            {spotifyTracks[0] && <CardGrid cardDetails={spotifyClient.tracksToCardDetails(spotifyTracks)}/>}
        </div>
    )
}