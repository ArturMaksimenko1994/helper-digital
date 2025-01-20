import { BASE_URL } from "./api-config";

// Функция для получения токена
export const getToken = async (username: string, password: string) => {
  const response = await fetch(`${BASE_URL}/wp-json/jwt-auth/v1/token`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ username, password }),
  });

  const data = await response.json();

  if (!response.ok || !data.token) {
    throw new Error(data.message || "Ошибка авторизации");
  }

  return data.token; // Возвращаем токен
};

// Функция для получения данных пользователя
export const getUserData = async (token: string) => {
  const response = await fetch(`${BASE_URL}/wp-json/wp/v2/users/me`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const errorResponse = await response.json();
    throw new Error(errorResponse.message || "Ошибка получения данных пользователя");
  }

  const data = await response.json();

  return data;
};

// Функция для получения данных Домена
export const getAllDomainsData = async (token: string) => {
  const response = await fetch(`${BASE_URL}/wp-json/wp/v2/domain`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const errorResponse = await response.json();
    throw new Error(errorResponse.message || "Ошибка получения данных пользователя");
  }

  const data = await response.json();

  return data;
};

