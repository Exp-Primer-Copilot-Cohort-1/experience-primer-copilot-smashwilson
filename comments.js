// Create web server
const express = require('express');
const app = express();
const port = 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Data
const comments = [
  { id: 1, username: 'John', comment: 'Hello' },
  { id: 2, username: 'Doe', comment: 'Hi' },
  { id: 3, username: 'Jane', comment: 'Good morning' },
];

// Routes
app.get('/comments', (req, res) => {
  res.json(comments);
});

app.get('/comments/:id', (req, res) => {
  const comment = comments.find((c) => c.id === parseInt(req.params.id));
  if (!comment) {
    return res.status(404).send('The comment with the given ID was not found');
  }
  res.json(comment);
});

app.post('/comments', (req, res) => {
  const comment = {
    id: comments.length + 1,
    username: req.body.username,
    comment: req.body.comment,
  };
  comments.push(comment);
  res.json(comment);
});

app.put('/comments/:id', (req, res) => {
  const comment = comments.find((c) => c.id === parseInt(req.params.id));
  if (!comment) {
    return res.status(404).send('The comment with the given ID was not found');
  }
  comment.username = req.body.username;
  comment.comment = req.body.comment;
  res.json(comment);
});

app.delete('/comments/:id', (req, res) => {
  const comment = comments.find((c) => c.id === parseInt(req.params.id));
  if (!comment) {
    return res.status(404).send('The comment with the given ID was not found');
  }
  const index = comments.indexOf(comment);
  comments.splice(index, 1);
  res.json(comment);
});

// Listen
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
