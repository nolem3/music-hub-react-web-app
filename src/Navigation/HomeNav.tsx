import "./index.css"
import { Link } from "react-router-dom";

export default function HomeNav() {
    const homeImage = "/images/mhlogo.png"

    return (
        <div className="mh-nav-item" style={{flexGrow: 0.2}}>
            <Link to="/Home/">
                <img src={homeImage}></img>
            </Link>
        </div>
    )
}