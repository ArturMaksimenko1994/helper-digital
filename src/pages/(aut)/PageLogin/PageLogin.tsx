import { useState } from "react";
import { useNavigate } from "react-router";
import styles from "./../aut.module.scss";
import { BASE_URL } from "../../../api/api-config";

const LoginPage = () => {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    setError(null); // Сбрасываем ошибку перед новым запросом

    try {
      const response = await fetch(`${BASE_URL}/wp-json/jwt-auth/v1/token`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: identifier,
          password: password,
        }),
      });

      const data = await response.json();

      if (response.ok && data.token) {
        localStorage.setItem("authToken", data.token);
        navigate("/");
      } else {
        setError(data.message || "Ошибка входа. Пожалуйста, проверьте свои данные.");
      }
    } catch (error) {
      setError("Ошибка сети. Попробуйте снова позже.");
    }
  };

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
