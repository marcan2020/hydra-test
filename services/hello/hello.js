var hydraExpress = require('fwsp-hydra-express');  
var hydra = hydraExpress.getHydra();  
var config = require('./config.json');

function onRegisterRoutes() {  
  var express = hydraExpress.getExpress();
  var api = express.Router();

  api.get('/', function(req, res) {
    res.send({
      msg: `Hello from ${hydra.getServiceName()}`
    });
  });
  hydraExpress.registerRoutes({
    '': api
  });
}

hydraExpress.init(config, onRegisterRoutes)