
'use strict'

if (process.env.NODE_ENV === 'production') {
  module.exports = require('./default-field-editors.cjs.production.min.js')
} else {
  module.exports = require('./default-field-editors.cjs.development.js')
}
