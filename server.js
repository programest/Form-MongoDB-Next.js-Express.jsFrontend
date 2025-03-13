const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv"); 
const User = require("./src/app/models/users/user"); 

dotenv.config(); // Загружаем переменные окружения

const PORT = process.env.PORT || 3001;

const app = express();
app.use(express.json());
app.use(cors());

// Подключение к MongoDB
mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log("✅ Подключено к MongoDB"))
  .catch((err) => console.error("Ошибка подключения к MongoDB:", err));

// 🔹 Регистрация пользователя
app.post("/users", async (req, res) => {
  try {
    const newUser = new User(req.body);
    await newUser.save();
    res.status(201).send({ message: "✅ Регистрация успешна!" });
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

// 🔹 Вход пользователя
app.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    console.log("Полученные данные:", req.body);

    const user = await User.findOne({ username });
    console.log("Найденный пользователь:", user);

    if (!user || user.password !== password) {
      return res.status(401).json({ error: "❌ Неверные учетные данные" });
    }

    res.json({ message: "✅ Вход успешен!" });
  } catch (error) {
    console.error("Ошибка на сервере:", error);
    res.status(500).json({ error: error.message });
  }
});

// Запуск сервера
app.listen(PORT, () => {
  console.log(`✅ Сервер запущен на http://localhost:${PORT}`);
});

module.exports = app;
