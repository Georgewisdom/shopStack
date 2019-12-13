const { check, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const User = require('../../model/User');
const router = require('express').Router();
const jwt = require('jsonwebtoken');
const validateLoginInput = require("../../validation/login");
const config = require('config')
const authenticate = require('../../authentication/authenticate')
router.post('/register', [
  
  check('email', "invalid email").isEmail(),
  check('password', "password length should be greater than 5 character")
  .isLength({ min: 5 })
], async (req, res) => {
  
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  try {
      
  const newUser = await User.create({
    handler: req.body.handler,
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
});
// simple validations
const handlerExistCheck = await User.findOne({handler: req.body.handler});
const user = await User.findOne({email: req.body.email})

if (handlerExistCheck || user) {
   return res.status(400).json({ errors: [{ msg: "Handler or Email already exists" }] });
}


bcrypt.genSalt(10, (err, salt) => {
  bcrypt.hash(newUser.password, salt, (err, hash) => {
    if (err) throw err;
    newUser.password = hash;
    newUser
      .save()
      .then(user => {
        res.json({
          message: "Account Created", 
          user
        });
      })
      .catch(err => console.error(err));
  });
});
    
  } catch (error) {
    console.error(error)
    res.status(500).json({msg: "server Error"})
  }
});


router.post("/login", async (req, res) => {
  // Validation
  const { errors, isValid } = validateLoginInput(req.body);
  if (!isValid) {
    return res.status(400).json({ errors: Array.from(errors) });
  }
  // Destructuring
  const { email, password } = req.body;
  // Check For User Existence
  try {
    const user = await User.findOne({ email });
    // const profile = await Profile.findOne({ user: user.id }).populate("User");

    if (!user) {
      return res.status(400).json({ errors: [{ msg: "Invalid Credentials" }] });
    }

    // log activity

    // Password Validation Strategy
    const pasMatch = await bcrypt.compare(password, user.password);

    console.log(user.password, password);

    if (pasMatch) {
      // Generate Token
      jwt.sign(
        { id: user.id },
        config.get("tokenSecret"),
        { expiresIn: "2d" },
        (error, token) => {
          if (error) throw error;

          res.json({
            token: token,
            user: {
              id: user._id,
              email: user.email,
              name: user.name
            }
          });
        }
      );
    } else {
      return res.status(400).json({ errors: [{ msg: "Invalid Credentials" }] });
    }
   
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error");
  }
});

// get current user
router.get("/", authenticate, async (req, res) => {
  try {
   const user =  await User.findById(req.user.id).select("-password")
    
    res.status(200).json(user)
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "server error" });
  }
});

module.exports = router;