import { useLocation } from "react-router";
import { useEffect, useState } from "react";
import * as followsClient from "../../Follows/client";
import { Link } from "react-router-dom";
import "./index.css";

export default function ProfileFollows() {
    const { pathname } = useLocation();
    const publicUser = pathname.split("Profile/Follows/")[1];

    const [followers, setFollowers] = useState<any>([]);
    const [following, setFollowing] = useState<any>([]);
    const fetchFollowData = async () => {
        if (publicUser) {
            const userFollowerFollows = await followsClient.fetchFollowsByFollowed(publicUser);
            const userFollowingFollows = await followsClient.fetchFollowsByFollower(publicUser);
            setFollowers(userFollowerFollows.map((f: any) => f.follower));
            setFollowing(userFollowingFollows.map((f: any) => f.followed));
        }
    };
    useEffect(() => {
        fetchFollowData();
    }, [pathname]);

    return (
        <div className="mh-profile-follows">
            <div>
                <h3>{publicUser}'s Followers:</h3>
                <ul>
                    {followers.map((f: any) => <li><Link to={`/Profile/${f}`}>{f}</Link></li>)}
                </ul>
            </div>
            <div>
                <h3>{publicUser}'s Following:</h3>
                <ul>
                    {following.map((f: any) => <li><Link to={`/Profile/${f}`}>{f}</Link></li>)}
                </ul>
            </div>
        </div>
    )
}