'use strict'

const User = use('App/Models/User')

class InsertUserIntoRequest {
  async handle ({ request, auth }, next) {
    try {
      await auth.check()
      request.user = await User.find(auth.user.id)
    } catch (error) {
      next()
    }

    await next()
  }
}

module.exports = InsertUserIntoRequest
