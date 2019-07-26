// The purpose of this module is to bring your Sequelize instance (`db`) together
// with your models (which you should define in separate modules in this directory).

const db = require('./db')

// register models
require('./models')

module.exports = db
