'use strict';

var utils = require('../utils/writer.js');
var Shops = require('../service/ShopsService');

module.exports.shopsGET = function shopsGET (req, res, next) {
  Shops.shopsGET()
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.shopsPOST = function shopsPOST (req, res, next, body) {
  Shops.shopsPOST(body)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.shopsShop_idDELETE = function shopsShop_idDELETE (req, res, next, shop_id) {
  Shops.shopsShop_idDELETE(shop_id)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.shopsShop_idGET = function shopsShop_idGET (req, res, next, shop_id) {
  Shops.shopsShop_idGET(shop_id)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.shopsShop_idPUT = function shopsShop_idPUT (req, res, next, body, shop_id) {
  Shops.shopsShop_idPUT(body, shop_id)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
