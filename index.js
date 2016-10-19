const express = require('express')
const { MongoClient } = require('mongodb')

const URI = 'mongodb://localhost:27017/todos-app'
const PORT = 7000

MongoClient.connect(URI, (err, db) => {
  if (err) {
    // eslint-disable-next-line
    console.error(err);
    process.exit(1);
  }

  const app = express()
  app.use(express.static('./public'))

  const todos = db.collection('todos')
  app.get('/todos', (req, res, next) => {
    todos
      .find({})
      .toArray()
      .then(todos => res.json(todos))
      .catch(next)
  })

  app.use((err, req, res, next) => {
    console.error(err);
    res.sendStatus(500);
  })
  app.listen(PORT)
})
