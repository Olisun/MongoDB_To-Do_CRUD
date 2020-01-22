const MongoClient = require("mongodb").MongoClient;
const ObjectID = require("mongodb").ObjectID;
const dbName = "mongo_db_crud";
const url = "mongodb://localhost:27017";
const mongoOptions = { newUserUrlParser: true };

const state = {
  db: null
};

const connectToMongo = (callback) => {
  if (state.db) {
    callback()
  } else {
    MongoClient.connect(url, mongoOptions, (error, client) => {
      if (error) {
        callback(error);
      } else {
        state.db = client.db(dbName);
        callback();
      }
    });
  }
}

const getPrimaryKey = (_id) => {
  return ObjectID(_id);
}

const getDB = () => {
  return state.db;
}

module.exports = { getDB, connectToMongo, getPrimaryKey };