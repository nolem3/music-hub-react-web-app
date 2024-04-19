import { FaRegUserCircle } from "react-icons/fa";
import { Link } from "react-router-dom";
import "./index.css"

export default function LoginNav() {
    return (
        <Link to="/Login/">
            <div className="mh-nav-item">
                <h3>
                    <FaRegUserCircle className="mh-icon"/> Login
                </h3>
            </div>
        </Link>
    )
}