const router = require('express').Router();
const { Category, Product } = require('../../models');

// ------------------- The `/api/categories` endpoint -------------------

// Get all Categories
router.get('/', async (req, res) => {
  try {
    const categoryData = await Category.findAll({
      include: [Product]
    })
    res.status(200);
    res.json(categoryData);
  }
  catch(err) {
    res.status(400);
    res.json(err);
  }
});

// Get Category by ID
router.get('/:id', async (req, res) => {
  try {
    const categoryData = await Category.findOne({
      where: {
        id: req.params.id
      }
    })
    res.status(200);
    res.json(categoryData);
  }
  catch(err) {
    res.status(400);
    res.json(err);
  }
});

// Create a new Category
router.post('/', async (req, res) => {
  try {
    const categoryData = await Category.create(req.body);
    res.status(200);
    res.json(categoryData);
  }
  catch(err) {
    res.status(400);
    res.json(err);
  }
});

// Update Category by ID
router.put('/:id', async (req, res) => {
  try {
    const categoryData = await Category.update(req.body, {
      where: {
        id: req.params.id
      }
    })
    res.status(200);
    res.json(categoryData);
  }
  catch(err) {
    res.status(400);
    res.json(err);
  }
});

// Delete Category by ID
router.delete('/:id', async (req, res) => {
  try {
    const categoryData= await Category.destroy({
      where: {
        id: req.params.id
      }
    })
    res.status(200);
    res.json(categoryData);
  }
  catch(err) {
    res.status(400);
    res.json(err);
  }
});

module.exports = router;