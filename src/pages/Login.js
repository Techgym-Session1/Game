import React, { useState, useEffect } from 'react';
import ProfileSelection from '../components/ProfileSelection';
import TextInput from '../components/TextInput';
import StartGameButton from '../components/StartGameButton';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import { useDispatch } from 'react-redux'
import { setProfile, setUser, setSessionId } from '../features/gameSettingsSlice';

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [ profiles, setProfiles ] = useState([]);
  
  const [ gameSettings, setGameSettings ] = useState({
    user: "",
    sessionId: "",
    selectedProfile: ""
  });
  
  const fetchProfiles = async () => {
    // Fetching playable profiles from BackEnd
    const res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/profile`)
    setProfiles(res.data.profiles)
  }

  useEffect(() => {
    // Fetch profiles on load
    fetchProfiles();
  }, []);

  const handleChange = (key, value) => {
    setGameSettings({
      ...gameSettings,
      [key]: value
    });
  }

  const handleSelectProfile = (value) => {
    setGameSettings({
      ...gameSettings,
      selectedProfile: value
    })
  }

  const handleGoToGame = () => {
    const body = {
      user: gameSettings.user,
      profile: gameSettings.selectedProfile 
    }
    axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/join-game/${gameSettings.sessionId}`, body)
      .then(() => {
        dispatch(setProfile(gameSettings.selectedProfile));
        dispatch(setUser(gameSettings.user));
        dispatch(setSessionId(gameSettings.sessionId));

        navigate('/game');
      })
      .catch(err => {
        console.log(err.response);
        console.log(err.toJSON());
        switch (err.response.status) {
          case 409:
            //alert('Utente già in sessione');
            alert(err.response.data.error);
            break;
          default:
            alert(err.message);
        }
      });
  }

  const buttonDisabled = gameSettings.user === "" || gameSettings.sessionId === "" || gameSettings.profile === ""

  return (
    <div className='login'> 
      <div className='login__container'>
        <div className='login__inputs'>
          <TextInput placeholderText="Session Code" handleChange={handleChange} target="sessionId" />
          <TextInput placeholderText="Nickname" handleChange={handleChange} target="user" />
        </div>
        <p className='login__quote'>Scegli il linguaggio che ti rappresenta di più</p>
        <ProfileSelection profiles={profiles} handleChange={handleSelectProfile} />
        <StartGameButton disabled={buttonDisabled} handleClick={handleGoToGame} to="/game" className='button'>Start Game</StartGameButton>
      </div>
    </div>
  )
}

export default Login;
