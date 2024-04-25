import "./index.css"
import { Link } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as client from "../Users/client"
import { useDispatch } from "react-redux";
import { login } from "../reducer";

export default function Login() {
    const [credentials, setCredentials] = useState<any>({
        username: "", password: ""
    });
    const [error, setError] = useState<any>(null)
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const userLogin = async () => {
        try {
            await client.login(credentials);
            dispatch(login());
            navigate("/Profile");
        } catch (err: any) {
            setError("Username or Password Incorrect");
        }
    };

    return (
        <div className="mh-login">
            <h1>Login</h1>
            <br />
            <label htmlFor="username">Username:</label>
            <input type="text" id="username" placeholder="Username" onChange={(e) => { setCredentials({ ...credentials, username: e.target.value }) }}></input>
            <br />
            <label htmlFor="password">Password:</label>
            <input type="password" id="password" placeholder="Password" onChange={(e) => { setCredentials({ ...credentials, password: e.target.value }) }}></input>
            <br />
            <button onClick={userLogin}>Login</button>
            <br />
            {error ? <h4 style={{ color: "red" }}>{error}</h4> : <br />}
            <h4>
                No Account? <Link to="/Login/Signup">Sign up!</Link>
            </h4>
        </div>
    )
}