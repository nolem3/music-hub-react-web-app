import axios from "axios";
axios.defaults.withCredentials = true
const API_BASE = process.env.REACT_APP_API_BASE;
const USERS_API = `${API_BASE}/api/users`;
export interface User {
    username: string; password: string;
    firstName: string, lastName: string; email: string;
};
// export const createUser = async (user: User) => {
//     const response = await axios.post(`${USERS_API}`, user);
//     return response.data;
// };
export const login = async (credentials: any) => {
    const response = await axios.post(`${USERS_API}/login`, credentials);
    return response.data;
};
export const profile = async () => {
    axios.defaults.withCredentials = true;
    const response = await axios.post(`${USERS_API}/profile`);
    return response.data;
};
export const updateUser = async (user: User) => {
    const response = await axios.put(`${USERS_API}/${user.username}`, user);
    return response.data;
};
export const deleteUser = async (user: User) => {
    const response = await axios.delete(`${USERS_API}/${user.username}`);
    return response.data;
};
export const signup = async (user: User) => {
    const response = await axios.post(`${USERS_API}/signup`, user);
    return response.data;
};
export const logout = async () => {
    const response = await axios.post(`${USERS_API}/logout`);
    return response.data;
};