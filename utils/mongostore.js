const {
  MONGODB_DATABASE,
  MONGODB_HOST,
  MONGODB_USER,
  MONGODB_PASSWORD,
  MONGODB_SESSION_SECRET,
  NODE_SESSION_SECRET,
} = process.env;
// Session store configuration
const mongoStore = MongoStore.create({
  mongoUrl: `mongodb+srv://${MONGODB_USER}:${MONGODB_PASSWORD}@${MONGODB_HOST}/sessions`,
  crypto: {
    secret: MONGODB_SESSION_SECRET,
  },
});
