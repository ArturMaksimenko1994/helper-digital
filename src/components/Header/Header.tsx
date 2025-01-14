import { Link, useNavigate } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';

import { clearUser } from '../../redux/slices/userSlice';
import { clearToken } from '../../redux/slices/authSlice';

import styles from "./Header.module.scss";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const token = useSelector((state: any) => state.auth.token);

  const handleLogout = () => {
    dispatch(clearToken());
    dispatch(clearUser());
    navigate("/");
  };

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
