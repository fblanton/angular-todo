const { Router } = require('express')
const ObjectId = require('mongodb').ObjectID
const valid = require('./validate')

module.exports = db => {
  const router = new Router()
  const todos = db.collection('todos')

  router.post('/', (req, res, next) => {
    if (!valid('CREATE', req.body)) return res.sendStatus(500)

    let todo = parse(req.body)
    todos
      .insertOne(todo)
      .then(() => res.status(201).json(todo))
      .catch(next)
  })

  router.get('/', (req, res, next) => {
    todos
      .find({})
      .toArray()
      .then(todos => res.json(todos))
      .catch(next)
  })

  return router
}

function parse(todo) {
  todo = Object.assign({}, todo)
  todo.completed = (todo.completed === 'false' || !todo.completed)
    ? false : true
  return todo
}
