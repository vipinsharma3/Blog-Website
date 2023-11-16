import fs from "fs";
import path from "path";
import admin from "firebase-admin";
import express from "express";
import "dotenv/config";
import {db, connectToDb} from "./db.js";

import {fileURLToPath} from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const credentials = JSON.parse(fs.readFileSync("./credentials.json"));
admin.initializeApp({
  credential: admin.credential.cert(credentials),
});

const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, "../build")));

app.get(/^(?!\/api).+/, (req, res) => {
  res.sendFile(path.join(__dirname, "../build/index.html"));
});

app.use(async (req, res, next) => {
  const {authtoken} = req.headers;

  if (authtoken) {
    try {
      req.user = await admin.auth().verifyIdToken(authtoken);
    } catch (e) {
      return res.sendStatus(400);
    }
  }

  req.user = req.user || {};
  next();
});

app.get("/api/articles/:name", async (req, res) => {
  const {name} = req.params;
  const {uid} = req.user;

  const article = await db.collection("article").findOne({name});
  if (article) {
    const upvotedIds = article.upvotedIds || [];
    article.canUpvote = uid && !upvotedIds.includes(uid);
    res.json(article);
  } else {
    res.sendStatus(404);
  }
});

app.use((req, res, next) => {
  if (req.user) {
    next();
  } else {
    res.sendStatus(401);
  }
});

app.put("/api/articles/:name/upvote", async (req, res) => {
  const {name} = req.params;
  const {uid} = req.user;

  const article = await db.collection("article").findOne({name});
  if (article) {
    const upvotedIds = article.upvotedIds || [];
    const canUpvote = uid && !upvotedIds.includes(uid);
    if (canUpvote) {
      await db.collection("article").updateOne(
        {name},
        {
          $inc: {upvote: 1},
          $push: {upvotedIds: uid},
        }
      );
    }
    const updatedArticle = await db.collection("article").findOne({name});
    res.json(updatedArticle);
  } else {
    res.send(`The article doesn't exist.`);
  }
});

app.post("/api/articles/:name/comments", async (req, res) => {
  const {name} = req.params;
  const {postedBy, text} = req.body;
  await db.collection("article").updateOne(
    {name},
    {
      $push: {comments: {postedBy, text}},
    }
  );

  const article = await db.collection("article").findOne({name});
  if (article) {
    res.json(article);
  } else {
    res.send("The Article does not exist");
  }
});

const PORT = process.env.PORT || 8000;

connectToDb(() => {
  console.log("Successfully Connected");
  app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}`);
  });
});
