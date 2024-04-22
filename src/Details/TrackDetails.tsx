import { useLocation } from "react-router";
import { useSelector } from "react-redux";
import { HubState } from "../store";
import { useState, useEffect } from "react";
import * as spotifyClient from "../Spotify/client";
import * as userClient from "../Users/client";
import * as commentClient from "../Comments/client";
import * as playlistClient from "../Playlists/client";
import CardGrid from "../components/CardGrid";
import CommentSection from "../components/CommentSection";
import "./index.css";

export default function TrackDetails() {
    const { pathname } = useLocation();
    const itemId = pathname.split("Details/track/")[1]
    const config = useSelector((state: HubState) => state.hubReducer.config);
    const [track, setTrack] = useState<any>(null);
    const [error, setError] = useState<any>(null);

    const fetchTrackInfo = async () => {
        try {
            const result = await spotifyClient.fetchTrack(itemId, config);
            setTrack(result);
        } catch (exception) {
            setError("Could not fetch track details");
        }
    }

    useEffect(() => {
        fetchTrackInfo();
    }, [pathname]);

    const [currentUsername, setCurrentUsername] = useState<any>(null);
    const fetchProfile = async () => {
        try {
            const account = await userClient.profile();
            setCurrentUsername(account.username);
        } catch (err: any) {
            console.log(err)
        }
    };
    useEffect(() => {
        fetchProfile();
    }, []);

    const [userPlaylists, setUserPlaylists] = useState([]);
    const [canAppend, setCanAppend] = useState<boolean>(false);
    const fetchUserPlaylists = async () => {
        const result = await playlistClient.findPlaylistsOfCreator(currentUsername);
        console.log(result)
        setUserPlaylists(result);
    }
    useEffect(() => {
        if (currentUsername) {
            fetchUserPlaylists();
            setCanAppend(track && currentUsername && !userIsListener);
        }
    }, [track]);

    const userIsListener = useSelector((state: HubState) => state.hubReducer.userIsListener);
    //const canAppend = track && currentUsername && !userIsListener;
    const [selectedPlaylist, setSelectedPlaylist] = useState<any>(null);

    const appendToPlaylist = async () => {
        if (selectedPlaylist && selectedPlaylist !== "none") {
            try {
                const response = await playlistClient.appendTrackToPlaylist(selectedPlaylist, {trackId: track.id});
            } catch (err) {
                console.log(err);
            }
        }
    }

    const [trackPlaylists, setTrackPlaylists] = useState<any>([]);
    const fetchTrackPlaylists = async () => {
        if (track) {
            const allPlaylists = await playlistClient.findAllPlaylists();
            const filteredPlaylists = allPlaylists.filter((p: any) => p.tracks.includes(track.id));
            setTrackPlaylists(filteredPlaylists);
        }
    }
    useEffect(() => {
        fetchTrackPlaylists();
        fetchComments();
    }, [track]);

    const [comments, setComments] = useState<any>([]);
    const fetchComments = async () => {
        if (track) {
            const response = await commentClient.fetchCommentsFor(track.id, true);
            setComments(response);
        }
    }

    return (
        <div>
            <div className="mh-details">
                {error ? error : (track &&
                    <div className="mh-track-details">
                        <img src={track.album.images[0].url}></img>
                        <h3>{track.name}</h3>
                        <h4>{track.album.name}</h4>
                        <div className="mh-artist-names">
                            {track.artists.map((artist: any) => {
                                return (
                                    <h5>
                                        {artist.name}
                                    </h5>
                                )
                            })}
                        </div>
                        {track.preview_url && <audio controls src={track.preview_url}></audio>}
                        {canAppend &&
                            <div className="mh-append-track">
                                <label htmlFor="playlists">Playlist</label>
                                <select name="playlists" id="playlists" onChange={(e) => setSelectedPlaylist(e.target.value)}>
                                    <option value="none"></option>
                                    {userPlaylists.map((p: any) => <option value={p._id}>{p.name}</option>)}
                                </select>
                                <button onClick={appendToPlaylist}>Add</button>
                            </div>}
                    </div>
                )}
                <div className="mh-comments">
                    <h3>Comments here</h3>
                    {track && <CommentSection comments={comments} itemId={track.id} isTrack={true}/>}
                </div>
            </div>
            <div className="mh-track-playlists">
                <h3>Playlists</h3>
                <hr />
                {track && <CardGrid cardDetails={playlistClient.playlistsToCardDetails(trackPlaylists)} />}
            </div>
        </div>
    )
}