import 'codemirror/mode/markdown/markdown';
import 'codemirror/mode/xml/xml';
import 'codemirror/addon/edit/continuelist';
import 'codemirror/addon/mode/overlay';
import 'codemirror/addon/display/autorefresh';
import React, { useRef, useState, useEffect } from 'react';
import { css, cx } from 'emotion';
import tokens from '@contentful/f36-tokens';
import { ConstraintsUtils, CharCounter, CharValidation, FieldConnector, ModalDialogLauncher } from '@contentful/field-editor-shared';
import { Menu, Button, Tooltip, IconButton, Flex, Paragraph, TextLink, ModalContent, Heading, Form, FormControl, TextInput, ModalControls, Text, Radio, Checkbox, EntityList } from '@contentful/f36-components';
import { AssetIcon, ChevronDownIcon, MoreHorizontalIcon, HeadingIcon, FormatBoldIcon, FormatItalicIcon, QuoteIcon, ListBulletedIcon, ListNumberedIcon, LinkIcon, CodeIcon, HorizontalRuleIcon, ChevronRightIcon, ChevronLeftIcon } from '@contentful/f36-icons';
import CodeMirror from 'codemirror';
import 'codemirror/addon/edit/matchbrackets';
import throttle from 'lodash-es/throttle';
import transform from 'lodash-es/transform';
import get from 'lodash-es/get';
import range from 'lodash-es/range';
import min from 'lodash-es/min';
import max from 'lodash-es/max';
import times from 'lodash-es/times';
import repeat from 'lodash-es/repeat';
import DOMPurify from 'dompurify';
import Markdown from 'markdown-to-jsx';
import inRange from 'lodash-es/inRange';
import isObject from 'lodash-es/isObject';
import extend from 'lodash-es/extend';
import isString from 'lodash-es/isString';
import isFinite from 'lodash-es/isFinite';
import forEach from 'lodash-es/forEach';

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
  try {
    var info = gen[key](arg);
    var value = info.value;
  } catch (error) {
    reject(error);
    return;
  }

  if (info.done) {
    resolve(value);
  } else {
    Promise.resolve(value).then(_next, _throw);
  }
}

function _asyncToGenerator(fn) {
  return function () {
    var self = this,
        args = arguments;
    return new Promise(function (resolve, reject) {
      var gen = fn.apply(self, args);

      function _next(value) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
      }

      function _throw(err) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
      }

      _next(undefined);
    });
  };
}

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

function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;

  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }

  return target;
}

function _taggedTemplateLiteralLoose(strings, raw) {
  if (!raw) {
    raw = strings.slice(0);
  }

  strings.raw = raw;
  return strings;
}

var styles = {
  root: /*#__PURE__*/css({
    display: 'flex',
    zIndex: 10,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    overflow: 'hidden',
    marginBottom: '-1px',
    fontSize: tokens.fontSizeM
  }),
  tab: /*#__PURE__*/css({
    cursor: 'pointer',
    color: tokens.gray700,
    padding: tokens.spacingXs,
    minWidth: '70px',
    border: "1px solid " + tokens.gray400,
    borderTopLeftRadius: tokens.borderRadiusSmall,
    borderTopRightRadius: tokens.borderRadiusSmall,
    marginLeft: tokens.spacingXs,
    textAlign: 'center',
    backgroundColor: tokens.gray100,
    borderBottomColor: tokens.gray100,
    outline: 'none',
    '&:focus': {
      boxShadow: tokens.boxShadowHeavy
    },
    transition: "all " + tokens.transitionEasingDefault + " " + tokens.transitionDurationShort
  }),
  inactiveTab: /*#__PURE__*/css({
    background: tokens.gray200,
    borderBottomColor: tokens.gray400,
    '&:hover': {
      background: tokens.gray300
    }
  })
};

function MarkdownTabItem(props) {
  var _cx;

  return React.createElement("div", {
    className: cx(styles.tab, (_cx = {}, _cx[styles.inactiveTab] = props.isActive === false, _cx)),
    onClick: function onClick() {
      props.onSelect(props.name);
    },
    onKeyDown: function onKeyDown(e) {
      if (e.keyCode === 13) {
        props.onSelect(props.name);
      }
    },
    tabIndex: 0,
    role: "tab",
    "aria-controls": props.name,
    "aria-selected": props.isActive === true,
    "data-test-id": props.testId
  }, props.children);
}

function MarkdownTabs(props) {
  return React.createElement("div", {
    className: styles.root
  }, React.createElement(MarkdownTabItem, {
    name: "editor",
    onSelect: props.onSelect,
    isActive: props.active === 'editor',
    testId: "markdown-tab-md"
  }, "Editor"), React.createElement(MarkdownTabItem, {
    name: "preview",
    onSelect: props.onSelect,
    isActive: props.active === 'preview',
    testId: "markdown-tab-preview"
  }, "Preview"));
}

var _excluded = ["label"],
    _excluded2 = ["label"],
    _excluded3 = ["label"],
    _excluded4 = ["label"],
    _excluded5 = ["label"],
    _excluded6 = ["label"],
    _excluded7 = ["label"],
    _excluded8 = ["label"],
    _excluded9 = ["label"],
    _excluded10 = ["label"];
var srOnly = /*#__PURE__*/css({
  position: 'absolute',
  width: '1px',
  height: '1px',
  padding: '0',
  margin: '-1px',
  overflow: 'hidden',
  clip: 'rect(0, 0, 0, 0)',
  border: '0'
});
var Zen = function Zen(_ref) {
  var label = _ref.label,
      rest = _objectWithoutPropertiesLoose(_ref, _excluded);

  return React.createElement("svg", _extends({
    width: 14,
    height: 14,
    viewBox: "0 0 1792 1792"
  }, rest), React.createElement("path", {
    d: "M1411 541l-355 355 355 355 144-144q29-31 70-14 39 17 39 59v448q0 26-19 45t-45 19h-448q-42 0-59-40-17-39 14-69l144-144-355-355-355 355 144 144q31 30 14 69-17 40-59 40H192q-26 0-45-19t-19-45v-448q0-42 40-59 39-17 69 14l144 144 355-355-355-355-144 144q-19 19-45 19-12 0-24-5-40-17-40-59V192q0-26 19-45t45-19h448q42 0 59 40 17 39-14 69L541 381l355 355 355-355-144-144q-31-30-14-69 17-40 59-40h448q26 0 45 19t19 45v448q0 42-39 59-13 5-25 5-26 0-45-19z"
  }), React.createElement("span", {
    className: srOnly
  }, label));
};
var Strikethrough = function Strikethrough(_ref2) {
  var label = _ref2.label,
      rest = _objectWithoutPropertiesLoose(_ref2, _excluded2);

  return React.createElement("svg", _extends({
    width: 14,
    height: 14,
    viewBox: "0 0 1792 1792"
  }, rest), React.createElement("path", {
    d: "M1760 896q14 0 23 9t9 23v64q0 14-9 23t-23 9H32q-14 0-23-9t-9-23v-64q0-14 9-23t23-9h1728zM483 832q-28-35-51-80-48-98-48-188 0-181 134-309 133-127 393-127 50 0 167 19 66 12 177 48 10 38 21 118 14 123 14 183 0 18-5 45l-12 3-84-6-14-2q-50-149-103-205-88-91-210-91-114 0-182 59-67 58-67 146 0 73 66 140t279 129q69 20 173 66 58 28 95 52H483zm507 256h411q7 39 7 92 0 111-41 212-23 56-71 104-37 35-109 81-80 48-153 66-80 21-203 21-114 0-195-23l-140-40q-57-16-72-28-8-8-8-22v-13q0-108-2-156-1-30 0-68l2-37v-44l102-2q15 34 30 71t22.5 56 12.5 27q35 57 80 94 43 36 105 57 59 22 132 22 64 0 139-27 77-26 122-86 47-61 47-129 0-84-81-157-34-29-137-71z"
  }), React.createElement("span", {
    className: srOnly
  }, label));
};
var Indent = function Indent(_ref3) {
  var label = _ref3.label,
      rest = _objectWithoutPropertiesLoose(_ref3, _excluded3);

  return React.createElement("svg", _extends({
    width: 14,
    height: 14,
    viewBox: "0 0 1792 1792"
  }, rest), React.createElement("path", {
    d: "M352 832q0 14-9 23L55 1143q-9 9-23 9-13 0-22.5-9.5T0 1120V544q0-13 9.5-22.5T32 512q14 0 23 9l288 288q9 9 9 23zm1440 480v192q0 13-9.5 22.5t-22.5 9.5H32q-13 0-22.5-9.5T0 1504v-192q0-13 9.5-22.5T32 1280h1728q13 0 22.5 9.5t9.5 22.5zm0-384v192q0 13-9.5 22.5t-22.5 9.5H672q-13 0-22.5-9.5T640 1120V928q0-13 9.5-22.5T672 896h1088q13 0 22.5 9.5t9.5 22.5zm0-384v192q0 13-9.5 22.5T1760 768H672q-13 0-22.5-9.5T640 736V544q0-13 9.5-22.5T672 512h1088q13 0 22.5 9.5t9.5 22.5zm0-384v192q0 13-9.5 22.5T1760 384H32q-13 0-22.5-9.5T0 352V160q0-13 9.5-22.5T32 128h1728q13 0 22.5 9.5t9.5 22.5z"
  }), React.createElement("span", {
    className: srOnly
  }, label));
};
var Dedent = function Dedent(_ref4) {
  var label = _ref4.label,
      rest = _objectWithoutPropertiesLoose(_ref4, _excluded4);

  return React.createElement("svg", _extends({
    width: 14,
    height: 14,
    viewBox: "0 0 1792 1792"
  }, rest), React.createElement("path", {
    d: "M384 544v576q0 13-9.5 22.5T352 1152q-14 0-23-9L41 855q-9-9-9-23t9-23l288-288q9-9 23-9 13 0 22.5 9.5T384 544zm1408 768v192q0 13-9.5 22.5t-22.5 9.5H32q-13 0-22.5-9.5T0 1504v-192q0-13 9.5-22.5T32 1280h1728q13 0 22.5 9.5t9.5 22.5zm0-384v192q0 13-9.5 22.5t-22.5 9.5H672q-13 0-22.5-9.5T640 1120V928q0-13 9.5-22.5T672 896h1088q13 0 22.5 9.5t9.5 22.5zm0-384v192q0 13-9.5 22.5T1760 768H672q-13 0-22.5-9.5T640 736V544q0-13 9.5-22.5T672 512h1088q13 0 22.5 9.5t9.5 22.5zm0-384v192q0 13-9.5 22.5T1760 384H32q-13 0-22.5-9.5T0 352V160q0-13 9.5-22.5T32 128h1728q13 0 22.5 9.5t9.5 22.5z"
  }), React.createElement("span", {
    className: srOnly
  }, label));
};
var Cubes = function Cubes(_ref5) {
  var label = _ref5.label,
      rest = _objectWithoutPropertiesLoose(_ref5, _excluded5);

  return React.createElement("svg", _extends({
    width: 18,
    height: 14,
    viewBox: "0 0 2304 1792"
  }, rest), React.createElement("path", {
    d: "M640 1632l384-192v-314l-384 164v342zm-64-454l404-173-404-173-404 173zm1088 454l384-192v-314l-384 164v342zm-64-454l404-173-404-173-404 173zm-448-293l384-165V454l-384 164v267zm-64-379l441-189-441-189-441 189zm1088 518v416q0 36-19 67t-52 47l-448 224q-25 14-57 14t-57-14l-448-224q-4-2-7-4-2 2-7 4l-448 224q-25 14-57 14t-57-14L71 1554q-33-16-52-47t-19-67v-416q0-38 21.5-70T78 906l434-186V320q0-38 21.5-70t56.5-48l448-192q23-10 50-10t50 10l448 192q35 16 56.5 48t21.5 70v400l434 186q36 16 57 48t21 70z"
  }), React.createElement("span", {
    className: srOnly
  }, label));
};
var Table = function Table(_ref6) {
  var label = _ref6.label,
      rest = _objectWithoutPropertiesLoose(_ref6, _excluded6);

  return React.createElement("svg", _extends({
    width: 14,
    height: 14,
    viewBox: "0 0 1792 1792"
  }, rest), React.createElement("path", {
    d: "M576 1376v-192q0-14-9-23t-23-9H224q-14 0-23 9t-9 23v192q0 14 9 23t23 9h320q14 0 23-9t9-23zm0-384V800q0-14-9-23t-23-9H224q-14 0-23 9t-9 23v192q0 14 9 23t23 9h320q14 0 23-9t9-23zm512 384v-192q0-14-9-23t-23-9H736q-14 0-23 9t-9 23v192q0 14 9 23t23 9h320q14 0 23-9t9-23zM576 608V416q0-14-9-23t-23-9H224q-14 0-23 9t-9 23v192q0 14 9 23t23 9h320q14 0 23-9t9-23zm512 384V800q0-14-9-23t-23-9H736q-14 0-23 9t-9 23v192q0 14 9 23t23 9h320q14 0 23-9t9-23zm512 384v-192q0-14-9-23t-23-9h-320q-14 0-23 9t-9 23v192q0 14 9 23t23 9h320q14 0 23-9t9-23zm-512-768V416q0-14-9-23t-23-9H736q-14 0-23 9t-9 23v192q0 14 9 23t23 9h320q14 0 23-9t9-23zm512 384V800q0-14-9-23t-23-9h-320q-14 0-23 9t-9 23v192q0 14 9 23t23 9h320q14 0 23-9t9-23zm0-384V416q0-14-9-23t-23-9h-320q-14 0-23 9t-9 23v192q0 14 9 23t23 9h320q14 0 23-9t9-23zm128-320v1088q0 66-47 113t-113 47H224q-66 0-113-47t-47-113V288q0-66 47-113t113-47h1344q66 0 113 47t47 113z"
  }), React.createElement("span", {
    className: srOnly
  }, label));
};
var SpecialChar = function SpecialChar(_ref7) {
  var label = _ref7.label,
      rest = _objectWithoutPropertiesLoose(_ref7, _excluded7);

  return React.createElement("svg", _extends({
    width: 14,
    height: 14,
    viewBox: "0 0 1792 1792"
  }, rest), React.createElement("path", {
    d: "M1360 1307l35 159q3 12-3 22.5t-17 14.5l-5 1q-4 2-10.5 3.5t-16 4.5-21.5 5.5-25.5 5-30 5-33.5 4.5-36.5 3-38.5 1q-234 0-409-130.5T511 1054h-95q-13 0-22.5-9.5T384 1022V909q0-13 9.5-22.5T416 877h66q-2-57 1-105h-67q-14 0-23-9t-9-23V626q0-14 9-23t23-9h98q67-210 243.5-338T1158 128q102 0 194 23 11 3 20 15 6 11 3 24l-43 159q-3 13-14 19.5t-24 2.5l-4-1q-4-1-11.5-2.5L1261 364l-22.5-3.5-26-3-29-2.5-29.5-1q-126 0-226 64T778 594h468q16 0 25 12 10 12 7 26l-24 114q-5 26-32 26H734q-3 37 0 105h459q15 0 25 12 9 12 6 27l-24 112q-2 11-11 18.5t-20 7.5H782q48 117 149.5 185.5T1160 1308q18 0 36-1.5t33.5-3.5 29.5-4.5 24.5-5 18.5-4.5l12-3 5-2q13-5 26 2 12 7 15 21z"
  }), React.createElement("span", {
    className: srOnly
  }, label));
};
var OrgLinks = function OrgLinks(_ref8) {
  var label = _ref8.label,
      rest = _objectWithoutPropertiesLoose(_ref8, _excluded8);

  return React.createElement("svg", _extends({
    width: 14,
    height: 14,
    viewBox: "0 0 1792 1792"
  }, rest), React.createElement("path", {
    d: "M1792 1248v320q0 40-28 68t-68 28h-320q-40 0-68-28t-28-68v-320q0-40 28-68t68-28h96V960H960v192h96q40 0 68 28t28 68v320q0 40-28 68t-68 28H736q-40 0-68-28t-28-68v-320q0-40 28-68t68-28h96V960H320v192h96q40 0 68 28t28 68v320q0 40-28 68t-68 28H96q-40 0-68-28t-28-68v-320q0-40 28-68t68-28h96V960q0-52 38-90t90-38h512V640h-96q-40 0-68-28t-28-68V224q0-40 28-68t68-28h320q40 0 68 28t28 68v320q0 40-28 68t-68 28h-96v192h512q52 0 90 38t38 90v192h96q40 0 68 28t28 68z"
  }), React.createElement("span", {
    className: srOnly
  }, label));
};
var Undo = function Undo(_ref9) {
  var label = _ref9.label,
      rest = _objectWithoutPropertiesLoose(_ref9, _excluded9);

  return React.createElement("svg", _extends({
    width: 14,
    height: 14,
    viewBox: "0 0 1792 1792"
  }, rest), React.createElement("path", {
    d: "M1664 896q0 156-61 298t-164 245-245 164-298 61q-172 0-327-72.5T305 1387q-7-10-6.5-22.5t8.5-20.5l137-138q10-9 25-9 16 2 23 12 73 95 179 147t225 52q104 0 198.5-40.5T1258 1258t109.5-163.5T1408 896t-40.5-198.5T1258 534t-163.5-109.5T896 384q-98 0-188 35.5T548 521l137 138q31 30 14 69-17 40-59 40H192q-26 0-45-19t-19-45V256q0-42 40-59 39-17 69 14l130 129q107-101 244.5-156.5T896 128q156 0 298 61t245 164 164 245 61 298z"
  }), React.createElement("span", {
    className: srOnly
  }, label));
};
var Redo = function Redo(_ref10) {
  var label = _ref10.label,
      rest = _objectWithoutPropertiesLoose(_ref10, _excluded10);

  return React.createElement("svg", _extends({
    width: 14,
    height: 14,
    viewBox: "0 0 1792 1792"
  }, rest), React.createElement("path", {
    d: "M1664 256v448q0 26-19 45t-45 19h-448q-42 0-59-40-17-39 14-69l138-138q-148-137-349-137-104 0-198.5 40.5T534 534 424.5 697.5 384 896t40.5 198.5T534 1258t163.5 109.5T896 1408q119 0 225-52t179-147q7-10 23-12 15 0 25 9l137 138q9 8 9.5 20.5t-7.5 22.5q-109 132-264 204.5T896 1664q-156 0-298-61t-245-164-164-245-61-298 61-298 164-245 245-164 298-61q147 0 284.5 55.5T1425 340l130-129q29-31 70-14 39 17 39 59z"
  }), React.createElement("span", {
    className: srOnly
  }, label));
};

