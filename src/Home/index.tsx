import { useSelector } from "react-redux";
import { HubState } from "../store";

export default function Home() {

    /*
        TODO
        Welcome message stylized to logged in user
        Following (for listeners)
        Recent Likes, Comments, and Follows (for creators)
    */

    const maxNumTrendingCards = 20;
    const accessToken = useSelector((state: HubState) => state.hubReducer.accessToken);

    return (
        <div>
            <h1>Welcome to Music Hub!</h1>
            <h2>TRENDING PLAYLISTS HERE</h2>
            <h3>{accessToken}</h3>
        </div>
    )
}