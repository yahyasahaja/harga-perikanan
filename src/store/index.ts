import {
  configureStore,
  getDefaultMiddleware,
  combineReducers,
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

const store = configureStore({
  reducer: rootReducer,
  middleware,
});

export type RootState = ReturnType<typeof rootReducer>;

export default store;
