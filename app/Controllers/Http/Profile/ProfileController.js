'use strict'

class ProfileController {
  getProfile ({ view }) {
    return view.render('pages.profile.profile', { page_title: 'Meu Perfil' })
  }

  postProfile () {
    return 'postado'
  }
}

module.exports = ProfileController
