import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { setUser } from '../../redux/slices/userSlice';
import { getUserData } from '../../api/api';
import { Route, Routes } from 'react-router';

import AppLayout from './../Layouts/AppLayout';
import AuthLayout from './../Layouts/AuthLayout';

import routes from '../../pages/routes';
import PageLogin from './../../pages/PageLogin/PageLogin';

function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = useSelector((state: any) => state.auth.token);

  useEffect(() => {
    if (!token) {
      navigate('/login'); // Перенаправляем на страницу логина, если токена нет
      return;
    }

    // Функция для получения данных пользователя
    const fetchUserData = async () => {
      try {
        const userData = await getUserData(token);
        dispatch(
          setUser({
            id: userData.id,
            username: userData.username,
            name: userData.name,
            email: userData.email,
            description: userData.description,
            nickname: userData.nickname,
            registeredDate: userData.registered_date,
            avatarUrl: userData.avatar_urls?.['96'],
          })
        );
      } catch (error: any) {
        console.error('Ошибка при получении данных пользователя:', error.message);
        navigate('/login');
      }
    };

    fetchUserData();
  }, [dispatch, token, navigate]);

  return (
    <Routes>
      <Route path="/" element={<AppLayout />}>
        {routes.map(({ path, element }) => (
          <Route key={path} path={path} element={element} />
        ))}
      </Route>

      <Route path="/login" element={<AuthLayout />}>
        <Route path="/login" element={<PageLogin />} />
      </Route>
    </Routes>
  );
}

export default App;
