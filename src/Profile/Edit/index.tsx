import { useState, useEffect } from "react";
import * as userClient from "../../Users/client"
import { useNavigate } from "react-router";

export default function ProfileEdit() {
    const [profile, setProfile] = useState({
        username: "", password: "",
        firstName: "", lastName: "", email: ""
    });
    const [error, setError] = useState<any>(null)
    const fetchProfile = async () => {
        try {
            const account = await userClient.profile();
            setProfile(account);
        } catch (err: any) {
            setError("Not logged in");
        }
    };
    useEffect(() => {
        fetchProfile();
    }, []);
    const navigate = useNavigate();

    const updateProfile = async () => {
        try {
            const response = await userClient.updateUser(profile);
            navigate("/Profile")
        } catch (err: any) {
            setError("Something went wrong updating");
        }
    }

    return (
        <div>
            {error ? <h3>{error}</h3> :
                <div className="mh-profile-edit">
                    <h1>Edit</h1>
                    <br />
                    <input type="text" placeholder="First Name" value={profile.firstName} onChange={(e) => { setProfile({ ...profile, firstName: e.target.value }) }}></input>
                    <br />
                    <input type="text" placeholder="Last Name" value={profile.lastName} onChange={(e) => { setProfile({ ...profile, lastName: e.target.value }) }}></input>
                    <br />
                    <input type="text" placeholder="Email" value={profile.email} onChange={(e) => { setProfile({ ...profile, email: e.target.value }) }}></input>
                    <br />
                    <input type="text" placeholder="Password" value={profile.password} onChange={(e) => { setProfile({ ...profile, password: e.target.value }) }}></input>
                    <br />
                    <button onClick={updateProfile}>Submit</button>
                </div>}
        </div>
    )
}