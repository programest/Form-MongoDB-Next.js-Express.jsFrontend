"use client";
import { useState } from "react";
import styles from "./register.module.css";
import Link from "next/link";
import { useRouter } from "next/navigation"; 
const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function Register() {
  const [form, setForm] = useState({ username: "", password: "", confirmPassword: "" });
  const [message, setMessage] = useState("");
  const router = useRouter();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    if (form.password !== form.confirmPassword) {
      setMessage("❌ Пароли не совпадают!");
      return;
    }

    try {
      const response = await fetch(`${API_URL}/users`, { 

        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Ошибка регистрации");
      setTimeout(() => router.push("/"), 1000); 
      setMessage("✅ Регистрация успешна!");
    } catch (error) {
      setMessage(error.message);
    }
  };


  return (
    <div className={styles.container}>
            <div className={styles.formWrapper}>

      <h2 className={styles.title}>Регистрация</h2>
      {message && <p className={styles.message}>{message}</p>}
      <form onSubmit={handleSubmit}>
        <input className={styles.input} type="text" name="username" placeholder="Логин" onChange={handleChange} required />
        <input className={styles.input} type="password" name="password" placeholder="Пароль" onChange={handleChange} required />
        <input className={styles.input} type="password" name="confirmPassword" placeholder="Подтвердите пароль" onChange={handleChange} required />

        <button className={styles.button} type="submit">Зарегистрироваться</button>
      </form>
      <p className={styles.toggle}>Уже есть аккаунт? <Link href="/">Войти</Link></p>
    </div>
    </div>
  );
}
