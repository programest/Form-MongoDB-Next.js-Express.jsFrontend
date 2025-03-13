"use client";
import styles from "./main.module.css";

export default function Dashboard() {
  const handleBack = () => {
    window.history.back();
  };

  
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Главная страница</h2>
      <div className={styles.buttonGroup}>
        <button className={styles.button} onClick={handleBack}>Назад</button>
       
      </div>
    </div>
  );
}