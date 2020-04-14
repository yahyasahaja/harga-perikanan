import { createSlice, PayloadAction, Action } from '@reduxjs/toolkit';
import {
  FishPrice,
  DEFAULT_LIMIT,
  addFishPricesApi,
  fetchFishPricesApi,
  SearchProp,
} from '../../api/fishPricelistAPI';
import { ThunkAction } from 'redux-thunk';
import { RootState } from '..';
import { showOverlayLoading, hideOverlayLoading } from '../OverlayLoading';

export type AppThunk = ThunkAction<void, RootState, unknown, Action<string>>;

export interface FishPriceState {
  isFetchingPriceList?: boolean;
  fishPrices: FishPrice[];
  offset: number;
  limit: number;
  search?: SearchProp;
}

const fishPriceInitialState: FishPriceState = {
  isFetchingPriceList: false,
  fishPrices: [],
  offset: 0,
  limit: DEFAULT_LIMIT,
};

export const fishPriceSlice = createSlice({
  name: 'fishPrices',
  initialState: fishPriceInitialState,
  reducers: {
    setIsFetchingPriceList: (
      state,
      { payload: isFetchingPriceList }: PayloadAction<boolean>
    ) => {
      state.isFetchingPriceList = isFetchingPriceList;
    },
    setFishPrices: (state, { payload }: PayloadAction<FishPrice[]>) => {
      state.fishPrices = payload;
    },
    setOffset: (state, { payload }: PayloadAction<number>) => {
      state.offset = payload;
    },
    setLimit: (state, { payload }: PayloadAction<number>) => {
      state.limit = payload;
    },
    reset: (state) => {
      state.fishPrices = [];
      state.isFetchingPriceList = false;
      state.offset = 0;
      state.limit = DEFAULT_LIMIT;
    },
  },
});

export const {
  setFishPrices,
  setIsFetchingPriceList,
  setLimit,
  setOffset,
} = fishPriceSlice.actions;

export const fishPriceReducer = fishPriceSlice.reducer;

export const fetchFishPrices = (): AppThunk => async (dispatch, getState) => {
  try {
    dispatch(setIsFetchingPriceList(true));
    const { data: fishPrices } = await fetchFishPricesApi({
      limit: getState().fishPriceStore.limit,
      offset: getState().fishPriceStore.offset,
      search: getState().fishPriceStore.search,
    });
    dispatch(setFishPrices(fishPrices));
  } catch (err) {
    console.log('', err);
  } finally {
    dispatch(setIsFetchingPriceList(false));
  }
};

export const addFishPrices = (fishPrice: FishPrice): AppThunk => async (
  dispatch
) => {
  try {
    dispatch(showOverlayLoading());
    await addFishPricesApi(fishPrice);
    dispatch(fetchFishPrices());
  } catch (err) {
    console.log('', err);
  } finally {
    dispatch(hideOverlayLoading());
  }
};
