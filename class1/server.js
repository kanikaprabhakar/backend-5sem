const exprezss = require('express');
const app = exprezss();
const port = 3000;

app.get('/', (req, res) => {
  res.send('Hello, World!');
});
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});