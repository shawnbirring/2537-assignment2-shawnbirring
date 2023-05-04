import { connectToDatabase } from "../../../utils/db";
const bcrypt = require("bcrypt");

export async function POST(request: Request) {
  const { MONGO_COLLECTION } = process.env;

  const { db } = await connectToDatabase();
  const collection = db.collection(MONGO_COLLECTION);

  const { username, password } = await request.json();
  const user = await collection.findOne({ username });
  const passwordMatch = await bcrypt.compare(password, user.password);
  if (user && passwordMatch) {
    return new Response(
      JSON.stringify({ message: "Login successful", name: user.name }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } else {
    return new Response(
      JSON.stringify({ message: "Invalid username or password" }),
      { status: 401, headers: { "Content-Type": "application/json" } }
    );
  }
}
