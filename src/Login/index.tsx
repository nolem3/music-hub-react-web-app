import "./index.css"
import { Link } from "react-router-dom";

export default function Login() {
    return (
        <div className="mh-login">
            <h1>Login</h1>
            <input type="text" placeholder="Username"></input>
            <br/>
            <input type="text" placeholder="Password"></input>
            <br/>
            <button>Login</button>
            <h3>
                No Account? <Link to="/Login/Signup">Sign up!</Link>
            </h3>
        </div>
    )
}