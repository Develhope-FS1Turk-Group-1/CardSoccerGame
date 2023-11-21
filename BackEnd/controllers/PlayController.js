const { Pool } = require("pg");
const connectionString = process.env.CONNECTION_URL;
const pool = new Pool({ connectionString });

// Define a route to get the leagues
const getLeagues = (req, res) => {
  pool.query(
    "SELECT DISTINCT league, leaguelogo FROM teams ORDER BY league ASC",
    (error, results) => {
      if (error) {
        res.status(500).send("Error fetching leagues from database");
      } else {
        const leagues = results.rows;
        res.json(leagues);
      }
    }
  );
};

// Define a route to get teams by league
const getTeams = (req, res) => {
  const { league } = req.params;

  if (!league) {
    res.status(400).send("Bad Request: League parameter is missing");
    return;
  }

  pool.query(
    "SELECT * FROM teams WHERE league = $1 ORDER BY team_name ASC",
    [league],
    (error, results) => {
      if (error) {
        res.status(500).send("Error fetching teams from database");
      } else {
        const teams = results.rows;
        res.json(teams);
      }
    }
  );
};
function calculateTotalAtt(players) {
  return players.reduce((total, player) => total + player.att, 0);
}
function calculateTotalMid(players) {
  return players.reduce((total, player) => total + player.mid, 0);
}
function calculateTotalDef(players) {
  return players.reduce((total, player) => total + player.def, 0);
}

const updateUserXpAndMoney = async (userId, result) => {
  let userXpIncrease;
  let userMoneyIncrease;

  if (result === "WIN") {
    userXpIncrease = 150;
    userMoneyIncrease = 10;
  } else if (result === "DRAW") {
    userXpIncrease = 75;
    userMoneyIncrease = 5;
  } else if (result === "LOSE") {
    userXpIncrease = 30;
    userMoneyIncrease = 3;
  }

  const query = `
    UPDATE users
    SET xp = xp + $1, money = money + $2
    WHERE userid = $3
  `;

  const values = [userXpIncrease, userMoneyIncrease, userId];

  try {
    await pool.query(query, values);
    console.log(
      `The XP of the user with ID number ${userId} has been increased by ${userXpIncrease}, and their money has been increased by ${userMoneyIncrease}.`
    );
  } catch (error) {
    console.error(error);
  }
};



async function getPlayerIdByUsername(username) {
  console.log(username, "username check");
  try {
    const query = 'SELECT userid FROM users WHERE username = $1';
    const result = await pool.query(query, [username]);

    console.log(result.rows);


    if (result.rows.length > 0) {
      return result.rows[0].userid;
    }
    else {
      return null; // If no user found with that username
    }
  }
  catch (e) {
    console.log("Couldnt get username by id");
  }
}

const calculateTeamPower = async (userId) => {
  const result = await pool.query(
    `SELECT formation.positionId, formation.playerId, basePlayers.*, onlinePlayers.*
       FROM formation
       JOIN onlinePlayers ON formation.playerId = onlinePlayers.id
       JOIN basePlayers ON onlinePlayers.baseId = basePlayers.id
       WHERE formation.userid = $1
       ORDER BY formation.positionId`,
    [userId]
  );

  if (result.rows.length === 0) {
    return 0;
  }
  const attPower = calculateTotalAtt(result.rows.slice(0, 3));
  //console.log(result.rows.slice(0, 3));
  const midPower = calculateTotalMid(result.rows.slice(3, 6));
  //console.log(result.rows.slice(3, 6));
  const defPower = calculateTotalDef(result.rows.slice(6, 10));
  //console.log(result.rows.slice(6, 10));
  const gkPower = result.rows[10].gk;
  //console.log(result.rows[10]);

  const teamPower = attPower + midPower + defPower + gkPower;

  return {
    teamPower: teamPower,
    attPower: attPower,
    midPower: midPower,
    defPower: defPower,
    gkPower: gkPower
  };
}


const teamPower = async (req, res) => {
  const { userId } = req.params;
  const userTeamPower = await calculateTeamPower(userId);
  res.status(200).json(userTeamPower);
};



