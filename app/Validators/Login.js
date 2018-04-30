'use strict'

class Login {
  get validateAll () {
    return true
  }
  
  get rules () {
    return {
      username: 'required',
      password: 'required'
    }
  }

  get messages () {
    return {
      'username.required': 'Você deve fornecer um nome de usuário para fazer o login.',
      'password.required': 'Você deve fornecer uma senha para fazer o login.'
    }
  }

  async fails (errorMessages) {
    this.ctx.session.withErrors(errorMessages).flashAll()
    this.ctx.response.redirect('back')
  }
}

module.exports = Login
