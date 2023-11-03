const { Pool } = require('pg');
const connectionString = process.env.CONNECTION_URL;
const pool = new Pool({ connectionString });


// Define a route to get the leagues
const getLeagues = (req, res) => {
	pool.query('SELECT DISTINCT league FROM teams', (error, results) => {
	  if (error) {
		res.status(500).send('Error fetching leagues from database');
	  } else {
		const leagues = results.rows.map(row => row.league);
		res.json(leagues);
	  }
	});
  }
  
  
  // Define a route to get teams by league
  const getTeams = (req, res) => {
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
  }
  function calculateTotalAtt(players) {
    return players.reduce((total, player) => total + player.att, 0);
  }
  function calculateTotalMid(players) {
    return players.reduce((total, player) => total + player.mid, 0);
  }
  function calculateTotalDef(players) {
    return players.reduce((total, player) => total + player.def, 0);
  }

  const playSingleMatch = (req, res) => {
    const { team, userId } = req.params;

    // Selecting the 3 best attackers (ATT) for the given team
    const bestAttackersQuery = `
        SELECT * FROM basePlayers
        WHERE Team = $1 AND Position = 'ATT'
        ORDER BY ATT DESC
        LIMIT 3
    `;
    
    // Selecting the 3 best midfielders (MID) for the given team
    const bestMidfieldersQuery = `
        SELECT * FROM basePlayers
        WHERE Team = $1 AND Position = 'MID'
        ORDER BY MID DESC
        LIMIT 3
    `;

    // Selecting the 4 best defenders (DEF) for the given team
    const bestDefendersQuery = `
        SELECT * FROM basePlayers
        WHERE Team = $1 AND Position = 'DEF'
        ORDER BY DEF DESC
        LIMIT 4
    `;

    // Selecting the best goalkeeper (GK) for the given team
    const bestGoalkeeperQuery = `
        SELECT * FROM basePlayers
        WHERE Team = $1 AND Position = 'GK'
        ORDER BY GK DESC
        LIMIT 1
    `;

    pool.query(bestAttackersQuery, [team], (err, attackers) => {
        if (err) {
            console.error('Error selecting best attackers', err);
            res.status(500).send('Database error');
            return;
        }

        pool.query(bestMidfieldersQuery, [team], (err, midfielders) => {
            if (err) {
                console.error('Error selecting best midfielders', err);
                res.status(500).send('Database error');
                return;
            }

            pool.query(bestDefendersQuery, [team], (err, defenders) => {
                if (err) {
                    console.error('Error selecting best defenders', err);
                    res.status(500).send('Database error');
                    return;
                }

                pool.query(bestGoalkeeperQuery, [team], (err, goalkeeper) => {
                    if (err) {
                        console.error('Error selecting best goalkeeper', err);
                        res.status(500).send('Database error');
                        return;
                    }

                    const bestPlayers = {
                        attackers: attackers.rows,
                        midfielders: midfielders.rows,
                        defenders: defenders.rows,
                        goalkeeper: goalkeeper.rows[0],
                        teamPower: calculateTotalAtt(attackers.rows) + calculateTotalDef(defenders.rows) + calculateTotalMid(midfielders.rows)+goalkeeper.rows[0].gk

                    };

                    res.status(200).json(bestPlayers);
                });
            });
        });
    });
};

module.exports = {
	getLeagues,
    getTeams,
    playSingleMatch
};
