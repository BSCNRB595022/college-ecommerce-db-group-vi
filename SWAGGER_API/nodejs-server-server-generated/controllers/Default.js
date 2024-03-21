'use strict';

var utils = require('../utils/writer.js');
var Default = require('../service/DefaultService');

module.exports.locationsGET = function locationsGET (req, res, next) {
  Default.locationsGET()
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.locationsLocation_idDELETE = function locationsLocation_idDELETE (req, res, next, location_id) {
  Default.locationsLocation_idDELETE(location_id)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.locationsLocation_idGET = function locationsLocation_idGET (req, res, next, location_id) {
  Default.locationsLocation_idGET(location_id)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.locationsLocation_idPUT = function locationsLocation_idPUT (req, res, next, location_id) {
  Default.locationsLocation_idPUT(location_id)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.locationsPOST = function locationsPOST (req, res, next) {
  Default.locationsPOST()
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.productsGET = function productsGET (req, res, next) {
  Default.productsGET()
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.productsPOST = function productsPOST (req, res, next) {
  Default.productsPOST()
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.productsProduct_idDELETE = function productsProduct_idDELETE (req, res, next, product_id) {
  Default.productsProduct_idDELETE(product_id)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.productsProduct_idGET = function productsProduct_idGET (req, res, next, product_id) {
  Default.productsProduct_idGET(product_id)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.productsProduct_idPUT = function productsProduct_idPUT (req, res, next, product_id) {
  Default.productsProduct_idPUT(product_id)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.shopsGET = function shopsGET (req, res, next) {
  Default.shopsGET()
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.shopsPOST = function shopsPOST (req, res, next) {
  Default.shopsPOST()
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.shopsShop_idDELETE = function shopsShop_idDELETE (req, res, next, shop_id) {
  Default.shopsShop_idDELETE(shop_id)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.shopsShop_idGET = function shopsShop_idGET (req, res, next, shop_id) {
  Default.shopsShop_idGET(shop_id)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.shopsShop_idPUT = function shopsShop_idPUT (req, res, next, shop_id) {
  Default.shopsShop_idPUT(shop_id)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.transactionsGET = function transactionsGET (req, res, next) {
  Default.transactionsGET()
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.transactionsPOST = function transactionsPOST (req, res, next) {
  Default.transactionsPOST()
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.transactionsTransaction_idGET = function transactionsTransaction_idGET (req, res, next, transaction_id) {
  Default.transactionsTransaction_idGET(transaction_id)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.usersGET = function usersGET (req, res, next) {
  Default.usersGET()
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.usersPOST = function usersPOST (req, res, next) {
  Default.usersPOST()
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.usersUser_idDELETE = function usersUser_idDELETE (req, res, next, user_id) {
  Default.usersUser_idDELETE(user_id)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.usersUser_idGET = function usersUser_idGET (req, res, next, user_id) {
  Default.usersUser_idGET(user_id)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.usersUser_idPUT = function usersUser_idPUT (req, res, next, user_id) {
  Default.usersUser_idPUT(user_id)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
