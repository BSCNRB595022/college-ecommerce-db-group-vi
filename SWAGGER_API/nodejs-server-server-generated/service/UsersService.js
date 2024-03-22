'use strict';


/**
 * Retrieve a list of users
 *
 * returns List
 **/
exports.usersGET = function() {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = [ {
  "role" : "role",
  "user_id" : 0,
  "password_hash" : "password_hash",
  "name" : "name",
  "email" : "email"
}, {
  "role" : "role",
  "user_id" : 0,
  "password_hash" : "password_hash",
  "name" : "name",
  "email" : "email"
} ];
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Create a new user
 *
 * body User 
 * returns User
 **/
exports.usersPOST = function(body) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "role" : "role",
  "user_id" : 0,
  "password_hash" : "password_hash",
  "name" : "name",
  "email" : "email"
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Delete a specific user
 *
 * user_id Integer 
 * no response value expected for this operation
 **/
exports.usersUser_idDELETE = function(user_id) {
  return new Promise(function(resolve, reject) {
    resolve();
  });
}


/**
 * Retrieve a specific user
 *
 * user_id Integer 
 * returns User
 **/
exports.usersUser_idGET = function(user_id) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "role" : "role",
  "user_id" : 0,
  "password_hash" : "password_hash",
  "name" : "name",
  "email" : "email"
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Update a specific user
 *
 * body User 
 * user_id Integer 
 * returns User
 **/
exports.usersUser_idPUT = function(body,user_id) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "role" : "role",
  "user_id" : 0,
  "password_hash" : "password_hash",
  "name" : "name",
  "email" : "email"
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}

