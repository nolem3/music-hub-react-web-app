import "./index.css"
import { Link } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as client from "../Users/client"

export default function Login() {
    const [credentials, setCredentials] = useState<any>({
        username: "", password: ""
    });
    const [error, setError] = useState<any>(null)
    const navigate = useNavigate();
    const login = async () => {
        try {
            await client.login(credentials);
            navigate("/Profile");
        } catch (err: any) {
            setError("Username or Password Incorrect");
        }
    };

    return (
        <div className="mh-login">
            <h1>Login</h1>
            <br/>
            <input type="text" placeholder="Username" onChange={(e) => {setCredentials({...credentials, username: e.target.value})}}></input>
            <br/>
            <input type="text" placeholder="Password" onChange={(e) => {setCredentials({...credentials, password: e.target.value})}}></input>
            <br/>
            <button onClick={login}>Login</button>
            <br/>
            {error ? <h4 style={{color: "red"}}>{error}</h4> : <br/>}
            <h4>
                No Account? <Link to="/Login/Signup">Sign up!</Link>
            </h4>
        </div>
    )
}