const todo = angular.module('todo', [])

todo.controller('HomeController', HomeController)

function HomeController() {
  const vm = this

  vm.message = 'Get Doing'
}
