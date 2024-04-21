import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    accessToken: "",
    config: { headers: { } },
    userIsListener: true,
    loggedIn: false
};

const hubSlice = createSlice({
    name: "hub",
    initialState,
    reducers: {
        setAccessToken: (state, action) => {
            state.accessToken = action.payload;
            state.config = { headers: { "Authorization" : "Bearer " + action.payload } }
        },
        toggleUserRole: (state) => {
            state.userIsListener = !state.userIsListener;
        },
        login: (state) => {
            state.loggedIn = true;
        },
        logout: (state) => {
            state.loggedIn = false;
        }
    },
});

export const { setAccessToken, toggleUserRole, login, logout } = hubSlice.actions;
export default hubSlice.reducer;