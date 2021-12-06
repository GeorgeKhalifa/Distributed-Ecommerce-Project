const express = require('express');
//const expressLayouts = require('express-ejs-layouts');
const mongoose = require('mongoose');
const passport = require('passport');
const flash = require('connect-flash');
const session = require('express-session');
var path = require('path');
const app = express();

// DB Config
const db = require('./config/keys').mongoURI;


app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));

// Connect to MongoDB
mongoose.connect(db, { useNewUrlParser: true })
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

//app.use(expressLayouts);


app.use(express.urlencoded({ extended: false }));

app.use(
  session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
  })
);

app.use(flash());

app.use(function (req, res, next) {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  //res.locals.error = req.flash('error');
  next();
});


// app.use('/', require('./routes/index.js'));
app.use('/', require('./routes/users.js'));
app.use('/index',require('./routes/index.js'));
app.use('/cart',require('./routes/cart.js'));
app.use('/checkout',require('./routes/checkout.js'));
app.use('/my-account',require('./routes/my-account.js'));
app.use('/product-list',require('./routes/product-list.js'));
app.use('/login',require('./routes/login.js'));


const PORT = process.env.PORT || 3000;

app.listen(PORT, console.log(`Server running on  ${PORT}`));