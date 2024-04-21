import axios from "axios";
axios.defaults.withCredentials = true
const API_BASE = process.env.REACT_APP_API_BASE;
const FOLLOWS_API = `${API_BASE}/api/follows`;

export const createFollow = async (follower: String, followed: String) => {
    axios.defaults.withCredentials = true;
    const follow = { follower: follower, followed: followed };
    const response = await axios.post(FOLLOWS_API, follow);
    return response.data;
}

export const deleteFollow = async (follower: String, followed: String) => {
    axios.defaults.withCredentials = true;
    const response = await axios.delete(`${FOLLOWS_API}/${follower}/${followed}`);
    return response.data;
}

export const fetchFollowsByFollowed = async (username: String) => {
    axios.defaults.withCredentials = true;
    console.log(username);
    const response = await axios.get(`${FOLLOWS_API}/followed/${username}`);
    return response.data;
}

export const fetchFollowsByFollower = async (username: String) => {
    axios.defaults.withCredentials = true;
    const response = await axios.get(`${FOLLOWS_API}/follower/${username}`);
    return response.data;
}