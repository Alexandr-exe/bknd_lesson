const router = require('express').Router();
const path = require('path');
const fs = require('fs');

const cardsPath = path.join(__dirname, '../data', 'cards.json');

router.get('/cards', (req, res) => {
  res.set({ 'content-type': 'application/json; charset=utf-8' });
  fs.createReadStream(cardsPath).pipe(res);
});

module.exports = router;
