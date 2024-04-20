import "../index.css"
import { useState } from "react";
import { useNavigate } from "react-router";
import * as client from "../../Users/client"
import { User } from "../../Users/client";

export default function Signup() {
    const [error, setError] = useState(null);
    const [user, setUser] = useState<User>({ username: "", password: "", firstName: "", lastName: "", email: "" });
    const navigate = useNavigate();
    const signup = async () => {
        try {
            await client.signup(user);
            navigate("/Profile");
        } catch (err: any) {
            setError(err.response.data.message);
        }
    };
    return (
        <div className="mh-login">
            <h1>Sign Up</h1>
            <br />
            <input type="text" placeholder="First Name" onChange={(e) => {setUser({...user, firstName: e.target.value})}}></input>
            <br />
            <input type="text" placeholder="Last Name" onChange={(e) => {setUser({...user, lastName: e.target.value})}}></input>
            <br />
            <input type="text" placeholder="Email" onChange={(e) => {setUser({...user, email: e.target.value})}}></input>
            <br />
            <input type="text" placeholder="Username" onChange={(e) => {setUser({...user, username: e.target.value})}}></input>
            <br />
            <input type="text" placeholder="Password" onChange={(e) => {setUser({...user, password: e.target.value})}}></input>
            <br />
            <button onClick={signup}>Sign Up</button>
            {error &&
                <div>
                    <br />
                    <h4 style={{color: "red"}}>{error}</h4>
                </div>}
        </div>
    )
}