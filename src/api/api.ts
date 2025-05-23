import axios from 'axios';

import type { Token, ApiResponse } from '../types/types';

const BASE_URL = 'https://api.coingecko.com/api/v3';

export const fetchTokenPrice = async (tokenId: string, currency: string): Promise<number> => {
  try {
    const response = await axios.get<ApiResponse>(
      `${BASE_URL}/simple/price?ids=${tokenId}&vs_currencies=${currency}`
    );
    return response.data[tokenId][currency];
  } catch (error) {
    throw new Error('Ошибка при получении цены токена');
  }
};

export const fetchPopularTokens = async (): Promise<Token[]> => {
  try {
    const response = await axios.get<Token[]>(
      `${BASE_URL}/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false`
    );
    return response.data;
  } catch (error) {
    throw new Error('Ошибка при получении списка токенов');
  }
};

export const AVAILABLE_CURRENCIES = ['usd', 'eur', 'gbp', 'jpy', 'cny'];
