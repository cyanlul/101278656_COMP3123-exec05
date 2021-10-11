let { response } = require('express');
let express = require('express');
let app = express();
let router = express.Router();

router.get('/home', (req, res) => {
  res.send('This is home router');
});

router.use('/files', express.static('public'));
var data = require('./user.json');

router.get('/profile', (req, res) => {
  res.send('This is profile router');
});

router.get('/login/:username/:password', (req, res) => {
  let username = req.params.username;
  let password = req.params.password;
  let response = {};

  if (username == data.username && password == data.password) {
      response = {
          status: true,
          message: 'User is valid'
      };
  } else if (username != data.username) {
      response = {
          status: false,
          message: 'User Name is invalid'
      };
  } else if (password != data.password) {
      console.log(password);
      console.log(data.password);
      response = {
          status: false,
          message: 'Password is invalid'
      };
  }

  res.send(response);
});

router.get('/logout/:username', (req, res) => {
  let username = req.params.username;
  res.send(`<b>${username} successfully logout.</b>`)
});

app.use('/', router);

app.listen(process.env.port || 8081);

console.log('Web Server is listening at port ' + (process.env.port || 8081));