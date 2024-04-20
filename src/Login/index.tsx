import "./index.css"
import { Link } from "react-router-dom";

export default function Login() {
    return (
        <div className="mh-login">
            <h1>Login</h1>
            <br/>
            <input type="text" placeholder="Username"></input>
            <br/>
            <input type="text" placeholder="Password"></input>
            <br/>
            <button>Login</button>
            <br/>
            <br/>
            <h4>
                No Account? <Link to="/Login/Signup">Sign up!</Link>
            </h4>
        </div>
    )
}