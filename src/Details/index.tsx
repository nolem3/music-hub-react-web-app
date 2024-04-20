import { useLocation } from "react-router";
import { useSelector } from "react-redux";
import { HubState } from "../store";
import { useState, useEffect } from "react";
import * as spotifyClient from "../Spotify/client"
import TrackDetails from "./TrackDetails";
import PlaylistDetails from "./PlaylistDetails";

export default function Details() {

    const { pathname } = useLocation();

    return (
        <>
            {pathname.includes("track") ? <TrackDetails /> : <PlaylistDetails />}
        </>
    )
}