import { CardDetails } from "./Card"
import Card from "./Card"

export interface LoCardDetails {
    cardDetails: CardDetails[]
}

export default function CardGrid({cardDetails}: LoCardDetails) {
    return (
        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 row-cols-xxl-5 g-4">
            {cardDetails.map((card) => {
                return <Card id={card.id} isTrack={card.isTrack} image={card.image} name={card.name} creator={card.creator}/>
            })}
        </div>
    )
}