var HeadingSelector = function HeadingSelector(props) {
  var handleMenuClick = function handleMenuClick(heading) {
    props.onSelect(heading);
  };

  return React.createElement(Menu, null, React.createElement(Menu.Trigger, null, props.children), React.createElement(Menu.List, null, React.createElement(Menu.Item, {
    testId: "markdown-action-button-heading-h1",
    onClick: function onClick() {
      return handleMenuClick('h1');
    }
  }, "Heading 1"), React.createElement(Menu.Item, {
    testId: "markdown-action-button-heading-h2",
    onClick: function onClick() {
      return handleMenuClick('h2');
    }
  }, "Heading 2"), React.createElement(Menu.Item, {
    testId: "markdown-action-button-heading-h3",
    onClick: function onClick() {
      return handleMenuClick('h3');
    }
  }, "Heading 3")));
};

var InsertLinkSelector = function InsertLinkSelector(props) {
  if (props.canAddNew) {
    return React.createElement(MultipleMediaContextMenu, _extends({}, props));
  } else {
    return React.createElement(Button, {
      isDisabled: props.disabled,
      startIcon: React.createElement(AssetIcon, null),
      testId: "markdownEditor.linkExistingAssets",
      size: "small",
      variant: "secondary",
      onClick: function onClick() {
        props.onSelectExisting();
      }
    }, "Insert media");
  }
};

var MultipleMediaContextMenu = function MultipleMediaContextMenu(props) {
  return React.createElement(Menu, {
    placement: "bottom-end"
  }, React.createElement(Menu.Trigger, null, React.createElement(Button, {
    endIcon: React.createElement(ChevronDownIcon, null),
    isDisabled: props.disabled,
    startIcon: React.createElement(AssetIcon, null),
    testId: "markdownEditor.insertMediaDropdownTrigger",
    size: "small",
    variant: "secondary"
  }, "Insert media")), React.createElement(Menu.List, null, React.createElement(Menu.Item, {
    testId: "markdownEditor.uploadAssetsAndLink",
    onClick: function onClick() {
      return props.onAddNew();
    }
  }, "Add new media and link"), React.createElement(Menu.Item, {
    testId: "markdownEditor.linkExistingAssets",
    onClick: function onClick() {
      return props.onSelectExisting();
    }
  }, "Link existing media")));
};

var _excluded$1 = ["tooltip", "onClick", "children", "className", "variant", "tooltipPlace", "isDisabled"];
var styles$1 = {
  root: /*#__PURE__*/css({
    position: 'relative',
    zIndex: /*#__PURE__*/Number(tokens.zIndexWorkbenchHeader),
    border: "1px solid " + tokens.gray400,
    backgroundColor: tokens.gray100,
    padding: tokens.spacingXs,
    borderTopLeftRadius: tokens.borderRadiusSmall
  }),
  button: /*#__PURE__*/css({
    height: '30px',
    width: '36px',
    marginLeft: tokens.spacing2Xs,
    marginRight: tokens.spacing2Xs
  }),
  icon: /*#__PURE__*/css({
    fill: tokens.gray700,
    verticalAlign: 'middle'
  }),
  zenButton: /*#__PURE__*/css({
    marginLeft: tokens.spacingXs
  }),
  zenButtonPressed: /*#__PURE__*/css({
    backgroundColor: tokens.gray400
  }),
  tooltip: /*#__PURE__*/css({
    zIndex: /*#__PURE__*/Number(tokens.zIndexTooltip)
  })
};
var ToolbarButton = /*#__PURE__*/React.forwardRef(function (props, ref) {
  var tooltip = props.tooltip,
      onClick = props.onClick,
      children = props.children,
      className = props.className,
      _props$variant = props.variant,
      variant = _props$variant === void 0 ? 'transparent' : _props$variant,
      _props$tooltipPlace = props.tooltipPlace,
      tooltipPlace = _props$tooltipPlace === void 0 ? 'top' : _props$tooltipPlace,
      _props$isDisabled = props.isDisabled,
      isDisabled = _props$isDisabled === void 0 ? false : _props$isDisabled,
      otherProps = _objectWithoutPropertiesLoose(props, _excluded$1);

  return React.createElement(Tooltip, {
    className: styles$1.tooltip,
    placement: tooltipPlace,
    content: tooltip
  }, React.createElement(IconButton, _extends({}, otherProps, {
    ref: ref,
    className: cx(styles$1.button, className),
    isDisabled: isDisabled,
    onClick: onClick,
    variant: variant,
    size: "small",
    icon: children,
    "aria-label": tooltip
  })));
});
ToolbarButton.displayName = 'ToolbarButton';

function MainButtons(props) {
  var tooltipPlace = props.mode === 'zen' ? 'bottom' : 'top';
  return React.createElement(React.Fragment, null, React.createElement(HeadingSelector, {
    onSelect: function onSelect(heading) {
      if (heading && props.actions.headings[heading]) {
        props.actions.headings[heading]();
      }
    }
  }, React.createElement(ToolbarButton, {
    isDisabled: props.disabled,
    testId: "markdown-action-button-heading",
    tooltip: "Headings",
    tooltipPlace: tooltipPlace
  }, React.createElement(HeadingIcon, {
    "aria-label": "Headings",
    className: styles$1.icon
  }))), React.createElement(ToolbarButton, {
    isDisabled: props.disabled,
    testId: "markdown-action-button-bold",
    tooltip: "Bold",
    tooltipPlace: tooltipPlace,
    onClick: props.actions.simple.bold
  }, React.createElement(FormatBoldIcon, {
    "aria-label": "Bold",
    className: styles$1.icon
  })), React.createElement(ToolbarButton, {
    isDisabled: props.disabled,
    testId: "markdown-action-button-italic",
    tooltip: "Italic",
    tooltipPlace: tooltipPlace,
    onClick: props.actions.simple.italic
  }, React.createElement(FormatItalicIcon, {
    "aria-label": "Italic",
    className: styles$1.icon
  })), React.createElement(ToolbarButton, {
    isDisabled: props.disabled,
    testId: "markdown-action-button-quote",
    tooltip: "Quote",
    tooltipPlace: tooltipPlace,
    onClick: props.actions.simple.quote
  }, React.createElement(QuoteIcon, {
    "aria-label": "Quote",
    className: styles$1.icon
  })), React.createElement(ToolbarButton, {
    isDisabled: props.disabled,
    testId: "markdown-action-button-ul",
    tooltip: "Unordered list",
    tooltipPlace: tooltipPlace,
    onClick: props.actions.simple.ul
  }, React.createElement(ListBulletedIcon, {
    "aria-label": "Unordered list",
    className: styles$1.icon
  })), React.createElement(ToolbarButton, {
    isDisabled: props.disabled,
    testId: "markdown-action-button-ol",
    tooltip: "Ordered list",
    tooltipPlace: tooltipPlace,
    onClick: props.actions.simple.ol
  }, React.createElement(ListNumberedIcon, {
    "aria-label": "Ordered list",
    className: styles$1.icon
  })), React.createElement(ToolbarButton, {
    isDisabled: props.disabled,
    testId: "markdown-action-button-link",
    tooltip: "Link",
    tooltipPlace: tooltipPlace,
    onClick: props.actions.insertLink
  }, React.createElement(LinkIcon, {
    "aria-label": "Link",
    className: styles$1.icon
  })));
}

function AdditionalButtons(props) {
  var tooltipPlace = props.mode === 'zen' ? 'bottom' : 'top';
  return React.createElement(React.Fragment, null, React.createElement(ToolbarButton, {
    isDisabled: props.disabled,
    testId: "markdown-action-button-strike",
    tooltip: "Strike out",
    tooltipPlace: tooltipPlace,
    onClick: props.actions.simple.strike
  }, React.createElement(Strikethrough, {
    label: "Strike out",
    className: styles$1.icon
  })), React.createElement(ToolbarButton, {
    isDisabled: props.disabled,
    testId: "markdown-action-button-code",
    tooltip: "Code block",
    tooltipPlace: tooltipPlace,
    onClick: props.actions.simple.code
  }, React.createElement(CodeIcon, {
    "aria-label": "Code block",
    className: styles$1.icon
  })), React.createElement(ToolbarButton, {
    isDisabled: props.disabled,
    testId: "markdown-action-button-hr",
    tooltip: "Horizontal rule",
    tooltipPlace: tooltipPlace,
    onClick: props.actions.simple.hr
  }, React.createElement(HorizontalRuleIcon, {
    "aria-label": "Horizontal rule",
    className: styles$1.icon
  })), React.createElement(ToolbarButton, {
    isDisabled: props.disabled,
    testId: "markdown-action-button-indent",
    tooltip: "Increase indentation",
    tooltipPlace: tooltipPlace,
    onClick: props.actions.simple.indent
  }, React.createElement(Indent, {
    label: "Increase indentation",
    className: styles$1.icon
  })), React.createElement(ToolbarButton, {
    isDisabled: props.disabled,
    testId: "markdown-action-button-dedent",
    tooltip: "Decrease indentation",
    tooltipPlace: tooltipPlace,
    onClick: props.actions.simple.dedent
  }, React.createElement(Dedent, {
    label: "Decrease indentation",
    className: styles$1.icon
  })), React.createElement(ToolbarButton, {
    isDisabled: props.disabled,
    testId: "markdown-action-button-embed",
    tooltip: "Embed external content",
    tooltipPlace: tooltipPlace,
    onClick: props.actions.embedExternalContent
  }, React.createElement(Cubes, {
    label: "Embed external content",
    className: styles$1.icon
  })), React.createElement(ToolbarButton, {
    isDisabled: props.disabled,
    testId: "markdown-action-button-table",
    tooltip: "Insert table",
    tooltipPlace: tooltipPlace,
    onClick: props.actions.insertTable
  }, React.createElement(Table, {
    label: "Insert table",
    className: styles$1.icon
  })), React.createElement(ToolbarButton, {
    isDisabled: props.disabled,
    testId: "markdown-action-button-special",
    tooltip: "Insert special character",
    tooltipPlace: tooltipPlace,
    onClick: props.actions.insertSpecialCharacter
  }, React.createElement(SpecialChar, {
    label: "Insert special character",
    className: styles$1.icon
  })), React.createElement(ToolbarButton, {
    isDisabled: props.disabled,
    testId: "markdown-action-button-organizeLinks",
    tooltip: "Organize links",
    tooltipPlace: tooltipPlace,
    onClick: props.actions.organizeLinks
  }, React.createElement(OrgLinks, {
    label: "Organize links",
    className: styles$1.icon
  })), React.createElement(ToolbarButton, {
    isDisabled: props.disabled,
    testId: "markdown-action-button-undo",
    tooltip: "Undo",
    tooltipPlace: tooltipPlace,
    onClick: props.actions.history.undo
  }, React.createElement(Undo, {
    label: "Undo",
    className: styles$1.icon
  })), React.createElement(ToolbarButton, {
    isDisabled: props.disabled,
    testId: "markdown-action-button-redo",
    tooltip: "Redo",
    tooltipPlace: tooltipPlace,
    onClick: props.actions.history.redo
  }, React.createElement(Redo, {
    label: "Redo",
    className: styles$1.icon
  })));
}

function DefaultMarkdownToolbar(props) {
  var _React$useState = React.useState(false),
      showAdditional = _React$useState[0],
      setShowAdditional = _React$useState[1];

  return React.createElement("div", {
    className: styles$1.root
  }, React.createElement(Flex, {
    justifyContent: "space-between"
  }, React.createElement(Flex, null, React.createElement(MainButtons, _extends({}, props)), React.createElement(ToolbarButton, {
    isDisabled: props.disabled,
    testId: "markdown-action-button-toggle-additional",
    tooltip: showAdditional ? 'Hide additional actions' : 'More actions',
    onClick: function onClick() {
      setShowAdditional(!showAdditional);
    }
  }, React.createElement(MoreHorizontalIcon, {
    className: styles$1.icon
  }))), React.createElement(Flex, null, React.createElement(InsertLinkSelector, {
    disabled: props.disabled,
    onSelectExisting: props.actions.linkExistingMedia,
    onAddNew: props.actions.addNewMedia,
    canAddNew: props.canUploadAssets
  }), React.createElement(ToolbarButton, {
    isDisabled: props.disabled,
    testId: "markdown-action-button-zen",
    variant: "secondary",
    onClick: props.actions.openZenMode,
    className: styles$1.zenButton,
    tooltip: "Expand"
  }, React.createElement(Zen, {
    label: "Expand",
    className: styles$1.icon
  })))), showAdditional && React.createElement(Flex, {
    justifyContent: "space-between",
    marginTop: "spacingXs"
  }, React.createElement(Flex, null, React.createElement(AdditionalButtons, _extends({}, props)))));
}
function ZenMarkdownToolbar(props) {
  return React.createElement("div", {
    className: styles$1.root
  }, React.createElement(Flex, {
    justifyContent: "space-between"
  }, React.createElement(Flex, null, React.createElement(MainButtons, _extends({}, props)), React.createElement(AdditionalButtons, _extends({}, props))), React.createElement(Flex, null, React.createElement(InsertLinkSelector, {
    disabled: props.disabled,
    onSelectExisting: props.actions.linkExistingMedia,
    onAddNew: props.actions.addNewMedia,
    canAddNew: props.canUploadAssets
  }), React.createElement(IconButton, {
    testId: "markdown-action-button-zen-close",
    variant: "secondary",
    size: "small",
    className: cx(styles$1.zenButton, styles$1.zenButtonPressed),
    onClick: function onClick() {
      props.actions.closeZenMode();
    },
    icon: React.createElement(Zen, {
      label: "Collapse",
      className: styles$1.icon
    }),
    "aria-label": "Collapse"
  }))));
}
var MarkdownToolbar = /*#__PURE__*/React.memo(function (props) {
  if (props.mode === 'zen') {
    return React.createElement(ZenMarkdownToolbar, _extends({}, props));
  }

  return React.createElement(DefaultMarkdownToolbar, _extends({}, props));
});
MarkdownToolbar.displayName = 'MarkdownToolbar';

var userAgent = /*#__PURE__*/get(window, 'navigator.userAgent', '');
var platform = /*#__PURE__*/get(window, 'navigator.platform', '');
var ctrlKey = 'Ctrl';
var tests = {
  // eslint-disable-next-line -- TODO: describe this disable  @typescript-eslint/ban-ts-comment
  // @ts-ignore ignore missing MSStream
  ios: /*#__PURE__*/ /(iphone os|ipad|iphone|ipod)/i.test(userAgent) && !window.MSStream
};

if (tests.ios || /mac(68k|ppc|intel)/i.test(platform)) {
  ctrlKey = 'Cmd';
}

function getCtrlKey() {
  return ctrlKey;
}

/* eslint-disable @typescript-eslint/no-use-before-define, @typescript-eslint/no-explicit-any */

function stripUnit(value) {
  if (typeof value !== 'string') return value;
  var cssRegex = /^([+-]?(?:\d+|\d*\.\d+))([a-z]*|%)$/;
  var matchedValue = value.match(cssRegex);

  if (!matchedValue) {
    throw new Error("Couldn't match unit in given string");
  }

  return parseFloat(value);
}

