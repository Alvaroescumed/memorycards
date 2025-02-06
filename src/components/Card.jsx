/* eslint-disable react/prop-types */
import '../styles/card.css';

export default function Card({ card, handleClick, isFlipped }) {
    // Disable click if card is already flipped
    const handleCardClick = () => {
        if (!isFlipped) {
            handleClick(card);
        }
    };

    return (
        <div className={`card ${isFlipped ? 'flipped' : ''}`} onClick={handleCardClick}>
            {isFlipped ? (
                <div className="card-front" style={{ backgroundColor: card.color }}>
                    <p>{card.name}</p>
                </div>
            ) : (
                <div className="card-back">
                    <p>?</p>
                </div>  
            )}
        </div>
    );
}
