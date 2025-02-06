import { useEffect, useState } from "react";
import Card from "../components/Card";
import "../styles/gameboard.css";
const uniqueCards = [
    { name: 'A', color: '#FF5733' },
    { name: 'B', color: '#33FF57' },
    { name: 'C', color: '#3357FF' },
    { name: 'D', color: '#F1C40F' }
];

export default function NewGame() {
    const [cards, setCards] = useState([])
    const [flippedCards, setFlippedCards] = useState([]);
    const [matchedCards, setMatchedCards] = useState([]);
    const [isFinished, setIsFinished] = useState(false);


    useEffect(() => {
         // Duplicar y barajar las cartas, asignando un ID único basado en el índice
        const shuffeledCards = shuffleCards([...uniqueCards, ...uniqueCards].map((card, index) => ({ ...card, id: index })));
        console.log("Shuffled Cards: ", shuffeledCards); 
        setCards(shuffeledCards);
    },[]);

    useEffect(() => {
        //para evitar que detecta una victoria al inicio del juego mientras se monta el componente añadimos la condicion de que el array sea mayor a 0 
        if (matchedCards.length > 0 && matchedCards.length === cards.length) {
            setIsFinished(true);
            console.log('YOU WIN!');
            console.log(matchedCards, cards)
        }
    }, [matchedCards, cards]);

    // usamos el algoritmo de Fisher-Yates para barajear los elementos
    function shuffleCards(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]]; // Intercambia elementos
        }
        return array;
    }

    function handleCardClick(card) {
        // Evitar que se puedan voltear más de dos cartas al mismo tiempo
        if (flippedCards.includes(card.id) || matchedCards.includes(card.id) || flippedCards.length === 2) return;

        const newFlippedCards = [...flippedCards, card.id];
        setFlippedCards(newFlippedCards);

        if (newFlippedCards.length === 2) {
            const [firstCardId, secondCardId] = newFlippedCards;
            const firstCard = cards.find(c => c.id === firstCardId);
            const secondCard = cards.find(c => c.id === secondCardId);

            if (firstCard.name === secondCard.name) {
                // Si coinciden, agregar las cartas a matchedCards y vaciar flippedCards
                setMatchedCards([...matchedCards, firstCardId, secondCardId]);
                setFlippedCards([]); // Reiniciar flippedCards para el próximo par
                console.log(matchedCards)
            } else {
                // Si no coinciden, voltear de nuevo después de 1 segundo
                setTimeout(() => {
                    setFlippedCards([]); 
                }, 1000);
            }
        }
    }

    return (
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
                    <button onClick={() => window.location.reload()}>Reiniciar juego</button>
                </div>
            )}
        </div>
    );
}