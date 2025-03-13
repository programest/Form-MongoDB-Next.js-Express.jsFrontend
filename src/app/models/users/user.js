const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: { 
    type: String, 
    required: [true, "Имя пользователя обязательно"],
    unique: true,
    trim: true, 
    validate: {
      validator: function (value) {
        return value.trim().length > 0;
      },
      message: "Имя пользователя не должно быть пустым",
    },
  },
  password: {
    type: String,
    required: [true, "Пароль обязателен"],
    validate: {
      validator: function (value) {
        return /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/.test(value);
      },
      message: "Пароль должен содержать минимум 6 символов, включая буквы и цифры",
    },
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
