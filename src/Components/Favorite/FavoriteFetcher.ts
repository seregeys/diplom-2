import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchMovieDetails } from "../Redux/Actions/Actions";

const CheckLocalStorage: React.FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    let user: Record<string, any>; // Явное указание типа
    try {
      user = JSON.parse(localStorage.getItem("user") || "{}");
    } catch (error) {
      console.error("Ошибка парсинга localStorage:", error);
      user = {};
    }

    // Получаем ключи, начинающиеся с 'tt'
    const movieKeys = Object.keys(user).filter((key) => key.startsWith("tt"));

    // Для каждого ключа вызываем действие, если значение true
    movieKeys.forEach((key) => {
      if (user[key] === true) {
        dispatch(fetchMovieDetails(key));
      }
    });
  }, [dispatch]);

  return null;
};

export default CheckLocalStorage;