function create(host, options) {
  var _ref = options || {},
      direction = _ref.direction,
      fixedHeight = _ref.fixedHeight,
      height = _ref.height,
      readOnly = _ref.readOnly; // Set to true if `setValue()` has been called. This is to prevent
  // undoing the initial content.


  var initializedWithValue = false;
  var LF = '\n';
  var EDITOR_SIZE = {
    min: height ? stripUnit(height) : 300,
    max: 500,
    shift: 50
  };
  var cm = CodeMirror(host, {
    direction: direction,
    readOnly: readOnly,
    mode: 'markdown',
    lineNumbers: false,
    undoDepth: 200,
    matchBrackets: true,
    lineWrapping: true,
    // When `lineSeparator === null` the document will be split
    // on CRLFs as well as lone CRs and LFs. A single LF will
    // be used as line separator in all output
    lineSeparator: null,
    theme: 'elegant',
    tabSize: 2,
    indentWithTabs: false,
    indentUnit: 2,
    autoRefresh: true,
    spellcheck: true,
    inputStyle: 'contenteditable'
  });
  cm.setSize('100%', EDITOR_SIZE.min);

  if (!fixedHeight) {
    cm.on('change', throttle(assureHeight, 150));
  }

  cm.setOption('extraKeys', {
    Tab: function Tab() {
      replaceSelectedText(getIndentation());
    },
    Enter: 'newlineAndIndentContinueMarkdownList',
    Esc: function Esc() {
      cm.getInputField().blur();
    }
  });
  /**
   * @description
   * Custom API for a CodeMirror instance.
   *
   * An instance wraps a CodeMirror instance and provides a custom interface
   * on top of CodeMirror.
   */

  return {
    destroy: destroy,
    disable: disable,
    enable: enable,
    attachEvent: attachEvent,
    addKeyShortcuts: addKeyShortcuts,
    setValue: setValue,
    cmd: cmd,
    moveToLineBeginning: moveToLineBeginning,
    moveIfNotEmpty: moveIfNotEmpty,
    restoreCursor: restoreCursor,
    moveToLineEnd: moveToLineEnd,
    usePrimarySelection: usePrimarySelection,
    focus: focus,
    select: select,
    selectBackwards: selectBackwards,
    selectAll: function selectAll() {
      return cm.execCommand('selectAll');
    },
    extendSelectionBy: extendSelectionBy,
    insertAtCursor: insertAtCursor,
    insertAtLineBeginning: insertAtLineBeginning,
    wrapSelection: wrapSelection,
    removeFromLineBeginning: removeFromLineBeginning,
    removeSelectedText: removeSelectedText,
    replaceSelectedText: replaceSelectedText,
    getCursor: getCursor,
    setCursor: setCursor,
    getSelection: getSelection,
    getLine: getLine,
    isLineEmpty: isLineEmpty,
    getSelectedText: getSelectedText,
    getSelectionLength: getSelectionLength,
    getCurrentLine: getCurrentLine,
    getCurrentLineNumber: getCurrentLineNumber,
    getCurrentCharacter: getCurrentCharacter,
    getCurrentLineLength: getCurrentLineLength,
    lineStartsWith: lineStartsWith,
    getIndentation: getIndentation,
    getNl: getNl,
    getValue: getValue,
    getLinesCount: getLinesCount,
    getHistorySize: getHistorySize,
    setReadOnly: function setReadOnly(value) {
      return cm.setOption('readOnly', value);
    },
    getHistory: function getHistory() {
      return cm.getHistory();
    },
    setHistory: function setHistory(history) {
      return cm.setHistory(history);
    },
    setFullsize: function setFullsize() {
      cm.setSize('100%', '100%');
      cm.refresh();
    },
    refresh: function refresh() {
      return cm.refresh();
    }
  };

  function destroy() {
    // @ts-expect-error
    cm.toTextArea();
  }

  function disable() {
    cm.setOption('readOnly', 'nocursor');
  }

  function enable() {
    cm.setOption('readOnly', false);
  }

  function assureHeight() {
    var current = cm.heightAtLine(cm.lastLine(), 'local') + EDITOR_SIZE.shift;
    var next = current;

    if (current < EDITOR_SIZE.min) {
      next = EDITOR_SIZE.min;
    }

    if (current > EDITOR_SIZE.max) {
      next = EDITOR_SIZE.max;
    }

    cm.setSize('100%', next);
  }

  function attachEvent(name, fn, throttleInterval) {
    if (throttleInterval) {
      fn = throttle(fn, throttleInterval);
    }

    cm.on(name, fn);
  }

  function addKeyShortcuts(map) {
    var ctrlKey = getCtrlKey();
    cm.addKeyMap(transform(map, function (acc, value, key) {
      // eslint-disable-next-line -- TODO: describe this disable
      // @ts-ignore
      acc[ctrlKey + '-' + key] = value;
    }, {}));
  }
  /**
   * low-level editor manipulation functions
   */

  /**
   * @description
   * Sets the content of the editor while preserving the cursor
   * position.
   *
   * If called for the first time it will not record the change in
   * the history.
   */


  function setValue(value) {
    value = value || '';

    if (getValue() === value) {
      return;
    } // set value, but save cursor position first
    // position will be restored, but w/o focus (third arg)


    var line = getCurrentLineNumber();
    var ch = getCurrentCharacter();
    cm.setValue(value);
    restoreCursor(ch, line, true); // We do not want to record the initial population in the
    // history. Otherwise it would always be possible to revert to
    // the empty string.

    if (!initializedWithValue) {
      cm.clearHistory();
      initializedWithValue = true;
    }
  }

  function cmd(name) {
    cm.execCommand(name);
    cm.focus();
  }

  function moveToLineBeginning(lineNumber) {
    cm.setCursor({
      line: defaultToCurrentLineNumber(lineNumber),
      ch: 0
    });
    cm.focus();
  }
  /**
   * @description
   * Insert a new line below the cursor and move to the beginning of
   * that line.
   *
   * Only do this if the editor has content and we are not already on
   * the last line.
   *
   * TODO rename this
   */


  function moveIfNotEmpty() {
    if (getCurrentLineLength() < 1) {
      return;
    }

    var next = getCurrentLineNumber() + 1;

    if (cm.lastLine() < next) {
      moveToLineEnd();
      insertAtCursor(getNl());
    }

    moveToLineBeginning(next);
  }

  function restoreCursor(character, lineNumber, noFocus) {
    cm.setCursor(defaultToCurrentLineNumber(lineNumber), character, {
      scroll: !noFocus
    });

    if (!noFocus) {
      cm.focus();
    }
  }

  function moveToLineEnd(lineNumber) {
    cm.setCursor({
      line: defaultToCurrentLineNumber(lineNumber),
      ch: getCurrentLineLength()
    });
    cm.focus();
  }

  function defaultToCurrentLineNumber(lineNumber) {
    if (lineNumber === 0 || lineNumber !== undefined && lineNumber > 0) {
      return lineNumber;
    }

    return getCurrentLineNumber();
  }

  function usePrimarySelection() {
    cmd('singleSelection');
  }

  function focus() {
    cm.focus();
  }

  function select(from, to) {
    cm.setSelection(from, to);
    cm.focus();
  }

  function selectBackwards(skip, len) {
    select(getPos(-skip - len), getPos(-skip));

    function getPos(modifier) {
      return {
        line: getCurrentLineNumber(),
        ch: getCurrentCharacter() + modifier
      };
    }
  }

  function extendSelectionBy(modifier) {
    select(getPos('anchor', 0), getPos('head', modifier));

    function getPos(prop, modifier) {
      var selection = getSelection();

      if (!selection) {
        return {
          line: 0,
          ch: 0
        };
      }

      return {
        line: selection[prop].line,
        ch: selection[prop].ch + modifier
      };
    }
  }

  function insertAtCursor(text) {
    cm.replaceRange(text, cm.getCursor());
    cm.focus();
  }

  function insertAtLineBeginning(text) {
    var initialCh = getCurrentCharacter();
    moveToLineBeginning();
    insertAtCursor(text);
    restoreCursor(initialCh + text.length);
    cm.focus();
  }

  function wrapSelection(wrapper) {
    var replacement = wrapper + getSelectedText() + wrapper;
    var selection = getSelection();

    if (selection) {
      cm.replaceRange(replacement, selection.anchor, selection == null ? void 0 : selection.head);
      cm.focus();
    }
  }

  function removeFromLineBeginning(charCount) {
    var lineNumber = getCurrentLineNumber();
    cm.replaceRange('', {
      line: lineNumber,
      ch: 0
    }, {
      line: lineNumber,
      ch: charCount
    });
    cm.focus();
  }

  function removeSelectedText() {
    cm.replaceSelection('');
    cm.focus();
  }
  /**
   * @description
   * Replace the selected text with the given string.
   *
   * If nothing is selected it will insert the text at the current
   * cursor position
   *
   * The optional `select` parameter controls what will be selected
   * afters wards. By default the cursor will be at the end of the
   * inserted text. You can pass 'around' to select the inserted
   * text.
   */


  function replaceSelectedText(replacement, select) {
    cm.replaceSelection(replacement, select);
    cm.focus();
  }
  /**
   *  low-level editor get/check functions
   */


  function getCursor() {
    return cm.getCursor();
  }

  function setCursor(cursor) {
    cm.setCursor(cursor);
  }

  function getSelection() {
    var selections = cm.listSelections();

    if (!cm.somethingSelected() || !selections || selections.length < 1) {
      return null;
    }

    return selections[0];
  }

  function getLine(lineNumber) {
    return cm.getLine(lineNumber) || '';
  }

  function isLineEmpty(lineNumber) {
    var n = defaultToCurrentLineNumber(lineNumber);
    return n > -1 && getLine(n).length < 1 && n < cm.lineCount();
  }

  function getLinesCount() {
    return cm.lineCount();
  }

  function getSelectedText() {
    return getSelection() ? cm.getSelection() : '';
  }

  function getSelectionLength() {
    return getSelectedText().length;
  }

  function getCurrentLine() {
    return getLine(getCurrentLineNumber());
  }

  function getCurrentLineNumber() {
    return cm.getCursor().line;
  }

  function getCurrentCharacter() {
    return cm.getCursor().ch;
  }

  function getCurrentLineLength() {
    return getCurrentLine().length;
  }

  function lineStartsWith(text) {
    return getCurrentLine().startsWith(text);
  }

  function getIndentation() {
    var _cm$getOption;

    return repeat(' ', (_cm$getOption = cm.getOption('indentUnit')) != null ? _cm$getOption : 0);
  }

  function getNl(n) {
    if (n === void 0) {
      n = 1;
    }

    if (n < 1) {
      return '';
    }

    return repeat(LF, n);
  }

  function getValue() {
    return cm.getValue() || '';
  }

  function getHistorySize(which) {
    var history = cm.historySize();
    return which ? history[which] : history;
  }

  function repeat(what, n) {
    return new Array(n + 1).join(what);
  }
}

/* eslint-disable @typescript-eslint/no-use-before-define */

function createPrefixToggleFn(prefix) {
  return function (editor) {
    if (editor.lineStartsWith(prefix)) {
      editor.removeFromLineBeginning(prefix.length);
    } else {
      editor.insertAtLineBeginning(prefix);
    }
  };
}
/**
 * Wraps the current selection with a marker.
 *
 * If nothing is selected it inserts the given text wrapped in the
 * marker and selects the inner text
 *
 * Used b the `bold`, `italic`, and `strike` commands.
 */


function wrapSelection(editor, marker, emptyText) {
  return function () {
    editor.usePrimarySelection(); // there's a selection - wrap it with inline marker

    if (editor.getSelection()) {
      var selectedText = editor.getSelectedText();

      if (selectedText.startsWith(marker) && selectedText.endsWith(marker)) {
        var markerLength = marker.length;
        var textWithoutMarker = selectedText.slice(markerLength, selectedText.length - markerLength);
        editor.replaceSelectedText(textWithoutMarker);
      } else {
        editor.wrapSelection(marker);
      }
    } else {
      // no selection - insert sample text and select it
      editor.insertAtCursor(marker + emptyText + marker);
      editor.selectBackwards(marker.length, emptyText.length);
    }
  };
}

var HEADER_CHAR = '#';
var quoteToggleFn = /*#__PURE__*/createPrefixToggleFn('> ');
var codeToggleFn = /*#__PURE__*/createPrefixToggleFn('    ');
/**
 * @description
 * A collection of commands used by the user bound to a
 * CodeMirrorWrapper instance.
 *
 * The command collection only depends on the wrapper instance and is
 * used by UI from code mirror stuff.
 */

function create$1(editor) {
  return {
    bold: wrapSelection(editor, '__', 'text in bold'),
    italic: wrapSelection(editor, '*', 'text in italic'),
    strike: wrapSelection(editor, '~~', 'striked out'),
    quote: modifySelection(editor, quoteToggleFn),
    code: modifySelection(editor, codeToggleFn),
    link: link,
    h1: toggleHeader(editor, 1),
    h2: toggleHeader(editor, 2),
    h3: toggleHeader(editor, 3),
    ul: modifySelection(editor, ulToggleFn, true),
    ol: modifySelection(editor, olToggleFn, true),
    undo: function undo() {
      editor.cmd('undo');
    },
    redo: function redo() {
      editor.cmd('redo');
    },
    hr: hr,
    indent: indent,
    dedent: dedent,
    table: table
  };
  /**
   * @description
   * Insert a line with `---` below the cursor.
   */

  function hr() {
    editor.moveIfNotEmpty();
    var nl = editor.getNl();
    var markup = nl + '---' + nl + nl;
    editor.insertAtCursor(markup);
  }
  /**
   * @description
   * Indent the current line.
   */


  function indent() {
    editor.insertAtLineBeginning(editor.getIndentation());
  }
  /**
   * @description
   * Dedent the current line.
   */


  function dedent() {
    var indentation = editor.getIndentation();

    if (editor.lineStartsWith(indentation)) {
      editor.removeFromLineBeginning(indentation.length);
    }
  }
  /**
   * @description
   * Insert a markdown table template in a new line.
   */


  function table(config) {
    var nl = editor.getNl();
    editor.moveIfNotEmpty();
    editor.insertAtCursor(nl);
    var line = editor.getCurrentLineNumber();
    editor.insertAtCursor(tableTemplate(config.rows, config.cols).join(nl));
    editor.insertAtCursor(nl + nl);
    editor.restoreCursor(2, line);
  }
  /**
   * @description
   * Inserts or replaces the current selection with a markdown link
   */


  function link(url, text, title) {
    editor.usePrimarySelection();
    var linkTitle = title ? ' "' + title + '"' : '';
    var link = text ? '[' + text + '](' + url + linkTitle + ')' : '<' + url + '>';
    editor.replaceSelectedText(link, 'around');
  }
}
/**
 * For each line in the selection move to that line and call
 * `toggleFn` with the 1-based index of the line in the selection.
 *
 * If there is no selection we just call `toggleFn(editor)`.
 */

function modifySelection(editor, toggleFn, isList) {
  return function () {
    editor.usePrimarySelection();
    var selection = editor.getSelection();

    if (selection) {
      // there's a selection - toggle list bullet for each line
      // listNumber is 1, 2, 3... and can be used as ol bullet
      forLineIn(selection, function (lineNumber, listNumber) {
        // TODO move this into forLineIn
        editor.moveToLineBeginning(lineNumber);
        toggleFn(editor, listNumber);
      });
      editor.moveToLineEnd();
    } else {
      // there's no selection - just toggle line prefix
      // but if adding list, add whitespace before and after list
      if (isList && !getListNumber(editor) && !editor.lineStartsWith('- ')) {
        prepareListWhitespace(editor);
      }

      toggleFn(editor);
    }
  };
}
/**
 * Calls callback for each line number that is in the selection
 *
 * The second argument is the 1-based index of the iteration.
 *
 * @param {CodeMirror.Selection} selection
 * param {function(number)} cb
 */


function forLineIn(selection, cb) {
  // anchor/head depend on selection direction, so min & max have to be used
  var lines = [selection.anchor.line, selection.head.line];
  var maxNumber = max(lines);
  var minNumber = min(lines);
  var lineRange = range(minNumber || 0, maxNumber !== undefined ? maxNumber + 1 : undefined);
  lineRange.forEach(function (lineNumber, i) {
    cb(lineNumber, i + 1);
  });
}

function prepareListWhitespace(editor) {
  var line = editor.getCurrentLineNumber();
  var isCurrentLineEmpty = editor.isLineEmpty(line);
  var isPrevLineEmpty = line > 0 ? editor.isLineEmpty(line - 1) : false;
  var isNextLineEmpty = line < editor.getLinesCount() - 1 ? editor.isLineEmpty(line + 1) : true;
  var linesToInsert = isCurrentLineEmpty ? 2 : 4;

  if (isPrevLineEmpty) {
    linesToInsert = linesToInsert - 1;
  }

  if (isNextLineEmpty) {
    linesToInsert = linesToInsert - 1;
  }

  editor.moveToLineEnd();
  editor.insertAtCursor(editor.getNl(linesToInsert));
  editor.restoreCursor(0, isCurrentLineEmpty ? line : line + 2);
}

function getListNumber(editor) {
  var result = editor.getCurrentLine().match(/^(\d+\. )/);
  return result ? result[1] : null;
}

function ulToggleFn(editor) {
  if (editor.lineStartsWith('- ')) {
    editor.removeFromLineBeginning(2);
  } else {
    var listNumber = getListNumber(editor);

    if (listNumber) {
      editor.removeFromLineBeginning(listNumber.length);
    }

    editor.insertAtLineBeginning('- ');
  }
}

function olToggleFn(editor, n) {
  var listNumber = getListNumber(editor);

  if (listNumber) {
    editor.removeFromLineBeginning(listNumber.length);
  } else {
    if (editor.lineStartsWith('- ')) {
      editor.removeFromLineBeginning(2);
    }

    editor.insertAtLineBeginning((n || 1) + '. ');
  }
}
/**
 * From a table layout specification build a Markdown table template.
 *
 * Returns the lines as an array.
 * Used by the `table()` command
 *
 * @param {object} config
 * @param {number} rows
 * @param {number} cols
 * @returns {string[]}
 */


function tableTemplate(nrows, ncols) {
  var cellWidth = new Array(11);
  var cell = ' ' + cellWidth.join(' ') + ' |';
  var separatorCell = ' ' + cellWidth.join('-') + ' |';
  var baseRow = '|';
  var separatorRow = '|';
  times(ncols, function () {
    baseRow += cell;
    separatorRow += separatorCell;
  });
  var bodyRows = range(nrows).map(function () {
    return baseRow.replace(/\| {5}/g, '| Cell');
  });
  var headerRow = baseRow.replace(/\| {7}/g, '| Header');
  return [headerRow, separatorRow].concat(bodyRows);
}
/**
 * Toggles the header prefix for a given level on the current line.
 *
 * - Removes a header when one of the same level is
 * - Replaces the header if there is one of a different level
 * - Otherwise inserts the header
 */


function toggleHeader(editor, level) {
  return function () {
    var initialCh = editor.getCurrentCharacter();
    var currentHeader = selectHeader(editor);
    var prefix = repeat(HEADER_CHAR, level); // there's no header at the current line - create one

    if (!currentHeader) {
      editor.moveToLineBeginning();
      editor.insertAtCursor(prefix + ' ');
      editor.restoreCursor(initialCh + prefix.length + 1);
      return;
    } // there's exactly the same header - remove one


    if (editor.getSelectedText() === prefix) {
      editor.extendSelectionBy(1);
      var removedCh = editor.getSelectionLength();
      editor.removeSelectedText();
      editor.restoreCursor(initialCh - removedCh);
      return;
    } // there's another header at the current line - replace


    var diff = prefix.length - editor.getSelectionLength();
    editor.replaceSelectedText(prefix);
    editor.restoreCursor(initialCh + diff);
  };
}
/**
 * On the current line select a Markdown header prefix. That is the
 * string at the beginning of the line that consists of up to six `#`.
 *
 * If the selection was successful return the selected string.
 */


