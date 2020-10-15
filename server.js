const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
const bodyParser = require("body-parser");
const fileUpload = require("express-fileUpload");
const MongoClient = require("mongodb").MongoClient;
const ObjectId = require("mongodb").ObjectID;

const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());
app.use(express.static("doctors"));
app.use(fileUpload());

app.get("/", (req, res) => {
  res.send("Welcome Backhand");
});

app.listen(PORT, () => {
  console.log(`Server is running ${"http://localhost:5000/"}`);
});

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.qebvf.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

client.connect((err) => {
  const courseCollection = client.db("creativeAgency").collection("course");
  const serviceCollection = client.db("creativeAgency").collection("service");
  console.log("Database is connected");

  app.post("/addService", (req, res) => {
    console.log(req.body);
    const file = req.files.file;
    const service = req.body.service;
    const description = req.body.description;
    const newImg = file.data;
    const encImg = newImg.toString("base64");

    const image = {
      contentType: req.files.file.mimetype,
      size: req.files.file.size,
      img: Buffer.from(encImg, "base64"),
    };

    console.log(image);

    // serviceCollection.insertOne({ name, email, image }).then((result) => {
    //   res.send(result.insertedCount > 0);
    // });
  });
});
