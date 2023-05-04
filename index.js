// External dependencies
const express = require("express");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const bcrypt = require("bcrypt");
const dotenv = require("dotenv");
const Joi = require("joi");

// Load environment variables
dotenv.config();

// Constants
const saltRounds = 12;
// const port = process.env.PORT || 3000;
const expireTime = 60 * 60 * 1000;
const {
  MONGODB_DATABASE,
  MONGODB_COLLECTION,
  MONGODB_HOST,
  MONGODB_USER,
  MONGODB_PASSWORD,
  MONGODB_SESSION_SECRET,
  NODE_SESSION_SECRET,
} = process.env;

// Database connection
const client = require("./db");
const userCollection = client
  .db(MONGODB_DATABASE)
  .collection(MONGODB_COLLECTION);

// Express app configuration
const app = express();
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false }));
app.use(express.static(__dirname + "/views"));
app.use(express.static(__dirname + "/public"));

// Session store configuration
const mongoStore = MongoStore.create({
  mongoUrl: `mongodb+srv://${MONGODB_USER}:${MONGODB_PASSWORD}@${MONGODB_HOST}/sessions`,
  crypto: {
    secret: MONGODB_SESSION_SECRET,
  },
});

// Joi schemas for user input validation
const userSchema = Joi.object({
  name: Joi.string().min(3).max(20).required(),
  username: Joi.string().alphanum().min(3).max(20).required(),
  password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")).required(),
});

const loginSchema = Joi.object({
  username: Joi.string().alphanum().min(3).max(20).required(),
  password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")).required(),
});

// Express app session configuration
app.use(
  session({
    secret: NODE_SESSION_SECRET,
    store: mongoStore,
    saveUninitialized: false,
    resave: true,
  })
);

async function handleLogin(username, password, req) {
  const { error } = loginSchema.validate({ username, password });
  if (error) {
    return { redirectTo: "/login?error=3" };
  }
  const user = await userCollection.findOne({ username });

  if (user) {
    const match = await bcrypt.compare(password, user.password);
    if (match) {
      req.session.user = user;
      req.session.authenticated = true;
      req.session.cookie.maxAge = expireTime;
      console.log("Password correct");
      return { redirectTo: "/members" };
    } else {
      console.log("Password incorrect");
      return { redirectTo: "/login?error=1" };
    }
  } else {
    console.log("User not found");
    return { redirectTo: "/login?error=2" };
  }
}

app.get("/", (req, res) => {
  res.render("home");
});

app.get("/login", (req, res) => {
  if (req.session.authenticated) {
    console.log("User already logged in, redirecting to members page");
    res.redirect("/members");
    return;
  }
  const error = req.query.error;
  res.render("login", { error });
});

app.get("/signup", (req, res) => {
  if (req.session.authenticated) {
    console.log("User already logged in, redirecting to members page");
    res.redirect("/members");
    return;
  }
  const error = req.query.error;
  res.render("signup", { error });
});

app.get("/members", (req, res) => {
  if (!req.session.authenticated) {
    console.log("User not logged in, redirecting to login page");
    res.redirect("/login");
    return;
  }
  const alert = req.query.alert;
  res.render("members", { user: req.session.user, alert });
});

app.get("/logout", (req, res) => {
  req.session.destroy();
  console.log("User logged out, session destroyed");
  res.redirect("/");
});

app.get("/admin", async (req, res) => {
  if (!req.session.authenticated) {
    console.log("User not logged, redirecting to login page");
    res.redirect("/login");
    return;
  }
  if (req.session.user.userType !== "admin") {
    console.log("User not admin, redirecting to members page");
    res.redirect("/members?alert=1");
    return;
  }

  const users = await userCollection.find({}).toArray();

  const error = req.query.error;
  res.render("admin", { user: req.session.user, users, error });
});

app.post("/admin/promote", async (req, res) => {
  const { usernameToPromote } = req.body;
  const result = await userCollection.updateOne(
    { username: usernameToPromote },
    { $set: { userType: "admin" } }
  );
  if (result.matchedCount === 0) {
    console.log("Error promoting user");
    const error = 1;
    const users = await userCollection.find({}).toArray();
    res.render("admin", { user: req.session.user, users, error });
    return;
  } else {
    console.log("User promoted");
    res.redirect("/admin");
    return;
  }
});

app.post("/admin/demote", async (req, res) => {
  const { usernameToDemote } = req.body;
  const result = await userCollection.updateOne(
    { username: usernameToDemote },
    { $set: { userType: "user" } }
  );
  if (result.matchedCount === 0) {
    console.log("Error demoting user");
    const users = await userCollection.find({}).toArray();
    const error = 2;
    res.render("admin", { user: req.session.user, users, error });
    return;
  } else {
    console.log("User demoted");
    res.redirect("/admin");
    return;
  }
});

app.post("/submitLogin", async (req, res) => {
  const { username, password } = req.body;
  const response = await handleLogin(username, password, req);
  res.redirect(response.redirectTo);
});

app.post("/submitSignup", async (req, res) => {
  const error = userSchema.validate(req.body).error;
  console.log(error);
  if (error) {
    res.redirect("/signup?error=3");
    return;
  }
  const { name, username, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  await userCollection.insertOne({
    name,
    username,
    password: hashedPassword,
    userType: "user",
  });
  console.log("User created");

  const response = await handleLogin(username, password, req);
  res.redirect(response.redirectTo);
});

app.get("*", (req, res) => {
  res.render("404");
});

// app.listen(port, () => {
//   console.log(`Server running on port ${port}`);
// });
module.exports = app;
