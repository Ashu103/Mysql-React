const express = require("express");
const router = express.Router();
const { State } = require("../models");

router.get("/", async (req, res) => {
  const listofStates = await State.findAll({
    attribute: ["statename"],
  });
  res.json(listofStates);
});

module.exports = router;
