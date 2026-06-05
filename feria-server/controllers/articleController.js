const Article = require('../models/Article');


const getArticles = async (req, res) => {
  try {
    const totalCount = await Article.countDocuments();

    if (totalCount === 0) {
      try {
        const seedData = require('../seeds/articlesSeed');
        const formatted = seedData.map(a => ({
          name: a.name || a.slug,
          title: a.title,
          imageUrl: a.imageUrl || a.image || "",
          content: a.content,
          isHidden: a.isHidden || false
        }));

        await Promise.all(
          formatted.map(article =>
            Article.findOneAndUpdate(
              { name: article.name },
              article,
              { upsert: true, new: true }
            )
          )
        );
      } catch (seedErr) {
        console.error("Failed to auto-seed articles:", seedErr);
      }
    }

    const showHidden = req.user && req.query.admin === 'true';
    const query = showHidden ? {} : { isHidden: { $ne: true } };
    const articles = await Article.find(query).sort({ createdAt: -1 });

    res.status(200).json({ success: true, count: articles.length, data: articles });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};


const createArticle = async (req, res) => {
  try {
    const { title, name, imageUrl, content, isHidden } = req.body;

    const contentArray = typeof content === 'string' 
      ? content.split('\n').filter(paragraph => paragraph.trim() !== "") 
      : content;

    const article = await Article.create({
      title,
      name,
      imageUrl: imageUrl || "",
      content: contentArray,
      isHidden: isHidden === true || isHidden === "true"
    });

    res.status(201).json({ success: true, data: article });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ success: false, message: "Article 'name' (slug) must be unique." });
    }
    res.status(400).json({ success: false, message: error.message });
  }
};


const updateArticle = async (req, res) => {
  try {
    const updateData = { ...req.body };

    if (updateData.content && typeof updateData.content === 'string') {
      updateData.content = updateData.content.split('\n').filter(p => p.trim() !== "");
    }

    if (updateData.isHidden !== undefined) {
      updateData.isHidden = updateData.isHidden === true || updateData.isHidden === "true";
    }

    const article = await Article.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
      runValidators: true,
    });

    if (!article) return res.status(404).json({ success: false, message: 'Article not found' });
    res.status(200).json({ success: true, data: article });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};


const deleteArticle = async (req, res) => {
  try {
    const article = await Article.findByIdAndDelete(req.params.id);
    if (!article) return res.status(404).json({ success: false, message: 'Article not found' });
    res.status(200).json({ success: true, message: 'Article deleted' });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

module.exports = {
  getArticles,
  createArticle,
  updateArticle,
  deleteArticle,
};