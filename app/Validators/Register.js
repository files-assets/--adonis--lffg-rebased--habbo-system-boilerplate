'use strict'

const got = use('got')

class Register {
  get validateAll () {
    return true
  }

  // Habbo API Validation
  async authorize () {
    const { request, response, session } = this.ctx

    try {
      const { body } = await got('https://www.habbo.com.br/api/public/users', {
        query: { name: request.input('username') },
        cache: false,
        json: true
      })

      if (body.motto !== session.get('habbo_token')) {
        session.flash({ danger: 'O código de confirmação não foi verificado (não está na sua missão).' }).flashAll()

        return response.redirect('back')
      }

      return true

    } catch (error) {
      const errorBody = await error.response.body

      session.flashAll()

      if (errorBody.error === 'not-found') {
        session.flash({ danger: `O usuário ${request.input('username')} não existe no Habbo PT/BR.` })
      } else {
        session.flash({ danger: 'Houve um erro ao conectar-se à API do Habbo.' })
      }

      return response.redirect('back')
    }
  }

  get rules () {
    return {
      username: 'required|unique:users,username',
      password: 'required|min:3|same:password_confirm',
      password_confirm: 'required|min:3|same:password'
    }
  }

  get messages () {
    return {
      'username.required'         : 'O nome de usuário é obrigatório para registrar um novo usuário.',
      'username.unique'           : 'Este nome de usuário já está em uso.',
      'password.required'         : 'A senha é obrigatória para registrar um novo usuário.',
      'password.min'              : 'A senha requer, no mínimo, 3 dígitos.',
      'password.same'             : 'As senhas não coincidem.',
      'password_confirm.required' : 'A confirmação de senha é obrigatória.',
      'password_confirm.min'      : 'A senha requer, no mínimo, 3 dígitos.',
      'password_confirm.same'     : 'As senhas não coincidem.'
    }
  }

  async fails (errorMessages) {
    this.ctx.session.withErrors(errorMessages).flashAll()
    this.ctx.response.redirect('back')
  }
}

module.exports = Register
