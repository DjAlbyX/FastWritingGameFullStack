import React, { useState, useEffect, useRef } from 'react'
import { useNavigate, useLocation } from 'react-router-dom';


export default function Game() {
    const apiUrl = 'http://localhost:5246/albert';
    const [score, setScore] = useState(0);
    const [word, setWord] = useState("");
    const timerKeyRef = useRef(0);
    const inputRef = useRef("");
    const location = useLocation();

    const { seconds = 5 } = location.state || {};
    const navigate = useNavigate();

    const goToHomePage = () => {
        navigate('/');
    };

    async function getWord() {
        const response = await fetch(`${apiUrl}/getWord`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error(`Was not able to get the word, status: ${response.status}`);
        }

        const data = await response.json();
        console.log('API data:', data);
        setWord(data);
        document.getElementById('inputValue').value = "";
    }

    const CountdownTimer = ({ initialSeconds, onComplete }) => {
        const [seconds, setTimeLeft] = useState(initialSeconds);
        const intervalRef = useRef();

        useEffect(() => {
            if (seconds > 0) {
                intervalRef.current = setInterval(() => {
                    setTimeLeft((sec) => sec - 1);
                }, 1000);
                return () => clearInterval(intervalRef.current);
            } else {
                onComplete();
            }
        }, [seconds, onComplete]);

        return (
            <div>
                <h1>Countdown: {seconds} seconds</h1>
            </div>
        );
    };

    const handleInputChange = (e) => {
        inputRef.current = e.target.value;
    };


    const handleCheckWord = () => {
        const userInput = inputRef.current.trim().toLocaleLowerCase();
        const fetchedWord = word.trim().toLocaleLowerCase();

        if (userInput === fetchedWord) {
            setScore(prevScore => prevScore + 1);
        } else {
            setScore(prevScore => prevScore - 1);
        }
    };

    const handleTimerComplete = () => {
        setScore(prevScore => prevScore - 1);
        getWord();
        setTimeout(() => {
            getWord();
            timerKeyRef.current += 1;
        }, 2000);
    };

    useEffect(() => {
        getWord();
    }, []);

    return (
        <>
            <div>
                <h1>Write down the words as shown before the timer runs out!</h1>
                <div>
                    <CountdownTimer
                        key={timerKeyRef.current}
                        initialSeconds={seconds}
                        onComplete={handleTimerComplete}
                    />
                </div>
                <input
                    type="text"
                    id="inputValue"
                    onChange={handleInputChange}
                    placeholder="Type the word in here"
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                            handleCheckWord();
                            getWord();
                        }
                    }}
                />
                <div>
                    <p>Score: {score}</p>
                </div>
                <h3>Word to Type:</h3>
                <div>
                    <p class="theWord">{word}</p>
                </div>
                <div>
                    <button onClick={goToHomePage}>Go home</button>
                </div>
            </div>
        </>
    )
}