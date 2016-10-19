const todo = angular.module('todo', [])

todo.controller('HomeController', HomeController)

function HomeController() {
  const vm = this

  vm.message = 'Get Doing Now'
  vm.complete = 'DONE!'
  vm.remaining = remaining
  vm.toggle = todo => todo.completed = !todo.completed
  vm.todos = [
    {completed: false, task: 'Do Something'},
    {completed: true, task: 'Do More'},
    {completed: false, task: 'Finish'}
  ]

  function remaining() {
    return vm.todos.reduce((current, next) =>
      (!next.completed) ? current + 1 : current,
      0
    )
  }
}
