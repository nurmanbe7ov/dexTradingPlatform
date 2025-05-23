import { useAppDispatch, useAppSelector } from '../store/hooks';
import { useTokenPrice } from '../hooks/useTokenPrice';
import { AVAILABLE_CURRENCIES } from '../api/api';
import { setSelectedPair } from '../store/slices/tokenPriceSlice';
import type { Token } from '../types/types';
import type { RootState } from '../store/store';

const formatTokenName = (name: string): string => {
  return name.charAt(0).toUpperCase() + name.slice(1);
};

const TokenPriceDisplay = () => {
  const dispatch = useAppDispatch();
  const { selectedPair, tokens } = useTokenPrice();
  const { price, loading, error } = useAppSelector((state: RootState) => state.tokenPrice);

  const handleTokenChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(setSelectedPair({ ...selectedPair, token: e.target.value }));
  };

  const handleCurrencyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(setSelectedPair({ ...selectedPair, currency: e.target.value }));
  };

  const selectedToken = tokens.find((token: Token) => token.id === selectedPair.token);
  const title = selectedToken
    ? `Текущая цена ${formatTokenName(selectedToken.name)} (${selectedPair.currency.toUpperCase()})`
    : 'Выберите токен';

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-4">
        <select
          value={selectedPair.token}
          onChange={handleTokenChange}
          className="flex-1 rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Выберите токен</option>
          {tokens.map((token: Token) => (
            <option key={token.id} value={token.id}>
              {formatTokenName(token.name)}
            </option>
          ))}
        </select>

        <select
          value={selectedPair.currency}
          onChange={handleCurrencyChange}
          className="flex-1 rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {AVAILABLE_CURRENCIES.map((currency) => (
            <option key={currency} value={currency}>
              {currency.toUpperCase()}
            </option>
          ))}
        </select>
      </div>

      <div className="bg-gray-50 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
        {loading ? (
          <div className="animate-pulse h-8 bg-gray-200 rounded"></div>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : price ? (
          <p className="text-2xl font-bold text-gray-900">
            {price.toLocaleString('ru-RU', {
              style: 'currency',
              currency: selectedPair.currency.toUpperCase(),
            })}
          </p>
        ) : (
          <p className="text-gray-500">Выберите токен для отображения цены</p>
        )}
      </div>
    </div>
  );
};

export default TokenPriceDisplay;
