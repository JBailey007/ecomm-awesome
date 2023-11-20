const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  try {
    const data = await Tag.findAll({
      include: [{model: Product, ProductTag}],
    });
    res.status(200).json(data)
  } catch (error) {
    res.status(500).json(error)
  }
  // be sure to include its associated Category and Tag data
});

router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  try {
    const data = await Tag.findOne({
      where: {
        id: req.params.id,
      },

      include: [{ model: Product, ProductTag }],
    });
    if (!data) {
      res
        .status(404)
        .json({ message: "No Tags found with this id!" });
      return;
    }
    console.log("**************    Tags findbyID route hit *********");
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.post('/', async (req, res) => {
  // create a new tag
  try {
    const newTagData = {
      ...req.body,
    } 
    const data = await Tag.create(newTagData);
    console.log("************ Tags post route is hit ************");
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.put('/:id', async (req, res) => {
  // update a tag's name by its `id` value
  try {
    const data = await Tag.update(
      {
        tag_name: req.body.tag_name
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );
    if (!data) {
      res.status(404).json({ message: "No Tags found with this id!" });
      return;
    }
    console.log("**************    Tags Put route hit *********");
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.delete('/:id', async (req, res) => {
  // delete on tag by its `id` value
  try {
    const data = await Tag.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (!data) {
      res
        .status(404)
        .json({ message: "No Tag found with this id!" });
      return;
    }
    console.log("**************    Tag Delete route hit *********");
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;