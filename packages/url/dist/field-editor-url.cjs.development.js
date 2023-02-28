'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');
var fieldEditorShared = require('@contentful/field-editor-shared');
var f36Components = require('@contentful/f36-components');

function UrlEditor(props) {
  var field = props.field;
  return React.createElement(fieldEditorShared.FieldConnector, {
    field: field,
    isInitiallyDisabled: props.isInitiallyDisabled
  }, function (_ref) {
    var value = _ref.value,
        errors = _ref.errors,
        disabled = _ref.disabled,
        setValue = _ref.setValue;
    return React.createElement("div", {
      "data-test-id": "url-editor"
    }, React.createElement(f36Components.TextInput, {
      isRequired: field.required,
      isInvalid: errors.length > 0,
      isDisabled: disabled,
      value: value || '',
      onChange: function onChange(e) {
        setValue(e.target.value);
      }
    }), typeof props.children === 'function' ? props.children({
      value: value
    }) : null);
  });
}
UrlEditor.defaultProps = {
  isInitiallyDisabled: true
};

exports.UrlEditor = UrlEditor;
//# sourceMappingURL=field-editor-url.cjs.development.js.map
