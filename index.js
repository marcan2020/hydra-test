var hydraExpress = require('fwsp-hydra-express');
var hydra = hydraExpress.getHydra();
var config = require('./config.json');


function callHelloService() {
  let message = hydra.createUMFMessage({
    to: 'hello:[get]/',
    from: 'home:/',
    body: {}
  });
  return hydra.makeAPIRequest(message);
}

function onRegisterRoutes() {
  var express = hydraExpress.getExpress();
  var api = express.Router();

  api.get('/', function (req, res) {
    res.send(`
      <h1>Home</h1>
      <a href="/test">Test Page</a>
    `);
  });

  api.get('/test', function (req, res) {
    callHelloService().then((response) => {
      console.log('response', response);
      res.send(`
        <h1>Test Page</h1>
        <p>Message: ${response.msg}</p>
      `);
    });
  });

  hydraExpress.registerRoutes({
    '': api
  });
}

hydraExpress.init(config, onRegisterRoutes)
  .then((serviceInfo) => {

  });