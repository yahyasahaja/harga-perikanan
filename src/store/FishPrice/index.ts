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
  hasNext: boolean;
}

const fishPriceInitialState: FishPriceState = {
  isFetchingPriceList: false,
  fishPrices: [],
  offset: 0,
  limit: DEFAULT_LIMIT,
  hasNext: true,
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
      state.fishPrices = payload.filter((fishPrice) => fishPrice.uuid);
    },
    setOffset: (state, { payload }: PayloadAction<number>) => {
      state.offset = payload;
    },
    setLimit: (state, { payload }: PayloadAction<number>) => {
      state.limit = payload;
    },
    setSearch: (state, { payload }: PayloadAction<SearchProp>) => {
      state.search = payload;
    },
    setHasNext: (state, { payload }: PayloadAction<boolean>) => {
      state.hasNext = payload;
    },
    reset: (state) => {
      state.fishPrices = [];
      state.isFetchingPriceList = false;
      state.offset = 0;
      state.limit = DEFAULT_LIMIT;
      state.hasNext = true;
      state.search = undefined;
    },
  },
});

export const {
  setFishPrices,
  setIsFetchingPriceList,
  setLimit,
  setOffset,
  setSearch,
  reset,
  setHasNext,
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
    dispatch(
      setFishPrices([...getState().fishPriceStore.fishPrices, ...fishPrices])
    );
  } catch (err) {
    console.log('ERROR WHILE FETCHING FISH PRICE', err);
  } finally {
    dispatch(setIsFetchingPriceList(false));
  }
};

export const fetchNextFishPrices = (): AppThunk => async (
  dispatch,
  getState
) => {
  try {
    const { offset, limit, fishPrices } = getState().fishPriceStore;
    const beforeLength = fishPrices.length;
    dispatch(setOffset(offset + limit));
    await dispatch(fetchFishPrices());
    const afterLength = getState().fishPriceStore.fishPrices.length;
    if (afterLength === beforeLength) {
      dispatch(setHasNext(false));
    }
  } catch (err) {
    console.log('ERROR WHILE FETCHING FISH PRICE', err);
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
    console.log('ERROR WHILE ADDING FISH PRICE', err);
  } finally {
    dispatch(hideOverlayLoading());
  }
};
