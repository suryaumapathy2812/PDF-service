
'use strict'

if (process.env.NODE_ENV === 'production') {
  module.exports = require('./pdf-service.cjs.production.min.js')
} else {
  module.exports = require('./pdf-service.cjs.development.js')
}
