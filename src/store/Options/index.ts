import { createSlice, PayloadAction, Action } from '@reduxjs/toolkit';
import {
  AreaOption,
  MappedAreaOption,
  SizeOption,
  fetchAreaOptionApi,
  fetchSizeOptionApi,
} from '../../api/fishPricelistAPI';
import { ThunkAction } from 'redux-thunk';
import { RootState } from '..';

export type AppThunk = ThunkAction<void, RootState, unknown, Action<string>>;

export interface OptionState {
  isFetchingArea: boolean;
  isFetchingSize: boolean;
  areaOptions: AreaOption[];
  mappedAreaOptions: MappedAreaOption[];
  sizeOptions: SizeOption[];
}

const optionInitialState: OptionState = {
  isFetchingArea: false,
  isFetchingSize: false,
  areaOptions: [],
  mappedAreaOptions: [],
  sizeOptions: [],
};

type AreaOptionsMap = {
  [provinceName: string]: [string];
};

export const optionSlice = createSlice({
  name: 'options',
  initialState: optionInitialState,
  reducers: {
    setIsFetchingArea: (state, { payload }: PayloadAction<boolean>) => {
      state.isFetchingArea = payload;
    },
    setIsFetchingSize: (state, { payload }: PayloadAction<boolean>) => {
      state.isFetchingSize = payload;
    },
    setAreaOption: (
      state,
      { payload: areaOptions }: PayloadAction<AreaOption[]>
    ) => {
      state.areaOptions = areaOptions;

      const areaOptionsMap: AreaOptionsMap = {};
      areaOptions.forEach((areaOption) => {
        areaOptionsMap[areaOption.province].push(areaOption.city);
      });

      const mappedAreaOptions: MappedAreaOption[] = [];
      for (const i in areaOptionsMap) {
        mappedAreaOptions.push({
          province: i,
          cities: areaOptionsMap[i],
        });
      }
      state.mappedAreaOptions = mappedAreaOptions;
    },
    setSizeOption: (
      state,
      { payload: sizeOptions }: PayloadAction<SizeOption[]>
    ) => {
      state.sizeOptions = sizeOptions;
    },
  },
});

export const {
  setAreaOption,
  setIsFetchingArea,
  setIsFetchingSize,
  setSizeOption,
} = optionSlice.actions;

export const optionReducer = optionSlice.reducer;

export const fetchAreaOption = (): AppThunk => async (dispatch) => {
  try {
    dispatch(setIsFetchingArea(true));
    const { data: areaOptions } = await fetchAreaOptionApi();
    dispatch(setAreaOption(areaOptions));
  } catch (err) {
    console.log('', err);
  } finally {
    dispatch(setIsFetchingArea(false));
  }
};

export const fetchSizeOption = (): AppThunk => async (dispatch) => {
  try {
    dispatch(setIsFetchingSize(true));
    const { data: sizeOptions } = await fetchSizeOptionApi();
    dispatch(setSizeOption(sizeOptions));
  } catch (err) {
    console.log('', err);
  } finally {
    dispatch(setIsFetchingSize(false));
  }
};
