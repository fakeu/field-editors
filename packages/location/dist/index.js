
'use strict'

if (process.env.NODE_ENV === 'production') {
  module.exports = require('./field-editor-location.cjs.production.min.js')
} else {
  module.exports = require('./field-editor-location.cjs.development.js')
}
