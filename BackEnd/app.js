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

async function connectDB() {
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
        INSERT INTO users (username, password, mail, registrationDate,money,xp)
        VALUES ($1, $2, $3, $4,0,0)
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
  console.log(mail, password);
  try {
    const query = `
        SELECT userId, username, money, xp
        FROM users
        WHERE mail = $1 AND password = $2
      `;

    const result = await pool.query(query, [mail, password]);

    if (result.rows.length === 1) {
      console.log((result.rows[0]));
      const user = result.rows[0];
      res.json({ userId: user.userid, username: user.username, money:user.money, level:user.xp });
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

app.get('/getAllPlayers/:userID', (req, res) => {
  const { userID } = req.params;

  // Execute a SQL query to get all players for a specific user
  pool.query(
    `SELECT op.id, op.baseid, op.userid, op.level, op.cardcount, bp.*
     FROM onlinePlayers op
     JOIN basePlayers bp ON op.baseid = bp.id
     WHERE op.userid = $1`,
    [userID],
    (error, result) => {
      if (error) {
        console.error('Error executing query', error);
        res.status(500).json({ error: 'Internal Server Error' });
        return;
      }

      const players = result.rows;
      res.json(players);
    }
  );
});

app.get('/formation/:userID', async (req, res) => {
  const userId = req.params.userID;

  try {
    const result = await pool.query(
      `SELECT * FROM formation
         JOIN basePlayers ON onlinePlayers.baseId = basePlayers.id
         WHERE userID = $1`,
      [userId]
    );

    res.json(result.rows);
  } catch (error) {
    console.error('Error executing query', error);
    res.status(500).send('Internal Server Error');
  }
});




// Assuming you have the PostgreSQL connection pool 'pool' defined.

app.get('/buyPlayer', async (req, res) => {
  const { type, userId } = req.query;
  let minRating, count, price;

  switch (type) {
    case '1':
      minRating = 40;
      count = 10;
      price = 10;
      break;
    case '2':
      minRating = 65;
      count = 5;
      price = 35;
      break;
    case '3':
      minRating = 75;
      count = 3;
      price = 70;
      break;
    default:
      return res.status(400).json({ message: 'Invalid type provided' });
  }

  try {

    const playerMoney = await pool.query(
      `SELECT money FROM users WHERE userid = $1`,
      [userId]
    );

    const money = playerMoney.rows[0];
    /*console.log(playerMoney.rows)
    console.log(playerMoney.rows[0])
    console.log(Number(money));*/

    if(Number(money.money) < price){
      res.json({error:"Not enough money"});
      return;
    }
    else{
      await pool.query(
        `UPDATE users SET money = money - $2 WHERE userId = $1`,
        [userId,price]
      );
    }



    const result = await pool.query(
      `SELECT * FROM basePlayers WHERE power >= $1 ORDER BY RANDOM() LIMIT $2`,
      [minRating,count]
    );

    const players = result.rows;
    for(let i = 0 ; i < count;i++){
      // Check if the user already exists for the provided userId
      const existingUser = await pool.query(
        `SELECT * FROM onlinePlayers WHERE userId = $1 and baseId = $2`,
        [userId,players[i].id]
      );

      if (existingUser.rows.length > 0) {
        // If user exists, increase cardCount
        await pool.query(
          `UPDATE onlinePlayers SET cardCount = cardCount + 1 WHERE userId = $1 and baseId = $2`,
          [userId,players[i].id]
        );
      } else {

        await pool.query(
          `INSERT INTO onlinePlayers (baseId, userID, level, cardCount) VALUES ($1, $2, $3, $4)`,
          [players[i].id, userId, 1, 1]
        );

      }

    }

    res.json(players);
  } catch (error) {
    console.error('Error fetching and adding players:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});










/*

Tactics sayfasi için:
get all players (id) => {}//Okkes Alp
get current formation (id) => [{},{},{},{}...] //Okkes Alp

Market için:
Openpackage (userId,Package type)
  Casual Rare Legend //Sergen OmerCan



BasePlayers to DB //Alp Omer DONE

SinglePlayer Mode
playMatch(userID, rakip takim) //Omer(hoca) //Alp

Multiplayer Mode
playMatch(userID, rakip takim) //Omer(hoca) //Alp

*/