import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

interface FormData {
  username: string;
  password: string;
}

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<FormData>({
    username: '',
    password: '',
  });
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const isAuthenticated = localStorage.getItem('isLoggedIn') === 'true';
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [navigate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (formData.username === 'admin' && formData.password === '1234') {
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('username', formData.username);
      navigate('/dashboard');
    } else {
      setError('Неверное имя пользователя или пароль');
    }
  };

  return (
    <div
      className="min-h-screen w-full bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4 sm:p-6 lg:p-8">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-xl p-6 sm:p-8 lg:p-12">
        <div className="text-center mb-8 sm:mb-12">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-3">
            Добро пожаловать
          </h1>
          <p className="text-base sm:text-lg lg:text-xl text-gray-600">
            Войдите в свой аккаунт
          </p>
        </div>

        <form className="space-y-6 sm:space-y-8" onSubmit={handleSubmit}>
          {error && (
            <div className="p-4 text-sm sm:text-base text-red-600 bg-red-50 rounded-lg border border-red-100">
              {error}
            </div>
          )}

          <div className="space-y-6">
            <div>
              <label
                htmlFor="username"
                className="text-sm flex items-start sm:text-base font-medium text-gray-700 mb-2"
              >
                Имя пользователя
              </label>
              <input
                id="username"
                name="username"
                type="text"
                required
                value={formData.username}
                onChange={handleChange}
                className="w-full px-4 py-3 text-base text-black border border-gray-300 rounded-lg
                         focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                         transition duration-200 ease-in-out
                         placeholder-gray-400"
                placeholder="Введите имя пользователя"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="flex items-start text-sm sm:text-base font-medium text-gray-700 mb-2"
              >
                Пароль
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                value={formData.password}
                onChange={handleChange}
                className="w-full px-4 py-3 text-base text-black border border-gray-300 rounded-lg
                         focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                         transition duration-200 ease-in-out
                         placeholder-gray-400"
                placeholder="Введите пароль"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full px-6 py-3 text-base sm:text-lg font-medium text-white bg-blue-600
                     rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2
                     focus:ring-blue-500 focus:ring-offset-2 transition duration-200
                     ease-in-out transform hover:scale-[1.02]"
          >
            Войти
          </button>
        </form>

        <div className="mt-8 text-center text-sm sm:text-base text-gray-500">
          <p>Тестовые данные для входа:</p>
          <p className="mt-1">Логин: admin</p>
          <p>Пароль: 1234</p>
        </div>
      </div>
    </div>
  );
};

export default Login;
