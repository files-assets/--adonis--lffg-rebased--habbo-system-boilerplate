'use strict'

const { hooks } = require('@adonisjs/ignitor')
const moment = require('moment')

// View providers:
hooks.after.providersRegistered(() => {
  const View = use('View')

  View.global('currentTime', function () {
    return Date.now()
  })

  View.global('moment', function (...args) {
    return moment(...args)
  })
})
