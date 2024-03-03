const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcrypt");
const prisma = new PrismaClient();
const jwt = require("jsonwebtoken");
async function signUpController(req, res) {
  if (req.email && req.password) {
    try {
      const existingUser = await prisma.user.findUnique({
        where: {
          email: req?.body?.email,
        },
      });
      if (!existingUser) {
        const hashedPassword = await bcrypt.hash(req?.body?.password, 10);
        const user = await prisma.user.create({
          data: {
            name: req?.body?.name,
            email: req?.body?.email,
            password: hashedPassword,
          },
        });
        res.send(user);
      } else {
        res.status(400).send("User already exists");
      }
    } catch (err) {
      console.log(err);
    } finally {
      await prisma.$disconnect();
    }
  } else {
    res.status(400).send("Require email & password");
  }
}

async function loginController(req, res) {
  try {
    const user = await prisma.user.findUnique({
      where: {
        email: req?.body?.email,
      },
    });
    // console.log(user);
    if (user) {
      const isPasswordValid = await bcrypt.compare(
        req?.body?.password,
        user?.password
      );
      if (isPasswordValid) {
        const token = jwt.sign(
          { id: user.id, name: user.name },
          process.env.JWT_SECRET,
          {
            expiresIn: "24h",
          }
        );
        res.send({ token: token, id: user.id });
      } else {
        res.status(400).send("Credentials mismatch");
      }
    } else {
      res.status(400).send("User does not exist");
    }
  } catch (err) {
    console.log(err);
    res.status(500).send("Server error");
  } finally {
    await prisma.$disconnect();
  }
}

module.exports = { signUpController, loginController };
