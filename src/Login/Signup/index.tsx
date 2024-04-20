import "../index.css"

export default function Signup() {
    return (
        <div className="mh-login">
            <h1>Sign Up</h1>
            <br/>
            <input type="text" placeholder="First Name"></input>
            <br />
            <input type="text" placeholder="Last Name"></input>
            <br />
            <input type="text" placeholder="Email"></input>
            <br />
            <input type="text" placeholder="Username"></input>
            <br />
            <input type="text" placeholder="Password"></input>
            <br />
            <button>Sign Up</button>
        </div>
    )
}