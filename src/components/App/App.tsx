import { Routes, Route } from 'react-router';
import { useEffect } from "react";
import { getUserData } from "../../api/api";

import routes from './../../pages/routes';
import Header from "../Header/Header";
import Footer from "../Footer/Footer";

import styles from "./App.module.scss";
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from '../../redux/slices/userSlice';

function App() {
  const dispatch = useDispatch();
  const token = useSelector((state: any) => state.auth.token);

  useEffect(() => {
    console.log("запрос 1");
    
    if (!token) {
      console.warn("Токен отсутствует, пользователь не авторизован");
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
            avatarUrl: userData.avatar_urls?.["96"],
          })
        );
      } catch (error:any) {
        console.error("Ошибка при получении данных пользователя:", error.message);
      }
    };

    fetchUserData();
  }, [dispatch, token]);

  return (
    <div className={styles.app}>
      <Header />
      <main className={styles.main}>

        <Routes>
          {routes.map(({ path, element }) => (
            <Route key={path} path={path} element={element} />
          ))}
        </Routes>

      </main>
      <Footer />
    </div>
  );
}

export default App;
