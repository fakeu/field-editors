
'use strict'

if (process.env.NODE_ENV === 'production') {
  module.exports = require('./field-editor-test-utils.cjs.production.min.js')
} else {
  module.exports = require('./field-editor-test-utils.cjs.development.js')
}
