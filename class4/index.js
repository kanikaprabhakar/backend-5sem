const express = require('express');
const app = express();
require('dotenv').config();
const port = 3000;
const {MongoClient} = require("mongodb");
const client = new MongoClient(process.env.dburl);
let collection;
async function db(){
    await client.connect();
    const db = client.db("class4");
    collection = db.collection("users");
    return "done";
}

app.get('/', async (req, res) => {
    // res.send('Hello World!');
    let data = await collection.insertOne({
        name: "John Doe",
        age: 30,
        languages : ["English", "Spanish"]});
        console.log("2");
    res.send(data);
        
});

app.listen(port, () => {
    db().then(() => {
        console.log("Connected to MongoDB");
    }).catch((err) => {
        console.error("Error connecting to MongoDB:", err);
    });

  console.log(`Server is running on http://localhost:${port}`);
});
