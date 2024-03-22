'use strict';


/**
 * Retrieve a list of products
 *
 * returns List
 **/
exports.productsGET = function() {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = [ {
  "shop_id" : 1,
  "price" : 6.0274563,
  "product_id" : 0,
  "name" : "name",
  "shop_type" : "shop_type",
  "description" : "description",
  "category" : "category",
  "stock" : 5
}, {
  "shop_id" : 1,
  "price" : 6.0274563,
  "product_id" : 0,
  "name" : "name",
  "shop_type" : "shop_type",
  "description" : "description",
  "category" : "category",
  "stock" : 5
} ];
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Create a new product
 *
 * body Product 
 * returns Product
 **/
exports.productsPOST = function(body) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "shop_id" : 1,
  "price" : 6.0274563,
  "product_id" : 0,
  "name" : "name",
  "shop_type" : "shop_type",
  "description" : "description",
  "category" : "category",
  "stock" : 5
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Delete a specific product
 *
 * product_id Integer 
 * no response value expected for this operation
 **/
exports.productsProduct_idDELETE = function(product_id) {
  return new Promise(function(resolve, reject) {
    resolve();
  });
}


/**
 * Retrieve a specific product
 *
 * product_id Integer 
 * returns Product
 **/
exports.productsProduct_idGET = function(product_id) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "shop_id" : 1,
  "price" : 6.0274563,
  "product_id" : 0,
  "name" : "name",
  "shop_type" : "shop_type",
  "description" : "description",
  "category" : "category",
  "stock" : 5
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Update a specific product
 *
 * body Product 
 * product_id Integer 
 * returns Product
 **/
exports.productsProduct_idPUT = function(body,product_id) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "shop_id" : 1,
  "price" : 6.0274563,
  "product_id" : 0,
  "name" : "name",
  "shop_type" : "shop_type",
  "description" : "description",
  "category" : "category",
  "stock" : 5
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}

