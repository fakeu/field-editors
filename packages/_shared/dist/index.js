
'use strict'

if (process.env.NODE_ENV === 'production') {
  module.exports = require('./field-editor-shared.cjs.production.min.js')
} else {
  module.exports = require('./field-editor-shared.cjs.development.js')
}
