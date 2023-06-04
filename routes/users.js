const express = require('express');
const router = express.Router();
const daoUser = require('../API/users/daoUser');
const registerUseCases = require('../API/register/register.useCases');
const loginUseCases = require('../API/login/daoLogin');
const {json} = require("express");


/* GET users listing. */
router.get('/', async function(req, res, next) {
  let users = await daoUser.getUsers();
  res.send(users);
});

router.post('/', async function(req, res, next) {
  const {username, pdw} = req.body;
  let newUser = await registerUseCases.registerUser(username, pdw);
    res.send(newUser);
});

router.post('/login', async function(req, res, next) {
  const {username, pdw} = req.body;
  let login = await loginUseCases.login(username, pdw);
  console.log(login)
  res.send(login);
});

module.exports = router;
