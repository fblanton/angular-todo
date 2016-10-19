const todo = angular.module('todo', [])

todo.controller('HomeController', HomeController)

todo.$inject = ['$http']

function HomeController($http) {
  const vm = this

  vm.message = 'Get Doing Now'
  vm.complete = 'DONE!'
  vm.remaining = remaining
  vm.toggle = todo => todo.completed = !todo.completed

  $http.get('http://localhost:7000/todos')
    .success(res => vm.todos = res)

  function remaining() {
    return (vm.todos)
      ? vm.todos.filter(todo => !todo.completed).length
      : null
  }
}
