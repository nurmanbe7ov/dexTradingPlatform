import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

import type { TokenPriceState, Token } from '../../types/types';

export interface TokenPair {
  token: string;
  currency: string;
}

const popularTokens: Token[] = [
  { id: 'bitcoin', symbol: 'BTC', name: 'Bitcoin' },
  { id: 'ethereum', symbol: 'ETH', name: 'Ethereum' },
  { id: 'solana', symbol: 'SOL', name: 'Solana' },
  { id: 'cardano', symbol: 'ADA', name: 'Cardano' },
  { id: 'polkadot', symbol: 'DOT', name: 'Polkadot' },
];

const popularCurrencies = ['USD', 'EUR', 'GBP', 'JPY', 'CNY'];

const initialState: TokenPriceState = {
  selectedPair: {
    token: 'bitcoin',
    currency: 'USD',
  },
  price: null,
  loading: false,
  error: null,
  tokens: popularTokens,
  currencies: popularCurrencies,
};

export const fetchTokenPrice = createAsyncThunk(
  'tokenPrice/fetchTokenPrice',
  async (pair: TokenPair) => {
    try {
      const response = await axios.get(
        `https://api.coingecko.com/api/v3/simple/price?ids=${pair.token}&vs_currencies=${pair.currency}`
      );
      return response.data[pair.token][pair.currency];
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(error.response?.data?.error || 'Ошибка при получении цены');
      }
      throw new Error('Неизвестная ошибка');
    }
  }
);

const tokenPriceSlice = createSlice({
  name: 'tokenPrice',
  initialState,
  reducers: {
    setSelectedPair: (
      state,
      action: PayloadAction<{ token: string; currency: string }>
    ) => {
      state.selectedPair = action.payload;
    },
    setPrice: (state, action: PayloadAction<number | null>) => {
      state.price = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    setTokens: (state, action: PayloadAction<Token[]>) => {
      state.tokens = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTokenPrice.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTokenPrice.fulfilled, (state, action: PayloadAction<number>) => {
        state.loading = false;
        state.price = action.payload;
      })
      .addCase(fetchTokenPrice.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Произошла ошибка при загрузке цены';
      });
  },
});

export const { setSelectedPair, setPrice, setLoading, setError, setTokens } =
  tokenPriceSlice.actions;

export { popularTokens, popularCurrencies };
export default tokenPriceSlice.reducer;
