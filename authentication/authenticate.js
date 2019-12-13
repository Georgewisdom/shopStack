const jwt = require("jsonwebtoken");
const config = require("config");

module.exports = async function authenticate(req, res, next) {
  const token = req.header("token");

  // Token Validity
  if (!token) {
    return res.status(401).json({ msg: "Invalid token" });
  }
  try {
    // Verify Token
    await jwt.verify(token, config.get("tokenSecret"), (error, decoded) => {
      if (error) {
        res.status(401).json({ msg: "Token is incorrect" });
      } else {
        req.user = decoded;
        next();
      }
    });
  } catch (error) {
    res.status(500).json({ msg: "Server Error" });
  }
};
