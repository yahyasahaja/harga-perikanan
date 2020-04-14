import React from 'react';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';
import Button from 'react-bootstrap/Button';
import styles from './filter.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAreaOption, fetchSizeOption } from 'store/Options';
import { RootState } from 'store';
import { LabelValue, MappedAreaOption, SizeOption } from 'api/fishPricelistAPI';
import { fetchFishPrices, reset, setSearch } from 'store/FishPrice';

const CITY_KEY = 'area_kota';
const PROVINCE_KEY = 'area_provinsi';
const SIZE_KEY = 'size';

const ALL_PROVINCE_LABEL_VALUE = {
  label: 'Semua Provinsi',
  value: '',
};

const ALL_AREA_OPTION = {
  province: ALL_PROVINCE_LABEL_VALUE,
  cities: [],
};

const ALL_CITY_LABEL_VALUE = {
  label: 'Semua Kota',
  value: '',
};

const ALL_SIZE = {
  size: 'Semua Size',
};

const Filter = () => {
  const dispatch = useDispatch();
  const { mappedAreaOptions, sizeOptions } = useSelector(
    (store: RootState) => store.optionReducer
  );

  //STATE
  const [selectedAreaOption, setSelectedAreaOption] = React.useState<
    MappedAreaOption
  >(ALL_AREA_OPTION);
  const [selectedCity, setSelectedCity] = React.useState<LabelValue | null>(
    null
  );
  const [selectedSize, setSelectedSize] = React.useState<SizeOption>(ALL_SIZE);

  let cityOptions: LabelValue[] = [];

  if (selectedAreaOption?.cities) {
    cityOptions = selectedAreaOption?.cities;
  }

  const resetFilters = () => {
    setSelectedSize(ALL_SIZE);
    setSelectedCity(ALL_CITY_LABEL_VALUE);
    setSelectedAreaOption(ALL_AREA_OPTION);
  };

  React.useEffect(() => {
    dispatch(fetchAreaOption());
    dispatch(fetchSizeOption());
    // dispatch(fetchFishPrices());
    // eslint-disable-next-line
  }, []);

  React.useEffect(() => {
    dispatch(reset());
    const city = selectedCity?.value;
    const province = selectedAreaOption.province.value;
    const size = selectedSize.size;

    if (city) {
      dispatch(setSearch({ [CITY_KEY]: city }));
    } else if (province) {
      dispatch(setSearch({ [PROVINCE_KEY]: province }));
    } else if (size !== ALL_SIZE.size) {
      dispatch(setSearch({ [SIZE_KEY]: size }));
    }

    console.log('ke sinni?', city, size, province);
    dispatch(fetchFishPrices());
  }, [selectedAreaOption, selectedSize, selectedCity]);

  return (
    <div className={styles.container}>
      <DropdownButton
        id="filter-province"
        title={selectedAreaOption.province.label}
        className={styles['button-wrapper']}
      >
        <Dropdown.Item
          active={
            selectedAreaOption?.province.value ===
            ALL_AREA_OPTION.province.value
          }
          key={0}
          onClick={() => {
            resetFilters();
            setSelectedAreaOption(ALL_AREA_OPTION);
          }}
        >
          {ALL_PROVINCE_LABEL_VALUE.label}
        </Dropdown.Item>
        <Dropdown.Divider />
        {mappedAreaOptions.map((areaOption, i) => (
          <Dropdown.Item
            active={
              areaOption.province.value === selectedAreaOption?.province.value
            }
            key={i + 1}
            onClick={() => {
              resetFilters();
              setSelectedAreaOption(areaOption);
            }}
          >
            {areaOption.province.label} ({areaOption.cities.length} kota)
          </Dropdown.Item>
        ))}
      </DropdownButton>

      <DropdownButton
        id="filter-city"
        title={selectedCity ? selectedCity.label : 'Filter City'}
        disabled={cityOptions.length === 0}
        className={styles['button-wrapper']}
      >
        <Dropdown.Item
          active={ALL_CITY_LABEL_VALUE.value === selectedCity?.value}
          key={0}
          onClick={() => {
            setSelectedSize(ALL_SIZE);
            setSelectedCity(ALL_CITY_LABEL_VALUE);
          }}
        >
          {ALL_CITY_LABEL_VALUE.label}
        </Dropdown.Item>
        <Dropdown.Divider />
        {cityOptions.map((city, i) => (
          <Dropdown.Item
            active={city.value === selectedCity?.value}
            key={i}
            onClick={() => {
              setSelectedSize(ALL_SIZE);
              setSelectedCity(city);
            }}
          >
            {city.label}
          </Dropdown.Item>
        ))}
      </DropdownButton>

      <DropdownButton
        id="filter-size"
        title={selectedSize.size}
        className={styles['button-wrapper']}
      >
        <Dropdown.Item
          active={ALL_SIZE.size === selectedSize?.size}
          key={0}
          onClick={() => {
            resetFilters();
            setSelectedSize(ALL_SIZE);
          }}
        >
          {ALL_SIZE.size}
        </Dropdown.Item>
        <Dropdown.Divider />
        {sizeOptions.map((sizeOption, i) => (
          <Dropdown.Item
            active={sizeOption.size === selectedSize?.size}
            key={i}
            onClick={() => {
              resetFilters();
              setSelectedSize(sizeOption);
            }}
          >
            {sizeOption.size}
          </Dropdown.Item>
        ))}
      </DropdownButton>

      <Button
        onClick={resetFilters}
        className={styles['button-wrapper']}
        variant="primary"
      >
        Clear
      </Button>
    </div>
  );
};

export default Filter;
