const { Pool } = require('pg');
const connectionString = process.env.CONNECTION_URL;
const pool = new Pool({ connectionString });

const getAllPlayers = async (req, res) => {
	const { userID } = req.params;

	pool.query(
		`SELECT op.id as onlinePlayerId, op.baseid, op.userid, op.level, op.cardcount, bp.*
     FROM basePlayers bp
     JOIN onlinePlayers op  ON op.baseid = bp.id
     WHERE op.userid = $1 order by bp.power desc`,
		[userID],
		(error, result) => {
			if (error) {
				console.error('Error executing query', error);
				res.status(500).json({ error: 'Internal Server Error' });
				return;
			}

			const players = result.rows;
			res.json(players);

		},
	);

};

const buyPlayer = async (req, res) => {
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
			return res.status(400).json({ message: 'Geçersiz tür sağlandı' });
	}

	try {
		const playerMoney = await pool.query(
			`SELECT money FROM users WHERE userid = $1`,
			[userId],
		);

		const money = playerMoney.rows[0];

		if (Number(money.money) < price) {
			res.json({ error: 'Not enough money' });
			return;
		} else {
			await pool.query(
				`UPDATE users SET money = money - $2 WHERE userId = $1`,
				[userId, price],
			);
		}

		const result = await pool.query(
			`SELECT * FROM basePlayers WHERE power >= $1 ORDER BY RANDOM() LIMIT $2`,
			[minRating, count],
		);

		const players = result.rows;
		for (let i = 0; i < count; i++) {
			const existingUser = await pool.query(
				`SELECT * FROM onlinePlayers WHERE userId = $1 and baseId = $2`,
				[userId, players[i].id],
			);

			if (existingUser.rows.length > 0) {
				await pool.query(
					`UPDATE onlinePlayers SET cardCount = cardCount + 1 WHERE userId = $1 and baseId = $2`,
					[userId, players[i].id],
				);
			} else {
				await pool.query(
					`INSERT INTO onlinePlayers (baseId, userID, level, cardCount) VALUES ($1, $2, $3, $4)`,
					[players[i].id, userId, 1, 1],
				);
			}
		}

		res.json(players);
	} catch (error) {
		console.error('Error fetching and adding players', error);
		res.status(500).json({ message: 'Internal server error' });
	}
};

const saveFormation = async (req, res) => {
	const { userId, players } = req.body;

  if (!userId || !Array.isArray(players) || players.length < 18) {
		if (players.length < 18) {
			console.error('Error saving formation');
			res.status(400).send('Fill all positions, including substitutes');
		} else {
			res.status(400).send('Invalid Request: Invalid parameters');
		}
		console.log(userId);
		return;
  }

  try {
    await pool.query('DELETE FROM formation WHERE userId = $1', [userId]);
  } catch (error) {
    console.error('Error deleting previous formation records', error);
    res.status(500).send('Database error');
    return;
  }

  try {
    const values = players.map((player, index) => [userId, index + 1, player.onlineplayerid]);

    for (let i = 0; i < 18; i++) {
		const queryText = `INSERT INTO formation (userId, positionId, playerId) VALUES ($1, $2, $3)`;
		await pool.query(queryText, [values[i][0], values[i][1], values[i][2]]);
	}


    res.status(200).send('Formation saved successfully');
  } catch (error) {
    console.error('Error saving formation', error);
    res.status(500).send('Database error');
  }
};


const loadFormation = async (req, res) => {
	const { userId } = req.body;

	if (!userId) {
	  res.status(400).send('Invalid Request: Missing userId');
	  return;
	}

	try {
	  const result = await pool.query(
		`SELECT formation.positionId, formation.playerId, basePlayers.*, onlinePlayers.*
		 FROM formation
		 JOIN onlinePlayers ON formation.playerId = onlinePlayers.id
		 JOIN basePlayers ON onlinePlayers.baseId = basePlayers.id
		 WHERE formation.userId = $1
		 ORDER BY formation.positionId`,
		[userId]
	  );

	  if (result.rows.length === 0) {
		res.status(404).send('Formation not found for the specified user');
		return;
	  }

	  const formation = result.rows.map(row => {
		return {
		  positionId: row.positionid,
		  playerId: row.playerid,
		  name: row.name,
		  position: row.position,
		  power: row.power,
		  att: row.att,
		  mid: row.mid,
		  def: row.def,
		  gk: row.gk,
		  team: row.team,
		  img: row.img,
		  level:row.level,
		  cardCount:row.cardcount
		};
	  });

	  res.status(200).json({ formation });
	} catch (error) {
	  console.error('Error loading formation', error);
	  res.status(500).send('Database error');
	}
  };





const getMoney = async (req, res) => {
	const { userId } = req.params;

	if (!userId) {
		return res.status(400).json({ message: 'userId parameter is missing' });
	}

	try {
		const playerMoney = await pool.query(
			'SELECT money FROM users WHERE userid = $1',
			[userId],
		);

		if (playerMoney.rows.length === 1) {
			const money = playerMoney.rows[ 0 ].money;
			return res.status(200).json({ money });
		} else {
			return res.status(404).json({ message: 'User Not Found' });
		}
	} catch (error) {
		console.error('ERROR: ', error);
		return res.status(500).json({ message: 'Internal Server Error' });
	}
};

const getPlayerById = async (req, res) => {
	const { playerId } = req.params; // Assuming playerId is provided in the request parameters

	if (!playerId) {
	  res.status(400).send('Invalid Request: Missing playerId');
	  return;
	}

	try {
	  const result = await pool.query(
		`SELECT basePlayers.*, onlinePlayers.*
		 FROM onlinePlayers
		 JOIN basePlayers ON onlinePlayers.baseId = basePlayers.id
		 WHERE onlinePlayers.id = $1`,
		[playerId]
	  );

	  if (result.rows.length === 0) {
		res.status(404).send('Player not found for the specified id');
		return;
	  }

	  const player = result.rows[0];

	  const playerInfo = {
		id: player.id,
		name: player.name,
		position: player.position,
		power: player.power,
		att: player.att,
		mid: player.mid,
		def: player.def,
		gk: player.gk,
		team: player.team,
		img: player.img,
		level: player.level,
		cardCount: player.cardcount
	  };

	  res.status(200).json({ player: playerInfo });
	} catch (error) {
	  console.error('Error loading player information', error);
	  res.status(500).send('Database error');
	}
  };



module.exports = {
	getAllPlayers,
	buyPlayer,
	saveFormation,
	getMoney,
	loadFormation,
	getPlayerById
};
