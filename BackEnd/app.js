const express = require('express');
const app = express();
const cors = require('cors');
const { Pool } = require('pg');
require('dotenv').config();

const userRoutes = require('./routes/userRoutes');
const playerRoutes = require('./routes/playerRoutes');
const PlayRoutes = require('./routes/PlayRoutes');


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
app.use('/play', PlayRoutes);




const PORT = 3050;
app.listen(PORT, () => {
	connectDB();
	console.log(`Server is running on http://localhost:${PORT}`);
});
