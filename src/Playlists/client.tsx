import axios from "axios";
axios.defaults.withCredentials = true
const API_BASE = process.env.REACT_APP_API_BASE;
const PLAYLISTS_API = `${API_BASE}/api/playlists`;
const homeImage = "/images/mhlogo.png"

export const createPlaylist = async (playlist: any) => {
    axios.defaults.withCredentials = true
    const response = await axios.post(PLAYLISTS_API, playlist);
    return response.data;
}

export const findAllPlaylists = async () => {
    axios.defaults.withCredentials = true
    const response = await axios.get(`${PLAYLISTS_API}`);
    return response.data;
}

export const findPlaylistsOfCreator = async (creator: String) => {
    axios.defaults.withCredentials = true
    const response = await axios.get(`${PLAYLISTS_API}/${creator}`);
    return response.data;
}

export const findPlaylistById = async (id: String) => {
    axios.defaults.withCredentials = true
    const response = await axios.get(`${PLAYLISTS_API}/id/${id}`);
    return response.data;
}

export const updatePlaylist = async (playlist: any) => {
    axios.defaults.withCredentials = true
    const response = await axios.put(`${PLAYLISTS_API}/${playlist._id}`, playlist);
    return response.data;
}

export const appendTrackToPlaylist = async (playlistId: String, track: any) => {
    axios.defaults.withCredentials = true
    const response = await axios.put(`${PLAYLISTS_API}/append/${playlistId}`, track);
    return response.data;
}

export const deletePlaylist = async (id: String) => {
    axios.defaults.withCredentials = true
    const response = await axios.delete(`${PLAYLISTS_API}/${id}`);
    return response.data;
}

export const playlistsToCardDetails = (playlists: any) => {
    return playlists.map((p: any) => {
        return { id: p._id, isTrack: false, image: homeImage, name: p.name, creator: p.creatorName}
    })
}
