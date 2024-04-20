import { useLocation } from "react-router";
import { useSelector } from "react-redux";
import { HubState } from "../store";
import { useState, useEffect } from "react";
import * as spotifyClient from "../Spotify/client"
import "./index.css"

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
    }, [pathname])

    return (
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
                </div>
            )}
            <div className="mh-track-playlists">
                <h3>Playlists here</h3>
                {/* TODO: Playlists this track is on */}
            </div>
            <div className="mh-comments">
                <h3>Comments here</h3>
                {/* TODO: Comments */}
            </div>
        </div>
    )
}