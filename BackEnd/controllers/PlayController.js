const { Pool } = require('pg');
const connectionString = process.env.CONNECTION_URL;
const pool = new Pool({ connectionString });


// Define a route to get the leagues
const getLeagues = (req, res) => {
	pool.query('SELECT DISTINCT league, leaguelogo FROM teams ORDER BY league ASC', (error, results) => {
	  if (error) {
		res.status(500).send('Error fetching leagues from database');
	  } else {
		const leagues = results.rows;
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
  
	pool.query('SELECT * FROM teams WHERE league = $1 ORDER BY team_name ASC', [league], (error, results) => {
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


  const playOnlineMatch = async (req, res) =>{
    const{userId, opponentId} = req.body;
    console.log(userId,opponentId)

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
    const attPower = calculateTotalAtt(result.rows.slice(0, 3));
    //console.log(result.rows.slice(0, 3));
    const midPower = calculateTotalMid(result.rows.slice(3, 6));
    //console.log(result.rows.slice(3, 6));

    const defPower = calculateTotalDef(result.rows.slice(6, 10));
    //console.log(result.rows.slice(6, 10));

    const gkPower = result.rows[10].gk;
    //console.log(result.rows[10]);



    const userTeamPower = attPower+midPower+defPower+gkPower;
    const userGoal = Math.floor((Math.random()*userTeamPower/100));
    
    
    
    const resultOpponent = await pool.query(
      `SELECT formation.positionId, formation.playerId, basePlayers.*, onlinePlayers.*
       FROM formation
       JOIN onlinePlayers ON formation.playerId = onlinePlayers.id
       JOIN basePlayers ON onlinePlayers.baseId = basePlayers.id
       WHERE formation.userId = $1
       ORDER BY formation.positionId`,
      [opponentId]
    );

    if (resultOpponent.rows.length === 0) {
      res.status(404).send('Formation not found for the specified user');
      return;
    }
    const attPowerOpponent = calculateTotalAtt(resultOpponent.rows.slice(0, 3));
    //console.log(result.rows.slice(0, 3));
    const midPowerOpponent = calculateTotalMid(resultOpponent.rows.slice(3, 6));
    //console.log(result.rows.slice(3, 6));

    const defPowerOpponent = calculateTotalDef(resultOpponent.rows.slice(6, 10));
    //console.log(result.rows.slice(6, 10));

    const gkPowerOpponent = resultOpponent.rows[10].gk;
    //console.log(result.rows[10]);
    
    
    const opponentPower = attPowerOpponent+midPowerOpponent+defPowerOpponent+gkPowerOpponent;
    const opponentGoal = Math.floor((Math.random()*opponentPower/100));
    
    

    const matchResult = {
      userGoal: userGoal,
      opponentGoal: opponentGoal,
      result: userGoal > opponentGoal ? "WIN": userGoal == opponentGoal ? "DRAW" : "LOSE",
      userTeamPower:userTeamPower,
      opponentTeamPower: opponentPower,
  };

  res.status(200).json(matchResult);


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

    const userTeam = `
        SELECT * FROM formation
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

                pool.query(bestGoalkeeperQuery, [team], async (err, goalkeeper) => {
                    if (err) {
                        console.error('Error selecting best goalkeeper', err);
                        res.status(500).send('Database error');
                        return;
                    }
                    const teamPowerValue = calculateTotalAtt(attackers.rows) + calculateTotalDef(defenders.rows) + calculateTotalMid(midfielders.rows)+goalkeeper.rows[0].gk
                    

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
                      const attPower = calculateTotalAtt(result.rows.slice(0, 3));
                      //console.log(result.rows.slice(0, 3));
                      const midPower = calculateTotalMid(result.rows.slice(3, 6));
                      //console.log(result.rows.slice(3, 6));

                      const defPower = calculateTotalDef(result.rows.slice(6, 10));
                      //console.log(result.rows.slice(6, 10));

                      const gkPower = result.rows[10].gk;
                      //console.log(result.rows[10]);



                      const userTeamPower = attPower+midPower+defPower+gkPower;
                      const userGoal = Math.floor((Math.random()*userTeamPower/100));
                      const opponentGoal = Math.floor((Math.random()*teamPowerValue/100));

                      const bestPlayers = {
                        userGoal: userGoal,
                        opponentGoal: opponentGoal,
                        result: userGoal > opponentGoal ? "WIN": userGoal == opponentGoal ? "DRAW" : "LOSE",
                        userTeamPower:userTeamPower,
                        opponentTeamPower: teamPowerValue,
                        attackers: attackers.rows,
                        midfielders: midfielders.rows,
                        defenders: defenders.rows,
                        goalkeeper: goalkeeper.rows[0],
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
    playSingleMatch,
    playOnlineMatch
};