function selectHeader(editor) {
  var result = editor.getCurrentLine().match(/^( {0,3})(#{1,6}) /);

  if (!result) {
    return null;
  }

  var indentation = result[1];
  var header = result[2];
  editor.select(getPos(0), getPos(header.length));
  return editor.getSelection();

  function getPos(modifier) {
    return {
      line: editor.getCurrentLineNumber(),
      ch: indentation.length + modifier
    };
  }
}

/* eslint-disable @typescript-eslint/no-explicit-any */
function createMarkdownEditor(host, options) {
  var editor = create(host, options);

  function wrapChange(fn) {
    return function (e, ch) {
      fn(editor.getValue(), e, ch);
    };
  }

  var api = {
    actions: create$1(editor),
    history: {
      hasUndo: function hasUndo() {
        return editor.getHistorySize('undo') > 0;
      },
      hasRedo: function hasRedo() {
        return editor.getHistorySize('redo') > 0;
      }
    },
    events: {
      onScroll: function onScroll(fn) {
        editor.attachEvent('scroll', fn, 150);
      },
      onChange: function onChange(fn) {
        editor.attachEvent('change', wrapChange(fn), 0);
      },
      onPaste: function onPaste(fn) {
        editor.attachEvent('paste', fn, 0);
      }
    },
    insert: editor.insertAtCursor,
    focus: editor.focus,
    getContent: editor.getValue,
    destroy: editor.destroy,
    setContent: editor.setValue,
    getSelectedText: editor.getSelectedText,
    usePrimarySelection: editor.usePrimarySelection,
    setReadOnly: editor.setReadOnly,
    selectBackwards: editor.selectBackwards,
    getCursor: editor.getCursor,
    setCursor: editor.setCursor,
    clear: function clear() {
      return editor.setValue('');
    },
    selectAll: editor.selectAll,
    setFullsize: editor.setFullsize,
    refresh: editor.refresh
  };
  editor.addKeyShortcuts({
    B: api.actions.bold,
    I: api.actions.italic
  });
  return api;
}

var _templateObject, _templateObject2;
var styles$2 = {
  root: /*#__PURE__*/css(_templateObject || (_templateObject = /*#__PURE__*/_taggedTemplateLiteralLoose(["\n    border: 1px solid ", ";\n    border-width: 0 1px;\n    overflow-y: auto;\n    height: auto;\n    min-height: 300px;\n\n    .CodeMirror {\n      height: auto;\n      line-height: ", ";\n    }\n    .CodeMirror-lines {\n      color: ", ";\n      padding: ", ";\n    }\n    .CodeMirror-code {\n      font-family: ", ";\n      font-size: ", ";\n    }\n    .CodeMirror-scroll {\n      min-height: '6rem';\n    }\n\n    .cm-header {\n      color: ", ";\n    }\n    span.cm-variable-2 {\n      color: ", ";\n    }\n    .cm-header-1 {\n      font-size: 1.9em;\n    }\n    .cm-header-2 {\n      font-size: 1.75em;\n    }\n    .cm-header-3 {\n      font-size: 1.6em;\n    }\n    .cm-header-4 {\n      font-size: 1.45em;\n    }\n    .cm-header-5 {\n      font-size: 1.3em;\n    }\n    .cm-header-6 {\n      font-size: 1.15em;\n    }\n\n    span.cm-tag,\n    span.cm-string,\n    span.cm-attribute {\n      color: ", ";\n    }\n    span.cm-string {\n      text-decoration: none !important;\n    }\n    span.cm-quote,\n    span.cm-comment {\n      color: ", ";\n    }\n    span.cm-link,\n    span.cm-url {\n      color: ", " !important;\n    }\n    span.cm-link {\n      text-decoration: underline;\n    }\n  "])), tokens.gray400, tokens.lineHeightDefault, tokens.gray700, tokens.spacingL, tokens.fontStackMonospace, tokens.fontSizeM, tokens.gray900, tokens.gray700, tokens.red600, tokens.gray600, tokens.blue500),
  framed: /*#__PURE__*/css({
    '.CodeMirror': {
      maxHeight: '500px'
    }
  }),
  zen: /*#__PURE__*/css({
    border: 'none !important',
    '.CodeMirror-lines': {
      maxWidth: '650px',
      margin: '0 auto'
    }
  }),
  disabled: /*#__PURE__*/css(_templateObject2 || (_templateObject2 = /*#__PURE__*/_taggedTemplateLiteralLoose(["\n    .CodeMirror {\n      background: ", ";\n      cursor: 'not-allowed';\n    }\n    .CodeMirror-cursors {\n      visibility: hidden !important;\n    }\n    .CodeMirror-scroll,\n    .CodeMirror-sizer,\n    .CodeMirror-lines {\n      cursor: not-allowed;\n    }\n  "])), tokens.gray100)
};
var MarkdownTextarea = /*#__PURE__*/React.memo(function (props) {
  var hostRef = useRef(null);

  var _useState = useState(null),
      editor = _useState[0],
      setEditor = _useState[1];

  useEffect(function () {
    if (hostRef.current) {
      setEditor(createMarkdownEditor(hostRef.current, Object.assign({}, {
        direction: props.direction,
        readOnly: true
      }, props.mode === 'zen' ? {
        fixedHeight: true,
        height: '100%'
      } : {}, props.minHeight !== undefined ? {
        height: props.minHeight
      } : {})));
    } // eslint-disable-next-line react-hooks/exhaustive-deps -- TODO: Evaluate the dependencies

  }, []);
  useEffect(function () {
    if (editor) {
      props.onReady(editor);
    } // eslint-disable-next-line react-hooks/exhaustive-deps -- TODO: Evaluate the dependencies

  }, [editor]);
  var className = cx(styles$2.root, props.minHeight !== undefined ? css({
    minHeight: props.minHeight
  }) : undefined, props.mode === 'default' ? styles$2.framed : styles$2.zen, props.disabled && styles$2.disabled);
  return React.createElement("div", {
    className: className,
    ref: hostRef,
    "data-test-id": "markdown-textarea",
    style: {
      display: props.visible ? 'block' : 'none'
    }
  });
});
MarkdownTextarea.displayName = 'MarkdownTextarea';

var styles$3 = {
  root: /*#__PURE__*/css({
    display: 'flex',
    justifyContent: 'space-between',
    background: tokens.gray100,
    border: "1px solid " + tokens.gray400,
    borderBottomLeftRadius: tokens.borderRadiusSmall,
    borderBottomRightRadius: tokens.borderRadiusSmall,
    padding: tokens.spacingXs + " " + tokens.spacingS
  }),
  help: /*#__PURE__*/css({
    color: tokens.gray700,
    fontSize: tokens.fontSizeS,
    button: {
      fontSize: tokens.fontSizeS,
      lineHeight: 'inherit'
    }
  })
};
function MarkdownHelp(props) {
  return React.createElement(Paragraph, {
    marginBottom: "none",
    className: styles$3.help
  }, "Format your text like a pro with the", ' ', React.createElement(TextLink, {
    as: "button",
    testId: "open-markdown-cheatsheet-button",
    onClick: function onClick() {
      props.onClick();
    }
  }, "markdown cheatsheet"), ".");
}
function MarkdownBottomBar(props) {
  return React.createElement("div", {
    className: styles$3.root
  }, props.children);
}

var MarkdownDialogType;

(function (MarkdownDialogType) {
  MarkdownDialogType["cheatsheet"] = "markdown-cheatsheet";
  MarkdownDialogType["insertLink"] = "markdown-insertLink";
  MarkdownDialogType["insertSpecialCharacter"] = "markdown-insertSpecialCharacter";
  MarkdownDialogType["insertTable"] = "markdown-insertTable";
  MarkdownDialogType["embedExternalContent"] = "markdown-embedExternalContent";
  MarkdownDialogType["confirmInsertAsset"] = "markdown-confirmInsertAsset";
  MarkdownDialogType["zenMode"] = "markdown-zenMode";
})(MarkdownDialogType || (MarkdownDialogType = {}));

var styles$4 = {
  flexColumnContainer: /*#__PURE__*/css({
    display: 'flex',
    flexWrap: 'nowrap'
  }),
  flexColumn: /*#__PURE__*/css({
    flexGrow: 1
  }),
  verticalDivider: /*#__PURE__*/css({
    borderRight: "1px solid " + tokens.gray500,
    paddingRight: tokens.spacing3Xl,
    marginRight: tokens.spacing2Xl
  }),
  preview: /*#__PURE__*/css({
    display: 'inline-block',
    paddingRight: tokens.spacingL,
    width: '50%'
  }),
  unOrderedListPreview: /*#__PURE__*/css({
    listStyleType: 'disc',
    marginLeft: tokens.spacingS
  }),
  orderedListPreview: /*#__PURE__*/css({
    listStyleType: 'decimal',
    marginLeft: tokens.spacingS
  }),
  markup: /*#__PURE__*/css({
    display: 'inline-block',
    color: tokens.gray600,
    paddingLeft: tokens.spacingL,
    width: '50%'
  }),
  h1: /*#__PURE__*/css({
    fontSize: tokens.fontSize2Xl
  }),
  h2: /*#__PURE__*/css({
    fontSize: tokens.fontSizeXl
  }),
  h3: /*#__PURE__*/css({
    fontSize: tokens.fontSizeL
  }),
  helpItem: /*#__PURE__*/css({
    marginBottom: tokens.spacingS,
    display: 'flex',
    alignItems: 'flex-end',
    height: tokens.spacingXl
  }),
  helpLink: /*#__PURE__*/css({
    margin: 'auto'
  }),
  flexRowContainer: /*#__PURE__*/css({
    display: 'flex',
    width: '100%',
    justifyContent: 'center',
    marginTop: tokens.spacingXl
  })
};
var CheatsheetModalDialog = function CheatsheetModalDialog() {
  return React.createElement(ModalContent, {
    testId: "markdown-cheatsheet-dialog-content"
  }, React.createElement("div", {
    className: styles$4.flexColumnContainer
  }, React.createElement("div", {
    className: cx(styles$4.flexColumn, styles$4.verticalDivider)
  }, React.createElement("div", {
    className: styles$4.helpItem
  }, React.createElement(Heading, {
    marginBottom: "none",
    as: "h1",
    className: cx(styles$4.preview, styles$4.h1)
  }, "H1"), React.createElement("div", {
    className: styles$4.markup
  }, "# heading")), React.createElement("div", {
    className: styles$4.helpItem
  }, React.createElement(Heading, {
    marginBottom: "none",
    as: "h2",
    className: cx(styles$4.preview, styles$4.h2)
  }, "H2"), React.createElement("div", {
    className: styles$4.markup
  }, "## heading")), React.createElement("div", {
    className: styles$4.helpItem
  }, React.createElement(Heading, {
    marginBottom: "none",
    as: "h3",
    className: cx(styles$4.preview, styles$4.h3)
  }, "H3"), React.createElement("div", {
    className: styles$4.markup
  }, "### heading")), React.createElement("div", {
    className: styles$4.helpItem
  }, React.createElement("strong", {
    className: styles$4.preview
  }, "bold"), React.createElement("div", {
    className: styles$4.markup
  }, "__text__")), React.createElement("div", {
    className: styles$4.helpItem
  }, React.createElement("em", {
    className: styles$4.preview
  }, "italic"), React.createElement("div", {
    className: styles$4.markup
  }, "*text*")), React.createElement("div", {
    className: styles$4.helpItem
  }, React.createElement("div", {
    className: styles$4.preview
  }, "strikethrough"), React.createElement("div", {
    className: styles$4.markup
  }, "~~text~~")), React.createElement("div", {
    className: styles$4.helpItem
  }, React.createElement(TextLink, {
    as: "button",
    className: styles$4.preview
  }, "Link"), React.createElement("div", {
    className: styles$4.markup
  }, "[text](url)"))), React.createElement("div", {
    className: styles$4.flexColumn
  }, React.createElement("div", {
    className: styles$4.helpItem
  }, React.createElement("div", {
    className: styles$4.preview
  }, "Image"), React.createElement("div", {
    className: styles$4.markup
  }, "![alt-text](url)")), React.createElement("div", {
    className: styles$4.helpItem
  }, React.createElement("div", {
    className: styles$4.preview
  }, "Unordered list"), React.createElement("div", {
    className: styles$4.markup
  }, "* list item")), React.createElement("div", {
    className: styles$4.helpItem
  }, React.createElement("div", {
    className: styles$4.preview
  }, React.createElement("div", null, "Ordered list")), React.createElement("div", {
    className: styles$4.markup
  }, "1. list item")), React.createElement("div", {
    className: styles$4.helpItem
  }, React.createElement("div", {
    className: styles$4.preview
  }, React.createElement("div", null, "Blockquote")), React.createElement("div", {
    className: styles$4.markup
  }, "> quote")), React.createElement("div", {
    className: styles$4.helpItem
  }, React.createElement("div", {
    className: styles$4.preview
  }, "code span"), React.createElement("div", {
    className: styles$4.markup
  }, "`code here`")), React.createElement("div", {
    className: styles$4.helpItem
  }, React.createElement("div", {
    className: styles$4.preview
  }, "code block"), React.createElement("div", {
    className: styles$4.markup
  }, "```code here```")))), React.createElement("div", {
    className: styles$4.flexRowContainer
  }, React.createElement(TextLink, {
    className: styles$4.helpLink,
    href: "https://help.github.com/en/github/writing-on-github/basic-writing-and-formatting-syntax",
    target: "_blank",
    rel: "noopener noreferrer"
  }, "View the full GitHub-flavored Markdown syntax help (opens in a new window)")));
};
var openCheatsheetModal = function openCheatsheetModal(dialogs) {
  return dialogs.openCurrent({
    title: 'Markdown formatting help',
    width: 'large',
    minHeight: '415px',
    shouldCloseOnEscapePress: true,
    shouldCloseOnOverlayClick: true,
    parameters: {
      type: MarkdownDialogType.cheatsheet
    }
  });
};

// This code will replace '&amp;' with '&' only inside the href attribute of the mailto link.
// Otherwise the mailto link will not work correctly
var replaceMailtoAmp = function replaceMailtoAmp(string) {
  return string.replace(/href="mailto:[^"]*&amp;/g, function (match) {
    return match.replace(/&amp;/g, '&');
  });
};

var _excluded$2 = ["Embedly", "children"];

var _templateObject$1;
var styles$5 = {
  root: /*#__PURE__*/css(_templateObject$1 || (_templateObject$1 = /*#__PURE__*/_taggedTemplateLiteralLoose(["\n    border: 1px solid ", ";\n    border-width: 0 1px;\n    word-wrap: break-word;\n    overflow-wrap: break-word;\n    min-height: 300px;\n    padding: ", ";\n    font-size: ", ";\n    font-family: ", ";\n    line-height: ", ";\n    color: ", ";\n    white-space: pre-line;\n\n    h1,\n    h2,\n    h3,\n    h4,\n    h5,\n    h6 {\n      margin-top: ", ";\n      margin-bottom: ", ";\n      color: ", ";\n    }\n\n    h1:first-child,\n    h2:first-child,\n    h3:first-child,\n    h4:first-child,\n    h5:first-child,\n    h6:first-child {\n      margin-top: 0;\n    }\n\n    h1 {\n      font-size: 1.9em;\n    }\n    h2 {\n      font-size: 1.75em;\n    }\n    h3 {\n      font-size: 1.6em;\n    }\n    h4 {\n      font-size: 1.45em;\n    }\n    h5 {\n      font-size: 1.3em;\n    }\n    h6 {\n      font-size: 1.15em;\n    }\n\n    p {\n      margin-top: 0;\n      margin-bottom: ", ";\n    }\n\n    ul,\n    ol {\n      margin: ", " 0;\n      padding-left: ", ";\n    }\n    ul > li {\n      list-style-type: disc;\n      margin-bottom: 0;\n    }\n\n    ol > li {\n      list-style-type: decimal;\n      margin-bottom: 0;\n    }\n\n    table {\n      table-layout: fixed;\n      border-right-width: 0;\n      border-bottom-width: 0;\n      width: 80%;\n      margin: ", " auto;\n      border-spacing: 0;\n      border-collapse: collapse;\n      border: 1px solid ", ";\n    }\n\n    table th,\n    table td {\n      padding: 5px;\n      border-left-width: 0;\n      border-top-width: 0;\n    }\n\n    table th {\n      background: ", ";\n    }\n\n    table td {\n      border: 1px solid ", ";\n    }\n\n    a {\n      color: ", ";\n    }\n\n    hr {\n      margin-top: ", ";\n      margin-bottom: ", ";\n      height: 1px;\n      background-color: ", ";\n      border: none;\n    }\n\n    blockquote {\n      border-left: 4px solid ", ";\n      padding-left: ", ";\n      margin: 0;\n      margin-top: ", ";\n      font-style: italic;\n    }\n\n    img {\n      margin: ", " auto;\n      display: block;\n      max-width: 80%;\n      max-height: 250px;\n    }\n\n    pre code {\n      font-size: ", ";\n      font-family: ", ";\n    }\n\n    .embedly-card {\n      margin: ", " auto;\n      display: block;\n    }\n  "])), tokens.gray400, tokens.spacingL, tokens.fontSizeM, tokens.fontStackPrimary, tokens.lineHeightDefault, tokens.gray700, tokens.spacingL, tokens.spacingM, tokens.gray900, tokens.spacingM, tokens.spacingS, tokens.spacingM, tokens.spacingM, tokens.gray300, tokens.gray200, tokens.gray300, tokens.blue500, tokens.spacingL, tokens.spacingL, tokens.gray300, tokens.gray200, tokens.spacingL, tokens.spacingM, tokens.spacingM, tokens.fontSizeS, tokens.fontStackMonospace, tokens.spacingM),
  framed: /*#__PURE__*/css({
    height: '100%',
    maxHeight: '500px',
    overflowY: 'auto'
  }),
  zen: /*#__PURE__*/css({
    maxWidth: '650px',
    margin: '0 auto',
    border: 'none !important'
  }),
  rtl: /*#__PURE__*/css({
    direction: 'rtl'
  })
};

function MarkdownLink(props) {
  var Embedly = props.Embedly,
      children = props.children,
      rest = _objectWithoutPropertiesLoose(props, _excluded$2);

  if (props.className === 'embedly-card' && Embedly) {
    return React.createElement(Embedly, {
      url: props.href
    });
  }

  return React.createElement("a", _extends({}, rest, {
    target: "_blank",
    rel: "noopener noreferrer"
  }), children);
}

var MarkdownPreview = /*#__PURE__*/React.memo(function (props) {
  var _props$previewCompone;

  var className = cx(styles$5.root, props.minHeight !== undefined ? css({
    minHeight: props.minHeight
  }) : undefined, props.mode === 'default' ? styles$5.framed : styles$5.zen, props.direction === 'rtl' ? styles$5.rtl : undefined); // See the list of allowed Tags here:
  // https://github.com/cure53/DOMPurify/blob/main/src/tags.js#L3-L121

  var cleanHTML = React.useMemo(function () {
    return replaceMailtoAmp(DOMPurify.sanitize(props.value));
  }, [props.value]);
  return React.createElement("div", {
    className: className,
    "data-test-id": "markdown-preview"
  }, React.createElement(Markdown, {
    options: {
      overrides: {
        a: {
          // eslint-disable-next-line -- TODO: describe this disable  @typescript-eslint/no-explicit-any
          component: MarkdownLink,
          props: {
            Embedly: (_props$previewCompone = props.previewComponents) == null ? void 0 : _props$previewCompone.embedly
          }
        }
      }
    }
  }, cleanHTML));
});
MarkdownPreview.displayName = 'MarkdownPreview';

var styles$6 = {
  root: /*#__PURE__*/css({
    display: 'flex',
    justifyContent: 'space-between',
    fontSize: tokens.fontSizeM,
    marginTop: tokens.spacingXs,
    color: tokens.gray700
  })
};
function MarkdownConstraints(props) {
  var constraints = ConstraintsUtils.fromFieldValidations(props.sdk.field.validations, props.sdk.field.type);
  var checkConstraint = ConstraintsUtils.makeChecker(constraints);
  return React.createElement("div", {
    className: styles$6.root
  }, React.createElement(CharCounter, {
    value: props.value,
    checkConstraint: checkConstraint
  }), React.createElement(CharValidation, {
    constraints: constraints
  }));
}

function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

var runtime_1 = /*#__PURE__*/createCommonjsModule(function (module) {
  /**
   * Copyright (c) 2014-present, Facebook, Inc.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   */
  var runtime = function (exports) {

    var Op = Object.prototype;
    var hasOwn = Op.hasOwnProperty;
    var undefined$1; // More compressible than void 0.

    var $Symbol = typeof Symbol === "function" ? Symbol : {};
    var iteratorSymbol = $Symbol.iterator || "@@iterator";
    var asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator";
    var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

    function define(obj, key, value) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
      return obj[key];
    }

    try {
      // IE 8 has a broken Object.defineProperty that only works on DOM objects.
      define({}, "");
    } catch (err) {
      define = function define(obj, key, value) {
        return obj[key] = value;
      };
    }

    function wrap(innerFn, outerFn, self, tryLocsList) {
      // If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.
      var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
      var generator = Object.create(protoGenerator.prototype);
      var context = new Context(tryLocsList || []); // The ._invoke method unifies the implementations of the .next,
      // .throw, and .return methods.

      generator._invoke = makeInvokeMethod(innerFn, self, context);
      return generator;
    }

    exports.wrap = wrap; // Try/catch helper to minimize deoptimizations. Returns a completion
    // record like context.tryEntries[i].completion. This interface could
    // have been (and was previously) designed to take a closure to be
    // invoked without arguments, but in all the cases we care about we
    // already have an existing method we want to call, so there's no need
    // to create a new function object. We can even get away with assuming
    // the method takes exactly one argument, since that happens to be true
    // in every case, so we don't have to touch the arguments object. The
    // only additional allocation required is the completion record, which
    // has a stable shape and so hopefully should be cheap to allocate.

    function tryCatch(fn, obj, arg) {
      try {
        return {
          type: "normal",
          arg: fn.call(obj, arg)
        };
      } catch (err) {
        return {
          type: "throw",
          arg: err
        };
      }
    }

    var GenStateSuspendedStart = "suspendedStart";
    var GenStateSuspendedYield = "suspendedYield";
    var GenStateExecuting = "executing";
    var GenStateCompleted = "completed"; // Returning this object from the innerFn has the same effect as
    // breaking out of the dispatch switch statement.

    var ContinueSentinel = {}; // Dummy constructor functions that we use as the .constructor and
    // .constructor.prototype properties for functions that return Generator
    // objects. For full spec compliance, you may wish to configure your
    // minifier not to mangle the names of these two functions.

    function Generator() {}

    function GeneratorFunction() {}

    function GeneratorFunctionPrototype() {} // This is a polyfill for %IteratorPrototype% for environments that
    // don't natively support it.


    var IteratorPrototype = {};
    define(IteratorPrototype, iteratorSymbol, function () {
      return this;
    });
    var getProto = Object.getPrototypeOf;
    var NativeIteratorPrototype = getProto && getProto(getProto(values([])));

    if (NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {
      // This environment has a native %IteratorPrototype%; use it instead
      // of the polyfill.
      IteratorPrototype = NativeIteratorPrototype;
    }

    var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype);
    GeneratorFunction.prototype = GeneratorFunctionPrototype;
    define(Gp, "constructor", GeneratorFunctionPrototype);
    define(GeneratorFunctionPrototype, "constructor", GeneratorFunction);
    GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"); // Helper for defining the .next, .throw, and .return methods of the
    // Iterator interface in terms of a single ._invoke method.

    function defineIteratorMethods(prototype) {
      ["next", "throw", "return"].forEach(function (method) {
        define(prototype, method, function (arg) {
          return this._invoke(method, arg);
        });
      });
    }

    exports.isGeneratorFunction = function (genFun) {
      var ctor = typeof genFun === "function" && genFun.constructor;
      return ctor ? ctor === GeneratorFunction || // For the native GeneratorFunction constructor, the best we can
      // do is to check its .name property.
      (ctor.displayName || ctor.name) === "GeneratorFunction" : false;
    };

    exports.mark = function (genFun) {
      if (Object.setPrototypeOf) {
        Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
      } else {
        genFun.__proto__ = GeneratorFunctionPrototype;
        define(genFun, toStringTagSymbol, "GeneratorFunction");
      }

      genFun.prototype = Object.create(Gp);
      return genFun;
    }; // Within the body of any async function, `await x` is transformed to
    // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
    // `hasOwn.call(value, "__await")` to determine if the yielded value is
    // meant to be awaited.


    exports.awrap = function (arg) {
      return {
        __await: arg
      };
    };

    function AsyncIterator(generator, PromiseImpl) {
      function invoke(method, arg, resolve, reject) {
        var record = tryCatch(generator[method], generator, arg);

        if (record.type === "throw") {
          reject(record.arg);
        } else {
          var result = record.arg;
          var value = result.value;

          if (value && typeof value === "object" && hasOwn.call(value, "__await")) {
            return PromiseImpl.resolve(value.__await).then(function (value) {
              invoke("next", value, resolve, reject);
            }, function (err) {
              invoke("throw", err, resolve, reject);
            });
          }

          return PromiseImpl.resolve(value).then(function (unwrapped) {
            // When a yielded Promise is resolved, its final value becomes
            // the .value of the Promise<{value,done}> result for the
            // current iteration.
            result.value = unwrapped;
            resolve(result);
          }, function (error) {
            // If a rejected Promise was yielded, throw the rejection back
            // into the async generator function so it can be handled there.
            return invoke("throw", error, resolve, reject);
          });
        }
      }

      var previousPromise;

      function enqueue(method, arg) {
        function callInvokeWithMethodAndArg() {
          return new PromiseImpl(function (resolve, reject) {
            invoke(method, arg, resolve, reject);
          });
        }

        return previousPromise = // If enqueue has been called before, then we want to wait until
        // all previous Promises have been resolved before calling invoke,
        // so that results are always delivered in the correct order. If
        // enqueue has not been called before, then it is important to
        // call invoke immediately, without waiting on a callback to fire,
        // so that the async generator function has the opportunity to do
        // any necessary setup in a predictable way. This predictability
        // is why the Promise constructor synchronously invokes its
        // executor callback, and why async functions synchronously
        // execute code before the first await. Since we implement simple
        // async functions in terms of async generators, it is especially
        // important to get this right, even though it requires care.
        previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, // Avoid propagating failures to Promises returned by later
        // invocations of the iterator.
        callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg();
      } // Define the unified helper method that is used to implement .next,
      // .throw, and .return (see defineIteratorMethods).


      this._invoke = enqueue;
    }

    defineIteratorMethods(AsyncIterator.prototype);
    define(AsyncIterator.prototype, asyncIteratorSymbol, function () {
      return this;
    });
    exports.AsyncIterator = AsyncIterator; // Note that simple async functions are implemented on top of
    // AsyncIterator objects; they just return a Promise for the value of
    // the final result produced by the iterator.

    exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) {
      if (PromiseImpl === void 0) PromiseImpl = Promise;
      var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl);
      return exports.isGeneratorFunction(outerFn) ? iter // If outerFn is a generator, return the full iterator.
      : iter.next().then(function (result) {
        return result.done ? result.value : iter.next();
      });
    };

    function makeInvokeMethod(innerFn, self, context) {
      var state = GenStateSuspendedStart;
      return function invoke(method, arg) {
        if (state === GenStateExecuting) {
          throw new Error("Generator is already running");
        }

        if (state === GenStateCompleted) {
          if (method === "throw") {
            throw arg;
          } // Be forgiving, per 25.3.3.3.3 of the spec:
          // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume


          return doneResult();
        }

        context.method = method;
        context.arg = arg;

        while (true) {
          var delegate = context.delegate;

          if (delegate) {
            var delegateResult = maybeInvokeDelegate(delegate, context);

            if (delegateResult) {
              if (delegateResult === ContinueSentinel) continue;
              return delegateResult;
            }
          }

          if (context.method === "next") {
            // Setting context._sent for legacy support of Babel's
            // function.sent implementation.
            context.sent = context._sent = context.arg;
          } else if (context.method === "throw") {
            if (state === GenStateSuspendedStart) {
              state = GenStateCompleted;
              throw context.arg;
            }

            context.dispatchException(context.arg);
          } else if (context.method === "return") {
            context.abrupt("return", context.arg);
          }

          state = GenStateExecuting;
          var record = tryCatch(innerFn, self, context);

          if (record.type === "normal") {
            // If an exception is thrown from innerFn, we leave state ===
            // GenStateExecuting and loop back for another invocation.
            state = context.done ? GenStateCompleted : GenStateSuspendedYield;

            if (record.arg === ContinueSentinel) {
              continue;
            }

            return {
              value: record.arg,
              done: context.done
            };
          } else if (record.type === "throw") {
            state = GenStateCompleted; // Dispatch the exception by looping back around to the
            // context.dispatchException(context.arg) call above.

            context.method = "throw";
            context.arg = record.arg;
          }
        }
      };
    } // Call delegate.iterator[context.method](context.arg) and handle the
    // result, either by returning a { value, done } result from the
    // delegate iterator, or by modifying context.method and context.arg,
    // setting context.delegate to null, and returning the ContinueSentinel.


    function maybeInvokeDelegate(delegate, context) {
      var method = delegate.iterator[context.method];

      if (method === undefined$1) {
        // A .throw or .return when the delegate iterator has no .throw
        // method always terminates the yield* loop.
        context.delegate = null;

        if (context.method === "throw") {
          // Note: ["return"] must be used for ES3 parsing compatibility.
          if (delegate.iterator["return"]) {
            // If the delegate iterator has a return method, give it a
            // chance to clean up.
            context.method = "return";
            context.arg = undefined$1;
            maybeInvokeDelegate(delegate, context);

            if (context.method === "throw") {
              // If maybeInvokeDelegate(context) changed context.method from
              // "return" to "throw", let that override the TypeError below.
              return ContinueSentinel;
            }
          }

          context.method = "throw";
          context.arg = new TypeError("The iterator does not provide a 'throw' method");
        }

        return ContinueSentinel;
      }

      var record = tryCatch(method, delegate.iterator, context.arg);

      if (record.type === "throw") {
        context.method = "throw";
        context.arg = record.arg;
        context.delegate = null;
        return ContinueSentinel;
      }

      var info = record.arg;

      if (!info) {
        context.method = "throw";
        context.arg = new TypeError("iterator result is not an object");
        context.delegate = null;
        return ContinueSentinel;
      }

      if (info.done) {
        // Assign the result of the finished delegate to the temporary
        // variable specified by delegate.resultName (see delegateYield).
        context[delegate.resultName] = info.value; // Resume execution at the desired location (see delegateYield).

        context.next = delegate.nextLoc; // If context.method was "throw" but the delegate handled the
        // exception, let the outer generator proceed normally. If
        // context.method was "next", forget context.arg since it has been
        // "consumed" by the delegate iterator. If context.method was
        // "return", allow the original .return call to continue in the
        // outer generator.

        if (context.method !== "return") {
          context.method = "next";
          context.arg = undefined$1;
        }
      } else {
        // Re-yield the result returned by the delegate method.
        return info;
      } // The delegate iterator is finished, so forget it and continue with
      // the outer generator.


      context.delegate = null;
      return ContinueSentinel;
    } // Define Generator.prototype.{next,throw,return} in terms of the
    // unified ._invoke helper method.


    defineIteratorMethods(Gp);
    define(Gp, toStringTagSymbol, "Generator"); // A Generator should always return itself as the iterator object when the
    // @@iterator function is called on it. Some browsers' implementations of the
    // iterator prototype chain incorrectly implement this, causing the Generator
    // object to not be returned from this call. This ensures that doesn't happen.
    // See https://github.com/facebook/regenerator/issues/274 for more details.

    define(Gp, iteratorSymbol, function () {
      return this;
    });
    define(Gp, "toString", function () {
      return "[object Generator]";
    });

    function pushTryEntry(locs) {
      var entry = {
        tryLoc: locs[0]
      };

      if (1 in locs) {
        entry.catchLoc = locs[1];
      }

      if (2 in locs) {
        entry.finallyLoc = locs[2];
        entry.afterLoc = locs[3];
      }

      this.tryEntries.push(entry);
    }

    function resetTryEntry(entry) {
      var record = entry.completion || {};
      record.type = "normal";
      delete record.arg;
      entry.completion = record;
    }

    function Context(tryLocsList) {
      // The root entry object (effectively a try statement without a catch
      // or a finally block) gives us a place to store values thrown from
      // locations where there is no enclosing try statement.
      this.tryEntries = [{
        tryLoc: "root"
      }];
      tryLocsList.forEach(pushTryEntry, this);
      this.reset(true);
    }

    exports.keys = function (object) {
      var keys = [];

      for (var key in object) {
        keys.push(key);
      }

      keys.reverse(); // Rather than returning an object with a next method, we keep
      // things simple and return the next function itself.

      return function next() {
        while (keys.length) {
          var key = keys.pop();

          if (key in object) {
            next.value = key;
            next.done = false;
            return next;
          }
        } // To avoid creating an additional object, we just hang the .value
        // and .done properties off the next function object itself. This
        // also ensures that the minifier will not anonymize the function.


        next.done = true;
        return next;
      };
    };

    function values(iterable) {
      if (iterable) {
        var iteratorMethod = iterable[iteratorSymbol];

        if (iteratorMethod) {
          return iteratorMethod.call(iterable);
        }

        if (typeof iterable.next === "function") {
          return iterable;
        }

        if (!isNaN(iterable.length)) {
          var i = -1,
              next = function next() {
            while (++i < iterable.length) {
              if (hasOwn.call(iterable, i)) {
                next.value = iterable[i];
                next.done = false;
                return next;
              }
            }

            next.value = undefined$1;
            next.done = true;
            return next;
          };

          return next.next = next;
        }
      } // Return an iterator with no values.


      return {
        next: doneResult
      };
    }

    exports.values = values;

    function doneResult() {
      return {
        value: undefined$1,
        done: true
      };
    }

    Context.prototype = {
      constructor: Context,
      reset: function reset(skipTempReset) {
        this.prev = 0;
        this.next = 0; // Resetting context._sent for legacy support of Babel's
        // function.sent implementation.

        this.sent = this._sent = undefined$1;
        this.done = false;
        this.delegate = null;
        this.method = "next";
        this.arg = undefined$1;
        this.tryEntries.forEach(resetTryEntry);

        if (!skipTempReset) {
          for (var name in this) {
            // Not sure about the optimal order of these conditions:
            if (name.charAt(0) === "t" && hasOwn.call(this, name) && !isNaN(+name.slice(1))) {
              this[name] = undefined$1;
            }
          }
        }
      },
      stop: function stop() {
        this.done = true;
        var rootEntry = this.tryEntries[0];
        var rootRecord = rootEntry.completion;

        if (rootRecord.type === "throw") {
          throw rootRecord.arg;
        }

        return this.rval;
      },
      dispatchException: function dispatchException(exception) {
        if (this.done) {
          throw exception;
        }

        var context = this;

        function handle(loc, caught) {
          record.type = "throw";
          record.arg = exception;
          context.next = loc;

          if (caught) {
            // If the dispatched exception was caught by a catch block,
            // then let that catch block handle the exception normally.
            context.method = "next";
            context.arg = undefined$1;
          }

          return !!caught;
        }

        for (var i = this.tryEntries.length - 1; i >= 0; --i) {
          var entry = this.tryEntries[i];
          var record = entry.completion;

          if (entry.tryLoc === "root") {
            // Exception thrown outside of any try block that could handle
            // it, so set the completion value of the entire function to
            // throw the exception.
            return handle("end");
          }

          if (entry.tryLoc <= this.prev) {
            var hasCatch = hasOwn.call(entry, "catchLoc");
            var hasFinally = hasOwn.call(entry, "finallyLoc");

            if (hasCatch && hasFinally) {
              if (this.prev < entry.catchLoc) {
                return handle(entry.catchLoc, true);
              } else if (this.prev < entry.finallyLoc) {
                return handle(entry.finallyLoc);
              }
            } else if (hasCatch) {
              if (this.prev < entry.catchLoc) {
                return handle(entry.catchLoc, true);
              }
            } else if (hasFinally) {
              if (this.prev < entry.finallyLoc) {
                return handle(entry.finallyLoc);
              }
            } else {
              throw new Error("try statement without catch or finally");
            }
          }
        }
      },
      abrupt: function abrupt(type, arg) {
        for (var i = this.tryEntries.length - 1; i >= 0; --i) {
          var entry = this.tryEntries[i];

          if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) {
            var finallyEntry = entry;
            break;
          }
        }

        if (finallyEntry && (type === "break" || type === "continue") && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc) {
          // Ignore the finally entry if control is not jumping to a
          // location outside the try/catch block.
          finallyEntry = null;
        }

        var record = finallyEntry ? finallyEntry.completion : {};
        record.type = type;
        record.arg = arg;

        if (finallyEntry) {
          this.method = "next";
          this.next = finallyEntry.finallyLoc;
          return ContinueSentinel;
        }

        return this.complete(record);
      },
      complete: function complete(record, afterLoc) {
        if (record.type === "throw") {
          throw record.arg;
        }

        if (record.type === "break" || record.type === "continue") {
          this.next = record.arg;
        } else if (record.type === "return") {
          this.rval = this.arg = record.arg;
          this.method = "return";
          this.next = "end";
        } else if (record.type === "normal" && afterLoc) {
          this.next = afterLoc;
        }

        return ContinueSentinel;
      },
      finish: function finish(finallyLoc) {
        for (var i = this.tryEntries.length - 1; i >= 0; --i) {
          var entry = this.tryEntries[i];

          if (entry.finallyLoc === finallyLoc) {
            this.complete(entry.completion, entry.afterLoc);
            resetTryEntry(entry);
            return ContinueSentinel;
          }
        }
      },
      "catch": function _catch(tryLoc) {
        for (var i = this.tryEntries.length - 1; i >= 0; --i) {
          var entry = this.tryEntries[i];

          if (entry.tryLoc === tryLoc) {
            var record = entry.completion;

            if (record.type === "throw") {
              var thrown = record.arg;
              resetTryEntry(entry);
            }

            return thrown;
          }
        } // The context.catch method must only be called with a location
        // argument that corresponds to a known catch block.


        throw new Error("illegal catch attempt");
      },
      delegateYield: function delegateYield(iterable, resultName, nextLoc) {
        this.delegate = {
          iterator: values(iterable),
          resultName: resultName,
          nextLoc: nextLoc
        };

        if (this.method === "next") {
          // Deliberately forget the last sent value so that we don't
          // accidentally pass it on to the delegate.
          this.arg = undefined$1;
        }

        return ContinueSentinel;
      }
    }; // Regardless of whether this script is executing as a CommonJS module
    // or not, return the runtime object so that we can declare the variable
    // regeneratorRuntime in the outer scope, which allows this module to be
    // injected easily by `bin/regenerator --include-runtime script.js`.

    return exports;
  }( // If this script is executing as a CommonJS module, use module.exports
  // as the regeneratorRuntime namespace. Otherwise create a new empty
  // object. Either way, the resulting object will be used to initialize
  // the regeneratorRuntime variable at the top of this file.
   module.exports );

  try {
    regeneratorRuntime = runtime;
  } catch (accidentalStrictMode) {
    // This module should not be running in strict mode, so the above
    // assignment should always work unless something is misconfigured. Just
    // in case runtime.js accidentally runs in strict mode, in modern engines
    // we can explicitly access globalThis. In older engines we can escape
    // strict mode using a global Function call. This could conceivably fail
    // if a Content Security Policy forbids using Function, but in that case
    // the proper solution is to fix the accidental strict mode problem. If
    // you've misconfigured your bundler to force strict mode and applied a
    // CSP to forbid Function, and you're not willing to fix either of those
    // problems, please detail your unique predicament in a GitHub issue.
    if (typeof globalThis === "object") {
      globalThis.regeneratorRuntime = runtime;
    } else {
      Function("r", "regeneratorRuntime = r")(runtime);
    }
  }
});

