'use strict'

class LogoutController {
  async index ({ response, auth, session }) {
    if (auth.user) {
      await auth.logout()
      session.flash({ success: 'Usuário desconectado.' })
    } else {
      session.flash({ danger: 'Você já está desconectado.' })
    }

    return response.redirect('/session/login')
  }
}

module.exports = LogoutController
