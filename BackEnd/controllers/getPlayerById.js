const { pool } = require('./playerController');

async function getPlayerById(req, res) {
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
			[playerId],
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
			cardCount: player.cardcount,
		};

		res.status(200).json({ player: playerInfo });
	} catch (error) {
		console.error('Error loading player information', error);
		res.status(500).send('Database error');
	}
}
