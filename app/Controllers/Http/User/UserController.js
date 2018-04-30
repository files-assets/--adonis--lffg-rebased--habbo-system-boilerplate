'use strict'

const User = use('App/Models/User')

class UserController {
  async index ({ request, view }) {
    const { user } = request
    const users = await User.all()

    return view.render('pages.users.users', {
      page_title: 'Usuários',
      currentUser: user.toJSON(),
      users: users.toJSON()
    })
  }

  async show ({ request }) {
    const { view } = request.all()

    return `<h1>Vendo perfil de: ${view}.</h1>`
  }

  edit () {

  }
}

module.exports = UserController
