
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
  vm.create = create
  vm.error = '';

  loadTodos()

  function loadTodos() {
    dataservice.readAll()
      .then(todos => vm.todos = todos)
      .catch(() => showError('Server Error: Unable to Load Todos.'))
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
    return vm.todos.reduce((_, { completed }) => _+ Number(!completed), 0)
  }
}

angular
  .module('todo')
  .directive('todoItem', todoItem)

function todoItem() {
  return {
    restrict: 'E',
    scope: { todo: '=' },
    template: template(),
    controller: TodoItemController,
    controllerAs: 'vm'
  }

  function template() {
    return `
    <span ng-class="{strike: todo.completed}" ng-click="vm.toggle(todo)">
      {{todo.task}}
    </span>
    `
  }
}

angular
  .module('todo')
  .controller('TodoItemController', TodoItemController)

TodoItemController.$inject = ['dataservice']

function TodoItemController(dataservice) {
  vm = this
  vm.toggle = toggleTodo

  function toggleTodo(todo) {
    dataservice.updateOne(todo, { completed: !todo.completed })
      .then(() => todo.completed = !todo.completed)
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
