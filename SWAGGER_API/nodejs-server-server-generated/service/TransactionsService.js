'use strict';


/**
 * Retrieve a list of transactions
 *
 * returns List
 **/
exports.transactionsGET = function() {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = [ {
  "transaction_id" : 0,
  "quantity" : 5,
  "user_id" : 6,
  "product_id" : 1,
  "transaction_time" : "2000-01-23T04:56:07.000+00:00"
}, {
  "transaction_id" : 0,
  "quantity" : 5,
  "user_id" : 6,
  "product_id" : 1,
  "transaction_time" : "2000-01-23T04:56:07.000+00:00"
} ];
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Create a new transaction
 *
 * body Transaction 
 * returns Transaction
 **/
exports.transactionsPOST = function(body) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "transaction_id" : 0,
  "quantity" : 5,
  "user_id" : 6,
  "product_id" : 1,
  "transaction_time" : "2000-01-23T04:56:07.000+00:00"
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Retrieve a specific transaction
 *
 * transaction_id Integer 
 * returns Transaction
 **/
exports.transactionsTransaction_idGET = function(transaction_id) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "transaction_id" : 0,
  "quantity" : 5,
  "user_id" : 6,
  "product_id" : 1,
  "transaction_time" : "2000-01-23T04:56:07.000+00:00"
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}

