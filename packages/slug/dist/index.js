
'use strict'

if (process.env.NODE_ENV === 'production') {
  module.exports = require('./field-editor-slug.cjs.production.min.js')
} else {
  module.exports = require('./field-editor-slug.cjs.development.js')
}
