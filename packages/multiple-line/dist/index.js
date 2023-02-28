
'use strict'

if (process.env.NODE_ENV === 'production') {
  module.exports = require('./field-editor-multiple-line.cjs.production.min.js')
} else {
  module.exports = require('./field-editor-multiple-line.cjs.development.js')
}
