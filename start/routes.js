'use strict'

const Route = use('Route')

// Home Page:
Route.any('/', ({ view }) => {
  return view.render('pages.home')
}).middleware('auth')

// Session:
Route.group(() => {

  Route.get('/login', 'Session/LoginController.index').middleware('notAuth')
  Route.post('/login', 'Session/LoginController.post').validator('Login').middleware('notAuth').as('login')

  Route.get('/register', 'Session/RegisterController.index').middleware('notAuth')
  Route.post('/register', 'Session/RegisterController.post').validator('Register').middleware('notAuth').as('register')

  Route.get('/logout', 'Session/LogoutController.index')

}).prefix('/session')

// Only logged users:
Route.group(() => {

  Route.get('/profile', 'Profile/ProfileController.getProfile')
  Route.post('/profile', 'Profile/ProfileController.postProfile').as('profile')
  
}).middleware('auth')
