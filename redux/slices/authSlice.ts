import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLoggedIn: false,
  token: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuthStatusTrue: (state, action) => {
      state.isLoggedIn = true;
      state.token = action.payload.token;
    },
    setAuthStatusFalse: (state) => {
      state.isLoggedIn = false;
    },
  },
});

export const { setAuthStatusTrue, setAuthStatusFalse } = authSlice.actions;

export const selectIsLoggedIn = (state: { userAuth: { isLoggedIn: any } }) =>
  state.userAuth.isLoggedIn;

export const selectToken = (state: { userAuth: { token: any } }) =>
  state.userAuth.token;

export default authSlice.reducer;