var urlRegex = /^(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-/]))?$/;
function isValidUrl(value) {
  return urlRegex.test(value);
}

var InsertLinkModal = function InsertLinkModal(_ref) {
  var selectedText = _ref.selectedText,
      onClose = _ref.onClose;
  var mainInputRef = useRef(null);

  var _useState = useState(selectedText || ''),
      text = _useState[0],
      setText = _useState[1];

  var _useState2 = useState(''),
      url = _useState2[0],
      setUrl = _useState2[1];

  var _useState3 = useState(false),
      touched = _useState3[0],
      setTouched = _useState3[1];

  var _useState4 = useState(''),
      title = _useState4[0],
      setTitle = _useState4[1];

  var onInsert = function onInsert(values) {
    return onClose(values);
  };

  var urlIsValid = isValidUrl(url);
  useEffect(function () {
    var _mainInputRef$current;

    if (mainInputRef != null && (_mainInputRef$current = mainInputRef.current) != null && _mainInputRef$current.focus) {
      mainInputRef.current.focus();
    }
  }, [mainInputRef]);
  return React.createElement(React.Fragment, null, React.createElement(ModalContent, {
    testId: "insert-link-modal"
  }, React.createElement(Form, {
    onSubmit: function onSubmit() {
      return onInsert({
        url: url,
        text: text,
        title: title
      });
    }
  }, React.createElement(FormControl, {
    id: "link-text-field",
    isDisabled: Boolean(selectedText)
  }, React.createElement(FormControl.Label, null, "Link text"), React.createElement(TextInput, {
    name: "link-text",
    value: text,
    onChange: function onChange(e) {
      setText(e.target.value);
    },
    testId: "link-text-field"
  })), React.createElement(FormControl, {
    id: "target-url-field",
    isInvalid: touched && !urlIsValid
  }, React.createElement(FormControl.Label, null, "Target URL"), React.createElement(TextInput, {
    name: "target-url",
    value: url,
    onChange: function onChange(e) {
      setUrl(e.target.value);
      setTouched(true);
    },
    placeholder: "https://",
    maxLength: 2100,
    testId: "target-url-field",
    ref: mainInputRef
  }), React.createElement(FormControl.HelpText, null, "Include protocol (e.g. https://)"), touched && !urlIsValid && React.createElement(FormControl.ValidationMessage, null, "Invalid URL")), React.createElement(FormControl, {
    id: "link-title-field"
  }, React.createElement(FormControl.Label, null, "Link title"), React.createElement(TextInput, {
    name: "link-title",
    value: title,
    onChange: function onChange(e) {
      setTitle(e.target.value);
    },
    testId: "link-title-field"
  }), React.createElement(FormControl.HelpText, null, "Extra link information, usually shown as a tooltip on mouse hover")))), React.createElement(ModalControls, null, React.createElement(Button, {
    testId: "insert-link-cancel",
    onClick: function onClick() {
      return onClose(false);
    },
    variant: "secondary",
    size: "small"
  }, "Cancel"), React.createElement(Button, {
    testId: "insert-link-confirm",
    onClick: function onClick() {
      onInsert({
        url: url,
        text: text,
        title: title
      });
    },
    isDisabled: !urlIsValid,
    variant: "positive",
    size: "small"
  }, "Insert")));
};
var openInsertLinkDialog = function openInsertLinkDialog(dialogs, params) {
  return dialogs.openCurrent({
    title: 'Insert link',
    width: 'large',
    minHeight: '410px',
    shouldCloseOnEscapePress: true,
    shouldCloseOnOverlayClick: true,
    parameters: _extends({
      type: MarkdownDialogType.insertLink
    }, params)
  });
};

