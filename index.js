const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const urlencodedParser = bodyParser.urlencoded()
const port = 3000;

const comments = [{ data: "Hi! This is a comment" , date: "2025-01-31", job: "SE", bool_question: "No", python: "Python"}];

app.use(express.static('static'));

// routes 

app.get('/comment', (req, res) => { res.json(comments); });

app.post('/comment', urlencodedParser, (req, res) => {
  comments.push(req.body);
  res.redirect(`/comments.html?server-time=${Date.now()}`);
});

app.listen(port, () => {
  console.log(`Listening on 127.0.0.1:${port}`);
});
