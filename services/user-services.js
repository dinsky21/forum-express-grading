const bcrypt = require('bcryptjs')
const { Followship, Like, Restaurant, Favorite, User, Comment } = require('../models')
const { imgurFileHandler } = require('../helpers/file-helpers')
const helper = require('../helpers/auth-helpers')

const userController = {
	signUp: (req, cb) => {
		if (req.body.password !== req.body.passwordCheck) throw new Error('Passwords do not match!')
    User.findOne({ where: { email: req.body.email } })
      .then(email => {
        if (email) throw new Error('Email already exists!')
        return bcrypt.hash(req.body.password, 10)
      })
      .then(hash => User.create({
        name: req.body.name,
        email: req.body.email,
        password: hash
      }))
      .then(() => {createdUser => cb(null, { createdUser })
      }).catch(err => cb(err))
	}
}

module.exports = userController
