import { NextResponse } from "next/server";
import { connectToDatabase } from "../../../utils/db";
const bcrypt = require("bcrypt");

export async function POST(request: Request) {
  const { MONGO_COLLECTION } = process.env;

  const { client, db } = await connectToDatabase();
  const collection = db.collection(MONGO_COLLECTION);

  const { name, username, password } = await request.json();
  const hashedPassword = await bcrypt.hash(password, 12);
  const result = await collection.insertOne({
    name,
    username,
    password: hashedPassword,
    admin: false,
  });

  client.close();
  if (!result) {
    console.log("Error while inserting data");
    return NextResponse.json(
      { message: "Error with insertion" },
      { status: 500 }
    );
  }
  return NextResponse.json({ insertedId: result.insertedId });
}
