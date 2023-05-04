import { MongoClient } from "mongodb";

const { MONGODB_HOST, MONGODB_USER, MONGODB_PASSWORD, MONGODB_DATABASE } =
  process.env;

const clusterConnect = `mongodb+srv://${MONGODB_USER}:${MONGODB_PASSWORD}@${MONGODB_HOST}/?retryWrites=true`;

let cachedDb = null;

export async function connectToDatabase() {
  if (cachedDb) {
    return { client: cachedDb, db: cachedDb.db(MONGODB_DATABASE) };
  }

  const client = new MongoClient(clusterConnect, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  await client.connect();
  cachedDb = client;

  return { client, db: client.db(MONGODB_DATABASE) };
}
