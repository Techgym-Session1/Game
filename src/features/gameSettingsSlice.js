import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  user: "",
  sessionId: "",
  profile: ""
}

export const gameSettingsSlice = createSlice({
  name: 'gameSettings',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload
    },
    setSessionId: (state, action) => {
      state.sessionId = action.payload
    },
    setProfile: (state, action) => {
      state.profile = action.payload
    },
  },
})

export const { setUser, setSessionId, setProfile } = gameSettingsSlice.actions

export default gameSettingsSlice.reducer