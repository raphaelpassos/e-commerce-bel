import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.resource('users', 'UsersController').apiOnly()
  Route.post('login', 'AuthController.login')
  Route.resource('products', 'ProductsController').apiOnly()
}).namespace('App/Controllers/Http')
