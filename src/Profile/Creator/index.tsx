import { useSelector } from "react-redux";
import { HubState } from "../../store";
import { useState, useEffect } from "react";
import * as userClient from "../../Users/client";
import * as playlistClient from "../../Playlists/client";
import * as commentClient from "../../Comments/client";
import * as spotifyClient from "../../Spotify/client";
import CardGrid from "../../components/CardGrid";
import { Link } from "react-router-dom";
import "./index.css";

export default function CreatorView() {
    const userIsListener = useSelector((state: HubState) => state.hubReducer.userIsListener);
    const config = useSelector((state: HubState) => state.hubReducer.config);

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

    const [playlists, setPlaylists] = useState<any>([]);
    const fetchPlaylists = async () => {
        if (currentUsername) {
            const resultingPlaylists = await playlistClient.findPlaylistsOfCreator(currentUsername);
            console.log(resultingPlaylists);
            setPlaylists(resultingPlaylists);
        }
    }
    useEffect(() => {
        fetchPlaylists();
    }, [currentUsername]);

    const [commentCounts, setCommentCounts] = useState<any>({});
    const fetchComments = async () => {
        if (playlists[0]) {
            for await (const p of playlists) {
                console.log("Fetching comments");
                const response = await commentClient.fetchCommentsFor(p._id, false);
                const pId = p._id;
                setCommentCounts((prevComments: any) => {return { ...prevComments, [pId]: response.length }});
            };
            console.log(playlists);
            console.log(commentCounts);
        }
    }
    useEffect(() => {
        fetchComments();
        fetchTracks();
    }, [playlists]);

    const [tracksPerPlaylist, setTracksPerPlaylist] = useState<any>({});
    const fetchTracks = async () => {
        if (playlists[0]) {
            for await (const p of playlists) {
                if (p.tracks[0]) {
                    console.log("Fetching tracks");
                    const response = await spotifyClient.fetchTracks(p.tracks, config);
                    setTracksPerPlaylist((prevTracks: any) => {return { ...prevTracks, [p._id]: response.tracks }});
                }
            };
        }
    }

    return (
        <>
            {(currentUsername && !userIsListener) ?
                <div className="mh-playlists">
                    <h1>Creator View</h1>
                    {playlists[0] && playlists.map((p: any) =>
                        <div>
                            <h2><Link to={`/Details/playlist/${p._id}`}>{p.name}</Link> - {commentCounts[p._id]} Comment{commentCounts[p._id] !== 1 && "s"}</h2>
                            <hr />
                            {tracksPerPlaylist[p._id] &&
                                <CardGrid cardDetails={spotifyClient.tracksToCardDetails(tracksPerPlaylist[p._id])} />}
                        </div>)}
                </div>
                : <h2>Must be a Creator to see Creator View</h2>}
        </>
    )
}