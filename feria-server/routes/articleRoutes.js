const express = require('express');
const {
  getArticles,
  upsertSeed,
  createArticle,
  updateArticle,
  patchArticle,
} = require('../controllers/articleController');

const router = express.Router();

router.get('/', getArticles);
router.post('/seed', upsertSeed);
router.post('/', createArticle);
router.put('/:id', updateArticle);
router.patch('/:id', patchArticle);

module.exports = router;

