const { Router } = require('express')
const ObjectId = require('mongodb').ObjectID

module.exports = db => {
  const router = new Router()
  const todos = db.collection('todos')

  router.get('/', (req, res, next) => {
    todos
      .find({})
      .toArray()
      .then(todos => res.json(todos))
      .catch(next)
  })

  return router
}
