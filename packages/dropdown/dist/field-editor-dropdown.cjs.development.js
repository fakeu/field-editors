'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');
var fieldEditorShared = require('@contentful/field-editor-shared');
var nanoid = require('nanoid');
var emotion = require('emotion');
var f36Components = require('@contentful/f36-components');

function parseValue(value, fieldType) {
  if (value === '') {
    return undefined;
  }

  if (fieldType === 'Integer' || fieldType === 'Number') {
    var asNumber = Number(value);
    return isNaN(asNumber) ? undefined : asNumber;
  }

  return value;
}
function getOptions(field) {
  // Get first object that has a 'in' property
  var validations = field.validations || [];
  var predefinedValues = validations.filter(function (validation) {
    return validation["in"];
  }).map(function (validation) {
    return validation["in"];
  });
  var firstPredefinedValues = predefinedValues.length > 0 ? predefinedValues[0] : [];
  return firstPredefinedValues.map(function (value) {
    return {
      id: nanoid.nanoid(6),
      value: parseValue(value, field.type),
      label: String(value)
    };
  }).filter(function (item) {
    return item.value !== undefined;
  });
}

var rightToLeft = /*#__PURE__*/emotion.css({
  direction: 'rtl'
});

function DropdownEditor(props) {
  var field = props.field,
      locales = props.locales;
  var options = getOptions(field);
  var misconfigured = options.length === 0;

  if (misconfigured) {
    return React.createElement(fieldEditorShared.PredefinedValuesError, null);
  }

  var direction = locales.direction[field.locale] || 'ltr';
  return React.createElement(fieldEditorShared.FieldConnector, {
    throttle: 0,
    field: field,
    isInitiallyDisabled: props.isInitiallyDisabled
  }, function (_ref) {
    var value = _ref.value,
        errors = _ref.errors,
        disabled = _ref.disabled,
        setValue = _ref.setValue;
    return React.createElement(f36Components.Select, {
      testId: "dropdown-editor",
      isInvalid: errors.length > 0,
      isDisabled: disabled,
      className: direction === 'rtl' ? rightToLeft : '',
      isRequired: field.required,
      value: value === undefined ? '' : String(value),
      onChange: function onChange(e) {
        var value = e.target.value;
        setValue(parseValue(value, field.type));
      }
    }, React.createElement(f36Components.Select.Option, {
      value: ""
    }, "Choose a value"), options.map(function (option) {
      return React.createElement(f36Components.Select.Option, {
        key: option.value,
        value: String(option.value)
      }, option.label);
    }));
  });
}
DropdownEditor.defaultProps = {
  isInitiallyDisabled: true
};

exports.DropdownEditor = DropdownEditor;
exports.getOptions = getOptions;
exports.parseValue = parseValue;
//# sourceMappingURL=field-editor-dropdown.cjs.development.js.map
