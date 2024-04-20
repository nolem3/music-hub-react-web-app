import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    accessToken: "",
    config: { headers: { } },
    userIsListener: true
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
        }
    },
});

export const { setAccessToken, toggleUserRole } = hubSlice.actions;
export default hubSlice.reducer;