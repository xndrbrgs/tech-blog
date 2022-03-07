const router = require('express').Router();

//Require the correct files into the api folder
const userRoute = require('./user-routes')
const postRoute = require('./post-routes')
const commentRoute = require('./comment-routes')
//Create the router.use functionality for each required file

router.use('/users', userRoute);
router.use('/posts', postRoute);
router.use('/comments', commentRoute);


module.exports = router;