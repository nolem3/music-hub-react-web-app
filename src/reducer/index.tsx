import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    accessToken: "",
    config: { headers: { } }
};

const hubSlice = createSlice({
    name: "hub",
    initialState,
    reducers: {
        setAccessToken: (state, action) => {
            state.accessToken = action.payload;
            state.config = { headers: { "Authorization" : "Bearer " + action.payload } }
        }
    },
});

export const { setAccessToken } = hubSlice.actions;
export default hubSlice.reducer;