import { useEffect } from 'react';

import { useAppDispatch, useAppSelector } from '../store/hooks';
import { setTransactions, setLoading, setError } from '../store/slices/transactionSlice';
import type { RootState } from '../store/store';
import type { Transaction, TransactionState } from '../types/types';

const mockTransactions: Transaction[] = [
  {
    id: '1',
    date: '2024-03-20T10:30:00',
    type: 'buy',
    amount: 0.25,
    pair: 'BTC/USDT',
  },
  {
    id: '2',
    date: '2024-03-20T09:15:00',
    type: 'sell',
    amount: 1.5,
    pair: 'ETH/USDT',
  },
  {
    id: '3',
    date: '2024-03-19T15:45:00',
    type: 'buy',
    amount: 100,
    pair: 'SOL/USDT',
  },
];

const TransactionHistory = () => {
  const dispatch = useAppDispatch();
  const { items: transactions, loading, error } = useAppSelector(
    (state: RootState) => state.transactions
  ) as TransactionState;

  useEffect(() => {
    const loadTransactions = async () => {
      dispatch(setLoading(true));
      try {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        dispatch(setTransactions(mockTransactions));
      } catch (error) {
        dispatch(setError('Ошибка при загрузке транзакций'));
      } finally {
        dispatch(setLoading(false));
      }
    };

    loadTransactions();
  }, [dispatch]);

  if (loading) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">История транзакций</h2>
        <div className="animate-pulse space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-16 bg-gray-200 rounded"></div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">История транзакций</h2>
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">История транзакций</h2>
      {transactions.length === 0 ? (
        <p className="text-gray-500">Нет доступных транзакций</p>
      ) : (
        <div className="space-y-4">
          {transactions.map((transaction: Transaction) => (
            <div
              key={transaction.id}
              className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
            >
              <div className="flex-1">
                <div className="flex items-center space-x-2">
                  <span
                    className={`px-2 py-1 rounded text-sm font-medium ${
                      transaction.type === 'buy'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-red-100 text-red-800'
                    }`}
                  >
                    {transaction.type === 'buy' ? 'Покупка' : 'Продажа'}
                  </span>
                  <span className="text-gray-900 font-medium">{transaction.pair}</span>
                </div>
                <p className="text-sm text-gray-500 mt-1">
                  {new Date(transaction.date).toLocaleString('ru-RU')}
                </p>
              </div>
              <div className="text-right">
                <p className="text-lg font-semibold text-gray-900">
                  {transaction.amount} {transaction.pair.split('/')[0]}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TransactionHistory;
