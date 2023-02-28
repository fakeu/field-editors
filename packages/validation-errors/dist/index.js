
'use strict'

if (process.env.NODE_ENV === 'production') {
  module.exports = require('./field-editor-validation-errors.cjs.production.min.js')
} else {
  module.exports = require('./field-editor-validation-errors.cjs.development.js')
}
