'use strict'

class NotAuth {
  async handle ({ response, session, auth }, next) {
    if (auth.user) {
      session.flash({ danger: 'Você já está logado.' })
      return response.redirect('/')
    }
    
    return next()
  }
}

module.exports = NotAuth
