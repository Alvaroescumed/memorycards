import { useEffect, useState, useCallback } from "react";
import Card from "../components/Card";
import Counter from "../components/Counter";
import "../styles/gameboard.css";

const uniqueCards = [
    { name: 'A', color: '#FF5733' },
    { name: 'B', color: '#33FF57' },
    { name: 'C', color: '#3357FF' },
    { name: 'D', color: '#F1C40F' }
];

export default function NewGame() {
    const [cards, setCards] = useState([]);
    const [flippedCards, setFlippedCards] = useState([]);
    const [matchedCards, setMatchedCards] = useState([]);
    const [isFinished, setIsFinished] = useState(false);

    // Algoritmo de Fisher-Yates para barajar las cartas
    const shuffleCards = useCallback((array) => {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }, []);

    useEffect(() => {
        // Duplicamos y barajamos las cartas con IDs únicos
        setCards(shuffleCards([...uniqueCards, ...uniqueCards].map((card, index) => ({ ...card, id: index }))));
    }, [shuffleCards]);

    useEffect(() => {
        if (cards.length > 0 && matchedCards.length === cards.length) {
            setIsFinished(true);
            console.log('¡Has ganado!');
        }
    }, [matchedCards, cards.length]);

    function handleCardClick(card) {
        if (flippedCards.includes(card.id) || matchedCards.includes(card.id) || flippedCards.length === 2) return;

        const newFlippedCards = [...flippedCards, card.id];
        setFlippedCards(newFlippedCards);

        if (newFlippedCards.length === 2) {
            const [firstCardId, secondCardId] = newFlippedCards;
            const firstCard = cards.find(c => c.id === firstCardId);
            const secondCard = cards.find(c => c.id === secondCardId);

            if (firstCard.name === secondCard.name) {
                setMatchedCards(prev => [...prev, firstCardId, secondCardId]);
                setFlippedCards([]);
            } else {
                setTimeout(() => {
                    setFlippedCards([]);
                }, 1000);
            }
        }
    }

    function resetGame() {
        setCards(shuffleCards([...uniqueCards, ...uniqueCards].map((card, index) => ({ ...card, id: index }))));
        setFlippedCards([]);
        setMatchedCards([]);
        setIsFinished(false);
    }

    return (
        <>
        <div className="counter">
            <Counter 
                isFinished={isFinished}
                
            />
        </div>
        <div className="game-board">      
            {cards.map(card => (
                <Card 
                    key={card.id} 
                    card={card} 
                    handleClick={() => handleCardClick(card)}
                    isFlipped={flippedCards.includes(card.id) || matchedCards.includes(card.id)}
                />
            ))}
       
            {isFinished && (
                <div className="game-over">
                    <h2>¡Felicidades, has ganado!</h2>
                    <button onClick={resetGame}>Reiniciar juego</button>
                </div>
            )}
        </div>
        </>
    );
}
