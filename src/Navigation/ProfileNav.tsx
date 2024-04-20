import { Link } from "react-router-dom"
import { FaRegUserCircle } from "react-icons/fa";
import { useSelector } from "react-redux";
import { HubState } from "../store";

export default function ProfileNav() {
    const userIsListener = useSelector((state: HubState) => state.hubReducer.userIsListener);
    return (
        <Link to="/Profile/">
            <div className="mh-nav-item" style={{display: "flex", flexDirection: "column"}}>
                <h3>
                    <FaRegUserCircle className="mh-icon" /> Profile
                </h3>
                <h4>{userIsListener ? "Listener" : "Creator"}</h4>
            </div>
        </Link>
    )
}