'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var React = require('react');
var fieldEditorShared = require('@contentful/field-editor-shared');
var emotion = require('emotion');
var isEqual = _interopDefault(require('lodash/isEqual'));
var f36Components = require('@contentful/f36-components');

function _extends() {
  _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends.apply(this, arguments);
}

var rightToLeft = /*#__PURE__*/emotion.css({
  direction: 'rtl'
});

function isEmptyListValue(value) {
  return value === null || value.length === 0;
}

function ListEditor(props) {
  var field = props.field,
      locales = props.locales;
  var direction = locales.direction[field.locale] || 'ltr';
  return React.createElement(fieldEditorShared.FieldConnector, {
    throttle: 0,
    isEmptyValue: isEmptyListValue,
    field: field,
    isInitiallyDisabled: props.isInitiallyDisabled
  }, function (childProps) {
    return React.createElement(ListEditorInternal, _extends({}, childProps, {
      direction: direction,
      isRequired: field.required
    }));
  });
}

function ListEditorInternal(_ref) {
  var setValue = _ref.setValue,
      value = _ref.value,
      errors = _ref.errors,
      disabled = _ref.disabled,
      direction = _ref.direction,
      isRequired = _ref.isRequired;

  var _React$useState = React.useState(function () {
    return (value || []).join(', ');
  }),
      valueState = _React$useState[0],
      setValueState = _React$useState[1];

  var onChange = function onChange(e) {
    var valueAsArray = e.target.value.split(',').map(function (item) {
      return item.trim();
    }).filter(function (item) {
      return item;
    });
    var changed = !isEqual(valueAsArray, value);
    setValue(valueAsArray);
    var valueAsString = valueAsArray.join(', ');
    setValueState(changed ? valueAsString : e.target.value);
  };

  return React.createElement(f36Components.TextInput, {
    testId: "list-editor-input",
    className: direction === 'rtl' ? rightToLeft : '',
    isRequired: isRequired,
    isInvalid: errors.length > 0,
    isDisabled: disabled,
    value: valueState,
    onChange: onChange
  });
}

ListEditor.defaultProps = {
  isInitiallyDisabled: true
};

exports.ListEditor = ListEditor;
//# sourceMappingURL=field-editor-list.cjs.development.js.map
