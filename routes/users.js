const router = require('express').Router();
const path = require('path');
const fs = require('fs');
const users = require('../data/users.json');

router.get('/users', (req, res) => {
  const usersPath = path.join(__dirname, '../data', 'users.json');
  res.set({ 'content-type': 'application/json; charset=utf-8' });
  fs.createReadStream(usersPath, 'utf-8').pipe(res);
});

router.get('/users/:id', (req, res) => {
  const { id } = req.params;
  const usersList = [...users];
  const user = usersList.find((person) => person._id === id);
  if (!user) {
    res.status(404).send({ message: 'Нет пользователя с таким id' });
    return;
  }
  res.send(user);
});

module.exports = router;
