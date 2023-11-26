const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  try {
    // Find all categories and include associated Products
    const categories = await Category.findAll({
      include: [{ model: Product }],
    });
    res.json(categories);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  try {
    // Find one category by its `id` value and include associated Products
    const category = await Category.findByPk(req.params.id, {
      include: [{ model: Product }],
    });
    if (!category) {
      res.status(404).json({ message: 'Category not found' });
      return;
    }
    res.json(category);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  try {
    // Create a new category
    const newCategory = await Category.create(req.body);
    res.status(201).json(newCategory);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put('/:id', async (req, res) => {
  try {
    // Update a category by its `id` value
    const updatedCategory = await Category.update(req.body, {
      where: { id: req.params.id },
    });
    if (updatedCategory[0] === 0) {
      res.status(404).json({ message: 'Category not found' });
      return;
    }
    res.json({ message: 'Category updated successfully' });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  try {
    // Delete a category by its `id` value
    const deletedCategory = await Category.destroy({
      where: { id: req.params.id },
    });
    if (!deletedCategory) {
      res.status(404).json({ message: 'Category not found' });
      return;
    }
    res.json({ message: 'Category deleted successfully' });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;