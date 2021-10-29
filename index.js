const express = require("express");
const MongoClient = require("mongodb").MongoClient;
const cors = require("cors");
require("dotenv").config();
const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri =
  "mongodb+srv://khair:khair@cluster0.2vil1.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.get("/", (req, res) => {
  res.send("Welcome our tour booking gg ff Website!");
  console.log(req);
});
client.connect((err) => {
  const ToursCollection = client.db("tourBookingWebsite").collection("tour");
  // perform actions on the collection object

  // Add Services
  app.post("/addServices", async (req, res) => {
    console.log(req.body);
    const result = await ToursCollection.insertOne(req.body);
    console.log(result);
  });

  // Get Services
  app.get("/services", async (req, res) => {
    const result = await ToursCollection.find({}).toArray();
    res.send(result);
  });
  // client.close();
});
app.listen(process.env.PORT || port);