var specialCharacters = [{
  code: 180,
  desc: 'acute accent'
}, {
  code: 38,
  desc: 'ampersand'
}, {
  code: 166,
  desc: 'broken vertical bar'
}, {
  code: 8226,
  desc: 'bullet'
}, {
  code: 184,
  desc: 'cedilla'
}, {
  code: 162,
  desc: 'cent'
}, {
  code: 169,
  desc: 'copyright'
}, {
  code: 176,
  desc: 'degree'
}, {
  code: 247,
  desc: 'division'
}, {
  code: 189,
  desc: 'fraction half'
}, {
  code: 188,
  desc: 'fraction quarter'
}, {
  code: 190,
  desc: 'fraction three quarters'
}, {
  code: 62,
  desc: 'greater than'
}, {
  code: 161,
  desc: 'inverted exclamation mark'
}, {
  code: 191,
  desc: 'inverted question mark'
}, {
  code: 171,
  desc: 'left-pointing double angle quotation mark'
}, {
  code: 60,
  desc: 'less than'
}, {
  code: 175,
  desc: 'macron'
}, {
  code: 181,
  desc: 'micro'
}, {
  code: 160,
  desc: 'non-breaking space'
}, {
  code: 172,
  desc: 'not'
}, {
  code: 182,
  desc: 'paragraph'
}, {
  code: 177,
  desc: 'plus-minus'
}, {
  code: 34,
  desc: 'quotation mark'
}, {
  code: 174,
  desc: 'registered'
}, {
  code: 187,
  desc: 'right-pointing double angle quotation mark'
}, {
  code: 167,
  desc: 'section'
}, {
  code: 168,
  desc: 'umlaut/diaeresis'
}, {
  code: 215,
  desc: 'multiplication'
}, {
  code: 8482,
  desc: 'trade mark'
}, {
  code: 8364,
  desc: 'euro'
}, {
  code: 163,
  desc: 'pound'
}, {
  code: 165,
  desc: 'yen'
}, {
  code: 8222,
  desc: 'double low-9 quotation mark'
}, {
  code: 710,
  desc: 'modifier circumflex accent'
}, {
  code: 8224,
  desc: 'dagger'
}, {
  code: 8225,
  desc: 'double dagger'
}, {
  code: 8230,
  desc: 'horizontal ellipsis'
}, {
  code: 8220,
  desc: 'left double quotation mark'
}, {
  code: 8249,
  desc: 'single left-pointing angle quotation mark'
}, {
  code: 8216,
  desc: 'left single quotation mark'
}, {
  code: 183,
  desc: 'middle dot'
}, {
  code: 8212,
  desc: 'em dash'
}, {
  code: 8211,
  desc: 'en dash'
}, {
  code: 8240,
  desc: 'per mille'
}, {
  code: 8250,
  desc: 'single right-pointing angle quotation mark'
}, {
  code: 8217,
  desc: 'right single quotation mark'
}, {
  code: 8218,
  desc: 'single low-9 quotation mark'
}, {
  code: 170,
  desc: 'feminine ordinal indicator'
}, {
  code: 186,
  desc: 'masculine ordinal indicator'
}, {
  code: 8221,
  desc: 'right double quotation mark'
}, {
  code: 732,
  desc: 'small tilde'
}, {
  code: 9829,
  desc: 'black heart'
}, {
  code: 9830,
  desc: 'diamond'
}];

var styles$7 = {
  buttonPanel: /*#__PURE__*/css({
    display: 'flex',
    flexWrap: 'wrap'
  }),
  charButton: /*#__PURE__*/css({
    border: "1px solid " + tokens.gray500,
    width: '4.1rem',
    height: '4.1rem',
    fontSize: tokens.fontSizeXl,
    marginTop: tokens.spacing2Xs,
    marginRight: tokens.spacing2Xs
  }),
  selectedCharButton: /*#__PURE__*/css({
    backgroundColor: tokens.gray100
  }),
  tooltip: /*#__PURE__*/css({
    zIndex: 1000
  }),
  button: /*#__PURE__*/css({
    marginTop: tokens.spacingM,
    marginRight: tokens.spacingS
  })
};
var SpecialCharacterModalDialog = function SpecialCharacterModalDialog(_ref) {
  var onClose = _ref.onClose;

  var _useState = useState(specialCharacters[0]),
      selectedCharacter = _useState[0],
      setSelectedCharacter = _useState[1];

  return React.createElement(React.Fragment, null, React.createElement(ModalContent, {
    testId: "insert-special-character-modal"
  }, React.createElement(Flex, {
    flexDirection: "column",
    alignItems: "center"
  }, React.createElement(Text, {
    as: "div",
    lineHeight: "lineHeight3Xl",
    fontSize: "fontSize3Xl",
    marginBottom: "spacingS"
  }, String.fromCharCode(selectedCharacter.code)), React.createElement(Text, {
    as: "div",
    marginBottom: "spacingS"
  }, selectedCharacter.desc)), React.createElement("div", {
    className: styles$7.buttonPanel
  }, specialCharacters.map(function (_char) {
    return React.createElement("div", {
      key: _char.code
    }, React.createElement(Tooltip, {
      className: styles$7.tooltip,
      content: _char.desc
    }, React.createElement(Button, {
      testId: "special-character-button",
      isActive: _char.code === selectedCharacter.code,
      className: styles$7.charButton,
      variant: "transparent",
      onClick: function onClick() {
        return setSelectedCharacter(_char);
      }
    }, String.fromCharCode(_char.code))));
  }))), React.createElement(ModalControls, null, React.createElement(Button, {
    testId: "insert-character-cancel",
    className: styles$7.button,
    onClick: function onClick() {
      return onClose(false);
    },
    variant: "secondary",
    size: "small"
  }, "Cancel"), React.createElement(Button, {
    className: styles$7.button,
    testId: "insert-character-confirm",
    onClick: function onClick() {
      return onClose(String.fromCharCode(selectedCharacter.code));
    },
    variant: "positive",
    size: "small"
  }, "Insert selected")));
};
var openInsertSpecialCharacter = function openInsertSpecialCharacter(dialogs) {
  return dialogs.openCurrent({
    title: 'Insert special character',
    width: 'large',
    minHeight: '600px',
    shouldCloseOnEscapePress: true,
    shouldCloseOnOverlayClick: true,
    parameters: {
      type: MarkdownDialogType.insertSpecialCharacter
    }
  });
};

var InsertTableModal = function InsertTableModal(_ref) {
  var onClose = _ref.onClose;
  var mainInputRef = useRef(null);

  var _useState = useState(2),
      rows = _useState[0],
      setRows = _useState[1];

  var _useState2 = useState(1),
      cols = _useState2[0],
      setColumns = _useState2[1];

  var rowsAreValid = inRange(rows, 2, 100);
  var colsAreValid = inRange(cols, 1, 100);
  useEffect(function () {
    var _mainInputRef$current;

    if ((_mainInputRef$current = mainInputRef.current) != null && _mainInputRef$current.focus) {
      mainInputRef.current.focus();
    }
  }, [mainInputRef]);
  return React.createElement(React.Fragment, null, React.createElement(ModalContent, {
    testId: "insert-table-modal"
  }, React.createElement(Form, null, React.createElement(FormControl, {
    id: "insert-table-rows-number-field",
    isRequired: true,
    isInvalid: !rowsAreValid
  }, React.createElement(FormControl.Label, null, "Number of rows"), React.createElement(TextInput, {
    name: "rows",
    value: rows.toString(),
    onChange: function onChange(e) {
      return setRows(Number(e.target.value));
    },
    testId: "insert-table-rows-number-field",
    min: 2,
    max: 100,
    pattern: "[1-9][0-9]*",
    type: "number",
    width: "small",
    autoComplete: "off",
    ref: mainInputRef
  }), !rowsAreValid && React.createElement(FormControl.ValidationMessage, null, "Should be between 2 and 100")), React.createElement(FormControl, {
    id: "insert-table-columns-number-field",
    isRequired: true,
    isInvalid: !colsAreValid
  }, React.createElement(FormControl.Label, null, "Number of columns"), React.createElement(TextInput, {
    name: "columns",
    value: cols.toString(),
    onChange: function onChange(e) {
      return setColumns(Number(e.target.value));
    },
    testId: "insert-table-columns-number-field",
    min: 1,
    max: 100,
    pattern: "[1-9][0-9]*",
    type: "number",
    width: "small",
    autoComplete: "off"
  }), !colsAreValid && React.createElement(FormControl.ValidationMessage, null, "Should be between 1 and 100")))), React.createElement(ModalControls, null, React.createElement(Button, {
    testId: "insert-table-cancel",
    onClick: function onClick() {
      return onClose(false);
    },
    variant: "secondary",
    size: "small"
  }, "Cancel"), React.createElement(Button, {
    testId: "insert-table-confirm",
    onClick: function onClick() {
      return onClose({
        rows: rows,
        cols: cols
      });
    },
    variant: "positive",
    size: "small",
    isDisabled: !rowsAreValid || !colsAreValid
  }, "Insert")));
};
var openInsertTableDialog = function openInsertTableDialog(dialogs) {
  return dialogs.openCurrent({
    title: 'Insert table',
    width: 'medium',
    minHeight: '260px',
    shouldCloseOnEscapePress: true,
    shouldCloseOnOverlayClick: true,
    parameters: {
      type: MarkdownDialogType.insertTable
    }
  });
};

var styles$8 = {
  widthFiledGroup: /*#__PURE__*/css({
    display: 'flex',
    flexWrap: 'nowrap',
    alignItems: 'flex-start'
  }),
  radioButtonGroup: /*#__PURE__*/css({
    display: 'inline-flex',
    alignItems: 'flex-start',
    paddingTop: tokens.spacingXl
  }),
  radioButton: /*#__PURE__*/css({
    marginLeft: tokens.spacingM
  })
};

var makeEmbedlyLink = function makeEmbedlyLink(_ref) {
  var url = _ref.url,
      width = _ref.width,
      selectedUnit = _ref.selectedUnit,
      attachSocial = _ref.attachSocial;
  var s = {
    percent: '%',
    px: 'px'
  };
  return ['<a href="' + url + '" class="embedly-card" ', 'data-card-width="' + width + s[selectedUnit] + '" ', 'data-card-controls="' + (attachSocial ? '1' : '0') + '"', '>Embedded content: ' + url + '</a>'].join('');
};

var isWidthValid = function isWidthValid(width, unit) {
  return unit === 'percent' ? width <= 100 : true;
};

var EmbedExternalContentModal = function EmbedExternalContentModal(_ref2) {
  var onClose = _ref2.onClose;
  var mainInputRef = useRef(null);

  var _useState = useState('https://'),
      url = _useState[0],
      setUrl = _useState[1];

  var _useState2 = useState('percent'),
      selectedUnit = _useState2[0],
      setUnit = _useState2[1];

  var _useState3 = useState(true),
      urlIsValid = _useState3[0],
      setUrlValidity = _useState3[1];

  var _useState4 = useState('100'),
      width = _useState4[0],
      setWidth = _useState4[1];

  var _useState5 = useState(false),
      attachSocial = _useState5[0],
      setAttachSocial = _useState5[1];

  useEffect(function () {
    var _mainInputRef$current;

    if ((_mainInputRef$current = mainInputRef.current) != null && _mainInputRef$current.focus) {
      mainInputRef.current.focus();
    }
  }, [mainInputRef]);
  return React.createElement(React.Fragment, null, React.createElement(ModalContent, {
    testId: "embed-external-dialog"
  }, React.createElement(Form, null, React.createElement(FormControl, {
    id: "external-link-url-field",
    isRequired: true,
    isInvalid: !urlIsValid
  }, React.createElement(FormControl.Label, null, "Content URL"), React.createElement(TextInput, {
    name: "external-link-url",
    value: url,
    onChange: function onChange(e) {
      var value = e.target.value;
      setUrl(value);
      setUrlValidity(isValidUrl(value));
    },
    testId: "external-link-url-field",
    placeholder: "https://example.com",
    ref: mainInputRef
  }), React.createElement(FormControl.HelpText, null, "Include protocol (e.g. https://)"), !urlIsValid && React.createElement(FormControl.ValidationMessage, null, "URL is invalid")), React.createElement(TextLink, {
    href: "http://embed.ly/providers",
    target: "_blank",
    rel: "noopener noreferrer"
  }, "Supported sources"), React.createElement("div", {
    className: styles$8.widthFiledGroup
  }, React.createElement(FormControl, {
    id: "embedded-content-width",
    isRequired: true,
    isInvalid: !isWidthValid(Number(width), selectedUnit)
  }, React.createElement(FormControl.Label, null, "Width"), React.createElement(TextInput, {
    value: width,
    name: "embedded-content-width",
    testId: "embedded-content-width",
    type: "number",
    width: "small",
    onChange: function onChange(e) {
      return setWidth(e.target.value);
    }
  }), !isWidthValid(Number(width), selectedUnit) && React.createElement(FormControl.ValidationMessage, null, "Should be equal or less then 100")), React.createElement("div", {
    className: styles$8.radioButtonGroup
  }, React.createElement(Radio, {
    id: "unit-option-percent",
    value: "percent",
    isChecked: selectedUnit === 'percent',
    onChange: function onChange() {
      return setUnit('percent');
    },
    className: styles$8.radioButton
  }, "percent"), React.createElement(Radio, {
    id: "unit-option-pixels",
    value: "pixels",
    isChecked: selectedUnit === 'px',
    onChange: function onChange() {
      return setUnit('px');
    },
    className: styles$8.radioButton
  }, "pixels"))), React.createElement(Checkbox, {
    id: "attach-social-checkbox",
    name: "attach-social-checkbox",
    value: "Yes",
    isChecked: attachSocial,
    onChange: function onChange() {
      return setAttachSocial(!attachSocial);
    },
    testId: "attach-social-checkbox"
  }, "Attach social sharing links to this element"), React.createElement(Text, {
    as: "p",
    fontColor: "gray500",
    marginTop: "spacingXs"
  }, "To enable this embedded content in your application make sure to add the\xA0", React.createElement(TextLink, {
    href: "http://embed.ly/docs/products/cards",
    target: "_blank",
    rel: "noopener noreferrer"
  }, "Embedly's platform.js"), "\xA0on your development environment"))), React.createElement(ModalControls, null, React.createElement(Button, {
    testId: "emded-external-cancel",
    onClick: function onClick() {
      return onClose(false);
    },
    variant: "secondary",
    size: "small"
  }, "Cancel"), React.createElement(Button, {
    testId: "embed-external-confirm",
    onClick: function onClick() {
      return onClose(makeEmbedlyLink({
        url: url,
        width: Number(width),
        selectedUnit: selectedUnit,
        attachSocial: attachSocial
      }));
    },
    variant: "positive",
    size: "small"
  }, "Insert")));
};
var openEmbedExternalContentDialog = function openEmbedExternalContentDialog(dialogs) {
  return dialogs.openCurrent({
    title: 'Embed external content',
    width: 'large',
    minHeight: '435px',
    shouldCloseOnEscapePress: true,
    shouldCloseOnOverlayClick: true,
    parameters: {
      type: MarkdownDialogType.embedExternalContent
    }
  });
};

