const express = require("express");
const router = express.Router();
const { PrismaClient } = require("@prisma/client");
const {
  signUpController,
  loginController,
} = require("../controllers/userController");
const prisma = new PrismaClient();

//! req.params use this to get url data

router.get("/", async (req, res) => {
  try {
    const users = await prisma.user.findMany();
    res.json(users);
  } catch (err) {
    console.log(err);
  }
});

router.post("/signup", signUpController);

router.post("/login", loginController);

module.exports = router;
