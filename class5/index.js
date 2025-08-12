const express = require('express');
const app = express();
require('dotenv').config();
const port = 3000;
const {MongoClient} = require("mongodb");
const client = new MongoClient(process.env.dburl);
let collection;

app.use(express.json());

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

app.post('/user', async (req, res) => {
    const { name, age, languages } = req.body;
    let data = await collection.insertOne({
        name: name,
        age: age,
        languages: languages
    });
    res.status(201).json(data);
});


app.post('/user/bulk', async (req, res) => {
    const {users} = req.body;
    let data = await collection.insertMany(users);
    res.status(201).json(data);
});

app.delete('/user/:id', async (req, res) => {
    const { id } = req.params;
    // const result = await collection.deleteOne({name : "kanika"});
    // const result = await collection.deleteOne({_id: 'ObjectId("${id}")'});
    // const result = await collection.deleteOne({_id: new MongoClient.ObjectId(id)});
    res.status(204).json({result, message:"User deleted successfully"});
});


app.get("/user/all", async (req, res) => {
    let data = await collection.find({}).toArray();
    res.status(200).json(data);
});


app.put("/user/update", async (req, res) => {
    try{
        const result = await collection.updateOne({name: "John Doe"}, {$set: {name: "updated name", age: 35}});
        res.status(200).json({result, message: "User updated successfully"});
    } catch (error) {
        res.status(500).json({error: "Failed to update user"});
    }
});

app.listen(port, () => {
    db().then(() => {
        console.log("Connected to MongoDB");
    }).catch((err) => {
        console.error("Error connecting to MongoDB:", err);
    });

  console.log(`Server is running on http://localhost:${port}`);
});
