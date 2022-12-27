import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.resource('users', 'UsersController').apiOnly()
}).namespace('App/Controllers/Http/UsersController')
