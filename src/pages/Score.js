import React, { useLayoutEffect, useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';

const Score = () => {
  const gameSettings = useSelector((state) => state.gameSettings);
  const [ score, setScore ] = useState('');

  const fetchScore = () => {
    axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/score/${gameSettings.sessionId}?user=${gameSettings.user}`)
    .then(res => {
      console.log(res)
      setScore(res.data.score);
    });
  }

  useLayoutEffect(() => {
    fetchScore();
  }, []);

  return (
    <div className='score'>
      <p className='score__result'>
        Ben fatto {gameSettings.user}! <br /> Il tuo punteggio è di {score}/10
      </p>
    </div>
  )
}

export default Score;