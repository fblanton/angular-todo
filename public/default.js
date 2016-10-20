const todo = angular.module('todo', [])
const URL = 'http://localhost:7000/todos'

todo.controller('HomeController', HomeController)

todo.$inject = ['$http', '$timeout']

function HomeController($http, $timeout) {
  const vm = this

  vm.message = 'Get Doing It'
  vm.complete = 'DONE!'
  vm.remaining = remaining
  vm.todos = []
  vm.newTodo = { completed: false, task: '' }
  vm.toggle = toggleTodo
  vm.post = post
  vm.error = '';

  loadTodos()

  function loadTodos() {
    $http.get(URL)
      .success(res => vm.todos = res)
  }

  function toggleTodo(todo) {
    todo.completed = !todo.completed
    $http.put(URL + '/' + todo._id, { completed: todo.completed })
      .then(({ data }) =>{
        if (!data) {
          todo.completed = !todo.completed
          vm.error = 'Unable to Update Status on Server'
          $timeout(() => vm.error = '', 2000)
        }}
      )
      .catch(() => {
        vm.error = 'Unable to Update Status on Server'
        $timeout(() => vm.error = '', 2000)
        todo.completed = !todo.completed
      })
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
