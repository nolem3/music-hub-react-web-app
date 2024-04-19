import "./index.css"
import { useState } from "react"
import { Link } from "react-router-dom";
import { FaMagnifyingGlass } from "react-icons/fa6";

export default function SearchNav() {

    const [searchQuery, setSearchQuery] = useState<string>("")

    return (
        <div className="mh-nav-item" style={{ flexGrow: 2 }}>
            <Link to={`/Search/${searchQuery}`} >
                <FaMagnifyingGlass className="mh-icon" />
            </Link>
            <input type="text" placeholder="Search" onChange={(e) => setSearchQuery(e.target.value)}></input>
        </div>
    )
}