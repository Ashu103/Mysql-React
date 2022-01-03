const express = require("express");
const router = express.Router();
const { sign } = require("jsonwebtoken");
const { Users } = require("../models"); //isi k wajah se  import huye hai
const bcrypt = require("bcrypt"); //isse toh khali password ko hash kiya hai
const { validateToken } = require("../middlewares/AuthMiddlewares");
const { OAuth2Client } = require("google-auth-library");
const fileUpload = require("../middlewares/file-upload");
const fs = require("fs");
const client = new OAuth2Client(
  "581796724746-0tj44nsqp6kk09sj8aeg45g3hq3m99ou.apps.googleusercontent.com"
);

router.post("/", fileUpload.single("file"), async (req, res) => {
  const { username, password } = req.body;
  const { path } = req.file;
  bcrypt.hash(password, 10).then((hash) => {
    Users.create({
      username: username,
      password: hash,
      file: path,
    }).then((image) => {
      res.json({ data: image, msg: "File uploaded" });
    });
  });
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  const user = await Users.findOne({ where: { username: username } });

  if (!user) res.json({ error: "User doesn't exits" });

  bcrypt.compare(password, user.password).then(async (match) => {
    if (!match) res.json({ error: "Wrong Username and Password Combination" });

    const accessToken = sign(
      //Here i created our access token
      { username: user.username, id: user.id },
      "importantsecret"
    );
    res.json({ token: accessToken, username: username, id: user.id }); //here we send it back to front end aur isiko front-end me local storage headers se acces kar dege
  });
});
router.get("/auth", validateToken, (req, res) => {
  res.json(req.user);
});

router.post("/googlelogin", async (req, res) => {
  const { tokenId } = req.body;
  const ticket = await client.verifyIdToken({
    idToken: tokenId,
    audience:
      "581796724746-0tj44nsqp6kk09sj8aeg45g3hq3m99ou.apps.googleusercontent.com",
  });
  const { name, email, picture, email_verified } = ticket.getPayload();

  let user = await Users.findOne({ where: { username: name } });
  if (user) {
    const { username, id } = user;
    const Googletoken = sign(
      {
        username,
        id,
      },
      "JamesBond007"
    );

    res.json({ Googletoken, user: { username, id } });
  } else {
    let newUser = await Users.create({
      username: name,
      password: email,
    });

    const { username, id } = newUser;
    const Googletoken = sign(
      {
        username,
        id,
      },
      "JamesBond007"
    );
    res.json({ Googletoken, newUser: { username, id } });
  }
});

router.get("/", async (req, res) => {
  const listOfUsers = await Users.findAll({
    attributes: ["username"],
  });
  res.json(listOfUsers);
});

router.get("/basicinfo/:id", async (req, res) => {
  const id = req.params.id;
  const basicInfo = await Users.findByPk(id, {
    attributes: { excluded: ["password"] },
  });
  console.log(basicInfo);
  res.json(basicInfo);
});

module.exports = router;
