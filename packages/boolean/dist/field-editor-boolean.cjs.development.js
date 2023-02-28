'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var React = require('react');
var get = _interopDefault(require('lodash/get'));
var nanoid = require('nanoid');
var fieldEditorShared = require('@contentful/field-editor-shared');
var f36Components = require('@contentful/f36-components');

function BooleanEditor(props) {
  var field = props.field;
  var options = [{
    value: true,
    label: get(props.parameters, ['instance', 'trueLabel'], 'Yes'),
    id: nanoid.nanoid(6)
  }, {
    value: false,
    label: get(props.parameters, ['instance', 'falseLabel'], 'No'),
    id: nanoid.nanoid(6)
  }];
  return React.createElement(fieldEditorShared.FieldConnector, {
    throttle: 0,
    field: field,
    isInitiallyDisabled: props.isInitiallyDisabled
  }, function (_ref) {
    var disabled = _ref.disabled,
        value = _ref.value,
        setValue = _ref.setValue;

    var setOption = function setOption(value) {
      setValue(value === 'true' ? true : false);
    };

    var clearOption = function clearOption() {
      setValue(null);
    };

    return React.createElement(f36Components.Flex, {
      testId: "boolean-editor",
      alignItems: "center",
      marginTop: "spacingS"
    }, options.map(function (item) {
      var id = ['entity', field.id, field.locale, item.value, item.id].join('.');
      var checked = value === item.value;
      return React.createElement(f36Components.Flex, {
        marginRight: "spacingM",
        key: id
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
      }, item.label));
    }), value !== undefined && React.createElement(f36Components.TextLink, {
      as: "button",
      testId: "boolean-editor-clear",
      isDisabled: disabled,
      onClick: clearOption
    }, "Clear"));
  });
}
BooleanEditor.defaultProps = {
  isInitiallyDisabled: true
};

exports.BooleanEditor = BooleanEditor;
//# sourceMappingURL=field-editor-boolean.cjs.development.js.map
