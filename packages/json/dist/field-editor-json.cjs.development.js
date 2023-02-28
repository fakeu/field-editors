'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var React = require('react');
var React__default = _interopDefault(React);
var fieldEditorShared = require('@contentful/field-editor-shared');
var deepEqual = _interopDefault(require('deep-equal'));
var throttle = _interopDefault(require('lodash/throttle'));
var langJson = require('@codemirror/lang-json');
var view = require('@codemirror/view');
var tokens = _interopDefault(require('@contentful/f36-tokens'));
var CodeMirror = _interopDefault(require('@uiw/react-codemirror'));
var emotion = require('emotion');
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

function _inheritsLoose(subClass, superClass) {
  subClass.prototype = Object.create(superClass.prototype);
  subClass.prototype.constructor = subClass;

  _setPrototypeOf(subClass, superClass);
}

function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };

  return _setPrototypeOf(o, p);
}

var styles = {
  root: /*#__PURE__*/emotion.css({
    cursor: 'text',
    padding: tokens.spacingS,
    border: "1px solid " + tokens.gray200,
    borderTop: 'none',
    borderBottomLeftRadius: tokens.borderRadiusSmall,
    borderBottomRightRadius: tokens.borderRadiusSmall,
    fontSize: tokens.fontSizeM,
    '.cm-editor': {
      color: tokens.gray900,
      '&.cm-focused': {
        outline: 'none'
      }
    },
    '.cm-scroller': {
      fontFamily: tokens.fontStackMonospace,
      minHeight: '6rem'
    },
    '&.disabled': {
      cursor: 'auto',
      '.cm-scroller ': {
        minHeight: '6rem',
        backgroundColor: tokens.gray100,
        cursor: 'not-allowed'
      },
      '.cm-editor': {
        border: "1px solid " + tokens.gray200
      },
      '.cm-line': {
        cursor: 'not-allowed'
      },
      '.cm-lines': {
        cursor: 'not-allowed'
      }
    }
  })
};
function JsonEditorField(props) {
  return React__default.createElement("div", {
    className: emotion.cx(styles.root, {
      disabled: props.isDisabled
    }),
    "data-test-id": "json-editor-code-mirror"
  }, React__default.createElement(CodeMirror, {
    value: props.value,
    onChange: props.onChange,
    theme: "light",
    extensions: [langJson.json(), view.EditorView.lineWrapping],
    basicSetup: {
      closeBrackets: false,
      lineNumbers: false,
      highlightActiveLineGutter: false,
      searchKeymap: false,
      highlightActiveLine: false,
      foldGutter: false,
      bracketMatching: false,
      syntaxHighlighting: false
    },
    width: "100%",
    editable: !props.isDisabled,
    indentWithTab: true
  }));
}

var styles$1 = {
  toolbar: /*#__PURE__*/emotion.css({
    display: 'flex',
    alignItems: 'center',
    padding: tokens.spacingXs,
    justifyContent: 'space-between',
    backgroundColor: tokens.gray100,
    border: "1px solid " + tokens.gray200,
    borderTopLeftRadius: tokens.borderRadiusSmall,
    borderTopRightRadius: tokens.borderRadiusSmall,
    borderBottom: 'none'
  }),
  title: /*#__PURE__*/emotion.css({
    fontFamily: tokens.fontStackPrimary,
    fontSize: tokens.fontSizeM,
    color: tokens.gray600
  }),
  actions: /*#__PURE__*/emotion.css({
    button: {
      marginLeft: tokens.spacingS
    }
  })
};
function JsonEditorToolbar(props) {
  return React__default.createElement("div", {
    className: styles$1.toolbar
  }, React__default.createElement("div", {
    className: styles$1.title
  }, "JSON Editor"), React__default.createElement("div", {
    className: styles$1.actions
  }, React__default.createElement(f36Components.Button, {
    variant: "secondary",
    size: "small",
    isDisabled: props.isUndoDisabled,
    testId: "json-editor-undo",
    onClick: function onClick() {
      props.onUndo();
    }
  }, "Undo"), React__default.createElement(f36Components.Button, {
    variant: "secondary",
    size: "small",
    isDisabled: props.isRedoDisabled,
    testId: "json-editor-redo",
    onClick: function onClick() {
      props.onRedo();
    }
  }, "Redo")));
}

function JsonInvalidStatus() {
  return React__default.createElement("div", {
    role: "status",
    "data-test-id": "json-editor.invalid-json",
    className: emotion.css({
      marginTop: tokens.spacingS
    })
  }, React__default.createElement(f36Components.ValidationMessage, null, "This is not valid JSON"));
}

