import React, { useState, useEffect } from "react";
import axios from "axios";

function Card() {
    const [deckId, setDeckId] = useState("");
    const [card, setCard] = useState();
    const [isShuffling, setIsShuffling] = useState(false);


    useEffect(() => {
        async function createDeck() {
            try {
                const deckResult = await axios.get(
                    `https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1`
                );
                setDeckId(deckResult.data.deck_id)
            } catch (error) {
                console.error("Error creating deck:", error);
            }
        }
        createDeck();
    }, []);

    const drawCard = async () => {
        try {
            const cardResult = await axios.get(
                `https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`
            );
            if (cardResult.data.remaining === 0) {
                alert("Error: no cards remaining")
            } else {
                setCard(cardResult.data.cards[0]);
            }
        } catch (error) {
            console.error("Error fetching card:", error);
        }
    }

    const shuffleDeck = async () => {
        try {
            setIsShuffling(true);
            const shuffle = await axios.get(
                `https://deckofcardsapi.com/api/deck/${deckId}/shuffle/`
            )
            setCard(null);
            setIsShuffling(false);
        } catch (error) {
            console.error("Error shuffling deck:", error);
            setIsShuffling(false);
        }
    }


    return (
        <div>
            <div>{deckId && (
                <button onClick={drawCard}>
                    Draw a Card
                </button>)}
                <button onClick={shuffleDeck}>
                    Shuffle Deck
                </button>
            </div>
            <div>
                {card ? (<img src={card.image} />) : <i>(loading)</i>}
            </div>
        </div >
    );


}

export default Card;