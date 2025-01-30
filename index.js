const express = require('express');
const app = express();
const port = 3000;

const comments = [];

app.use(express.json());
app.use(express.static('static'));

// routes 

app.get('/comment', (req, res) => { res.json(comments); });

app.post('/comment', (req, res) => {
  console.log(req.body);
  comments.push(req.body.data || "");
  res.json("success");
});

app.listen(port, () => {
  console.log(`Listening on 127.0.0.1:${port}`);
});
