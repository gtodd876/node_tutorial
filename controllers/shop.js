const Product = require('../models/product')
const Cart = require('../models/cart')

exports.getIndex = (req, res, next) => {
  Product.fetchAll((products) => {
    res.render('shop/index',
      {
        products,
        pageTitle: 'Shop',
        path: '/',
      }
    )
  })
}

exports.getProducts = (req, res, next) => {
  Product.fetchAll((products) => {
    res.render('shop/product-list',
      {
        products,
        pageTitle: 'All Products',
        path: '/products',
      }
    )
  })
}

exports.getProduct = (req, res, next) => {
  const productId = req.params.productId
  Product.findById(productId, product => {
    res.render('shop/product-detail',
      {
        product,
        pageTitle: product.title,
        path: '/products'
      }
    )
  })
}

exports.getCart = (req, res, next) => {
  Cart.getCart(cart => {
    Product.fetchAll(products => {
      const cartProducts = [];
      for (product of products) {
        const cartProductData = cart.products.find(cartProduct => cartProduct.id === product.id);
        if (cartProductData) {
          cartProducts.push({productData: product, qty: cartProductData.qty});
        }
      }
      res.render('shop/cart',
        {
          pageTitle: 'Your Cart',
          path: '/cart',
          products: cartProducts
        }
      )
    });
  });
}

exports.postCart = (req, res, next) => {
  const { productId } = req.body
  Product.findById(productId, product => {
    Cart.addProduct(productId, product.price)
  })
  res.redirect('/cart')
}

exports.postCartDeleteProduct = (req, res, next) => {
  const { productId } = req.body
  Product.findById(productId, product => {
    console.log(product)
    Cart.deleteProduct(productId, product.price);
    console.log('here');
    res.redirect('/cart');

  });
}

exports.getOrders = (req, res, next) => {
  res.render('shop/orders',
    {
      pageTitle: 'Your Orders',
      path: '/orders',
    }
  )
}

exports.getCheckout = (req, res, next) => {
  res.render('shop/checkout',
    {
      path: '/checkout',
      pageTitle: 'Checkout',
    })
}