function stringifyJSON(obj) {
  if (obj === null || obj === undefined) {
    return '';
  } else {
    return JSON.stringify(obj, null, 4);
  }
}
function isValidJson(str) {
  var parsed;

  try {
    parsed = JSON.parse(str);
  } catch (e) {
    return false;
  } // An object or array is valid JSON


  if (typeof parsed !== 'object') {
    return false;
  }

  return true;
}
function parseJSON(str) {
  if (str === '') {
    return {
      value: undefined,
      valid: true
    };
  } else if (isValidJson(str)) {
    return {
      value: JSON.parse(str),
      valid: true
    };
  } else {
    return {
      value: undefined,
      valid: false
    };
  }
}

var ConnectedJsonEditor = /*#__PURE__*/function (_React$Component) {
  _inheritsLoose(ConnectedJsonEditor, _React$Component);

  function ConnectedJsonEditor(props) {
    var _this;

    _this = _React$Component.call(this, props) || this;

    _this.setValidJson = function (value) {
      _this.setState({
        isValidJson: value
      });
    };

    _this.pushUndo = throttle(function (value) {
      _this.setState(function (state) {
        return {
          undoStack: [].concat(state.undoStack, [value])
        };
      });
    }, 400);

    _this.onChange = function (value) {
      var parsed = parseJSON(value);

      if (value !== _this.state.lastUndo) {
        _this.pushUndo(_this.state.value);
      }

      _this.setState({
        value: value,
        isValidJson: parsed.valid
      });

      if (parsed.valid) {
        _this.props.setValue(parsed.value);
      }
    };

    _this.onUndo = function () {
      var undoStack = _this.state.undoStack;

      if (undoStack.length === 0) {
        return;
      }

      var value = undoStack.pop() || '';
      var parsedValue = parseJSON(value);

      _this.setState(function (state) {
        return _extends({}, state, {
          value: value,
          isValidJson: parsedValue.valid,
          undoStack: undoStack,
          redoStack: [].concat(state.redoStack, [state.value]),
          lastUndo: value
        });
      }, function () {
        if (parsedValue.valid) {
          _this.props.setValue(parsedValue.value);
        }
      });
    };

    _this.onRedo = function () {
      var redoStack = [].concat(_this.state.redoStack);

      if (redoStack.length === 0) {
        return;
      }

      var value = redoStack.pop() || '';
      var parsedValue = parseJSON(value);

      _this.setState(function (state) {
        return _extends({}, state, {
          value: value,
          isValidJson: parsedValue.valid,
          redoStack: redoStack,
          undoStack: [].concat(state.undoStack, [state.value])
        });
      }, function () {
        if (parsedValue.valid) {
          _this.props.setValue(parsedValue.value);
        }
      });
    };

    _this.state = {
      value: stringifyJSON(props.initialValue),
      isValidJson: true,
      undoStack: [],
      redoStack: [],
      lastUndo: ''
    };
    return _this;
  }

  var _proto = ConnectedJsonEditor.prototype;

  _proto.render = function render() {
    return React.createElement("div", {
      "data-test-id": "json-editor"
    }, React.createElement(JsonEditorToolbar, {
      isRedoDisabled: this.props.disabled || this.state.redoStack.length === 0,
      isUndoDisabled: this.props.disabled || this.state.undoStack.length === 0,
      onUndo: this.onUndo,
      onRedo: this.onRedo
    }), React.createElement(JsonEditorField, {
      value: this.state.value,
      onChange: this.onChange,
      isDisabled: this.props.disabled
    }), !this.state.isValidJson && React.createElement(JsonInvalidStatus, null));
  };

  return ConnectedJsonEditor;
}(React.Component);

ConnectedJsonEditor.defaultProps = {
  isInitiallyDisabled: true
};
function JsonEditor(props) {
  return React.createElement(fieldEditorShared.FieldConnector, {
    field: props.field,
    isInitiallyDisabled: props.isInitiallyDisabled,
    isEqualValues: function isEqualValues(value1, value2) {
      return deepEqual(value1, value2);
    }
  }, function (_ref) {
    var value = _ref.value,
        disabled = _ref.disabled,
        setValue = _ref.setValue,
        externalReset = _ref.externalReset;
    return React.createElement(ConnectedJsonEditor // on external change reset component completely and init with initial value again
    , {
      // on external change reset component completely and init with initial value again
      key: "json-editor-" + externalReset,
      initialValue: value,
      disabled: disabled,
      setValue: setValue
    });
  });
}

exports.JsonEditor = JsonEditor;
//# sourceMappingURL=field-editor-json.cjs.development.js.map
