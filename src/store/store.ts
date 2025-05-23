import { configureStore } from '@reduxjs/toolkit';

import tokenPriceReducer from './slices/tokenPriceSlice';
import transactionReducer from './slices/transactionSlice';
import type { TokenPriceState } from '../types/types';

export interface RootState {
  tokenPrice: TokenPriceState;
  transactions: {
    items: Array<{
      id: string;
      date: string;
      type: 'buy' | 'sell';
      amount: number;
      pair: string;
    }>;
    loading: boolean;
    error: string | null;
  };
}

export const store = configureStore({
  reducer: {
    tokenPrice: tokenPriceReducer,
    transactions: transactionReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type AppDispatch = typeof store.dispatch;
