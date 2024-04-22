import axios from "axios";
axios.defaults.withCredentials = true
const API_BASE = process.env.REACT_APP_API_BASE;
const COMMENTS_API = `${API_BASE}/api/comments`;

export const createComment = async (comment: any) => {
    axios.defaults.withCredentials = true;
    const response = await axios.post(COMMENTS_API, comment);
    return response.data;
}

export const deleteComment = async (id: String) => {
    axios.defaults.withCredentials = true;
    const response = await axios.delete(`${COMMENTS_API}/${id}`);
    return response.data;
}

export const fetchCommentsFor = async (id: String, isTrack: boolean) => {
    axios.defaults.withCredentials = true;
    if (isTrack) {
        const response = await axios.get(`${COMMENTS_API}/tracks/${id}`);
        return response.data;
    }
    else {
        const response = await axios.get(`${COMMENTS_API}/playlists/${id}`);
        return response.data;
    }
}