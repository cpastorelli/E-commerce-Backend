const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

// Get all Tags
router.get('/', (req, res) => {
  Tag.findAll({
    include: [{
        model: Product,
        through: ProductTag
      }]
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
  // Do I change this to findOne?
  Tag.findOne({
    where: {
      id: req.params.id
    },
    include: [{
        model: Product,
        through: ProductTag
      }]
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
  Tag.create(req.body)
  .then((tagData) => {
    res.status(200);
    res.json(tagData);
  })
  .catch((err) => {
    res.status(400);
    res.json(err);
  })
});

// Update existing Tag by ID
router.put('/:id', (req, res) => {
  Tag.update(req.body, {
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