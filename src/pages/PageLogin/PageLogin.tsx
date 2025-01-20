import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router";
import { setToken } from "../../redux/slices/authSlice";
import { getToken } from "../../api/api";

import styles from "./PageLogin.module.scss";
import Input from "../../ui/Input/Input";
import Button from "../../ui/Button/Button";

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      const token = await getToken(identifier, password);
      dispatch(setToken(token));
      navigate("/profile");
    } catch (err: any) {
      setError(err.message || "Произошла ошибка");
    }
  };

  const token = useSelector((state: any) => state.auth.token);

  if (token) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className={styles.aut}>

      <div className={styles.aut__title}>
        <h1 className="h3">Добро пожаловать!</h1>
        <p className="text">Пожалуйста, введите свои данные</p>
      </div>

      <form onSubmit={handleLogin} className={styles.form}>
        <div className={styles.form__row}>
          <Input
            type="text"
            label="Имя пользователя или email"
            placeholder="Адрес электронной почты"
            value={identifier}
            onChange={(e) => setIdentifier(e.target.value)}
          />
          <Input
            type="Password"
            label="Password"
            placeholder="Ваш пароль"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <Button
          type="primary"
          size="md"
          htmlElement="button"
          buttonType="submit"
          allowFullScreen="full-width"
        >
          Войти
        </Button>
      </form>
      {error && <p className={styles.error}>{error}</p>}
    </div>
  );
};

export default LoginPage;
