'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var React = require('react');
var emotion = require('emotion');
var fieldEditorShared = require('@contentful/field-editor-shared');
var fieldEditorDropdown = require('@contentful/field-editor-dropdown');
var tokens = _interopDefault(require('@contentful/f36-tokens'));
var f36Components = require('@contentful/f36-components');

var form = /*#__PURE__*/emotion.css({
  marginTop: tokens.spacingS
});
var rightToLeft = /*#__PURE__*/emotion.css({
  direction: 'rtl'
});
var clearBtn = /*#__PURE__*/emotion.css({
  marginLeft: tokens.spacingL
});

function RadioEditor(props) {
  var field = props.field,
      locales = props.locales;
  var options = fieldEditorDropdown.getOptions(field);
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
    var disabled = _ref.disabled,
        value = _ref.value,
        setValue = _ref.setValue;

    var setOption = function setOption(value) {
      setValue(fieldEditorDropdown.parseValue(value, field.type));
    };

    var clearOption = function clearOption() {
      setValue(undefined);
    };

    return React.createElement(f36Components.Form, {
      testId: "radio-editor",
      className: emotion.cx(form, direction === 'rtl' ? rightToLeft : '')
    }, options.map(function (item, index) {
      var id = ['entity', field.id, field.locale, index, item.id].join('.');
      var checked = value === item.value;
      return React.createElement(f36Components.Flex, {
        key: id,
        alignItems: "center",
        marginBottom: "spacingS"
      }, React.createElement(f36Components.Radio, {
        id: id,
        isDisabled: disabled,
        value: item.value === undefined ? '' : String(item.value),
        isChecked: checked,
        onChange: function onChange(e) {
          if (e.target.checked) {
            setOption(e.target.value);
          }
        }
      }, item.label), checked && !disabled && React.createElement(f36Components.TextLink, {
        as: "button",
        className: clearBtn,
        onClick: clearOption
      }, "Clear"));
    }));
  });
}
RadioEditor.defaultProps = {
  isInitiallyDisabled: true
};

exports.RadioEditor = RadioEditor;
//# sourceMappingURL=field-editor-radio.cjs.development.js.map
