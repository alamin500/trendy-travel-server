const express = require("express");
const MongoClient = require("mongodb").MongoClient;
const cors = require("cors");
require("dotenv").config();
const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
const uri =
  "mongodb+srv://alamin-matlab_2021:gVZPplwupeaQWwOJ@cluster0.2vil1.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

console.log(uri);
app.get("/", (req, res) => {
  res.send("Welcome our tour booking Website!");
  console.log(req);
});
client.connect((err) => {
  const ToursCollection = client.db("tourBookingWebsite").collection("tour");

  const BooksCollection = client.db("tourBookingWebsite").collection("books");
  // perform actions on the collection object

  // Add Services
  app.post("/addServices", async (req, res) => {
    const result = await ToursCollection.insertOne(req.body);
  });

  // Add MyBooks
  app.post("/myBook", async (req, res) => {
    const result = await BooksCollection.insertOne(req.body);
  });

  // Get My books
  app.get("/myBooks/:email", async (req, res) => {
    const result = await BooksCollection.find({
      email: req.params.email,
    }).toArray();
    res.send(result);
  });

  // Get All Books
  app.get("/allBooks", async (req, res) => {
    const result = await BooksCollection.find({}).toArray();
    res.send(result);
  });

  // Delete MyBook
  app.delete("/deleteBook/:id", async (req, res) => {
    console.log(req.params.id);
    const result = await BooksCollection.deleteOne({
      _id: req.params.id,
    });
    res.send(result);
  });

  // Get Services
  app.get("/services", async (req, res) => {
    const result = await ToursCollection.find({}).toArray();
    res.send(result);
  });
  // client.close();
});
app.listen(process.env.PORT || port);
