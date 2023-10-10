// index.js
const express = require('express');
//import express from 'express'
const cors = require('cors');

const app = express();

const PORT = process.env.PORT || 3050;

let cars = [];

// Middleware to parse JSON
app.use(express.json());
// Middleware to parse URL-encoded bodies
app.use(express.urlencoded({ extended: true }));
// Use the cors middleware
app.use(cors());

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

app.get("/cars",(req,res)=>{
    res.json({
        "cars":cars
    })
})

app.post("/cars",(req,res)=>{
    console.log(req.body);
    cars.push(req.body)

    res.send("Successful")
})


//EndPoint
app.get('/', (req, res) => {
    res.send('Hello, World!');
});

app.get('/sayHello', (req, res) => {
    res.json({"result":'Hello get dear myfriends'});
});

app.get('/taha', (req, res) => {
    res.json({"result":'TAHA IS HERE GETTING REQUEST'});
});

app.get('/omercan', (req, res) => {
    res.json({"result":'ÖMER IS HERE GETTING REQUEST'});
});

app.get('/okkes', (req, res) => {
    res.send('He is Incredible MaHello put dear myfriends');
});

app.get('/sayHello', (req, res) => {
    res.send('');
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

app.get('/alp', (req, res) => {
    res.send('Hello, Alp was here!');
});
/*



*/