import { useState } from 'react';
import './pomodoro.css';

const Pomodoro = () => {
    const enum STATES {
        RUNNING,
        PAUSED,
        STOPPED,
        SHORT_BREAK,
        LONG_BREAK, 
    }

    const runLength = 25 * 60

    const [state, setState] = useState(STATES.STOPPED)
    const [running, setRunning] = useState(false);
    const [minutes, setMinutes] = useState(25)
    const [seconds, setSeconds] = useState(0)
    const [timerDisplay, setTimerDisplay] = useState("25:00")
    const [timerInterval, setTimerInterval] = useState<NodeJS.Timer | undefined>(undefined)

    let timer: NodeJS.Timer;

    const calcDisplay = (currSecs: number) => {
        const remainingSecs = runLength - currSecs
        const mins = Math.floor(remainingSecs / 60);
        const secs = remainingSecs % 60;
        const displayMins = mins < 10 ? `0${mins}` : mins;
        const displaySecs = secs < 10 ? `0${secs}` : secs;
        
        return `${(displayMins)}:${displaySecs}`
    }

    const handleStart = () => {
        setRunning(true)

        setTimerInterval( 
            setInterval(() => {
                setSeconds(prev => {
                    let currSecs = prev += 1
                    console.log(calcDisplay(currSecs))
                    setTimerDisplay(calcDisplay(currSecs))
                    if (currSecs === runLength) {
                        stopRunning()
                    }
                    return currSecs
                })
            }, 1000)
        )
    }

    const stopRunning = () => {
        clearInterval(timerInterval)
        setRunning(false)
        setTimerInterval(undefined)
    }

    const handlePause = () => {
        stopRunning()
    }

    const resetTimer = () => {
        setMinutes(runLength / 60);
        setSeconds(0);
        setTimerDisplay(calcDisplay(0))
    }

    const handleStop = () => {
        stopRunning()
        resetTimer()
    }

    return (
        <div className="pomodoro">
            <div className='headers centered'>
                <p>Pomodoro</p>
                <p>Short Break</p>
                <p>Long Break</p>
            </div>
            <div className='timer centered'>
                <h1>{timerDisplay}</h1>
            </div>
            <div className='buttons centered'>
                <button 
                    disabled={running} 
                    onClick={handleStart}>
                    Start
                </button>
                <button 
                    disabled={!running}
                    onClick={handlePause}>
                    Pause 
                </button>
                <button 
                    onClick={handleStop}>
                    Stop
                </button>
            </div>

        </div>
    )
}

export default Pomodoro;