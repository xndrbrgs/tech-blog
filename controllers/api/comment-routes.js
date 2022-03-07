const router = require('express').Router();
//Require the correct files from the models and authorizations

const withAuth = require('../../utils/auth');
const { Comment } = require('../../models/Comment')

router.post('/', withAuth, async (req, res) => {
  try {
    const incomingComment = await Comment.create ({
      ...req.body, 
      user_id: req.session.user_id
    }); 

    res.status(200).json(incomingComment);
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;
