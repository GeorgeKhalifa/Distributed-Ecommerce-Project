const express = require('express');
const router = express.Router();
const Product = require('./models/Product');
const mongodb = require('mongodb');
const Cart = require("./models/Cart");
const User = require("./models/User")
const Order = require("./models/Order")
const ObjectId = mongodb.ObjectId;
const { ensureAuthenticated, forwardAuthenticated } = require('./config/auth');
const { render } = require('ejs');
const jwt = require('jsonwebtoken');
const isAuth = require('./middleware/is-auth');


db = require('./config/keys').mongoURI;

// Welcome Page
//router.get('/', forwardAuthenticated, (req, res) => res.render('welcome'));

router.get('/my-account', isAuth, (req, res) => {
  Product.find({ user: new ObjectId(req.user.id) }).then((products) => { 
    res.json({user: req.user, products: products});
    //res.render('my-account', { user: req.user, products }) 
  })
});

router.get('/add_product', ensureAuthenticated, (req, res) =>
  res.render('add-product', {
    user: req.user
  }
  ));

router.post('/add_product', isAuth, (req, res) => {
  console.log("HERE ACCEPTED!");
  var user = req.user._id;
  const { name, category, description, image, price } = req.body;
  const product = new Product({ user, name, category, description, image, price });
  product.save().then(() => console.log('SUCCESS')).catch(() => console.log('Failure as always'));
  const token = jwt.sign({email: req.user.email, userId: req.user._id, user:req.user}, 'secret', {expiresIn: '1h'});
  res.json({token: token});
  //res.redirect('/my-account');
}
);

router.get('/shop', isAuth, (req, res) => {
  Product.find({ user: { $ne: new Object(req.user) } }).then((products) => { 
    res.json({user: req.user,
      products: products
    });
    //res.render('shop', { user: req.user, products })
  })
})

//REMOVE ITEM FROM DASHBOARD
router.get('/remove_item/:id', ensureAuthenticated, (req, res) => {

  Product.deleteOne({ _id: req.params.id }).then(() => res.redirect('/my-account'));
});



// GET: add a product to the shopping cart when "Add to cart" button is pressed
router.get("/add_to_cart/:id", isAuth, async (req, res) => {
  const productId = req.params.id;
  try {
    // get the correct cart, either from the db, session, or an empty cart.
    let user_cart;
    if (req.user) {
      user_cart = await Cart.findOne({ user: req.user.id });
    }
    let cart;
    if (
      (req.user && !user_cart && req.session.cart) ||
      (!req.user && req.session.cart)
    ) {
      //
      cart = await new Cart(user_cart);
      //
    } else if (!req.user || !user_cart) {
      cart = new Cart({});
    } else {
      cart = user_cart;
    }
    // add the product to the cart
    const product = await Product.findById(productId);
    const itemIndex = cart.items.findIndex((p) => p.productId == productId);
    if (itemIndex > -1) {
      // if product exists in the cart, update the quantity
      cart.items[itemIndex].price = product.price;
      cart.totalCost += product.price;
    } else {
      // if product does not exists in cart, find it in the db to retrieve its price and add new item
      cart.items.push({
        productId: productId,
        price: product.price,
        title: product.name,
        image: product.image
      });
      cart.totalCost += product.price;
    }
    // if the user is logged in, store the user's id and save cart to the db
    if (req.user) {
      cart.user = req.user._id;
      await cart.save();
    }
    req.session.cart = cart;
    console.log("success", "Item added to the shopping cart");
    res.json({added: true});
  } catch (err) {
    console.log(err.message);
    res.json({added: false});
  }
});


