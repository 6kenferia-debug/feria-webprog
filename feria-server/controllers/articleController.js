const Article = require('../models/Articles');

// GET /api/articles
const getArticles = async (req, res) => {
  try {
    const articles = await Article.find({}).sort({ createdAt: -1 });
    res.json({ articles });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// POST /api/articles/seed
// Upserts articles by slug (so dashboard toggles persist)
const upsertSeed = async (req, res) => {
  try {
    const { articles } = req.body || {};
    if (!Array.isArray(articles)) {
      return res.status(400).json({ message: 'articles must be an array' });
    }

    const results = [];

    for (const a of articles) {
      const slug = String(a.slug ?? '').trim();
      const title = String(a.title ?? '').trim();
      if (!slug || !title) continue;

      const payload = {
        slug,
        title,
        image: a.image ?? undefined,
        content: Array.isArray(a.content)
          ? a.content
          : typeof a.content === 'string'
            ? a.content.split(/\n\n|\n/).map((s) => s.trim()).filter(Boolean)
            : [],
        isFeatured: typeof a.isFeatured === 'boolean' ? a.isFeatured : false,
        isActive: typeof a.isActive === 'boolean' ? a.isActive : true,
      };

      const doc = await Article.findOneAndUpdate(
        { slug },
        { $set: payload },
        { upsert: true, new: true, runValidators: true }
      );
      results.push(doc);
    }

    res.json({ articles: results });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// POST /api/articles
const createArticle = async (req, res) => {
  try {
    const payload = req.body || {};
    if (!payload.slug || !payload.title) {
      return res.status(400).json({ message: 'slug and title are required' });
    }

    const doc = await Article.create({
      slug: String(payload.slug).trim(),
      title: String(payload.title).trim(),
      image: payload.image ?? undefined,
      content: Array.isArray(payload.content)
        ? payload.content
        : typeof payload.content === 'string'
          ? payload.content.split(/\n\n|\n/).map((s) => s.trim()).filter(Boolean)
          : [],
      isFeatured: typeof payload.isFeatured === 'boolean' ? payload.isFeatured : false,
      isActive: typeof payload.isActive === 'boolean' ? payload.isActive : true,
    });

    res.status(201).json({ article: doc });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// PUT /api/articles/:id
const updateArticle = async (req, res) => {
  try {
    const payload = req.body || {};
    const doc = await Article.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          slug: payload.slug != null ? String(payload.slug).trim() : undefined,
          title: payload.title != null ? String(payload.title).trim() : undefined,
          image: payload.image,
          content:
            payload.content != null
              ? Array.isArray(payload.content)
                ? payload.content
                : typeof payload.content === 'string'
                  ? payload.content.split(/\n\n|\n/).map((s) => s.trim()).filter(Boolean)
                  : []
              : undefined,
          isFeatured: typeof payload.isFeatured === 'boolean' ? payload.isFeatured : undefined,
          isActive: typeof payload.isActive === 'boolean' ? payload.isActive : undefined,
        },
      },
      { new: true, runValidators: true }
    );

    if (!doc) return res.status(404).json({ message: 'Article not found' });
    res.json({ article: doc });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// PATCH /api/articles/:id
const patchArticle = async (req, res) => {
  try {
    const payload = req.body || {};
    const doc = await Article.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          ...payload,
          content:
            payload.content != null
              ? Array.isArray(payload.content)
                ? payload.content
                : typeof payload.content === 'string'
                  ? payload.content.split(/\n\n|\n/).map((s) => s.trim()).filter(Boolean)
                  : []
              : undefined,
        },
      },
      { new: true, runValidators: true }
    );

    if (!doc) return res.status(404).json({ message: 'Article not found' });
    res.json({ article: doc });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

module.exports = {
  getArticles,
  upsertSeed: upsertSeed,
  createArticle,

  updateArticle,
  patchArticle,
};

