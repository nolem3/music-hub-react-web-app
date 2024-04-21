import { configureStore } from "@reduxjs/toolkit";
import hubReducer from "../reducer";

export interface HubState {
    hubReducer: {
        accessToken: String,
        config: any,
        userIsListener: boolean,
        loggedIn: boolean
    };
}
const store = configureStore({
    reducer: {
        hubReducer
    }
});

export default store;