// GET: view shopping cart contents
router.get("/cart", isAuth, async (req, res) => {
  try {
    // find the cart, whether in session or in db based on the user state
    let cart_user;
    if (req.user) {
      cart_user = await Cart.findOne({ user: req.user.id });
    }
    // if user is signed in and has cart, load user's cart from the db
    if (req.user && cart_user) {
      //req.session.cart = cart_user;
      // return res.render("cart", {
      //   cart: cart_user,
      //   //
      //   products: await cart_user.items,
      //   //
      //   subTotal: '0',
      // });
      res.json({cart: cart_user, products: await cart_user.items});
    }
    // if there is no cart in session and user is not logged in, cart is empty
    // if (!req.session.cart) {
    //   return res.render("cart", {
    //     cart: null,
    //     products: null,
    //     subTotal: '0',
    //   });
    // }
    // otherwise, load the session's cart
    // return res.render("cart", {
    //   //
    //   cart:cart_user,
    //   //
    //   //
    //   products: await  cart_user.items,
    //   //
    //   subTotal: '0',
    // });
    res.json({cart: cart_user, products: await cart_user.items});
  } catch (err) {
    console.log(err.message);
    //
    // res.render("cart",{
    //   cart:null,
    //   products:null
    // });
    //
  }
});


//DEPOSIT CASH
router.get('/deposit_cash', ensureAuthenticated, (req, res) => {

  res.render('deposit_cash')
});


router.post('/deposit_cash', ensureAuthenticated, (req, res) => {
  // let user = User.find({ _id: req.user.id });
  let cashValue = Number(req.user.cash) + Number(req.body.cash);

  User.updateOne({ _id: req.user.id }, { $set: { cash: cashValue } }).then(() => { 
    const token = jwt.sign({email: req.user.email, userId: req.user._id, user:req.user}, 'secret', {expiresIn: '1h'});
    res.json({token: token});
  });
});


router.get('/form_checkout', ensureAuthenticated, async (req, res) => {
  // cart_user = await Cart.findOne({ user: req.user.id });
  res.render("form_checkout")
})

router.get('/checkout', ensureAuthenticated, async (req, res)=>{
  cart_user = await Cart.findOne({ user: req.user.id });
  res.render('checkout',{cart:cart_user});
})


router.get('/order', ensureAuthenticated, (req, res) => {
  let cart = req.session.cart
  const order = new Order({
    user: req.user,
    cart: {
      totalCost: cart.totalCost,
      items: cart.items,
    },
  });
  console.log('ORDER ADDED');



  let cashValue = Number(req.user.cash) - cart.totalCost;
  if (cashValue < 0) {
    return res.render('err_order');
  }
  order.save();
  let cashNew;
  //change onwership of porduct to the buyer
  for (var i = 0; i < cart.items.length; i++) {
    temp = new Product({
      name: cart.items[i].title,
      price: cart.items[i].price,
      user: ObjectId(req.user.id),
      image: cart.items[i].image
    });
    //.then((user) => {
    //  cashNew = user.cash + itemCash;
    //})
    itemCash = cart.items[i].price;
    Product.findOne({ _id: ObjectId(cart.items[i].productId) }).then((product) => {
      User.findOne({ _id: ObjectId(product.user.id) }).then((user) => {
        let input = user.cash + itemCash
        User.updateOne({ _id: ObjectId(product.user.id) }, { $set: { cash: input } }).then(()=>{console.log("AT LAST")})
      })
    })
    
    Product.deleteOne({ _id: ObjectId(cart.items[i].productId) }).then(() => { console.log('PRODUCT DELETED SUCCESSFULY!') });
    temp.save();
  }

  User.updateOne({ _id: ObjectId(req.user.id) }, { $set: { cash: cashValue } }).then(() => console.log('updated'))
  Cart.deleteOne({ user: req.user }).then(() => {
    console.log('DELETED FROM CART WITH USER');
    res.redirect('/history')
  });
})


//HISTORY PAGE!
router.get('/history', ensureAuthenticated, (req, res) => {
  if (!Order.find({ user: req.user })) {
    //console.log(req.user)
    //return res.render('history', { order: null })
    return res.json({order: null});
  }
  if (req.user.name === 'admin') {
    return Order.find().then((order) => {
      // console.log(order);
      //console.log(req.user)
      //res.render('history', { order: order })
      res.json({order: order});
    })
  }
  else {
    return Order.find({ user: req.user }).then((order) => {
      // console.log(order);
      //console.log(req.user)
      //res.render('history', { order: order })
      res.json({order: order});
    })
  }
})


module.exports = router;
