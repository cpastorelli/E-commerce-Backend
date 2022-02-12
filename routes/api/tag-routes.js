const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

// Get all Tags
router.get('/', (req, res) => {
  // be sure to include its associated Product data
  Tag.findAll({
    // include: [Product]
  })
  .then((tagData) => {
    res.status(200);
      res.json(tagData);
  })
  .catch((err) => {
      res.status(500);
      res.json(err);
  });

});

// get Tag from ID
router.get('/:id', (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  // Do I change this to findOne?
  Tag.findByPk({
    where: {
      id: req.params.id
    }
  })
  .then((tagData) => {
    res.status(200);
    res.json(tagData);
  })
  .catch((err) => {
    res.status(400);
    res.json(err);
  })
});

// Create a new Tag
router.post('/', (req, res) => {
  // create a new tag
});

// Update existing Tag by ID
router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
});

// Delete Tag by ID
router.delete('/:id', (req, res) => {
  Tag.destroy({
    where: {
      id: req.params.id
    }
  })
  .then((deletedTag) => {
    res.status(200);
    res.json(deletedTag);
  })
  .catch((err) => {
    res.status(400);
    res.json(err);
  });
});

module.exports = router;