//server.js
'use strict'

//first we import our dependencies...
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var StreamingService = require('./model/streamingServices');
var Channel = require('./model/channels');
var AddOn = require('./model/addOns');
var secrets = require('./secrets');

//and create our instances
var app = express();
var router = express.Router();

//set our port to either a predetermined port number if you have set it up, or 3001
var port = process.env.API_PORT || 3001;

//db config -- set your URI from mLab in secrets.js
var mongoDB = secrets.requestSecret('db_uri');
mongoose.connect(mongoDB)
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

//now we should configure the APi to use bodyParser and look for JSON data in the body
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//To prevent errors from Cross Origin Resource Sharing, we will set our headers to allow CORS with middleware like so:
app.use(function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');

  //and remove cacheing so we get the most recent channels
  res.setHeader('Cache-Control', 'no-cache');
  next();
});

//now  we can set the route path & initialize the API
router.get('/', function(req, res) {
  res.json({ message: 'API Initialized!'});
});

//adding the /services route to our /api router
router.route('/services')
  //retrieve all services from the database
  .get(function(req, res) {
    //looks at our StreamingService Schema
    StreamingService.find(function(err, services) {
      if (err)
        res.send(err);
      //responds with a json object of our database services.
      res.json(services)
    });
  })
  //post new service to the database
  .post(function(req, res) {
    var service = new StreamingService();
    (req.body.name) ? service.name = req.body.name : null;
    (req.body.description) ? service.description = req.body.description : null;
    (req.body.price) ? service.price = req.body.price : null;
    (req.body.image_url) ? service.image_url = req.body.image_url: null;
    (req.body.website) ? service.website = req.body.website : null;
    (req.body.base_channels) ? service.base_channels = req.body.base_channels : null;
    (req.body.channel_packages) ? service.channel_packages = req.body.channel_packages : null;
    (req.body.dvr) ? service.dvr = req.body.dvr : null;
    (req.body.numberOfDevices) ? service.numberOfDevices = req.body.numberOfDevices : null;

    service.save(function(err) {
      if (err)
        res.send(err);
      res.json({ message: 'StreamingService successfully added!' });
    });
  });

//Adding a route to a specific service based on the database ID
router.route('/services/:service_id')
//The put method gives us the chance to update our service based on the ID passed to the route
  .put(function(req, res) {
    StreamingService.findById(req.params.service_id, function(err, service) {
      if (err)
        res.send(err);
      //setting the new name and description to whatever was changed. If nothing was changed
      // we will not alter the field.
      (req.body.name) ? service.name = req.body.name : null;
      (req.body.description) ? service.description = req.body.description : null;
      (req.body.price) ? service.price = req.body.price : null;
      (req.body.image_url) ? service.image_url = req.body.image_url: null;
      (req.body.website) ? service.website = req.body.website : null;
      (req.body.base_channels) ? service.base_channels = req.body.base_channels : null;
      (req.body.channel_packages) ? service.channel_packages = req.body.channel_packages : null;
      //console.log("Req Body DVR " + req.body.dvr);
      //console.log("Service DVR " + service.dvr);
      // if ((req.body.dvr != service.dvr) && (req.body.dvr != null)) {
      //   service.dvr = req.body.dvr;
      //   console.log("New Service DVR " + service.dvr);
      //   return;
      // } else {
      //   service.dvr = null;
      //   console.log("Inside Else " + service.dvr);
      // }
      (req.body.dvr != service.dvr) ? service.dvr = req.body.dvr : service.dvr;
      //console.log("New Service DVR " + service.dvr);
      (req.body.numberOfDevices) ? service.numberOfDevices = req.body.numberOfDevices : null;
      //save service
      service.save(function(err) {
        if (err)
          res.send(err);
        res.json({ message: 'StreamingService has been updated' });
      });
    });
  })
  //delete method for removing a service from our database
  .delete(function(req, res) {
    //selects the service by its ID, then removes it.
    StreamingService.remove({ _id: req.params.service_id }, function(err, service) {
      if (err)
        res.send(err);
      res.json({ message: 'StreamingService has been deleted' })
    })
  });

