'use strict'

const BaseExceptionHandler = use('BaseExceptionHandler')
const View = use('View')
const Env = use('Env')

class ExceptionHandler extends BaseExceptionHandler {
  /**
   * Handle exception thrown during the HTTP lifecycle
   * 
   * @method handle
   */
  async handle ({ code, name, status }, { response }) {
    response.status(status || 500)

    // Handle E_INVALID_SESSION error:
    if (code === 'E_INVALID_SESSION') {
      return this._handleInvalidSession(...arguments)
    }

    // Handle 404 error:
    if (name === 'HttpException' && status === 404) {
      return this._handle404(...arguments)
    }

    // If is in development:
    if (Env.get('NODE_ENV') === 'development') {
      return super.handle(...arguments)
    }

    // Handle 500 error:
    return this._handle500(...arguments)
  }

  /**
   * Handle invalid session error.
   * 
   * @method _handleInvalidSession
   */
  async _handleInvalidSession (error, { response, session }) {
    session.flash({ danger: 'Você foi redirecionado à página de login.' })
    await session.commit()
    return response.redirect('/session/login')
  }

  /**
   * Handle 404 HTTP error.
   * 
   * @method _handle404
   */
  async _handle404 (error, { response }) {
    return response.send(View.render('errors.404'))
  }

  /**
   * Handle 500 HTTP error.
   * 
   * @method _handle500
   */
  async _handle500 ({ message }, { response }) {
    return response.send(View.render('errors.500', { message }))
  }
}

module.exports = ExceptionHandler
