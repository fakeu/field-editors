'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var React = _interopDefault(require('react'));
var fieldEditorShared = require('@contentful/field-editor-shared');
var emotion = require('emotion');
var tokens = _interopDefault(require('@contentful/f36-tokens'));
var f36Components = require('@contentful/f36-components');
var f36Icons = require('@contentful/f36-icons');

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

var errorList = /*#__PURE__*/emotion.css({
  padding: 0,
  wordWrap: 'break-word',
  marginTop: tokens.spacingS,
  color: tokens.red500,
  listStyleType: 'none'
});
var errorMessage = /*#__PURE__*/emotion.css({
  display: 'inline-flex',
  flexDirection: 'column',
  marginLeft: tokens.spacingXs
});
var errorItem = /*#__PURE__*/emotion.css({
  display: 'flex',
  alignItems: 'center'
});
var entryLink = /*#__PURE__*/emotion.css({
  fontWeight: /*#__PURE__*/Number(tokens.fontWeightDemiBold)
});

function UniquenessError(props) {
  var _React$useState = React.useState({
    loading: true,
    entries: []
  }),
      state = _React$useState[0],
      setState = _React$useState[1];

  var contentTypesById = React.useMemo(function () {
    return (// Maps ID => Content Type
      props.space.getCachedContentTypes().reduce(function (prev, ct) {
        var _extends2;

        return _extends({}, prev, (_extends2 = {}, _extends2[ct.sys.id] = ct, _extends2));
      }, {})
    );
  }, [props.space]);
  var getTitle = React.useCallback(function (entry) {
    return fieldEditorShared.entityHelpers.getEntryTitle({
      entry: entry,
      defaultTitle: 'Untitled',
      localeCode: props.localeCode,
      defaultLocaleCode: props.defaultLocaleCode,
      contentType: contentTypesById[entry.sys.contentType.sys.id]
    });
  }, [props.localeCode, props.defaultLocaleCode, contentTypesById]);
  var conflicting = [];

  if ('conflicting' in props.error) {
    conflicting = props.error.conflicting;
  }

  React.useEffect(function () {
    var entryIds = state.entries.map(function (entry) {
      return entry.id;
    });
    var conflictIds = conflicting.map(function (entry) {
      return entry.sys.id;
    }); // Avoid unnecessary refetching

    if (conflictIds.every(function (id) {
      return entryIds.includes(id);
    })) {
      return;
    }

    setState(function (state) {
      return _extends({}, state, {
        loading: true
      });
    });
    var query = {
      'sys.id[in]': conflictIds.join(',')
    };
    props.space.getEntries(query).then(function (_ref) {
      var items = _ref.items;
      var entries = items.map(function (entry) {
        return {
          id: entry.sys.id,
          title: getTitle(entry),
          href: props.getEntryURL(entry)
        };
      });
      setState({
        loading: false,
        entries: entries
      });
    }); // eslint-disable-next-line react-hooks/exhaustive-deps -- TODO: Evaluate these dependencies
  }, [getTitle, state.entries, conflicting, props.space.getEntries, props.getEntryURL]);
  return React.createElement(f36Components.List, {
    className: errorList,
    testId: "validation-errors-uniqueness"
  }, React.createElement(f36Components.ListItem, {
    className: entryLink
  }, state.loading ? React.createElement("div", null, "Loading title for conflicting entry\u2026") : state.entries.map(function (entry) {
    return React.createElement(f36Components.TextLink, {
      key: entry.id,
      href: entry.href,
      icon: React.createElement(f36Icons.ExternalLinkIcon, null),
      alignIcon: "end",
      variant: "negative",
      target: "_blank",
      rel: "noopener noreferrer"
    }, entry.title);
  })));
}

function ValidationErrors(props) {
  var _React$useState2 = React.useState([]),
      errors = _React$useState2[0],
      setErrors = _React$useState2[1];

  React.useEffect(function () {
    var onErrors = function onErrors(errors) {
      setErrors(errors || []);
    };

    return props.field.onSchemaErrorsChanged(onErrors);
  }, [props.field]);

  if (errors.length === 0) {
    return null;
  }

  return React.createElement(f36Components.List, {
    className: errorList,
    testId: "validation-errors"
  }, errors.map(function (error, index) {
    return React.createElement("li", {
      key: index,
      role: "status",
      "aria-roledescription": "field-locale-schema",
      "data-error-code": "entry.schema." + error.name,
      className: errorItem
    }, React.createElement(f36Icons.InfoCircleIcon, {
      variant: "negative"
    }), React.createElement("div", {
      className: errorMessage
    }, error.message, error.name === 'unique' && React.createElement(UniquenessError, {
      error: error,
      space: props.space,
      localeCode: props.field.locale,
      defaultLocaleCode: props.locales["default"],
      getEntryURL: props.getEntryURL
    })));
  }));
}

exports.ValidationErrors = ValidationErrors;
//# sourceMappingURL=field-editor-validation-errors.cjs.development.js.map
