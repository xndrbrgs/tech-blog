const router = require("express").Router();
//Require the correct files from the models
const { User } = require("../../models/User");

router.post("/", async (req, res) => {
  // Create the correct asychronous function for this login post request with error handling
  try {
    const userInfo = await User.create({
      username: req.body.username,
      password: req.body.password,
    });

    req.session.save(() => {
      req.session.user_id = userInfo.id;
      req.session.logged_in = true;
    });

    res.status(200).json(userInfo);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.post("/login", async (req, res) => {
  // Create the correct asychronous function for this login post request with error handling
  try {
    const logUser = await User.findOne({
      where: { username: req.body.username },
    });

    if (!logUser) {
      res.status(400).json({
        message: "Incorrect username or password!",
      });
    }

    const checkedPassword = await logUser.checkPassword(req.body.password);

    if (!checkedPassword) {
      res.status(400).json({
        message: "Incorrect username or password!",
      });
    }

    req.session.save(() => {
      req.session.user_id = logUser.id;
      (req.session.logged_in = true),
        res.json({
          user: logUser,
          message: "Logged in!",
        });
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

router.post("/logout", (req, res) => {
  // Create the correct functionality for this post request with error handling
});

module.exports = router;
