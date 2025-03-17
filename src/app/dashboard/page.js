

"use client";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import styles from "./main.module.css";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function Dashboard() {
  const { user, logout } = useAuth();
  const router = useRouter();
  const [users, setUsers] = useState([]); // Список пользователей
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      router.push("/");
      return;
    }

    const fetchUsers = async () => {
      try {
        const response = await fetch(`${API_URL}/users`);
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error("Ошибка загрузки пользователей", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [user, router]);

  if (!user) return null; // Предотвращаем рендер при редиректе

  return (
    
    <div className={styles.container}>
    <h2 className={styles.title}>Добро пожаловать, {user.username}!</h2>
    <h3>Список всех пользователей:</h3>
      {loading ? (
        <p>Загрузка...</p>
      ) : (
        <ul>
          {users.map((u) => (
            <li key={u._id}>{u.username} - {u.email}</li>
          ))}
        </ul>
      )}
    <div className={styles.buttonGroup}>
      <button className={styles.button} onClick={logout}>Выйти</button>
     
    </div>
  </div>
    
  );
}
