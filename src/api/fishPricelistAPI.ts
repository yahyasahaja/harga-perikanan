import axios from 'axios';

export interface FishPrice {
  uuid: string;
  komoditas: string;
  area_provinsi: string;
  area_kota: string;
  size: string;
  price: string;
  tgl_parsed: string;
  timestamp: string;
}

export interface AreaOption {
  province: string;
  city: string;
}

export interface SizeOption {
  size: string;
}

export interface MappedAreaOption {
  province: string;
  cities: string[];
}

export const fetchAreaOptionApi = async () => {
  return await axios.get('/option_area');
};

export const fetchSizeOptionApi = async () => {
  return await axios.get('/option_size');
};

export type SearchProp = {
  [name: string]: string;
};

type FetchFishPriceProps = {
  offset?: number;
  limit?: number;
  search?: SearchProp;
};

export const DEFAULT_LIMIT = 10;

export const fetchFishPricesApi = async (
  props: FetchFishPriceProps = { offset: 0, limit: DEFAULT_LIMIT }
) => {
  const { offset = 0, limit = DEFAULT_LIMIT, search } = props;
  let queryString = '';
  const searchParams = new URLSearchParams();
  if (offset) {
    searchParams.append('offset', offset.toString());
  }

  if (limit) {
    searchParams.append('limit', limit.toString());
  }

  if (search) {
    searchParams.append('search', JSON.stringify(search));
  }

  if (offset || limit || search) {
    queryString = `?${searchParams.toString()}`;
  }

  return await axios.get(`/list${queryString}`);
};

export const addFishPricesApi = async (fishPrice: FishPrice) => {
  return await axios.post('/list', fishPrice);
};
