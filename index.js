// const express = require('express');
const my_express = require('./my_express');
const app = my_express();

app.use('/home', (req, res, next) => {
    console.log('A new request received at ' + Date.now());
    next();
  });

app.use('/home', (req, res, next) => {
  console.log('A new request2 received at ' + Date.now());
  next();
});

app.use('/home', (req, res, next) => {
  console.log('A new request3 received at ' + Date.now());
  next();
});
  
  app.get('/home', (req, res) => {
    console.log("get method called");
    console.log("req", req);
    console.log("res", res);
    res.send('Home Page');
  });
  
  app.get('/about', (req, res) => {
    res.send('About Page');
  });
  
  app.listen(3000, () => console.log('Example app listening on port 3000!'));