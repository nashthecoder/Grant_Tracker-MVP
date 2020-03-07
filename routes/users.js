var express = require('express');
var router = express.Router();
const db = require("../model/helper");
var jwt = require("jsonwebtoken");
require("dotenv").config();
var shouldBeLoggedIn = require("./guards/shouldBeLoggedIn");

const supersecret = process.env.AUTH_SECRET;

//POST login authentication
router.post("/login", function (req, res, next) {
  db(`SELECT id, admin FROM users WHERE email = '${req.body.email}' AND password = '${req.body.password}';`)
    .then(results => {

      const user_id = results.data[0].id;
      const admin = results.data[0].admin;
      var token = jwt.sign({ user_id: user_id }, supersecret);

      res.status(200).send({ msg: "login was successful, here is your token", token, admin });
    })
    .catch(err => res.status(400).send({ msg: "login not successful" }));
});

/*  GET users listing. */
/*router.get('/', function(req, res, next) {
  res. send('respond with a resource');
});
*/

//GET/users
router.get("/", function (req, res, next) {
  db(`SELECT * FROM users JOIN narrative, financial WHERE users.id = narrative.user_id AND users.id = financial.user_id
  AND users.admin = 0;`)
    .then(results => {
      // console.log(results.data)
      res.status(200).send(results.data);
    })
    .catch(err => res.status(500).send(err));
});

//GET/id db(`SELECT * from USERS where id = 2;`)
router.get("/:id", function (req, res, next) {
  db(`SELECT * FROM users where id = "${req.params.id}";`)
    .then(results => {
      res.send(results.data);
    })
    .catch(err => res.status(500).send(err));
});



//GET/users/id/narrative
router.get("/:id/narrative", function (req, res, next) {
  db(`SELECT * FROM narrative where id = "${req.params.id}";`)
    .then(results => {
      res.send(results.data);
    })
    .catch(err => res.status(500).send(err));
});

//GET/users/id/financial
router.get("/:id/financial", function (req, res, next) {
  db(`SELECT * FROM financial where id = "${req.params.id}";`)
    .then(results => {
      res.send(results.data);
    })
    .catch(err => res.status(500).send(err));
});


//POST/users
router.post("/newuser", shouldBeLoggedIn, function (req, res, next) {
  db(`INSERT into users (org_name, project_name, project_code, region, city, grant_amount, grant_period, admin, email, password) 
  VALUES('${req.body.org_name}','${req.body.project_name}', '${req.body.project_code}','${req.body.region}', '${req.body.city}', 
  '${req.body.grant_amount}','${req.body.grant_period}', ${req.body.admin}, '${req.body.email}', 'pass')`);
  db(`SELECT * FROM users ORDER BY id ASC;`)
    .then(results => {
      res.status(201).send(results.data);
    })
    .catch(err => res.status(500).send(err));
});



//POST/users/id/narrative
router.post("/narrative", shouldBeLoggedIn, function (req, res, next) {
  db(`INSERT into narrative (report_period, project_summary, task_completed , task_delayed , task_pending , risks, issues, user_id) 
  VALUES ("${req.body.report_period}", "${req.body.project_summary}","${req.body.task_completed}", "${req.body.task_delayed}","${req.body.task_pending}", "${req.body.risks}", 
  "${req.body.issues}", ${req.user_id})`)
    .then(results => {
      // console.log(results.data);
      res.status(201).send({ msg: "success!" });
    }).catch(err => res.status(500).send(err));

});


//POST/users/id/financial 
router.post("/financial", shouldBeLoggedIn, function (req, res, next) {
  db(`INSERT into financial (budget_line, project_budget, forecast_amount, actual_amount, user_id) 
  VALUES("${req.body.budget_line}","${req.body.project_budget}", "${req.body.forecast_amount}","${req.body.actual_amount}", ${req.user_id})`)
    .then(results => {
      res.status(201).send({ msg: "success!" });
    }).catch(err => res.status(500).send(err));
});



//DELETE from USERS where id = 1; 
router.delete("/:id", function (req, res, next) {
  db(`DELETE FROM users where id = "${req.params.id}"`);
  db(`SELECT * FROM users ORDER BY id ASC;`)

    .then(results => {
      res.send(results.data);
    })
    .catch(err => res.status(500).send(err));
});

module.exports = router;
