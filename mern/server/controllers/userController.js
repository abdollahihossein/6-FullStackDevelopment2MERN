const dbo = require("../db/conn");
const bcrypt = require('bcrypt');
const validator = require('validator');
const jwt = require('jsonwebtoken')

const createToken = (_id) => {
  return jwt.sign({_id}, process.env.SECRET, { expiresIn: '3d' })
}

// login a user
const loginUser = async (req, res) => {
  let db_connect = dbo.getDb("employees");

  let email = req.body.email
  let password = req.body.password

  // validation
  if (!email || !password) {
    res.status(404).json({error: 'All fields must be filled'})
    return
  }

  let count = await db_connect.collection("users").countDocuments({email})
  if (count == 0) {
    res.status(405).json({error: 'Incorrect email'})
    return
  }

  let user = await db_connect.collection("users").find({email}).toArray()

  const match = await bcrypt.compare(password, user[0].password)
  if (!match) {
    res.status(406).json({error: 'Incorrect password'})
    return
  }

  // create a token
  const token = createToken(user[0]._id)

  res.cookie("token", token)

  res.status(200).json({email, token})
}

// signup a user
const signupUser = async (req, res) => {
  let db_connect = dbo.getDb("employees");

  let first_name = req.body.first_name
  let last_name = req.body.last_name
  let email = req.body.email
  let password = req.body.password
    
  // validation
  if (!first_name || !last_name || !email || !password) {
    res.status(400).json({error: 'All fields must be filled'})
    return
  }
  if (!validator.isEmail(email)) {
    res.status(401).json({error: 'Email not valid'})
    return
  }
  if (!validator.isStrongPassword(password)) {
    res.status(402).json({error: 'Password not strong enough'})
    return
  }

  let count = await db_connect.collection("users").countDocuments({email})

  if (count != 0) {
    res.status(403).json({error: 'Email already in use'})
    return
  }

  const salt = await bcrypt.genSalt(10)
  const hash = await bcrypt.hash(password, salt) 

  db_connect.collection("users").insertOne({ first_name, last_name, email, password: hash }, function (err, result) {
    if (err) throw err;
  });
  db_connect.collection("users").find({email}).toArray(function (err, user) {
    if (err) throw err;
    // create a token
    const token = createToken(user[0]._id)
    res.status(200).json({email, token})
  });
}

module.exports = { signupUser, loginUser }