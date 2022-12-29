import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class AuthController {
  public async login({ request, response, auth }: HttpContextContract) {
    const { username, password } = request.only(['username', 'password'])
    try {
      const { token } = await auth.use('api').attempt(username, password)
      response.status(200).send({ jwt: token })
    } catch (err) {
      return response.status(err.status || 500).send({
        errors: [
          {
            message: err.message,
          },
        ],
      })
    }
  }
}
