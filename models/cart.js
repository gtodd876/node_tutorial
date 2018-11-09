const fs = require('fs')
const path = require('path')

const p = path.join(
  path.dirname(process.mainModule.filename),
  'data',
  'cart.json'
)

module.exports = class Cart {
  static addProduct(id, productPrice) {
    //console.log({id, productPrice})
    fs.readFile(p, (err, fileContent) => {
      let cart = { 
        products: [], 
        totalPrice: 0 
      }
      if (!err) {
        console.log(cart)
        cart = JSON.parse(fileContent)
      }
      const exisitingProductIndex = cart.products.findIndex(product => product.id === id)
      const exisitingProduct = cart.products[exisitingProductIndex]
      //console.log({ exisitingProduct, exisitingProductIndex })
      let updatedProduct
      if (exisitingProduct) {
        updatedProduct = { ...exisitingProduct }
        updatedProduct.qty = updatedProduct.qty + 1
        cart.products = [...cart.products];
        cart.products[exisitingProductIndex] = updatedProduct

      } else {
        updatedProduct = { id, quantity: 1 }
        //console.log({ cart })
        cart.products = [...cart.products, updatedProduct]
      }
      cart.totalPrice = cart.totalPrice + +productPrice
      fs.writeFile(p, JSON.stringify(cart), err => {
        console.error(err)
      })
    })
  }
}
