const express = require('express');
const path = require('path');

const app = express();

const bodyParser = require('body-parser');

const registerRouter = require('./routes/register');
const loginRouter = require('./routes/login');
const myAccountRouter = require('./routes/my-account');
const shopRouter = require('./routes/product-list');
const historyRoute = require('./routes/history');
const addProductRoute = require('./routes/add-product');
const depositeCashRoute = require('./routes/deposite-cash');

app.use(express.static(path.join(__dirname, "public")));
app.use("/public", express.static('./public/'));
app.use(bodyParser.urlencoded({ extended: true }));

app.use(registerRouter);
app.use(loginRouter);
app.use(myAccountRouter);
app.use(shopRouter);
app.use(historyRoute);
app.use(addProductRoute);
app.use(depositeCashRoute);


app.listen(8080);