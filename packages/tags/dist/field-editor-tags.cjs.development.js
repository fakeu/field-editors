'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var React = require('react');
var React__default = _interopDefault(React);
var isNumber = _interopDefault(require('lodash/isNumber'));
var fieldEditorShared = require('@contentful/field-editor-shared');
var noop = _interopDefault(require('lodash/noop'));
var emotion = require('emotion');
var tokens = _interopDefault(require('@contentful/f36-tokens'));
var f36Components = require('@contentful/f36-components');
var reactSortableHoc = require('react-sortable-hoc');
var arrayMove = _interopDefault(require('array-move'));
var f36Icons = require('@contentful/f36-icons');

function TagsEditorConstraints(props) {
  var constraintsType = props.constraintsType,
      constraints = props.constraints;
  return React__default.createElement(f36Components.Text, {
    as: "p",
    fontColor: "gray600",
    marginBottom: "none",
    marginTop: "spacingS",
    className: emotion.css({
      fontStyle: 'italic'
    }),
    testId: "tag-editor-constraints"
  }, constraintsType === 'min' && React__default.createElement("span", null, "Requires at least ", constraints.min, " ", constraints.min === 1 ? 'tag' : 'tags'), constraintsType === 'max' && React__default.createElement("span", null, "Requires no more than ", constraints.max, " ", constraints.max === 1 ? 'tag' : 'tags'), constraintsType === 'min-max' && constraints.max !== constraints.min && React__default.createElement("span", null, "Requires between ", constraints.min, " and ", constraints.max, " tags"), constraintsType === 'min-max' && constraints.max === constraints.min && React__default.createElement("span", null, "Requires exactly ", constraints.max, " ", constraints.max === 1 ? 'tag' : 'tags'));
}

var styles = {
  dropContainer: /*#__PURE__*/emotion.css({
    whiteSpace: 'nowrap',
    display: 'flex',
    flexWrap: 'wrap'
  }),
  input: /*#__PURE__*/emotion.css({
    marginTop: tokens.spacingS,
    marginBottom: tokens.spacingM
  }),
  pill: /*#__PURE__*/emotion.css({
    marginRight: tokens.spacingS,
    marginBottom: tokens.spacingS
  }),
  pillDisabled: /*#__PURE__*/emotion.css({
    cursor: 'not-allowed !important',
    button: {
      cursor: 'not-allowed !important',
      // instead of changing the @contentful/f36-components package
      pointerEvents: 'none'
    }
  }),
  handle: /*#__PURE__*/emotion.css({
    lineHeight: '1.5rem',
    padding: '0.375rem 0.625rem',
    paddingRight: 0,
    cursor: 'grab',
    userSelect: 'none',
    svg: {
      fill: tokens.gray500,
      verticalAlign: 'middle'
    }
  })
};
var SortablePillHandle = /*#__PURE__*/reactSortableHoc.SortableHandle(function (props) {
  var _cx;

  return React__default.createElement("div", {
    className: emotion.cx(styles.handle, (_cx = {}, _cx[styles.pillDisabled] = props.isDisabled, _cx))
  }, React__default.createElement(f36Icons.DragIcon, {
    variant: "muted"
  }));
});
var SortablePill = /*#__PURE__*/reactSortableHoc.SortableElement(function (props) {
  var _cx2;

  return React__default.createElement(f36Components.Pill, {
    testId: "tag-editor-pill",
    className: emotion.cx(styles.pill, (_cx2 = {}, _cx2[styles.pillDisabled] = props.isSortablePillDisabled, _cx2)),
    label: props.label,
    onClose: function onClose() {
      if (!props.isSortablePillDisabled) {
        props.onRemove(props.index);
      }
    },
    onDrag: noop,
    dragHandleComponent: React__default.createElement(SortablePillHandle, {
      isDisabled: props.isSortablePillDisabled
    })
  });
});
var SortableList = /*#__PURE__*/reactSortableHoc.SortableContainer(function (props) {
  return React__default.createElement("div", {
    className: styles.dropContainer
  }, props.children);
});
function TagsEditor(props) {
  var _useState = React.useState(''),
      pendingValue = _useState[0],
      setPendingValue = _useState[1];

  var isDisabled = props.isDisabled,
      items = props.items,
      constraints = props.constraints,
      constraintsType = props.constraintsType,
      hasError = props.hasError;
  var removeItem = React.useCallback(function (index) {
    var newItems = props.items.filter(function (_, filterIndex) {
      return index !== filterIndex;
    });
    props.onUpdate(newItems);
  }, [props]);
  var swapItems = React.useCallback(function (_ref) {
    var oldIndex = _ref.oldIndex,
        newIndex = _ref.newIndex;
    var newItems = arrayMove(props.items, oldIndex, newIndex);
    props.onUpdate(newItems);
  }, [props]);
  return React__default.createElement("div", {
    "data-test-id": "tag-editor-container"
  }, React__default.createElement(f36Components.TextInput, {
    testId: "tag-editor-input",
    className: styles.input,
    isDisabled: isDisabled,
    isInvalid: hasError,
    type: "text",
    value: pendingValue,
    placeholder: "Type the value and hit enter",
    onKeyDown: function onKeyDown(e) {
      if (pendingValue && e.keyCode === 13) {
        props.onUpdate([].concat(props.items, [pendingValue]));
        setPendingValue('');
      }
    },
    onChange: function onChange(e) {
      setPendingValue(e.target.value);
    }
  }), React__default.createElement(SortableList, {
    useDragHandle: true,
    axis: "xy",
    distance: 10,
    onSortEnd: function onSortEnd(_ref2) {
      var oldIndex = _ref2.oldIndex,
          newIndex = _ref2.newIndex;
      swapItems({
        oldIndex: oldIndex,
        newIndex: newIndex
      });
    }
  }, items.map(function (item, index) {
    return React__default.createElement(SortablePill, {
      label: item,
      index: index,
      key: item + index,
      disabled: isDisabled,

      /**
       * `isSortablePillDisabled` is needed as SortableElement
       * from react-sortable-hoc doesn't pass down the disabled prop.
       * See: https://github.com/clauderic/react-sortable-hoc/issues/612
       */
      isSortablePillDisabled: isDisabled,
      onRemove: function onRemove() {
        removeItem(index);
      }
    });
  })), constraints && constraintsType && React__default.createElement(TagsEditorConstraints, {
    constraints: constraints,
    constraintsType: constraintsType
  }));
}

