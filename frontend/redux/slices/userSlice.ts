import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { UserResponse } from '../../services/dto/user-dto'
import { AppState } from '../store';

export interface UserState {
  data: UserResponse | null;
}

const initialState: UserState = {
  // data: {} as UserResponse,
  data: null,
}


// export const incrementAsync = createAsyncThunk(
//   'counter/fetchCount',
//   async (amount: number) => {
//     const response = await fetchCount(amount)
//     // The value we return becomes the `fulfilled` action payload
//     return response.data
//   }
// )

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserResponse>) => {
      state.data = action.payload;
    },
   
  },
  // extraReducers: (builder) => {
  //   builder
  //     .addCase(incrementAsync.pending, (state) => {
  //       state.status = 'loading'
  //     })
  //     .addCase(incrementAsync.fulfilled, (state, action) => {
  //       state.status = 'idle'
  //       state.value += action.payload
  //     })
  // },
})

export const { setUser } = userSlice.actions

export const selectUserData = (state: AppState) => state.user.data

// We can also write thunks by hand, which may contain both sync and async logic.
// Here's an example of conditionally dispatching actions based on current state.
// export const incrementIfOdd =
//   (amount: number): AppThunk =>
//   (dispatch, getState) => {
//     const currentValue = selectCount(getState())
//     if (currentValue % 2 === 1) {
//       dispatch(incrementByAmount(amount))
//     }
//   }

export const userReducer =  userSlice.reducer