//adding the /channels route to our /api router
router.route('/channels')
  //retrieve all channels from the database
  .get(function(req, res) {
    //looks at our Channel Schema
    Channel.find(function(err, channels) {
      if (err)
        res.send(err);
      //responds with a json object of our database channels.
      res.json(channels)
    });
  })
  //post new channel to the database
  .post(function(req, res) {
    var channel = new Channel();
    (req.body.name) ? channel.name = req.body.name : null;
    (req.body.category) ? channel.category = req.body.category : null;
    (req.body.image_url) ? channel.image_url = req.body.image_url: null;

    channel.save(function(err) {
      if (err)
        res.send(err);
      res.json({ message: 'Channel successfully added!' });
    });
  });

//Adding a route to a specific channel based on the database ID
router.route('/channels/:channel_id')
//The put method gives us the chance to update our channel based on the ID passed to the route
  .put(function(req, res) {
    Channel.findById(req.params.channel_id, function(err, channel) {
      if (err)
        res.send(err);
      //setting the new name and category to whatever was changed. If nothing was changed
      // we will not alter the field.
      (req.body.name) ? channel.name = req.body.name : null;
      (req.body.category) ? channel.category = req.body.category : null;
      (req.body.image_url) ? channel.image_url = req.body.image_url: null;
      //save channel
      channel.save(function(err) {
        if (err)
          res.send(err);
        res.json({ message: 'Channel has been updated' });
      });
    });
  })
  //delete method for removing a channel from our database
  .delete(function(req, res) {
    //selects the channel by its ID, then removes it.
    Channel.remove({ _id: req.params.channel_id }, function(err, channel) {
      if (err)
        res.send(err);
      res.json({ message: 'Channel has been deleted' })
    })
  });

//adding the /addons route to our /api router
  router.route('/addons')
  //retrieve all addons from the database
  .get(function(req, res) {
    //looks at our Addon Schema
    AddOn.find(function(err, addons) {
      if (err)
        res.send(err);
      //responds with a json object of our database add-ons.
      res.json(addons)
    });
  })
  //post new add-on to the database
  .post(function(req, res) {
    var addon = new AddOn();
    (req.body.addonName) ? addon.addonName = req.body.addonName : null;
    (req.body.description) ? addon.description = req.body.description : null;
    (req.body.forService) ? addon.forService = req.body.forService : null;
    (req.body.price) ? addon.price = req.body.price: null;
    (req.body.channels) ? addon.channels = req.body.channels : null;
    (req.body.dvr) ? addon.dvr = req.body.dvr : null;
    (req.body.devicesNum) ? addon.devicesNum = req.body.devicesNum: null;

    addon.save(function(err) {
      if (err)
        res.send(err);
      res.json({ message: 'Add-on successfully added!' });
    });
  });

  //Adding a route to a specific add-on based on the database ID
  router.route('/addons/:addon_id')
  //The put method gives us the chance to update our add-on based on the ID passed to the route
  .put(function(req, res) {
    AddOn.findById(req.params.addon_id, function(err, addon) {
      if (err)
        res.send(err);
      //setting the new parameters to whatever was changed. If nothing was changed
      // we will not alter the field.
      (req.body.addonName) ? addon.addonName = req.body.addonName : null;
      (req.body.description) ? addon.description = req.body.description : null;
      (req.body.forService) ? addon.forService = req.body.forService : null;
      (req.body.price) ? addon.price = req.body.price: null;
      (req.body.channels) ? addon.channels = req.body.channels : null;
      // if (req.body.dvr != addon.dvr) {
      //   addon.dvr = req.body.dvr;
      //   console.log("New Add DVR " + addon.dvr);
      // } else {
      //   addon.dvr = null;
      // }
      (req.body.dvr != addon.dvr) ? addon.dvr = req.body.dvr : addon.dvr;
      (req.body.devicesNum) ? addon.devicesNum = req.body.devicesNum: null;
      //save channel
      addon.save(function(err) {
        if (err)
          res.send(err);
        res.json({ message: 'Add-on has been updated' });
      });
    });
  })
  //delete method for removing a add-on from our database
  .delete(function(req, res) {
    //selects the add-on by its ID, then removes it.
    AddOn.remove({ _id: req.params.addon_id }, function(err, addon) {
      if (err)
        res.send(err);
      res.json({ message: 'Add-on has been deleted' })
    })
  });

//Use our router configuration when we call /api
app.use('/api', router);

//starts the server and listens for requests
app.listen(port, function() {
  console.log(`api running on port ${port}`);
});
