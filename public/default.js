const todo = angular.module('todo', [])
const URL = 'http://localhost:7000/todos'

todo.controller('HomeController', HomeController)

todo.$inject = ['$http']

function HomeController($http) {
  const vm = this

  vm.message = 'Get Doing It'
  vm.complete = 'DONE!'
  vm.remaining = remaining
  vm.todos = []
  vm.newTodo = { completed: false, task: '' }
  vm.toggle = todo => todo.completed = !todo.completed
  vm.post = post

  loadTodos()

  function loadTodos() {
    $http.get(URL)
      .success(res => vm.todos = res)
  }

  function post() {
    $http.post(URL, vm.newTodo)
      .success(res => {
        vm.newTodo.task = ''
        vm.todos.push(res)
      })
  }

  function remaining() {
    return (vm.todos)
      ? vm.todos.filter(todo => !todo.completed).length
      : null
  }
}
