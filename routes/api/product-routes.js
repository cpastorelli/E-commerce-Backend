const router = require('express').Router();
const { Product, Category, Tag, ProductTag } = require('../../models');

// ------------------- The `/api/products` endpoint -------------------

// get all products
router.get('/', async (req, res) => {
  try {
    const productData = await Product.findAll({
      include: [
        Category,
        {
          model: Tag, 
          through: ProductTag
        }
      ]
    })
    res.status(200);
    res.json(productData);
  }
  catch(err) {
    res.status(400);
    res.json(err);
  }
});

// get one product by ID
router.get('/:id', async (req, res) => {
  try { 
    const productData = await Product.findOne({
      where: {
        id: req.params.id
      },
      include: [
        Category,
        {
          model: Tag,
          through: ProductTag
        }
      ]
    })
    res.status(200);
    res.json(productData);
  }
  catch(err) {
    res.status(400);
    res.json(err);
  }
});

// create new product
router.post('/', async (req, res) => {
  /* req.body should look like this...
    {
      product_name: "Basketball",
      price: 200.00,
      stock: 3,
      tagIds: [1, 2, 3, 4]
    }
  */
    try {
      const productData = await Product.create(req.body);
      if(req.body.tagIds.length && req.body.tagIds) {
        const productTagIds = req.body.tagIds.map((tag_id) => {
          return {
            product_id: product_id,
            tag_id
          };
        });
        return ProductTag.bulkCreate(productTagIds);
      }
      res.status(200);
      res.json(productData);

      // need to add another area for the 2nd then statement
      //  .then((productTagIds) => res.status(200).json(productTagIds))
    }
    catch(err) {
      res.status(400);
      res.json(err);
    }
});

// update product by ID
router.put('/:id',(req, res) => {
  // try {
  //   const productData = await Product.update(req.body, {
  //     where: {
  //       id: req.params.id
  //     }
  //   })
  //   // fill this in an if statement?
  //   return ProductTag.findAll({
  //     where: {
  //       product_id: req.params.id
  //     }
  //   })

  //   const productTagsIds = productTags.map(({tag_id}) => tag_id);
  //   const newProductTag = req.body.tagIds
  //   .filter((tag_id) => !productTagIds.include(tag_id))
  //   .map((tag_id) => {
  //     return {
  //       product_id: req.params.id,
  //       tag_id
  //     };
  //   })
  // }
  // catch(err) {
  //   res.status(400);
  //   res.json(err);
  // }
  Product.update(req.body, {
    where: {
      id: req.params.id,
    },
  })
    .then((product) => {
      // find all associated tags from ProductTag
      if (req.body.tagIds && req.body.tagIds.length) {
        const productTags = ProductTag.findAll({ 
          where: { 
            product_id: req.params.id 
          } 
        });
        const productTagIds = productTags.map(({tag_id}) => tag_id);
        const newProductTag = req.body.tagIds
        .filter((tag_id) => !productTagIds.includes(tag_id))
        .map((tag_id) => {
          return {
            product_id: product_id,
            tag_id
          }
        })
        const productTagRemove = productTags
        .filter(({tag_id}) => !req.body.tagIds.include(tag_id))
        .map(({id}) => id);

        return Promise.all([
          ProductTag.destroy({ 
            where:{
              id: productTagRemove
            }
          }),
          ProductTag.bulkCreate(newProductTag)
        ])
      }
      return res.json(product);
    })
    .catch((err) => {
      // console.log(err);
      res.status(400);
      res.json(err);
    });
});

// Delete Product by ID
router.delete('/:id', async (req, res) => {
  try {
    const productData = await Product.destroy({
      where: {
        id: req.params.id
      }
    })
    res.status(200);
    res.json(productData);
  }
  catch(err) {
    res.status(400);
    res.json(err);
  }
});

module.exports = router;