let User = require('../models/user')
const shortId = require('shortid')
const jwt = require('jsonwebtoken')
const expressJwt = require('express-jwt')

exports.signup = (req, res) => {
  const { name, email, password } = req.body

  User.findOne({ email }).exec((err, user) => {
    if (user) {
      return res.status(400).json({
        error: 'Email is taken'
      })
    }

    let username = shortId.generate()
    let profile = `${process.env.CLIENT_URL}/profile/${username}`

    let newUser = new User({ name, email, password, profile, username })
    newUser.save((err, success) => {
      if (err) {
        return res.status(400).json({
          error: err
        })
      }
      res.json({
        message: 'Signup success! Please signin.'
      })
    })
  })
}

exports.signin = (req, res) => {
  //
  const { email, password } = req.body
  User.findOne({ email }).exec((err, user) => {
    if (err || !user)
      return res
        .status(400)
        .json({ error: 'user with that email does not exist , go signup' })

    if (!user.authenticate(password))
      return res.status(400).json({ error: 'wrong credentials' })

    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: '1d'
    })

    res.cookie('token', token, { expiresIn: '1d' })
    const { _id, username, name, email, role } = user
    return res.json({ token, user: { _id, username, name, email, role } })
  })
}

exports.signout = (req, res) => {
  res.clearCookie('token')
  res.json({ message: 'sign out success' })
}

// middleware
exports.requireSignIn = expressJwt({
  secret: process.env.JWT_SECRET,
  algorithms: ['sha1', 'RS256', 'HS256']
})
