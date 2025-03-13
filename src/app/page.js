"use client";
import { useState } from "react";
import styles from "./page.module.css";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Login() {
  const [form, setForm] = useState({ username: "", password: "" });
  const [message, setMessage] = useState("");
  const router = useRouter(); 

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
  
    try {
      const response = await fetch("http://localhost:3001/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
  
      const text = await response.text(); 
  
      try {
        const data = JSON.parse(text); 
        if (!response.ok) throw new Error(data.error || "Ошибка входа");
  
        setMessage("✅ Вход успешен!");
        setTimeout(() => router.push("/dashboard"), 1000);
      } catch {
        throw new Error("Логин или пароль неверный");
      }
  
    } catch (error) {
      setMessage(error.message);
    }
  };
  

  return (
    <div className={styles.container}>
            <div className={styles.formWrapper}>

      <h2 className={styles.title}>Вход</h2>
      {message && <p className={styles.message}>{message}</p>}
      <form onSubmit={handleSubmit}>
        <input className={styles.input} type="text" name="username" placeholder="Логин" onChange={handleChange} required />
        <input className={styles.input} type="password" name="password" placeholder="Пароль" onChange={handleChange} required />
        <button className={styles.button} type="submit">Войти</button>
      </form>
      <p className={styles.toggle}>Нет аккаунта? <Link href="/register">Зарегистрироваться</Link></p>
    </div>
    </div>
  );
}
