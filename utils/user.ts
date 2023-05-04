const client = require("./db");
const bcrypt = require("bcrypt");
const { MONGODB_DATABASE, MONGO_COLLECTION } = process.env;
const userCollection = client.db(MONGODB_DATABASE).collection(MONGO_COLLECTION);

export const getUser = async (username: string, password: string) => {
  const user = await userCollection.findOne({ username });
  if (user) {
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (passwordMatch) {
      return { message: "User found", user };
    } else {
      return { message: "Wrong password" };
    }
  } else {
    return { message: "User not found" };
  }
};

export const createUser = async (
  name: string,
  username: string,
  password: string
) => {
  const saltRounds = 12;
  const hashedPassword = await bcrypt.hash(password, saltRounds);

  const result = await userCollection.insertOne({
    name,
    username,
    password: hashedPassword,
  });

  if (result.insertedCount === 1) {
    return { message: "User created successfully" };
  } else {
    return { message: "Failed to create user" };
  }
};
