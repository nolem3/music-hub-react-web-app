import { useState } from "react"
import HomeNav from "./HomeNav"
import SearchNav from "./SearchNav"
import LoginNav from "./LoginNav"
import "./index.css"

export default function Navigation() {

    /*
        TODO
        Links
        loggedIn ? (Profile Image + User type) : (Login)
    */

    return (
        <nav>
            <HomeNav />
            <SearchNav />
            <LoginNav />
        </nav>
    )
}