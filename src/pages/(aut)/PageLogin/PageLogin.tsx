import { useState } from "react";
import { useDispatch } from "react-redux";
import { Navigate, useNavigate } from "react-router";
import { setToken } from "../../../redux/slices/authSlice";
import { getToken } from "../../../api/api";

import styles from "./../aut.module.scss";

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

  const token = localStorage.getItem("authToken");

  if (token) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className={styles.aut}>
      <form onSubmit={handleLogin} className={styles.loginForm}>
        <h2>Авторизация</h2>
        {error && <p className={styles.error}>{error}</p>}
        <div>
          <label>Имя или Email</label>
          <input
            type="text"
            value={identifier}
            onChange={(e) => setIdentifier(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Пароль</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Войти</button>
      </form>
    </div>
  );
};

export default LoginPage;