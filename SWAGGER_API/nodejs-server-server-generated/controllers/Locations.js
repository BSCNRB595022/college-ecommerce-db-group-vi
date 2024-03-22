'use strict';

var utils = require('../utils/writer.js');
var Locations = require('../service/LocationsService');

module.exports.locationsGET = function locationsGET (req, res, next) {
  Locations.locationsGET()
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.locationsLocation_idDELETE = function locationsLocation_idDELETE (req, res, next, location_id) {
  Locations.locationsLocation_idDELETE(location_id)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.locationsLocation_idGET = function locationsLocation_idGET (req, res, next, location_id) {
  Locations.locationsLocation_idGET(location_id)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.locationsLocation_idPUT = function locationsLocation_idPUT (req, res, next, body, location_id) {
  Locations.locationsLocation_idPUT(body, location_id)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.locationsPOST = function locationsPOST (req, res, next, body) {
  Locations.locationsPOST(body)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
