import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';


export default function StartPage() {
    const [word, setWord] = useState("");
    const [seconds, setSeconds] = useState(5);
    const [wordCount, setWordCount] = useState(0);
    const apiUrl = 'http://localhost:5246/albert';

    const gameRule = 2;

    const navigate = useNavigate();
    const goToGamePage = async () => {
        const count = await getCount();
        if (count >= gameRule) {
            navigate('/Game', { state: { seconds } }, { state: { wordCount } });
        } else {
            document.getElementById('result').innerText = "You need 2 or more words inside the list to start the Game!";
        }
    };

    async function getCount() {
        try {
            const response = await fetch(`${apiUrl}/count`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error(`Was not able to get the count, status: ${response.status}`);
            }

            const data = await response.json();
            console.log(data);
            setWordCount(data);
            return data;
        } catch (error) {
            console.error('Error fetching word count', error);
            return 0;
        }
    }

    async function getWords() {
        const response = await fetch(`${apiUrl}/get`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        const data = await response.json();
        document.getElementById('result').textContent = JSON.stringify(data);
    }


    async function addWords() {
        try {
            const response = await fetch(`${apiUrl}/add`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ word }),
            });

            if (!response.ok) {
                throw new Error(`HTTP error!, status: ${response.status}`);
            }

            const data = await response.json();
            console.log('API data:', data);
            document.getElementById('result').textContent = JSON.stringify(data);

        } catch (error) {
            console.error('Error fetching data:', error);
            alert('There was an error fetching data. Check the console for more details.')
        }
    }

    async function removeWords() {
        try {
            const response = await fetch(`${apiUrl}/remove`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify('List data has been removed.')
            });

            if (!response.ok) {
                throw new Error(`Error in removing the array data!, status:${response.status}`)
            }

            const data = await response.json();
            document.getElementById('result').textContent = JSON.stringify(data);

        } catch (error) {
            console.error('Error fething data:', error);
            alert('There was an error fetching removing data. Check the console for more details')
        }
    }

    useEffect(() => {
        getCount();
    })

    return (
        <div>
            Store words inside a list!
            <div>
                <input
                    type="text"
                    value={word}
                    onChange={(e) => setWord(e.target.value)}
                    placeholder="Enter a word"
                />
                <input
                    type="number"
                    value={seconds}
                    onChange={(e) => setSeconds(Number(e.target.value))}
                    placeholder="Enter the amount of seconds desired"
                />
                <button onClick={getWords}>GetWords</button>
                <button onClick={addWords}>AddWords</button>
                <button onClick={removeWords}>RemoveWords</button>
            </div>
            <div>
                <button onClick={goToGamePage}>Start Game</button>
            </div>
            <div id="result"></div>
        </div>
    );
}
