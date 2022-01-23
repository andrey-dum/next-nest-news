import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit'
import {createWrapper, HYDRATE} from 'next-redux-wrapper';
// import counterReducer from '../features/counter/counterSlice'
import {userReducer} from './slices/userSlice'

export function makeStore() {
  return configureStore({
    reducer: { 
        user: userReducer,
    },
  })
}

export const store = makeStore()


export type AppStore = ReturnType<typeof makeStore>;
export type AppState = ReturnType<AppStore['getState']>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppState, unknown, Action<string>>;

export type AppDispatch = typeof store.dispatch

export const wrapper = createWrapper<AppStore>(makeStore);

// export const selectSubject = (id: any) => (state: AppState) => state?.[subjectSlice.name]?.[id];
