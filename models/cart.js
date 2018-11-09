const fs = require('fs')
const path = require('path')

const p = path.join(
  path.dirname(process.mainModule.filename),
  'data',
  'cart.json'
)

module.exports = class Cart {
  static addProduct(id, productPrice) {
    fs.readFile(p, (err, fileContent) => {
      let cart = { 
        products: [], 
        totalPrice: 0 
      }
      if (!err) {
        cart = JSON.parse(fileContent)
      }
      const exisitingProductIndex = cart.products.findIndex(product => product.id === id);
      const exisitingProduct = cart.products[exisitingProductIndex]
      let updatedProduct;
      if (exisitingProduct) {
        updatedProduct = { ...exisitingProduct }
        updatedProduct.qty = updatedProduct.qty + 1
        cart.products = [...cart.products];
        cart.products[exisitingProductIndex] = updatedProduct

      } else {
        updatedProduct = { id, qty: 1 }
        //console.log({ cart })
        cart.products = [...cart.products, updatedProduct]
      }
      cart.totalPrice = cart.totalPrice + +productPrice;
      fs.writeFile(p, JSON.stringify(cart), err => {
        console.error(err)
      })
    })
  }

  static deleteProduct(id, price) {
    fs.readFile(p, (err, fileContent) => {
      if(err) {
        return;
      }
      const updatedCart = {...JSON.parse(fileContent)};
      const product = updatedCart.products.find(prod => prod.id === id);
      if (!product) {
        return;
      }
      const productQty = product.qty;
      updatedCart.products = updatedCart.products.filter(prod => prod.id !== id)
      updatedCart.totalPrice = updatedCart.totalPrice = productQty * price

      fs.writeFile(p, JSON.stringify(updatedCart), err => {
        console.error(err)
      })
    });
  }

  static getCart(cb) {
    fs.readFile(p, (err, fileContent) => {
      const cart = JSON.parse(fileContent);
      if (err) {
        cb(null)
      } else {
        cb(cart);
      } 
    });
  }
};