var ConfirmInsertAssetModalDialog = function ConfirmInsertAssetModalDialog(_ref) {
  var onClose = _ref.onClose,
      assets = _ref.assets,
      locale = _ref.locale;
  var localesNumber = assets.length;
  return React.createElement(React.Fragment, null, React.createElement(ModalContent, {
    testId: "confirm-insert-asset"
  }, React.createElement(Paragraph, null, localesNumber === 1 ? "Link asset with missing file for locale " + locale : "Link assets with missing files for locale " + locale), React.createElement(Paragraph, null, localesNumber === 1 ? 'Do you want to link to the file in its fallback locale?' : 'Do you want to link to the files in their fallback locales?'), React.createElement(EntityList, null, assets.map(function (_ref2) {
    var title = _ref2.title,
        description = _ref2.description,
        thumbnailUrl = _ref2.thumbnailUrl,
        thumbnailAltText = _ref2.thumbnailAltText;
    return React.createElement(EntityList.Item, {
      key: thumbnailUrl,
      title: title,
      thumbnailUrl: thumbnailUrl + "?w=46&h=46&fit=thumb",
      thumbnailAltText: thumbnailAltText,
      description: description
    });
  }))), React.createElement(ModalControls, null, React.createElement(Button, {
    onClick: function onClick() {
      return onClose(false);
    },
    variant: "secondary",
    size: "small"
  }, "Cancel"), React.createElement(Button, {
    testId: "confirm-insert-asset",
    onClick: function onClick() {
      return onClose(true);
    },
    variant: "positive",
    size: "small"
  }, "Confirm")));
};
var openConfirmInsertAsset = function openConfirmInsertAsset(dialogs, options) {
  return dialogs.openCurrent({
    title: 'Confirm using fallback assets',
    width: 'medium',
    minHeight: '270px',
    shouldCloseOnEscapePress: true,
    shouldCloseOnOverlayClick: true,
    parameters: _extends({
      type: MarkdownDialogType.confirmInsertAsset
    }, options)
  });
};

var styles$9 = {
  root: /*#__PURE__*/css({
    position: 'fixed',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0
  }),
  topSplit: /*#__PURE__*/css({
    position: 'fixed',
    top: 0,
    height: '48px',
    left: 0,
    right: 0
  }),
  bottomSplit: /*#__PURE__*/css({
    position: 'fixed',
    bottom: 0,
    left: 0,
    right: 0,
    height: '36px'
  }),
  editorSplit: /*#__PURE__*/css({
    width: '50%',
    position: 'fixed',
    top: '48px',
    left: 0,
    bottom: '36px',
    overflowX: 'hidden',
    overflowY: 'scroll'
  }),
  editorSplitFullscreen: /*#__PURE__*/css({
    left: 0,
    right: 0,
    width: '100%'
  }),
  previewSplit: /*#__PURE__*/css({
    width: '50%',
    position: 'fixed',
    top: '48px',
    right: 0,
    bottom: '36px',
    overflowX: 'hidden',
    overflowY: 'scroll'
  }),
  separator: /*#__PURE__*/css({
    position: 'fixed',
    top: '48px',
    bottom: '36px',
    width: '1px',
    background: tokens.gray400,
    left: '50%'
  }),
  button: /*#__PURE__*/css({
    position: 'fixed',
    cursor: 'pointer',
    zIndex: 105,
    top: '49%',
    height: '30px',
    backgroundColor: tokens.gray100,
    border: "1px solid " + tokens.gray400,
    padding: 0
  }),
  hideButton: /*#__PURE__*/css({
    left: '50%'
  }),
  showButton: /*#__PURE__*/css({
    right: 0,
    borderRightWidth: 0
  }),
  icon: /*#__PURE__*/css({
    verticalAlign: 'middle'
  })
};
var ZenModeModalDialog = function ZenModeModalDialog(props) {
  var _props$initialValue, _props$sdk$locales$di, _cx;

  var _React$useState = React.useState((_props$initialValue = props.initialValue) != null ? _props$initialValue : ''),
      currentValue = _React$useState[0],
      setCurrentValue = _React$useState[1];

  var _React$useState2 = React.useState(true),
      showPreview = _React$useState2[0],
      setShowPreview = _React$useState2[1];

  var _React$useState3 = React.useState(null),
      editor = _React$useState3[0],
      setEditor = _React$useState3[1];

  React.useEffect(function () {
    var _props$sdk, _props$sdk$window;

    // eslint-disable-next-line -- TODO: describe this disable  @typescript-eslint/no-explicit-any
    (_props$sdk = props.sdk) == null ? void 0 : (_props$sdk$window = _props$sdk.window) == null ? void 0 : _props$sdk$window.updateHeight('100%'); // eslint-disable-next-line react-hooks/exhaustive-deps -- TODO: Evaluate the dependencies
  }, []); // refresh editor right after dialog is opened to avoid disappearing effect

  React.useEffect(function () {
    setTimeout(function () {
      editor == null ? void 0 : editor.setFullsize();
      editor == null ? void 0 : editor.refresh();
    }, 150);
  }, [editor]);
  var actions = React.useMemo(function () {
    return createMarkdownActions({
      sdk: props.sdk,
      editor: editor,
      locale: props.locale
    }); // eslint-disable-next-line react-hooks/exhaustive-deps -- TODO: Evaluate the dependencies
  }, [editor]);

  actions.closeZenMode = function () {
    props.onClose({
      value: currentValue,
      cursor: editor == null ? void 0 : editor.getCursor()
    });
  };

  var direction = (_props$sdk$locales$di = props.sdk.locales.direction[props.locale]) != null ? _props$sdk$locales$di : 'ltr';
  return React.createElement("div", {
    className: styles$9.root,
    "data-test-id": "zen-mode-markdown-editor"
  }, React.createElement("div", {
    className: styles$9.topSplit
  }, React.createElement(MarkdownToolbar, {
    mode: "zen",
    disabled: false,
    canUploadAssets: false,
    actions: actions
  })), React.createElement("div", {
    className: cx(styles$9.editorSplit, (_cx = {}, _cx[styles$9.editorSplitFullscreen] = showPreview === false, _cx))
  }, React.createElement(MarkdownTextarea, {
    mode: "zen",
    visible: true,
    disabled: false,
    direction: direction,
    onReady: function onReady(editor) {
      var _props$initialValue2;

      editor.setContent((_props$initialValue2 = props.initialValue) != null ? _props$initialValue2 : '');
      editor.setReadOnly(false);
      setEditor(editor);
      editor.focus();
      editor.events.onChange(function (value) {
        setCurrentValue(value);
        props.saveValueToSDK(value);
      });
    }
  })), showPreview && React.createElement("div", {
    className: styles$9.previewSplit
  }, React.createElement(MarkdownPreview, {
    direction: direction,
    mode: "zen",
    value: currentValue,
    previewComponents: props.previewComponents
  })), showPreview && React.createElement("div", {
    className: styles$9.separator
  }), showPreview && React.createElement("button", {
    className: cx(styles$9.button, styles$9.hideButton),
    "aria-label": "Hide preview",
    onClick: function onClick() {
      setShowPreview(false);
    }
  }, React.createElement(ChevronRightIcon, {
    variant: "muted",
    size: "tiny",
    className: styles$9.icon
  })), !showPreview && React.createElement("button", {
    className: cx(styles$9.button, styles$9.showButton),
    "aria-label": "Show preview",
    onClick: function onClick() {
      setShowPreview(true);
    }
  }, React.createElement(ChevronLeftIcon, {
    variant: "muted",
    size: "tiny",
    className: styles$9.icon
  })), React.createElement("div", {
    className: styles$9.bottomSplit
  }, React.createElement(MarkdownBottomBar, null, React.createElement(MarkdownHelp, {
    onClick: function onClick() {
      openCheatsheetModal(props.sdk.dialogs);
    }
  }))));
};
var openZenMode = function openZenMode(dialogs, options) {
  return dialogs.openCurrent({
    width: 'zen',
    shouldCloseOnEscapePress: false,
    minHeight: '100vh',
    shouldCloseOnOverlayClick: false,
    parameters: {
      type: MarkdownDialogType.zenMode,
      initialValue: options.initialValue,
      locale: options.locale
    }
  });
};

function normalizeWhiteSpace(str) {
  if (str) {
    return str.trim().replace(/\s{2,}/g, ' ');
  } else {
    return str;
  }
}

function removeExtension(str) {
  return str.replace(/\.\w+$/g, '');
}

function fileNameToTitle(str) {
  return normalizeWhiteSpace(removeExtension(str).replace(/_/g, ' '));
}

function replaceAssetDomain(fileUrl) {
  var assetDomainMap = {
    images: 'images.ctfassets.net',
    assets: 'assets.ctfassets.net',
    downloads: 'downloads.ctfassets.net',
    videos: 'videos.ctfassets.net'
  };
  return fileUrl.replace(/(images|assets|downloads|videos).contentful.com/, function (_, p1) {
    return assetDomainMap[p1];
  });
}

function makeAssetLink(asset, _ref) {
  var localeCode = _ref.localeCode,
      fallbackCode = _ref.fallbackCode,
      defaultLocaleCode = _ref.defaultLocaleCode;
  var localizedFile = get(asset, ['fields', 'file', localeCode]);
  var fallbackFile = fallbackCode ? get(asset, ['fields', 'file', fallbackCode]) : null;
  var defaultFile = get(asset, ['fields', 'file', defaultLocaleCode]);
  var file = localizedFile || fallbackFile || defaultFile;

  if (isObject(file) && file.url) {
    var title = get(asset, ['fields', 'title', localeCode]) || get(asset, ['fields', 'title', fallbackCode || '']) || get(asset, ['fields', 'title', defaultLocaleCode]) || fileNameToTitle(file.fileName);
    var fileUrl = replaceAssetDomain(file.url);
    return {
      title: title,
      asset: asset,
      url: fileUrl,
      // is normally localized and we should not warn about this file
      isLocalized: Boolean(localizedFile),
      // was fallback value used
      // if it was not localized normally, and we did not used a fallback
      // it means we used a default locale - we filter empty values
      isFallback: Boolean(fallbackFile),
      // todo: tranform using fromHostname
      asMarkdown: "![" + title + "](" + fileUrl + ")"
    };
  } else {
    return null;
  }
}

function insertAssetLinks(_x, _x2) {
  return _insertAssetLinks.apply(this, arguments);
}

