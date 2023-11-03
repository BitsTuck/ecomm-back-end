const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

//Get all categories
router.get('/', async (req, res) => {
  try {
    const allCategories = await Category.findAll({
      include: [{ model: Product }]
    })
    res.status(200).json(allCategories);
  } catch (err) {
    res.status(500).json(err)
  }
});


//Get category by id
router.get('/:id', async (req, res) => {
  try {
    const catId = await Category.findByPk(req.params.id, {
      include: [{ model: Product }]
    });

    if (!catId) {
      res.status(404).json({
        message: 'No category with this id'
    });
      return;
    }
    res.status(200).json(catId);
  } catch (err) {
    res.status(500).json(err);
  }
});

//Post new category
router.post('/', async (req, res) => {
  try {
    const newCategory = await Category.create(req.body);
    res.status(200).json(newCategory);
  } catch (err) {
    res.status(400).json(err);
  }
});

//Update category by id
router.put('/:id', async (req, res) => {
  try {
    const updateCategory = await Category.update(req.body, {
      where: {
        id: req.params.id,
      }
    });
    if(!updateCategory[0]) {
      res.status(404).json({ message: 'No such category id'})
    }
    res.status(200).json(updateCategory);
  } catch (err) {
    res.status(500).json(err);
  }
  });


//delete category by id
router.delete('/:id', async (req, res) => {
  try {
    const deleteCategory = await Category.destroy ({
      where: {
        id: req.params.id,
      }
    })
    if(!deleteCategory) {
      res.status(404).json({ message: 'No such category id'})
    }
    res.status(200).json({ message: 'Category deleted'})
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
