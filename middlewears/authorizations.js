const jwt = require("jsonwebtoken");

async function verifyToken(req, res, next) {
  try {
    const token = req.headers["token"];
    const secret_key = process.env.JWT_SECRET;
    if (!token) {
      return res.status(400).send("Token required");
    }
    // console.log(secret_key);
    jwt.verify(token, secret_key, (err, decoded) => {
      if (err) {
        res.status(400).send("Invalid token");
      } else {
        req.user = decoded;
        next();
        // console.log(req.user);
      }
    });
  } catch (err) {
    console.log(err);
  }
}

module.exports = { verifyToken };
