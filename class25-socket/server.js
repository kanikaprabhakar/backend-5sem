
const express = require('express');
const app = express();
const PORT = 5000;
const http = require('http');
const server = http.createServer(app);
const socket = require('socket.io');
const io = socket(server); // client connection
const path = require('path');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

io.on('connection', (client)=>{
    console.log("u1 connected",client.id);
    
    client.emit("first","hello from server");

    client.on("notice",(data)=>{
        console.log("socket",data);
    })
});




server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
