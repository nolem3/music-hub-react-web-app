import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router";
import * as client from "../Playlists/client";
import * as userClient from "../Users/client";
import * as spotifyClient from "../Spotify/client";
import { useSelector } from "react-redux";
import { HubState } from "../store";
import CardGrid from "../components/CardGrid";
import "./index.css";

export default function PlaylistDetails() {
    const homeImage = "/images/mhlogo.png"
    const { pathname } = useLocation();
    const playlistId = pathname.split("Details/playlist/")[1];
    const config = useSelector((state: HubState) => state.hubReducer.config);
    const [playlist, setPlaylist] = useState<any>(null);
    const [error, setError] = useState<any>(null);

    const fetchPlaylistInfo = async () => {
        try {
            const result = await client.findPlaylistById(playlistId);
            setPlaylist(result);
        } catch (exception) {
            setError("Could not fetch playlist details");
        }
    }

    useEffect(() => {
        fetchPlaylistInfo();
    }, [pathname])

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
    }, []);

    const userIsListener = useSelector((state: HubState) => state.hubReducer.userIsListener);
    const canEdit = playlist && currentUsername && !userIsListener && (currentUsername === playlist.creatorName);

    const updatePlaylist = async () => {
        const response = await client.updatePlaylist(playlist);
    }

    const navigate = useNavigate();
    const deletePlaylist = async () => {
        const response = await client.deletePlaylist(playlist._id);
        navigate("/Profile");
    }

    const [tracks, setTracks] = useState<any>([]);
    const fetchTracks = async () => {
        if (playlist) {
            console.log(playlist.tracks);
            const response = await spotifyClient.fetchTracks(playlist.tracks, config);
            console.log(response);
            setTracks(response.tracks);
        }
    }
    useEffect(() => {
        //console.log(playlist);
        fetchTracks();
    }, [playlist]);

    return (
        <div>
            <div className="mh-details">
                {error ? error : (playlist &&
                    <div className="mh-track-details">
                        <img src={homeImage}></img>
                        {canEdit ?
                            <input type="text" value={playlist.name} onChange={(e) => setPlaylist({ ...playlist, name: e.target.value })}></input>
                            : <h3>{playlist.name}</h3>}
                        <h4>{playlist.creatorName}</h4>
                        {canEdit && <button onClick={updatePlaylist}>Save</button>}
                        {canEdit && <button onClick={deletePlaylist} className="mh-delete-playlist-button">Delete</button>}
                    </div>)}
                <div className="mh-comments">
                    <h3>Comments here</h3>
                    {/* TODO: Comments */}
                </div>
            </div>
            <div className="mh-playlist-tracks">
                <h3>Tracks</h3>
                <hr />
                {playlist && <CardGrid cardDetails={spotifyClient.tracksToCardDetails(tracks)} />}
                {/* TODO: deleting track functionality*/}
            </div>
        </div>
    )
}