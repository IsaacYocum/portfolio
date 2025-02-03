import { useCallback, useEffect, useRef, useState } from 'react';
import './pomodoro.css';

const enum RUNNING_STATES {
    RESET,
    RUNNING,
    PAUSED,
    FINISHED,
}

const enum PHASE_STATES {
    POMODORO,
    SHORT_BREAK,
    LONG_BREAK,
}

const POMODORO_RUN_LENGTH_SECS = 2
const SHORT_BREAK_RUN_LENGTH_SECS = 1
const LONG_BREAK_RUN_LENGTH_SECS = 3 

const Pomodoro = () => {
    const calcDisplay = (currSecs: number, runLength: number) => {
        console.log('calcDisplay')
        const remainingSecs = runLength - currSecs
        const mins = Math.floor(remainingSecs / 60);
        const secs = remainingSecs % 60;
        const displayMins = mins < 10 ? `0${mins}` : mins;
        const displaySecs = secs < 10 ? `0${secs}` : secs;
        
        return `${(displayMins)}:${displaySecs}`
    }

    const [runLengthSecs, setRunLengthSecs] = useState(POMODORO_RUN_LENGTH_SECS)
    const [runningState, setRunningState] = useState(RUNNING_STATES.RESET)
    const [phaseState, setPhaseState] = useState(PHASE_STATES.POMODORO)
    const [numPomodoros, setNumPomodoros] = useState(0)
    const [runTimeSecs, setRunTimeSecs] = useState(0)
    const [timerDisplay, setTimerDisplay] = useState(calcDisplay(0, POMODORO_RUN_LENGTH_SECS))
    const timerInterval = useRef<NodeJS.Timer>()

    const stopRunning = useCallback(() => {
        setRunningState(RUNNING_STATES.RESET)
        clearInterval(timerInterval.current)
    }, [timerInterval])

    useEffect(() => {
        const updatePhaseState = () => {
            const changePhase = (phase: PHASE_STATES, runLengthSecs: number) => {
                // stopRunning()
                setRunLengthSecs(runLengthSecs)
                setRunTimeSecs(0)
                setPhaseState(phase)
                // handleStart()
            }

            switch (phaseState) {
                case PHASE_STATES.POMODORO:
                    setNumPomodoros(prev => {
                        const timesRun = prev + 1;
                        if (timesRun % 4 !== 0) {
                            changePhase(PHASE_STATES.SHORT_BREAK, SHORT_BREAK_RUN_LENGTH_SECS)
                        } else {
                            changePhase(PHASE_STATES.LONG_BREAK, LONG_BREAK_RUN_LENGTH_SECS)
                        }

                        return timesRun;
                    })
                    break;
                case PHASE_STATES.SHORT_BREAK:
                case PHASE_STATES.LONG_BREAK:
                    changePhase(PHASE_STATES.POMODORO, POMODORO_RUN_LENGTH_SECS)
                    break;
            }
        }

        if (runTimeSecs >= runLengthSecs) {
            updatePhaseState()
        }
    }, [runTimeSecs, stopRunning, runLengthSecs, phaseState])

    const handleStart = useCallback(() => {
        setRunningState(RUNNING_STATES.RUNNING)

        timerInterval.current = setInterval(() => {
            setRunTimeSecs(prev => {
                const currSecs = prev + 1
                setTimerDisplay(calcDisplay(currSecs, runLengthSecs))
                return currSecs
            })
        }, 1000)
    }, [runLengthSecs])


    // useEffect(() => {

    //     if (runningState === RUNNING_STATES.FINISHED) {
    //         updatePhaseState();
    //     }
    // }, [runningState, handleStart, phaseState, stopRunning])

    function handlePause() {
        setRunningState(RUNNING_STATES.PAUSED)
        stopRunning()
    }

    function resetTimer() {
        setRunTimeSecs(0);
        setTimerDisplay(calcDisplay(0, runLengthSecs))
    }

    function handleReset() {
        setRunningState(RUNNING_STATES.RESET)
        stopRunning()
        resetTimer()
    }

    return (
        <div className="pomodoro">
            <div className='headers centered'>
                <p
                    style={{ backgroundColor: phaseState === PHASE_STATES.POMODORO ? 'pink' : "" }}
                >Pomodoro</p>
                <p
                    style={{ backgroundColor: phaseState === PHASE_STATES.SHORT_BREAK ? 'pink' : "" }}
                >Short Break</p>
                <p
                    style={{ backgroundColor: phaseState === PHASE_STATES.LONG_BREAK ? 'pink' : "" }}
                >Long Break</p>
            </div>
            <div className='timer centered'>
                <h1>{timerDisplay}</h1>
            </div>
            <div className='buttons centered' >
                <button 
                    disabled={runningState !== RUNNING_STATES.RESET && runningState !== RUNNING_STATES.PAUSED} 
                    onClick={handleStart}>
                    Start
                </button>
                <button 
                    disabled={runningState !== RUNNING_STATES.RUNNING && runningState !== RUNNING_STATES.FINISHED}
                    onClick={handlePause}>
                    Pause 
                </button>
                <button 
                    onClick={handleReset}>
                    Reset
                </button>
            </div>
        </div>
    )
}

export default Pomodoro;