function isEmptyTagsValue(value) {
  return value === null || value.length === 0;
}

function getConstraintsType(sizeConstraints) {
  if (!sizeConstraints) {
    return undefined;
  }

  if (isNumber(sizeConstraints.min) && isNumber(sizeConstraints.max)) {
    return 'min-max';
  } else if (isNumber(sizeConstraints.min)) {
    return 'min';
  } else if (isNumber(sizeConstraints.max)) {
    return 'max';
  } else {
    return undefined;
  }
}

function TagsEditorContainer(props) {
  var field = props.field;
  var validations = field.validations || [];
  var sizeValidations = validations.filter(function (validation) {
    return validation.size;
  }).map(function (validation) {
    return validation.size;
  });
  var constraints = sizeValidations.length > 0 ? sizeValidations[0] : {};
  var constraintsType = getConstraintsType(constraints);
  return React.createElement(fieldEditorShared.FieldConnector, {
    field: field,
    isInitiallyDisabled: props.isInitiallyDisabled,
    isEmptyValue: isEmptyTagsValue,
    throttle: 0
  }, function (_ref) {
    var disabled = _ref.disabled,
        value = _ref.value,
        errors = _ref.errors,
        setValue = _ref.setValue;
    var items = value || [];
    return React.createElement(TagsEditor, {
      constraints: constraints,
      constraintsType: constraintsType,
      isDisabled: disabled,
      hasError: errors.length > 0,
      items: items,
      onUpdate: function onUpdate(items) {
        setValue(items);
      }
    });
  });
}
TagsEditorContainer.defaultProps = {
  isInitiallyDisabled: true
};

var TagsEditor$1 = TagsEditorContainer;

exports.TagsEditor = TagsEditor$1;
//# sourceMappingURL=field-editor-tags.cjs.development.js.map
