
import { useRef, useState, useEffect } from "react";


const TimerComponent = (props) => {

    const [startTime, setStartTime] = useState(null);
    const [now, setNow] = useState(null);
    const intervalRef = useRef(null);
    let detectionTimer = 0.0;
    const detectionTriggerValue = 1.5;


    useEffect(() => {
        startDetectionTimer();
    }, [])


    const startDetectionTimer = () => {
        setStartTime(Date.now());
        setNow(Date.now());
        clearInterval(intervalRef.current);
        intervalRef.current = setInterval(() => { setNow(Date.now) }, 10);
        detectionTimer = 0;
    }

    const timerUpdate = async () => {
        if (startTime != null && now != null) {
            detectionTimer = (now - startTime) / 1000;

            if (detectionTimer >= detectionTriggerValue) {
                //Restart from 0
                startDetectionTimer();
                props.onTimerTriggerReached();
            }
        }
    }


    if (!props.requestPending)
    {
        timerUpdate();
    }
    return (
        <>
            <h3>{detectionTimer}</h3>
        </>
    )
};

export default TimerComponent;
