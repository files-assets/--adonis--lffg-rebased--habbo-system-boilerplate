'use strict'

class ProfileController {
  getProfile ({ request, view }) {
    const { user } = request

    return view.render('pages.profile.profile', {
      page_title: 'Meu Perfil',
      user: user.toJSON()
    })
  }

  postProfile () {
    return 'postado'
  }
}

module.exports = ProfileController
