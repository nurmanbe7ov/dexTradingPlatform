import { useEffect } from 'react';

import { useAppDispatch, useAppSelector } from '../store/hooks';
import { fetchTokenPrice, fetchPopularTokens } from '../api/api';
import { setPrice, setLoading, setError, setTokens } from '../store/slices/tokenPriceSlice';

export const useTokenPrice = () => {
  const dispatch = useAppDispatch();
  const { selectedPair, tokens } = useAppSelector((state) => state.tokenPrice);

  useEffect(() => {
    const loadTokens = async () => {
      try {
        const fetchedTokens = await fetchPopularTokens();
        dispatch(setTokens(fetchedTokens));
      } catch (error) {
        dispatch(setError('Ошибка при загрузке списка токенов'));
      }
    };

    if (tokens.length === 0) {
      loadTokens();
    }
  }, [dispatch, tokens.length]);

  useEffect(() => {
    const fetchPrice = async () => {
      if (!selectedPair.token || !selectedPair.currency) return;

      dispatch(setLoading(true));
      try {
        const price = await fetchTokenPrice(selectedPair.token, selectedPair.currency);
        dispatch(setPrice(price));
        dispatch(setError(null));
      } catch (error) {
        dispatch(setError('Ошибка при получении цены'));
        dispatch(setPrice(null));
      } finally {
        dispatch(setLoading(false));
      }
    };

    fetchPrice();
    const interval = setInterval(fetchPrice, 5000);

    return () => clearInterval(interval);
  }, [dispatch, selectedPair.token, selectedPair.currency]);

  return {
    selectedPair,
    tokens,
  };
};
