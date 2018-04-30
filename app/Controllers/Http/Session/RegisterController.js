'use strict'

const User = use('App/Models/User')

class RegisterController {
  index ({ view, session }) {
    const random = Math.floor(Math.floor(Math.random() * 99999) + 10000)
    session.put('habbo_token', `SYS-Conf-${random}`)
    
    return view.render('pages.session.register', {
      page_title: 'Registro',
      habbo_token: session.get('habbo_token')
    })
  }

  async post ({ request, session, response }) {
    const { username, password } = request.all()

    try {
      const user = new User()

      user.username = username
      user.password = password

      await user.save()

      session.flash({ success: `Usuário ${username} criado com sucesso!` })
      return response.redirect('/session/login')
    } catch (error) {
      session.flash({ danger: 'Houve um erro ao salvar o usuário na base de dados.' })
      return response.redirect('back')
    }
  }
}

module.exports = RegisterController
