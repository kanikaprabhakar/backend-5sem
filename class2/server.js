const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

app.get('/', (req, res) => {
    const r = {
        name: 'John Doe',
        age: 30,
    }
    // res.status(200).send('Data received successfully');
    res.status(201).json(r);
//   res.send('Hello, World!');
});

app.post('/data', (req, res) => {
    console.log('Received data:', req.body);
    const r = {
        name: 'John Doe',
        age: 30,
    }
    // res.status(200).send('Data received successfully');
    res.status(201).json(r);
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});