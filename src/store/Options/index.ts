import { createSlice, PayloadAction, Action } from '@reduxjs/toolkit';
import {
  AreaOption,
  MappedAreaOption,
  SizeOption,
  fetchAreaOptionApi,
  fetchSizeOptionApi,
  LabelValue,
} from '../../api/fishPricelistAPI';
import { ThunkAction } from 'redux-thunk';
import { RootState } from '..';
import { convertWordToLabelValue } from 'utils';

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
  [provinceName: string]: LabelValue[];
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
        if (!areaOptionsMap[areaOption.province]) {
          areaOptionsMap[areaOption.province] = [];
        }
        if (areaOption.city) {
          areaOptionsMap[areaOption.province].push(
            convertWordToLabelValue(areaOption.city)
          );
        }
      });

      const mappedAreaOptions: MappedAreaOption[] = [];
      for (const i in areaOptionsMap) {
        mappedAreaOptions.push({
          province: convertWordToLabelValue(i),
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
