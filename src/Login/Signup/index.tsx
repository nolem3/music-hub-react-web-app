import "../index.css"
import { useState } from "react";
import { useNavigate } from "react-router";
import * as client from "../../Users/client"
import { User } from "../../Users/client";
import { useDispatch } from "react-redux";
import { login } from "../../reducer";

export default function Signup() {
    const [error, setError] = useState(null);
    const [user, setUser] = useState<User>({ username: "", password: "", firstName: "", lastName: "", email: "" });
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const signup = async () => {
        try {
            await client.signup(user);
            dispatch(login());
            navigate("/Profile");
        } catch (err: any) {
            setError(err.response.data.message);
        }
    };
    return (
        <div className="mh-login">
            <h1>Sign Up</h1>
            <br />
            <label htmlFor="firstName">First Name:</label>
            <input type="text" id="firstName" placeholder="First Name" onChange={(e) => {setUser({...user, firstName: e.target.value})}}></input>
            <br />
            <label htmlFor="lastName">Last Name:</label>
            <input type="text" id="lastName" placeholder="Last Name" onChange={(e) => {setUser({...user, lastName: e.target.value})}}></input>
            <br />
            <label htmlFor="email">Email:</label>
            <input type="text" id="email" placeholder="Email" onChange={(e) => {setUser({...user, email: e.target.value})}}></input>
            <br />
            <label htmlFor="username">Username:</label>
            <input type="text" id="username" placeholder="Username" onChange={(e) => {setUser({...user, username: e.target.value})}}></input>
            <br />
            <label htmlFor="password">Password:</label>
            <input type="password" id="password" placeholder="Password" onChange={(e) => {setUser({...user, password: e.target.value})}}></input>
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