import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentprofile: null,
  loading: false,
};

export const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    profileStart: (state) => {
      state.loading = true;
    },
    profileSuccess: (state, action) => {
      state.loading = false;
      state.currentprofile = action.payload;
    },
    profileFailure: (state) => {
      state.loading = false;
    },
    profileLogout: (state) => {
      state.currentprofile = null;
      state.loading = false;
    },
  },
});

export const { profileStart, profileSuccess, profileFailure, profileLogout } =
  profileSlice.actions;

export default profileSlice.reducer;
