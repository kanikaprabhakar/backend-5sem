const express = require('express');
const app = express();
const path = require('path');


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));


app.get('/', (req, res) => {
  res.send('Hello, World!');
});

app.get('/login', (req, res) => {
  res.redirect('login.html');
});

app.get('/user', (req, res) => {
  try {
    const user = { name: 'John Doe', age: 30, email: 'john@example.com' };
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(3000, () => {
  console.log('http://localhost:3000');
});