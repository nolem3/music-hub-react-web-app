import "./index.css"
import { Link } from "react-router-dom";

export interface CardDetails {
    id: string,
    isTrack: boolean,
    image: string,
    name: string,
    creator: string
}

export default function Card(cardDetails: CardDetails) {
    return (
        <div className="col">
            <Link to={`/Details/${cardDetails.isTrack ? "track" : "playlist"}/${cardDetails.id}`}>
                <div className="card" style={{ width: 250, borderColor: "rgb(128, 21, 158)" }}>
                    <img src={cardDetails.image} className="card-img-top" style={{ height: 250 }}></img>
                    <div className="card-body">
                        {cardDetails.name}
                        <br />
                        {cardDetails.creator}
                    </div>
                </div>
            </Link>
        </div>
    )
}