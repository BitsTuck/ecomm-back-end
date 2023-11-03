const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

//Get all tags
router.get('/', async (req, res) => {
  try {
    const allTags = await Tag.findAll({
      include: [{ model: Product }]
    });
    res.status(200).json(allTags);
  } catch (err) {
    res.status(500).json(err)
  }
});

//Get tag by id
router.get('/:id', async (req, res) => {
  try {
    const tagId = await Tag.findByPk(req.params.id, {
      include: [{ model: Product }],
    });

    if(!tagId) {
      res.status(404).json({message: 'No tag with this id'});
      return;
    }
    res.status(200).json(tagId);
  } catch (err) {
    res.status(500).json(err);
  }
});

//Create new tag
router.post('/', async (req, res) => {
  try {
    const newTag = await Tag.create(req.body);
    res.status(200).json(newTag);
  } catch (err) {
    res.status(400).json(err)
  }
});

//Update tag by id
router.put('/:id', async (req, res) => {
  try {
    const updateTag = await Tag.update(req.body, {
      where: {
        id: req.params.id,
      }
    })
    if(!updateTag) {
      res.status(404).json({message: 'tag not updated'})
    }
    res.status(200).json(updateTag)
  } catch (err) {
    res.status(500).json(err)
  }
});

//Delete tag by id
router.delete('/:id', async (req, res) => {
  try {
    const deleteTag = await Tag.destroy({
      where: {
        id: req.params.id,
      }
    })
    if(!deleteTag)
 {
  res.status(404).json({ message: 'No such tag id'})
 }  
  res.status(200).json ({ message: 'Tag deleted'})
} catch (err) {
  res.status(500).json(err);
}
  // delete on tag by its `id` value
});

module.exports = router;
