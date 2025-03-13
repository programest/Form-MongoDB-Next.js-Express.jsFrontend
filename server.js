const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const User = require("./src/app/models/users/user"); 
const PORT = 3001;

const app = express();
app.use(express.json());
app.use(cors());


mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})


// Регистрация
app.post("/users", async (req, res) => {
  try {
    const newUser = new User(req.body);
    await newUser.save();
    res.status(201).send({ message: "Регистрация успешна" });
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});



app.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    console.log("Полученные данные:", req.body); 
    const users = await User.find();
    console.log("Все пользователи:", users);
    const user = await User.findOne({ username });
    console.log("Найденный пользователь:", user); 

    if (!user || user.password !== password) {
      return res.status(401).json({ error: "Неверные учетные данные" });
    }

    res.json({ message: "✅ Вход успешен!" });
  } catch (error) {
    console.error("Ошибка на сервере:", error);
    res.status(500).json({ error: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`✅ Сервер запущен на http://localhost:${PORT}`);
});
module.exports = app;
