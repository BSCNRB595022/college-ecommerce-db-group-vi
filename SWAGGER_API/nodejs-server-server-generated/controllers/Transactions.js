'use strict';

var utils = require('../utils/writer.js');
var Transactions = require('../service/TransactionsService');

module.exports.transactionsGET = function transactionsGET (req, res, next) {
  Transactions.transactionsGET()
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.transactionsPOST = function transactionsPOST (req, res, next, body) {
  Transactions.transactionsPOST(body)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.transactionsTransaction_idGET = function transactionsTransaction_idGET (req, res, next, transaction_id) {
  Transactions.transactionsTransaction_idGET(transaction_id)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
