
'use strict'

if (process.env.NODE_ENV === 'production') {
  module.exports = require('./field-editor-single-line.cjs.production.min.js')
} else {
  module.exports = require('./field-editor-single-line.cjs.development.js')
}
