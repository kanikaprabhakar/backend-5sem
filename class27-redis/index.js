const express = require('express');
const app = express();
const PORT = 5000;
const client = require('./client.js');
const { default: axios } = require('axios');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));



app.get('/', async (req, res) => {
    let data = await client.set("users:1", "kanika");
    // let data2 = await client.set("users:1", "kanika gupta",{"NX":true});
    client.expire("users:1", 5);

    let result1 = await client.get("users:1");
    res.json({result1, data});
});


app.get('/mset', async (req, res) => {
    let res1 = await client.mset([
        "users:2", "john",
        "users:3", "doe",
        "users:4", "alice"
    ]);
    let data = await client.mget(["users:1", "users:2", "users:3", "users:4"]);
    res.json(data);

});


app.get("/test", async (req, res) => {
    let data = await client.get("photos");
    if(data){
        return res.json({data: JSON.parse(data)});
    }
    let resut= await axios.get("https://jsonplaceholder.typicode.com/photos");
    let res2 = await client.set("photos", JSON.stringify(resut.data));
    client.expire("photos", 7);
    res.json(resut.data);
});


app.get("/list", async (req, res) => {
    const res1 = await client.lpush("frameworks", "reactjs");
    const res2 = await client.lpush("frameworks", "vuejs");
    const res3 = await client.lpush("frameworks", "angularjs");

    const alldata = await client.lrange("frameworks", 0, -1);
    const data1 = await client.lpop("frameworks");


    res.json(alldata);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
