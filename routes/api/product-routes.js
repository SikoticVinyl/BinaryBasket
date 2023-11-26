const router = require('express').Router();
const { Product, Category, Tag, ProductTag } = require('../../models');

// The `/api/products` endpoint

// get all products
router.get('/', async (req, res) => {
  try {
    //Fina all Products and include associated Category and Tag data.
    const products = await Product.findAll({
      include: [{model: Category }, {model: Tag}],
    });
    res.json(products);
  } catch (err) {
    res.status(500).json(err);
  }
});

// get one product
router.get('/:id', async (req, res) => {
  try {
    // Find one product by its `id` value and include associated Category and Tag Data
    const product = await Product.findByPk(req.params.id, {
      include: [{ model: Category }, {model: Tag}],
    });
    if (!product) {
      res.status(404).json({ message: 'Product not found' });
      return;
    }
    res.json(product);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Create a new product
router.post('/', async (req, res) => {
  try {
    // Create a new product using the request body
    const newProduct = await Product.create(req.body);

    // Check if tagIds exist in the request body
    if (req.body.tagIds && req.body.tagIds.length) {
      // Map tagIds to create associations in ProductTag model
      const productTagIdArr = req.body.tagIds.map((tag_id) => ({
        product_id: newProduct.id,
        tag_id,
      }));

      // Create associations in the ProductTag model for the newly created product
      await ProductTag.bulkCreate(productTagIdArr);
    }

    // Respond with the newly created product
    res.status(201).json(newProduct);
  } catch (err) {
    // Log and respond with a 400 status for any errors during product creation
    console.error(err);
    res.status(400).json(err);
  }
});

// Update product
router.put('/:id', async (req, res) => {
  try {
    // Update product data based on the provided ID
    const updatedProduct = await Product.update(req.body, {
      where: { id: req.params.id },
    });

    // Check if tagIds exist in the request body for tag associations
    if (req.body.tagIds && req.body.tagIds.length) {
      // Fetch existing product tags associated with the given product ID
      const productTags = await ProductTag.findAll({
        where: { product_id: req.params.id },
      });

      // Extract existing tag IDs associated with the product
      const existingTagIds = productTags.map(({ tag_id }) => tag_id);

      // Filter out new tag IDs to associate with the product
      const newTagIds = req.body.tagIds.filter((tag_id) => !existingTagIds.includes(tag_id));

      // Filter out tag IDs to remove associations from the product
      const tagsToRemove = productTags
        .filter(({ tag_id }) => !req.body.tagIds.includes(tag_id))
        .map(({ id }) => id);

      // Perform actions to add new associations and remove old ones
      await Promise.all([
        ProductTag.destroy({ where: { id: tagsToRemove } }), // Remove associations
        ProductTag.bulkCreate(newTagIds.map((tag_id) => ({
          product_id: req.params.id,
          tag_id,
        }))), // Add new associations
      ]);
    }

    // Respond with the updated product information
    res.json(updatedProduct);
  } catch (err) {
    // Log and respond with a 400 status for any errors during product update
    console.error(err);
    res.status(400).json(err);
  }
});

// Delete product by its ID
router.delete('/:id', async (req, res) => {
  try {
    // Delete a product by its ID
    const deletedProduct = await Product.destroy({
      where: { id: req.params.id },
    });

    // Check if the product was found and deleted successfully
    if (!deletedProduct) {
      // Respond with a 404 status if the product doesn't exist
      res.status(404).json({ message: 'Product not found' });
      return;
    }

    // Respond with a success message after deleting the product
    res.json({ message: 'Product deleted successfully' });
  } catch (err) {
    // Log and respond with a 500 status for any errors during product deletion
    console.error(err);
    res.status(500).json(err);
  }
});

module.exports = router;