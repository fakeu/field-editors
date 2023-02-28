'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var React = require('react');
var f36Components = require('@contentful/f36-components');
var f36Icons = require('@contentful/f36-icons');
var fieldEditorShared = require('@contentful/field-editor-shared');
var tokens = _interopDefault(require('@contentful/f36-tokens'));
var emotion = require('emotion');

var styles = {
  container: /*#__PURE__*/emotion.css({
    position: 'relative'
  }),
  controlsWrapper: /*#__PURE__*/emotion.css({
    position: 'absolute',
    top: '1px',
    right: '1px',
    width: tokens.spacingL,
    height: 'calc(100% - 2px)',
    display: 'flex',
    flexDirection: 'column'
  }),
  control: /*#__PURE__*/emotion.css({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 0,
    cursor: 'pointer',
    padding: 0,
    margin: 0,
    outline: 'none',
    border: "0 solid " + tokens.gray300,
    background: 'none',
    borderLeftWidth: '1px',
    '&:first-of-type': {
      borderTopRightRadius: tokens.borderRadiusMedium
    },
    '&:last-of-type': {
      borderTopWidth: '1px',
      borderBottomRightRadius: tokens.borderRadiusMedium
    },
    svg: {
      fill: tokens.gray600
    },
    '&:hover': {
      backgroundColor: tokens.gray200
    },
    '&:active': {
      backgroundColor: tokens.gray300
    }
  }),
  input: /*#__PURE__*/emotion.css({
    paddingRight: tokens.spacingXl
  })
};

function parseNumber(value, type) {
  if (Number.isNaN(+value)) {
    return;
  }

  return type === 'Integer' ? parseInt(value, 10) : parseFloat(value);
}
var FLOAT_REGEX = /^[+-]?([0-9]+([.][0-9]*)?|[.][0-9]*)?$/;
var INT_REGEX = /^[+-]?([0-9]*)$/;
function isNumberInputValueValid(value, type) {
  var regex = type === 'Integer' ? INT_REGEX : FLOAT_REGEX;
  return regex.test(value);
}

var getRangeFromField = function getRangeFromField(field) {
  var validations = field.validations || [];
  var result = validations.find(function (validation) {
    return validation.range;
  });
  return result ? result.range : {};
};
var valueToString = function valueToString(value) {
  return value === undefined ? '' : String(value);
};
var countDecimals = function countDecimals(number) {
  var _number$toString$spli, _number$toString$spli2;

  return (_number$toString$spli = (_number$toString$spli2 = number.toString().split('.')[1]) == null ? void 0 : _number$toString$spli2.length) != null ? _number$toString$spli : 0;
};

var StepChangeType;

(function (StepChangeType) {
  StepChangeType["Increment"] = "increment";
  StepChangeType["Decrement"] = "decrement";
})(StepChangeType || (StepChangeType = {}));

var NUMBER_STEP = 1;

