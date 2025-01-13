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
      <div className="container">
        <div className={styles.header__row}>

          <Link to="/" className={styles.header__logo}>
            LOGO
          </Link>

          <div className={styles.header__list}>
            <Link to="/">Главная</Link>

            {token ? (
              <>
                <Link to="/profile">Профиль</Link>
                <button onClick={handleLogout}>Выйти</button>
              </>
            ) : (
              <Link to="/login">Войти</Link>
            )}
            
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
