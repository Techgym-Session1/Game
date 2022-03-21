import React, { useState, useEffect, useMemo, useRef } from 'react'
import TinderCard from 'react-tinder-card'
import { useSelector } from 'react-redux';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Game = () => {
  const [ profilesToMatch, setProfilesToMatch ] = useState([]);
  const [ currentIndex, setCurrentIndex ] = useState(profilesToMatch.length - 1)
  const currentIndexRef = useRef(currentIndex)
  const gameSettings = useSelector((state) => state.gameSettings)
  const navigate = useNavigate();

  const childRefs = useMemo(
    () =>
      Array(profilesToMatch.length)
        .fill(0)
        .map((i) => React.createRef()),
    [profilesToMatch]
  )

  const updateCurrentIndex = (val) => {
    setCurrentIndex(val)
    currentIndexRef.current = val
  }

  const canSwipe = currentIndex >= 0

  const swiped = (direction, nameToDelete, index) => {
    const dict = {
      left: false,
      right: true
    }
    sendMatch(dict[direction], profilesToMatch[index].name)
    .then(res => {
      if(currentIndex == 0) {
        updateCurrentIndex(index - 1)
        setTimeout(() => {
          navigate('/score')
        }, 1500);
      }
      else 
        updateCurrentIndex(index - 1)
    })
    .catch(err => {
      console.log(err)
      alert(err.message)
    })
  }

  const outOfFrame = (name, idx) => {
    currentIndexRef.current >= idx && childRefs[idx].current.restoreCard()
  }

  const sendMatch = async (isMatch, profileToMatch) => {
    try {
      const res = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/match/${gameSettings.sessionId}`, {
        user: gameSettings.user,
        profile: gameSettings.profile,
        profileToMatch: profileToMatch,
        match: isMatch
      })
      return res;
    } catch(err) {
      if (err.response.status == 403) {
        navigate('/score');
      }
      throw(Error)
    }
  }

  const swipe = async (dir) => {
    console.log(canSwipe)
    if (canSwipe && currentIndex < profilesToMatch.length) {
      await childRefs[currentIndex].current.swipe(dir) // Swipe the card!
      console.log(childRefs[currentIndex].current)
    }
  }

  const fetchProfiles = async () => {
    const res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/profiles-to-match?profile=${gameSettings.profile}`)
    setProfilesToMatch(res.data.profiles);
  }

  useEffect(() => {
    fetchProfiles();
  }, [gameSettings]);

  useEffect(() => {
    updateCurrentIndex(profilesToMatch.length - 1);
  }, [profilesToMatch]);
  
  return (
    <div className='game'>

      <div className='card__container'>
        {canSwipe && profilesToMatch && profilesToMatch.map((profile, index) => (
          <TinderCard
            ref={childRefs[index]}
            className='swipe'
            key={profile.name}
            onSwipe={(dir) => { swiped(dir, profile.name, index, currentIndex); console.log(currentIndex)}}
            onCardLeftScreen={() => outOfFrame(profile.name, index)}
          >
            <div className='card'>
              <div className='card__image' style={{ backgroundImage: `url(${process.env.REACT_APP_IMG_SOURCE}/${profile.imageUrl})`}}>
              </div>
              <div className='card__title'>
                {profile.name}
              </div>
            </div>
          </TinderCard>
        ))}
      </div>

      <div className='game__controls'>
        <button className='game__button' style={{ backgroundColor: !canSwipe && '#c3c4d3' }} onClick={() => swipe('left')}>
          <svg width="44" height="44" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M44 37.0113L28.7558 21.9615L43.7892 6.77783L37.0113 0L21.956 15.2497L6.721 0.210833L0 6.93183L15.2552 22.0385L0.210833 37.279L6.93183 44L22.033 28.7503L37.2222 43.7892L44 37.0113Z" fill="#FE3C72"/>
          </svg>

        </button>
        <button className='game__button' style={{ backgroundColor: !canSwipe && '#c3c4d3' }} onClick={() => swipe('right')}>
          <svg width="44" height="41" viewBox="0 0 44 41" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M22 6.29769C18.3535 -3.60047 0 -2.13014 0 12.839C0 20.297 5.61 30.2209 22 40.3335C38.39 30.2209 44 20.297 44 12.839C44 -2.04397 25.6667 -3.65914 22 6.29769Z" fill="#46DA55"/>
          </svg>
        </button>
      </div>
    </div>
  )
}

export default Game;