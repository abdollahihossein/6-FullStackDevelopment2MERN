const express = require("express");
const requireAuth = require('../middleware/requireAuth')
// recordRoutes is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /record.
const recordRoutes = express.Router();

// This will help us connect to the database
const dbo = require("../db/conn");

// This help convert the id from string to ObjectId for the _id.
const ObjectId = require("mongodb").ObjectId;

// require auth for all workout routes
recordRoutes.use(requireAuth)

// This section will help you get a list of all the agents.
recordRoutes.route("/record").get(function (req, res) {
  let db_connect = dbo.getDb("employees");
  db_connect
    .collection("agents")
    .find({})
    .toArray(function (err, result) {
      if (err) throw err;
      res.json(result);
    });
});

// This section will help you get a single record by id
recordRoutes.route("/record/:id").get(function (req, res) {
  let db_connect = dbo.getDb();
  let myquery = { _id: ObjectId( req.params.id )};
  db_connect
      .collection("agents")
      .findOne(myquery, function (err, result) {
        if (err) throw err;
        res.json(result);
      });
});

// This section will help you create a new record.
recordRoutes.route("/record/add").post(function (req, response) {
  let db_connect = dbo.getDb();
  let myobj = {
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    email: req.body.email,
    region: req.body.region,
    rating: req.body.rating,
    fee: req.body.fee
  };
  db_connect.collection("agents").insertOne(myobj, function (err, res) {
    if (err) throw err;
    response.json(res);
  });
});

// This section will help you get a list of all the transaction record.
recordRoutes.route("/transaction-data").get(function (req, res) {
  let db_connect = dbo.getDb("employees");
  db_connect
    .collection("transaction")
    .find({})
    .sort({date: -1})
    .toArray(function (err, result) {
      if (err) throw err;
      res.json(result.slice(0,10));
    });
});

// This section will help you create a new transaction record.
recordRoutes.route("/transaction").post(function (req, response) {
  let db_connect = dbo.getDb("employees");
  
  let myDate = new Date().toLocaleString("en-GB", { hour12: false }, {timeZone: "Canada/Montreal"})
  let myobj = {
    date: myDate,
    amount: req.body.amount,
    agent_id: req.body.agent_id
  }

  // validation
  if (req.body.amount <= 0) {
    response.status(400).json({error: 'Amount has to be a positive!'})
    return
  }
  if (req.body.agent_id == "") {
    response.status(401).json({error: 'An agent must be chosen!'})
    return
  }

  db_connect.collection("transaction").insertOne(myobj, function (err, res) {
    if (err) throw err;
    response.json(myobj);
  })
})

// This section will help you update a record by id.
recordRoutes.route("/update/:id").post(function (req, response) {
  let db_connect = dbo.getDb();
  let myquery = { _id: ObjectId( req.params.id )};
  let newvalues = {
    $set: {
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      email: req.body.email,
      region: req.body.region,
      rating: req.body.rating,
      fee: req.body.fee
    },
  };
  db_connect
    .collection("agents")
    .updateOne(myquery, newvalues, function (err, res) {
      if (err) throw err;
      console.log("1 document updated");
      response.json(res);
    });
});

// This section will help you delete a record
recordRoutes.route("/:id").delete((req, response) => {
  let db_connect = dbo.getDb();
  let myquery = { _id: ObjectId( req.params.id )};
  db_connect.collection("agents").deleteOne(myquery, function (err, obj) {
    if (err) throw err;
    console.log("1 document deleted");
    response.json(obj);
  });
});

module.exports = recordRoutes;
