const express = require('express')

const {
  signup,
  signin,
  signout,
  requireSignIn
} = require('../controllers/auth.controller')
const { runValidation } = require('../validators')
const {
  userSignupValidator,
  userSigninValidator
} = require('../validators/auth')

const router = express.Router()

// -------------------

router.post('/signup', userSignupValidator, runValidation, signup)
router.post('/signin', userSigninValidator, runValidation, signin)

router.get('/signout', signout)
router.get('/secret', requireSignIn, (req, res) => {
  res.json({
    message: 'you have accesses'
  })
})

// -------------------

module.exports = router
