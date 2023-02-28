import { createElement } from 'react';
import { ConstraintsUtils, FieldConnector, CharCounter, CharValidation } from '@contentful/field-editor-shared';
import { css } from 'emotion';
import tokens from '@contentful/f36-tokens';
import { TextInput } from '@contentful/f36-components';

var validationRow = /*#__PURE__*/css({
  display: 'flex',
  justifyContent: 'space-between',
  fontSize: tokens.fontSizeM,
  marginTop: tokens.spacingXs,
  color: tokens.gray700
});
var rightToLeft = /*#__PURE__*/css({
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

  var constraints = ConstraintsUtils.fromFieldValidations(field.validations, field.type);
  var checkConstraint = ConstraintsUtils.makeChecker(constraints);
  var direction = locales.direction[field.locale] || 'ltr';
  return createElement(FieldConnector, {
    field: field,
    isInitiallyDisabled: props.isInitiallyDisabled
  }, function (_ref) {
    var value = _ref.value,
        errors = _ref.errors,
        disabled = _ref.disabled,
        setValue = _ref.setValue;
    return createElement("div", {
      "data-test-id": "single-line-editor"
    }, createElement(TextInput, {
      className: direction === 'rtl' ? rightToLeft : '',
      isRequired: field.required,
      isInvalid: errors.length > 0,
      isDisabled: disabled,
      value: value || '',
      onChange: function onChange(e) {
        setValue(e.target.value);
      }
    }), props.withCharValidation && createElement("div", {
      className: validationRow
    }, createElement(CharCounter, {
      value: value || '',
      checkConstraint: checkConstraint
    }), createElement(CharValidation, {
      constraints: constraints
    })), props.withCharValidation === false && createElement("div", {
      className: validationRow
    }, createElement(CharCounter, {
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

export { SingleLineEditor };
//# sourceMappingURL=field-editor-single-line.esm.js.map
