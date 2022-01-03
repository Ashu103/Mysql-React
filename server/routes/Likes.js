const express = require("express");
const { validateToken } = require("../middlewares/AuthMiddlewares");
const router = express.Router();
const { Likes } = require("../models");

router.post("/", validateToken, async (req, res) => {
  const { PostId } = req.body;
  const UserId = req.user.id;

  const found = await Likes.findOne({
    where: { PostId: PostId, UserId: UserId },
  });

  if (!found) {
    await Likes.create({
      PostId: PostId,
      UserId: UserId,
    });
    res.json({ liked: true, msg: "I have been through this" });
  } else {
    await Likes.destroy({
      where: { PostId: PostId, UserId: UserId },
    });
    res.json({ liked: false, msg: "I have never experienced it" });
  }
});

module.exports = router;
