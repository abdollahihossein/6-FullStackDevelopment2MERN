const dbo = require("../db/conn");
const bcrypt = require('bcrypt')

// login a user
const loginUser = async (req, res) => {
  res.json({mssg: 'login user'})
}

// signup a user
const signupUser = async (req, response) => {
  let db_connect = dbo.getDb("employees");

  let first_name = req.body.first_name
  let last_name = req.body.last_name
  let email = req.body.email
  let password = req.body.password
    
  let count = await db_connect.collection("users").countDocuments({email})

  if (count != 0) {
    response.json('Email already in use')
    return
  }

  const salt = await bcrypt.genSalt(10)
  const hash = await bcrypt.hash(password, salt)

  db_connect.collection("users").insertOne({ first_name, last_name, email, password: hash }, function (err, res) {
    if (err) throw err;
    response.json({ first_name, last_name, email, password: hash });
  });
}

module.exports = { signupUser, loginUser }