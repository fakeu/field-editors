import { createElement } from 'react';
import { FieldConnector } from '@contentful/field-editor-shared';
import { TextInput } from '@contentful/f36-components';

function UrlEditor(props) {
  var field = props.field;
  return createElement(FieldConnector, {
    field: field,
    isInitiallyDisabled: props.isInitiallyDisabled
  }, function (_ref) {
    var value = _ref.value,
        errors = _ref.errors,
        disabled = _ref.disabled,
        setValue = _ref.setValue;
    return createElement("div", {
      "data-test-id": "url-editor"
    }, createElement(TextInput, {
      isRequired: field.required,
      isInvalid: errors.length > 0,
      isDisabled: disabled,
      value: value || '',
      onChange: function onChange(e) {
        setValue(e.target.value);
      }
    }), typeof props.children === 'function' ? props.children({
      value: value
    }) : null);
  });
}
UrlEditor.defaultProps = {
  isInitiallyDisabled: true
};

export { UrlEditor };
//# sourceMappingURL=field-editor-url.esm.js.map
