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

function MultipleLineEditor(props) {
  var field = props.field,
      locales = props.locales,
      isInitiallyDisabled = props.isInitiallyDisabled,
      withCharValidation = props.withCharValidation;
  var constraints = fieldEditorShared.ConstraintsUtils.fromFieldValidations(field.validations, field.type);
  var checkConstraint = fieldEditorShared.ConstraintsUtils.makeChecker(constraints);
  var direction = locales.direction[field.locale] || 'ltr';
  return React.createElement(fieldEditorShared.FieldConnector, {
    field: field,
    isInitiallyDisabled: isInitiallyDisabled
  }, function (_ref) {
    var errors = _ref.errors,
        disabled = _ref.disabled,
        value = _ref.value,
        setValue = _ref.setValue;
    return React.createElement("div", {
      "data-test-id": "multiple-line-editor"
    }, React.createElement(f36Components.Textarea, {
      className: direction === 'rtl' ? rightToLeft : '',
      rows: 3,
      isRequired: field.required,
      isInvalid: errors.length > 0,
      isDisabled: disabled,
      value: value || '',
      onChange: function onChange(e) {
        setValue(e.target.value);
      }
    }), withCharValidation && React.createElement("div", {
      className: validationRow
    }, React.createElement(fieldEditorShared.CharCounter, {
      value: value || '',
      checkConstraint: checkConstraint
    }), React.createElement(fieldEditorShared.CharValidation, {
      constraints: constraints
    })), !withCharValidation && React.createElement("div", {
      className: validationRow
    }, React.createElement(fieldEditorShared.CharCounter, {
      value: value || '',
      checkConstraint: function checkConstraint() {
        return true;
      }
    })));
  });
}
MultipleLineEditor.defaultProps = {
  isInitiallyDisabled: true,
  withCharValidation: true
};

exports.MultipleLineEditor = MultipleLineEditor;
//# sourceMappingURL=field-editor-multiple-line.cjs.development.js.map