function _insertAssetLinks() {
  _insertAssetLinks = _asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee(assets, locales) {
    var otherLocales, linksWithMeta, fallbackAssets;
    return runtime_1.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            // check whether do we have some assets, which don't have
            // a version in this field's locale
            otherLocales = assets.filter(function (asset) {
              return !get(asset, ['fields', 'file', locales.localeCode]);
            });
            linksWithMeta = assets.map(function (asset) {
              return makeAssetLink(asset, locales);
            }) // remove empty links
            .filter(function (asset) {
              return asset !== null;
            }); // if there have values from fallback/default locales, we need to
            // provide user a warning so we show him modal

            if (!(otherLocales.length > 0)) {
              _context.next = 5;
              break;
            }

            fallbackAssets = linksWithMeta // we don't want to warn about normally localized files
            .filter(function (_ref2) {
              var isLocalized = _ref2.isLocalized;
              return !isLocalized;
            }).map(function (_ref3) {
              var title = _ref3.title,
                  isFallback = _ref3.isFallback,
                  asset = _ref3.asset;
              var code = isFallback ? locales.fallbackCode : locales.defaultLocaleCode;
              return {
                title: title,
                thumbnailUrl: asset.fields.file[code].url,
                thumbnailAltText: title,
                description: isFallback ? "Fallback locale (" + code + ")" : "Default locale (" + code + ")",
                asset: asset
              };
            });
            return _context.abrupt("return", {
              fallbacks: fallbackAssets,
              links: linksWithMeta
            });

          case 5:
            return _context.abrupt("return", {
              links: linksWithMeta
            });

          case 6:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _insertAssetLinks.apply(this, arguments);
}

/* eslint-disable @typescript-eslint/no-use-before-define, @typescript-eslint/no-explicit-any */

function extractTitle(title) {
  title = title || '';
  title = title.replace(/^ *('|"|\()*/, '');
  title = title.replace(/('|"|\))* *$/, '');
  return title;
}

function head(text) {
  return text.split(' ').shift();
}

function tail(text) {
  var segments = text.split(' ');
  segments.shift();
  return segments.join(' ');
}

var PROCESSORS = {
  inline: function inline(match) {
    return {
      match: match[0],
      text: match[1],
      href: head(match[2]),
      title: extractTitle(tail(match[2]))
    };
  },
  ref: function ref(match) {
    return {
      match: match[0],
      text: match[1],
      id: match[2]
    };
  },
  label: function label(match) {
    return {
      match: match[0],
      id: match[1],
      href: head(match[2]),
      title: extractTitle(tail(match[2]))
    };
  }
};
var REGEXS = {
  inline: /\[([^\r\n[\]]+)]\(([^\r\n)]+)\)/,
  ref: /\[([^\r\n[\]]+)] ?\[([^\r\n[\]]+)]/,
  label: /^ {0,3}\[([^\r\n[\]]+)]:\s+(.+)$/
};
var findInline = /*#__PURE__*/makeFinder('inline');
var findRefs = /*#__PURE__*/makeFinder('ref');
var findLabels = /*#__PURE__*/makeFinder('label');
function convertInlineToRef(text) {
  var id = findMaxLabelId(text);
  forEach(findInline(text), function (inline) {
    id += 1;
    text = text.replace(inline.match, buildRef(inline, id));
    text += '\n' + buildLabel(inline, id);
  });
  return text;
}

function mergeLabels(text) {
  var byHref = {};
  var byOldId = {};
  forEach(findLabels(text), function (label) {
    var alreadyAdded = byHref[label.href];
    var current = extend({}, label);

    if (!alreadyAdded) {
      byHref[current.href] = current;
    } else if (hasTitle(current) && !hasTitle(alreadyAdded)) {
      alreadyAdded.title = current.title;
    }

    byOldId[current.id] = alreadyAdded || current;
  });
  return {
    byHref: byHref,
    byOldId: byOldId
  };
}

function rewriteRefs(text) {
  var merged = mergeLabels(text);
  var hrefToRefId = {};
  var labels = [];
  var rewrites = [];
  var i = 1; // 1. compose list of labels with new ids, in order

  forEach(findRefs(text), function (ref) {
    var oldLabel = merged.byOldId[ref.id];

    if (!oldLabel) {
      return;
    }

    var href = oldLabel.href;
    var newRefId = hrefToRefId[href];

    if (!newRefId) {
      hrefToRefId[href] = newRefId = i;
      i += 1;
      labels.push(extend({
        newId: newRefId
      }, oldLabel));
    } // 1b. prepare rewrites to be applied, with new label ids


    rewrites.push(extend({
      newId: newRefId
    }, ref));
  }); // 2. remove all labels!

  forEach(findLabels(text), function (label) {
    text = text.replace(label.match, '');
  }); // 3. remove whitespace from the end of text

  text = text.replace(/[\r\n\s]*$/, '');
  text += '\n\n'; // 4. apply rewrites

  forEach(rewrites, function (ref) {
    text = text.replace(ref.match, buildRef(ref, ref.newId));
  }); // 5. print new labels at the end of text

  forEach(labels, function (label) {
    text += '\n' + buildLabel(label, label.newId);
  });
  return text;
}
/**
 * Finding stuff
 */

function makeFinder(type) {
  return function (text) {
    return findAll(text, type).map(PROCESSORS[type]);
  };
}

function findMaxLabelId(textOrLabels) {
  if (isString(textOrLabels)) {
    textOrLabels = findLabels(textOrLabels);
  }

  var ids = textOrLabels.map(function (x) {
    return x.id;
  }).map(function (x) {
    return parseInt(x, 10);
  }).filter(function (x) {
    return isFinite(x) && x > 0;
  });
  return ids.length > 0 ? max(ids) || 0 : 0;
}

function findAll(text, type) {
  var flags = 'g' + (type === 'label' ? 'm' : '');
  var matches = [];
  var re = new RegExp(REGEXS[type].source, flags);
  var found = re.exec(text);

  while (found) {
    matches.push(found);
    re.lastIndex = found.index + found[0].length;
    found = re.exec(text);
  }

  return matches;
}
/**
 * Other utilities
 */


function hasTitle(link) {
  return isObject(link) && isString(link.title) && link.title.length > 0;
}

function buildLabel(link, id) {
  var markup = '[' + id + ']: ' + link.href;

  if (hasTitle(link)) {
    markup += ' "' + link.title + '"';
  }

  return markup;
}

function buildRef(link, id) {
  return '[' + link.text + '][' + id + ']';
}

function createMarkdownActions(props) {
  var sdk = props.sdk,
      editor = props.editor,
      locale = props.locale; // eslint-disable-next-line -- TODO: describe this disable  @typescript-eslint/ban-types

  var insertAssetsWithConfirmation = /*#__PURE__*/function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee(assets) {
      var _yield$insertAssetLin, links, fallbacks, insertAnyway;

      return runtime_1.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              if (!assets) {
                _context.next = 14;
                break;
              }

              _context.next = 3;
              return insertAssetLinks(assets, {
                localeCode: locale,
                defaultLocaleCode: sdk.locales["default"],
                fallbackCode: sdk.locales.fallbacks[locale]
              });

            case 3:
              _yield$insertAssetLin = _context.sent;
              links = _yield$insertAssetLin.links;
              fallbacks = _yield$insertAssetLin.fallbacks;

              if (!(links && links.length > 0)) {
                _context.next = 14;
                break;
              }

              if (!fallbacks) {
                _context.next = 13;
                break;
              }

              _context.next = 10;
              return openConfirmInsertAsset(sdk.dialogs, {
                locale: locale,
                assets: fallbacks
              });

            case 10:
              insertAnyway = _context.sent;

              if (insertAnyway) {
                _context.next = 13;
                break;
              }

              throw Error('User decided to not use fallbacks');

            case 13:
              return _context.abrupt("return", links.map(function (link) {
                return link.asMarkdown;
              }).join('\n\n'));

            case 14:
              return _context.abrupt("return", '');

            case 15:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));

    return function insertAssetsWithConfirmation(_x) {
      return _ref.apply(this, arguments);
    };
  }();

  return {
    headings: {
      h1: function h1() {
        editor == null ? void 0 : editor.actions.h1();
      },
      h2: function h2() {
        editor == null ? void 0 : editor.actions.h2();
      },
      h3: function h3() {
        editor == null ? void 0 : editor.actions.h3();
      }
    },
    simple: {
      italic: function italic() {
        editor == null ? void 0 : editor.actions.italic();
      },
      bold: function bold() {
        editor == null ? void 0 : editor.actions.bold();
      },
      quote: function quote() {
        editor == null ? void 0 : editor.actions.quote();
      },
      ol: function ol() {
        editor == null ? void 0 : editor.actions.ol();
      },
      ul: function ul() {
        editor == null ? void 0 : editor.actions.ul();
      },
      strike: function strike() {
        editor == null ? void 0 : editor.actions.strike();
      },
      code: function code() {
        editor == null ? void 0 : editor.actions.code();
      },
      hr: function hr() {
        editor == null ? void 0 : editor.actions.hr();
      },
      indent: function indent() {
        editor == null ? void 0 : editor.actions.indent();
      },
      dedent: function dedent() {
        editor == null ? void 0 : editor.actions.dedent();
      }
    },
    history: {
      undo: function undo() {
        editor == null ? void 0 : editor.actions.undo();
      },
      redo: function redo() {
        editor == null ? void 0 : editor.actions.redo();
      }
    },
    insertLink: function () {
      var _insertLink = _asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee2() {
        var selectedText, result;
        return runtime_1.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                if (editor) {
                  _context2.next = 2;
                  break;
                }

                return _context2.abrupt("return");

              case 2:
                editor.usePrimarySelection();
                selectedText = editor.getSelectedText();
                _context2.next = 6;
                return openInsertLinkDialog(sdk.dialogs, {
                  selectedText: selectedText
                });

              case 6:
                result = _context2.sent;

                if (result) {
                  editor.actions.link(result.url, selectedText || result.text, result.title);
                }

              case 8:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }));

      function insertLink() {
        return _insertLink.apply(this, arguments);
      }

      return insertLink;
    }(),
    insertSpecialCharacter: function () {
      var _insertSpecialCharacter = _asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee3() {
        var result;
        return runtime_1.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                if (editor) {
                  _context3.next = 2;
                  break;
                }

                return _context3.abrupt("return");

              case 2:
                _context3.next = 4;
                return openInsertSpecialCharacter(sdk.dialogs);

              case 4:
                result = _context3.sent;

                if (result) {
                  editor.insert(result);
                }

              case 6:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3);
      }));

      function insertSpecialCharacter() {
        return _insertSpecialCharacter.apply(this, arguments);
      }

      return insertSpecialCharacter;
    }(),
    insertTable: function () {
      var _insertTable = _asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee4() {
        var result;
        return runtime_1.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                if (editor) {
                  _context4.next = 2;
                  break;
                }

                return _context4.abrupt("return");

              case 2:
                _context4.next = 4;
                return openInsertTableDialog(sdk.dialogs);

              case 4:
                result = _context4.sent;

                if (result) {
                  editor.actions.table(result);
                }

              case 6:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4);
      }));

      function insertTable() {
        return _insertTable.apply(this, arguments);
      }

      return insertTable;
    }(),
    organizeLinks: function organizeLinks() {
      if (!editor) {
        return;
      }

      var text = editor.getContent();

      if (!text) {
        return;
      }

      text = convertInlineToRef(text);
      text = rewriteRefs(text);
      editor.setContent(text);
      sdk.notifier.success('All your links are now references at the bottom of your document.');
    },
    embedExternalContent: function () {
      var _embedExternalContent = _asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee5() {
        var result;
        return runtime_1.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                if (editor) {
                  _context5.next = 2;
                  break;
                }

                return _context5.abrupt("return");

              case 2:
                _context5.next = 4;
                return openEmbedExternalContentDialog(sdk.dialogs);

              case 4:
                result = _context5.sent;

                if (result) {
                  editor.insert(result);
                }

              case 6:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5);
      }));

      function embedExternalContent() {
        return _embedExternalContent.apply(this, arguments);
      }

      return embedExternalContent;
    }(),
    addNewMedia: function () {
      var _addNewMedia = _asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee6() {
        var _yield$sdk$navigator$, asset, markdownLinks;

        return runtime_1.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                if (editor) {
                  _context6.next = 2;
                  break;
                }

                return _context6.abrupt("return");

              case 2:
                _context6.prev = 2;
                _context6.next = 5;
                return sdk.navigator.openNewAsset({
                  slideIn: {
                    waitForClose: true
                  }
                });

              case 5:
                _yield$sdk$navigator$ = _context6.sent;
                asset = _yield$sdk$navigator$.entity;
                _context6.next = 9;
                return insertAssetsWithConfirmation([asset]);

              case 9:
                markdownLinks = _context6.sent;
                editor.insert(markdownLinks);

              case 11:
                _context6.prev = 11;
                editor.focus();
                return _context6.finish(11);

              case 14:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6, null, [[2,, 11, 14]]);
      }));

      function addNewMedia() {
        return _addNewMedia.apply(this, arguments);
      }

      return addNewMedia;
    }(),
    linkExistingMedia: function () {
      var _linkExistingMedia = _asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee7() {
        var assets, markdownLinks;
        return runtime_1.wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                if (editor) {
                  _context7.next = 2;
                  break;
                }

                return _context7.abrupt("return");

              case 2:
                _context7.prev = 2;
                _context7.next = 5;
                return sdk.dialogs.selectMultipleAssets({
                  locale: locale
                });

              case 5:
                assets = _context7.sent;
                _context7.next = 8;
                return insertAssetsWithConfirmation(assets);

              case 8:
                markdownLinks = _context7.sent;
                editor.insert(markdownLinks);

              case 10:
                _context7.prev = 10;
                editor.focus();
                return _context7.finish(10);

              case 13:
              case "end":
                return _context7.stop();
            }
          }
        }, _callee7, null, [[2,, 10, 13]]);
      }));

      function linkExistingMedia() {
        return _linkExistingMedia.apply(this, arguments);
      }

      return linkExistingMedia;
    }(),
    openZenMode: function () {
      var _openZenMode2 = _asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee8() {
        var result;
        return runtime_1.wrap(function _callee8$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                if (editor) {
                  _context8.next = 2;
                  break;
                }

                return _context8.abrupt("return");

              case 2:
                _context8.next = 4;
                return openZenMode(sdk.dialogs, {
                  initialValue: editor.getContent(),
                  locale: props.locale
                });

              case 4:
                result = _context8.sent;
                editor.setContent(result.value);

                if (result.cursor) {
                  editor.setCursor(result.cursor);
                }

                editor.focus();

              case 8:
              case "end":
                return _context8.stop();
            }
          }
        }, _callee8);
      }));

      function openZenMode$1() {
        return _openZenMode2.apply(this, arguments);
      }

      return openZenMode$1;
    }(),
    closeZenMode: function closeZenMode() {// do nothing
      // this method is overwritten in dialog app
    }
  };
}

var styles$a = {
  container: /*#__PURE__*/css({
    display: 'flex',
    flexDirection: 'column',
    fontFamily: tokens.fontStackPrimary
  })
};
function MarkdownEditor(props) {
  var _props$initialValue, _props$sdk$locales$di;

  var _React$useState = React.useState((_props$initialValue = props.initialValue) != null ? _props$initialValue : ''),
      currentValue = _React$useState[0],
      setCurrentValue = _React$useState[1];

  var _React$useState2 = React.useState('editor'),
      selectedTab = _React$useState2[0],
      setSelectedTab = _React$useState2[1];

  var _React$useState3 = React.useState(null),
      editor = _React$useState3[0],
      setEditor = _React$useState3[1];

  var _React$useState4 = React.useState(false),
      canUploadAssets = _React$useState4[0],
      setCanUploadAssets = _React$useState4[1];

  React.useEffect(function () {
    if (editor && props.onReady) {
      props.onReady(editor); // fix: http://codemirror.977696.n3.nabble.com/codemirror-content-not-visible-in-bootstrap-modal-td4026988.html

      setTimeout(function () {
        editor.refresh();
      }, 1);
    } // eslint-disable-next-line react-hooks/exhaustive-deps -- TODO: Evaluate the dependencies

  }, [editor]);
  React.useEffect(function () {
    props.sdk.access.can('create', 'Asset').then(function (value) {
      setCanUploadAssets(value);
    }); // eslint-disable-next-line react-hooks/exhaustive-deps -- TODO: Evaluate the dependencies
  }, []);
  React.useEffect(function () {
    if (editor) {
      editor.setReadOnly(props.disabled);
    }
  }, [editor, props.disabled]);
  var isActionDisabled = editor === null || props.disabled || selectedTab !== 'editor';
  var direction = (_props$sdk$locales$di = props.sdk.locales.direction[props.sdk.field.locale]) != null ? _props$sdk$locales$di : 'ltr';
  var actions = React.useMemo(function () {
    return createMarkdownActions({
      sdk: props.sdk,
      editor: editor,
      locale: props.sdk.field.locale
    }); // eslint-disable-next-line react-hooks/exhaustive-deps -- TODO: Evaluate the dependencies
  }, [editor]);
  var openMarkdownHelp = React.useCallback(function () {
    openCheatsheetModal(props.sdk.dialogs); // eslint-disable-next-line react-hooks/exhaustive-deps -- TODO: Evaluate the dependencies
  }, []);
  return React.createElement("div", {
    className: styles$a.container,
    "data-test-id": "markdown-editor"
  }, React.createElement(MarkdownTabs, {
    active: selectedTab,
    onSelect: function onSelect(tab) {
      setSelectedTab(tab);
    }
  }), React.createElement(MarkdownToolbar, {
    mode: "default",
    disabled: isActionDisabled,
    canUploadAssets: canUploadAssets,
    actions: actions
  }), React.createElement(MarkdownTextarea, {
    minHeight: props.minHeight,
    mode: "default",
    visible: selectedTab === 'editor',
    disabled: isActionDisabled,
    direction: direction,
    onReady: function onReady(editor) {
      var _props$initialValue2;

      editor.setContent((_props$initialValue2 = props.initialValue) != null ? _props$initialValue2 : '');
      editor.setReadOnly(props.disabled);
      setEditor(editor);
      editor.events.onChange(function (value) {
        // Trim empty lines
        var trimmedValue = value.replace(/^\s+$/gm, '');
        props.saveValueToSDK(trimmedValue);
        setCurrentValue(value);
      });
    }
  }), selectedTab === 'preview' && React.createElement(MarkdownPreview, {
    direction: direction,
    minHeight: props.minHeight,
    mode: "default",
    value: currentValue,
    previewComponents: props.previewComponents
  }), React.createElement(MarkdownBottomBar, null, React.createElement(MarkdownHelp, {
    onClick: openMarkdownHelp
  })), React.createElement(MarkdownConstraints, {
    sdk: props.sdk,
    value: currentValue
  }));
}
function MarkdownEditorConnected(props) {
  return React.createElement(FieldConnector, {
    throttle: 300,
    field: props.sdk.field,
    isInitiallyDisabled: props.isInitiallyDisabled
  }, function (_ref) {
    var value = _ref.value,
        disabled = _ref.disabled,
        setValue = _ref.setValue,
        externalReset = _ref.externalReset;
    // on external change reset component completely and init with initial value again
    return React.createElement(MarkdownEditor, _extends({}, props, {
      key: "markdown-editor-" + externalReset,
      initialValue: value,
      disabled: disabled,
      saveValueToSDK: setValue
    }));
  });
}

var openMarkdownDialog = function openMarkdownDialog(sdk, previewComponents) {
  return function (options) {
    var _options$parameters, _options$parameters2, _options$parameters3, _options$parameters4, _options$parameters5, _options$parameters6, _options$parameters7;

    if (((_options$parameters = options.parameters) == null ? void 0 : _options$parameters.type) === MarkdownDialogType.cheatsheet) {
      return ModalDialogLauncher.openDialog(options, function () {
        return React.createElement(CheatsheetModalDialog, null);
      });
    } else if (((_options$parameters2 = options.parameters) == null ? void 0 : _options$parameters2.type) === MarkdownDialogType.insertLink) {
      var selectedText = options.parameters.selectedText;
      return ModalDialogLauncher.openDialog(options, function (_ref) {
        var onClose = _ref.onClose;
        return React.createElement(InsertLinkModal, {
          selectedText: selectedText,
          onClose: onClose
        });
      });
    } else if (((_options$parameters3 = options.parameters) == null ? void 0 : _options$parameters3.type) === MarkdownDialogType.insertSpecialCharacter) {
      return ModalDialogLauncher.openDialog(options, function (_ref2) {
        var onClose = _ref2.onClose;
        return React.createElement(SpecialCharacterModalDialog, {
          onClose: onClose
        });
      });
    } else if (((_options$parameters4 = options.parameters) == null ? void 0 : _options$parameters4.type) === MarkdownDialogType.insertTable) {
      return ModalDialogLauncher.openDialog(options, function (_ref3) {
        var onClose = _ref3.onClose;
        return React.createElement(InsertTableModal, {
          onClose: onClose
        });
      });
    } else if (((_options$parameters5 = options.parameters) == null ? void 0 : _options$parameters5.type) === MarkdownDialogType.embedExternalContent) {
      return ModalDialogLauncher.openDialog(options, function (_ref4) {
        var onClose = _ref4.onClose;
        return React.createElement(EmbedExternalContentModal, {
          onClose: onClose
        });
      });
    } else if (((_options$parameters6 = options.parameters) == null ? void 0 : _options$parameters6.type) === MarkdownDialogType.confirmInsertAsset) {
      var locale = options.parameters.locale;
      var assets = options.parameters.assets;
      return ModalDialogLauncher.openDialog(options, function (_ref5) {
        var onClose = _ref5.onClose;
        return React.createElement(ConfirmInsertAssetModalDialog, {
          onClose: onClose,
          locale: locale,
          assets: assets
        });
      });
    } else if (((_options$parameters7 = options.parameters) == null ? void 0 : _options$parameters7.type) === MarkdownDialogType.zenMode) {
      var initialValue = options.parameters.initialValue;
      var _locale = options.parameters.locale;
      return ModalDialogLauncher.openDialog(options, function (_ref6) {
        var onClose = _ref6.onClose;
        return React.createElement(ZenModeModalDialog, {
          saveValueToSDK: function saveValueToSDK(value) {
            var _sdk$field2;

            if (value) {
              var _sdk$field;

              return sdk == null ? void 0 : (_sdk$field = sdk.field) == null ? void 0 : _sdk$field.setValue(value);
            }

            return sdk == null ? void 0 : (_sdk$field2 = sdk.field) == null ? void 0 : _sdk$field2.removeValue();
          },
          onClose: onClose,
          initialValue: initialValue,
          locale: _locale,
          sdk: sdk,
          previewComponents: previewComponents
        });
      });
    }

    return Promise.reject();
  };
};

var renderMarkdownDialog = function renderMarkdownDialog(sdk) {
  var parameters = sdk.parameters.invocation;

  if (parameters.type === MarkdownDialogType.cheatsheet) {
    sdk.window.startAutoResizer();
    return React.createElement(CheatsheetModalDialog, null);
  } else if (parameters.type === MarkdownDialogType.insertLink) {
    var selectedText = parameters.selectedText;
    sdk.window.startAutoResizer();
    return React.createElement(InsertLinkModal, {
      selectedText: selectedText,
      onClose: sdk.close
    });
  } else if (parameters.type === MarkdownDialogType.insertSpecialCharacter) {
    sdk.window.startAutoResizer();
    return React.createElement(SpecialCharacterModalDialog, {
      onClose: sdk.close
    });
  } else if (parameters.type === MarkdownDialogType.insertTable) {
    sdk.window.startAutoResizer();
    return React.createElement(InsertTableModal, {
      onClose: sdk.close
    });
  } else if (parameters.type === MarkdownDialogType.embedExternalContent) {
    sdk.window.startAutoResizer();
    return React.createElement(EmbedExternalContentModal, {
      onClose: sdk.close
    });
  } else if (parameters.type === MarkdownDialogType.confirmInsertAsset) {
    var locale = parameters.locale;
    var assets = parameters.assets;
    sdk.window.startAutoResizer();
    return React.createElement(ConfirmInsertAssetModalDialog, {
      onClose: sdk.close,
      locale: locale,
      assets: assets
    });
  } else if (parameters.type === MarkdownDialogType.zenMode) {
    var _locale = parameters.locale;
    var initialValue = parameters.initialValue; // eslint-disable-next-line -- TODO: describe this disable  @typescript-eslint/no-explicit-any

    sdk.window.updateHeight('100%');
    return React.createElement(ZenModeModalDialog, {
      onClose: sdk.close,
      saveValueToSDK: function saveValueToSDK() {// don't save changes in dialog mode
      },
      initialValue: initialValue,
      locale: _locale,
      sdk: sdk
    });
  }

  return React.createElement("div", null);
};

export { MarkdownEditorConnected as MarkdownEditor, MarkdownPreview, openMarkdownDialog, renderMarkdownDialog };
//# sourceMappingURL=field-editor-markdown.esm.js.map
