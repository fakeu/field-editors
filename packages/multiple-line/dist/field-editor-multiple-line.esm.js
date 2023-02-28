import { createElement } from 'react';
import { ConstraintsUtils, FieldConnector, CharCounter, CharValidation } from '@contentful/field-editor-shared';
import { css } from 'emotion';
import tokens from '@contentful/f36-tokens';
import { Textarea } from '@contentful/f36-components';

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

function MultipleLineEditor(props) {
  var field = props.field,
      locales = props.locales,
      isInitiallyDisabled = props.isInitiallyDisabled,
      withCharValidation = props.withCharValidation;
  var constraints = ConstraintsUtils.fromFieldValidations(field.validations, field.type);
  var checkConstraint = ConstraintsUtils.makeChecker(constraints);
  var direction = locales.direction[field.locale] || 'ltr';
  return createElement(FieldConnector, {
    field: field,
    isInitiallyDisabled: isInitiallyDisabled
  }, function (_ref) {
    var errors = _ref.errors,
        disabled = _ref.disabled,
        value = _ref.value,
        setValue = _ref.setValue;
    return createElement("div", {
      "data-test-id": "multiple-line-editor"
    }, createElement(Textarea, {
      className: direction === 'rtl' ? rightToLeft : '',
      rows: 3,
      isRequired: field.required,
      isInvalid: errors.length > 0,
      isDisabled: disabled,
      value: value || '',
      onChange: function onChange(e) {
        setValue(e.target.value);
      }
    }), withCharValidation && createElement("div", {
      className: validationRow
    }, createElement(CharCounter, {
      value: value || '',
      checkConstraint: checkConstraint
    }), createElement(CharValidation, {
      constraints: constraints
    })), !withCharValidation && createElement("div", {
      className: validationRow
    }, createElement(CharCounter, {
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

export { MultipleLineEditor };
//# sourceMappingURL=field-editor-multiple-line.esm.js.map
