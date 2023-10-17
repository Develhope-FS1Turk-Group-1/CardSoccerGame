// index.js
const express = require('express');
//import express from 'express'
const cors = require('cors');
require('dotenv').config();
const app = express();
const PORT = process.env.PORT || 3050;
const { Pool } = require('pg');//backend's axios


const connectionString = process.env.CONNECTION_URL;


// Middleware to parse JSON
app.use(express.json());
// Middleware to parse URL-encoded bodies
app.use(express.urlencoded({ extended: true }));
// Use the cors middleware
app.use(cors());

// Create a connection pool
const pool = new Pool({ connectionString });
let client;

async function connectDB(){
    client = await pool.connect();
    console.log("Successfully connected to db!");
}


app.listen(PORT, () => {
    connectDB();
    console.log(`Server is running on http://localhost:${PORT}`);
});



app.post('/register', async (req, res) => {
    const { username, password, mail } = req.body;

    try {
      const registrationDate = new Date(); // Assuming registration date is current date

      const query = `
        INSERT INTO users (username, password, mail, registrationDate)
        VALUES ($1, $2, $3, $4)
        RETURNING *
      `;

      const result = await client.query(query, [username, password, mail, registrationDate]);

      res.status(201).json({ message: 'User registered successfully', user: result.rows[0] });
    } catch (error) {
      console.error('Error registering user', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });


  app.post('/login', async (req, res) => {
    const { mail, password } = req.body;

    try {
      const query = `
        SELECT userId, username
        FROM users
        WHERE mail = $1 AND password = $2
      `;

      const result = await pool.query(query, [mail, password]);

      if (result.rows.length === 1) {
        const user = result.rows[0];
        res.json({ userId: user.userid, username: user.username });
      } else {
        res.status(401).json({ message: 'Invalid credentials' });
      }
    } catch (error) {
      console.error('Error logging in', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });


  app.get('/getUsername/:userId', async (req, res) => {
  const userId = req.params.userId;

  try {
    const query = `
      SELECT username
      FROM users
      WHERE userId = $1
    `;

    const result = await pool.query(query, [userId]);

    if (result.rows.length === 1) {
      const username = result.rows[0].username;
      res.json({ username });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    console.error('Error retrieving username', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});


app.put('/updatePassword', async (req, res) => {
    const { mail, oldPassword, newPassword } = req.body;

    try {
      const query = `
        UPDATE users
        SET password = $1
        WHERE mail = $2 AND password = $3
        RETURNING *
      `;

      const result = await pool.query(query, [newPassword, mail, oldPassword]);

      if (result.rows.length === 1) {
        const updatedUser = result.rows[0];
        res.json({ message: 'Password updated successfully', user: updatedUser });
      } else {
        res.status(401).json({ message: 'Invalid credentials' });
      }
    } catch (error) {
      console.error('Error updating password', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });
