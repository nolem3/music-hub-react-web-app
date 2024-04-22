import { MdOutlineCancel } from "react-icons/md";
import { useState, useEffect } from "react";
import * as userClient from "../Users/client";
import * as commentClient from "../Comments/client";
import { Link } from "react-router-dom";
import "./index.css";
import { useSelector } from "react-redux";
import { HubState } from "../store";

export interface Comment {
    _id: String,
    commenter: String,
    itemCommentedOn: String,
    message: String,
    isTrack: boolean
}

export interface LoComments {
    comments: Comment[],
    itemId: String,
    isTrack: boolean
}

export default function CommentSection({ comments, itemId, isTrack }: LoComments) {
    const [currentUsername, setCurrentUsername] = useState<any>(null);
    const fetchProfile = async () => {
        try {
            const account = await userClient.profile();
            setCurrentUsername(account.username);
        } catch (err: any) {
        }
    };
    useEffect(() => {
        fetchProfile();
    }, []);

    const deleteComment = async (id: String) => {
        try {
            const response = await commentClient.deleteComment(id);
            window.location.reload();
        } catch (err) {
            console.log("Failed to delete commment");
        }
    }

    const [currentComment, setCurrentComment] = useState<any>("");

    const createComment = async () => {
        try {
            const response = await commentClient.createComment(
                { commenter: currentUsername, itemCommentedOn: itemId, isTrack: isTrack, message: currentComment });
            window.location.reload();
        } catch (err) {

        }
    }

    const userIsListener = useSelector((state: HubState) => state.hubReducer.userIsListener);

    return (
        <div className="mh-comment-section">
            {currentUsername && userIsListener &&
                <>
                    <textarea placeholder="Comment Something" onChange={(e) => setCurrentComment(e.target.value)}></textarea>
                    <button onClick={createComment}>Comment</button>
                </>}
            <ul>
                {comments.map((c) =>
                    <li>
                        {currentUsername && currentUsername === c.commenter &&
                            <button onClick={() => deleteComment(c._id)}>
                                <MdOutlineCancel />
                            </button>}
                        <h5><Link to={`/Profile/${c.commenter}`}>{c.commenter}</Link></h5>
                        <p>{c.message}</p>
                    </li>)}
            </ul>
        </div>
    )
}