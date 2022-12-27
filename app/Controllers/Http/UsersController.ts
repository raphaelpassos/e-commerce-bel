// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import { HttpContext } from '@adonisjs/core/build/standalone'
import User from 'App/Models/User'

export default class UsersController {
  public async index({ request, response }: HttpContext) {
    const page = request.input('page')
    const per = request.input('per')
    const users = await User.query().paginate(page, per)
    response.status(200).json(users)
  }

  public async show({ params, response }: HttpContext) {
    const user = await User.find(params.id)
    response.status(200).json(user)
  }

  public async store({ request, response }: HttpContext) {
    const user = await User.create(
      request.only(['id_nav', 'name', 'username', 'email', 'password', 'locale'])
    )
    user.save()
    response.status(200).json(user)
  }
  public async update({ params, request, response }: HttpContext) {
    const user = await User.find(params.id)
    if (user) {
      user.merge(request.only(['id_nav', 'name', 'username', 'email', 'password', 'locale']))
      user.save()
    }
    response.status(200).json(user)
  }
  public async destroy({ params, response }: HttpContext) {
    const user = await User.find(params.id)
    if (user) user.delete()
    response.status(200).json({ msg: 'User deleted successfully' })
  }
}
