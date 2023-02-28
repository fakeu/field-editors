'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var React = require('react');
var fieldEditorShared = require('@contentful/field-editor-shared');
var emotion = require('emotion');
var tokens = _interopDefault(require('@contentful/f36-tokens'));
var f36Components = require('@contentful/f36-components');

var validationRow = /*#__PURE__*/emotion.css({
  display: 'flex',
  justifyContent: 'space-between',
  fontSize: tokens.fontSizeM,
  marginTop: tokens.spacingXs,
  color: tokens.gray700
});
var rightToLeft = /*#__PURE__*/emotion.css({
  direction: 'rtl'
});

function isSupportedFieldTypes(val) {
  return val === 'Symbol' || val === 'Text';
}

function SingleLineEditor(props) {
  var field = props.field,
      locales = props.locales;

  if (!isSupportedFieldTypes(field.type)) {
    throw new Error("\"" + field.type + "\" field type is not supported by SingleLineEditor");
  }

  var constraints = fieldEditorShared.ConstraintsUtils.fromFieldValidations(field.validations, field.type);
  var checkConstraint = fieldEditorShared.ConstraintsUtils.makeChecker(constraints);
  var direction = locales.direction[field.locale] || 'ltr';
  return React.createElement(fieldEditorShared.FieldConnector, {
    field: field,
    isInitiallyDisabled: props.isInitiallyDisabled
  }, function (_ref) {
    var value = _ref.value,
        errors = _ref.errors,
        disabled = _ref.disabled,
        setValue = _ref.setValue;
    return React.createElement("div", {
      "data-test-id": "single-line-editor"
    }, React.createElement(f36Components.TextInput, {
      className: direction === 'rtl' ? rightToLeft : '',
      isRequired: field.required,
      isInvalid: errors.length > 0,
      isDisabled: disabled,
      value: value || '',
      onChange: function onChange(e) {
        setValue(e.target.value);
      }
    }), props.withCharValidation && React.createElement("div", {
      className: validationRow
    }, React.createElement(fieldEditorShared.CharCounter, {
      value: value || '',
      checkConstraint: checkConstraint
    }), React.createElement(fieldEditorShared.CharValidation, {
      constraints: constraints
    })), props.withCharValidation === false && React.createElement("div", {
      className: validationRow
    }, React.createElement(fieldEditorShared.CharCounter, {
      value: value || '',
      checkConstraint: function checkConstraint() {
        return true;
      }
    })));
  });
}
SingleLineEditor.defaultProps = {
  isInitiallyDisabled: true,
  withCharValidation: true
};

exports.SingleLineEditor = SingleLineEditor;
//# sourceMappingURL=field-editor-single-line.cjs.development.js.map
