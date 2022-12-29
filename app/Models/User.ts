import { DateTime } from 'luxon'
import { uuid } from 'uuid'
import Hash from '@ioc:Adonis/Core/Hash'
import { column, beforeSave, BaseModel, beforeCreate } from '@ioc:Adonis/Lucid/Orm'

export default class User extends BaseModel {
  public static connection = 'pg'

  @column({ isPrimary: true, serializeAs: null })
  public id: number

  @column({ isPrimary: false, serializeAs: 'id' })
  public id_nav: string

  @column()
  public name: string

  @column()
  public username: string

  @column()
  public email: string

  @column()
  public locale: string

  @column({ serializeAs: null })
  public password: string

  @column()
  public rememberMeToken: string | null

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @beforeSave()
  public static async hashPassword(user: User) {
    if (user.$dirty.password) {
      user.password = await Hash.make(user.password)
    }
  }
  @beforeCreate()
  public static assignUuid(user: User) {
    user.id_nav = uuid()
  }
}
