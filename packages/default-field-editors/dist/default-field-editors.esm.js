import { createElement, useState, useEffect } from 'react';
import { NumberEditor } from '@contentful/field-editor-number';
import { SingleLineEditor } from '@contentful/field-editor-single-line';
import { BooleanEditor } from '@contentful/field-editor-boolean';
import { DateEditor } from '@contentful/field-editor-date';
import { LocationEditor } from '@contentful/field-editor-location';
import { JsonEditor } from '@contentful/field-editor-json';
import { MultipleLineEditor } from '@contentful/field-editor-multiple-line';
import { TagsEditor } from '@contentful/field-editor-tags';
import { SlugEditor } from '@contentful/field-editor-slug';
import { DropdownEditor } from '@contentful/field-editor-dropdown';
import { UrlEditor } from '@contentful/field-editor-url';
import { RadioEditor } from '@contentful/field-editor-radio';
import { RatingEditor } from '@contentful/field-editor-rating';
import { CheckboxEditor } from '@contentful/field-editor-checkbox';
import { ListEditor } from '@contentful/field-editor-list';
import { SingleEntryReferenceEditor, MultipleEntryReferenceEditor, SingleMediaEditor, MultipleMediaEditor } from '@contentful/field-editor-reference';
import { RichTextEditor } from '@contentful/field-editor-rich-text';
import { MarkdownEditor } from '@contentful/field-editor-markdown';
import { editorInterfaceDefaults } from 'contentful-management';
import { css, cx } from 'emotion';
import { FormControl } from '@contentful/f36-components';
import { ValidationErrors } from '@contentful/field-editor-validation-errors';
import tokens from '@contentful/f36-tokens';

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

function getDefaultWidgetId(sdk) {
  var field = sdk.field; // @ts-expect-error FieldExtensionSDK.field doesn't include all the
  // properties of ContentFields type. It should be fixed

  return editorInterfaceDefaults["default"].getDefaultControlOfField(field).widgetId;
}

var widgetComponents = {
  multipleLine: [MultipleLineEditor],
  "boolean": [BooleanEditor],
  objectEditor: [JsonEditor],
  datePicker: [DateEditor],
  locationEditor: [LocationEditor],
  checkbox: [CheckboxEditor],
  listInput: [ListEditor],
  rating: [RatingEditor],
  radio: [RadioEditor],
  tagEditor: [TagsEditor],
  numberEditor: [NumberEditor],
  urlEditor: [UrlEditor],
  slugEditor: [SlugEditor],
  singleLine: [SingleLineEditor],
  dropdown: [DropdownEditor],
  entryLinkEditor: [SingleEntryReferenceEditor, {
    viewType: 'link',
    hasCardEditActions: true
  }],
  entryCardEditor: [SingleEntryReferenceEditor, {
    viewType: 'card',
    hasCardEditActions: true
  }],
  entryLinksEditor: [MultipleEntryReferenceEditor, {
    viewType: 'link',
    hasCardEditActions: true
  }],
  entryCardsEditor: [MultipleEntryReferenceEditor, {
    viewType: 'card',
    hasCardEditActions: true
  }],
  assetLinkEditor: [SingleMediaEditor, {
    viewType: 'link'
  }],
  assetLinksEditor: [MultipleMediaEditor, {
    viewType: 'link'
  }],
  assetGalleryEditor: [MultipleMediaEditor, {
    viewType: 'card'
  }],
  richTextEditor: [RichTextEditor],
  markdown: [MarkdownEditor]
};
var Field = function Field(props) {
  var sdk = props.sdk,
      possiblyUndefinedWidgetId = props.widgetId,
      _props$isInitiallyDis = props.isInitiallyDisabled,
      isInitiallyDisabled = _props$isInitiallyDis === void 0 ? false : _props$isInitiallyDis,
      renderFieldEditor = props.renderFieldEditor,
      getOptions = props.getOptions;
  var field = sdk.field;
  var locales = sdk.locales;
  var widgetId = possiblyUndefinedWidgetId != null ? possiblyUndefinedWidgetId : getDefaultWidgetId(sdk);

  if (renderFieldEditor) {
    var customEditor = renderFieldEditor(widgetId, sdk, isInitiallyDisabled);

    if (customEditor) {
      return customEditor;
    }
  }

  var options = getOptions ? getOptions(widgetId, sdk) : {};
  var referenceEditorParams = sdk.parameters && 'instance' in sdk.parameters ? sdk.parameters : {
    instance: {
      showCreateEntityAction: true,
      showLinkEntityAction: true
    }
  };
  if (!widgetComponents[widgetId]) return null;
  var _widgetComponents$wid = widgetComponents[widgetId],
      WidgetComponent = _widgetComponents$wid[0],
      widgetStaticProps = _widgetComponents$wid[1];

  var widgetComponentProps = _extends({
    sdk: sdk,
    field: field,
    locales: locales,
    isInitiallyDisabled: isInitiallyDisabled,
    parameters: referenceEditorParams
  }, widgetStaticProps, options[widgetId]);

  var baseSdk = widgetId === 'slugEditor' ? sdk : undefined;
  return createElement(WidgetComponent, _extends({
    key: sdk.field.locale
  }, widgetComponentProps, {
    baseSdk: baseSdk
  }));
};

