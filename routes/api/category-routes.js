const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

// Get all Categories
router.get('/', (req, res) => {
  Category.findAll({
    include: [Product]
  }).then((categoryData) => {
    res.status(200);
    res.json(categoryData);
  }).catch((err) => {
    res.status(500);
    res.json(err);
  });
});

// Get Category by ID
router.get('/:id', (req, res) => {
  // Do I change this to findOne?
  Category.findByPk({
    where:{
      id: req.params.id
    }
    }).then((categoryData) => {
    res.json(categoryData);
  }).catch((err) => {
    res.status(400);
    res.json(err)
  });
});

// Create a new Category
router.post('/', (req, res) => {
  // create a new category
});

// Update Category by ID
router.put('/:id', (req, res) => {
  // update a category by its `id` value
});

// Delete Category by ID
router.delete('/:id', (req, res) => {
  Category.destroy({
    where: {
      id: req.params.id
    }
  }).then((deletedCategory) => {
    res.status(200);
    res.json(deletedCategory);
  })
  .catch((err) => {
    res.status(400);
    res.json(err);
  });
});

module.exports = router;