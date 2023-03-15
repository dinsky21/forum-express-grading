const { Restaurant, Category } = require('../models')

const adminController = {

  getRestaurants: (cb) => {
    Restaurant.findAll({
      raw: true,
      nest: true,
      include: [Category]
    })
      .then(restaurants => cb(null,{ restaurants }))
      .catch(err => cb(err))
  },
}

module.exports = adminController