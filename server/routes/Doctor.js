const express = require("express");
const router = express.Router();
const { Doctor } = require("../models");

router.get("/byStateId/:id", async (req, res) => {
  const id = req.params.id;
  const listOfDoctors = await Doctor.findAll({
    where: { stateId: id },
  });
  res.json(listOfDoctors);
});

module.exports = router;
