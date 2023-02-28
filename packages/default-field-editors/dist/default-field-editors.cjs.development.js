'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var React = require('react');
var fieldEditorNumber = require('@contentful/field-editor-number');
var fieldEditorSingleLine = require('@contentful/field-editor-single-line');
var fieldEditorBoolean = require('@contentful/field-editor-boolean');
var fieldEditorDate = require('@contentful/field-editor-date');
var fieldEditorLocation = require('@contentful/field-editor-location');
var fieldEditorJson = require('@contentful/field-editor-json');
var fieldEditorMultipleLine = require('@contentful/field-editor-multiple-line');
var fieldEditorTags = require('@contentful/field-editor-tags');
var fieldEditorSlug = require('@contentful/field-editor-slug');
var fieldEditorDropdown = require('@contentful/field-editor-dropdown');
var fieldEditorUrl = require('@contentful/field-editor-url');
var fieldEditorRadio = require('@contentful/field-editor-radio');
var fieldEditorRating = require('@contentful/field-editor-rating');
var fieldEditorCheckbox = require('@contentful/field-editor-checkbox');
var fieldEditorList = require('@contentful/field-editor-list');
var fieldEditorReference = require('@contentful/field-editor-reference');
var fieldEditorRichText = require('@contentful/field-editor-rich-text');
var fieldEditorMarkdown = require('@contentful/field-editor-markdown');
var contentfulManagement = require('contentful-management');
var emotion = require('emotion');
var f36Components = require('@contentful/f36-components');
var fieldEditorValidationErrors = require('@contentful/field-editor-validation-errors');
var tokens = _interopDefault(require('@contentful/f36-tokens'));

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

  return contentfulManagement.editorInterfaceDefaults["default"].getDefaultControlOfField(field).widgetId;
}

var widgetComponents = {
  multipleLine: [fieldEditorMultipleLine.MultipleLineEditor],
  "boolean": [fieldEditorBoolean.BooleanEditor],
  objectEditor: [fieldEditorJson.JsonEditor],
  datePicker: [fieldEditorDate.DateEditor],
  locationEditor: [fieldEditorLocation.LocationEditor],
  checkbox: [fieldEditorCheckbox.CheckboxEditor],
  listInput: [fieldEditorList.ListEditor],
  rating: [fieldEditorRating.RatingEditor],
  radio: [fieldEditorRadio.RadioEditor],
  tagEditor: [fieldEditorTags.TagsEditor],
  numberEditor: [fieldEditorNumber.NumberEditor],
  urlEditor: [fieldEditorUrl.UrlEditor],
  slugEditor: [fieldEditorSlug.SlugEditor],
  singleLine: [fieldEditorSingleLine.SingleLineEditor],
  dropdown: [fieldEditorDropdown.DropdownEditor],
  entryLinkEditor: [fieldEditorReference.SingleEntryReferenceEditor, {
    viewType: 'link',
    hasCardEditActions: true
  }],
  entryCardEditor: [fieldEditorReference.SingleEntryReferenceEditor, {
    viewType: 'card',
    hasCardEditActions: true
  }],
  entryLinksEditor: [fieldEditorReference.MultipleEntryReferenceEditor, {
    viewType: 'link',
    hasCardEditActions: true
  }],
  entryCardsEditor: [fieldEditorReference.MultipleEntryReferenceEditor, {
    viewType: 'card',
    hasCardEditActions: true
  }],
  assetLinkEditor: [fieldEditorReference.SingleMediaEditor, {
    viewType: 'link'
  }],
  assetLinksEditor: [fieldEditorReference.MultipleMediaEditor, {
    viewType: 'link'
  }],
  assetGalleryEditor: [fieldEditorReference.MultipleMediaEditor, {
    viewType: 'card'
  }],
  richTextEditor: [fieldEditorRichText.RichTextEditor],
  markdown: [fieldEditorMarkdown.MarkdownEditor]
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
  return React.createElement(WidgetComponent, _extends({
    key: sdk.field.locale
  }, widgetComponentProps, {
    baseSdk: baseSdk
  }));
};

var styles = {
  withFocusBar: /*#__PURE__*/emotion.css({
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
  label: /*#__PURE__*/emotion.css({
    display: 'flex',
    width: '100%',
    maxWidth: '800px',
    color: tokens.gray500,
    fontSize: tokens.fontSizeM,
    fontWeight: tokens.fontWeightNormal,
    lineHeight: tokens.lineHeightDefault,
    whiteSpace: 'pre-wrap'
  }),
  helpText: /*#__PURE__*/emotion.css({
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

  var _React$useState = React.useState(false),
      hasErrors = _React$useState[0],
      setHasErrors = _React$useState[1];

  React.useEffect(function () {
    return field.onSchemaErrorsChanged(function (errors) {
      setHasErrors((errors || []).length > 0);
    });
  }, [field]);
  var fieldControlId = [field.id, field.locale, (_sdk$contentType = sdk.contentType) == null ? void 0 : (_sdk$contentType$sys = _sdk$contentType.sys) == null ? void 0 : _sdk$contentType$sys.id].filter(function (item) {
    return item;
  }).join('-');
  return React.createElement(f36Components.FormControl, {
    id: fieldControlId,
    testId: "entity-field-controls",
    "data-test-id": "entity-field-controls",
    className: emotion.cx(showFocusBar && styles.withFocusBar, className),
    "aria-invalid": hasErrors,
    isRequired: field.required
  }, renderHeading ? renderHeading(name) : React.createElement(f36Components.FormControl.Label, {
    className: styles.label
  }, name), children, React.createElement(fieldEditorValidationErrors.ValidationErrors, {
    field: field,
    space: sdk.space,
    locales: sdk.locales,
    getEntryURL: getEntryURL || defaultGetEntryUrl
  }), renderHelpText ? renderHelpText(helpText) : React.createElement(f36Components.FormControl.HelpText, {
    testId: "field-hint",
    className: styles.helpText
  }, helpText));
};

exports.Field = Field;
exports.FieldWrapper = FieldWrapper;
exports.getDefaultWidgetId = getDefaultWidgetId;
//# sourceMappingURL=default-field-editors.cjs.development.js.map
