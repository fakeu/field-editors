'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var React = require('react');
var get = _interopDefault(require('lodash/get'));
var fieldEditorShared = require('@contentful/field-editor-shared');
var emotion = require('emotion');
var f36Components = require('@contentful/f36-components');
var f36Icons = require('@contentful/f36-icons');

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

var RatingRibbon = /*#__PURE__*/function (_React$Component) {
  _inheritsLoose(RatingRibbon, _React$Component);

  function RatingRibbon() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _React$Component.call.apply(_React$Component, [this].concat(args)) || this;
    _this.state = {
      hovered: null
    };

    _this.isSelected = function (num) {
      var hovered = _this.state.hovered;
      var value = _this.props.value;

      if (hovered !== null) {
        return num <= hovered;
      }

      if (value) {
        return num <= value;
      }

      return false;
    };

    _this.onBlur = function () {
      if (!_this.props.disabled) {
        _this.setState({
          hovered: null
        });
      }
    };

    _this.onFocus = function (num) {
      return function () {
        if (!_this.props.disabled) {
          _this.setState({
            hovered: num
          });
        }
      };
    };

    return _this;
  }

  var _proto = RatingRibbon.prototype;

  _proto.render = function render() {
    var _this2 = this;

    var items = [];

    for (var i = 1; i <= this.props.stars; i++) {
      items.push(i);
    }

    return React.createElement(React.Fragment, null, items.map(function (num) {
      return React.createElement(f36Components.IconButton, {
        variant: "transparent",
        size: "small",
        icon: React.createElement(f36Icons.StarIcon, {
          variant: _this2.isSelected(num) ? 'primary' : 'muted',
          className: emotion.css({
            width: '22px',
            height: '22px'
          })
        }),
        "data-selected": _this2.isSelected(num) ? 'true' : 'false',
        testId: "rating-editor-star",
        isDisabled: _this2.props.disabled,
        key: num,
        onClick: function onClick() {
          _this2.props.onSelect(num);
        },
        onKeyDown: function onKeyDown(e) {
          if (e.keyCode === 13) {
            _this2.props.onSelect(num);
          }
        },
        onMouseOver: _this2.onFocus(num),
        onMouseLeave: _this2.onBlur,
        onFocus: _this2.onFocus(num),
        onBlur: _this2.onBlur,
        "aria-label": num.toString()
      });
    }));
  };

  return RatingRibbon;
}(React.Component);

function isValidCount(count) {
  return typeof count === 'number' && !isNaN(count) && count > 0;
}

function getStarCount(count) {
  var defaultValue = 5;

  if (isValidCount(count)) {
    return Math.round(count);
  } else if (typeof count === 'string') {
    var parsed = parseInt(count, 10);
    return isValidCount(parsed) ? Math.round(parsed) : defaultValue;
  } else {
    return defaultValue;
  }
}

function RatingEditor(props) {
  var field = props.field;
  var starsCount = getStarCount(get(props.parameters, ['instance', 'stars']));
  return React.createElement(fieldEditorShared.FieldConnector, {
    throttle: 0,
    field: field,
    isInitiallyDisabled: props.isInitiallyDisabled
  }, function (_ref) {
    var disabled = _ref.disabled,
        value = _ref.value,
        setValue = _ref.setValue;

    var clearOption = function clearOption() {
      setValue(null);
    };

    return React.createElement(f36Components.Flex, {
      testId: "rating-editor",
      flexDirection: "row",
      marginTop: "spacingS"
    }, React.createElement(RatingRibbon, {
      disabled: disabled,
      value: value,
      stars: starsCount,
      onSelect: function onSelect(num) {
        setValue(num);
      }
    }), value !== undefined && !disabled && React.createElement(f36Components.Flex, {
      marginLeft: "spacingM"
    }, React.createElement(f36Components.TextLink, {
      as: "button",
      testId: "rating-editor-clear",
      onClick: clearOption
    }, "Clear")));
  });
}
RatingEditor.defaultProps = {
  isInitiallyDisabled: true
};

exports.RatingEditor = RatingEditor;
//# sourceMappingURL=field-editor-rating.cjs.development.js.map
