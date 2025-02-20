import express from 'express';
import cors from 'cors';

const app = express();
const port = 3000;

const comments = [
  {
    username: "admin",
    content: "Hi! This is a comment",
    link: "https://google.com",
  },
  {
    username: "user243",
    content: "XSS in react is hard",
    link: "https://google.com",
  },
  {
    username: "rv8542",
    content: "Homework is due today 2/20",
    link: "https://google.com",
  },
];

// routes 

app.use(cors());
app.use(express.json());

app.get('/comment', (req, res) => { res.json(comments); });

app.post('/comment', (req, res) => {
  comments.push(req.body);
  res.json(comments);
});

app.listen(port, () => {
  console.log(`Listening on 127.0.0.1:${port}`);
});
