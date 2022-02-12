const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// ------------------- The `/api/tags` endpoint -------------------

// Get all Tags
router.get('/', async (req, res) => {
  try {
    const tagData = await Tag.findAll({
      include: [{
        model: Product,
        through: ProductTag
      }]
    })
    res.status(200);
    res.json(tagData);
  }
  catch(err) {
    res.status(400);
    res.json(err);
  }
});

// get Tag from ID
router.get('/:id', async (req, res) => {
  try {
    const tagData = await Tag.findOne({
      where: {
        id: req.params.id
      },
      include: [{
        model: Product,
        through: ProductTag
      }]
    })
    res.status(200);
    res.json(tagData);
  }
  catch(err) {
    res.status(400);
    res.json(err);
  }
});

// Create a new Tag
router.post('/', async (req, res) => {
  try {
    const tagData = await Tag.create(req.body);
    res.status(200);
    res.json(tagData);
  }
  catch(err) {
    res.status(400);
    res.json(err);
  }
});

// Update existing Tag by ID
router.put('/:id', async (req, res) => {
  try {
    const tagData = await Tag.update(req.body, {
      where: {
        id:req.params.id
      }
    })
    res.status(200);
    res.json(tagData);
  }
  catch(err) {
    res.status(400);
    res.json(err);
  }
});

// Delete Tag by ID
router.delete('/:id', async (req, res) => {
  try {
    const tagData = await Tag.destroy({
      where: {
        id: req.params.id
      }
    })
    res.status(200);
    res.json(tagData);
  }
  catch(err) {
    res.status(400);
    res.json(tagData);
  }
});

module.exports = router;