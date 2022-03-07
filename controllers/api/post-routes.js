const router = require('express').Router();
//Require the correct files from the models and authorizations
const withAuth = require('../../utils/auth');
const { Post } = require('../../models/Post')

router.post('/', withAuth, async (req, res) => {
  try {
    const newestPost = await Post.create({
      ...req.body,
      user_id: req.session.user_id
    });

    res.status(200).json(newestPost);
  } catch (err) {
    res.status(400).json(err)
  }
});

router.put('/:id', withAuth, async (req, res) => {
  try {
    const udpatePost = await Post.update(req.body, {
      where: {
        id: req.params.id,
        user_id: req.session.user_id
      }
    })

    if (!udpatePost) {
      res.status(404).json({message: 'No post under this ID'})
      return;
    }

    res.status(200).json(udpatePost);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.delete('/:id', withAuth, async (req, res) => {
  try {
    const deletedPost = await Post.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id
      }
    })

    if (!deletedPost) {
      res.status(404).json({message: 'No post under this ID'})
      return;
    }

    res.status(200).json(deletedPost);
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;
