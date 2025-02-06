import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function MainMenu(){

    const navigate = useNavigate()

    // usamos un react hook para hacer un listener global para detectar el space
    useEffect(() => {
        function handleKeyDown(e){
            if(e.code === "Space" ){
                console.log('space pressed')
                navigate('/game')
            }
        }

        //añadimos el listener
        window.addEventListener('keydown', handleKeyDown)

        //Limpiamos el listener para cuando se desmonte el componente
        return() => {
            window.removeEventListener('keydown', handleKeyDown)
        }
    }, [navigate])

    return(
        <>
            <div className="Canvas">
                <h1>Welcome to Memory Match</h1>
                <h2> Press Space to Start</h2>
            </div>
        </>
    )
}