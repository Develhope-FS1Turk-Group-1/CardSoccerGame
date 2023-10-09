// index.js
const express = require('express');
//import express from 'express'

const app = express();

const PORT = process.env.PORT || 3050;


// Middleware to parse JSON
app.use(express.json());
// Middleware to parse URL-encoded bodies
app.use(express.urlencoded({ extended: true }));

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});


//EndPoint
app.get('/', (req, res) => {
    res.send('Hello, World!');
});

app.get('/sayHello', (req, res) => {
    res.send('Hello get dear myfriends');
});

app.put('/sayHello', (req, res) => {
    res.send('Hello put dear myfriends');
});

app.delete('/sayHello', (req, res) => {
    res.send('Hello delete dear myfriends');
});

app.post('/sayHello', (req, res) => {
    console.log(req.body);
    let {name,sa,as} = req.body;
    console.log(name," Just got engaged",sa,as)
    res.send('Hello post dear myfriends');
});


app.get('/user', (req, res) => {
    res.send('Hello get dear myfriends');
});
app.delete('/user', (req, res) => {
    res.send('Hello get dear myfriends');
});
app.put('/user', (req, res) => {
    res.send('Hello get dear myfriends');
});
app.post('/user', (req, res) => {
    res.send('Hello get dear myfriends');
});



app.post('/addUser', (req, res) => {
    res.send('Hello get dear myfriends');
});
app.post('/deleteUser', (req, res) => {
    res.send('Hello get dear myfriends');
});
app.post('/updateUser', (req, res) => {
    res.send('Hello get dear myfriends');
});
app.post('/getUser', (req, res) => {
    res.send('Hello get dear myfriends');
});
/*



*/