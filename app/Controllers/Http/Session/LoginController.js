'use strict'

class LoginController {
  index ({ view }) {
    return view.render('pages.session.login', { page_title: 'Login' })
  }

  async post ({ request, response, auth, session }) {
    // Validate data:
    try {
      const { username, password } = request.all()
        
      await auth
        .remember(request.input('remember') === 'on')
        .attempt(username, password)

      session.flash({ success: `Seja bem-vindo novamente, ${auth.user.username}.` })
      return response.redirect('/')
    } catch (error) {
      session.flash({ danger: 'Usuário e/ou senha incorretos ou inexistentes.' })
      return response.redirect('back')
    }
  }
}

module.exports = LoginController
