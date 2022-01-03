const express = require("express");
const router = express.Router();
const { validateToken } = require("../middlewares/AuthMiddlewares");
const { Posts, Likes } = require("../models");

router.get("/", async (req, res) => {
  const listofPosts = await Posts.findAll({ include: [Likes] });
  res.json(listofPosts);
});

router.get("/byId/:id", async (req, res) => {
  const id = req.params.id;
  const post = await Posts.findByPk(id);
  res.json(post);
});

router.get("/byuserId/:id", async (req, res) => {
  const id = req.params.id;
  const listOfPosts = await Posts.findAll({
    where: { UserId: id },
    include: [Likes],
  });
  res.json(listOfPosts);
});

router.post("/", validateToken, async (req, res) => {
  const post = req.body; // body is just an object
  post.username = req.user.username;
  post.UserId = req.user.id;
  await Posts.create(post); //yeh create sequelize ka method hai
  res.json(post);
});

router.delete("/:postId", validateToken, async (req, res) => {
  const postId = req.params.postId;
  await Posts.destroy({
    where: {
      id: postId,
    },
  });
  res.json("Deleted Successfully");
});

module.exports = router;
