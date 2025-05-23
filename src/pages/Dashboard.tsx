import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import TokenPriceDisplay from '../components/TokenPriceDisplay';
import TransactionHistory from '../components/TransactionHistory';
import ConfirmModal from '../components/ConfirmModal';

const Dashboard = () => {
  const navigate = useNavigate();
  const username = localStorage.getItem('username');
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (!isLoggedIn) {
      navigate('/login');
    }
  }, [navigate]);

  const handleLogoutClick = () => {
    setIsLogoutModalOpen(true);
  };

  const handleLogoutConfirm = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('username');
    navigate('/login', { replace: true });
  };

  const handleLogoutCancel = () => {
    setIsLogoutModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <nav className="bg-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-bold text-gray-900">DEX Trading Platform</h1>
            </div>
            <div className="flex items-center">
              <span className="text-base sm:text-lg text-gray-700">
                Добро пожаловать, {username}
              </span>
              <button
                onClick={handleLogoutClick}
                className="ml-4 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Выйти
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-6">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <TokenPriceDisplay />
          </div>
          <TransactionHistory />
        </div>
      </main>

      <ConfirmModal
        isOpen={isLogoutModalOpen}
        onClose={handleLogoutCancel}
        onConfirm={handleLogoutConfirm}
        title="Подтверждение выхода"
        message="Вы уверены, что хотите выйти из системы? Все несохраненные данные будут потеряны."
        confirmText="Да, выйти"
        cancelText="Отмена"
      />
    </div>
  );
};

export default Dashboard;
