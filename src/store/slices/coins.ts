import AsyncStorage from '@react-native-async-storage/async-storage';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {Coin} from '../../types/crypto';

export interface CoinsState {
  coins: Coin[];
  charts: {
    [key: string]: number[];
  };
  requests: {
    [key: string]: number;
  };
}

const initialState: CoinsState = {
  coins: [],
  charts: {},
  requests: {},
};

export const coinsSlice = createSlice({
  name: 'coins',
  initialState,
  reducers: {
    setCoins: (state, action: PayloadAction<Coin[]>) => {
      state.coins = action.payload;
      AsyncStorage.setItem('coins', JSON.stringify(action.payload));
    },
    addToCharts: (
      state,
      actions: PayloadAction<{coin: string; value: number}>,
    ) => {
      if (!state.charts[actions.payload.coin]) {
        state.charts[actions.payload.coin] = [];
      }
      state.charts[actions.payload.coin].push(actions.payload.value);
      if (state.charts[actions.payload.coin].length > 10) {
        state.charts[actions.payload.coin].shift();
      }
      AsyncStorage.setItem(
        'charts-' + actions.payload.coin,
        JSON.stringify(state.charts[actions.payload.coin]),
      );
      if (!state.requests[actions.payload.coin]) {
        state.requests[actions.payload.coin] = 0;
      }
      state.requests[actions.payload.coin]++;
    },
    replaceCharts: (
      state,
      actions: PayloadAction<{coin: string; value: number[]}>,
    ) => {
      state.charts[actions.payload.coin] = actions.payload.value;
    },
  },
});

export const {setCoins, addToCharts, replaceCharts} = coinsSlice.actions;

export default coinsSlice.reducer;
