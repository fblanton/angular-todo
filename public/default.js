
const URL = 'http://localhost:7000/todos'

angular
  .module('todo', [])
  .controller('HomeController', HomeController)

HomeController.$inject = ['$timeout', 'dataservice']

function HomeController($timeout, dataservice) {
  const vm = this

  vm.message = 'Get Doing It'
  vm.complete = 'DONE!'
  vm.remaining = remaining
  vm.todos = []
  vm.newTodo = { completed: false, task: '' }
  vm.toggle = toggleTodo
  vm.create = create
  vm.error = '';

  loadTodos()

  function loadTodos() {
    dataservice.readAll()
      .then(todos => vm.todos = todos)
      .catch(() => showError('Server Error: Unable to Load Todos.'))
  }

  function toggleTodo(todo) {
    dataservice.updateOne(todo, { completed: !todo.completed })
      .then(() => todo.completed = !todo.completed)
      .catch(() => {
        showError('Server Error: Unable to Toggle Todo.')
      })
  }

  function showError(text) {
    vm.error = text
    $timeout(() => vm.error = '', 2000)
  }

  function create(todo) {
    dataservice.create(todo)
      .then(res => vm.todos.push(res) && (vm.newTodo.task = ''))
      .catch(() => showError('Server Error: Unable to Create Todo.'))
  }

  function remaining() {
    return (vm.todos)
      ? vm.todos.filter(todo => !todo.completed).length
      : null
  }
}

angular
  .module('todo')
  .factory('dataservice', dataService)

dataService.$inject = ['$http', '$timeout']

function dataService($http, $timeout) {
  return {
    create,
    readAll,
    updateOne
  }

  function create(item) {
    return $http.post(URL, item).then(res => res.data)
  }

  function readAll() {
    return $http.get(URL).then(res => res.data)
  }

  function updateOne(item, update) {
    return $http.put(URL + '/' + item._id, update).then(res => res.data)
  }
}
