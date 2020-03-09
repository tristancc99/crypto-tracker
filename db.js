const pg = require("pg");
const uuidv4 = require("uuid");
const { Client } = pg;
const client = new Client(
  process.env.DATABASE_URL || "postgres://localhost/crypto_db"
);

client.connect();

const sync = async () => {
  const SQL = `
    DROP TABLE IF EXISTS tracking;
    CREATE TABLE tracking(
      id INTEGER PRIMARY KEY,
      name VARCHAR NOT NULL UNIQUE
    );

  `;
  client.query(SQL);
};

const getTrackees = async () => {
  const SQL = "SELECT * FROM tracking";
  const response = await client.query(SQL);
  return response.rows;
};

const newTrackee = async (id, name) => {
  const SQL = "INSERT INTO tracking(id, name) VALUES($1, $2) returning *";
  return (await client.query(SQL, [id, name])).rows[0];
};

const removeTrackee = async id => {
  const SQL = "DELETE FROM tracking WHERE id=$1";
  return await client.query(SQL, [id]);
};

// const createUser = async user => {
//   const SQL = "INSERT INTO users(name) values($1) returning *"
//   return (await client.query(SQL, [user.name])).rows[0]
// }

// const createThing = async thing => {
//   const SQL = "INSERT INTO things(name) values($1) returning *"
//   return (await client.query(SQL, [thing.name])).rows[0]
// }

// const createUserThing = async userThing => {
//   const SQL =
//     'INSERT INTO user_things("thingId", "userId") values($1, $2) returning *'
//   return (await client.query(SQL, [userThing.thingId, userThing.userId]))
//     .rows[0]
// }

// const readUsers = async () => {
//   const SQL = "SELECT * from users"
//   return (await client.query(SQL)).rows
// }

// const readThings = async () => {
//   const SQL = "SELECT * from things"
//   return (await client.query(SQL)).rows
// }

// const readUserThings = async () => {
//   const SQL = "SELECT * from user_things"
//   return (await client.query(SQL)).rows
// }

// const destroyUserThing = async id => {
//   const SQL = "DELETE FROM user_things where id= $1"
//   await client.query(SQL, [id])
// }

// const destroyUser = async id => {
//   const SQL = "DELETE FROM users where id= $1"
//   await client.query(SQL, [id])
// }

// const destroyThing = async id => {
//   const SQL = "DELETE FROM things where id= $1"
//   await client.query(SQL, [id])
// }

module.exports = {
  sync,
  getTrackees,
  newTrackee,
  removeTrackee
};
