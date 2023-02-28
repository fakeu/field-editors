import React__default, { useState, useCallback, createElement } from 'react';
import isNumber from 'lodash-es/isNumber';
import { FieldConnector } from '@contentful/field-editor-shared';
import noop from 'lodash-es/noop';
import { css, cx } from 'emotion';
import tokens from '@contentful/f36-tokens';
import { Text, TextInput, Pill } from '@contentful/f36-components';
import { SortableElement, SortableContainer, SortableHandle } from 'react-sortable-hoc';
import arrayMove from 'array-move';
import { DragIcon } from '@contentful/f36-icons';

function TagsEditorConstraints(props) {
  var constraintsType = props.constraintsType,
      constraints = props.constraints;
  return React__default.createElement(Text, {
    as: "p",
    fontColor: "gray600",
    marginBottom: "none",
    marginTop: "spacingS",
    className: css({
      fontStyle: 'italic'
    }),
    testId: "tag-editor-constraints"
  }, constraintsType === 'min' && React__default.createElement("span", null, "Requires at least ", constraints.min, " ", constraints.min === 1 ? 'tag' : 'tags'), constraintsType === 'max' && React__default.createElement("span", null, "Requires no more than ", constraints.max, " ", constraints.max === 1 ? 'tag' : 'tags'), constraintsType === 'min-max' && constraints.max !== constraints.min && React__default.createElement("span", null, "Requires between ", constraints.min, " and ", constraints.max, " tags"), constraintsType === 'min-max' && constraints.max === constraints.min && React__default.createElement("span", null, "Requires exactly ", constraints.max, " ", constraints.max === 1 ? 'tag' : 'tags'));
}

var styles = {
  dropContainer: /*#__PURE__*/css({
    whiteSpace: 'nowrap',
    display: 'flex',
    flexWrap: 'wrap'
  }),
  input: /*#__PURE__*/css({
    marginTop: tokens.spacingS,
    marginBottom: tokens.spacingM
  }),
  pill: /*#__PURE__*/css({
    marginRight: tokens.spacingS,
    marginBottom: tokens.spacingS
  }),
  pillDisabled: /*#__PURE__*/css({
    cursor: 'not-allowed !important',
    button: {
      cursor: 'not-allowed !important',
      // instead of changing the @contentful/f36-components package
      pointerEvents: 'none'
    }
  }),
  handle: /*#__PURE__*/css({
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
var SortablePillHandle = /*#__PURE__*/SortableHandle(function (props) {
  var _cx;

  return React__default.createElement("div", {
    className: cx(styles.handle, (_cx = {}, _cx[styles.pillDisabled] = props.isDisabled, _cx))
  }, React__default.createElement(DragIcon, {
    variant: "muted"
  }));
});
var SortablePill = /*#__PURE__*/SortableElement(function (props) {
  var _cx2;

  return React__default.createElement(Pill, {
    testId: "tag-editor-pill",
    className: cx(styles.pill, (_cx2 = {}, _cx2[styles.pillDisabled] = props.isSortablePillDisabled, _cx2)),
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
var SortableList = /*#__PURE__*/SortableContainer(function (props) {
  return React__default.createElement("div", {
    className: styles.dropContainer
  }, props.children);
});
function TagsEditor(props) {
  var _useState = useState(''),
      pendingValue = _useState[0],
      setPendingValue = _useState[1];

  var isDisabled = props.isDisabled,
      items = props.items,
      constraints = props.constraints,
      constraintsType = props.constraintsType,
      hasError = props.hasError;
  var removeItem = useCallback(function (index) {
    var newItems = props.items.filter(function (_, filterIndex) {
      return index !== filterIndex;
    });
    props.onUpdate(newItems);
  }, [props]);
  var swapItems = useCallback(function (_ref) {
    var oldIndex = _ref.oldIndex,
        newIndex = _ref.newIndex;
    var newItems = arrayMove(props.items, oldIndex, newIndex);
    props.onUpdate(newItems);
  }, [props]);
  return React__default.createElement("div", {
    "data-test-id": "tag-editor-container"
  }, React__default.createElement(TextInput, {
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
  return createElement(FieldConnector, {
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
    return createElement(TagsEditor, {
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

export { TagsEditor$1 as TagsEditor };
//# sourceMappingURL=field-editor-tags.esm.js.map
