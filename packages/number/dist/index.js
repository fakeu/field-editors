
'use strict'

if (process.env.NODE_ENV === 'production') {
  module.exports = require('./field-editor-number.cjs.production.min.js')
} else {
  module.exports = require('./field-editor-number.cjs.development.js')
}
