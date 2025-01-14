import { Link } from 'react-router'; // Используйте 'react-router-dom' вместо 'react-router'
import { useState, useEffect } from 'react';
import styles from "./Header.module.scss";

const Header = () => {

  const [token, setToken] = useState(localStorage.getItem("authToken"));

  const deleteToken = () => {
    localStorage.removeItem("authToken");
    setToken(null);
  };

  useEffect(() => {
    const tokenFromStorage = localStorage.getItem("authToken");
    setToken(tokenFromStorage);
  }, []);

  return (
    <header className={styles.header}>
      <Link to="/">Главная</Link>
      <Link to="/profile">Профиль</Link>
      {!token ? (
        <Link to="/login">Войти</Link>
      ) : (
        <Link to="/" onClick={deleteToken}>Выйти</Link>
      )}
    </header>
  );
};

export default Header;
