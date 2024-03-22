'use strict';


/**
 * Retrieve a list of locations
 *
 * returns List
 **/
exports.locationsGET = function() {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = [ {
  "address" : "address",
  "name" : "name",
  "location_id" : 0
}, {
  "address" : "address",
  "name" : "name",
  "location_id" : 0
} ];
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Delete a specific location
 *
 * location_id Integer 
 * no response value expected for this operation
 **/
exports.locationsLocation_idDELETE = function(location_id) {
  return new Promise(function(resolve, reject) {
    resolve();
  });
}


/**
 * Retrieve a specific location
 *
 * location_id Integer 
 * returns Location
 **/
exports.locationsLocation_idGET = function(location_id) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "address" : "address",
  "name" : "name",
  "location_id" : 0
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Update a specific location
 *
 * body Location 
 * location_id Integer 
 * returns Location
 **/
exports.locationsLocation_idPUT = function(body,location_id) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "address" : "address",
  "name" : "name",
  "location_id" : 0
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Create a new location
 *
 * body Location 
 * returns Location
 **/
exports.locationsPOST = function(body) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "address" : "address",
  "name" : "name",
  "location_id" : 0
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}

