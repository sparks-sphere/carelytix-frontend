import { createSlice } from '@reduxjs/toolkit';

interface AuthState {
  user: any;
  token: string | null;
  loading: boolean;
  error: string | null;
  initialized: boolean; // Track if we've attempted to fetch user
}

const initialState: AuthState = {
  user: null,
  token: null,
  loading: false,
  error: null,
  initialized: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginRequest: (state, action) => {
      state.loading = true;
      state.error = null;
    },
    loginSuccess: (state, action) => {
      console.log('action.payload', action.payload);
      state.user = action.payload;
      state.token = action.payload?.token;
      state.loading = false;
      state.error = null;
    },
    loginFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    registerRequest: (state, action) => {
      state.loading = true;
      state.error = null;
    },
    registerSuccess: (state, action) => {
      console.log('action.payload', action.payload);
      state.user = action.payload;
      state.loading = false;
      state.error = null;
    },
    registerFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    getUserRequest: (state) => {
      state.loading = true;
      state.error = null;
      state.initialized = true;
    },
    getUserSuccess: (state, action) => {
      state.user = action.payload;
      state.loading = false;
      state.error = null;
      state.initialized = true;
    },
    getUserFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.initialized = true;
    },
  },
});

export const {
  loginRequest,
  loginSuccess,
  loginFailure,
  registerRequest,
  registerSuccess,
  registerFailure,
  getUserRequest,
  getUserSuccess,
  getUserFailure,
} = authSlice.actions;
export default authSlice.reducer;
