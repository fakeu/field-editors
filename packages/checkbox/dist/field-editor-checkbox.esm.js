import { useState, createElement, Fragment } from 'react';
import { css, cx } from 'emotion';
import get from 'lodash-es/get';
import { PredefinedValuesError, FieldConnector } from '@contentful/field-editor-shared';
import { Form, Box, Checkbox, TextLink } from '@contentful/f36-components';
import tokens from '@contentful/f36-tokens';
import { nanoid } from 'nanoid';

var form = /*#__PURE__*/css({
  marginTop: tokens.spacingS
});
var rightToLeft = /*#__PURE__*/css({
  direction: 'rtl'
});
var invalidText = /*#__PURE__*/css({
  color: tokens.red500,
  marginLeft: tokens.spacing2Xs
});
var removeBtn = /*#__PURE__*/css({
  marginLeft: tokens.spacingL
});

function isEmptyListValue(value) {
  return value === null || value.length === 0;
}

function getOptions(field, id) {
  // Get first object that has a 'in' property
  var validations = get(field, ['items', 'validations'], []);
  var predefinedValues = validations.filter(function (validation) {
    return validation["in"];
  }).map(function (validation) {
    return validation["in"];
  });
  var firstPredefinedValues = predefinedValues.length > 0 ? predefinedValues[0] : [];
  return firstPredefinedValues.map(function (value, index) {
    return {
      // Append a random id to distinguish between checkboxes opened in two editors (e.g. slide-in)
      id: ['entity', field.id, field.locale, index, id].join('.'),
      value: value,
      label: value
    };
  });
}

var getInvalidValues = function getInvalidValues(field, values, options) {
  var getValueFromOptions = options.map(function (item) {
    return item.value;
  });
  var invalidValues = values.filter(function (value) {
    return !getValueFromOptions.includes(value);
  }).map(function (value, index) {
    return {
      id: ['entity', field.id, field.locale, index, 'invalid'].join('.'),
      label: value,
      invalid: true,
      value: value
    };
  });
  return invalidValues;
};

function CheckboxEditor(props) {
  var _useState = useState(function () {
    return nanoid(6);
  }),
      id = _useState[0];

  var field = props.field,
      locales = props.locales;
  var options = getOptions(field, id);
  var misconfigured = options.length === 0;

  if (misconfigured) {
    return createElement(PredefinedValuesError, null);
  }

  var direction = locales.direction[field.locale] || 'ltr';
  return createElement(FieldConnector, {
    throttle: 0,
    isEmptyValue: isEmptyListValue,
    field: field,
    isInitiallyDisabled: props.isInitiallyDisabled
  }, function (_ref) {
    var disabled = _ref.disabled,
        value = _ref.value,
        setValue = _ref.setValue;
    var values = value || [];

    var addValue = function addValue(value) {
      var newValues = [].concat(values.filter(function (item) {
        return item !== value;
      }), [value]);
      setValue(newValues);
    };

    var removeValue = function removeValue(value) {
      var newValues = values.filter(function (item) {
        return item !== value;
      });
      setValue(newValues);
    };

    var invalidValues = getInvalidValues(field, values, options);
    var mergedOptions = [].concat(options, invalidValues);
    return createElement(Form, {
      testId: "checkbox-editor",
      className: cx(form, direction === 'rtl' ? rightToLeft : '')
    }, mergedOptions.map(function (item) {
      return createElement(Box, {
        key: item.id,
        marginBottom: "spacingS"
      }, createElement(Checkbox, {
        key: item.id,
        id: item.id,
        isChecked: values.includes(item.value),
        isDisabled: disabled,
        value: item.value,
        name: field.id + "." + field.locale,
        onChange: function onChange(e) {
          if (e.target.checked) {
            addValue(item.value);
          } else {
            removeValue(item.value);
          }
        }
      }, item.label), item.invalid && createElement(Fragment, null, createElement("span", {
        "data-test-id": "invalid-text",
        className: invalidText
      }, "(invalid)"), createElement(TextLink, {
        as: "button",
        className: removeBtn,
        onClick: function onClick() {
          return removeValue(item.value);
        }
      }, "Remove")));
    }));
  });
}
CheckboxEditor.defaultProps = {
  isInitiallyDisabled: true
};

export { CheckboxEditor };
//# sourceMappingURL=field-editor-checkbox.esm.js.map
