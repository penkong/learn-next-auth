const { check } = require('express-validator')

exports.userSignupValidator = [
  check('name').not().isEmpty().withMessage('name is required'),
  check('email').isEmail().withMessage('must be valid email'),
  check('password')
    .isLength({ min: 6 })
    .withMessage('password must be at least 6 characters long')
]

exports.userSigninValidator = [
  check('email').isEmail().withMessage('must be valid email'),
  check('password')
    .isLength({ min: 6 })
    .withMessage('password must be at least 6 characters long')
]
