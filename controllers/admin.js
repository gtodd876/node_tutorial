const Product = require('../models/product');

exports.postAddProduct = (req, res, next) => {
  const { title, imageUrl, price, description } = req.body;

  const product = new Product(title, imageUrl, price, description);

  product.save();

  res.redirect('/');
};

exports.getAddProduct = (req, res, next) => {
  res.render('admin/edit-product', {
    pageTitle: 'Add Product',
    path: '/admin/add-product',
    editing: false
  });
};

exports.getProducts = (req, res, next) => {
  Product.fetchAll(products => {
    res.render('admin/products', {
      pageTitle: 'Your Products',
      path: '/admin/products',
      products: products
    });
  });
};

exports.postEditProduct = (req, res, next) => {
  
}

exports.getEditProduct = (req, res, next) => {
  const editMode = req.query.edit;
  console.log({ editMode });
  if (editMode !== 'true') {
    return res.redirect('/');
  }
  const productId = req.params.productId;
  console.log({ productId });
  Product.findById(productId, product => {
    if (!product) {
      return res.redirect('/');
    }
    res.render('admin/edit-product', {
      pageTitle: 'Edit Product',
      path: '/admin/edit-product',
      editing: editMode,
      product
    });
  });
};
