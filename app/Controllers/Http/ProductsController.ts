import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Product from 'App/Models/Product'

export default class ProductsController {
  public async index({ request, response }: HttpContextContract) {
    const page = request.input('page')
    const per = request.input('per')
    const product = await Product.query().paginate(page, per)
    response.status(200).json(product)
  }

  public async show({ params, response }: HttpContextContract) {
    const product = await Product.find(params.id)
    response.status(200).json(product)
  }

  public async store({ request, response }: HttpContextContract) {
    const product = await Product.create(
      request.only(['id_nav', 'name', 'price', 'quantity', 'description', 'validity'])
    )
    product.save()
    response.status(200).json(product)
  }
  public async update({ params, request, response }: HttpContextContract) {
    const product = await Product.find(params.id)
    if (product) {
      product.merge(
        request.only(['id_nav', 'name', 'price', 'quantity', 'description', 'validity'])
      )
      product.save()
    }
    response.status(200).json(product)
  }
  public async destroy({ params, response }: HttpContextContract) {
    const product = await Product.find(params.id)
    if (product) product.delete()
    response.status(200).json({ msg: 'Product deleted successfully' })
  }
}
