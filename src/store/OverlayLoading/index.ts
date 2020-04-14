import { createSlice, Action } from '@reduxjs/toolkit';
import { ThunkAction } from 'redux-thunk';
import { RootState } from '..';

export type AppThunk = ThunkAction<void, RootState, unknown, Action<string>>;

export interface OverlayLoadingState {
  isShown: boolean;
}

const overlayLoadingInitialState: OverlayLoadingState = {
  isShown: false,
};

export const overlayLoadingSlice = createSlice({
  name: 'overlayLoading',
  initialState: overlayLoadingInitialState,
  reducers: {
    showOverlayLoading: (state) => {
      state.isShown = true;
    },
    hideOverlayLoading: (state) => {
      state.isShown = false;
    },
  },
});

export const overlayLoadingReducer = overlayLoadingSlice.reducer;

export const {
  hideOverlayLoading,
  showOverlayLoading,
} = overlayLoadingSlice.actions;
