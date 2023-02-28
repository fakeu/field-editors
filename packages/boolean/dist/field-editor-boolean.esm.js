import { createElement } from 'react';
import get from 'lodash-es/get';
import { nanoid } from 'nanoid';
import { FieldConnector } from '@contentful/field-editor-shared';
import { Flex, Radio, TextLink } from '@contentful/f36-components';

function BooleanEditor(props) {
  var field = props.field;
  var options = [{
    value: true,
    label: get(props.parameters, ['instance', 'trueLabel'], 'Yes'),
    id: nanoid(6)
  }, {
    value: false,
    label: get(props.parameters, ['instance', 'falseLabel'], 'No'),
    id: nanoid(6)
  }];
  return createElement(FieldConnector, {
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

    return createElement(Flex, {
      testId: "boolean-editor",
      alignItems: "center",
      marginTop: "spacingS"
    }, options.map(function (item) {
      var id = ['entity', field.id, field.locale, item.value, item.id].join('.');
      var checked = value === item.value;
      return createElement(Flex, {
        marginRight: "spacingM",
        key: id
      }, createElement(Radio, {
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
    }), value !== undefined && createElement(TextLink, {
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

export { BooleanEditor };
//# sourceMappingURL=field-editor-boolean.esm.js.map
