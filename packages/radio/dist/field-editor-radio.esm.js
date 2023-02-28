import { createElement } from 'react';
import { css, cx } from 'emotion';
import { PredefinedValuesError, FieldConnector } from '@contentful/field-editor-shared';
import { getOptions, parseValue } from '@contentful/field-editor-dropdown';
import tokens from '@contentful/f36-tokens';
import { Form, Flex, Radio, TextLink } from '@contentful/f36-components';

var form = /*#__PURE__*/css({
  marginTop: tokens.spacingS
});
var rightToLeft = /*#__PURE__*/css({
  direction: 'rtl'
});
var clearBtn = /*#__PURE__*/css({
  marginLeft: tokens.spacingL
});

function RadioEditor(props) {
  var field = props.field,
      locales = props.locales;
  var options = getOptions(field);
  var misconfigured = options.length === 0;

  if (misconfigured) {
    return createElement(PredefinedValuesError, null);
  }

  var direction = locales.direction[field.locale] || 'ltr';
  return createElement(FieldConnector, {
    throttle: 0,
    field: field,
    isInitiallyDisabled: props.isInitiallyDisabled
  }, function (_ref) {
    var disabled = _ref.disabled,
        value = _ref.value,
        setValue = _ref.setValue;

    var setOption = function setOption(value) {
      setValue(parseValue(value, field.type));
    };

    var clearOption = function clearOption() {
      setValue(undefined);
    };

    return createElement(Form, {
      testId: "radio-editor",
      className: cx(form, direction === 'rtl' ? rightToLeft : '')
    }, options.map(function (item, index) {
      var id = ['entity', field.id, field.locale, index, item.id].join('.');
      var checked = value === item.value;
      return createElement(Flex, {
        key: id,
        alignItems: "center",
        marginBottom: "spacingS"
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
      }, item.label), checked && !disabled && createElement(TextLink, {
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

export { RadioEditor };
//# sourceMappingURL=field-editor-radio.esm.js.map