const playOnlineMatch = async (req, res) => {
  const { userId, username } = req.body;
  console.log(userId, username);
  const opponentId = await getPlayerIdByUsername(username);


  const userTeamPower = await calculateTeamPower(userId);
  const userGoal = Math.floor((Math.random() * userTeamPower) / 100);


  const opponentPower = await calculateTeamPower(opponentId);
  const opponentGoal = Math.floor((Math.random() * opponentPower) / 100);

  const matchResult = {
    userGoal: userGoal,
    opponentGoal: opponentGoal,
    result:
      userGoal > opponentGoal
        ? "WIN"
        : userGoal == opponentGoal
          ? "DRAW"
          : "LOSE",
    userTeamPower: userTeamPower,
    opponentTeamPower: opponentPower,
  };

  updateUserXpAndMoney(userId, matchResult.result);

  res.status(200).json(matchResult);
};

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
      console.error("Error selecting best attackers", err);
      res.status(500).send("Database error");
      return;
    }

    pool.query(bestMidfieldersQuery, [team], (err, midfielders) => {
      if (err) {
        console.error("Error selecting best midfielders", err);
        res.status(500).send("Database error");
        return;
      }

      pool.query(bestDefendersQuery, [team], (err, defenders) => {
        if (err) {
          console.error("Error selecting best defenders", err);
          res.status(500).send("Database error");
          return;
        }

        pool.query(bestGoalkeeperQuery, [team], async (err, goalkeeper) => {
          if (err) {
            console.error("Error selecting best goalkeeper", err);
            res.status(500).send("Database error");
            return;
          }
          const teamPowerValue =
            calculateTotalAtt(attackers.rows) +
            calculateTotalDef(defenders.rows) +
            calculateTotalMid(midfielders.rows) +
            goalkeeper.rows[0].gk;



          const userTeamPower = await calculateTeamPower(userId);
          const userGoal = Math.floor((Math.random() * userTeamPower) / 100);
          const opponentGoal = Math.floor(
            (Math.random() * teamPowerValue) / 100
          );

          const bestPlayers = {
            userGoal: userGoal,
            opponentGoal: opponentGoal,
            result:
              userGoal > opponentGoal
                ? "WIN"
                : userGoal == opponentGoal
                  ? "DRAW"
                  : "LOSE",
            userTeamPower: userTeamPower,
            opponentTeamPower: teamPowerValue,
            attackers: attackers.rows,
            midfielders: midfielders.rows,
            defenders: defenders.rows,
            goalkeeper: goalkeeper.rows[0],
          };

          updateUserXpAndMoney(userId, bestPlayers.result);

          res.status(200).json(bestPlayers);
        });
      });
    });
  });
};


const addMatchHistory = async (req, res) => {
  const {
    userId,
    opponentId,
    opponentType,
    userGoal,
    opponentGoal,
    result
  } = req.body;

  if (
    userId === undefined ||
    opponentId === undefined ||
    userGoal === undefined ||
    opponentGoal === undefined ||
    result === undefined
  ) {
    res.status(400).send("Missing required fields");
    return;
  }

  try {
    const insertQuery = `
      INSERT INTO game_results (userId, opponentId, opponentType, userGoal, opponentGoal, result)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING *;
    `;

    const values = [
      userId,
      opponentId,
      opponentType,
      userGoal,
      opponentGoal,
      result
    ];

    const result = await pool.query(insertQuery, values);

    if (result.rows.length === 0) {
      res.status(500).send("Failed to save game result");
      return;
    }

    const savedGameResult = result.rows[0];
    res.status(201).json({ gameResult: savedGameResult });
  } catch (error) {
    console.error("Error saving game result", error);
    res.status(500).send("Database error");
  }
};






const getMatchHistoryById = async (req, res) => {
  const userId = req.params.userId;

  if (!userId) {
    res.status(400).send("Missing userId");
    return;
  }

  try {
    const query = `
      SELECT * FROM matchhistory
      WHERE userId = $1
    `;

    const result = await pool.query(query, [userId]);

    if (result.rows.length === 0) {
      res.status(404).send("No game history found for this user");
      return;
    }

    const gameHistory = result.rows;
    res.status(200).json({ history: gameHistory });
  } catch (error) {
    console.error("Error fetching game history", error);
    res.status(500).send("Database error");
  }
};



const getUserById = async (userId) => {

  try {
    const query = `
      SELECT * FROM users
      WHERE userid = $1
    `;

    const result = await pool.query(query, [userId]);

    if (result.rows.length === 0) {
      return null;
    }

    const user = result.rows[0];
    return user;
  } catch (error) {
    console.error("Error fetching user by ID:", error);
    return null;
  }
};



const getAllUsersTeamPowerAndSort = async (req, res) => {
  try {
    // Get distinct userIds from the formation table
    const distinctUserIdsQuery = `
      SELECT DISTINCT userId FROM formation
    `;
    const distinctUserIds = await pool.query(distinctUserIdsQuery);

    if (distinctUserIds.rows.length === 0) {
      return [];
    }

    // Calculate team power for each user
    const usersTeamPower = [];

    for (const user of distinctUserIds.rows) {
      const userId = user.userid;
      const allUserInfo = await getUserById(userId);
      const calculatedAllPower = await calculateTeamPower(userId);
      const userTeamPower = await calculatedAllPower.teamPower; // Replace this with your team power calculation logic

      usersTeamPower.push({
        username: allUserInfo.username,
        userId: userId,
        xp: allUserInfo.xp,
        teamPower: userTeamPower
      });
    }

    // Sort users by their team power in ascending order
    usersTeamPower.sort((a, b) => b.teamPower - a.teamPower);

    res.status(200).json({ usersTeamPower });
  } catch (error) {
    console.error("Error fetching and sorting users' team power:", error);
    res.status(500).send("Database error");
  }
};





module.exports = {
  getLeagues,
  getTeams,
  updateUserXpAndMoney,
  playSingleMatch,
  playOnlineMatch,
  addMatchHistory,
  getMatchHistoryById,
  getAllUsersTeamPowerAndSort,
  teamPower
};
