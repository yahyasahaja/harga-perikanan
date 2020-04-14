import {
  configureStore,
  getDefaultMiddleware,
  combineReducers,
  EnhancedStore,
} from '@reduxjs/toolkit';

import { fishPriceReducer } from './FishPrice';
import { overlayLoadingReducer } from './OverlayLoading';
import { optionReducer } from './Options';

const rootReducer = combineReducers({
  fishPriceStore: fishPriceReducer,
  overlayLoadingStore: overlayLoadingReducer,
  optionReducer: optionReducer,
});
const middleware = getDefaultMiddleware();

export const store = configureStore({
  reducer: rootReducer,
  middleware,
});

export type RootState = ReturnType<typeof rootReducer>;

declare global {
  interface Window {
    clientStore: EnhancedStore;
  }
}

export default window.clientStore = store;
