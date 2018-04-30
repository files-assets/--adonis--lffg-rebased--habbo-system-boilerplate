'use strict'

/*
|--------------------------------------------------------------------------
| DatabaseSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

const User = use('App/Models/User')

class DatabaseSeeder {
  async run () {
    const luiz = new User()
    luiz.username = 'luuuiiiz.'
    luiz.password = '123'
    luiz.is_admin = true
    luiz.is_active = true
    await luiz.save()

    const zaswes = new User()
    zaswes.username = 'Zaswes'
    zaswes.password = '456'
    await zaswes.save()
  }
}

module.exports = DatabaseSeeder
