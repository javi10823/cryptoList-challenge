import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {Coin, GetCoinsRequest, GetCoinsResponse} from '../../types/crypto';
import {CRYPTO_API} from 'react-native-dotenv';

export const cryptoApi = createApi({
  reducerPath: 'cryptoApi',
  baseQuery: fetchBaseQuery({baseUrl: CRYPTO_API}),
  endpoints: builder => ({
    getFirst50Coins: builder.query<GetCoinsResponse, GetCoinsRequest>({
      query: ({limit, page}: GetCoinsRequest) =>
        `tickers/?start=${page * limit}limit=${limit}`,
    }),
    getCoin: builder.query<Coin[], {id: number}>({
      query: ({id}) => `ticker/?id=${id}`,
    }),
  }),
});

export const {useGetFirst50CoinsQuery, useGetCoinQuery} = cryptoApi;
