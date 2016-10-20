const express = require('express')
const { MongoClient } = require('mongodb')
const todosRoutes = require('./todos-routes')
const errorRoute = require('./error-route')

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
  app.use('/todos', todosRoutes(db))
  app.use(errorRoute)
  app.listen(PORT)
})