var styles = {
  withFocusBar: /*#__PURE__*/css({
    marginLeft: tokens.spacingL,
    marginRight: tokens.spacingL,
    marginBottom: '29px',
    marginTop: '19px',
    paddingLeft: tokens.spacingM,
    borderLeft: "3px solid " + tokens.gray300,
    transition: 'border-color 0.18s linear',
    '&:focus-within': {
      borderColor: tokens.colorPrimary
    },
    '&[aria-invalid="true"]': {
      borderLeftColor: tokens.red500
    }
  }),
  label: /*#__PURE__*/css({
    display: 'flex',
    width: '100%',
    maxWidth: '800px',
    color: tokens.gray500,
    fontSize: tokens.fontSizeM,
    fontWeight: tokens.fontWeightNormal,
    lineHeight: tokens.lineHeightDefault,
    whiteSpace: 'pre-wrap'
  }),
  helpText: /*#__PURE__*/css({
    margin: tokens.spacingXs + " 0",
    fontStyle: 'italic'
  })
};

var FieldWrapper = function FieldWrapper(props) {
  var _sdk$parameters$insta, _sdk$parameters, _sdk$parameters$insta2, _sdk$contentType, _sdk$contentType$sys;

  var ids = props.sdk.ids;

  var defaultGetEntryUrl = function defaultGetEntryUrl(entry) {
    return "/spaces/" + ids.space + "/environments/" + (ids.environmentAlias || ids.environment) + "/entries/" + entry.sys.id;
  };

  var name = props.name,
      sdk = props.sdk,
      className = props.className,
      children = props.children,
      renderHeading = props.renderHeading,
      renderHelpText = props.renderHelpText,
      _props$showFocusBar = props.showFocusBar,
      showFocusBar = _props$showFocusBar === void 0 ? true : _props$showFocusBar,
      _props$getEntryURL = props.getEntryURL,
      getEntryURL = _props$getEntryURL === void 0 ? defaultGetEntryUrl : _props$getEntryURL;
  var field = sdk.field;
  var helpText = (_sdk$parameters$insta = (_sdk$parameters = sdk.parameters) == null ? void 0 : (_sdk$parameters$insta2 = _sdk$parameters.instance) == null ? void 0 : _sdk$parameters$insta2.helpText) != null ? _sdk$parameters$insta : '';

  var _React$useState = useState(false),
      hasErrors = _React$useState[0],
      setHasErrors = _React$useState[1];

  useEffect(function () {
    return field.onSchemaErrorsChanged(function (errors) {
      setHasErrors((errors || []).length > 0);
    });
  }, [field]);
  var fieldControlId = [field.id, field.locale, (_sdk$contentType = sdk.contentType) == null ? void 0 : (_sdk$contentType$sys = _sdk$contentType.sys) == null ? void 0 : _sdk$contentType$sys.id].filter(function (item) {
    return item;
  }).join('-');
  return createElement(FormControl, {
    id: fieldControlId,
    testId: "entity-field-controls",
    "data-test-id": "entity-field-controls",
    className: cx(showFocusBar && styles.withFocusBar, className),
    "aria-invalid": hasErrors,
    isRequired: field.required
  }, renderHeading ? renderHeading(name) : createElement(FormControl.Label, {
    className: styles.label
  }, name), children, createElement(ValidationErrors, {
    field: field,
    space: sdk.space,
    locales: sdk.locales,
    getEntryURL: getEntryURL || defaultGetEntryUrl
  }), renderHelpText ? renderHelpText(helpText) : createElement(FormControl.HelpText, {
    testId: "field-hint",
    className: styles.helpText
  }, helpText));
};

export { Field, FieldWrapper, getDefaultWidgetId };
//# sourceMappingURL=default-field-editors.esm.js.map
