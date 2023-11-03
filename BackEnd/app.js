const express = require('express');
const app = express();
const cors = require('cors');
const { Pool } = require('pg');
require('dotenv').config();

const userRoutes = require('./routes/userRoutes');
const playerRoutes = require('./routes/playerRoutes');

const connectionString = process.env.CONNECTION_URL;
const pool = new Pool({ connectionString });
let client;

async function connectDB() {
	client = await pool.connect();
	console.log('Successfully connected to db!');
}

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', userRoutes);
app.use('/player', playerRoutes);


// Define a route to get the leagues
app.get('/getLeagues', (req, res) => {
	pool.query('SELECT DISTINCT league FROM teams', (error, results) => {
	  if (error) {
		res.status(500).send('Error fetching leagues from database');
	  } else {
		const leagues = results.rows.map(row => row.league);
		res.json(leagues);
	  }
	});
  });
  
  
  // Define a route to get teams by league
  app.get('/getTeams/:league', (req, res) => {
	const { league } = req.params;
  
	if (!league) {
	  res.status(400).send('Bad Request: League parameter is missing');
	  return;
	}
  
	pool.query('SELECT * FROM teams WHERE league = $1', [league], (error, results) => {
	  if (error) {
		res.status(500).send('Error fetching teams from database');
	  } else {
		const teams = results.rows;
		res.json(teams);
	  }
	});
  });

const PORT = 3050;
app.listen(PORT, () => {
	connectDB();
	console.log(`Server is running on http://localhost:${PORT}`);
});
