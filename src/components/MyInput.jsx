import { useNavigate } from "react-router-dom";

export default function MyInput(){

    //Navigation hook
    const navigate = useNavigate()

    //Handle spacebar press interaction herewe create a funtion to handle the key press
    function handlePress(e){
        if(e.code === "Space" ){
            console.log('space pressed')
            navigate('/game')
        }
    }

    return(
        <button 
            type="text" 
            placeholder="Press the Spacebar to Start" 
            onKeyDown={handlePress} 
        />
    )
}