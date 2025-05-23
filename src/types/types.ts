export interface Token {
  id: string;
  symbol: string;
  name: string;
}

export interface TokenPrice {
  id: string;
  price: number;
  currency: string;
}

export interface TokenPriceState {
  selectedPair: {
    token: string;
    currency: string;
  };
  price: number | null;
  loading: boolean;
  error: string | null;
  tokens: Token[];
  currencies: string[];
}

export interface ApiResponse {
  [key: string]: {
    [key: string]: number;
  };
}

export interface Transaction {
  id: string;
  date: string;
  type: 'buy' | 'sell';
  amount: number;
  pair: string;
}

export interface TransactionState {
  items: Transaction[];
  loading: boolean;
  error: string | null;
} 