function InnerNumberEditor(_ref) {
  var disabled = _ref.disabled,
      errors = _ref.errors,
      field = _ref.field,
      setValue = _ref.setValue,
      sdkValue = _ref.value;

  var _React$useState = React.useState(valueToString(sdkValue)),
      inputValue = _React$useState[0],
      setInputValue = _React$useState[1];

  var range = getRangeFromField(field);
  var inputRef = React.useRef(null);
  React.useEffect(function () {
    var stringSdkValue = valueToString(sdkValue); // Update the input value if the SDK value (numeric) changes

    if (stringSdkValue !== inputValue) {
      setInputValue(stringSdkValue);
    } // eslint-disable-next-line react-hooks/exhaustive-deps -- we want to trigger it only when sdkValue has changed

  }, [sdkValue]);

  var updateExternalValue = function updateExternalValue(value) {
    if (sdkValue !== value) {
      setValue(value);
    }
  };

  var changeValueByStep = function changeValueByStep(type) {
    var currentValue = Number.isNaN(+inputValue) ? 0 : +inputValue;
    var nextValue = type === StepChangeType.Increment ? currentValue + NUMBER_STEP : currentValue - NUMBER_STEP; // Floating point numbers cannot represent all decimals precisely in binary.
    // This can lead to unexpected results, such as 0.1 + 0.2 = 0.30000000000000004.
    // See more details: https://floating-point-gui.de/

    nextValue = +nextValue.toFixed(countDecimals(currentValue));
    setInputValue(valueToString(nextValue));
    setValue(nextValue);
  }; // Keeps focus on the input


  var handleControlPointerDown = function handleControlPointerDown(event) {
    var _inputRef$current;

    event.preventDefault();
    (_inputRef$current = inputRef.current) == null ? void 0 : _inputRef$current.focus();
  };

  var handleKeyDown = function handleKeyDown(event) {
    var keyToFnMap = {
      ArrowUp: function ArrowUp() {
        return changeValueByStep(StepChangeType.Increment);
      },
      ArrowDown: function ArrowDown() {
        return changeValueByStep(StepChangeType.Decrement);
      }
    };
    var fn = keyToFnMap[event.key];

    if (fn) {
      event.preventDefault();
      fn();
    }
  };

  var handleInputChange = function handleInputChange(e) {
    var value = e.target.value;

    if (!value) {
      setInputValue(value);
      updateExternalValue(undefined);
      return;
    }

    if (!isNumberInputValueValid(value, field.type)) {
      return;
    }

    setInputValue(value);
    var parsedNumber = parseNumber(value, field.type);
    field.setInvalid(parsedNumber === undefined);

    if (parsedNumber !== undefined) {
      updateExternalValue(parsedNumber);
    }
  };

  return React.createElement("div", {
    "data-test-id": "number-editor",
    className: styles.container
  }, React.createElement(f36Components.TextInput // With type="number" react doesn't call onChange for certain inputs, for example if you type `e`
  // so we use "text" instead and fully rely on our own validation.
  // See more details: https://github.com/facebook/react/issues/6556
  , {
    // With type="number" react doesn't call onChange for certain inputs, for example if you type `e`
    // so we use "text" instead and fully rely on our own validation.
    // See more details: https://github.com/facebook/react/issues/6556
    type: "text",
    testId: "number-editor-input",
    className: styles.input,
    min: range.min,
    max: range.max,
    isRequired: field.required,
    isInvalid: errors.length > 0,
    isDisabled: disabled,
    value: inputValue,
    ref: inputRef,
    onChange: handleInputChange,
    onKeyDown: handleKeyDown,
    // The same role that input type="number" has
    // See more details: https://www.digitala11y.com/spinbutton-role/
    role: "spinbutton",
    "aria-valuenow": sdkValue != null ? sdkValue : 0,
    "aria-valuetext": inputValue,
    "aria-valuemin": range.min,
    "aria-valuemax": range.max
  }), !disabled && React.createElement("div", {
    className: styles.controlsWrapper,
    "aria-hidden": "true"
  }, React.createElement("button", {
    tabIndex: -1,
    className: styles.control,
    onClick: function onClick() {
      return changeValueByStep(StepChangeType.Increment);
    },
    onPointerDown: handleControlPointerDown
  }, React.createElement(f36Icons.ArrowUpTrimmedIcon, {
    size: "medium"
  })), React.createElement("button", {
    tabIndex: -1,
    className: styles.control,
    onClick: function onClick() {
      return changeValueByStep(StepChangeType.Decrement);
    },
    onPointerDown: handleControlPointerDown
  }, React.createElement(f36Icons.ArrowDownTrimmedIcon, {
    size: "medium"
  }))));
}

function NumberEditor(props) {
  var field = props.field;
  return React.createElement(fieldEditorShared.FieldConnector, {
    field: field,
    isInitiallyDisabled: props.isInitiallyDisabled
  }, function (_ref2) {
    var value = _ref2.value,
        errors = _ref2.errors,
        disabled = _ref2.disabled,
        setValue = _ref2.setValue;
    return React.createElement(InnerNumberEditor, {
      disabled: disabled,
      errors: errors,
      field: field,
      setValue: setValue,
      value: value
    });
  });
}
NumberEditor.defaultProps = {
  isInitiallyDisabled: true
};

exports.NumberEditor = NumberEditor;
//# sourceMappingURL=field-editor-number.cjs.development.js.map
