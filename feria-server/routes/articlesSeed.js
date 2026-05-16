const articlesSeed = require('../seeds/articlesSeed');

const express = require('express');
const router = express.Router();

const Article = require('../models/Articles');

// If someone hits this file directly we still seed
router.post('/', async (req, res) => {
  try {
    const list = req.body?.articles ?? articlesSeed;

    for (const a of list) {
      const slug = String(a.slug ?? '').trim();
      if (!slug) continue;
      await Article.findOneAndUpdate(
        { slug },
        {
          $set: {
            slug,
            title: String(a.title ?? '').trim(),
            image: a.image ?? undefined,
            content: Array.isArray(a.content)
              ? a.content
              : typeof a.content === 'string'
                ? a.content.split(/\n\n|\n/).map((s) => s.trim()).filter(Boolean)
                : [],
            isFeatured: typeof a.isFeatured === 'boolean' ? a.isFeatured : false,
            isActive: typeof a.isActive === 'boolean' ? a.isActive : true,
          },
        },
        { upsert: true, new: true }
      );
    }

    res.json({ ok: true });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});

module.exports = router;

