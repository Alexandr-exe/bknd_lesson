const router = require('express').Router();
const path = require('path');
const fs = require('fs');

const usersPath = path.join(__dirname, '../data', 'users.json');

const usersReadFile = (filePath) => {
  const file = fs.createReadStream(filePath, { encoding: 'utf8' });
  return file;
};

router.get('/users', (req, res) => {
  const file = usersReadFile(usersPath);
  file.on('error', () => {
    res.set({ 'content-type': 'application/json; charset=utf-8' });
    res.status(500).send({ message: 'Что то пошло не так' });
  });
  res.set({ 'content-type': 'application/json; charset=utf-8' });
  file.pipe(res);
});

router.get('/users/:id', (req, res) => {
  const { id } = req.params;
  const users = usersReadFile(usersPath);
  users.on('error', () => {
    res.status(500).send({ message: 'Ошибка Сервера' });
  });
  users.on('data', (data) => {
    const usersList = JSON.parse(data);
    res.set({ 'content-type': 'application/json; charset=utf-8' });
    const user = usersList.find((person) => person._id === id);
    if (!user) {
      res.status(404).send({ message: 'Пользователь с таким id не найдён' });
      return;
    }
    res.send(user);
  });
});

module.exports = router;
