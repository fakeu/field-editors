
'use strict'

if (process.env.NODE_ENV === 'production') {
  module.exports = require('./field-editor-date.cjs.production.min.js')
} else {
  module.exports = require('./field-editor-date.cjs.development.js')
}
