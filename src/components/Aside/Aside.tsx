import { Link, useNavigate } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';

import { clearUser } from '../../redux/slices/userSlice';
import { clearToken } from '../../redux/slices/authSlice';

import styles from "./Aside.module.scss";

const Aside = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const token = useSelector((state: any) => state.auth.token);

  const handleLogout = () => {
    dispatch(clearToken());
    dispatch(clearUser());
    navigate("/");
  };

  return (
    <>
      <aside className={styles.aside}>
        <Link to="/" className={styles.aside__logo}>
          LOGO
        </Link>

        <div className={styles.aside__list}>

          {token ? (
            <>
              <Link to="/">Главная</Link>
              <Link to="/domains">Домены</Link>
              <Link to="/services">Сервисы</Link>
              <Link to="/profile">Профиль</Link>
              <button className={styles.aside__close} onClick={handleLogout}>Выйти</button>
            </>
          ) : (
            <>
              <Link to="/login">Войти</Link>
            </>
          )}

        </div>
      </aside>


    </>
  );
};

export default Aside;
