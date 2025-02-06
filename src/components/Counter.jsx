import { useState, useEffect } from "react";

export default function Counter({ isFinished }) {
    const [time, setTime] = useState(0);

    useEffect(() => {
        let interval;

        if (!isFinished) {
            interval = setInterval(() => {
                setTime(prevTime => prevTime + 1);
            }, 1000);
        } else {
            clearInterval(interval);
        }

        return () => clearInterval(interval);
    }, [isFinished]); 

    return <p>{time}</p>;
}
