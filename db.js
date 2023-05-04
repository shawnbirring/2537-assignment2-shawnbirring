require("dotenv").config();

const { MONGODB_HOST, MONGODB_USER, MONGODB_PASSWORD } = process.env;

const MongoClient = require("mongodb").MongoClient;
const clusterConnect = `mongodb+srv://${MONGODB_USER}:${MONGODB_PASSWORD}@${MONGODB_HOST}/?retryWrites=true`;
const client = new MongoClient(clusterConnect, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

module.exports = client;
