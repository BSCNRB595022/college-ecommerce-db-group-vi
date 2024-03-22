'use strict';


/**
 * Retrieve a list of shops
 *
 * returns List
 **/
exports.shopsGET = function() {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = [ {
  "shop_id" : 0,
  "name" : "name",
  "location_id" : 6
}, {
  "shop_id" : 0,
  "name" : "name",
  "location_id" : 6
} ];
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Create a new shop
 *
 * body Shop 
 * returns Shop
 **/
exports.shopsPOST = function(body) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "shop_id" : 0,
  "name" : "name",
  "location_id" : 6
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Delete a specific shop
 *
 * shop_id Integer 
 * no response value expected for this operation
 **/
exports.shopsShop_idDELETE = function(shop_id) {
  return new Promise(function(resolve, reject) {
    resolve();
  });
}


/**
 * Retrieve a specific shop
 *
 * shop_id Integer 
 * returns Shop
 **/
exports.shopsShop_idGET = function(shop_id) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "shop_id" : 0,
  "name" : "name",
  "location_id" : 6
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Update a specific shop
 *
 * body Shop 
 * shop_id Integer 
 * returns Shop
 **/
exports.shopsShop_idPUT = function(body,shop_id) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "shop_id" : 0,
  "name" : "name",
  "location_id" : 6
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}

