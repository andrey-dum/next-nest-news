import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { HYDRATE } from 'next-redux-wrapper';
import { UserResponse } from '../../services/dto/user-dto'
import { AppState } from '../store';

export interface UserState {
  data: UserResponse | null;
}

const initialState: UserState = {
  // data: {} as UserResponse,
  data: null,
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserResponse>) => {
      state.data = action.payload;
    },
   
  },
  extraReducers: {
    [HYDRATE]: (state, action) => {
        // console.log('HYDRATE', state, action.payload);
        return {
            ...state,
            ...action.payload.user,
        };
    },
},
})

export const { setUser } = userSlice.actions

export const selectUserData = (state: AppState) => state.user.data

export const userReducer =  userSlice.reducer