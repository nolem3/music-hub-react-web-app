import HomeNav from "./HomeNav"
import SearchNav from "./SearchNav"
import LoginNav from "./LoginNav"
import ProfileNav from "./ProfileNav"
import "./index.css"
import { useSelector } from "react-redux"
import { HubState } from "../store"

export default function Navigation() {

    const loggedIn = useSelector((state: HubState) => state.hubReducer.loggedIn);

    return (
        <nav>
            <HomeNav />
            <SearchNav />
            {loggedIn ? <ProfileNav /> : <LoginNav />}
        </nav>
    )
}