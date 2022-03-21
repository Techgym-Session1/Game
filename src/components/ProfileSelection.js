import React from 'react'; 

import { useState } from 'react';

const ProfileSelection = ({ profiles, handleChange }) => {
  const [ selectedProfile, setSelectedProfile ] = useState(null);
  const handleSelect = (profileId) => {
    setSelectedProfile(profileId);
    handleChange(profileId);
  }
  return (
    <div className='profile__container'>
      {
        profiles.map((profile) => {
          return (
            <Profile isSelected={profile.name === selectedProfile} title={profile.name} img={profile.imageUrl} handleSelect={handleSelect} />
          )
        })
      }
    </div>
  )
}

const Profile = ({ title, img, handleSelect, isSelected }) => {
  return (
    <button className={`profile ${isSelected ? 'profile--selected' : '' }`} onClick={() => handleSelect(title)}>
      <div className='profile__image'>
        <img alt={title} src={`${process.env.REACT_APP_IMG_SOURCE}/${img}`} />
      </div>
      <div className='profile__title'>
        {title}
      </div>
    </button>
  )
}

export default ProfileSelection;