'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var React = require('react');
var React__default = _interopDefault(React);
var fieldEditorReference = require('@contentful/field-editor-reference');
var fieldEditorShared = require('@contentful/field-editor-shared');
var Contentful = require('@contentful/rich-text-types');
var p = require('@udecode/plate-core');
var emotion = require('emotion');
var areEqual = _interopDefault(require('fast-deep-equal'));
var noop = _interopDefault(require('lodash/noop'));
var Slate = require('slate-react');
var plateSerializerDocx = require('@udecode/plate-serializer-docx');
var plateBreak = require('@udecode/plate-break');
var plateResetNode = require('@udecode/plate-reset-node');
var reactPopper = require('react-popper');
var f36Components = require('@contentful/f36-components');
var f36Utils = require('@contentful/f36-utils');
var constate = _interopDefault(require('constate'));
var isHotkey = _interopDefault(require('is-hotkey'));
var s = require('slate');
var find = _interopDefault(require('lodash/find'));
var flow = _interopDefault(require('lodash/flow'));
var get = _interopDefault(require('lodash/get'));
var tokens = _interopDefault(require('@contentful/f36-tokens'));
var f36Icons = require('@contentful/f36-icons');
var plateList = require('@udecode/plate-list');
var castArray = _interopDefault(require('lodash/castArray'));
var plateBasicMarks = require('@udecode/plate-basic-marks');
var isPlainObject = _interopDefault(require('is-plain-obj'));
var plateParagraph = require('@udecode/plate-paragraph');
var plateSelect = require('@udecode/plate-select');
var plateTable = require('@udecode/plate-table');
var contentfulSlateJSAdapter = require('@contentful/contentful-slatejs-adapter');
var richTextPlainTextRenderer = require('@contentful/rich-text-plain-text-renderer');
var plateTrailingBlock = require('@udecode/plate-trailing-block');
var debounce = _interopDefault(require('lodash/debounce'));
var PropTypes = _interopDefault(require('prop-types'));

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

function _inheritsLoose(subClass, superClass) {
  subClass.prototype = Object.create(superClass.prototype);
  subClass.prototype.constructor = subClass;

  _setPrototypeOf(subClass, superClass);
}

function _getPrototypeOf(o) {
  _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
    return o.__proto__ || Object.getPrototypeOf(o);
  };
  return _getPrototypeOf(o);
}

function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };

  return _setPrototypeOf(o, p);
}

function _isNativeReflectConstruct() {
  if (typeof Reflect === "undefined" || !Reflect.construct) return false;
  if (Reflect.construct.sham) return false;
  if (typeof Proxy === "function") return true;

  try {
    Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
    return true;
  } catch (e) {
    return false;
  }
}

function _construct(Parent, args, Class) {
  if (_isNativeReflectConstruct()) {
    _construct = Reflect.construct;
  } else {
    _construct = function _construct(Parent, args, Class) {
      var a = [null];
      a.push.apply(a, args);
      var Constructor = Function.bind.apply(Parent, a);
      var instance = new Constructor();
      if (Class) _setPrototypeOf(instance, Class.prototype);
      return instance;
    };
  }

  return _construct.apply(null, arguments);
}

function _isNativeFunction(fn) {
  return Function.toString.call(fn).indexOf("[native code]") !== -1;
}

function _wrapNativeSuper(Class) {
  var _cache = typeof Map === "function" ? new Map() : undefined;

  _wrapNativeSuper = function _wrapNativeSuper(Class) {
    if (Class === null || !_isNativeFunction(Class)) return Class;

    if (typeof Class !== "function") {
      throw new TypeError("Super expression must either be null or a function");
    }

    if (typeof _cache !== "undefined") {
      if (_cache.has(Class)) return _cache.get(Class);

      _cache.set(Class, Wrapper);
    }

    function Wrapper() {
      return _construct(Class, arguments, _getPrototypeOf(this).constructor);
    }

    Wrapper.prototype = Object.create(Class.prototype, {
      constructor: {
        value: Wrapper,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
    return _setPrototypeOf(Wrapper, Class);
  };

  return _wrapNativeSuper(Class);
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

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

  return arr2;
}

function _createForOfIteratorHelperLoose(o, allowArrayLike) {
  var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"];
  if (it) return (it = it.call(o)).next.bind(it);

  if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") {
    if (it) o = it;
    var i = 0;
    return function () {
      if (i >= o.length) return {
        done: true
      };
      return {
        done: false,
        value: o[i++]
      };
    };
  }

  throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

var useReadOnly = Slate.useReadOnly;
var usePlateEditorRef = p.usePlateEditorRef;
var usePlateEditorState = p.usePlateEditorState;

function getContentfulEditorId(sdk) {
  var entry = sdk.entry,
      field = sdk.field;
  var sys = entry.getSys();
  return "rich-text-editor-" + sys.id + "-" + field.id + "-" + field.locale;
}
var editorContext = /*#__PURE__*/React.createContext('');
var ContentfulEditorIdProvider = editorContext.Provider;
function useContentfulEditorId(id) {
  var contextId = React.useContext(editorContext);

  if (id) {
    return id;
  }

  if (!contextId) {
    throw new Error('could not find editor id. Please ensure the component is wrapped in <ContentfulEditorIdProvider> ');
  }

  return contextId;
} // This hook re-renders when the value changes
// Use case: Toolbar icons, for example

function useContentfulEditor(id) {
  var editorId = useContentfulEditorId(id);
  var editor = usePlateEditorState(editorId);
  return editor;
} // This doesn't re-render when the value changes

function useContentfulEditorRef(id) {
  var editorId = useContentfulEditorId(id);
  var editor = usePlateEditorRef(editorId);
  return editor;
}

var createPlateEditor = function createPlateEditor(options) {
  if (options === void 0) {
    options = {};
  }

  return p.createPlateEditor(options);
};
var withoutNormalizing = function withoutNormalizing(editor, fn) {
  return p.withoutNormalizing(editor, fn);
};
var focusEditor = function focusEditor(editor, target) {
  p.focusEditor(editor, target);
};
var blurEditor = function blurEditor(editor) {
  p.blurEditor(editor);
};
var selectEditor = function selectEditor(editor, opts) {
  p.selectEditor(editor, opts);
};
var fromDOMPoint = function fromDOMPoint(editor, domPoint, opts) {
  if (opts === void 0) {
    opts = {
      exactMatch: false,
      suppressThrow: false
    };
  }

  return p.toSlatePoint(editor, domPoint, opts);
};
var mockPlugin = function mockPlugin(plugin) {
  return p.mockPlugin( // TODO check if there is a way around this ugly casting
  plugin);
};
var getPlateSelectors = function getPlateSelectors(id) {
  return p.getPlateSelectors(id);
};

var createSoftBreakPlugin = function createSoftBreakPlugin() {
  return plateBreak.createSoftBreakPlugin({
    then: function then(editor) {
      var rules = editor.plugins.flatMap(function (p) {
        return p.softBreak || [];
      });
      return {
        options: {
          rules: rules
        }
      };
    }
  });
};

var createExitBreakPlugin = function createExitBreakPlugin() {
  return plateBreak.createExitBreakPlugin({
    options: {
      rules: []
    },
    then: function then(editor) {
      var rules = editor.plugins.flatMap(function (p) {
        return p.exitBreak || [];
      });
      return {
        options: {
          rules: rules
        }
      };
    }
  });
};

var createResetNodePlugin = function createResetNodePlugin() {
  return plateResetNode.createResetNodePlugin({
    options: {
      rules: []
    },
    then: function then(editor) {
      var rules = editor.plugins.flatMap(function (p) {
        return p.resetNode || [];
      }); // set defaultType to Paragraph if not set

      for (var _iterator = _createForOfIteratorHelperLoose(rules), _step; !(_step = _iterator()).done;) {
        var rule = _step.value;

        if (!rule.defaultType) {
          rule.defaultType = Contentful.BLOCKS.PARAGRAPH;
        }
      }

      return {
        options: {
          rules: rules
        }
      };
    }
  });
};

/**
 * Trim leading slash character if found. Bails otherwise.
 *
 * @example
 * trimLeadingSlash("/my query") // --> "my query"
 */
function trimLeadingSlash(text) {
  if (!text.startsWith('/')) {
    return text;
  }

  return text.slice(1);
}

function useSdk(_ref) {
  var sdk = _ref.sdk;
  var sdkMemo = React.useMemo(function () {
    return sdk;
  }, []); // eslint-disable-line -- TODO: explain this disable

  return sdkMemo;
}

var _constate = /*#__PURE__*/constate(useSdk),
    SdkProvider = _constate[0],
    useSdkContext = _constate[1];

var useCommandList = function useCommandList(commandItems, container) {
  var _React$useState = React.useState(function () {
    // select the first item on initial render
    if (!commandItems.length) {
      return '';
    }

    if ('group' in commandItems[0]) {
      return commandItems[0].commands[0].id;
    }

    return commandItems[0].id;
  }),
      selectedItem = _React$useState[0],
      setSelectedItem = _React$useState[1];

  var _React$useState2 = React.useState(commandItems.length > 0),
      isOpen = _React$useState2[0],
      setIsOpen = _React$useState2[1];

  React.useEffect(function () {
    if (!container.current) {
      return;
    }

    var buttons = Array.from(container.current.querySelectorAll('button'));
    var currBtn = buttons.find(function (btn) {
      return btn.id === selectedItem;
    });
    var currIndex = currBtn ? buttons.indexOf(currBtn) : 0;
    var shouldSelectFirstBtn = !currBtn && buttons.length;

    if (shouldSelectFirstBtn) {
      setSelectedItem(buttons[0].id);
      buttons[0].scrollIntoView({
        block: 'nearest',
        inline: 'start'
      });
    }

    function handleKeyDown(event) {
      if (isHotkey('up', event)) {
        event.preventDefault();

        if (currIndex === 0) {
          return;
        }

        setSelectedItem(buttons[currIndex - 1].id);
        buttons[currIndex - 1].scrollIntoView({
          block: 'nearest',
          inline: 'start'
        });
      } else if (isHotkey('down', event)) {
        event.preventDefault();

        if (currIndex === buttons.length - 1) {
          return;
        }

        setSelectedItem(buttons[currIndex + 1].id);
        buttons[currIndex + 1].scrollIntoView({
          block: 'nearest',
          inline: 'start'
        });
      } else if (isHotkey('enter', event)) {
        event.preventDefault();

        if (currBtn) {
          setSelectedItem('');
          currBtn.click();
        }
      } //TODO: handle shift+enter, which must be detected using separate events

    }

    if (commandItems.length) {
      window.addEventListener('keydown', handleKeyDown);
    }

    return function () {
      return window.removeEventListener('keydown', handleKeyDown);
    };
  }, [commandItems, container, selectedItem]);
  React.useEffect(function () {
    var handleMousedown = function handleMousedown(event) {
      if (container.current && !container.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleMousedown);
    return function () {
      document.removeEventListener('mousedown', handleMousedown);
    };
  }, [container]);
  return {
    selectedItem: selectedItem,
    isOpen: isOpen
  };
};

/**
 * Get text content at location
 */

var getText = function getText(editor, at) {
  return p.getEditorString(editor, at);
};
var isText = function isText(value) {
  return p.isText(value);
};
var getEndPoint = function getEndPoint(editor, at) {
  return p.getEndPoint(editor, at);
};
var getStartPoint = function getStartPoint(editor, at) {
  return p.getStartPoint(editor, at);
};
var isNode = function isNode(value) {
  return p.isNode(value);
};
var isSelectionAtBlockEnd = function isSelectionAtBlockEnd(editor, options) {
  return p.isSelectionAtBlockEnd(editor, options);
};
var isSelectionAtBlockStart = function isSelectionAtBlockStart(editor, options) {
  return p.isSelectionAtBlockStart(editor, options);
};
var getBlockAbove = function getBlockAbove(editor, options) {
  return p.getBlockAbove(editor, options);
};
var getNodeEntry = function getNodeEntry(editor, at, options) {
  return p.getNodeEntry(editor, at, options);
};
var getNodeEntries = function getNodeEntries(editor, options) {
  return p.getNodeEntries(editor, options);
}; // TODO: Ancestor may not be the correct type for root

var getNodeChildren = function getNodeChildren(root, path, options) {
  return p.getNodeChildren(root, path, options);
};
var getParentNode = function getParentNode(editor, at, options) {
  return p.getParentNode(editor, at, options);
};
var someNode = function someNode(editor, options) {
  return p.someNode(editor, options);
};
var getChildren = function getChildren(entry) {
  // Node.children crashes when given a text node
  if (s.Text.isText(entry[0])) {
    return [];
  }

  return p.getChildren(entry);
};
var isFirstChild = function isFirstChild(path) {
  return p.isFirstChild(path);
};
var getDescendantNodeByPath = function getDescendantNodeByPath(root, path) {
  // @ts-expect-error
  return s.Node.get(root, path);
};
var isRangeCollapsed = function isRangeCollapsed(range) {
  return p.isCollapsed(range);
}; // TODO: simplify

var isRangeAcrossBlocks = function isRangeAcrossBlocks(editor, options) {
  return p.isRangeAcrossBlocks(editor, options);
};
var isRangeExpanded = function isRangeExpanded(range) {
  return p.isExpanded(range);
};
var getRange = function getRange(editor, at, to) {
  return p.getRange(editor, at, to);
};
var getRangeEdges = function getRangeEdges(range) {
  return s.Range.edges(range);
};
var getRangeStart = function getRangeStart(range) {
  return s.Range.start(range);
};
var getRangeEnd = function getRangeEnd(range) {
  return s.Range.end(range);
};
var getAboveNode = function getAboveNode(editor, opts) {
  return p.getAboveNode(editor, opts);
};
var getCommonNode = function getCommonNode(root, path, another) {
  return p.getCommonNode(root, path, another);
};
var getNodeTexts = function getNodeTexts(root, opts) {
  return p.getNodeTexts(root, opts);
};
var findNode = function findNode(editor, options) {
  return p.findNode(editor, options);
};
var isMarkActive = function isMarkActive(editor, type) {
  return p.isMarkActive(editor, type);
};
var getMarks = function getMarks(editor) {
  return p.getMarks(editor);
};
var isEditor = function isEditor(value) {
  return p.isEditor(value);
};
var isEditorReadOnly = function isEditorReadOnly(editor) {
  return p.isEditorReadOnly(editor);
};
var isElement = function isElement(value) {
  return p.isElement(value);
};
var isBlockNode = function isBlockNode(editor, value) {
  return p.isBlock(editor, value);
};
var findNodePath = function findNodePath(editor, node) {
  return p.findNodePath(editor, node);
};
var isAncestorPath = function isAncestorPath(path, another) {
  return s.Path.isAncestor(path, another);
};
var isAncestorEmpty = function isAncestorEmpty(editor, node) {
  return p.isAncestorEmpty(editor, node);
};
var getParentPath = function getParentPath(path) {
  return s.Path.parent(path);
};
var getNextPath = function getNextPath(path) {
  return s.Path.next(path);
};
var getPreviousPath = function getPreviousPath(path) {
  return s.Path.previous(path);
};
var getLastChildPath = function getLastChildPath(nodeEntry) {
  return p.getLastChildPath(nodeEntry);
};
var getPathLevels = function getPathLevels(path, options) {
  return s.Path.levels(path, options);
};
var isFirstChildPath = function isFirstChildPath(path) {
  return p.isFirstChild(path);
};
var isLastChildPath = function isLastChildPath(entry, childPath) {
  return p.isLastChild(entry, childPath);
};
var matchNode = function matchNode(node, path, fn) {
  return p.match(node, path, fn);
};
var someHtmlElement = function someHtmlElement(rootNode, predicate) {
  return p.someHtmlElement(rootNode, predicate);
};
var getPointBefore = function getPointBefore(editor, at, options) {
  return p.getPointBefore(editor, at, options);
};
var getPointAfter = function getPointAfter(editor, at, options) {
  return p.getPointAfter(editor, at, options);
};
var isEndPoint = function isEndPoint(editor, point, at) {
  return p.isEndPoint(editor, point, at);
};
var isInline = function isInline(editor, value) {
  return p.isInline(editor, value);
};
var queryNode = function queryNode(entry, options) {
  return p.queryNode(entry, options);
};
var getPluginType = function getPluginType(editor, key) {
  return p.getPluginType(editor, key);
};
var createPathRef = function createPathRef(editor, at) {
  return p.createPathRef(editor, at);
};
var match = function match(obj, path, predicate) {
  return p.match(obj, path, predicate);
};
var getLastNodeByLevel = function getLastNodeByLevel(editor, level) {
  return p.getLastNodeByLevel(editor, level);
};

/**
 * Apply editor normalization rules
 */

var normalize = function normalize(editor, options) {
  if (options === void 0) {
    options = {
      force: true
    };
  }

  return p.normalizeEditor(editor, options);
};
/**
 * Set the selection to a location
 */

var setSelection = function setSelection(editor, props) {
  return p.setSelection(editor, props);
};
var select = function select(editor, location) {
  return p.select(editor, location);
};
var moveSelection = function moveSelection(editor, options) {
  return p.moveSelection(editor, options);
};
var moveChildren = function moveChildren(editor, options) {
  return p.moveChildren(editor, options);
};
var collapseSelection = function collapseSelection(editor, options) {
  return p.collapseSelection(editor, options);
};
var setNodes = function setNodes(editor, attrs, opts) {
  p.setNodes(editor, attrs, opts);
};
var unsetNodes = function unsetNodes(editor, props, options) {
  p.unsetNodes(editor, props, options);
};
var insertNodes = function insertNodes(editor, nodes, opts) {
  return p.insertNodes(editor, nodes, opts);
};
var splitNodes = function splitNodes(editor, options) {
  return p.splitNodes(editor, options);
};
var liftNodes = function liftNodes(editor, options) {
  return p.liftNodes(editor, options);
};
var unwrapNodes = function unwrapNodes(editor, options) {
  return p.unwrapNodes(editor, options);
};
var wrapNodes = function wrapNodes(editor, element, options) {
  return p.wrapNodes(editor, element, options);
};
var toggleNodeType = function toggleNodeType(editor, options, editorOptions) {
  p.toggleNodeType(editor, options, editorOptions);
};
var removeMark = function removeMark(editor, type, at) {
  p.removeMark(editor, {
    key: type,
    at: at
  });
};
var unhangRange = function unhangRange(editor, range, options) {
  return p.unhangRange(editor, range, options);
};
var toggleMark = function toggleMark(editor, options) {
  return p.toggleMark(editor, options);
};
var addMark = function addMark(editor, type, value) {
  if (value === void 0) {
    value = true;
  }

  p.addMark(editor, type, value);
};
var insertText = function insertText(editor, text, options) {
  return p.insertText(editor, text, options);
};
var deleteText = function deleteText(editor, opts) {
  p.deleteText(editor, opts);
};
var removeNodes = function removeNodes(editor, opts) {
  p.removeNodes(editor, opts);
};
var moveNodes = function moveNodes(editor, opts) {
  p.moveNodes(editor, opts);
};
var deleteFragment = function deleteFragment(editor, options) {
  return p.deleteFragment(editor, options);
};

var IS_SAFARI = typeof navigator !== 'undefined' && /*#__PURE__*/ /Version\/[\d.]+.*Safari/.test(navigator.userAgent);
var IS_CHROME = /*#__PURE__*/ /(?!Chrom.*OPR)Chrom(?:e|ium)\/([0-9.]+)(:?\s|$)/.test(navigator.userAgent);

var LINK_TYPES = [Contentful.INLINES.HYPERLINK, Contentful.INLINES.ENTRY_HYPERLINK, Contentful.INLINES.ASSET_HYPERLINK];
function isBlockSelected(editor, type) {
  var _Array$from = Array.from(getNodeEntries(editor, {
    match: function match(node) {
      return isElement(node) && node.type === type;
    }
  })),
      match = _Array$from[0];

  return !!match;
}
function isRootLevel(path) {
  return path.length === 1;
}
function getNodeEntryFromSelection(editor, nodeTypeOrTypes, path) {
  var _path, _editor$selection;

  path = (_path = path) != null ? _path : (_editor$selection = editor.selection) == null ? void 0 : _editor$selection.focus.path;
  if (!path) return [];
  var nodeTypes = Array.isArray(nodeTypeOrTypes) ? nodeTypeOrTypes : [nodeTypeOrTypes];

  for (var i = 0; i < path.length; i++) {
    var nodeEntry = getNodeEntry(editor, path.slice(0, i + 1));
    if (nodeTypes.includes(nodeEntry[0].type)) return nodeEntry;
  }

  return [];
}
function isNodeTypeSelected(editor, nodeType) {
  if (!editor) return false;

  var _getNodeEntryFromSele = getNodeEntryFromSelection(editor, nodeType),
      node = _getNodeEntryFromSele[0];

  return !!node;
}
function moveToTheNextLine(editor) {
  moveSelection(editor, {
    distance: 1,
    unit: 'line'
  });
}
function moveToTheNextChar(editor) {
  moveSelection(editor, {
    distance: 1,
    unit: 'offset'
  });
}
function insertEmptyParagraph(editor, options) {
  var emptyParagraph = {
    type: Contentful.BLOCKS.PARAGRAPH,
    children: [{
      text: ''
    }],
    data: {},
    isVoid: false
  };
  insertNodes(editor, emptyParagraph, options);
}
function getElementFromCurrentSelection(editor) {
  if (!editor.selection) return [];
  return Array.from(getNodeEntries(editor, {
    /**
     * editor.select is a Range, which includes anchor and focus, the beginning and the end of a selection
     * when using only editor.selection.focus, we might get only the end of the selection, or where the text cursor is
     * and in some cases getting the next element instead of the one we want
     **/
    at: editor.selection,
    match: function match(node) {
      return isElement(node);
    }
  })).flat();
}
function getTableSize(table) {
  var _firstRow$children;

  var numRows = table.children.length;
  if (!numRows) return null;
  var _table$children = table.children,
      firstRow = _table$children[0];
  var numColumns = (_firstRow$children = firstRow.children) == null ? void 0 : _firstRow$children.length;
  return {
    numRows: numRows,
    numColumns: numColumns
  };
} // TODO: move to hyperlink plugin

function insertLink(editor, options) {
  if (editor.selection) {
    wrapLink(editor, options);
  }
} // TODO: move to hyperlink plugin

function isLinkActive(editor) {
  if (!editor) {
    return false;
  }

  var _Array$from2 = Array.from(getNodeEntries(editor, {
    match: function match(node) {
      return !isEditor(node) && isElement(node) && LINK_TYPES.includes(node.type);
    }
  })),
      link = _Array$from2[0];

  return !!link;
} // TODO: move to hyperlink plugin

function unwrapLink(editor) {
  unwrapNodes(editor, {
    match: function match(node) {
      return !isEditor(node) && isElement(node) && LINK_TYPES.includes(node.type);
    }
  });
} // TODO: move to hyperlink plugin

function wrapLink(editor, _ref) {
  var text = _ref.text,
      url = _ref.url,
      target = _ref.target,
      type = _ref.type,
      path = _ref.path;

  if (isLinkActive(editor) && !path) {
    unwrapLink(editor);
  }

  var selection = editor.selection;
  var isCollapsed = selection && isRangeCollapsed(selection);
  var link = {
    type: type,
    data: {},
    children: isCollapsed ? [{
      text: text
    }] : []
  };

  if (url) {
    link.data = {
      uri: url
    };
  }

  if (target) {
    link.data = {
      target: target
    };
  } // TODO: always set the selection to the end of the inserted link


  if (path) {
    setNodes(editor, link, {
      at: path
    });
    insertText(editor, text, {
      at: path
    });
    select(editor, path);
  } else if (isCollapsed) {
    insertNodes(editor, link);
  } else {
    wrapNodes(editor, link, {
      split: true
    });
    deleteText(editor);
    insertText(editor, text);
    collapseSelection(editor, {
      edge: 'end'
    });
  }
}
function getAncestorPathFromSelection(editor) {
  if (!editor.selection) return undefined;
  return getPathLevels(editor.selection.focus.path).find(function (level) {
    return level.length === 1;
  });
}
var INLINE_TYPES = /*#__PURE__*/Object.values(Contentful.INLINES);
var isInlineOrText = function isInlineOrText(node) {
  // either text or inline elements
  return isText(node) || isElement(node) && INLINE_TYPES.includes(node.type);
};
var focus = function focus(editor) {
  var x = window.scrollX;
  var y = window.scrollY;
  focusEditor(editor); // Safari has issues with `editor.focus({ preventScroll: true })`, it ignores the option `preventScroll`

  if (IS_SAFARI) {
    setTimeout(function () {
      window.scrollTo(x, y); // restore position
    }, 0);
  }
};
function toggleElement(editor, options, editorOptions) {
  toggleNodeType(editor, options, editorOptions); // We must reset `data` from one element to another

  setNodes(editor, {
    data: {}
  });
}

var VALIDATIONS = {
  ENABLED_MARKS: 'enabledMarks',
  ENABLED_NODE_TYPES: 'enabledNodeTypes'
};
var DEFAULT_ENABLED_NODE_TYPES = [Contentful.BLOCKS.DOCUMENT, Contentful.BLOCKS.PARAGRAPH, 'text'];

var getRichTextValidation = function getRichTextValidation(field, validationType) {
  return flow(function (v) {
    return find(v, validationType);
  }, function (v) {
    return get(v, validationType);
  })(field.validations);
};

var isFormattingOptionEnabled = function isFormattingOptionEnabled(field, validationType, nodeTypeOrMark) {
  var enabledFormattings = getRichTextValidation(field, validationType); // TODO: In the future, validations will always be opt-in. In that case
  // we don't need this step.

  if (enabledFormattings === undefined) {
    return true;
  }

  return DEFAULT_ENABLED_NODE_TYPES.concat(enabledFormattings).includes(nodeTypeOrMark);
};

var isNodeTypeEnabled = function isNodeTypeEnabled(field, nodeType) {
  return isFormattingOptionEnabled(field, VALIDATIONS.ENABLED_NODE_TYPES, nodeType);
};
var isMarkEnabled = function isMarkEnabled(field, mark) {
  return isFormattingOptionEnabled(field, VALIDATIONS.ENABLED_MARKS, mark);
};

var COMMAND_PROMPT = 'command-prompt';

function createInlineEntryNode(id) {
  return {
    type: Contentful.INLINES.EMBEDDED_ENTRY,
    children: [{
      text: ''
    }],
    data: {
      target: {
        sys: {
          id: id,
          type: 'Link',
          linkType: 'Entry'
        }
      }
    }
  };
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

function fetchAssets(_x, _x2) {
  return _fetchAssets.apply(this, arguments);
}

function _fetchAssets() {
  _fetchAssets = _asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee(sdk, query) {
    var assets;
    return runtime_1.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return sdk.space.getAssets({
              query: query
            });

          case 2:
            assets = _context.sent;
            return _context.abrupt("return", assets.items.map(function (asset) {
              var displayTitle = fieldEditorShared.entityHelpers.getAssetTitle({
                asset: asset,
                localeCode: sdk.field.locale,
                defaultLocaleCode: sdk.locales["default"],
                defaultTitle: 'Untitled'
              });
              return {
                contentTypeName: 'Asset',
                displayTitle: displayTitle,
                id: asset.sys.id,
                entity: asset,
                thumbnail: asset.fields.file && asset.fields.file[sdk.field.locale] && asset.fields.file[sdk.field.locale].url + "?h=30"
              };
            }));

          case 4:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _fetchAssets.apply(this, arguments);
}

function fetchEntries(_x, _x2, _x3) {
  return _fetchEntries.apply(this, arguments);
}

function _fetchEntries() {
  _fetchEntries = _asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee(sdk, contentType, query) {
    var entries;
    return runtime_1.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return sdk.space.getEntries({
              content_type: contentType.sys.id,
              query: query
            });

          case 2:
            entries = _context.sent;
            return _context.abrupt("return", entries.items.map(function (entry) {
              var description = fieldEditorShared.entityHelpers.getEntityDescription({
                contentType: contentType,
                // @ts-expect-error inconsistent in typing between app-sdk & field-editors-shared
                entity: entry,
                localeCode: sdk.field.locale,
                defaultLocaleCode: sdk.locales["default"]
              });
              var displayTitle = fieldEditorShared.entityHelpers.getEntryTitle({
                // @ts-expect-error inconsistent in typing between app-sdk & field-editors-shared
                entry: entry,
                contentType: contentType,
                localeCode: sdk.field.locale,
                defaultLocaleCode: sdk.locales["default"],
                defaultTitle: 'Untitled'
              });
              return {
                contentTypeName: contentType.name,
                displayTitle: displayTitle,
                id: entry.sys.contentType.sys.id,
                description: description,
                entry: entry
              };
            }));

          case 4:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _fetchEntries.apply(this, arguments);
}

var createNode = function createNode(nodeType, entity) {
  return {
    type: nodeType,
    data: {
      target: {
        sys: {
          id: entity.sys.id,
          type: 'Link',
          linkType: entity.sys.type
        }
      }
    },
    children: [{
      text: ''
    }],
    isVoid: true
  };
};

function insertBlock(editor, nodeType, entity) {
  if (!(editor != null && editor.selection)) return;
  var linkedEntityBlock = createNode(nodeType, entity);
  var hasText = editor.selection && !!getText(editor, editor.selection.focus.path);

  if (hasText) {
    insertNodes(editor, linkedEntityBlock);
  } else {
    setNodes(editor, linkedEntityBlock);
  }

  focus(editor);
}

var removeCommand = function removeCommand(editor) {
  var _getAboveNode = getAboveNode(editor),
      path = _getAboveNode[1];

  var range = getRange(editor, path);
  select(editor, range.focus.path);
  removeMark(editor, COMMAND_PROMPT, range);
  deleteText(editor);
};

var removeQuery = function removeQuery(editor) {
  var _getAboveNode2 = getAboveNode(editor),
      path = _getAboveNode2[1];

  var range = getRange(editor, path);

  if (range.focus.offset - range.anchor.offset > 1) {
    deleteText(editor, {
      at: range.focus,
      distance: range.focus.offset - 1,
      reverse: true
    });
  }
};

function isCommandPromptPluginEnabled(sdk) {
  var inlineAllowed = isNodeTypeEnabled(sdk.field, Contentful.INLINES.EMBEDDED_ENTRY);
  var entriesAllowed = isNodeTypeEnabled(sdk.field, Contentful.BLOCKS.EMBEDDED_ENTRY);
  var assetsAllowed = isNodeTypeEnabled(sdk.field, Contentful.BLOCKS.EMBEDDED_ASSET);
  return {
    inlineAllowed: inlineAllowed,
    entriesAllowed: entriesAllowed,
    assetsAllowed: assetsAllowed
  };
}

function getCommandPermissions(sdk, editor) {
  var canInsertBlocks = !isNodeTypeSelected(editor, Contentful.BLOCKS.TABLE);

  var _isCommandPromptPlugi = isCommandPromptPluginEnabled(sdk),
      inlineAllowed = _isCommandPromptPlugi.inlineAllowed,
      entriesAllowed = _isCommandPromptPlugi.entriesAllowed,
      assetsAllowed = _isCommandPromptPlugi.assetsAllowed;

  return {
    inlineAllowed: inlineAllowed,
    entriesAllowed: entriesAllowed && canInsertBlocks,
    assetsAllowed: assetsAllowed && canInsertBlocks
  };
}

var useCommands = function useCommands(sdk, query, editor) {
  var contentTypes = sdk.space.getCachedContentTypes();

  var _getCommandPermission = getCommandPermissions(sdk, editor),
      inlineAllowed = _getCommandPermission.inlineAllowed,
      entriesAllowed = _getCommandPermission.entriesAllowed,
      assetsAllowed = _getCommandPermission.assetsAllowed;

  var _useState = React.useState(function () {
    var getEmbedEntry = function getEmbedEntry(contentType) {
      return {
        id: contentType.sys.id,
        label: "Embed " + contentType.name,
        callback: function callback() {
          fetchEntries(sdk, contentType, query).then(function (entries) {
            removeQuery(editor);

            if (!entries.length) {
              setCommands([{
                id: 'no-results',
                label: 'No results'
              }]);
            } else {
              setCommands(entries.map(function (entry) {
                return {
                  id: entry.id + "-" + entry.displayTitle.replace(/\W+/g, '-').toLowerCase(),
                  label: entry.displayTitle,
                  callback: function callback() {
                    removeCommand(editor);

                    if (editor.selection) {
                      var selection = editor.selection;
                      editor.insertSoftBreak();
                      insertBlock(editor, Contentful.BLOCKS.EMBEDDED_ENTRY, entry.entry);
                      select(editor, selection);
                      editor.tracking.onCommandPaletteAction('insert', {
                        nodeType: Contentful.BLOCKS.EMBEDDED_ENTRY
                      });
                    }
                  }
                };
              }));
            }
          });
        }
      };
    };

    var getEmbedInline = function getEmbedInline(contentType) {
      return {
        id: contentType.sys.id + "-inline",
        label: "Embed " + contentType.name + " - Inline",
        callback: function callback() {
          fetchEntries(sdk, contentType, query).then(function (entries) {
            removeQuery(editor);

            if (!entries.length) {
              setCommands([{
                id: 'no-results',
                label: 'No results'
              }]);
            } else {
              setCommands(entries.map(function (entry) {
                return {
                  id: entry.id + "-" + entry.displayTitle.replace(/\W+/g, '-').toLowerCase(),
                  label: entry.displayTitle,
                  callback: function callback() {
                    var inlineNode = createInlineEntryNode(entry.id);
                    removeCommand(editor);
                    insertNodes(editor, inlineNode);
                    editor.insertText('');
                    editor.tracking.onCommandPaletteAction('insert', {
                      nodeType: Contentful.INLINES.EMBEDDED_ENTRY
                    });
                  }
                };
              }));
            }
          });
        }
      };
    };

    var contentTypeCommands = entriesAllowed || inlineAllowed ? contentTypes.map(function (contentType) {
      return {
        group: contentType.name,
        commands: entriesAllowed && inlineAllowed ? [getEmbedEntry(contentType), getEmbedInline(contentType)] : entriesAllowed ? [getEmbedEntry(contentType)] : [getEmbedInline(contentType)]
      };
    }) : [];

    if (assetsAllowed) {
      var assetCommand = {
        group: 'Assets',
        commands: [{
          id: 'embed-asset',
          label: 'Embed Asset',
          callback: function callback() {
            fetchAssets(sdk, query).then(function (assets) {
              removeQuery(editor);

              if (!assets.length) {
                setCommands([{
                  id: 'no-results',
                  label: 'No results'
                }]);
              } else {
                setCommands(assets.map(function (asset) {
                  return {
                    id: asset.id + "-" + asset.displayTitle.replace(/\W+/g, '-').toLowerCase(),
                    label: asset.displayTitle,
                    thumbnail: asset.thumbnail,
                    callback: function callback() {
                      removeCommand(editor);

                      if (editor.selection) {
                        var selection = editor.selection;
                        editor.insertSoftBreak();
                        insertBlock(editor, Contentful.BLOCKS.EMBEDDED_ASSET, asset.entity);
                        select(editor, selection);
                        editor.tracking.onCommandPaletteAction('insert', {
                          nodeType: Contentful.BLOCKS.EMBEDDED_ASSET
                        });
                      }
                    }
                  };
                }));
              }
            });
          }
        }]
      };
      return [].concat(contentTypeCommands, [assetCommand]);
    }

    return contentTypeCommands;
  }),
      commands = _useState[0],
      setCommands = _useState[1];
  /* filter both commands and groups of commands with the user typed query */


  return query ? commands.reduce(function (list, nextItem) {
    if ('group' in nextItem) {
      var subcommands = nextItem.commands.filter(function (command) {
        return command.label.toLowerCase().includes(query.toLowerCase());
      });

      if (subcommands.length > 0) {
        list.push(nextItem);
      }
    } else {
      if (nextItem.label.toLowerCase().includes(query.toLowerCase())) {
        list.push(nextItem);
      }
    }

    return list;
  }, []) : commands;
};

var styles = {
  container: /*#__PURE__*/emotion.css({
    position: 'absolute',
    zIndex: tokens.zIndexNotification,
    fontWeight: tokens.fontWeightNormal,
    fontStyle: 'normal',
    fontFamily: tokens.fontStackPrimary,
    'ul, ol, dl': {
      listStyle: 'none',
      marginLeft: 0
    }
  }),
  menuPoper: /*#__PURE__*/emotion.css({
    zIndex: tokens.zIndexModal
  }),
  menuContent: /*#__PURE__*/emotion.css({
    width: '400px',
    maxHeight: '300px'
  }),
  menuList: /*#__PURE__*/emotion.css({
    overflow: 'auto',
    maxHeight: '200px'
  }),
  menuItem: /*#__PURE__*/emotion.css({
    display: 'block',
    width: '100%',
    background: 'none',
    border: 0,
    margin: 0,
    outline: 'none',
    fontSize: tokens.fontSizeM,
    lineHeight: tokens.lineHeightM,
    fontWeight: tokens.fontWeightNormal,
    position: 'relative',
    textAlign: 'left',
    padding: tokens.spacingXs + " " + tokens.spacingM,
    wordBreak: 'break-word',
    whiteSpace: 'break-spaces',
    cursor: 'pointer',
    hyphens: 'auto',
    minWidth: '150px',
    textDecoration: 'none',
    color: tokens.gray800,
    '&:hover': {
      backgroundColor: tokens.gray100
    },
    '&:disabled': {
      opacity: 0.5,
      cursor: 'auto'
    }
  }),
  menuItemSelected: /*#__PURE__*/emotion.css({
    boxShadow: "inset " + tokens.glowPrimary,
    borderRadius: tokens.borderRadiusMedium
  }),
  menuDivider: /*#__PURE__*/emotion.css({
    border: 'none',
    width: '100%',
    height: '1px',
    background: tokens.gray300,
    margin: tokens.spacingXs + " 0"
  }),
  menuHeader: /*#__PURE__*/emotion.css({
    zIndex: tokens.zIndexDefault,
    top: 0,
    backgroundColor: tokens.gray100,
    padding: tokens.spacingM
  }),
  menuFooter: /*#__PURE__*/emotion.css({
    position: 'sticky',
    bottom: 0,
    backgroundColor: tokens.gray100,
    padding: tokens.spacingM
  }),
  footerList: /*#__PURE__*/emotion.css({
    listStyle: 'none',
    color: tokens.gray600,
    fontSize: tokens.fontSizeM
  }),
  thumbnail: /*#__PURE__*/emotion.css({
    width: '30px',
    height: '30px',
    objectFit: 'cover'
  })
};

var Group = function Group(_ref) {
  var commandGroup = _ref.commandGroup,
      selectedItem = _ref.selectedItem;
  return /*#__PURE__*/React.createElement("section", {
    key: commandGroup.group
  }, /*#__PURE__*/React.createElement(f36Components.SectionHeading, {
    as: "h3",
    marginBottom: "spacingS",
    marginTop: "spacingS",
    marginLeft: "spacingM",
    marginRight: "spacingM"
  }, commandGroup.group), commandGroup.commands.map(function (command) {
    var _cx;

    return /*#__PURE__*/React.createElement("button", {
      key: command.id,
      id: command.id,
      className: emotion.cx(styles.menuItem, (_cx = {}, _cx[styles.menuItemSelected] = command.id === selectedItem, _cx)),
      onClick: command.callback
    }, command.label);
  }), /*#__PURE__*/React.createElement("hr", {
    className: styles.menuDivider,
    "aria-orientation": "horizontal"
  }));
};

var Asset = function Asset(_ref2) {
  var _cx2;

  var command = _ref2.command,
      selectedItem = _ref2.selectedItem;
  return /*#__PURE__*/React.createElement("button", {
    key: command.id,
    id: command.id,
    className: emotion.cx(styles.menuItem, (_cx2 = {}, _cx2[styles.menuItemSelected] = command.id === selectedItem, _cx2)),
    onClick: command.callback
  }, /*#__PURE__*/React.createElement(f36Components.Flex, {
    alignItems: "center",
    gap: "spacingS"
  }, command.thumbnail && /*#__PURE__*/React.createElement("img", {
    width: "30",
    height: "30",
    src: command.thumbnail,
    alt: "",
    className: styles.thumbnail
  }), /*#__PURE__*/React.createElement("span", null, command.label)));
};

var Item = function Item(_ref3) {
  var command = _ref3.command;
  return /*#__PURE__*/React.createElement("button", {
    key: command.id,
    id: command.id,
    className: styles.menuItem
  }, command.label);
};

var CommandListItems = function CommandListItems(_ref4) {
  var commandItems = _ref4.commandItems,
      selectedItem = _ref4.selectedItem;
  return /*#__PURE__*/React.createElement(React.Fragment, null, commandItems.map(function (command) {
    return 'group' in command ? /*#__PURE__*/React.createElement(Group, {
      commandGroup: command,
      selectedItem: selectedItem
    }) : command.callback ? /*#__PURE__*/React.createElement(Asset, {
      command: command,
      selectedItem: selectedItem
    }) : /*#__PURE__*/React.createElement(Item, {
      command: command
    });
  }));
};

var CommandList = function CommandList(_ref5) {
  var query = _ref5.query,
      editor = _ref5.editor,
      textContainer = _ref5.textContainer;
  var sdk = useSdkContext();
  var popoverContainer = React.useRef(null);
  var popper = reactPopper.usePopper(textContainer, popoverContainer == null ? void 0 : popoverContainer.current, {
    placement: 'bottom-start'
  });
  var commandItems = useCommands(sdk, query, editor);

  var _useCommandList = useCommandList(commandItems, popoverContainer),
      selectedItem = _useCommandList.selectedItem,
      isOpen = _useCommandList.isOpen;

  if (!commandItems.length) {
    return null;
  }

  return /*#__PURE__*/React.createElement("div", {
    className: styles.container,
    tabIndex: -1,
    contentEditable: false
  }, /*#__PURE__*/React.createElement("div", {
    role: "alert"
  }, /*#__PURE__*/React.createElement(f36Components.ScreenReaderOnly, null, "Richtext commands. Currently focused item: ", selectedItem, ". Press ", /*#__PURE__*/React.createElement("kbd", null, "enter"), " to select, ", /*#__PURE__*/React.createElement("kbd", null, "arrows"), " to navigate, ", /*#__PURE__*/React.createElement("kbd", null, "escape"), " to close.")), /*#__PURE__*/React.createElement(f36Utils.Portal, null, /*#__PURE__*/React.createElement("div", _extends({
    "aria-hidden": true,
    ref: popoverContainer,
    className: styles.menuPoper,
    style: popper.styles.popper
  }, popper.attributes.popper), /*#__PURE__*/React.createElement(f36Components.Popover, {
    isOpen: isOpen,
    usePortal: false,

    /* eslint-disable-next-line jsx-a11y/no-autofocus -- we want to keep focus on text input*/
    autoFocus: false
  }, /*#__PURE__*/React.createElement(f36Components.Popover.Trigger, null, /*#__PURE__*/React.createElement("span", null)), /*#__PURE__*/React.createElement(f36Components.Popover.Content, {
    className: styles.menuContent,
    testId: "rich-text-commands"
  }, /*#__PURE__*/React.createElement("header", {
    className: styles.menuHeader
  }, /*#__PURE__*/React.createElement(f36Components.SectionHeading, {
    marginBottom: "none"
  }, "Richtext commands")), /*#__PURE__*/React.createElement("div", {
    className: styles.menuList,
    "data-test-id": "rich-text-commands-list"
  }, /*#__PURE__*/React.createElement(CommandListItems, {
    commandItems: commandItems,
    selectedItem: selectedItem
  })), /*#__PURE__*/React.createElement("footer", {
    className: styles.menuFooter
  }, /*#__PURE__*/React.createElement(f36Components.Stack, {
    as: "ul",
    margin: "none",
    padding: "none",
    spacing: "spacingS",
    className: styles.footerList
  }, /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("kbd", null, "\u2191"), /*#__PURE__*/React.createElement("kbd", null, "\u2193"), " to navigate"), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("kbd", null, "\u21B5"), " to confirm"), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("kbd", null, "esc"), " to close"))))))));
};

var CommandPrompt = function CommandPrompt(props) {
  var query = React.useMemo(function () {
    return trimLeadingSlash(props.text.text);
  }, [props.text.text]);
  var editor = props.editor;

  var _React$useState = React.useState(),
      textElement = _React$useState[0],
      setTextElement = _React$useState[1];

  return /*#__PURE__*/React.createElement("span", _extends({
    ref: function ref(e) {
      setTextElement(e);
    }
  }, props.attributes), props.children, /*#__PURE__*/React.createElement(CommandList, {
    query: query,
    editor: editor,
    textContainer: textElement
  }));
};

var createOnKeyDown = function createOnKeyDown() {
  return function (editor) {
    return function (event) {
      // Support for different keyboard layouts:
      // `isHotKey` uses by default `event.which`, which will never generates a match for all layouts (QWERTY: `/`, QWERTZ: `shift+7`)
      // with `byKey: true` `isHotKey` uses `event.key` which will return the interpreted key '/'
      // It would still fail without the the optional `shift?` param, as it first checks the modKeys (`shiftKey` would be true on QWERTZ)
      if (isHotkey('shift?+/', {
        byKey: true
      }, event)) {
        addMark(editor, COMMAND_PROMPT);
        editor.tracking.onCommandPaletteAction('openRichTextCommandPalette');
      }

      var isActive = isMarkActive(editor, COMMAND_PROMPT);

      if (!isActive) {
        return;
      }

      if (isHotkey('enter', event)) {
        return event.preventDefault();
      }

      var _getAboveNode = getAboveNode(editor),
          path = _getAboveNode[1];

      var range = getRange(editor, path);

      if (isHotkey('backspace', event)) {
        // if it is the last character in the command string
        if (range.focus.offset - range.anchor.offset === 1) {
          removeMark(editor, COMMAND_PROMPT, range);
        }
      }

      if (isHotkey('escape', event)) {
        event.stopPropagation();
        removeMark(editor, COMMAND_PROMPT, range);
        editor.tracking.onCommandPaletteAction('cancelRichTextCommandPalette');
        focusEditor(editor);
      }
    };
  };
};

/**
 * A command palette plugin (aka slash commands)
 *
 * How does it work?
 * * When the user presses the slash key, the editor will show a command palette
 * * When the user presses a key, the command palette will show the command suggestions
 * * When the user presses enter, the command palette will execute the command
 * * When the user presses escape, the command palette will hide
 * * When the user presses a letter, number, or space, the command palette will show the command suggestions
 * * When the user presses backspace, the command palette will remove the last character from the command string
 */

var createCommandPalettePlugin = function createCommandPalettePlugin() {
  return {
    key: COMMAND_PROMPT,
    type: COMMAND_PROMPT,
    isLeaf: true,
    component: CommandPrompt,
    handlers: {
      onKeyDown: createOnKeyDown()
    }
  };
};

function createDragAndDropPlugin() {
  var DRAGGABLE_TYPES = [Contentful.BLOCKS.EMBEDDED_ENTRY, Contentful.BLOCKS.EMBEDDED_ASSET, Contentful.BLOCKS.HR, Contentful.INLINES.EMBEDDED_ENTRY];
  /**
   * HTML node names where dropping should be allowed
   * Usually for elements where `Transforms.removeNodes` is needed
   * TODO: looking up for html nodes is not the best solution and it won't scale but it works fine for our current cases/elements
   */

  var ON_DROP_ALLOWED_TYPES = {
    TABLE: [Contentful.INLINES.EMBEDDED_ENTRY]
  };
  return {
    key: 'DragAndDropPlugin',
    handlers: {
      // If true, the next handlers will be skipped.
      onDrop: function onDrop(editor) {
        return function (event) {
          var _Array$from = Array.from(getNodeEntries(editor, {
            match: function match(node) {
              return DRAGGABLE_TYPES.includes(node.type);
            }
          })),
              draggingBlock = _Array$from[0];

          if (!draggingBlock) return false;
          var draggingNode = draggingBlock[0];
          if (!event.nativeEvent.target) return false; // TODO: looking up for html nodes is not the best solution and it won't scale, we need to find a way to know the dropping target slate element

          var dropDisallowed = getParents(event.nativeEvent.target).some(function (node) {
            var _ON_DROP_ALLOWED_TYPE;

            return ON_DROP_ALLOWED_TYPES[node.nodeName] ? !((_ON_DROP_ALLOWED_TYPE = ON_DROP_ALLOWED_TYPES[node.nodeName]) != null && _ON_DROP_ALLOWED_TYPE.includes(draggingNode.type)) : false;
          });

          if (!dropDisallowed) {
            // Move the drop event to a new undo batch mitigating the bug where undo not only moves it back,
            // but also undoes a previous action: https://github.com/ianstormtaylor/slate/issues/4694
            editor.history.undos.push([]);
          }

          return dropDisallowed;
        };
      }
    }
  };
}

function getParents(el) {
  var parents = [];
  parents.push(el);

  while (el.parentNode) {
    parents.unshift(el.parentNode);
    el = el.parentNode;
  }

  return parents;
}

function withLinkTracking(Component) {
  return function ComponentWithTracking(props) {
    var editor = useContentfulEditorRef();
    var onEntityFetchComplete = React__default.useCallback(function () {
      return editor == null ? void 0 : editor.tracking.onViewportAction('linkRendered');
    }, [editor]);
    return /*#__PURE__*/React__default.createElement(Component, _extends({}, props, {
      onEntityFetchComplete: onEntityFetchComplete
    }));
  };
}

var InternalAssetCard = /*#__PURE__*/React.memo(function (props) {
  if (props.asset === undefined) {
    return /*#__PURE__*/React.createElement(f36Components.AssetCard, {
      size: "default",
      isLoading: true
    });
  }

  if (props.asset === 'failed') {
    return /*#__PURE__*/React.createElement(fieldEditorReference.MissingEntityCard, {
      entityType: "Asset",
      isDisabled: props.isDisabled,
      onRemove: props.onRemove
    });
  }

  return /*#__PURE__*/React.createElement(fieldEditorReference.WrappedAssetCard, {
    getEntityScheduledActions: props.loadEntityScheduledActions,
    size: "small",
    isSelected: props.isSelected,
    isDisabled: props.isDisabled,
    localeCode: props.locale,
    defaultLocaleCode: props.sdk.locales["default"],
    asset: props.asset,
    onEdit: props.onEdit,
    onRemove: props.isDisabled ? undefined : props.onRemove,
    isClickable: false
  });
}, areEqual);
InternalAssetCard.displayName = 'InternalAssetCard';
function FetchingWrappedAssetCard(props) {
  var onEntityFetchComplete = props.onEntityFetchComplete;

  var _useEntity = fieldEditorReference.useEntity('Asset', props.assetId),
      asset = _useEntity.data,
      status = _useEntity.status;

  var _useEntityLoader = fieldEditorReference.useEntityLoader(),
      getEntityScheduledActions = _useEntityLoader.getEntityScheduledActions;

  var loadEntityScheduledActions = React.useCallback(function () {
    return getEntityScheduledActions('Asset', props.assetId);
  }, [getEntityScheduledActions, props.assetId]);
  React.useEffect(function () {
    if (status === 'success') {
      onEntityFetchComplete == null ? void 0 : onEntityFetchComplete();
    }
  }, [onEntityFetchComplete, status]);
  return /*#__PURE__*/React.createElement(InternalAssetCard, {
    asset: asset,
    sdk: props.sdk,
    isDisabled: props.isDisabled,
    isSelected: props.isSelected,
    loadEntityScheduledActions: loadEntityScheduledActions,
    locale: props.locale,
    onEdit: props.onEdit,
    onRemove: props.onRemove
  });
}

var InternalEntryCard = /*#__PURE__*/React.memo(function (props) {
  var entry = props.entry,
      sdk = props.sdk,
      loadEntityScheduledActions = props.loadEntityScheduledActions;

  if (entry === undefined) {
    return /*#__PURE__*/React.createElement(f36Components.EntryCard, {
      isLoading: true
    });
  }

  if (entry === 'failed') {
    return /*#__PURE__*/React.createElement(fieldEditorReference.MissingEntityCard, {
      entityType: "Entry",
      isDisabled: props.isDisabled,
      onRemove: props.onRemove
    });
  }

  var contentType = sdk.space.getCachedContentTypes().find(function (contentType) {
    return contentType.sys.id === entry.sys.contentType.sys.id;
  });
  return /*#__PURE__*/React.createElement(fieldEditorReference.WrappedEntryCard, {
    size: "default",
    getAsset: props.sdk.space.getAsset,
    getEntityScheduledActions: loadEntityScheduledActions,
    isSelected: props.isSelected,
    isDisabled: props.isDisabled,
    localeCode: props.locale,
    defaultLocaleCode: props.sdk.locales["default"],
    contentType: contentType,
    entry: entry,
    onEdit: props.onEdit,
    onRemove: props.isDisabled ? undefined : props.onRemove,
    isClickable: false
  });
}, areEqual);
InternalEntryCard.displayName = 'ReferenceCard';
var FetchingWrappedEntryCard = function FetchingWrappedEntryCard(props) {
  var entryId = props.entryId,
      onEntityFetchComplete = props.onEntityFetchComplete;

  var _useEntity = fieldEditorReference.useEntity('Entry', entryId),
      entry = _useEntity.data,
      status = _useEntity.status;

  var _useEntityLoader = fieldEditorReference.useEntityLoader(),
      getEntityScheduledActions = _useEntityLoader.getEntityScheduledActions;

  var loadEntityScheduledActions = React.useCallback(function () {
    return getEntityScheduledActions('Entry', entryId);
  }, [getEntityScheduledActions, entryId]);
  React.useEffect(function () {
    if (status === 'success') {
      onEntityFetchComplete == null ? void 0 : onEntityFetchComplete();
    }
  }, [onEntityFetchComplete, status]);
  return /*#__PURE__*/React.createElement(InternalEntryCard, {
    entry: entry,
    sdk: props.sdk,
    locale: props.locale,
    isDisabled: props.isDisabled,
    isSelected: props.isSelected,
    onEdit: props.onEdit,
    onRemove: props.onRemove,
    loadEntityScheduledActions: loadEntityScheduledActions
  });
};

var styles$1 = {
  root: /*#__PURE__*/emotion.css({
    marginBottom: '1.25rem !important',
    display: 'block'
  }),
  container: /*#__PURE__*/emotion.css({
    // The next 2 properties ensure Entity card won't be aligned above
    // a list item marker (i.e. bullet)
    display: 'inline-block',
    verticalAlign: 'text-top',
    width: '100%'
  })
};
function LinkedEntityBlock(props) {
  var attributes = props.attributes,
      children = props.children,
      element = props.element,
      onEntityFetchComplete = props.onEntityFetchComplete;
  var isSelected = Slate.useSelected();
  var editor = useContentfulEditor();
  var sdk = useSdkContext();
  var isDisabled = Slate.useReadOnly();
  var _element$data$target$ = element.data.target.sys,
      entityId = _element$data$target$.id,
      entityType = _element$data$target$.linkType;
  var handleEditClick = React__default.useCallback(function () {
    var openEntity = entityType === 'Asset' ? sdk.navigator.openAsset : sdk.navigator.openEntry;
    return openEntity(entityId, {
      slideIn: true
    });
  }, [sdk, entityId, entityType]);
  var handleRemoveClick = React__default.useCallback(function () {
    if (!editor) return;
    var pathToElement = findNodePath(editor, element);
    removeNodes(editor, {
      at: pathToElement
    });
  }, [editor, element]);
  return /*#__PURE__*/React__default.createElement("div", _extends({}, attributes, {
    className: styles$1.root,
    "data-entity-type": entityType,
    "data-entity-id": entityId,
    // COMPAT: This makes copy & paste work for Firefox
    contentEditable: IS_CHROME ? undefined : false,
    draggable: IS_CHROME ? true : undefined
  }), /*#__PURE__*/React__default.createElement("div", {
    // COMPAT: This makes copy & paste work for Chromium/Blink browsers and Safari
    contentEditable: IS_CHROME ? false : undefined,
    draggable: IS_CHROME ? true : undefined,
    className: styles$1.container
  }, entityType === 'Entry' && /*#__PURE__*/React__default.createElement(FetchingWrappedEntryCard, {
    sdk: sdk,
    entryId: entityId,
    locale: sdk.field.locale,
    isDisabled: isDisabled,
    isSelected: isSelected,
    onRemove: handleRemoveClick,
    onEdit: handleEditClick,
    onEntityFetchComplete: onEntityFetchComplete
  }), entityType === 'Asset' && /*#__PURE__*/React__default.createElement(FetchingWrappedAssetCard, {
    sdk: sdk,
    assetId: entityId,
    locale: sdk.field.locale,
    isDisabled: isDisabled,
    isSelected: isSelected,
    onRemove: handleRemoveClick,
    onEdit: handleEditClick,
    onEntityFetchComplete: onEntityFetchComplete
  })), children);
}

/* eslint-disable you-dont-need-lodash-underscore/find */
/**
 * Given a field object and a rich text node type, return a list of valid
 * content type IDs associated with the node type, based on that node type's
 * `linkContentType` validation.
 *
 * If there is no such validation or the validation is empty, return an empty
 * array.
 *
 * The navigation here is explained by the `nodes` validation having signature:
 * { nodes: { [nodeType]: validationObject[] } }
 *
 * We defensively navigate through this object because
 * 1) the field may not have a `validations` array,
 * 2) the `validations` array may be empty,
 * 3) the `validations` array may not have a `nodes` validation,
 * 4) the `nodes` validation may not validate the `nodeType`, and
 * 5) the `nodeType` validations may not have a `linkContentType` validation.
 *
 * Note that passing an empty array will result in all possible content types
 * being whitelisted.
 *
 * @param {object} field
 * @param {string} nodeType
 * @returns {string[]}
 */

function getLinkedContentTypeIdsForNodeType(field, nodeType) {
  return flow(function (v) {
    return find(v, 'nodes');
  }, function (v) {
    return get(v, ['nodes', nodeType]);
  }, function (v) {
    return find(v, 'linkContentType');
  }, function (v) {
    return get(v, 'linkContentType', []);
  })(field.validations);
}

/**
 * Returns a config for the entity selector based on a given rich text field and a
 * rich text node type that the entity should be picked for. Takes the field
 * validations for the given node type into account.
 *
 * @param {object} field
 * @param {string} nodeType
 * @returns {object}
 */

function newEntitySelectorConfigFromRichTextField(field, nodeType) {
  return {
    entityType: getEntityTypeFromRichTextNode(nodeType),
    locale: field.locale || null,
    contentTypes: getLinkedContentTypeIdsForNodeType(field, nodeType)
  };
}

function getEntityTypeFromRichTextNode(nodeType) {
  var words = nodeType.split('-');

  if (words.indexOf('entry') !== -1) {
    return 'Entry';
  }

  if (words.indexOf('asset') !== -1) {
    return 'Asset';
  }

  throw new Error("RichText node type `" + nodeType + "` has no associated `entityType`");
}

function selectEntityAndInsert(_x, _x2, _x3, _x4) {
  return _selectEntityAndInsert.apply(this, arguments);
} // TODO: incorporate this logic inside the trailingParagraph plugin instead

function _selectEntityAndInsert() {
  _selectEntityAndInsert = _asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee(nodeType, sdk, editor, logAction) {
    var field, dialogs, baseConfig, selectEntity, config, selection, entity;
    return runtime_1.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            logAction('openCreateEmbedDialog', {
              nodeType: nodeType
            });
            field = sdk.field, dialogs = sdk.dialogs;
            baseConfig = newEntitySelectorConfigFromRichTextField(field, nodeType);
            selectEntity = baseConfig.entityType === 'Asset' ? dialogs.selectSingleAsset : dialogs.selectSingleEntry;
            config = _extends({}, baseConfig, {
              withCreate: true
            });
            selection = editor.selection;
            _context.next = 8;
            return selectEntity(config);

          case 8:
            entity = _context.sent;

            if (entity) {
              _context.next = 12;
              break;
            }

            logAction('cancelCreateEmbedDialog', {
              nodeType: nodeType
            });
            return _context.abrupt("return");

          case 12:
            select(editor, selection);
            insertBlock$1(editor, nodeType, entity);
            ensureFollowingParagraph(editor);
            logAction('insert', {
              nodeType: nodeType
            });

          case 16:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _selectEntityAndInsert.apply(this, arguments);
}

function ensureFollowingParagraph(editor) {
  var _lastNode$0$type;

  var entityBlock = getAboveNode(editor, {
    match: {
      type: [Contentful.BLOCKS.EMBEDDED_ASSET, Contentful.BLOCKS.EMBEDDED_ENTRY]
    }
  });

  if (!entityBlock) {
    return;
  }

  var level = entityBlock[1].length - 1;
  var lastNode = getLastNodeByLevel(editor, level);
  var isTextContainer = Contentful.TEXT_CONTAINERS.includes((_lastNode$0$type = lastNode == null ? void 0 : lastNode[0].type) != null ? _lastNode$0$type : ''); // If the new block isn't followed by a sibling text container (e.g. paragraph)
  // we insert a new empty one. Level 0 is handled by the trailingParagraph plugin

  if (level !== 0 && !isTextContainer) {
    insertEmptyParagraph(editor);
  }

  moveToTheNextChar(editor);
}

var createNode$1 = function createNode(nodeType, entity) {
  return {
    type: nodeType,
    data: {
      target: {
        sys: {
          id: entity.sys.id,
          type: 'Link',
          linkType: entity.sys.type
        }
      }
    },
    children: [{
      text: ''
    }],
    isVoid: true
  };
}; // TODO: DRY up copied code from HR


function insertBlock$1(editor, nodeType, entity) {
  if (!(editor != null && editor.selection)) return;
  var linkedEntityBlock = createNode$1(nodeType, entity);
  var hasText = editor.selection && !!getText(editor, editor.selection.focus.path);

  if (hasText) {
    insertNodes(editor, linkedEntityBlock);
  } else {
    setNodes(editor, linkedEntityBlock);
  }

  focus(editor);
}

var styles$2 = {
  icon: /*#__PURE__*/emotion.css({
    marginRight: '10px'
  })
};
function EmbeddedEntityBlockToolbarIcon(_ref) {
  var isDisabled = _ref.isDisabled,
      nodeType = _ref.nodeType,
      onClose = _ref.onClose;
  var editor = useContentfulEditor();
  var sdk = useSdkContext();

  var handleClick = /*#__PURE__*/function () {
    var _ref2 = _asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee(event) {
      return runtime_1.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              event.preventDefault();

              if (editor) {
                _context.next = 3;
                break;
              }

              return _context.abrupt("return");

            case 3:
              onClose();
              _context.next = 6;
              return selectEntityAndInsert(nodeType, sdk, editor, editor.tracking.onToolbarAction);

            case 6:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));

    return function handleClick(_x) {
      return _ref2.apply(this, arguments);
    };
  }();

  var type = getEntityTypeFromNodeType(nodeType);
  var baseClass = "rich-text__" + nodeType;
  return /*#__PURE__*/React__default.createElement(f36Components.Menu.Item, {
    disabled: isDisabled,
    className: baseClass + "-list-item",
    onClick: handleClick,
    testId: "toolbar-toggle-" + nodeType
  }, /*#__PURE__*/React__default.createElement(f36Components.Flex, {
    alignItems: "center",
    flexDirection: "row"
  }, /*#__PURE__*/React__default.createElement(f36Components.Icon, {
    as: type === 'Asset' ? f36Icons.AssetIcon : f36Icons.EmbeddedEntryBlockIcon,
    className: "rich-text__embedded-entry-list-icon " + styles$2.icon,
    variant: "secondary"
  }), /*#__PURE__*/React__default.createElement("span", null, type)));
}

function getEntityTypeFromNodeType(nodeType) {
  var words = nodeType.toLowerCase().split('-');

  if (words.includes('entry')) {
    return 'Entry';
  }

  if (words.includes('asset')) {
    return 'Asset';
  }

  throw new Error("Node type `" + nodeType + "` has no associated `entityType`");
}

var _entityTypes;
var entityTypes = (_entityTypes = {}, _entityTypes[Contentful.BLOCKS.EMBEDDED_ENTRY] = 'Entry', _entityTypes[Contentful.BLOCKS.EMBEDDED_ASSET] = 'Asset', _entityTypes);

function getWithEmbeddedEntityEvents(nodeType, sdk) {
  return function (editor, _ref) {
    var hotkey = _ref.options.hotkey;
    return function (event) {
      var _getNodeEntryFromSele = getNodeEntryFromSelection(editor, nodeType),
          pathToSelectedElement = _getNodeEntryFromSele[1];

      if (pathToSelectedElement) {
        var isDelete = event.key === 'Delete';
        var isBackspace = event.key === 'Backspace';

        if (isDelete || isBackspace) {
          event.preventDefault();
          removeNodes(editor, {
            at: pathToSelectedElement
          });
        }

        return;
      }

      if (hotkey && isHotkey(hotkey, event)) {
        selectEntityAndInsert(nodeType, sdk, editor, editor.tracking.onShortcutAction);
      }
    };
  };
}

var createEmbeddedEntityPlugin = function createEmbeddedEntityPlugin(nodeType, hotkey) {
  return function (sdk) {
    return {
      key: nodeType,
      type: nodeType,
      isElement: true,
      isVoid: true,
      component: withLinkTracking(LinkedEntityBlock),
      options: {
        hotkey: hotkey
      },
      handlers: {
        onKeyDown: getWithEmbeddedEntityEvents(nodeType, sdk)
      },
      deserializeHtml: {
        rules: [{
          validAttribute: {
            'data-entity-type': entityTypes[nodeType]
          }
        }],
        withoutChildren: true,
        getNode: function getNode(el) {
          return {
            type: nodeType,
            children: [{
              text: ''
            }],
            isVoid: true,
            data: {
              target: {
                sys: {
                  id: el.getAttribute('data-entity-id'),
                  linkType: el.getAttribute('data-entity-type'),
                  type: 'Link'
                }
              }
            }
          };
        }
      }
    };
  };
};

var createEmbeddedEntryBlockPlugin = /*#__PURE__*/createEmbeddedEntityPlugin(Contentful.BLOCKS.EMBEDDED_ENTRY, 'mod+shift+e');
var createEmbeddedAssetBlockPlugin = /*#__PURE__*/createEmbeddedEntityPlugin(Contentful.BLOCKS.EMBEDDED_ASSET, 'mod+shift+a');

var getEntryTitle = fieldEditorShared.entityHelpers.getEntryTitle,
    getEntryStatus = fieldEditorShared.entityHelpers.getEntryStatus;
var styles$3 = {
  scheduledIcon: /*#__PURE__*/emotion.css({
    verticalAlign: 'text-bottom',
    marginRight: tokens.spacing2Xs
  })
};
function FetchingWrappedInlineEntryCard(props) {
  var _useEntity = fieldEditorReference.useEntity('Entry', props.entryId),
      entry = _useEntity.data,
      requestStatus = _useEntity.status;

  var _useEntityLoader = fieldEditorReference.useEntityLoader(),
      getEntityScheduledActions = _useEntityLoader.getEntityScheduledActions;

  var loadEntityScheduledActions = function loadEntityScheduledActions() {
    return getEntityScheduledActions('Entry', props.entryId);
  };

  var allContentTypes = props.sdk.space.getCachedContentTypes();
  var onEntityFetchComplete = props.onEntityFetchComplete;
  var contentType = React__default.useMemo(function () {
    if (!entry || !allContentTypes) return undefined;
    return allContentTypes.find(function (contentType) {
      return contentType.sys.id === entry.sys.contentType.sys.id;
    });
  }, [allContentTypes, entry]);
  React__default.useEffect(function () {
    if (requestStatus !== 'success') {
      return;
    }

    onEntityFetchComplete == null ? void 0 : onEntityFetchComplete();
  }, [requestStatus, onEntityFetchComplete]);
  var contentTypeName = contentType ? contentType.name : '';
  var title = React__default.useMemo(function () {
    return getEntryTitle({
      entry: entry,
      contentType: contentType,
      localeCode: props.sdk.field.locale,
      defaultLocaleCode: props.sdk.locales["default"],
      defaultTitle: 'Untitled'
    });
  }, [entry, contentType, props.sdk.field.locale, props.sdk.locales["default"]]);

  if (requestStatus === 'error') {
    return /*#__PURE__*/React__default.createElement(f36Components.InlineEntryCard, {
      title: "Entry missing or inaccessible",
      testId: Contentful.INLINES.EMBEDDED_ENTRY,
      isSelected: props.isSelected
    });
  }

  if (requestStatus === 'loading') {
    return /*#__PURE__*/React__default.createElement(f36Components.InlineEntryCard, {
      isLoading: true
    });
  }

  var entryStatus = getEntryStatus(entry.sys);

  if (entryStatus === 'deleted') {
    return /*#__PURE__*/React__default.createElement(f36Components.InlineEntryCard, {
      title: "Entry missing or inaccessible",
      testId: Contentful.INLINES.EMBEDDED_ENTRY,
      isSelected: props.isSelected,
      actions: [/*#__PURE__*/React__default.createElement(f36Components.MenuItem, {
        key: "remove",
        onClick: props.onRemove,
        testId: "delete"
      }, "Remove")]
    });
  }

  return /*#__PURE__*/React__default.createElement(f36Components.InlineEntryCard, {
    testId: Contentful.INLINES.EMBEDDED_ENTRY,
    isSelected: props.isSelected,
    title: contentTypeName + ": " + title,
    status: entryStatus,
    actions: [/*#__PURE__*/React__default.createElement(f36Components.MenuItem, {
      key: "edit",
      onClick: props.onEdit
    }, "Edit"), /*#__PURE__*/React__default.createElement(f36Components.MenuItem, {
      key: "remove",
      onClick: props.onRemove,
      disabled: props.isDisabled,
      testId: "delete"
    }, "Remove")]
  }, /*#__PURE__*/React__default.createElement(fieldEditorReference.ScheduledIconWithTooltip, {
    getEntityScheduledActions: loadEntityScheduledActions,
    entityType: "Entry",
    entityId: entry.sys.id
  }, /*#__PURE__*/React__default.createElement(f36Icons.ClockIcon, {
    className: styles$3.scheduledIcon,
    variant: "muted",
    testId: "scheduled-icon"
  })), /*#__PURE__*/React__default.createElement(f36Components.Text, null, title));
}

function createInlineEntryNode$1(id) {
  return {
    type: Contentful.INLINES.EMBEDDED_ENTRY,
    children: [{
      text: ''
    }],
    data: {
      target: {
        sys: {
          id: id,
          type: 'Link',
          linkType: 'Entry'
        }
      }
    }
  };
}

var styles$4 = {
  icon: /*#__PURE__*/emotion.css({
    marginRight: '10px'
  }),
  root: /*#__PURE__*/emotion.css({
    display: 'inline-block',
    margin: "0 " + tokens.spacing2Xs,
    fontSize: 'inherit',
    span: {
      userSelect: 'none'
    }
  })
};

function EmbeddedEntityInline(props) {
  var editor = useContentfulEditor();
  var sdk = useSdkContext();
  var isSelected = Slate.useSelected();
  var entryId = props.element.data.target.sys.id;
  var isDisabled = Slate.useReadOnly();

  function handleEditClick() {
    return sdk.navigator.openEntry(entryId, {
      slideIn: true
    });
  }

  function handleRemoveClick() {
    if (!editor) return;
    var pathToElement = findNodePath(editor, props.element);
    removeNodes(editor, {
      at: pathToElement
    });
  }

  return /*#__PURE__*/React.createElement("span", _extends({}, props.attributes, {
    className: styles$4.root,
    "data-embedded-entity-inline-id": entryId,
    // COMPAT: This makes copy & paste work for Firefox
    contentEditable: IS_CHROME ? undefined : false,
    draggable: IS_CHROME ? true : undefined
  }), /*#__PURE__*/React.createElement("span", {
    // COMPAT: This makes copy & paste work for Chromium/Blink browsers and Safari
    contentEditable: IS_CHROME ? false : undefined,
    draggable: IS_CHROME ? true : undefined
  }, /*#__PURE__*/React.createElement(FetchingWrappedInlineEntryCard, {
    sdk: sdk,
    entryId: entryId,
    isSelected: isSelected,
    isDisabled: isDisabled,
    onRemove: handleRemoveClick,
    onEdit: handleEditClick,
    onEntityFetchComplete: props.onEntityFetchComplete
  })), props.children);
}

function selectEntityAndInsert$1(_x, _x2, _x3) {
  return _selectEntityAndInsert$1.apply(this, arguments);
}

function _selectEntityAndInsert$1() {
  _selectEntityAndInsert$1 = _asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee2(editor, sdk, logAction) {
    var config, selection, entry, inlineEntryNode;
    return runtime_1.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            logAction('openCreateEmbedDialog', {
              nodeType: Contentful.INLINES.EMBEDDED_ENTRY
            });
            config = _extends({}, newEntitySelectorConfigFromRichTextField(sdk.field, Contentful.INLINES.EMBEDDED_ENTRY), {
              withCreate: true
            });
            selection = editor.selection;
            _context2.next = 5;
            return sdk.dialogs.selectSingleEntry(config);

          case 5:
            entry = _context2.sent;
            focus(editor); // Dialog steals focus from editor, return it.

            if (entry) {
              _context2.next = 10;
              break;
            }

            logAction('cancelCreateEmbedDialog', {
              nodeType: Contentful.INLINES.EMBEDDED_ENTRY
            });
            return _context2.abrupt("return");

          case 10:
            inlineEntryNode = createInlineEntryNode$1(entry.sys.id);
            logAction('insert', {
              nodeType: Contentful.INLINES.EMBEDDED_ENTRY
            }); // Got to wait until focus is really back on the editor or setSelection() won't work.

            return _context2.abrupt("return", new Promise(function (resolve) {
              setTimeout(function () {
                setSelection(editor, selection);
                insertNodes(editor, inlineEntryNode);
                resolve();
              }, 0);
            }));

          case 13:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));
  return _selectEntityAndInsert$1.apply(this, arguments);
}

function ToolbarEmbeddedEntityInlineButton(props) {
  var editor = useContentfulEditor();
  var sdk = useSdkContext();

  function handleClick(_x4) {
    return _handleClick.apply(this, arguments);
  }

  function _handleClick() {
    _handleClick = _asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee(event) {
      return runtime_1.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              event.preventDefault();

              if (editor) {
                _context.next = 3;
                break;
              }

              return _context.abrupt("return");

            case 3:
              props.onClose();
              _context.next = 6;
              return selectEntityAndInsert$1(editor, sdk, editor.tracking.onToolbarAction);

            case 6:
              moveToTheNextChar(editor);

            case 7:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));
    return _handleClick.apply(this, arguments);
  }

  return /*#__PURE__*/React.createElement(f36Components.Menu.Item, {
    disabled: props.isDisabled,
    className: "rich-text__entry-link-block-button",
    testId: "toolbar-toggle-" + Contentful.INLINES.EMBEDDED_ENTRY,
    onClick: handleClick
  }, /*#__PURE__*/React.createElement(f36Components.Flex, {
    alignItems: "center",
    flexDirection: "row"
  }, /*#__PURE__*/React.createElement(f36Icons.EmbeddedEntryInlineIcon, {
    variant: "secondary",
    className: "rich-text__embedded-entry-list-icon " + styles$4.icon
  }), /*#__PURE__*/React.createElement("span", null, "Inline entry")));
}
function createEmbeddedEntityInlinePlugin(sdk) {
  var htmlAttributeName = 'data-embedded-entity-inline-id';
  return {
    key: Contentful.INLINES.EMBEDDED_ENTRY,
    type: Contentful.INLINES.EMBEDDED_ENTRY,
    isElement: true,
    isInline: true,
    isVoid: true,
    component: withLinkTracking(EmbeddedEntityInline),
    options: {
      hotkey: 'mod+shift+2'
    },
    handlers: {
      onKeyDown: getWithEmbeddedEntryInlineEvents(sdk)
    },
    deserializeHtml: {
      rules: [{
        validAttribute: htmlAttributeName
      }],
      withoutChildren: true,
      getNode: function getNode(el) {
        return createInlineEntryNode$1(el.getAttribute(htmlAttributeName));
      }
    }
  };
}

function getWithEmbeddedEntryInlineEvents(sdk) {
  return function withEmbeddedEntryInlineEvents(editor, _ref) {
    var hotkey = _ref.options.hotkey;
    return function handleEvent(event) {
      if (!editor) return;

      if (hotkey && isHotkey(hotkey, event)) {
        selectEntityAndInsert$1(editor, sdk, editor.tracking.onShortcutAction);
      }
    };
  };
}

var _templateObject, _templateObject2, _templateObject3, _templateObject4, _templateObject5, _templateObject6, _templateObject7, _templateObject8, _dropdown, _LABELS;
var styles$5 = {
  dropdown: (_dropdown = {
    root: /*#__PURE__*/emotion.css(_templateObject || (_templateObject = /*#__PURE__*/_taggedTemplateLiteralLoose(["\n      font-weight: ", ";\n    "])), tokens.fontWeightDemiBold)
  }, _dropdown[Contentful.BLOCKS.PARAGRAPH] = /*#__PURE__*/emotion.css(_templateObject2 || (_templateObject2 = /*#__PURE__*/_taggedTemplateLiteralLoose(["\n      font-size: ", ";\n    "])), tokens.fontSizeL), _dropdown[Contentful.BLOCKS.HEADING_1] = /*#__PURE__*/emotion.css(_templateObject3 || (_templateObject3 = /*#__PURE__*/_taggedTemplateLiteralLoose(["\n      font-size: 1.625rem;\n    "]))), _dropdown[Contentful.BLOCKS.HEADING_2] = /*#__PURE__*/emotion.css(_templateObject4 || (_templateObject4 = /*#__PURE__*/_taggedTemplateLiteralLoose(["\n      font-size: 1.4375rem;\n    "]))), _dropdown[Contentful.BLOCKS.HEADING_3] = /*#__PURE__*/emotion.css(_templateObject5 || (_templateObject5 = /*#__PURE__*/_taggedTemplateLiteralLoose(["\n      font-size: 1.25rem;\n    "]))), _dropdown[Contentful.BLOCKS.HEADING_4] = /*#__PURE__*/emotion.css(_templateObject6 || (_templateObject6 = /*#__PURE__*/_taggedTemplateLiteralLoose(["\n      font-size: 1.125rem;\n    "]))), _dropdown[Contentful.BLOCKS.HEADING_5] = /*#__PURE__*/emotion.css(_templateObject7 || (_templateObject7 = /*#__PURE__*/_taggedTemplateLiteralLoose(["\n      font-size: 1rem;\n    "]))), _dropdown[Contentful.BLOCKS.HEADING_6] = /*#__PURE__*/emotion.css(_templateObject8 || (_templateObject8 = /*#__PURE__*/_taggedTemplateLiteralLoose(["\n      font-size: 0.875rem;\n    "]))), _dropdown)
};
var LABELS = (_LABELS = {}, _LABELS[Contentful.BLOCKS.PARAGRAPH] = 'Normal text', _LABELS[Contentful.BLOCKS.HEADING_1] = 'Heading 1', _LABELS[Contentful.BLOCKS.HEADING_2] = 'Heading 2', _LABELS[Contentful.BLOCKS.HEADING_3] = 'Heading 3', _LABELS[Contentful.BLOCKS.HEADING_4] = 'Heading 4', _LABELS[Contentful.BLOCKS.HEADING_5] = 'Heading 5', _LABELS[Contentful.BLOCKS.HEADING_6] = 'Heading 6', _LABELS);
function ToolbarHeadingButton(props) {
  var sdk = useSdkContext();
  var editor = useContentfulEditor();

  var _React$useState = React.useState(false),
      isOpen = _React$useState[0],
      setOpen = _React$useState[1];

  var _React$useState2 = React.useState(Contentful.BLOCKS.PARAGRAPH),
      selected = _React$useState2[0],
      setSelected = _React$useState2[1];

  React.useEffect(function () {
    if (!(editor != null && editor.selection)) return;

    var _getElementFromCurren = getElementFromCurrentSelection(editor),
        element = _getElementFromCurren[0];

    var type = element.type;
    setSelected(LABELS[type] ? type : Contentful.BLOCKS.PARAGRAPH);
  }, [editor == null ? void 0 : editor.operations, editor == null ? void 0 : editor.selection]); // eslint-disable-line -- TODO: explain this disable

  var _React$useMemo = React.useMemo(function () {
    var nodeTypesByEnablement = Object.fromEntries(Object.keys(LABELS).map(function (nodeType) {
      return [nodeType, isNodeTypeEnabled(sdk.field, nodeType)];
    }));
    var someHeadingsEnabled = Object.values(nodeTypesByEnablement).filter(Boolean).length > 0;
    return [nodeTypesByEnablement, someHeadingsEnabled];
  }, [sdk.field]),
      nodeTypesByEnablement = _React$useMemo[0],
      someHeadingsEnabled = _React$useMemo[1];

  function handleOnSelectItem(type) {
    return function (event) {
      event.preventDefault();
      if (!(editor != null && editor.selection)) return;
      setSelected(type);
      setOpen(false);
      var prevOnChange = editor.onChange;
      /*
       The focus might happen at point in time when
       `toggleElement` (helper for toggleNodeType) changes aren't rendered yet, causing the browser
       to place the cursor at the start of the text.
       We wait for the change event before focusing
       the editor again. This ensures the cursor is back at the previous
       position.*/

      editor.onChange = function () {
        focus(editor);
        editor.onChange = prevOnChange;
        prevOnChange.apply(void 0, arguments);
      };

      var isActive = isBlockSelected(editor, type);
      editor.tracking.onToolbarAction(isActive ? 'remove' : 'insert', {
        nodeType: type
      });
      toggleElement(editor, {
        activeType: type,
        inactiveType: type
      });
    };
  }

  if (!editor) return null;
  return /*#__PURE__*/React.createElement(f36Components.Menu, {
    isOpen: isOpen,
    onClose: function onClose() {
      return setOpen(false);
    }
  }, /*#__PURE__*/React.createElement(f36Components.Menu.Trigger, null, /*#__PURE__*/React.createElement(f36Components.Button, {
    size: "small",
    testId: "toolbar-heading-toggle",
    variant: "transparent",
    endIcon: /*#__PURE__*/React.createElement(f36Icons.ChevronDownIcon, null),
    isDisabled: props.isDisabled,
    onClick: function onClick() {
      return someHeadingsEnabled && setOpen(!isOpen);
    }
  }, LABELS[selected])), /*#__PURE__*/React.createElement(f36Components.Menu.List, {
    testId: "dropdown-heading-list"
  }, ' ', Object.keys(LABELS).map(function (nodeType) {
    return nodeTypesByEnablement[nodeType] && /*#__PURE__*/React.createElement(f36Components.Menu.Item, {
      key: nodeType,
      isInitiallyFocused: selected === nodeType,
      onClick: handleOnSelectItem(nodeType),
      testId: "dropdown-option-" + nodeType,
      disabled: props.isDisabled
    }, /*#__PURE__*/React.createElement("span", {
      className: emotion.cx(styles$5.dropdown.root, styles$5.dropdown[nodeType])
    }, LABELS[nodeType]));
  }).filter(Boolean)));
}

function extractNodes(editor, path, match) {
  return Array.from(getNodeEntries(editor, {
    match: match,
    at: path,
    mode: 'lowest'
  })).map(function (_ref) {
    var node = _ref[0];
    return node;
  });
}
/**
 * It filters out all paragraphs and headings from a path and convert them into paragraphs.
 */


function extractParagraphs(editor, path) {
  return extractNodes(editor, path, {
    type: Contentful.TEXT_CONTAINERS
  }).map(function (node) {
    return _extends({}, node, {
      type: Contentful.BLOCKS.PARAGRAPH
    });
  });
}

var transformRemove = function transformRemove(editor, _ref) {
  var path = _ref[1];
  removeNodes(editor, {
    at: path
  });
};
var transformParagraphs = function transformParagraphs(editor, entry) {
  var path = entry[1];
  var nodes = extractParagraphs(editor, path);
  transformRemove(editor, entry);
  insertNodes(editor, nodes, {
    at: path
  });
};
var transformUnwrap = function transformUnwrap(editor, _ref2) {
  var path = _ref2[1];
  unwrapNodes(editor, {
    at: path
  });
};
var transformWrapIn = function transformWrapIn(type) {
  return function (editor, _ref3) {
    var path = _ref3[1];
    wrapNodes(editor, {
      type: type,
      data: {},
      children: []
    }, {
      at: path
    });
  };
};
var transformLift = function transformLift(editor, _ref4) {
  var path = _ref4[1];
  liftNodes(editor, {
    at: path
  });
};

var _templateObject$1, _templateObject2$1, _templateObject3$1, _templateObject4$1, _templateObject5$1, _templateObject6$1, _templateObject7$1, _templateObject8$1, _dropdown$1, _templateObject9, _templateObject10, _templateObject11, _templateObject12, _templateObject13, _templateObject14, _templateObject15, _headings, _HeadingComponents;
var styles$6 = {
  dropdown: (_dropdown$1 = {
    root: /*#__PURE__*/emotion.css(_templateObject$1 || (_templateObject$1 = /*#__PURE__*/_taggedTemplateLiteralLoose(["\n      font-weight: ", ";\n    "])), tokens.fontWeightDemiBold)
  }, _dropdown$1[Contentful.BLOCKS.PARAGRAPH] = /*#__PURE__*/emotion.css(_templateObject2$1 || (_templateObject2$1 = /*#__PURE__*/_taggedTemplateLiteralLoose(["\n      font-size: ", ";\n    "])), tokens.fontSizeL), _dropdown$1[Contentful.BLOCKS.HEADING_1] = /*#__PURE__*/emotion.css(_templateObject3$1 || (_templateObject3$1 = /*#__PURE__*/_taggedTemplateLiteralLoose(["\n      font-size: 1.625rem;\n    "]))), _dropdown$1[Contentful.BLOCKS.HEADING_2] = /*#__PURE__*/emotion.css(_templateObject4$1 || (_templateObject4$1 = /*#__PURE__*/_taggedTemplateLiteralLoose(["\n      font-size: 1.4375rem;\n    "]))), _dropdown$1[Contentful.BLOCKS.HEADING_3] = /*#__PURE__*/emotion.css(_templateObject5$1 || (_templateObject5$1 = /*#__PURE__*/_taggedTemplateLiteralLoose(["\n      font-size: 1.25rem;\n    "]))), _dropdown$1[Contentful.BLOCKS.HEADING_4] = /*#__PURE__*/emotion.css(_templateObject6$1 || (_templateObject6$1 = /*#__PURE__*/_taggedTemplateLiteralLoose(["\n      font-size: 1.125rem;\n    "]))), _dropdown$1[Contentful.BLOCKS.HEADING_5] = /*#__PURE__*/emotion.css(_templateObject7$1 || (_templateObject7$1 = /*#__PURE__*/_taggedTemplateLiteralLoose(["\n      font-size: 1rem;\n    "]))), _dropdown$1[Contentful.BLOCKS.HEADING_6] = /*#__PURE__*/emotion.css(_templateObject8$1 || (_templateObject8$1 = /*#__PURE__*/_taggedTemplateLiteralLoose(["\n      font-size: 0.875rem;\n    "]))), _dropdown$1),
  headings: (_headings = {
    root: /*#__PURE__*/emotion.css(_templateObject9 || (_templateObject9 = /*#__PURE__*/_taggedTemplateLiteralLoose(["\n      font-weight: ", ";\n      line-height: 1.3;\n      margin: 0 0 ", ";\n    "])), tokens.fontWeightMedium, tokens.spacingS)
  }, _headings[Contentful.BLOCKS.HEADING_1] = /*#__PURE__*/emotion.css(_templateObject10 || (_templateObject10 = /*#__PURE__*/_taggedTemplateLiteralLoose(["\n      font-size: 1.875rem;\n    "]))), _headings[Contentful.BLOCKS.HEADING_2] = /*#__PURE__*/emotion.css(_templateObject11 || (_templateObject11 = /*#__PURE__*/_taggedTemplateLiteralLoose(["\n      font-size: 1.5625rem;\n    "]))), _headings[Contentful.BLOCKS.HEADING_3] = /*#__PURE__*/emotion.css(_templateObject12 || (_templateObject12 = /*#__PURE__*/_taggedTemplateLiteralLoose(["\n      font-size: 1.375rem;\n    "]))), _headings[Contentful.BLOCKS.HEADING_4] = /*#__PURE__*/emotion.css(_templateObject13 || (_templateObject13 = /*#__PURE__*/_taggedTemplateLiteralLoose(["\n      font-size: 1.25rem;\n    "]))), _headings[Contentful.BLOCKS.HEADING_5] = /*#__PURE__*/emotion.css(_templateObject14 || (_templateObject14 = /*#__PURE__*/_taggedTemplateLiteralLoose(["\n      font-size: 1.125rem;\n    "]))), _headings[Contentful.BLOCKS.HEADING_6] = /*#__PURE__*/emotion.css(_templateObject15 || (_templateObject15 = /*#__PURE__*/_taggedTemplateLiteralLoose(["\n      font-size: 1rem;\n    "]))), _headings)
}; // eslint-disable-next-line @typescript-eslint/no-explicit-any -- TODO: explain this disable

function createHeading(Tag, block) {
  return function Heading(props) {
    return /*#__PURE__*/React.createElement(Tag, _extends({}, props.attributes, {
      className: emotion.cx(styles$6.headings.root, styles$6.headings[block])
    }), props.children);
  };
}

var HeadingComponents = (_HeadingComponents = {}, _HeadingComponents[Contentful.BLOCKS.HEADING_1] = /*#__PURE__*/React.memo( /*#__PURE__*/createHeading('h1', Contentful.BLOCKS.HEADING_1)), _HeadingComponents[Contentful.BLOCKS.HEADING_2] = /*#__PURE__*/React.memo( /*#__PURE__*/createHeading('h2', Contentful.BLOCKS.HEADING_2)), _HeadingComponents[Contentful.BLOCKS.HEADING_3] = /*#__PURE__*/React.memo( /*#__PURE__*/createHeading('h3', Contentful.BLOCKS.HEADING_3)), _HeadingComponents[Contentful.BLOCKS.HEADING_4] = /*#__PURE__*/React.memo( /*#__PURE__*/createHeading('h4', Contentful.BLOCKS.HEADING_4)), _HeadingComponents[Contentful.BLOCKS.HEADING_5] = /*#__PURE__*/React.memo( /*#__PURE__*/createHeading('h5', Contentful.BLOCKS.HEADING_5)), _HeadingComponents[Contentful.BLOCKS.HEADING_6] = /*#__PURE__*/React.memo( /*#__PURE__*/createHeading('h6', Contentful.BLOCKS.HEADING_6)), _HeadingComponents);

var buildHeadingEventHandler = function buildHeadingEventHandler(type) {
  return function (editor, _ref) {
    var hotkey = _ref.options.hotkey;
    return function (event) {
      if (editor.selection && hotkey && isHotkey(hotkey, event)) {
        var isActive = isBlockSelected(editor, type);
        editor.tracking.onShortcutAction(isActive ? 'remove' : 'insert', {
          nodeType: type
        });
        toggleElement(editor, {
          activeType: type,
          inactiveType: Contentful.BLOCKS.PARAGRAPH
        });
      }
    };
  };
};

var createHeadingPlugin = function createHeadingPlugin() {
  var _transform;

  return {
    key: 'HeadingPlugin',
    softBreak: [// create a new line with SHIFT+Enter inside a heading
    {
      hotkey: 'shift+enter',
      query: {
        allow: Contentful.HEADINGS
      }
    }],
    normalizer: [{
      match: {
        type: Contentful.HEADINGS
      },
      validChildren: function validChildren(_, _ref2) {
        var node = _ref2[0];
        return isInlineOrText(node);
      },
      transform: (_transform = {}, _transform[Contentful.BLOCKS.PARAGRAPH] = transformUnwrap, _transform["default"] = transformLift, _transform)
    }],
    then: function then(editor) {
      return {
        exitBreak: [// Pressing ENTER at the start or end of a heading text inserts a
        // normal paragraph.
        {
          hotkey: 'enter',
          query: {
            allow: Contentful.HEADINGS,
            end: true,
            start: true,
            // Exclude headings inside lists as it interferes with the list's
            // insertBreak implementation
            filter: function filter(_ref3) {
              var path = _ref3[1];
              return !getAboveNode(editor, {
                at: path,
                match: {
                  type: Contentful.BLOCKS.LIST_ITEM
                }
              }) && !isMarkActive(editor, COMMAND_PROMPT);
            }
          }
        }]
      };
    },
    plugins: Contentful.HEADINGS.map(function (nodeType, idx) {
      var level = idx + 1;
      var tagName = "h" + level;
      return {
        key: nodeType,
        type: nodeType,
        isElement: true,
        component: HeadingComponents[nodeType],
        options: {
          hotkey: ["mod+alt+" + level]
        },
        handlers: {
          onKeyDown: buildHeadingEventHandler(nodeType)
        },
        deserializeHtml: {
          rules: [{
            validNodeName: tagName.toUpperCase()
          }]
        }
      };
    })
  };
};

var styles$7 = {
  button: /*#__PURE__*/emotion.css({
    height: '30px',
    width: '30px',
    marginLeft: tokens.spacing2Xs,
    marginRight: tokens.spacing2Xs
  }),
  tooltip: /*#__PURE__*/emotion.css({
    zIndex: /*#__PURE__*/Number(tokens.zIndexTooltip)
  })
};
function ToolbarButton(props) {
  var title = props.title,
      testId = props.testId,
      isActive = props.isActive,
      children = props.children,
      className = props.className,
      _props$isDisabled = props.isDisabled,
      isDisabled = _props$isDisabled === void 0 ? false : _props$isDisabled;

  var handleClick = function handleClick(event) {
    event.preventDefault();
    props.onClick();
  };

  var button = /*#__PURE__*/React__default.createElement(f36Components.Button, {
    className: emotion.cx(styles$7.button, className),
    isDisabled: isDisabled,
    startIcon: children,
    onClick: handleClick,
    testId: testId,
    variant: isActive ? 'secondary' : 'transparent',
    size: "small"
  });

  if (title) {
    return /*#__PURE__*/React__default.createElement(f36Components.Tooltip, {
      className: styles$7.tooltip,
      placement: "bottom",
      content: title
    }, button);
  }

  return button;
}

var _templateObject$2, _templateObject2$2, _templateObject3$2;
var styles$8 = {
  container: /*#__PURE__*/emotion.css(_templateObject$2 || (_templateObject$2 = /*#__PURE__*/_taggedTemplateLiteralLoose(["\n    margin: 0 0 ", ";\n  "])), tokens.spacingL),
  hr: /*#__PURE__*/emotion.css(_templateObject2$2 || (_templateObject2$2 = /*#__PURE__*/_taggedTemplateLiteralLoose(["\n    margin: 0;\n    height: ", ";\n    background: transparent;\n    position: relative;\n    border: 0;\n    user-select: none;\n    &:hover {\n      cursor: pointer;\n    }\n    &::after {\n      content: '';\n      position: absolute;\n      width: 100%;\n      height: 1px;\n      background: ", ";\n      top: 50%;\n    }\n  "])), tokens.spacingM, tokens.gray300),
  hrSelected: /*#__PURE__*/emotion.css(_templateObject3$2 || (_templateObject3$2 = /*#__PURE__*/_taggedTemplateLiteralLoose(["\n    &::after {\n      background: ", ";\n      -webkit-box-shadow: 0px 0px 5px ", ";\n      box-shadow: 0px 0px 5px ", ";\n    }\n  "])), tokens.colorPrimary, tokens.colorPrimary, tokens.colorPrimary)
};
function withHrEvents(editor) {
  return function (event) {
    if (!editor) return;

    var _getNodeEntryFromSele = getNodeEntryFromSelection(editor, Contentful.BLOCKS.HR),
        pathToSelectedHr = _getNodeEntryFromSele[1];

    if (pathToSelectedHr) {
      var isBackspace = event.key === 'Backspace';
      var isDelete = event.key === 'Delete';

      if (isBackspace || isDelete) {
        event.preventDefault();
        removeNodes(editor, {
          at: pathToSelectedHr
        });
      }
    }
  };
}
function ToolbarHrButton(props) {
  var editor = useContentfulEditor();

  function handleOnClick() {
    if (!(editor != null && editor.selection)) return;
    var hr = {
      type: Contentful.BLOCKS.HR,
      data: {},
      children: [{
        text: ''
      }],
      isVoid: true
    };
    var hasText = !!getText(editor, editor.selection.focus.path);
    hasText ? insertNodes(editor, hr) : setNodes(editor, hr); // Move focus to the next paragraph (added by TrailingParagraph plugin)

    moveToTheNextLine(editor);
    focus(editor);
  }

  if (!editor) return null;
  return /*#__PURE__*/React.createElement(ToolbarButton, {
    title: "HR",
    isDisabled: props.isDisabled,
    onClick: handleOnClick,
    testId: "hr-toolbar-button",
    isActive: isBlockSelected(editor, Contentful.BLOCKS.HR)
  }, /*#__PURE__*/React.createElement(f36Icons.HorizontalRuleIcon, null));
}
function Hr(props) {
  var isSelected = Slate.useSelected();
  var isFocused = Slate.useFocused();
  return /*#__PURE__*/React.createElement("div", _extends({}, props.attributes, {
    className: styles$8.container,
    "data-void-element": Contentful.BLOCKS.HR
  }), /*#__PURE__*/React.createElement("div", {
    draggable: true,
    // Moving `contentEditable` to this div makes it to be selectable when being the first void element, e.g pressing ctrl + a to select everything
    contentEditable: false
  }, /*#__PURE__*/React.createElement("hr", {
    className: emotion.cx(styles$8.hr, isSelected && isFocused ? styles$8.hrSelected : undefined)
  })), props.children);
}
var createHrPlugin = function createHrPlugin() {
  return {
    key: Contentful.BLOCKS.HR,
    type: Contentful.BLOCKS.HR,
    isVoid: true,
    isElement: true,
    component: Hr,
    handlers: {
      onKeyDown: withHrEvents
    },
    deserializeHtml: {
      rules: [{
        validNodeName: ['HR']
      }, {
        validAttribute: {
          'data-void-element': Contentful.BLOCKS.HR
        }
      }],
      withoutChildren: true
    }
  };
};

var _templateObject$3, _SYS_LINK_TYPES, _LINK_TYPE_SELECTION_;
var styles$9 = {
  removeSelectionLabel: /*#__PURE__*/emotion.css(_templateObject$3 || (_templateObject$3 = /*#__PURE__*/_taggedTemplateLiteralLoose(["\n    margin-left: ", ";\n  "])), tokens.spacingS)
};
var SYS_LINK_TYPES = (_SYS_LINK_TYPES = {}, _SYS_LINK_TYPES[Contentful.INLINES.ENTRY_HYPERLINK] = 'Entry', _SYS_LINK_TYPES[Contentful.INLINES.ASSET_HYPERLINK] = 'Asset', _SYS_LINK_TYPES);
var LINK_TYPE_SELECTION_VALUES = (_LINK_TYPE_SELECTION_ = {}, _LINK_TYPE_SELECTION_[Contentful.INLINES.HYPERLINK] = 'URL', _LINK_TYPE_SELECTION_[Contentful.INLINES.ENTRY_HYPERLINK] = 'Entry', _LINK_TYPE_SELECTION_[Contentful.INLINES.ASSET_HYPERLINK] = 'Asset', _LINK_TYPE_SELECTION_);
function HyperlinkModal(props) {
  var _props$linkText, _props$linkType, _props$linkTarget, _props$linkEntity;

  var enabledLinkTypes = LINK_TYPES.filter(function (nodeType) {
    return isNodeTypeEnabled(props.sdk.field, nodeType);
  });
  var defaultLinkType = enabledLinkTypes[0];

  var _React$useState = React.useState((_props$linkText = props.linkText) != null ? _props$linkText : ''),
      linkText = _React$useState[0],
      setLinkText = _React$useState[1];

  var _React$useState2 = React.useState((_props$linkType = props.linkType) != null ? _props$linkType : defaultLinkType),
      linkType = _React$useState2[0],
      setLinkType = _React$useState2[1];

  var _React$useState3 = React.useState((_props$linkTarget = props.linkTarget) != null ? _props$linkTarget : ''),
      linkTarget = _React$useState3[0],
      setLinkTarget = _React$useState3[1];

  var _React$useState4 = React.useState((_props$linkEntity = props.linkEntity) != null ? _props$linkEntity : null),
      linkEntity = _React$useState4[0],
      setLinkEntity = _React$useState4[1];

  function isLinkComplete() {
    var isRegularLink = linkType === Contentful.INLINES.HYPERLINK;

    if (isRegularLink) {
      return !!(linkText && linkTarget);
    }

    var entityLinks = Object.keys(SYS_LINK_TYPES);
    var isEntityLink = entityLinks.includes(linkType);

    if (isEntityLink) {
      return !!(linkText && linkEntity);
    }

    return false;
  }

  function handleOnSubmit(event) {
    event.preventDefault();
    props.onClose({
      linkText: linkText,
      linkType: linkType,
      linkTarget: linkTarget,
      linkEntity: linkEntity
    });
  }

  function entityToLink(entity) {
    var _entity$sys = entity.sys,
        id = _entity$sys.id,
        type = _entity$sys.type;
    return {
      sys: {
        id: id,
        type: 'Link',
        linkType: type
      }
    };
  }

  function selectEntry() {
    return _selectEntry.apply(this, arguments);
  }

  function _selectEntry() {
    _selectEntry = _asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee() {
      var options, entry;
      return runtime_1.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              options = {
                locale: props.sdk.field.locale,
                contentTypes: getLinkedContentTypeIdsForNodeType(props.sdk.field, Contentful.INLINES.ENTRY_HYPERLINK)
              };
              _context.next = 3;
              return props.sdk.dialogs.selectSingleEntry(options);

            case 3:
              entry = _context.sent;
              setLinkTarget('');
              setLinkEntity(entityToLink(entry));

            case 6:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));
    return _selectEntry.apply(this, arguments);
  }

  function selectAsset() {
    return _selectAsset.apply(this, arguments);
  }

  function _selectAsset() {
    _selectAsset = _asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee2() {
      var options, asset;
      return runtime_1.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              options = {
                locale: props.sdk.field.locale
              };
              _context2.next = 3;
              return props.sdk.dialogs.selectSingleAsset(options);

            case 3:
              asset = _context2.sent;
              setLinkTarget('');
              setLinkEntity(entityToLink(asset));

            case 6:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    }));
    return _selectAsset.apply(this, arguments);
  }

  function resetLinkEntity(event) {
    event.preventDefault();
    setLinkEntity(null);
  }

  return /*#__PURE__*/React.createElement(fieldEditorReference.EntityProvider, {
    sdk: props.sdk
  }, /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(f36Components.ModalContent, null, /*#__PURE__*/React.createElement(f36Components.Form, null, !props.linkType && /*#__PURE__*/React.createElement(f36Components.FormControl, {
    id: "link-text",
    isRequired: true
  }, /*#__PURE__*/React.createElement(f36Components.FormControl.Label, null, "Link text"), /*#__PURE__*/React.createElement(f36Components.TextInput, {
    testId: "link-text-input",
    name: "link-text",
    value: linkText,
    onChange: function onChange(event) {
      return setLinkText(event.target.value);
    }
  })), enabledLinkTypes.length > 1 && /*#__PURE__*/React.createElement(f36Components.FormControl, {
    id: "link-type"
  }, /*#__PURE__*/React.createElement(f36Components.FormControl.Label, null, "Link type"), /*#__PURE__*/React.createElement(f36Components.Select, {
    value: linkType,
    onChange: function onChange(event) {
      return setLinkType(event.target.value);
    },
    testId: "link-type-input",
    isDisabled: props.readonly
  }, enabledLinkTypes.map(function (nodeType) {
    return /*#__PURE__*/React.createElement(f36Components.Select.Option, {
      key: nodeType,
      value: nodeType
    }, LINK_TYPE_SELECTION_VALUES[nodeType]);
  }))), linkType === Contentful.INLINES.HYPERLINK && /*#__PURE__*/React.createElement(f36Components.FormControl, {
    id: "linkTarget",
    isRequired: true
  }, /*#__PURE__*/React.createElement(f36Components.FormControl.Label, null, "Link target"), /*#__PURE__*/React.createElement(f36Components.TextInput, {
    name: "linkTarget",
    value: linkTarget,
    onChange: function onChange(event) {
      setLinkEntity(null);
      setLinkTarget(event.target.value);
    },
    testId: "link-target-input",
    isDisabled: props.readonly
  }), /*#__PURE__*/React.createElement(f36Components.FormControl.HelpText, null, "A protocol may be required, e.g. https://")), linkType !== Contentful.INLINES.HYPERLINK && /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(f36Components.FormLabel, {
    isRequired: true,
    htmlFor: ""
  }, "Link target", ' '), linkEntity && linkEntity.sys.linkType === SYS_LINK_TYPES[linkType] ? /*#__PURE__*/React.createElement(React.Fragment, null, !props.readonly && /*#__PURE__*/React.createElement(f36Components.TextLink, {
    testId: "entity-selection-link",
    onClick: resetLinkEntity,
    className: styles$9.removeSelectionLabel
  }, "Remove selection"), /*#__PURE__*/React.createElement("div", null, linkType === Contentful.INLINES.ENTRY_HYPERLINK && /*#__PURE__*/React.createElement(FetchingWrappedEntryCard, {
    sdk: props.sdk,
    locale: props.sdk.field.locale,
    entryId: linkEntity.sys.id,
    isDisabled: true,
    isSelected: false
  }), linkType === Contentful.INLINES.ASSET_HYPERLINK && /*#__PURE__*/React.createElement(FetchingWrappedAssetCard, {
    sdk: props.sdk,
    locale: props.sdk.field.locale,
    assetId: linkEntity.sys.id,
    isDisabled: true,
    isSelected: false
  }))) : /*#__PURE__*/React.createElement("div", null, linkType === Contentful.INLINES.ENTRY_HYPERLINK && /*#__PURE__*/React.createElement(f36Components.TextLink, {
    testId: "entity-selection-link",
    onClick: selectEntry
  }, "Select entry"), linkType === Contentful.INLINES.ASSET_HYPERLINK && /*#__PURE__*/React.createElement(f36Components.TextLink, {
    testId: "entity-selection-link",
    onClick: selectAsset
  }, "Select asset"))))), /*#__PURE__*/React.createElement(f36Components.ModalControls, null, /*#__PURE__*/React.createElement(f36Components.Button, {
    type: "button",
    onClick: function onClick() {
      return props.onClose(null);
    },
    variant: "secondary",
    testId: "cancel-cta",
    size: "small"
  }, "Cancel"), /*#__PURE__*/React.createElement(f36Components.Button, {
    type: "submit",
    variant: "positive",
    size: "small",
    isDisabled: props.readonly || !isLinkComplete(),
    onClick: handleOnSubmit,
    testId: "confirm-cta"
  }, props.linkType ? 'Update' : 'Insert'))));
}
function addOrEditLink(_x, _x2, _x3, _x4) {
  return _addOrEditLink.apply(this, arguments);
}

function _addOrEditLink() {
  _addOrEditLink = _asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee3(editor, sdk, logAction, targetPath) {
    var _target$sys$linkType;

    var isReadOnly, selectionBeforeBlur, linkType, linkText, linkTarget, linkEntity, _getNodeEntryFromSele, node, path, selectionAfterFocus, currentLinkText, isEditing, data, text, url, type, target;

    return runtime_1.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            isReadOnly = isEditorReadOnly(editor);
            selectionBeforeBlur = editor.selection ? _extends({}, editor.selection) : undefined;

            if (!(!targetPath && !selectionBeforeBlur)) {
              _context3.next = 4;
              break;
            }

            return _context3.abrupt("return");

          case 4:
            _getNodeEntryFromSele = getNodeEntryFromSelection(editor, LINK_TYPES, targetPath), node = _getNodeEntryFromSele[0], path = _getNodeEntryFromSele[1];

            if (node && path) {
              linkType = node.type;
              linkText = getText(editor, path);
              linkTarget = node.data.uri || '';
              linkEntity = node.data.target;
            }

            selectionAfterFocus = targetPath != null ? targetPath : selectionBeforeBlur;
            currentLinkText = linkText || (editor.selection ? getText(editor, editor.selection) : '');
            isEditing = Boolean(node && path);
            logAction(isEditing ? 'openEditHyperlinkDialog' : 'openCreateHyperlinkDialog');
            _context3.next = 12;
            return fieldEditorShared.ModalDialogLauncher.openDialog({
              title: isEditing ? 'Edit hyperlink' : 'Insert hyperlink',
              width: 'large',
              shouldCloseOnEscapePress: true,
              shouldCloseOnOverlayClick: true,
              allowHeightOverflow: true
            }, function (_ref) {
              var onClose = _ref.onClose;
              return /*#__PURE__*/React.createElement(HyperlinkModal, {
                linkTarget: linkTarget,
                linkText: currentLinkText,
                linkType: linkType,
                linkEntity: linkEntity,
                onClose: onClose,
                sdk: sdk,
                readonly: isReadOnly
              });
            });

          case 12:
            data = _context3.sent;
            select(editor, selectionAfterFocus);

            if (data) {
              _context3.next = 18;
              break;
            }

            focus(editor);
            logAction(isEditing ? 'cancelEditHyperlinkDialog' : 'cancelCreateHyperlinkDialog');
            return _context3.abrupt("return");

          case 18:
            text = data.linkText, url = data.linkTarget, type = data.linkType, target = data.linkEntity;
            withoutNormalizing(editor, function () {
              insertLink(editor, {
                text: text,
                url: url,
                type: type,
                target: target,
                path: path
              });
            });
            logAction(isEditing ? 'edit' : 'insert', {
              nodeType: type,
              linkType: (_target$sys$linkType = target == null ? void 0 : target.sys.linkType) != null ? _target$sys$linkType : 'uri' // we want to keep the same values we've been using for the old editor, which can be `uri`, `Asset` or `Entry`

            });
            focus(editor);

          case 22:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));
  return _addOrEditLink.apply(this, arguments);
}

function ToolbarHyperlinkButton(props) {
  var editor = useContentfulEditor();
  var isActive = !!(editor && isLinkActive(editor));
  var sdk = useSdkContext();

  function handleClick() {
    return _handleClick.apply(this, arguments);
  }

  function _handleClick() {
    _handleClick = _asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee() {
      return runtime_1.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              if (editor) {
                _context.next = 2;
                break;
              }

              return _context.abrupt("return");

            case 2:
              if (isActive) {
                unwrapLink(editor);
                editor.tracking.onToolbarAction('unlinkHyperlinks');
              } else {
                addOrEditLink(editor, sdk, editor.tracking.onToolbarAction);
              }

            case 3:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));
    return _handleClick.apply(this, arguments);
  }

  if (!editor) return null;
  return /*#__PURE__*/React.createElement(ToolbarButton, {
    title: "Hyperlink",
    testId: "hyperlink-toolbar-button",
    onClick: handleClick,
    isActive: isActive,
    isDisabled: props.isDisabled
  }, /*#__PURE__*/React.createElement(f36Icons.LinkIcon, null));
}

var hasText = function hasText(editor, entry) {
  var node = entry[0],
      path = entry[1];
  return !p.isAncestorEmpty(editor, node) && getText(editor, path).trim() !== '';
};

function truncate(str, length) {
  if (typeof str === 'string' && str.length > length) {
    return str && str.substr(0, length + 1) // +1 to look ahead and be replaced below.
    // Get rid of orphan letters but not one letter words (I, a, 2).
    // Try to not have “.” as last character to avoid awkward “....”.
    .replace(/(\s+\S(?=\S)|\s*)\.?.$/, '…');
  }

  return str;
}

function getEntityInfo(data) {
  if (!data) {
    return '';
  }

  var entityTitle = data.entityTitle,
      contentTypeName = data.contentTypeName,
      entityStatus = data.entityStatus,
      jobs = data.jobs;
  var title = truncate(entityTitle, 60) || 'Untitled';
  var scheduledActions = jobs.length > 0 ? fieldEditorReference.getScheduleTooltipContent({
    job: jobs[0],
    jobsCount: jobs.length
  }) : '';
  return (contentTypeName || 'Asset') + " \"" + title + "\", " + entityStatus + " " + scheduledActions;
}

function fetchAllData(_x) {
  return _fetchAllData.apply(this, arguments);
}

function _fetchAllData() {
  _fetchAllData = _asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee(_ref) {
    var sdk, entityId, entityType, localeCode, defaultLocaleCode, contentType, getEntity, entity, contentTypeId, entityTitle, entityDescription, jobs, entityStatus;
    return runtime_1.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            sdk = _ref.sdk, entityId = _ref.entityId, entityType = _ref.entityType, localeCode = _ref.localeCode, defaultLocaleCode = _ref.defaultLocaleCode;
            getEntity = entityType === 'Entry' ? sdk.space.getEntry : sdk.space.getAsset;
            _context.next = 4;
            return getEntity(entityId);

          case 4:
            entity = _context.sent;

            if (entity.sys.contentType) {
              contentTypeId = entity.sys.contentType.sys.id;
              contentType = sdk.space.getCachedContentTypes().find(function (ct) {
                return ct.sys.id === contentTypeId;
              });
            }

            entityTitle = entityType === 'Entry' ? fieldEditorShared.entityHelpers.getEntryTitle({
              entry: entity,
              contentType: contentType,
              localeCode: localeCode,
              defaultLocaleCode: defaultLocaleCode,
              defaultTitle: 'Untitled'
            }) : fieldEditorShared.entityHelpers.getAssetTitle({
              asset: entity,
              localeCode: localeCode,
              defaultLocaleCode: defaultLocaleCode,
              defaultTitle: 'Untitled'
            });
            entityDescription = fieldEditorShared.entityHelpers.getEntityDescription({
              entity: entity,
              contentType: contentType,
              localeCode: localeCode,
              defaultLocaleCode: defaultLocaleCode
            });
            _context.next = 10;
            return sdk.space.getEntityScheduledActions(entityType, entityId);

          case 10:
            jobs = _context.sent;
            entityStatus = fieldEditorShared.entityHelpers.getEntryStatus(entity.sys);
            return _context.abrupt("return", {
              jobs: jobs,
              entity: entity,
              entityTitle: entityTitle,
              entityDescription: entityDescription,
              entityStatus: entityStatus,
              contentTypeName: contentType ? contentType.name : ''
            });

          case 13:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _fetchAllData.apply(this, arguments);
}

function useRequestStatus(_ref2) {
  var sdk = _ref2.sdk,
      target = _ref2.target,
      onEntityFetchComplete = _ref2.onEntityFetchComplete;

  var _useState = React.useState({
    type: 'loading'
  }),
      requestStatus = _useState[0],
      setRequestStatus = _useState[1];

  React.useEffect(function () {
    if (target) {
      var _target$sys, _target$sys2;

      fetchAllData({
        sdk: sdk,
        entityId: target == null ? void 0 : (_target$sys = target.sys) == null ? void 0 : _target$sys.id,
        entityType: target == null ? void 0 : (_target$sys2 = target.sys) == null ? void 0 : _target$sys2.linkType,
        localeCode: sdk.field.locale,
        defaultLocaleCode: sdk.locales["default"]
      }).then(function (entityInfo) {
        setRequestStatus({
          type: 'success',
          data: entityInfo
        });
      })["catch"](function (e) {
        console.log(e);
        setRequestStatus({
          type: 'error',
          error: e
        });
      })["finally"](function () {
        onEntityFetchComplete == null ? void 0 : onEntityFetchComplete();
      });
    }
  }, [sdk, target, onEntityFetchComplete]);
  return requestStatus;
}

function useEntityInfo(props) {
  var status = useRequestStatus(props);
  var linkType = props.target.sys.linkType;

  if (status.type === 'loading') {
    return "Loading " + linkType.toLowerCase() + "...";
  }

  if (status.type === 'error') {
    return linkType + " missing or inaccessible";
  }

  return getEntityInfo(status.data);
}

var styles$a = {
  hyperlinkWrapper: /*#__PURE__*/emotion.css({
    display: 'inline',
    position: 'static',
    a: {
      fontSize: 'inherit !important'
    }
  }),
  hyperlink: /*#__PURE__*/emotion.css({
    fontSize: 'inherit !important',
    display: 'inline !important',
    '&:hover': {
      fill: tokens.gray900
    },
    '&:focus': {
      fill: tokens.gray900
    }
  })
};

function EntityHyperlink(props) {
  var editor = useContentfulEditor();
  var sdk = useSdkContext();
  var target = props.element.data.target;
  var onEntityFetchComplete = props.onEntityFetchComplete;
  var tooltipContent = useEntityInfo({
    target: target,
    sdk: sdk,
    onEntityFetchComplete: onEntityFetchComplete
  });
  if (!target) return null;

  function handleClick(event) {
    event.preventDefault();
    event.stopPropagation();
    if (!editor) return;
    var p = fromDOMPoint(editor, [event.target, 0]);

    if (p) {
      addOrEditLink(editor, sdk, editor.tracking.onViewportAction, p.path);
    }
  }

  return /*#__PURE__*/React.createElement(f36Components.Tooltip, {
    content: tooltipContent,
    targetWrapperClassName: styles$a.hyperlinkWrapper,
    placement: "bottom",
    maxWidth: "auto"
  }, /*#__PURE__*/React.createElement(f36Components.TextLink, {
    as: "a",
    onClick: handleClick,
    className: styles$a.hyperlink,
    "data-link-type": target.sys.linkType,
    "data-link-id": target.sys.id
  }, props.children));
}

function UrlHyperlink(props) {
  var editor = useContentfulEditor();
  var sdk = useSdkContext();
  var uri = props.element.data.uri;

  function handleClick(event) {
    event.preventDefault();
    event.stopPropagation();
    if (!editor) return;
    var p = fromDOMPoint(editor, [event.target, 0], {
      exactMatch: false,
      suppressThrow: false
    });
    addOrEditLink(editor, sdk, editor.tracking.onViewportAction, p == null ? void 0 : p.path);
  }

  return /*#__PURE__*/React.createElement(f36Components.Tooltip, {
    content: uri,
    targetWrapperClassName: styles$a.hyperlinkWrapper,
    placement: "bottom",
    maxWidth: "auto"
  }, /*#__PURE__*/React.createElement(f36Components.TextLink, {
    as: "a",
    href: uri,
    rel: "noopener noreferrer",
    onClick: handleClick,
    className: styles$a.hyperlink
  }, props.children));
}

var isAnchor = function isAnchor(element) {
  return element.nodeName === 'A' && !!element.getAttribute('href') && element.getAttribute('href') !== '#';
};

var isEntryAnchor = function isEntryAnchor(element) {
  return element.nodeName === 'A' && element.getAttribute('data-link-type') === 'Entry';
};

var isAssetAnchor = function isAssetAnchor(element) {
  return element.nodeName === 'A' && element.getAttribute('data-link-type') === 'Asset';
};

var buildHyperlinkEventHandler = function buildHyperlinkEventHandler(sdk) {
  return function (editor, _ref) {
    var hotkey = _ref.options.hotkey;
    return function (event) {
      if (!editor.selection) {
        return;
      }

      if (hotkey && !isHotkey(hotkey, event)) {
        return;
      }

      if (isLinkActive(editor)) {
        unwrapLink(editor);
        editor.tracking.onShortcutAction('unlinkHyperlinks');
      } else {
        addOrEditLink(editor, sdk, editor.tracking.onShortcutAction);
      }
    };
  };
};

var getNodeOfType = function getNodeOfType(type) {
  return function (el, node) {
    return {
      type: type,
      children: node.children,
      data: type === Contentful.INLINES.HYPERLINK ? {
        uri: el.getAttribute('href')
      } : {
        target: {
          sys: {
            id: el.getAttribute('data-link-id'),
            linkType: el.getAttribute('data-link-type'),
            type: 'Link'
          }
        }
      }
    };
  };
};

var createHyperlinkPlugin = function createHyperlinkPlugin(sdk) {
  var common = {
    isElement: true,
    isInline: true
  };
  return {
    key: 'HyperlinkPlugin',
    options: {
      hotkey: 'mod+k'
    },
    handlers: {
      onKeyDown: buildHyperlinkEventHandler(sdk)
    },
    plugins: [// URL Hyperlink
    _extends({}, common, {
      key: Contentful.INLINES.HYPERLINK,
      type: Contentful.INLINES.HYPERLINK,
      component: UrlHyperlink,
      deserializeHtml: {
        rules: [{
          validNodeName: ['A']
        }],
        query: function query(el) {
          return isAnchor(el) && !(isEntryAnchor(el) || isAssetAnchor(el));
        },
        getNode: getNodeOfType(Contentful.INLINES.HYPERLINK)
      }
    }), // Entry Hyperlink
    _extends({}, common, {
      key: Contentful.INLINES.ENTRY_HYPERLINK,
      type: Contentful.INLINES.ENTRY_HYPERLINK,
      component: withLinkTracking(EntityHyperlink),
      deserializeHtml: {
        rules: [{
          validNodeName: ['A']
        }],
        query: function query(el) {
          return isEntryAnchor(el);
        },
        getNode: getNodeOfType(Contentful.INLINES.ENTRY_HYPERLINK)
      }
    }), // Asset Hyperlink
    _extends({}, common, {
      key: Contentful.INLINES.ASSET_HYPERLINK,
      type: Contentful.INLINES.ASSET_HYPERLINK,
      component: withLinkTracking(EntityHyperlink),
      deserializeHtml: {
        rules: [{
          validNodeName: ['A']
        }],
        query: function query(el) {
          return isAssetAnchor(el);
        },
        getNode: getNodeOfType(Contentful.INLINES.ASSET_HYPERLINK)
      }
    })],
    normalizer: [{
      match: {
        type: [Contentful.INLINES.HYPERLINK, Contentful.INLINES.ASSET_HYPERLINK, Contentful.INLINES.ENTRY_HYPERLINK]
      },
      validNode: hasText,
      transform: transformRemove
    }]
  };
};

var _templateObject$4, _templateObject2$3, _templateObject3$3, _styles;
var baseStyle = /*#__PURE__*/emotion.css(_templateObject$4 || (_templateObject$4 = /*#__PURE__*/_taggedTemplateLiteralLoose(["\n  padding: 0;\n  margin: 0 0 1.25rem 1.25rem;\n\n  div:first-child {\n    margin: 0;\n    line-height: ", ";\n  }\n"])), tokens.lineHeightDefault);
var styles$b = (_styles = {}, _styles[Contentful.BLOCKS.UL_LIST] = /*#__PURE__*/emotion.css(_templateObject2$3 || (_templateObject2$3 = /*#__PURE__*/_taggedTemplateLiteralLoose(["\n    list-style-type: disc;\n    ul {\n      list-style-type: circle;\n      ul {\n        list-style-type: square;\n      }\n    }\n  "]))), _styles[Contentful.BLOCKS.OL_LIST] = /*#__PURE__*/emotion.css(_templateObject3$3 || (_templateObject3$3 = /*#__PURE__*/_taggedTemplateLiteralLoose(["\n    list-style-type: decimal;\n    ol {\n      list-style-type: upper-alpha;\n      ol {\n        list-style-type: lower-roman;\n        ol {\n          list-style-type: lower-alpha;\n        }\n      }\n    }\n  "]))), _styles);

function createList(Tag, block) {
  return function List(props) {
    return /*#__PURE__*/React.createElement(Tag, _extends({}, props.attributes, {
      className: emotion.cx(baseStyle, styles$b[block])
    }), props.children);
  };
}

var ListUL = /*#__PURE__*/createList('ul', Contentful.BLOCKS.UL_LIST);
var ListOL = /*#__PURE__*/createList('ol', Contentful.BLOCKS.OL_LIST);

var _templateObject$5;
var style = /*#__PURE__*/emotion.css(_templateObject$5 || (_templateObject$5 = /*#__PURE__*/_taggedTemplateLiteralLoose(["\n  margin: 0;\n  list-style: inherit;\n  margin-top: ", ";\n\n  ol,\n  ul {\n    margin: 0 0 0 ", ";\n  }\n"])), tokens.spacingXs, tokens.spacingL);
function ListItem(props) {
  return /*#__PURE__*/React.createElement("li", _extends({}, props.attributes, {
    className: style
  }), props.children);
}

/**
 * Credit: Modified version of Plate's list plugin
 * See: https://github.com/udecode/plate/blob/main/packages/nodes/list
 */
var moveListItemDown = function moveListItemDown(editor, _ref) {
  var list = _ref.list,
      listItem = _ref.listItem;
  var listNode = list[0];
  var listItemPath = listItem[1];
  var previousListItemPath;

  try {
    previousListItemPath = getPreviousPath(listItemPath);
  } catch (e) {
    return;
  } // Previous sibling is the new parent


  var previousSiblingItem = getNodeEntry(editor, previousListItemPath);

  if (previousSiblingItem) {
    var previousPath = previousSiblingItem[1];
    var subList = Array.from(getNodeChildren(editor, previousPath)).find(function (_ref2) {
      var n = _ref2[0],
          path = _ref2[1];
      return match(n, path, {
        type: plateList.getListTypes(editor)
      });
    });
    var newPath = getNextPath(getLastChildPath(subList != null ? subList : previousSiblingItem));
    withoutNormalizing(editor, function () {
      if (!subList) {
        // Create new sub-list
        wrapNodes(editor, {
          type: listNode.type,
          children: [],
          data: {}
        }, {
          at: listItemPath
        });
      } // Move the current item to the sub-list


      moveNodes(editor, {
        at: listItemPath,
        to: newPath
      });
    });
  }
};

/**
 * Credit: Modified version of Plate's list plugin
 * See: https://github.com/udecode/plate/blob/main/packages/nodes/list
 */
var moveListItems = function moveListItems(editor, _temp) {
  var _editor$selection;

  var _ref = _temp === void 0 ? {} : _temp,
      _ref$increase = _ref.increase,
      increase = _ref$increase === void 0 ? true : _ref$increase,
      _ref$at = _ref.at,
      at = _ref$at === void 0 ? (_editor$selection = editor.selection) != null ? _editor$selection : undefined : _ref$at;

  var _nodes = getNodeEntries(editor, {
    at: at,
    match: {
      type: getPluginType(editor, plateList.ELEMENT_LIC)
    }
  }); // Get the selected lic


  var lics = Array.from(_nodes);
  if (!lics.length) return;
  var highestLicPaths = [];
  var highestLicPathRefs = []; // Filter out the nested lic, we just need to move the highest ones

  lics.forEach(function (lic) {
    var licPath = lic[1];
    var liPath = getParentPath(licPath);
    var isAncestor = highestLicPaths.some(function (path) {
      var highestLiPath = getParentPath(path);
      return isAncestorPath(highestLiPath, liPath);
    });

    if (!isAncestor) {
      highestLicPaths.push(licPath);
      highestLicPathRefs.push(createPathRef(editor, licPath));
    }
  });
  var licPathRefsToMove = increase ? highestLicPathRefs : highestLicPathRefs.reverse();
  withoutNormalizing(editor, function () {
    licPathRefsToMove.forEach(function (licPathRef) {
      var licPath = licPathRef.unref();
      if (!licPath) return;
      var liEntry = plateList.getListItemEntry(editor, {
        at: licPath
      });

      if (!liEntry) {
        return;
      }

      if (increase) {
        moveListItemDown(editor, liEntry);
      } else if (plateList.isListNested(editor, liEntry.list[1])) {
        plateList.moveListItemUp(editor, liEntry);
      }
    });
  });
};

var ELEMENT_DEFAULT = p.ELEMENT_DEFAULT;

/**
 * Credit: Modified version of Plate's list plugin
 * See: https://github.com/udecode/plate/blob/main/packages/nodes/list
 */

function hasUnliftedListItems(editor, at) {
  return getNodeEntries(editor, {
    at: at,
    match: function match(node, path) {
      return isElement(node) && node.type === Contentful.BLOCKS.LIST_ITEM && path.length >= 2;
    }
  }).next().done;
}

var unwrapList = function unwrapList(editor, _temp) {
  var _ref = _temp === void 0 ? {} : _temp,
      at = _ref.at;

  withoutNormalizing(editor, function () {
    do {
      // lift list items to the root level
      liftNodes(editor, {
        at: at,
        match: function match(node) {
          return isElement(node) && node.type === Contentful.BLOCKS.LIST_ITEM;
        },
        mode: 'lowest'
      });
    } while (!hasUnliftedListItems(editor, at)); // finally unwrap all lifted items


    unwrapNodes(editor, {
      at: at,
      match: {
        type: Contentful.BLOCKS.LIST_ITEM
      },
      split: false
    });
  });
};

var listTypes = [Contentful.BLOCKS.UL_LIST, Contentful.BLOCKS.OL_LIST];
var toggleList = function toggleList(editor, _ref) {
  var type = _ref.type;
  return withoutNormalizing(editor, function () {
    if (!editor.selection) {
      return;
    }

    if (isRangeCollapsed(editor.selection) || !isRangeAcrossBlocks(editor)) {
      // selection is collapsed
      var res = plateList.getListItemEntry(editor);

      if (res) {
        var list = res.list;

        if (list[0].type !== type) {
          setNodes(editor, {
            type: type
          }, {
            at: editor.selection,
            match: function match(n) {
              return listTypes.includes(n.type);
            },
            mode: 'lowest'
          });
        } else {
          unwrapList(editor);
        }
      } else {
        var _list = {
          type: type,
          children: [],
          data: {}
        };
        wrapNodes(editor, _list);
        var nodes = [].concat(getNodeEntries(editor, {
          match: {
            type: getPluginType(editor, ELEMENT_DEFAULT)
          }
        }));
        var listItem = {
          type: Contentful.BLOCKS.LIST_ITEM,
          children: [],
          data: {}
        };

        for (var _iterator = _createForOfIteratorHelperLoose(nodes), _step; !(_step = _iterator()).done;) {
          var _step$value = _step.value,
              path = _step$value[1];
          wrapNodes(editor, listItem, {
            at: path
          });
        }
      }
    } else {
      // selection is a range
      var _getRangeEdges = getRangeEdges(editor.selection),
          startPoint = _getRangeEdges[0],
          endPoint = _getRangeEdges[1];

      var commonEntry = getCommonNode(editor, startPoint.path, endPoint.path);

      if (listTypes.includes(commonEntry[0].type) || commonEntry[0].type === Contentful.BLOCKS.LIST_ITEM) {
        var listType = commonEntry[0].type;

        if (commonEntry[0].type === Contentful.BLOCKS.LIST_ITEM) {
          var _getParentNode, _getParentNode$;

          listType = (_getParentNode = getParentNode(editor, commonEntry[1])) == null ? void 0 : (_getParentNode$ = _getParentNode[0]) == null ? void 0 : _getParentNode$.type;
        }

        if (listType !== type) {
          var startList = findNode(editor, {
            at: getRangeStart(editor.selection),
            match: {
              type: listTypes
            },
            mode: 'lowest'
          });
          var endList = findNode(editor, {
            at: getRangeEnd(editor.selection),
            match: {
              type: listTypes
            },
            mode: 'lowest'
          });

          if (!startList || !endList) {
            return;
          }

          var rangeLength = Math.min(startList[1].length, endList[1].length);
          setNodes(editor, {
            type: type
          }, {
            at: editor.selection,
            match: function match(n, path) {
              return listTypes.includes(n.type) && path.length >= rangeLength;
            },
            mode: 'all'
          });
        } else {
          unwrapList(editor);
        }
      } else {
        var rootPathLength = commonEntry[1].length;

        var _nodes = Array.from(getNodeEntries(editor, {
          mode: 'all'
        })).filter(function (_ref2) {
          var path = _ref2[1];
          return path.length === rootPathLength + 1;
        }).reverse();

        _nodes.forEach(function (n) {
          if (listTypes.includes(n[0].type)) {
            setNodes(editor, {
              type: type
            }, {
              at: n[1]
            });
          } else {
            setNodes(editor, {
              type: getPluginType(editor, plateList.ELEMENT_LIC)
            }, {
              at: n[1]
            });
            var _listItem = {
              type: Contentful.BLOCKS.LIST_ITEM,
              children: [],
              data: {}
            };
            wrapNodes(editor, _listItem, {
              at: n[1]
            });
            var _list2 = {
              type: type,
              children: [],
              data: {}
            };
            wrapNodes(editor, _list2, {
              at: n[1]
            });
          }
        });
      }
    }
  });
};

var onKeyDownList = function onKeyDownList(editor, _ref) {
  var type = _ref.type,
      hotkey = _ref.options.hotkey;
  return function (e) {
    if (e.key === 'Tab' && editor.selection) {
      var listSelected = getAboveNode(editor, {
        at: editor.selection,
        match: {
          type: type
        }
      });

      if (listSelected) {
        e.preventDefault();
        moveListItems(editor, {
          increase: !e.shiftKey
        });
        return;
      }
    }

    if (!hotkey) return;
    var hotkeys = castArray(hotkey);

    for (var _iterator = _createForOfIteratorHelperLoose(hotkeys), _step; !(_step = _iterator()).done;) {
      var _hotkey = _step.value;

      if (isHotkey(_hotkey)(e)) {
        toggleList(editor, {
          type: type
        });
      }
    }
  };
};

var isList = function isList(node) {
  return [Contentful.BLOCKS.OL_LIST, Contentful.BLOCKS.UL_LIST].includes(node.type);
};

var hasListAsDirectParent = function hasListAsDirectParent(editor, _ref) {
  var path = _ref[1];

  var _ref2 = getParentNode(editor, path) || [],
      parentNode = _ref2[0];

  return isList(parentNode);
};

var getNearestListAncestor = function getNearestListAncestor(editor, path) {
  return getAboveNode(editor, {
    at: path,
    mode: 'lowest',
    match: isList
  }) || [];
};
/**
 * Places orphaned list items in a list. If there's a list somewhere
 * in the node's ancestors, defaults to that list type, else places
 * the list item in an unordered list.
 */


var normalizeOrphanedListItem = function normalizeOrphanedListItem(editor, _ref3) {
  var path = _ref3[1];

  var _getNearestListAncest = getNearestListAncestor(editor, path),
      parentList = _getNearestListAncest[0];

  var parentListType = parentList == null ? void 0 : parentList.type;
  wrapNodes(editor, {
    type: parentListType || Contentful.BLOCKS.UL_LIST,
    children: [],
    data: {}
  }, {
    at: path
  });
};
var isNonEmptyListItem = function isNonEmptyListItem(_, entry) {
  var listItemChildren = getChildren(entry);
  return listItemChildren.length !== 0;
};
var firstNodeIsNotList = function firstNodeIsNotList(_editor, _ref4) {
  var node = _ref4[0];

  if (node.children.length === 1) {
    var firstNode = node.children[0];
    return !isText(firstNode) && !isList(firstNode);
  }

  return true;
};
var insertParagraphAsChild = function insertParagraphAsChild(editor, _ref5) {
  var path = _ref5[1];
  insertNodes(editor, [{
    type: Contentful.BLOCKS.PARAGRAPH,
    data: {},
    children: [{
      text: ''
    }]
  }], {
    at: path.concat([0])
  });
};
var replaceNodeWithListItems = function replaceNodeWithListItems(editor, entry) {
  var node = entry[0],
      path = entry[1];
  removeNodes(editor, {
    at: path
  });
  insertNodes(editor, node.children[0].children, {
    at: path
  });
};
var isListTypeActive = function isListTypeActive(editor, type) {
  var selection = editor.selection;

  if (!selection) {
    return false;
  }

  if (isRangeExpanded(selection)) {
    var _getRangeEdges = getRangeEdges(selection),
        start = _getRangeEdges[0],
        end = _getRangeEdges[1];

    var node = getCommonNode(editor, start.path, end.path);

    if (node[0].type === type) {
      return true;
    }
  } // Lists can be nested. Here, we take the list type at the lowest level


  var listNode = getBlockAbove(editor, {
    match: {
      type: [Contentful.BLOCKS.OL_LIST, Contentful.BLOCKS.UL_LIST]
    },
    mode: 'lowest'
  });
  return (listNode == null ? void 0 : listNode[0].type) === type;
};

/**
 * Build a new list item node while preserving marks
 */

var emptyListItemNode = function emptyListItemNode(editor, withChildren) {
  if (withChildren === void 0) {
    withChildren = false;
  }

  var children = [];

  if (withChildren) {
    var marks = getMarks(editor) || {};
    children = [{
      type: Contentful.BLOCKS.PARAGRAPH,
      data: {},
      children: [_extends({
        text: ''
      }, marks)]
    }];
  }

  return {
    type: Contentful.BLOCKS.LIST_ITEM,
    data: {},
    children: children
  };
};
/**
 * Insert list item if selection is in li>p.
 */


var insertListItem = function insertListItem(editor) {
  if (!editor.selection) {
    return false;
  } // Naming it paragraph for simplicity but can be a heading as well


  var paragraph = getAboveNode(editor, {
    match: {
      type: Contentful.TEXT_CONTAINERS
    }
  });

  if (!paragraph) {
    return false;
  }

  var paragraphPath = paragraph[1];
  var listItem = getParentNode(editor, paragraphPath);

  if (!listItem) {
    return false;
  }

  var listItemNode = listItem[0],
      listItemPath = listItem[1];

  if (listItemNode.type !== Contentful.BLOCKS.LIST_ITEM) {
    return false;
  } // We are in a li>p (or heading)


  withoutNormalizing(editor, function () {
    if (!editor.selection) {
      return;
    } // Check the cursor position in the current paragraph


    var isAtStart = isSelectionAtBlockStart(editor);
    var isAtEnd = isSelectionAtBlockEnd(editor);
    var isAtStartOfListItem = isAtStart && isFirstChildPath(paragraphPath);
    var shouldSplit = !isAtStart && !isAtEnd; // Split the current paragraph content if necessary

    if (shouldSplit) {
      splitNodes(editor);
    } // Insert the new li


    var newListItemPath = isAtStartOfListItem ? listItemPath : getNextPath(listItemPath);
    insertNodes(editor, // Add an empty paragraph to the new li if We will not move some
    // paragraphs over there.
    emptyListItemNode(editor, !shouldSplit), {
      at: newListItemPath
    }); // Move children *after* selection to the new li

    var fromPath = isAtStart ? paragraphPath : getNextPath(paragraphPath);
    var fromStartIndex = fromPath[fromPath.length - 1] || 0; // On split we don't add paragraph to the new li so we move
    // content to the very beginning. Otherwise, account for the empty
    // paragraph at the beginning by moving the content after

    var toPath = newListItemPath.concat([shouldSplit ? 0 : 1]);

    if (!isAtStartOfListItem) {
      moveChildren(editor, {
        at: listItemPath,
        to: toPath,
        fromStartIndex: fromStartIndex
      });
    } // Move cursor to the start of the new li


    select(editor, newListItemPath);
    collapseSelection(editor, {
      edge: 'start'
    });
  }); // Returning True skips processing other editor.insertBreak handlers

  return true;
};

/**
 * Credit: Copied & modified version from Plate's list plugin to support
 * list items with multiple children.
 *
 * See: https://github.com/udecode/plate/blob/main/packages/nodes/list
 */

var listBreak = function listBreak(editor) {
  if (!editor.selection) return false;
  var res = plateList.getListItemEntry(editor, {});
  var moved; // If selection is in a li

  if (res) {
    var list = res.list,
        listItem = res.listItem;
    var childNode = listItem[0].children[0]; // If selected li is empty, move it up.

    if (p.isBlockAboveEmpty(editor) && listItem[0].children.length === 1 && Contentful.TEXT_CONTAINERS.includes(childNode.type)) {
      moved = plateList.moveListItemUp(editor, {
        list: list,
        listItem: listItem
      });
      if (moved) return true;
    }
  }

  var didReset = plateResetNode.onKeyDownResetNode(editor, p.mockPlugin({
    options: {
      rules: [{
        types: [p.getPluginType(editor, plateList.ELEMENT_LI)],
        defaultType: p.getPluginType(editor, p.ELEMENT_DEFAULT),
        predicate: function predicate() {
          return !moved && p.isBlockAboveEmpty(editor);
        },
        onReset: function onReset(_editor) {
          return plateList.unwrapList(_editor);
        }
      }]
    }
  }))(plateResetNode.SIMULATE_BACKSPACE);

  if (didReset) {
    return true;
  }
  /**
   * If selection is in li > p, insert li.
   */


  if (!moved) {
    var inserted = insertListItem(editor);
    if (inserted) return true;
  }

  return false;
};

var insertListBreak = function insertListBreak(editor) {
  var insertBreak = editor.insertBreak;
  return function () {
    if (listBreak(editor)) return;
    insertBreak();
  };
};

/**
 * Credit: Modified version of Plate's list plugin
 * See: https://github.com/udecode/plate/blob/main/packages/nodes/list
 */

var getFirstAncestorOfType = function getFirstAncestorOfType(root, entry) {
  var ancestor = getParentPath(entry[1]);

  while (getDescendantNodeByPath(root, ancestor).type !== Contentful.BLOCKS.LIST_ITEM) {
    ancestor = getParentPath(ancestor);
  }

  return [getDescendantNodeByPath(root, ancestor), ancestor];
};

var isListRoot = function isListRoot(node) {
  return [Contentful.BLOCKS.UL_LIST, Contentful.BLOCKS.OL_LIST].includes(node.type);
};
/**
 * Removes the "empty" leading lis. Empty in this context means lis only with other lis as children.
 *
 * @returns If argument is not a list root, returns it, otherwise returns ul[] or li[].
 */


var trimList = function trimList(listRoot) {
  if (!isListRoot(listRoot)) {
    return [listRoot];
  }

  var textEntries = Array.from(getNodeTexts(listRoot));
  var commonAncestorEntry = textEntries.reduce(function (commonAncestor, textEntry) {
    return isAncestorPath(commonAncestor[1], textEntry[1]) ? commonAncestor : getCommonNode(listRoot, textEntry[1], commonAncestor[1]);
  }, // any list item would do, we grab the first one
  getFirstAncestorOfType(listRoot, textEntries[0]));
  return isListRoot(commonAncestorEntry[0]) ? commonAncestorEntry[0].children : [commonAncestorEntry[0]];
};
/**
 * Removes leading li when pasting a single li with a single child.
 */


var trimLiWrapper = function trimLiWrapper(nodes) {
  if (nodes.length !== 1) {
    return nodes;
  }

  var node = nodes[0];

  if (node.type !== Contentful.BLOCKS.LIST_ITEM || node.children.length !== 1) {
    return nodes;
  }

  return node.children;
};

var unwrapTextContainerAtStart = function unwrapTextContainerAtStart(nodes) {
  var node = nodes[0];

  if (Contentful.TEXT_CONTAINERS.includes(node.type)) {
    return [].concat(node.children, nodes.slice(1));
  }

  return nodes;
};

var insertListFragment = function insertListFragment(editor) {
  var insertFragment = editor.insertFragment;
  return function (fragment) {
    if (!editor.selection) {
      return;
    }

    var liEntry = p.findNode(editor, {
      match: {
        type: Contentful.BLOCKS.LIST_ITEM
      },
      mode: 'lowest'
    });

    if (liEntry) {
      var nodes = unwrapTextContainerAtStart(trimLiWrapper(fragment.flatMap(function (node) {
        return trimList(node);
      })));
      var firstBlockIndex = nodes.findIndex(function (node) {
        return isBlockNode(editor, node);
      });

      if (firstBlockIndex < 0) {
        firstBlockIndex = nodes.length;
      }

      var inlines = nodes.slice(0, firstBlockIndex);
      var blocks = nodes.slice(firstBlockIndex); // Two calls to insertNodes are required here. Otherwise, all blocks
      // after a text or inline element occurrence will be unwrapped for
      // some reason.

      insertNodes(editor, inlines, {
        at: editor.selection,
        select: true
      });
      return insertNodes(editor, blocks, {
        at: editor.selection,
        select: true
      });
    }

    var filtered = isListRoot(fragment[0]) ? [{
      text: ''
    }].concat(fragment) : fragment;
    return insertFragment(filtered);
  };
};

/**
 * Credit: Modified version of Plate's list plugin
 * See: https://github.com/udecode/plate/blob/main/packages/nodes/list
 */
var deleteBackwardList = function deleteBackwardList(editor, unit) {
  var res = plateList.getListItemEntry(editor, {});
  var moved = false;

  if (res) {
    var list = res.list,
        listItem = res.listItem;

    if (isSelectionAtBlockStart(editor, {
      match: function match(node) {
        return node.type === Contentful.BLOCKS.LIST_ITEM;
      }
    })) {
      withoutNormalizing(editor, function () {
        moved = plateList.removeFirstListItem(editor, {
          list: list,
          listItem: listItem
        });
        if (moved) return;
        moved = plateList.removeListItem(editor, {
          list: list,
          listItem: listItem
        });
        if (moved) return;

        if (isFirstChild(listItem[1]) && !plateList.isListNested(editor, list[1])) {
          plateResetNode.onKeyDownResetNode(editor, // TODO look into this
          // @ts-expect-error
          mockPlugin({
            options: {
              rules: [{
                types: [Contentful.BLOCKS.LIST_ITEM],
                defaultType: Contentful.BLOCKS.PARAGRAPH,
                hotkey: 'backspace',
                predicate: function predicate() {
                  return isSelectionAtBlockStart(editor);
                },
                onReset: function onReset(e) {
                  return unwrapList(e);
                }
              }]
            }
          }))(plateResetNode.SIMULATE_BACKSPACE);
          moved = true;
          return;
        }

        deleteFragment(editor, {
          // FIXME: see if we can remove unit
          // @ts-expect-error
          unit: unit,
          reverse: true
        });
        moved = true;
      });
    }
  }

  return moved;
};

/**
 * Credit: Modified version of Plate's list plugin
 * See: https://github.com/udecode/plate/blob/main/packages/nodes/list
 */
var validLiChildrenTypes = Contentful.LIST_ITEM_BLOCKS;
var withList = function withList(editor) {
  var deleteBackward = editor.deleteBackward,
      deleteForward = editor.deleteForward,
      deleteFragment = editor.deleteFragment;

  editor.deleteBackward = function (unit) {
    if (deleteBackwardList(editor, unit)) return;
    deleteBackward(unit);
  };

  editor.deleteForward = function (unit) {
    if (plateList.deleteForwardList(editor)) return;
    deleteForward(unit);
  };

  editor.deleteFragment = function () {
    if (plateList.deleteFragmentList(editor)) return;
    deleteFragment();
  };

  editor.insertBreak = insertListBreak(editor);
  editor.insertFragment = insertListFragment(editor); // TODO: replace with our own Normalizer rules

  editor.normalizeNode = plateList.normalizeList(editor, {
    validLiChildrenTypes: validLiChildrenTypes
  });
  return editor;
};

var createListPlugin = function createListPlugin() {
  var _overrideByKey;

  return plateList.createListPlugin({
    normalizer: [{
      match: {
        type: [Contentful.BLOCKS.UL_LIST, Contentful.BLOCKS.OL_LIST]
      },
      validChildren: [Contentful.BLOCKS.LIST_ITEM],
      transform: transformWrapIn(Contentful.BLOCKS.LIST_ITEM)
    }],
    overrideByKey: (_overrideByKey = {}, _overrideByKey[plateList.ELEMENT_UL] = {
      type: Contentful.BLOCKS.UL_LIST,
      component: ListUL,
      handlers: {
        onKeyDown: onKeyDownList
      },
      // The withList is added on ELEMENT_UL plugin in upstream code
      // so we need to override it here
      withOverrides: withList
    }, _overrideByKey[plateList.ELEMENT_OL] = {
      type: Contentful.BLOCKS.OL_LIST,
      component: ListOL,
      handlers: {
        onKeyDown: onKeyDownList
      }
    }, _overrideByKey[plateList.ELEMENT_LIC] = {
      type: Contentful.BLOCKS.PARAGRAPH
    }, _overrideByKey[plateList.ELEMENT_LI] = {
      type: Contentful.BLOCKS.LIST_ITEM,
      component: ListItem,
      // @ts-expect-error
      normalizer: [{
        validNode: hasListAsDirectParent,
        transform: normalizeOrphanedListItem
      }, {
        validNode: isNonEmptyListItem,
        transform: insertParagraphAsChild
      }, {
        validChildren: Contentful.LIST_ITEM_BLOCKS,
        transform: transformParagraphs
      }, {
        validNode: firstNodeIsNotList,
        transform: replaceNodeWithListItems
      }]
    }, _overrideByKey)
  });
};

function ToolbarListButton(props) {
  var sdk = useSdkContext();
  var editor = useContentfulEditor();

  function handleClick(type) {
    return function () {
      if (!(editor != null && editor.selection)) return;
      toggleList(editor, {
        type: type
      });
      focus(editor);
    };
  }

  if (!editor) return null;
  return /*#__PURE__*/React.createElement(React.Fragment, null, isNodeTypeEnabled(sdk.field, Contentful.BLOCKS.UL_LIST) && /*#__PURE__*/React.createElement(ToolbarButton, {
    title: "UL",
    testId: "ul-toolbar-button",
    onClick: handleClick(Contentful.BLOCKS.UL_LIST),
    isActive: isListTypeActive(editor, Contentful.BLOCKS.UL_LIST),
    isDisabled: props.isDisabled
  }, /*#__PURE__*/React.createElement(f36Icons.ListBulletedIcon, null)), isNodeTypeEnabled(sdk.field, Contentful.BLOCKS.OL_LIST) && /*#__PURE__*/React.createElement(ToolbarButton, {
    title: "OL",
    testId: "ol-toolbar-button",
    onClick: handleClick(Contentful.BLOCKS.OL_LIST),
    isActive: isListTypeActive(editor, Contentful.BLOCKS.OL_LIST),
    isDisabled: props.isDisabled
  }, /*#__PURE__*/React.createElement(f36Icons.ListNumberedIcon, null)));
}

var toggleMarkAndDeactivateConflictingMarks = function toggleMarkAndDeactivateConflictingMarks(editor, mark) {
  var subs = [Contentful.MARKS.SUPERSCRIPT, Contentful.MARKS.SUBSCRIPT];
  var clear = subs.includes(mark) ? subs : [];
  toggleMark(editor, {
    key: mark,
    clear: clear
  });
};
var buildMarkEventHandler = function buildMarkEventHandler(type) {
  return function (editor, _ref) {
    var hotkey = _ref.options.hotkey;
    return function (event) {
      if (editor.selection && hotkey && isHotkey(hotkey, event)) {
        event.preventDefault();
        var isActive = isMarkActive(editor, type);
        editor.tracking.onShortcutAction(isActive ? 'unmark' : 'mark', {
          markType: type
        });
        toggleMarkAndDeactivateConflictingMarks(editor, type);
      }
    };
  };
};

var styles$c = {
  isActive: /*#__PURE__*/emotion.css({
    backgroundColor: tokens.blue100,
    color: tokens.blue600
  })
};
var createMarkToolbarButton = function createMarkToolbarButton(_ref) {
  var mark = _ref.mark,
      title = _ref.title,
      icon = _ref.icon;

  var Mark = function Mark(_ref2) {
    var isDisabled = _ref2.isDisabled;
    var editor = useContentfulEditor();
    var handleClick = React.useCallback(function () {
      if (!(editor != null && editor.selection)) return;
      var isActive = isMarkActive(editor, mark);
      editor.tracking.onToolbarAction(isActive ? 'unmark' : 'mark', {
        markType: mark
      });
      toggleMarkAndDeactivateConflictingMarks(editor, mark);
      focus(editor);
    }, [editor]);
    if (!editor) return null;

    if (!icon) {
      var _cx;

      return /*#__PURE__*/React.createElement(f36Components.Menu.Item, {
        onClick: handleClick,
        disabled: isDisabled,
        className: emotion.cx((_cx = {}, _cx[styles$c.isActive] = isMarkActive(editor, mark), _cx)),
        testId: mark + "-toolbar-button"
      }, title);
    }

    return /*#__PURE__*/React.createElement(ToolbarButton, {
      title: title,
      testId: mark + "-toolbar-button",
      onClick: handleClick,
      isActive: isMarkActive(editor, mark),
      isDisabled: isDisabled
    }, icon);
  };

  Mark.displayName = mark;
  return Mark;
};

var ToolbarBoldButton = /*#__PURE__*/createMarkToolbarButton({
  title: 'Bold',
  mark: Contentful.MARKS.BOLD,
  icon: /*#__PURE__*/React.createElement(f36Icons.FormatBoldIcon, null)
});
var styles$d = {
  bold: /*#__PURE__*/emotion.css({
    fontWeight: 600
  })
};
function Bold(props) {
  return /*#__PURE__*/React.createElement("strong", _extends({}, props.attributes, {
    className: styles$d.bold
  }), props.children);
}

var isGoogleBoldWrapper = function isGoogleBoldWrapper(el) {
  return el.id.startsWith('docs-internal-guid') && el.nodeName === 'B';
};

var createBoldPlugin = function createBoldPlugin() {
  return plateBasicMarks.createBoldPlugin({
    type: Contentful.MARKS.BOLD,
    component: Bold,
    options: {
      hotkey: ['mod+b']
    },
    handlers: {
      onKeyDown: buildMarkEventHandler(Contentful.MARKS.BOLD)
    },
    deserializeHtml: {
      rules: [{
        validNodeName: ['STRONG', 'B']
      }, {
        validStyle: {
          fontWeight: ['600', '700', 'bold']
        }
      }],
      query: function query(el) {
        return !isGoogleBoldWrapper(el) && !someHtmlElement(el, function (node) {
          return node.style.fontWeight === 'normal';
        });
      }
    }
  });
};

var ToolbarCodeButton = /*#__PURE__*/createMarkToolbarButton({
  title: 'Code',
  mark: Contentful.MARKS.CODE,
  icon: /*#__PURE__*/React.createElement(f36Icons.CodeIcon, null)
});
var ToolbarDropdownCodeButton = /*#__PURE__*/createMarkToolbarButton({
  title: 'Code',
  mark: Contentful.MARKS.CODE
});
var styles$e = {
  code: /*#__PURE__*/emotion.css({
    fontFamily: 'monospace',
    fontSize: '.9em'
  })
};
function Code(props) {
  return /*#__PURE__*/React.createElement("code", _extends({}, props.attributes, {
    className: styles$e.code
  }), props.children);
}
var createCodePlugin = function createCodePlugin() {
  return plateBasicMarks.createCodePlugin({
    type: Contentful.MARKS.CODE,
    component: Code,
    options: {
      // We need to define multiple hotkeys here,
      // - mod+/ -> QWERTY keyboard layout
      // - mod+shift+7 -> QWERTZ keyboard layout
      // The workaround like in packages/rich-text/src/plugins/CommandPalette/onKeyDown.ts is sadly not working here,
      // as `shift+7` is not interpreted as `/` with the `mod` key by the OS.
      // TODO: there are a lot more different keyboard layouts out there
      hotkey: ['mod+/', 'mod+shift+7']
    },
    handlers: {
      onKeyDown: buildMarkEventHandler(Contentful.MARKS.CODE)
    },
    deserializeHtml: {
      rules: [{
        validNodeName: ['CODE', 'PRE']
      }, {
        validStyle: {
          fontFamily: ['Consolas', 'monospace']
        }
      }]
    }
  });
};

var ToolbarItalicButton = /*#__PURE__*/createMarkToolbarButton({
  title: 'Italic',
  mark: Contentful.MARKS.ITALIC,
  icon: /*#__PURE__*/React.createElement(f36Icons.FormatItalicIcon, null)
});
var styles$f = {
  italic: /*#__PURE__*/emotion.css({
    fontStyle: 'italic'
  })
};
function Italic(props) {
  return /*#__PURE__*/React.createElement("em", _extends({}, props.attributes, {
    className: styles$f.italic
  }), props.children);
}
var createItalicPlugin = function createItalicPlugin() {
  return plateBasicMarks.createItalicPlugin({
    type: Contentful.MARKS.ITALIC,
    component: Italic,
    options: {
      hotkey: ['mod+i']
    },
    handlers: {
      onKeyDown: buildMarkEventHandler(Contentful.MARKS.ITALIC)
    },
    deserializeHtml: {
      rules: [{
        validNodeName: ['I', 'EM']
      }, {
        validStyle: {
          fontStyle: 'italic'
        }
      }],
      query: function query(el) {
        return !someHtmlElement(el, function (node) {
          return node.style.fontStyle === 'normal';
        });
      }
    }
  });
};

var styles$g = {
  subscript: /*#__PURE__*/emotion.css({
    verticalAlign: 'sub',
    fontSize: 'smaller'
  })
};
var ToolbarSubscriptButton = /*#__PURE__*/createMarkToolbarButton({
  title: 'Subscript',
  mark: Contentful.MARKS.SUBSCRIPT,
  icon: /*#__PURE__*/React.createElement(f36Icons.SubscriptIcon, {
    viewBox: "0 0 23 18"
  })
});
var ToolbarDropdownSubscriptButton = /*#__PURE__*/createMarkToolbarButton({
  title: 'Subscript',
  mark: Contentful.MARKS.SUBSCRIPT
});
function Subscript(props) {
  return /*#__PURE__*/React.createElement("sub", _extends({}, props.attributes, {
    className: styles$g.subscript
  }), props.children);
}
var createSubscriptPlugin = function createSubscriptPlugin() {
  return plateBasicMarks.createSubscriptPlugin({
    type: Contentful.MARKS.SUBSCRIPT,
    component: Subscript,
    handlers: {
      onKeyDown: buildMarkEventHandler(Contentful.MARKS.SUBSCRIPT)
    },
    deserializeHtml: {
      rules: [{
        validNodeName: ['SUB']
      }]
    }
  });
};

var styles$h = {
  superscript: /*#__PURE__*/emotion.css({
    verticalAlign: 'super',
    fontSize: 'smaller'
  })
};
var ToolbarSuperscriptButton = /*#__PURE__*/createMarkToolbarButton({
  title: 'Superscript',
  mark: Contentful.MARKS.SUPERSCRIPT,
  icon: /*#__PURE__*/React.createElement(f36Icons.SuperscriptIcon, null)
});
var ToolbarDropdownSuperscriptButton = /*#__PURE__*/createMarkToolbarButton({
  title: 'Superscript',
  mark: Contentful.MARKS.SUPERSCRIPT
});
function Superscript(props) {
  return /*#__PURE__*/React.createElement("sup", _extends({}, props.attributes, {
    className: styles$h.superscript
  }), props.children);
}
var createSuperscriptPlugin = function createSuperscriptPlugin() {
  return plateBasicMarks.createSuperscriptPlugin({
    type: Contentful.MARKS.SUPERSCRIPT,
    component: Superscript,
    handlers: {
      onKeyDown: buildMarkEventHandler(Contentful.MARKS.SUPERSCRIPT)
    },
    deserializeHtml: {
      rules: [{
        validNodeName: ['SUP']
      }]
    }
  });
};

var ToolbarUnderlineButton = /*#__PURE__*/createMarkToolbarButton({
  title: 'Underline',
  mark: Contentful.MARKS.UNDERLINE,
  icon: /*#__PURE__*/React.createElement(f36Icons.FormatUnderlinedIcon, null)
});
function Underline(props) {
  return /*#__PURE__*/React.createElement("u", _extends({}, props.attributes), props.children);
}
var createUnderlinePlugin = function createUnderlinePlugin() {
  return plateBasicMarks.createUnderlinePlugin({
    type: Contentful.MARKS.UNDERLINE,
    component: Underline,
    options: {
      hotkey: ['mod+u']
    },
    handlers: {
      onKeyDown: buildMarkEventHandler(Contentful.MARKS.UNDERLINE)
    },
    deserializeHtml: {
      rules: [{
        validNodeName: ['U']
      }, {
        validStyle: {
          textDecoration: ['underline']
        }
      }],
      query: function query(el) {
        return !someHtmlElement(el, function (node) {
          return node.style.textDecoration === 'none';
        });
      }
    }
  });
};

var createMarksPlugin = function createMarksPlugin() {
  return {
    key: 'Marks',
    plugins: [createBoldPlugin(), createCodePlugin(), createItalicPlugin(), createUnderlinePlugin(), createSuperscriptPlugin(), createSubscriptPlugin()]
  };
};

var isInline$1 = function isInline(node) {
  return INLINE_TYPES.includes(node.type);
};

var isTextContainer = function isTextContainer(node) {
  return Contentful.TEXT_CONTAINERS.includes(node.type);
}; // Base rules are rules that must be enforced at all times regardless
// of which plugins are enabled.


var baseRules = [{
  // Wrap orphaned text nodes in a paragraph
  match: isText,
  validNode: function validNode(editor, _ref) {
    var _getParentNode;

    var path = _ref[1];
    var parent = (_getParentNode = getParentNode(editor, path)) == null ? void 0 : _getParentNode[0];
    return !!parent && (isTextContainer(parent) || isInline$1(parent) || editor.isVoid(parent));
  },
  transform: function transform(editor, entry) {
    return transformWrapIn(Contentful.BLOCKS.PARAGRAPH)(editor, entry);
  }
}, {
  // Wrap orphaned inline nodes in a paragraph,
  match: {
    type: INLINE_TYPES
  },
  validNode: function validNode(editor, _ref2) {
    var _getParentNode2;

    var path = _ref2[1];
    var parent = (_getParentNode2 = getParentNode(editor, path)) == null ? void 0 : _getParentNode2[0];
    return !!parent && isTextContainer(parent);
  },
  transform: /*#__PURE__*/transformWrapIn(Contentful.BLOCKS.PARAGRAPH)
}];

var NormalizerError = /*#__PURE__*/function (_Error) {
  _inheritsLoose(NormalizerError, _Error);

  function NormalizerError() {
    return _Error.apply(this, arguments) || this;
  }

  return NormalizerError;
}( /*#__PURE__*/_wrapNativeSuper(Error));
var createValidatorFromTypes = function createValidatorFromTypes(types) {
  return function (_, _ref) {
    var node = _ref[0];
    return isElement(node) && types.includes(node.type);
  };
};
var createTransformerFromObject = function createTransformerFromObject(transforms) {
  // A default transformer must always be provided
  var fallback = transforms['default'];

  if (!fallback) {
    throw new NormalizerError('A default transformer MUST be provided');
  }

  return function (editor, entry) {
    var node = entry[0];
    var key = isElement(node) ? node.type : 'default';
    var transformer = transforms[key] || fallback;
    return transformer(editor, entry);
  };
};

var withNormalizer = function withNormalizer(editor) {
  var rules = baseRules; // Derive normalization rules from other plugin's configurations

  for (var _iterator = _createForOfIteratorHelperLoose(editor.plugins), _step; !(_step = _iterator()).done;) {
    var p = _step.value;
    var _rules = p.normalizer;

    if (!_rules) {
      continue;
    }

    for (var _iterator3 = _createForOfIteratorHelperLoose(_rules), _step3; !(_step3 = _iterator3()).done;) {
      var _rule = _step3.value;

      // Clone to avoid mutation bugs
      var rule = _extends({}, _rule);

      if (!rule.match && !p.isElement) {
        throw new NormalizerError('rule.match MUST be defined in a non-element plugin');
      } // By default we filter elements with given plugin type


      if (!rule.match) {
        rule.match = {
          type: getPluginType(editor, p.key)
        };
      } // Conditional transformation e.g.
      // {
      //   [BLOCKS.EMBEDDED_ASSET]: transformLift,
      //   default?: transformRemove
      // }
      //


      if (isPlainObject(rule.transform)) {
        if ('validNode' in rule) {
          // I can't think of a use case. Disabled to prevent misuse
          throw new NormalizerError('conditional transformations are not supported in validNode rules');
        }

        rule.transform = createTransformerFromObject(_extends({
          "default": transformRemove
        }, rule.transform));
      } // By default all invalid nodes are removed.


      if (!rule.transform) {
        rule.transform = transformRemove;
      } // Convert Types array syntax to a validator function


      if ('validChildren' in rule && Array.isArray(rule.validChildren)) {
        rule.validChildren = createValidatorFromTypes(rule.validChildren);
      }

      rules.push(rule);
    }
  } // Wrap transformer in a withoutNormalizing() call to avoid unnecessary
  // normalization cycles.


  var _transform = function _transform(tr, entry) {
    withoutNormalizing(editor, function () {
      tr(editor, entry);
    });
  };

  var normalizeNode = editor.normalizeNode; // @ts-expect-error

  editor.normalizeNode = function (entry) {
    var node = entry[0],
        path = entry[1];
    var children = getChildren(entry); // The order of validNode rules Vs validChildren doesn't matter. Slate
    // will always perform normalization in a depth-first fashion.

    for (var _iterator2 = _createForOfIteratorHelperLoose(rules), _step2; !(_step2 = _iterator2()).done;) {
      var rule = _step2.value;

      if (!matchNode(node, path, rule.match)) {
        continue;
      } // Normalize node


      if ('validNode' in rule && !rule.validNode(editor, entry)) {
        _transform(rule.transform, entry);

        return;
      } // Normalize node.children


      if ('validChildren' in rule) {
        var _ret = function () {
          // It can not be an array since we enforced it earlier
          var isValidChild = rule.validChildren;
          var invalidChildEntry = children.find(function (entry) {
            return !isValidChild(editor, entry);
          });

          if (invalidChildEntry) {
            _transform(rule.transform, invalidChildEntry);

            return {
              v: void 0
            };
          }
        }();

        if (typeof _ret === "object") return _ret.v;
      }
    }

    return normalizeNode(entry);
  };

  return editor;
};

var createNormalizerPlugin = function createNormalizerPlugin() {
  return {
    key: 'NormalizerPlugin',
    withOverrides: withNormalizer
  };
};

var _templateObject$6, _styles$1;
var styles$i = (_styles$1 = {}, _styles$1[Contentful.BLOCKS.PARAGRAPH] = /*#__PURE__*/emotion.css(_templateObject$6 || (_templateObject$6 = /*#__PURE__*/_taggedTemplateLiteralLoose(["\n    line-height: ", ";\n    margin-bottom: 1.5em;\n  "])), tokens.lineHeightDefault), _styles$1);
function Paragraph(props) {
  return /*#__PURE__*/React.createElement("div", _extends({}, props.attributes, {
    className: styles$i[Contentful.BLOCKS.PARAGRAPH]
  }), props.children);
}

function isEmbedElement(element) {
  return element.hasAttribute('data-embedded-entity-inline-id') || element.hasAttribute('data-entity-type');
}
function isEmptyElement(element) {
  return element.textContent === '';
}

var buildParagraphKeyDownHandler = function buildParagraphKeyDownHandler(editor, _ref) {
  var hotkey = _ref.options.hotkey;
  return function (event) {
    if (editor.selection && hotkey && isHotkey(hotkey, event)) {
      toggleElement(editor, {
        activeType: Contentful.BLOCKS.PARAGRAPH,
        inactiveType: Contentful.BLOCKS.PARAGRAPH
      });
    }
  };
};

var createParagraphPlugin = function createParagraphPlugin() {
  var _transform;

  var config = {
    type: Contentful.BLOCKS.PARAGRAPH,
    component: Paragraph,
    options: {
      hotkey: ['mod+opt+0']
    },
    handlers: {
      onKeyDown: buildParagraphKeyDownHandler
    },
    softBreak: [// create a new line with SHIFT+Enter inside a paragraph
    {
      hotkey: 'shift+enter',
      query: {
        allow: Contentful.BLOCKS.PARAGRAPH
      }
    }],
    deserializeHtml: {
      rules: [{
        validNodeName: ['P', 'DIV']
      }],
      query: function query(el) {
        return !isEmptyElement(el) && !isEmbedElement(el);
      }
    },
    normalizer: [{
      validChildren: function validChildren(_, _ref2) {
        var node = _ref2[0];
        return isInlineOrText(node);
      },
      transform: (_transform = {}, _transform[Contentful.BLOCKS.PARAGRAPH] = transformUnwrap, _transform["default"] = transformLift, _transform)
    }]
  };
  return plateParagraph.createParagraphPlugin(config);
};

/**
 * Remove empty spreadsheets columns/rows for performance reasons.
 */
var sanitizeSheets = function sanitizeSheets(doc) {
  // Ensure we are inside a spreadsheet i.e. not pasting
  // a table from within the editor
  var supported = [// Google Sheets
  'google-sheets-html-origin', // MS Excel
  'meta[content="Excel.Sheet"]', 'meta[content*="Microsoft Excel"]'];

  if (!supported.some(function (selector) {
    return !!doc.querySelector(selector);
  })) {
    return doc;
  }

  var isEmptyElement = function isEmptyElement(el) {
    var _el$textContent;

    return ((_el$textContent = el.textContent) != null ? _el$textContent : '').trim() === '';
  };

  var tables = Array.from(doc.querySelectorAll('table'));

  var _loop = function _loop() {
    var table = _tables[_i];
    // Remove empty columns first!
    table.querySelectorAll('tr').forEach(function (row) {
      isEmptyElement(row) && row.remove();
    });
    var rows = Array.from(table.querySelectorAll('tr')); // CSS :nth-of-type index starts from 1

    var colIndex = 1; // eslint-disable-next-line -- TODO: explain this disable

    while (true) {
      var cells = rows.map(function (row) {
        return row.querySelector("th:nth-of-type(" + colIndex + "), td:nth-of-type(" + colIndex + ")");
      }).filter(function (cell) {
        return !!cell;
      }); // No more columns

      if (cells.length === 0) {
        break;
      }

      var isEmpty = cells.every(function (cell) {
        return isEmptyElement(cell);
      }); // Don't increment on deletion because columns will be shifted
      // left anyway. Incrementing may result in skipping

      if (!isEmpty) {
        colIndex += 1;
        continue;
      }

      cells.forEach(function (cell) {
        return cell.remove();
      });
    }
  };

  for (var _i = 0, _tables = tables; _i < _tables.length; _i++) {
    _loop();
  }

  return doc;
};

/**
 * Remove all <style> tags
 */

var stripStyleTags = function stripStyleTags(doc) {
  doc.querySelectorAll('style').forEach(function (e) {
    e.remove();
  });
  return doc;
};

var transformers = [stripStyleTags, sanitizeSheets];
var sanitizeHTML = function sanitizeHTML(html) {
  // Parse the HTML string and pipe it through our transformers
  var doc = transformers.reduce(function (value, cb) {
    return cb(value);
  }, new DOMParser().parseFromString(html, 'text/html'));
  return doc.body.innerHTML.replace(/>\s+</g, '><') // Remove whitespace between tags
  .replace(/(.*)<div.*>(<table.*<\/table>)<\/div>(.*)/g, '$1$2$3'); // remove div containers from tables
};

/**
 * Get x-slate-fragment attribute from data-slate-fragment
 */

var catchSlateFragment = /data-slate-fragment="(.+?)"/m;
var getSlateFragmentAttribute = function getSlateFragmentAttribute(dataTransfer) {
  var htmlData = dataTransfer.getData('text/html');

  var _ref = htmlData.match(catchSlateFragment) || [],
      fragment = _ref[1];

  return fragment;
};
/**
 * Get the x-slate-fragment attribute that exist in text/html data
 * and append it to the DataTransfer object
 */

var ensureXSlateFragment = function ensureXSlateFragment(dataTransfer) {
  if (!dataTransfer.getData('application/x-slate-fragment')) {
    var fragment = getSlateFragmentAttribute(dataTransfer);

    if (fragment) {
      var clipboardData = new DataTransfer();
      dataTransfer.types.forEach(function (type) {
        clipboardData.setData(type, dataTransfer.getData(type));
      });
      clipboardData.setData('application/x-slate-fragment', fragment);
      return clipboardData;
    }
  }

  return dataTransfer;
};
var createPasteHTMLPlugin = function createPasteHTMLPlugin() {
  var _pluginsByKey;

  return {
    key: 'PasteHTMLPlugin',
    withOverrides: function withOverrides(editor) {
      var insertData = editor.insertData;

      editor.insertData = function (data) {
        return insertData(ensureXSlateFragment(data));
      };

      return editor;
    },
    inject: {
      pluginsByKey: (_pluginsByKey = {}, _pluginsByKey[p.KEY_DESERIALIZE_HTML] = {
        editor: {
          insertData: {
            format: 'text/html',
            // Perform custom content transformation *before* pasting
            transformData: sanitizeHTML
          }
        }
      }, _pluginsByKey)
    }
  };
};

var style$1 = /*#__PURE__*/emotion.css({
  margin: '0 0 1.3125rem',
  borderLeft: "6px solid " + tokens.gray200,
  paddingLeft: '0.875rem',
  fontStyle: 'normal'
});
function Quote(props) {
  return /*#__PURE__*/React.createElement("blockquote", _extends({}, props.attributes, {
    className: style$1
  }), props.children);
}

/**
 * Returns true if we are:
 * 1) Inside a blockquote
 * 2) With no only one child paragraph/heading and
 * 3) that child is empty
 */

var shouldResetQuoteOnBackspace = function shouldResetQuoteOnBackspace(editor) {
  var container = getAboveNode(editor, {
    match: {
      type: Contentful.TEXT_CONTAINERS
    },
    mode: 'lowest'
  });

  if (!container) {
    return false;
  }

  if (!isAncestorEmpty(editor, container[0])) {
    return false;
  }

  var quote = getBlockAbove(editor, {
    match: {
      type: Contentful.BLOCKS.QUOTE
    },
    mode: 'lowest'
  });

  if (!quote) {
    return false;
  }

  if (p.hasSingleChild(quote[0]) && p.isLastChild(quote, container[1])) {
    return true;
  }

  return false;
};

function toggleQuote(editor, logAction) {
  if (!editor.selection) return;
  var isActive = isBlockSelected(editor, Contentful.BLOCKS.QUOTE);
  logAction == null ? void 0 : logAction(isActive ? 'remove' : 'insert', {
    nodeType: Contentful.BLOCKS.QUOTE
  });
  withoutNormalizing(editor, function () {
    if (!editor.selection) return;
    unwrapNodes(editor, {
      match: function match(node) {
        return isElement(node) && node.type === Contentful.BLOCKS.QUOTE;
      },
      split: true
    });

    if (!isActive) {
      var quote = {
        type: Contentful.BLOCKS.QUOTE,
        data: {},
        children: []
      };
      wrapNodes(editor, quote);
    }
  });
}
var onKeyDownToggleQuote = function onKeyDownToggleQuote(editor, plugin) {
  return function (event) {
    var hotkey = plugin.options.hotkey;

    if (hotkey && isHotkey(hotkey, event)) {
      event.preventDefault();
      toggleQuote(editor, editor.tracking.onShortcutAction);
    }
  };
};

var withQuote = function withQuote(editor) {
  var insertFragment = editor.insertFragment;

  editor.insertFragment = function (fragment) {
    var startingNode = fragment.length && fragment[0];
    var startsWithBlockquote = s.Element.isElement(startingNode) && startingNode.type === Contentful.BLOCKS.QUOTE;
    var containerEntry = getAboveNode(editor, {
      match: {
        type: Contentful.TEXT_CONTAINERS
      }
    });
    var containerIsNotEmpty = containerEntry && getText(editor, containerEntry[1]) !== '';

    if (startsWithBlockquote && containerIsNotEmpty) {
      var selection = editor.selection;

      var isContentSelected = function isContentSelected(selection) {
        return !!selection && s.Point.compare(selection.anchor, selection.focus) !== 0;
      }; // if something is selected (highlighted) we replace the selection


      if (isContentSelected(selection)) {
        deleteText(editor, {
          at: selection
        });
      } // get the cursor entry again, it may be different after deletion


      var _containerEntry = getAboveNode(editor, {
        match: {
          type: Contentful.TEXT_CONTAINERS
        }
      });

      var _containerIsNotEmpty = _containerEntry && getText(editor, _containerEntry[1]) !== '';

      if (_containerIsNotEmpty) {
        insertNodes(editor, fragment);
        return;
      }
    }

    insertFragment(fragment);
  };

  return editor;
};

function createQuotePlugin() {
  var _transform;

  return {
    key: Contentful.BLOCKS.QUOTE,
    type: Contentful.BLOCKS.QUOTE,
    isElement: true,
    component: Quote,
    options: {
      hotkey: 'mod+shift+1'
    },
    handlers: {
      onKeyDown: onKeyDownToggleQuote
    },
    deserializeHtml: {
      rules: [{
        validNodeName: 'BLOCKQUOTE'
      }]
    },
    resetNode: [{
      // toggle off blockquote on backspace when it's empty
      hotkey: 'backspace',
      types: [Contentful.BLOCKS.QUOTE],
      predicate: shouldResetQuoteOnBackspace,
      onReset: toggleQuote
    }],
    normalizer: [{
      validChildren: Contentful.CONTAINERS[Contentful.BLOCKS.QUOTE],
      transform: (_transform = {}, _transform[Contentful.BLOCKS.QUOTE] = transformUnwrap, _transform["default"] = transformLift, _transform)
    }],
    withOverrides: withQuote
  };
}

function ToolbarQuoteButton(props) {
  var editor = useContentfulEditor();

  function handleOnClick() {
    if (!editor) return;
    toggleQuote(editor, editor.tracking.onToolbarAction);
    focus(editor);
  }

  if (!editor) return null;
  return /*#__PURE__*/React.createElement(ToolbarButton, {
    title: "Blockquote",
    onClick: handleOnClick,
    testId: "quote-toolbar-button",
    isDisabled: props.isDisabled,
    isActive: isBlockSelected(editor, Contentful.BLOCKS.QUOTE)
  }, /*#__PURE__*/React.createElement(f36Icons.QuoteIcon, null));
}

var createSelectOnBackspacePlugin = function createSelectOnBackspacePlugin() {
  return plateSelect.createSelectOnBackspacePlugin({
    options: {
      query: {
        // `createTextPlugin` is taking care of block elements
        allow: [Contentful.INLINES.EMBEDDED_ENTRY]
      }
    }
  });
};

var addRow = function addRow(editor, getNextRowPath) {
  if (someNode(editor, {
    match: {
      type: Contentful.BLOCKS.TABLE
    }
  })) {
    var currentRowItem = getAboveNode(editor, {
      match: {
        type: Contentful.BLOCKS.TABLE_ROW
      }
    });

    if (currentRowItem) {
      var currentRowElem = currentRowItem[0],
          currentRowPath = currentRowItem[1];
      var nextRowPath = getNextRowPath(currentRowPath);
      insertNodes(editor, plateTable.getEmptyRowNode(editor, {
        header: false,
        colCount: currentRowElem.children.length
      }), {
        at: nextRowPath,
        // Note: this selects the last cell of the new row
        select: true
      }); // Select the first cell in the current row

      select(editor, getStartPoint(editor, nextRowPath));
    }
  }
};

var addRowBelow = function addRowBelow(editor) {
  addRow(editor, function (currentRowPath) {
    return getNextPath(currentRowPath);
  });
};
var addRowAbove = function addRowAbove(editor) {
  addRow(editor, function (currentRowPath) {
    // The new row will be in in-place of the old row
    return currentRowPath;
  });
};

var addColumn = function addColumn(editor, _ref, getNextCellPath) {
  var header = _ref.header;

  if (someNode(editor, {
    match: {
      type: Contentful.BLOCKS.TABLE
    }
  })) {
    var currentCellItem = getAboveNode(editor, {
      match: {
        type: [Contentful.BLOCKS.TABLE_HEADER_CELL, Contentful.BLOCKS.TABLE_CELL]
      }
    });
    var currentTableItem = getAboveNode(editor, {
      match: {
        type: Contentful.BLOCKS.TABLE
      }
    });

    if (currentCellItem && currentTableItem) {
      var nextCellPath = getNextCellPath(currentCellItem[1]);
      var newCellPath = nextCellPath.slice();
      var replacePathPos = newCellPath.length - 2;
      currentTableItem[0].children.forEach(function (_, rowIdx) {
        newCellPath[replacePathPos] = rowIdx;
        insertNodes(editor, plateTable.getEmptyCellNode(editor, {
          header: header && rowIdx === 0
        }), {
          at: newCellPath,
          // Select the first cell of the new column
          select: rowIdx === 0
        });
      });
    }
  }
};

var addColumnRight = function addColumnRight(editor, options) {
  addColumn(editor, options, function (currentCellPath) {
    return getNextPath(currentCellPath);
  });
};
var addColumnLeft = function addColumnLeft(editor, options) {
  addColumn(editor, options, function (currentCellPath) {
    return currentCellPath;
  });
};

var setHeader = function setHeader(editor, enable) {
  var tableItem = getAboveNode(editor, {
    match: {
      type: Contentful.BLOCKS.TABLE
    }
  });

  if (!tableItem) {
    return;
  }

  var firstRow = getChildren(tableItem)[0];

  if (!firstRow) {
    return;
  }

  getChildren(firstRow).forEach(function (_ref) {
    var path = _ref[1];
    setNodes(editor, {
      type: enable ? Contentful.BLOCKS.TABLE_HEADER_CELL : Contentful.BLOCKS.TABLE_CELL
    }, {
      at: path
    });
  });
};

function insertTableAndFocusFirstCell(editor) {
  var table = {
    type: Contentful.BLOCKS.TABLE,
    data: {},
    children: [plateTable.getEmptyRowNode(editor, {
      colCount: 2,
      header: true
    }), plateTable.getEmptyRowNode(editor, {
      colCount: 2
    })]
  };
  insertNodes(editor, table);

  if (editor.selection) {
    var tableEntry = getBlockAbove(editor, {
      match: {
        type: Contentful.BLOCKS.TABLE
      }
    });
    if (!tableEntry) return;
    selectEditor(editor, {
      at: getStartPoint(editor, tableEntry[1])
    });
  }

  replaceEmptyParagraphWithTable(editor);
}
function isTableActive(editor) {
  var tableElements = [plateTable.ELEMENT_TABLE, plateTable.ELEMENT_TH, plateTable.ELEMENT_TR, plateTable.ELEMENT_TD];
  return tableElements.some(function (el) {
    return isBlockSelected(editor, el);
  });
}
function isTableHeaderEnabled(editor) {
  var tableItem = getAboveNode(editor, {
    match: {
      type: Contentful.BLOCKS.TABLE
    }
  });

  if (!tableItem) {
    return false;
  }

  var firstRow = getChildren(tableItem)[0];

  if (!firstRow) {
    return false;
  }

  return getChildren(firstRow).every(function (_ref) {
    var node = _ref[0];
    return node.type === Contentful.BLOCKS.TABLE_HEADER_CELL;
  });
}
function replaceEmptyParagraphWithTable(editor) {
  var tablePath = getAncestorPathFromSelection(editor);
  if (!tablePath || isFirstChildPath(tablePath)) return;
  var previousPath = getPreviousPath(tablePath);
  if (!previousPath) return;

  var _getNodeEntries = getNodeEntries(editor, {
    at: previousPath,
    match: function match(node) {
      return node.type === Contentful.BLOCKS.PARAGRAPH;
    }
  }),
      nodes = _getNodeEntries[0];

  if (!nodes) return;
  var previousNode = nodes[0];
  var isPreviousNodeTextEmpty = isAncestorEmpty(editor, previousNode);

  if (isPreviousNodeTextEmpty) {
    // Switch table with previous empty paragraph
    moveNodes(editor, {
      at: tablePath,
      to: previousPath
    }); // Remove previous paragraph that now is under the table

    removeNodes(editor, {
      at: tablePath
    });
  }
}
/**
 * Returns the number of cells in a given row vs the table width
 *
 * Note: We should only get different table rows cell counts in between
 * normalization cycles.
 */

var getNoOfMissingTableCellsInRow = function getNoOfMissingTableCellsInRow(editor, rowEntry) {
  var rowPath = rowEntry[1];
  var parent = getParentNode(editor, rowPath); // This is ensured by normalization. The error is here just in case

  if (!parent) {
    throw new Error('table rows must be wrapped in a table node');
  } // The longest table row determines its width


  var tableWidth = Math.max.apply(Math, getChildren(parent).map(function (entry) {
    return getChildren(entry).length;
  }));
  var rowWidth = getChildren(rowEntry).length;
  return tableWidth - rowWidth;
};
var createEmptyTableCells = function createEmptyTableCells(count) {
  var emptyTableCell = {
    type: Contentful.BLOCKS.TABLE_CELL,
    data: {},
    children: [{
      type: Contentful.BLOCKS.PARAGRAPH,
      data: {},
      children: [{
        text: ''
      }]
    }]
  };
  return new Array(count).fill(emptyTableCell);
};
var isNotEmpty = function isNotEmpty(_, entry) {
  return getChildren(entry).length !== 0;
};
var isTable = function isTable(node) {
  return isElement(node) && node.type === Contentful.BLOCKS.TABLE;
};

var styles$j = {
  topRight: /*#__PURE__*/emotion.css({
    position: 'absolute',
    top: '6px',
    right: '5px'
  })
};

var getCurrentTableSize = function getCurrentTableSize(editor) {
  var _getNodeEntryFromSele = getNodeEntryFromSelection(editor, Contentful.BLOCKS.TABLE),
      table = _getNodeEntryFromSele[0];

  return table ? getTableSize(table) : null;
};

var TableActions = function TableActions() {
  var editor = useContentfulEditor();
  var isDisabled = useReadOnly();

  var _React$useState = React__default.useState(false),
      isOpen = _React$useState[0],
      setOpen = _React$useState[1];

  var _React$useState2 = React__default.useState(false),
      isHeaderEnabled = _React$useState2[0],
      setHeaderEnabled = _React$useState2[1];

  var close = React__default.useCallback(function () {
    setOpen(false);
  }, []);
  React__default.useEffect(function () {
    setHeaderEnabled(Boolean(editor && isTableHeaderEnabled(editor)));
  }, [editor]);
  var canInsertRowAbove = React__default.useMemo(function () {
    if (!editor) {
      return false;
    }

    var headerCell = getAboveNode(editor, {
      match: {
        type: Contentful.BLOCKS.TABLE_HEADER_CELL
      }
    });
    return !headerCell;
  }, [editor]);
  var toggleHeader = React__default.useCallback(function () {
    close();

    if (!editor) {
      return;
    }

    var value = !isHeaderEnabled;
    setHeaderEnabled(value);
    setHeader(editor, value);
  }, [editor, close, isHeaderEnabled]);
  var action = React__default.useCallback(function (cb, type, element) {
    return function () {
      if (!(editor != null && editor.selection)) return;
      close();
      var tableSize = getCurrentTableSize(editor);
      withoutNormalizing(editor, function () {
        cb(editor, {
          header: isHeaderEnabled
        });
      }); // Tracking

      var actionName = type + "Table" + (element === 'Table' ? '' : element);
      editor.tracking.onViewportAction(actionName, {
        tableSize: tableSize
      });
    };
  }, [editor, isHeaderEnabled, close]);

  if (isDisabled) {
    return null;
  }

  return /*#__PURE__*/React__default.createElement(f36Components.Menu, {
    placement: "left",
    isOpen: isOpen,
    onOpen: function onOpen() {
      setOpen(true);
    },
    onClose: close
  }, /*#__PURE__*/React__default.createElement(f36Components.Menu.Trigger, null, /*#__PURE__*/React__default.createElement(f36Components.IconButton, {
    size: "small",
    variant: "transparent",
    tabIndex: -1,
    className: styles$j.topRight,
    icon: /*#__PURE__*/React__default.createElement(f36Icons.ChevronDownIcon, null),
    "aria-label": "Open table menu",
    testId: "cf-table-actions-button"
  })), /*#__PURE__*/React__default.createElement(f36Components.Menu.List, null, /*#__PURE__*/React__default.createElement(f36Components.Menu.Item, {
    onClick: action(addRowAbove, 'insert', 'Row'),
    disabled: !canInsertRowAbove
  }, "Add row above"), /*#__PURE__*/React__default.createElement(f36Components.Menu.Item, {
    onClick: action(addRowBelow, 'insert', 'Row')
  }, "Add row below"), /*#__PURE__*/React__default.createElement(f36Components.Menu.Item, {
    onClick: action(addColumnLeft, 'insert', 'Column')
  }, "Add column left"), /*#__PURE__*/React__default.createElement(f36Components.Menu.Item, {
    onClick: action(addColumnRight, 'insert', 'Column')
  }, "Add column right"), /*#__PURE__*/React__default.createElement(f36Components.Menu.Divider, null), /*#__PURE__*/React__default.createElement(f36Components.Menu.Item, {
    onClick: toggleHeader
  }, isHeaderEnabled ? 'Disable table header' : 'Enable table header'), /*#__PURE__*/React__default.createElement(f36Components.Menu.Divider, null), /*#__PURE__*/React__default.createElement(f36Components.Menu.Item, {
    onClick: action(plateTable.deleteRow, 'remove', 'Row')
  }, "Delete row"), /*#__PURE__*/React__default.createElement(f36Components.Menu.Item, {
    onClick: action(plateTable.deleteColumn, 'remove', 'Column')
  }, "Delete column"), /*#__PURE__*/React__default.createElement(f36Components.Menu.Item, {
    onClick: action(plateTable.deleteTable, 'remove', 'Table')
  }, "Delete table")));
};

var _templateObject$7;
var style$2 = /*#__PURE__*/emotion.css(_templateObject$7 || (_templateObject$7 = /*#__PURE__*/_taggedTemplateLiteralLoose(["\n  border: 1px solid ", ";\n  border-collapse: collapse;\n  padding: 10px 12px;\n  min-width: 48px;\n  position: relative;\n  vertical-align: top;\n\n  div:last-child {\n    margin-bottom: 0;\n  }\n"])), tokens.gray400);
var Cell = function Cell(props) {
  var isSelected = Slate.useSelected();
  return /*#__PURE__*/React.createElement("td", _extends({}, props.attributes, props.element.data, {
    className: style$2
  }), isSelected && /*#__PURE__*/React.createElement(TableActions, null), props.children);
};

var _templateObject$8;
var style$3 = /*#__PURE__*/emotion.css(_templateObject$8 || (_templateObject$8 = /*#__PURE__*/_taggedTemplateLiteralLoose(["\n  background-clip: padding-box;\n  background-color: ", ";\n  border: 1px solid ", ";\n  border-collapse: collapse;\n  padding: 10px 12px;\n  font-weight: ", ";\n  text-align: left;\n  min-width: 48px;\n  position: relative;\n\n  div:last-child {\n    margin-bottom: 0;\n  }\n"])), tokens.gray200, tokens.gray400, tokens.fontWeightNormal);
var HeaderCell = function HeaderCell(props) {
  var isSelected = Slate.useSelected();
  return /*#__PURE__*/React.createElement("th", _extends({}, props.attributes, props.element.data, {
    className: style$3
  }), isSelected && /*#__PURE__*/React.createElement(TableActions, null), props.children);
};

var _templateObject$9;
var style$4 = /*#__PURE__*/emotion.css(_templateObject$9 || (_templateObject$9 = /*#__PURE__*/_taggedTemplateLiteralLoose(["\n  border: 1px solid ", ";\n  border-collapse: collapse;\n\n  &:hover td {\n    background-color: transparent !important;\n  }\n"])), tokens.gray400);
var Row = function Row(props) {
  return /*#__PURE__*/React.createElement("tr", _extends({}, props.attributes, {
    className: style$4
  }), props.children);
};

var _templateObject$a;
var style$5 = /*#__PURE__*/emotion.css(_templateObject$a || (_templateObject$a = /*#__PURE__*/_taggedTemplateLiteralLoose(["\n  margin-bottom: 1.5em;\n  border-collapse: collapse;\n  border-radius: 5px;\n  border-style: hidden;\n  box-shadow: 0 0 0 1px ", ";\n  width: 100%;\n  table-layout: fixed;\n  overflow: hidden;\n"])), tokens.gray400);
var Table = function Table(props) {
  return /*#__PURE__*/React.createElement("div", {
    "data-block-type": Contentful.BLOCKS.TABLE
  }, /*#__PURE__*/React.createElement("table", _extends({
    className: style$5
  }, props.attributes), /*#__PURE__*/React.createElement("tbody", null, props.children)));
};

/**
 * Removes table wrappers when pasting a single table cell
 *
 * In Plate/Slate, copying the content of a table cell wraps
 * it in a <table><tr><td>{content}</td></tr></table> even
 * when copying partial cell content.
 *
 * That's really annoying as there is no way to remove the table
 * wrappers in that case.
 */

var trimUnnecessaryTableWrapper = function trimUnnecessaryTableWrapper(node) {
  var _node$children, _row$children;

  if (!isElement(node)) {
    return [node];
  } // must be a table with a single row


  if (node.type !== Contentful.BLOCKS.TABLE || ((_node$children = node.children) == null ? void 0 : _node$children.length) !== 1) {
    return [node];
  }

  var row = node.children[0]; // the row must contain a single cell

  if ((row == null ? void 0 : (_row$children = row.children) == null ? void 0 : _row$children.length) !== 1) {
    return [node];
  }

  var cell = row.children[0];
  return cell.children;
};

var insertTableFragment = function insertTableFragment(editor) {
  var insertFragment = editor.insertFragment;
  return function (fragments) {
    var _editor$selection;

    if (!editor.selection) {
      return;
    }

    fragments = fragments.flatMap(trimUnnecessaryTableWrapper); // We need to make sure we have a new, empty and clean paragraph in order to paste tables as-is due to how Slate behaves
    // More info: https://github.com/ianstormtaylor/slate/pull/4489 and https://github.com/ianstormtaylor/slate/issues/4542

    var isInsertingTable = fragments.some(function (fragment) {
      return isTable(fragment);
    });
    var isTableFirstFragment = fragments.findIndex(function (fragment) {
      return isTable(fragment);
    }) === 0;
    var currentLineHasText = getText(editor, (_editor$selection = editor.selection) == null ? void 0 : _editor$selection.focus.path) !== '';

    if (isInsertingTable && isTableFirstFragment && currentLineHasText) {
      insertEmptyParagraph(editor);
    }

    return insertFragment(fragments);
  };
};

var onKeyDownTable = function onKeyDownTable(editor, plugin) {
  var defaultHandler = plateTable.onKeyDownTable(editor, plugin);
  return function (event) {
    // This fixes `Cannot resolve a Slate point from DOM point:
    // [object HTMLDivElement]` when typing while the cursor is before table
    var windowSelection = window.getSelection();

    if (windowSelection) {
      var _windowSelection$anch, _windowSelection$anch2;

      // @ts-expect-error
      // this attribute comes from `plugins/Table/components/Table.tsx`
      var blockType = (_windowSelection$anch = windowSelection.anchorNode.attributes) == null ? void 0 : (_windowSelection$anch2 = _windowSelection$anch['data-block-type']) == null ? void 0 : _windowSelection$anch2.value;
      var isBeforeTable = blockType === Contentful.BLOCKS.TABLE;

      if (isBeforeTable) {
        if (event.key === 'Enter') {
          var above = getAboveNode(editor, {
            match: {
              type: Contentful.BLOCKS.TABLE
            }
          });
          if (!above) return;
          var tablePath = above[1];
          insertEmptyParagraph(editor, {
            at: tablePath,
            select: true
          });
        }

        event.preventDefault();
        event.stopPropagation();
        return;
      }
    } // Pressing Tab on the last cell creates a new row
    // Otherwise, jumping between cells is handled in the defaultKeyDownTable


    if (event.key === 'Tab' && !event.shiftKey) {
      event.preventDefault();
      var entry = plateTable.getTableEntries(editor, {});

      if (entry) {
        var table = entry.table,
            row = entry.row,
            cell = entry.cell;
        var isLastCell = isLastChildPath(row, cell[1]);
        var isLastRow = isLastChildPath(table, row[1]);

        if (isLastRow && isLastCell) {
          addRowBelow(editor); // skip default handler

          return;
        } else {
          defaultHandler(event);
        }
      }
    }

    if (event.key === 'Escape') {
      blurEditor(editor);
    }
  };
};

var _extends2, _extends4, _inlines;
var inlines = /*#__PURE__*/Object.values(Contentful.INLINES).map(function (type) {
  return {
    type: type
  };
});
var schema = {
  document: {
    nodes: [{
      types: /*#__PURE__*/Contentful.TOP_LEVEL_BLOCKS.map(function (type) {
        return {
          type: type
        };
      })
    }]
  },
  blocks: /*#__PURE__*/_extends((_extends2 = {}, _extends2[Contentful.BLOCKS.PARAGRAPH] = {
    nodes: [{
      match: /*#__PURE__*/[].concat(inlines, [{
        object: 'text'
      }])
    }]
  }, _extends2[Contentful.BLOCKS.HEADING_1] = {
    nodes: [{
      match: /*#__PURE__*/[].concat(inlines, [{
        object: 'text'
      }])
    }]
  }, _extends2[Contentful.BLOCKS.HEADING_2] = {
    nodes: [{
      match: /*#__PURE__*/[].concat(inlines, [{
        object: 'text'
      }])
    }]
  }, _extends2[Contentful.BLOCKS.HEADING_3] = {
    nodes: [{
      match: /*#__PURE__*/[].concat(inlines, [{
        object: 'text'
      }])
    }]
  }, _extends2[Contentful.BLOCKS.HEADING_4] = {
    nodes: [{
      match: /*#__PURE__*/[].concat(inlines, [{
        object: 'text'
      }])
    }]
  }, _extends2[Contentful.BLOCKS.HEADING_5] = {
    nodes: [{
      match: /*#__PURE__*/[].concat(inlines, [{
        object: 'text'
      }])
    }]
  }, _extends2[Contentful.BLOCKS.HEADING_6] = {
    nodes: [{
      match: /*#__PURE__*/[].concat(inlines, [{
        object: 'text'
      }])
    }]
  }, _extends2), /*#__PURE__*/Contentful.VOID_BLOCKS.reduce(function (blocks, nodeType) {
    var _extends3;

    return _extends({}, blocks, (_extends3 = {}, _extends3[nodeType] = {
      isVoid: true
    }, _extends3));
  }, {}), (_extends4 = {}, _extends4[Contentful.BLOCKS.QUOTE] = {
    nodes: [{
      match: [/*#__PURE__*/Contentful.CONTAINERS[Contentful.BLOCKS.QUOTE].map(function (type) {
        return {
          type: type
        };
      })],
      min: 1
    }],
    normalize: function normalize(editor, error) {
      if (error.code === 'child_type_invalid') {
        return editor.unwrapBlockByKey(error.node.key, Contentful.BLOCKS.QUOTE);
      }
    }
  }, _extends4)),
  inlines: (_inlines = {}, _inlines[Contentful.INLINES.HYPERLINK] = {
    nodes: [{
      match: [{
        object: 'text'
      }]
    }]
  }, _inlines[Contentful.INLINES.ENTRY_HYPERLINK] = {
    nodes: [{
      match: [{
        object: 'text'
      }]
    }]
  }, _inlines[Contentful.INLINES.ASSET_HYPERLINK] = {
    nodes: [{
      match: [{
        object: 'text'
      }]
    }]
  }, _inlines[Contentful.INLINES.EMBEDDED_ENTRY] = {
    isVoid: true
  }, _inlines)
};

function getCharacterCount(editor) {
  var document = contentfulSlateJSAdapter.toContentfulDocument({
    document: editor.children,
    schema: schema
  });
  return richTextPlainTextRenderer.documentToPlainTextString(document).length;
}

var actionOrigin = {
  TOOLBAR: 'toolbar-icon',
  SHORTCUT: 'shortcut',
  VIEWPORT: 'viewport-interaction',
  COMMAND_PALETTE: 'command-palette'
};
function getPastingSource(data) {
  var textHtml = data.getData('text/html');
  var doc = new DOMParser().parseFromString(textHtml, 'text/html');

  if (doc.querySelector('[id*="docs-internal-guid"]')) {
    return 'Google Docs';
  }

  if (doc.querySelector('google-sheets-html-origin') || doc.querySelector('[data-sheets-value]')) {
    return 'Google Spreadsheets';
  }

  if (doc.querySelector('meta[content*="Microsoft Excel"]')) {
    return 'Microsoft Excel';
  }

  if (doc.querySelector('meta[content*="Microsoft Word"]')) {
    return 'Microsoft Word';
  } // TODO: MS Word Online doesn't give us specific tags, we might need to have a closer look at its tracking result since we are using generic values to identify it


  if (doc.querySelector('[style*="Arial_MSFontService"]') && (doc.querySelector('.TextRun') || doc.querySelector('.OutlineElement'))) {
    return 'Microsoft Word Online';
  }

  if (doc.querySelector('meta[content="Cocoa HTML Writer"]')) {
    return 'Apple Notes';
  }

  if (doc.querySelector('[style*="Slack-Lato, Slack-Fractions"]')) {
    return 'Slack';
  }

  return 'Unknown';
}
var createTrackingPlugin = function createTrackingPlugin(onAction) {
  var trackingActions = {
    onViewportAction: function onViewportAction(actionName, data) {
      if (data === void 0) {
        data = {};
      }

      return onAction(actionName, _extends({
        origin: actionOrigin.VIEWPORT
      }, data));
    },
    onShortcutAction: function onShortcutAction(actionName, data) {
      if (data === void 0) {
        data = {};
      }

      return onAction(actionName, _extends({
        origin: actionOrigin.SHORTCUT
      }, data));
    },
    onToolbarAction: function onToolbarAction(actionName, data) {
      if (data === void 0) {
        data = {};
      }

      return onAction(actionName, _extends({
        origin: actionOrigin.TOOLBAR
      }, data));
    },
    onCommandPaletteAction: function onCommandPaletteAction(actionName, data) {
      if (data === void 0) {
        data = {};
      }

      return onAction(actionName, _extends({
        origin: actionOrigin.COMMAND_PALETTE
      }, data));
    }
  };
  return {
    key: 'TrackingPlugin',
    withOverrides: function withOverrides(editor) {
      var insertData = editor.insertData;
      editor.tracking = trackingActions;

      editor.insertData = function (data) {
        var isCopyAndPaste = data.types.length !== 0;

        if (isCopyAndPaste) {
          var _window$getSelection;

          var characterCountSelection = (_window$getSelection = window.getSelection()) == null ? void 0 : _window$getSelection.toString().length;
          var characterCountBefore = getCharacterCount(editor);
          setTimeout(function () {
            var characterCountAfter = getCharacterCount(editor);
            trackingActions.onShortcutAction('paste', {
              characterCountAfter: characterCountAfter,
              characterCountBefore: characterCountBefore,
              characterCountSelection: characterCountSelection,
              source: getPastingSource(data)
            });
          });
        }

        insertData(data);
      };

      return editor;
    }
  };
};

function hasTables(nodes) {
  return nodes.some(function (_ref) {
    var type = _ref.type;
    return type === Contentful.BLOCKS.TABLE;
  });
}

var isTableHeaderCell = function isTableHeaderCell(_ref2) {
  var type = _ref2.type;
  return type === Contentful.BLOCKS.TABLE_HEADER_CELL;
};

function hasHeadersOutsideFirstRow(nodes) {
  return nodes.filter(function (_ref3) {
    var type = _ref3.type;
    return type === Contentful.BLOCKS.TABLE;
  }).flatMap(function (_ref4) {
    var children = _ref4.children;
    return children.slice(1);
  }).some(function (_ref5) {
    var children = _ref5.children;
    return children.some(isTableHeaderCell);
  });
}

function addTableTrackingEvents(editor) {
  var insertData = editor.insertData;

  editor.insertData = function (data) {
    var html = data.getData('text/html');

    if (html) {
      var markupBefore = editor.children;
      insertData(data);
      var markupAfter = editor.children;
      setTimeout(function () {
        if (hasTables(markupBefore)) return;

        if (hasTables(markupAfter)) {
          editor.tracking.onViewportAction('paste', {
            tablePasted: true,
            source: getPastingSource(data),
            hasHeadersOutsideFirstRow: hasHeadersOutsideFirstRow(markupAfter)
          });
        }
      }, 1);
    } else {
      insertData(data);
    }
  };
}
var withInvalidCellChildrenTracking = function withInvalidCellChildrenTracking(transformer) {
  return function (editor, childEntry) {
    var node = childEntry[0];

    if (isElement(node)) {
      var _editor$tracking;

      (_editor$tracking = editor.tracking) == null ? void 0 : _editor$tracking.onViewportAction('invalidTablePaste', {
        nodeType: node.type
      });
    }

    return transformer(editor, childEntry);
  };
};

var createTablePlugin = function createTablePlugin() {
  var _overrideByKey;

  return plateTable.createTablePlugin({
    type: Contentful.BLOCKS.TABLE,
    handlers: {
      // @ts-expect-error
      onKeyDown: onKeyDownTable
    },
    withOverrides: function withOverrides(editor, plugin) {
      var normalizeNode = editor.normalizeNode; // injects important fixes from plate's original table plugin

      plateTable.withTable(editor, plugin); // Resets all normalization rules added by @udecode/plate-table as
      // they conflict with our own

      editor.normalizeNode = normalizeNode;
      addTableTrackingEvents(editor);
      editor.insertFragment = insertTableFragment(editor);
      return editor;
    },
    overrideByKey: (_overrideByKey = {}, _overrideByKey[plateTable.ELEMENT_TABLE] = {
      type: Contentful.BLOCKS.TABLE,
      component: Table,
      normalizer: [{
        validNode: isNotEmpty
      }, {
        // Move to root level unless nested
        validNode: function validNode(editor, _ref) {
          var path = _ref[1];
          // Nested tables are handled by another normalization
          // rule in a the table cell level
          var isNestedTable = !!getBlockAbove(editor, {
            at: path,
            match: {
              type: [Contentful.BLOCKS.TABLE_CELL, Contentful.BLOCKS.TABLE_HEADER_CELL]
            }
          });
          return isRootLevel(path) || isNestedTable;
        },
        transform: transformLift
      }, {
        validChildren: Contentful.CONTAINERS[Contentful.BLOCKS.TABLE]
      }]
    }, _overrideByKey[plateTable.ELEMENT_TR] = {
      type: Contentful.BLOCKS.TABLE_ROW,
      component: Row,
      normalizer: [{
        validChildren: Contentful.CONTAINERS[Contentful.BLOCKS.TABLE_ROW],
        transform: transformWrapIn(Contentful.BLOCKS.TABLE_CELL)
      }, {
        // Remove empty rows
        validNode: isNotEmpty
      }, {
        // Parent must be a table
        validNode: function validNode(editor, _ref2) {
          var _getParentNode;

          var path = _ref2[1];
          var parent = (_getParentNode = getParentNode(editor, path)) == null ? void 0 : _getParentNode[0];
          return parent && parent.type === Contentful.BLOCKS.TABLE;
        },
        transform: transformWrapIn(Contentful.BLOCKS.TABLE)
      }, {
        // ensure consistent number of cells in each row
        validNode: function validNode(editor, entry) {
          return getNoOfMissingTableCellsInRow(editor, entry) === 0;
        },
        transform: function transform(editor, entry) {
          var howMany = getNoOfMissingTableCellsInRow(editor, entry);
          var at = getNextPath(getLastChildPath(entry));
          insertNodes(editor, createEmptyTableCells(howMany), {
            at: at
          });
        }
      }]
    }, _overrideByKey[plateTable.ELEMENT_TH] = {
      type: Contentful.BLOCKS.TABLE_HEADER_CELL,
      component: HeaderCell,
      normalizer: [{
        validChildren: Contentful.CONTAINERS[Contentful.BLOCKS.TABLE_HEADER_CELL],
        transform: withInvalidCellChildrenTracking(transformParagraphs)
      }]
    }, _overrideByKey[plateTable.ELEMENT_TD] = {
      type: Contentful.BLOCKS.TABLE_CELL,
      component: Cell,
      normalizer: [{
        validChildren: Contentful.CONTAINERS[Contentful.BLOCKS.TABLE_CELL],
        transform: withInvalidCellChildrenTracking(transformParagraphs)
      }]
    }, _overrideByKey)
  });
};

function ToolbarTableButton(props) {
  var editor = useContentfulEditor();
  var isActive = editor && isTableActive(editor);

  function handleClick() {
    return _handleClick.apply(this, arguments);
  }

  function _handleClick() {
    _handleClick = _asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee() {
      return runtime_1.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              if (editor) {
                _context.next = 2;
                break;
              }

              return _context.abrupt("return");

            case 2:
              editor.tracking.onToolbarAction('insertTable');
              insertTableAndFocusFirstCell(editor);
              focus(editor);

            case 5:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));
    return _handleClick.apply(this, arguments);
  }

  if (!editor) return null;
  return /*#__PURE__*/React.createElement(ToolbarButton, {
    title: "Table",
    testId: "table-toolbar-button",
    onClick: handleClick,
    // TODO: active state looks off since the button will be disabled. Do we still need it?
    isActive: !!isActive,
    isDisabled: props.isDisabled
  }, /*#__PURE__*/React.createElement(f36Icons.TableIcon, null));
}

function createTextPlugin(restrictedMarks) {
  if (restrictedMarks === void 0) {
    restrictedMarks = [];
  }

  return {
    key: 'TextPlugin',
    handlers: {
      // Triple selection in a non-Firefox browser undesirably selects
      // the start of the next block. Editor.unhangRange helps removing
      // the extra block at the end.
      onMouseUp: function onMouseUp(editor) {
        return function () {
          if (!editor.selection) {
            return;
          }

          setSelection(editor, unhangRange(editor, editor.selection));
        };
      }
    },
    withOverrides: function withOverrides(editor) {
      // Reverts the change made upstream that caused the cursor
      // to be trapped inside inline elements.
      //
      // Reverts https://github.com/ianstormtaylor/slate/pull/4578/
      // Related https://github.com/ianstormtaylor/slate/issues/4704
      var insertText = editor.insertText;

      editor.insertText = function (text) {
        var selection = editor.selection; // If the cursor is at the end of an inline, move it outside
        // before inserting

        if (selection && isRangeCollapsed(selection)) {
          var _getAboveNode;

          var inlinePath = (_getAboveNode = getAboveNode(editor, {
            match: function match(n) {
              return isInline(editor, n);
            },
            mode: 'highest'
          })) == null ? void 0 : _getAboveNode[1];

          if (inlinePath && isEndPoint(editor, selection.anchor, inlinePath)) {
            var point = getPointAfter(editor, inlinePath);
            setSelection(editor, {
              anchor: point,
              focus: point
            });
          }
        }

        return insertText(text);
      }; // When pressing delete instead of backspace


      var deleteForward = editor.deleteForward,
          deleteBackward = editor.deleteBackward;

      editor.deleteBackward = function (unit) {
        deleteEmptyParagraph(unit, editor, deleteBackward);
      };

      editor.deleteForward = function (unit) {
        deleteEmptyParagraph(unit, editor, deleteForward);
      };

      fixPasteAsPlainText(editor);
      return editor;
    },
    normalizer: [{
      match: isText,
      transform: function transform(editor, _ref) {
        var path = _ref[1];
        unsetNodes(editor, restrictedMarks, {
          at: path
        });
      },
      validNode: function validNode(_editor, _ref2) {
        var node = _ref2[0];
        return !restrictedMarks.some(function (mark) {
          return mark in node;
        });
      }
    }]
  };
}

function deleteEmptyParagraph(unit, editor, deleteFunction) {
  var entry = getAboveNode(editor, {
    match: {
      type: Contentful.TEXT_CONTAINERS
    }
  });

  if (entry) {
    var paragraphOrHeading = entry[0],
        path = entry[1];
    var isTextEmpty = isAncestorEmpty(editor, paragraphOrHeading); // We ignore paragraphs/headings that are children of ul, ol, blockquote, tables, etc

    var isRootLevel = path.length === 1;
    var hasSiblings = editor.children.length > 1; // prevent editor from losing focus

    if (isTextEmpty && isRootLevel && hasSiblings) {
      removeNodes(editor, {
        at: path
      });
      var prevNode = getPointBefore(editor, editor.selection, {
        unit: unit
      });

      if (prevNode) {
        var _getNodeEntries = getNodeEntries(editor, {
          match: function match(node) {
            return queryNode([node, prevNode.path], {
              allow: [Contentful.BLOCKS.EMBEDDED_ASSET, Contentful.BLOCKS.EMBEDDED_ENTRY, Contentful.BLOCKS.HR]
            });
          },
          at: prevNode
        }),
            prevCell = _getNodeEntries[0];

        if (prevCell) {
          select(editor, prevNode);
        }
      }
    } else {
      deleteFunction(unit);
    }
  } else {
    deleteFunction(unit);
  }
}
/**
 * To be compatible with the old behavior we need to treat each 2 consecutive
 * line breaks as a new paragraph when pasting as plain text (also known as
 * paste and match style in macOS)
 */


function fixPasteAsPlainText(editor) {
  editor.insertTextData = function (data) {
    var text = data.getData('text/plain');

    if (!text) {
      return false;
    }

    var lines = text.split(/\n{2}/);
    var split = false;

    for (var _iterator = _createForOfIteratorHelperLoose(lines), _step; !(_step = _iterator()).done;) {
      var line = _step.value;

      // empty lines
      if (/^(\r\n?|\n)$/.test(line)) {
        continue;
      }

      if (split) {
        splitNodes(editor, {
          always: true
        });
      }

      editor.insertText(line);
      split = true;
    }

    return true;
  };
}

var createTrailingParagraphPlugin = function createTrailingParagraphPlugin() {
  return plateTrailingBlock.createTrailingBlockPlugin({
    options: {
      type: Contentful.BLOCKS.PARAGRAPH,
      level: 0
    }
  });
};

var createVoidsPlugin = function createVoidsPlugin() {
  return {
    key: 'VoidsPlugin',
    exitBreak: [{
      // Inserts a new paragraph *before* a void element if it's the very first
      // node on the editor
      hotkey: 'enter',
      before: true,
      query: {
        filter: function filter(_ref) {
          var node = _ref[0],
              path = _ref[1];
          return isRootLevel(path) && isFirstChildPath(path) && !!node.isVoid;
        }
      }
    }, {
      // Inserts a new paragraph on enter when a void element is focused
      hotkey: 'enter',
      // exploit the internal use of Array.slice(0, level + 1) by the exitBreak plugin
      // to stay in the parent element
      level: -2,
      query: {
        filter: function filter(_ref2) {
          var node = _ref2[0],
              path = _ref2[1];
          return !(isRootLevel(path) && isFirstChildPath(path)) && !!node.isVoid;
        }
      }
    }]
  };
};

var getPlugins = function getPlugins(sdk, onAction, restrictedMarks) {
  return [// AST must come after the HTML deserializer
  p.createDeserializeHtmlPlugin(), p.createDeserializeAstPlugin(), plateSerializerDocx.createDeserializeDocxPlugin(), // Tracking - This should come first so all plugins below will have access to `editor.tracking`
  createTrackingPlugin(onAction), // Global / Global shortcuts
  createDragAndDropPlugin()].concat(Object.values(isCommandPromptPluginEnabled(sdk)).some(Boolean) ? [createCommandPalettePlugin()] : [], [// Block Elements
  createParagraphPlugin(), createListPlugin(), createHrPlugin(), createHeadingPlugin(), createQuotePlugin(), createTablePlugin(), createEmbeddedEntryBlockPlugin(sdk), createEmbeddedAssetBlockPlugin(sdk), // Inline elements
  createHyperlinkPlugin(sdk), createEmbeddedEntityInlinePlugin(sdk), // Marks
  createMarksPlugin(), // Other
  createTrailingParagraphPlugin(), createTextPlugin(restrictedMarks), createVoidsPlugin(), createSelectOnBackspacePlugin(), // Pasting content from other sources
  createPasteHTMLPlugin(), // These plugins drive their configurations from the list of plugins
  // above. They MUST come last.
  createSoftBreakPlugin(), createExitBreakPlugin(), createResetNodePlugin(), createNormalizerPlugin()]);
};
var disableCorePlugins = {
  // Temporarily until the upstream issue is fixed.
  // See: https://github.com/udecode/plate/issues/1329#issuecomment-1005935946
  deserializeAst: true,
  deserializeHtml: true,
  // Note: Enabled by default since v9.0.0 but it causes Cypress's
  // .click() command to fail
  eventEditor: true
};

var isTextElement = function isTextElement(node) {
  return 'text' in node;
};
/**
 * Ensures all nodes have a child leaf text element. This should be handled by
 * Slate but its behavior has proven to be buggy and unpredictable.
 */


function sanitizeIncomingSlateDoc(nodes) {
  if (nodes === void 0) {
    nodes = [];
  }

  return nodes.map(function (node) {
    var _node$children;

    if (isTextElement(node)) {
      return node;
    }

    if (((_node$children = node.children) == null ? void 0 : _node$children.length) === 0) {
      return _extends({}, node, {
        children: [{
          text: '',
          data: {}
        }]
      });
    }

    return _extends({}, node, {
      children: sanitizeIncomingSlateDoc(node == null ? void 0 : node.children)
    });
  });
}

/**
 * For legacy reasons, a document may not have any content at all
 * e.g:
 *
 * {nodeType: document, data: {}, content: []}
 *
 * Rendering such document will break the Slate editor
 */

var hasContent = function hasContent(doc) {
  return ((doc == null ? void 0 : doc.content) || []).length > 0;
};
/*
 Plate api doesn't allow to modify (easily) the editor value programmatically
 after the editor instance is created

 This function is inspired to https://github.com/udecode/plate/issues/1269#issuecomment-1057643622
 */

var setEditorContent = function setEditorContent(editor, nodes) {
  // Replaces editor content while keeping change history
  withoutNormalizing(editor, function () {
    var children = [].concat(editor.children);
    children.forEach(function (node) {
      return editor.apply({
        type: 'remove_node',
        path: [0],
        node: node
      });
    });

    if (nodes) {
      var nodesArray = isNode(nodes) ? [nodes] : nodes;
      nodesArray.forEach(function (node, i) {
        editor.apply({
          type: 'insert_node',
          path: [i],
          node: node
        });
      });
    }

    var point = getEndPoint(editor, []);

    if (point) {
      select(editor, point);
    }
  });
};
/**
 * Converts a Contentful rich text document to the corresponding slate editor
 * value
 */

var documentToEditorValue = function documentToEditorValue(doc) {
  var slateDoc = contentfulSlateJSAdapter.toSlatejsDocument({
    document: hasContent(doc) ? doc : Contentful.EMPTY_DOCUMENT,
    // TODO: get rid of schema, https://github.com/contentful/field-editors/pull/1065#discussion_r826723248
    schema: schema
  });
  return sanitizeIncomingSlateDoc(slateDoc);
};
var normalizeEditorValue = function normalizeEditorValue(value, options) {
  var editor = createPlateEditor(options);
  editor.children = value;
  normalize(editor, {
    force: true
  });
  return editor.children;
};

var STYLE_EDITOR_BORDER = "1px solid " + tokens.gray400;
var styles$k = {
  root: /*#__PURE__*/emotion.css({
    position: 'relative'
  }),
  editor: /*#__PURE__*/emotion.css({
    borderRadius: "0 0 " + tokens.borderRadiusMedium + " " + tokens.borderRadiusMedium,
    border: STYLE_EDITOR_BORDER,
    borderTop: 0,
    padding: '20px',
    fontSize: tokens.spacingM,
    fontFamily: tokens.fontStackPrimary,
    minHeight: '400px',
    background: tokens.colorWhite,
    outline: 'none',
    whiteSpace: 'pre-wrap',
    overflowWrap: 'break-word',
    webkitUserModify: 'read-write-plaintext-only',
    a: {
      span: {
        cursor: 'not-allowed',
        '&:hover': {
          cursor: 'not-allowed'
        }
      }
    },
    // We need to reset LIC style due to conflicts between PARAGRAPH styles
    'ul > li > div': {
      margin: 0
    }
  }),
  hiddenToolbar: /*#__PURE__*/emotion.css({
    borderTop: STYLE_EDITOR_BORDER
  }),
  enabled: /*#__PURE__*/emotion.css({
    background: tokens.colorWhite,
    a: {
      span: {
        cursor: 'pointer',
        '&:hover': {
          cursor: 'pointer'
        }
      }
    }
  }),
  disabled: /*#__PURE__*/emotion.css({
    background: tokens.gray100,
    cursor: 'not-allowed'
  })
};

function EmbeddedEntityDropdownButton(_ref) {
  var children = _ref.children,
      isDisabled = _ref.isDisabled,
      isOpen = _ref.isOpen,
      onClose = _ref.onClose,
      onToggle = _ref.onToggle;
  return /*#__PURE__*/React.createElement(f36Components.Menu, {
    placement: "bottom-end",
    isOpen: isOpen,
    onClose: onClose,
    onOpen: onToggle
  }, /*#__PURE__*/React.createElement(f36Components.Menu.Trigger, null, /*#__PURE__*/React.createElement(f36Components.Button, {
    endIcon: /*#__PURE__*/React.createElement(f36Icons.ChevronDownIcon, null),
    testId: "toolbar-entity-dropdown-toggle",
    variant: "secondary",
    size: "small",
    startIcon: /*#__PURE__*/React.createElement(f36Icons.PlusIcon, null),
    isDisabled: isDisabled
  }, "Embed")), /*#__PURE__*/React.createElement(f36Components.Menu.List, {
    className: "toolbar-entity-dropdown-list"
  }, children));
}

var EmbedEntityWidget = function EmbedEntityWidget(_ref) {
  var isDisabled = _ref.isDisabled,
      canInsertBlocks = _ref.canInsertBlocks;
  var sdk = useSdkContext();
  var editor = useContentfulEditor();

  var _useState = React.useState(false),
      isEmbedDropdownOpen = _useState[0],
      setEmbedDropdownOpen = _useState[1];

  var onCloseEntityDropdown = function onCloseEntityDropdown() {
    return setEmbedDropdownOpen(false);
  };

  var onToggleEntityDropdown = function onToggleEntityDropdown() {
    return setEmbedDropdownOpen(!isEmbedDropdownOpen);
  };

  var inlineEntryEmbedEnabled = isNodeTypeEnabled(sdk.field, Contentful.INLINES.EMBEDDED_ENTRY);
  var blockEntryEmbedEnabled = isNodeTypeEnabled(sdk.field, Contentful.BLOCKS.EMBEDDED_ENTRY) && canInsertBlocks; // Removed access check following https://contentful.atlassian.net/browse/DANTE-486
  // TODO: refine permissions check in order to account for tags in rules and then readd access.can('read', 'Asset')

  var blockAssetEmbedEnabled = isNodeTypeEnabled(sdk.field, Contentful.BLOCKS.EMBEDDED_ASSET) && canInsertBlocks;
  var actions = /*#__PURE__*/React__default.createElement(React__default.Fragment, null, blockEntryEmbedEnabled && /*#__PURE__*/React__default.createElement(EmbeddedEntityBlockToolbarIcon, {
    isDisabled: !!isDisabled,
    nodeType: Contentful.BLOCKS.EMBEDDED_ENTRY,
    onClose: onCloseEntityDropdown
  }), inlineEntryEmbedEnabled && /*#__PURE__*/React__default.createElement(ToolbarEmbeddedEntityInlineButton, {
    isDisabled: !!isDisabled || isLinkActive(editor),
    onClose: onCloseEntityDropdown
  }), blockAssetEmbedEnabled && /*#__PURE__*/React__default.createElement(EmbeddedEntityBlockToolbarIcon, {
    isDisabled: !!isDisabled,
    nodeType: Contentful.BLOCKS.EMBEDDED_ASSET,
    onClose: onCloseEntityDropdown
  }));
  var showEmbedButton = blockEntryEmbedEnabled || inlineEntryEmbedEnabled || blockAssetEmbedEnabled;
  return showEmbedButton ? /*#__PURE__*/React__default.createElement(EmbeddedEntityDropdownButton, {
    isDisabled: isDisabled,
    onClose: onCloseEntityDropdown,
    onToggle: onToggleEntityDropdown,
    isOpen: isEmbedDropdownOpen
  }, actions) : null;
};

var styles$l = {
  toolbar: /*#__PURE__*/emotion.css({
    border: "1px solid " + tokens.gray400,
    backgroundColor: tokens.gray100,
    padding: tokens.spacingXs,
    borderRadius: tokens.borderRadiusMedium + " " + tokens.borderRadiusMedium + " 0 0"
  }),
  toolbarBtn: /*#__PURE__*/emotion.css({
    height: '30px',
    width: '30px',
    marginLeft: tokens.spacing2Xs,
    marginRight: tokens.spacing2Xs
  }),
  divider: /*#__PURE__*/emotion.css({
    display: 'inline-block',
    height: '21px',
    width: '1px',
    background: tokens.gray300,
    margin: "0 " + tokens.spacing2Xs
  }),
  embedActionsWrapper: /*#__PURE__*/emotion.css({
    display: ['-webkit-box', '-ms-flexbox', 'flex'],
    webkitAlignSelf: 'flex-start',
    alignSelf: 'flex-start',
    msFlexItemAlign: 'start',
    marginLeft: 'auto'
  }),
  formattingOptionsWrapper: /*#__PURE__*/emotion.css({
    display: ['-webkit-box', '-ms-flexbox', 'flex'],
    msFlexAlign: 'center',
    webkitBoxAlign: 'center',
    alignItems: 'center',
    msFlexWrap: 'wrap',
    flexWrap: 'wrap',
    marginRight: '20px'
  })
};

var Dropdown = function Dropdown(_ref) {
  var sdk = _ref.sdk,
      isDisabled = _ref.isDisabled;
  var editor = useContentfulEditor();
  var isActive = editor && (isMarkActive(editor, Contentful.MARKS.SUPERSCRIPT) || isMarkActive(editor, Contentful.MARKS.SUBSCRIPT) || isMarkActive(editor, Contentful.MARKS.CODE));
  return /*#__PURE__*/React__default.createElement(f36Components.Menu, null, /*#__PURE__*/React__default.createElement(f36Components.Menu.Trigger, null, /*#__PURE__*/React__default.createElement("span", null, /*#__PURE__*/React__default.createElement(f36Components.IconButton, {
    size: "small",
    className: styles$l.toolbarBtn,
    variant: isActive ? 'secondary' : 'transparent',
    icon: /*#__PURE__*/React__default.createElement(f36Icons.MoreHorizontalIcon, null),
    "aria-label": "toggle menu",
    isDisabled: isDisabled,
    testId: "dropdown-toolbar-button"
  }))), /*#__PURE__*/React__default.createElement(f36Components.Menu.List, null, isMarkEnabled(sdk.field, Contentful.MARKS.SUPERSCRIPT) && /*#__PURE__*/React__default.createElement(ToolbarDropdownSuperscriptButton, {
    isDisabled: isDisabled
  }), isMarkEnabled(sdk.field, Contentful.MARKS.SUBSCRIPT) && /*#__PURE__*/React__default.createElement(ToolbarDropdownSubscriptButton, {
    isDisabled: isDisabled
  }), isMarkEnabled(sdk.field, Contentful.MARKS.CODE) && /*#__PURE__*/React__default.createElement(ToolbarDropdownCodeButton, {
    isDisabled: isDisabled
  })));
};

var Toolbar = function Toolbar(_ref2) {
  var isDisabled = _ref2.isDisabled;
  var sdk = useSdkContext();
  var editor = useContentfulEditor();
  var canInsertBlocks = !isNodeTypeSelected(editor, Contentful.BLOCKS.TABLE);
  var validationInfo = React__default.useMemo(function () {
    return getValidationInfo(sdk.field);
  }, [sdk.field]);
  var isListSelected = isNodeTypeSelected(editor, Contentful.BLOCKS.UL_LIST) || isNodeTypeSelected(editor, Contentful.BLOCKS.OL_LIST);
  var isBlockquoteSelected = isNodeTypeSelected(editor, Contentful.BLOCKS.QUOTE);
  var shouldDisableTables = isDisabled || !canInsertBlocks || isListSelected || isBlockquoteSelected; // We only show the dropdown when: whenever at least bold , italic and underline are available; If nothing that would go inside the dropdown is available, we hide it

  var boldItalicUnderlineAvailable = isMarkEnabled(sdk.field, Contentful.MARKS.BOLD) || isMarkEnabled(sdk.field, Contentful.MARKS.ITALIC) || isMarkEnabled(sdk.field, Contentful.MARKS.UNDERLINE);
  var dropdownItemsAvailable = isMarkEnabled(sdk.field, Contentful.MARKS.SUPERSCRIPT) || isMarkEnabled(sdk.field, Contentful.MARKS.SUBSCRIPT) || isMarkEnabled(sdk.field, Contentful.MARKS.CODE);
  var shouldShowDropdown = boldItalicUnderlineAvailable && dropdownItemsAvailable;
  return /*#__PURE__*/React__default.createElement(f36Components.Flex, {
    testId: "toolbar",
    className: styles$l.toolbar,
    alignItems: "center"
  }, /*#__PURE__*/React__default.createElement("div", {
    className: styles$l.formattingOptionsWrapper
  }, /*#__PURE__*/React__default.createElement(ToolbarHeadingButton, {
    isDisabled: isDisabled || !canInsertBlocks
  }), validationInfo.isAnyMarkEnabled && /*#__PURE__*/React__default.createElement("span", {
    className: styles$l.divider
  }), isMarkEnabled(sdk.field, Contentful.MARKS.BOLD) && /*#__PURE__*/React__default.createElement(ToolbarBoldButton, {
    isDisabled: isDisabled
  }), isMarkEnabled(sdk.field, Contentful.MARKS.ITALIC) && /*#__PURE__*/React__default.createElement(ToolbarItalicButton, {
    isDisabled: isDisabled
  }), isMarkEnabled(sdk.field, Contentful.MARKS.UNDERLINE) && /*#__PURE__*/React__default.createElement(ToolbarUnderlineButton, {
    isDisabled: isDisabled
  }), !boldItalicUnderlineAvailable && isMarkEnabled(sdk.field, Contentful.MARKS.SUPERSCRIPT) && /*#__PURE__*/React__default.createElement(ToolbarSuperscriptButton, {
    isDisabled: isDisabled
  }), !boldItalicUnderlineAvailable && isMarkEnabled(sdk.field, Contentful.MARKS.SUBSCRIPT) && /*#__PURE__*/React__default.createElement(ToolbarSubscriptButton, {
    isDisabled: isDisabled
  }), !boldItalicUnderlineAvailable && isMarkEnabled(sdk.field, Contentful.MARKS.CODE) && /*#__PURE__*/React__default.createElement(ToolbarCodeButton, {
    isDisabled: isDisabled
  }), shouldShowDropdown && /*#__PURE__*/React__default.createElement(Dropdown, {
    sdk: sdk,
    isDisabled: isDisabled
  }), validationInfo.isAnyHyperlinkEnabled && /*#__PURE__*/React__default.createElement(React__default.Fragment, null, /*#__PURE__*/React__default.createElement("span", {
    className: styles$l.divider
  }), /*#__PURE__*/React__default.createElement(ToolbarHyperlinkButton, {
    isDisabled: isDisabled
  })), validationInfo.isAnyBlockFormattingEnabled && /*#__PURE__*/React__default.createElement("span", {
    className: styles$l.divider
  }), /*#__PURE__*/React__default.createElement(ToolbarListButton, {
    isDisabled: isDisabled || !canInsertBlocks
  }), isNodeTypeEnabled(sdk.field, Contentful.BLOCKS.QUOTE) && /*#__PURE__*/React__default.createElement(ToolbarQuoteButton, {
    isDisabled: isDisabled || !canInsertBlocks
  }), isNodeTypeEnabled(sdk.field, Contentful.BLOCKS.HR) && /*#__PURE__*/React__default.createElement(ToolbarHrButton, {
    isDisabled: isDisabled || !canInsertBlocks
  }), isNodeTypeEnabled(sdk.field, Contentful.BLOCKS.TABLE) && /*#__PURE__*/React__default.createElement(ToolbarTableButton, {
    isDisabled: shouldDisableTables
  })), /*#__PURE__*/React__default.createElement("div", {
    className: styles$l.embedActionsWrapper
  }, /*#__PURE__*/React__default.createElement(EmbedEntityWidget, {
    isDisabled: isDisabled,
    canInsertBlocks: canInsertBlocks
  })));
};

function getValidationInfo(field) {
  var someWithValidation = function someWithValidation(vals, validation) {
    return vals.some(function (val) {
      return validation(field, val);
    });
  };

  var isAnyMarkEnabled = someWithValidation(Object.values(Contentful.MARKS), isMarkEnabled);
  var isAnyHyperlinkEnabled = someWithValidation([Contentful.INLINES.HYPERLINK, Contentful.INLINES.ASSET_HYPERLINK, Contentful.INLINES.ENTRY_HYPERLINK], isNodeTypeEnabled);
  var isAnyBlockFormattingEnabled = someWithValidation([Contentful.BLOCKS.UL_LIST, Contentful.BLOCKS.OL_LIST, Contentful.BLOCKS.QUOTE, Contentful.BLOCKS.HR], isNodeTypeEnabled);
  return {
    isAnyMarkEnabled: isAnyMarkEnabled,
    isAnyHyperlinkEnabled: isAnyHyperlinkEnabled,
    isAnyBlockFormattingEnabled: isAnyBlockFormattingEnabled
  };
}

var _templateObject$b;
var styles$m = {
  nativeSticky: /*#__PURE__*/emotion.css(_templateObject$b || (_templateObject$b = /*#__PURE__*/_taggedTemplateLiteralLoose(["\n    position: -webkit-sticky;\n    position: sticky;\n    top: -1px;\n    z-index: 2;\n  "])))
};

var StickyToolbarWrapper = function StickyToolbarWrapper(_ref) {
  var isDisabled = _ref.isDisabled,
      children = _ref.children;
  return /*#__PURE__*/React__default.createElement("div", {
    className: isDisabled ? '' : styles$m.nativeSticky
  }, children);
};

var internalMarks = [COMMAND_PROMPT];
var removeInternalMarks = function removeInternalMarks(document) {
  return _extends({}, document, {
    content: document.content.map(function (node) {
      if (node.nodeType === 'text') {
        node.marks = node.marks.filter(function (mark) {
          return !internalMarks.includes(mark.type);
        });
        return node;
      }

      return removeInternalMarks(node);
    })
  });
};

/**
 * Returns whether a given operation is relevant enough to trigger a save.
 */

var isRelevantOperation = function isRelevantOperation(op) {
  if (op.type === 'set_selection') {
    return false;
  }

  return true;
};

var useOnValueChanged = function useOnValueChanged(_ref) {
  var editorId = _ref.editorId,
      handler = _ref.handler,
      skip = _ref.skip,
      onSkip = _ref.onSkip;
  var onChange = React.useMemo(function () {
    return debounce(function (document) {
      var contentfulDocument = contentfulSlateJSAdapter.toContentfulDocument({
        document: document,
        schema: schema
      });
      var cleanedDocument = removeInternalMarks(contentfulDocument);
      handler == null ? void 0 : handler(cleanedDocument);
    }, 500);
  }, [handler]);
  return React.useCallback(function (value) {
    var editor = p.getPlateSelectors(editorId).editor();

    if (!editor) {
      throw new Error('Editor change callback called but editor not defined. Editor id: ' + editorId);
    }

    var operations = editor == null ? void 0 : editor.operations.filter(isRelevantOperation);

    if (operations.length > 0) {
      if (skip) {
        onSkip == null ? void 0 : onSkip();
        return;
      }

      onChange(value);
    }
  }, [editorId, onChange, skip, onSkip]);
};

var _excluded = ["sdk", "isInitiallyDisabled", "onAction", "restrictedMarks"];
var ConnectedRichTextEditor = function ConnectedRichTextEditor(props) {
  var id = getContentfulEditorId(props.sdk);
  var plugins = React__default.useMemo(function () {
    var _props$onAction;

    return getPlugins(props.sdk, (_props$onAction = props.onAction) != null ? _props$onAction : noop, props.restrictedMarks);
  }, [props.sdk, props.onAction, props.restrictedMarks]);

  var _useState = React.useState(true),
      isFirstRender = _useState[0],
      setIsFirstRender = _useState[1];

  var _useState2 = React.useState(false),
      pendingExternalUpdate = _useState2[0],
      setPendingExternalUpdate = _useState2[1];

  var onValueChanged = useOnValueChanged({
    editorId: id,
    handler: props.onChange,
    skip: pendingExternalUpdate || isFirstRender,
    onSkip: function onSkip() {
      return setPendingExternalUpdate(false);
    }
  });
  React.useEffect(function () {
    /*
      This effect is called when the value prop changes. Normally
      this happens when the value is changed outside of the editor,
      like in snapshots restoration or remote updates
      Plate won't update the displayed value on its own, see:
       - https://github.com/ianstormtaylor/slate/pull/4540
       - https://github.com/udecode/plate/issues/1169
            The content is forcefully set to the new value and it's ensured
       the change listener isn't invoked
    */
    setIsFirstRender(false);
    var editor = getPlateSelectors(id).editor();

    if (!editor) {
      return;
    }

    setPendingExternalUpdate(true);
    setEditorContent(editor, documentToEditorValue(props.value));
  }, [props.value, id]);
  var classNames = emotion.cx(styles$k.editor, props.minHeight !== undefined ? emotion.css({
    minHeight: props.minHeight
  }) : undefined, props.isDisabled ? styles$k.disabled : styles$k.enabled, props.isToolbarHidden && styles$k.hiddenToolbar);
  React.useEffect(function () {
    if (!isFirstRender) {
      return;
    }

    p.getPlateActions(id).value(normalizeEditorValue(documentToEditorValue(props.value), {
      plugins: plugins,
      disableCorePlugins: disableCorePlugins
    }));
  }, [isFirstRender, plugins, id, props.value]);
  return /*#__PURE__*/React__default.createElement(SdkProvider, {
    sdk: props.sdk
  }, /*#__PURE__*/React__default.createElement(ContentfulEditorIdProvider, {
    value: id
  }, /*#__PURE__*/React__default.createElement("div", {
    className: styles$k.root,
    "data-test-id": "rich-text-editor"
  }, /*#__PURE__*/React__default.createElement(p.Plate, {
    id: id,
    plugins: plugins,
    disableCorePlugins: disableCorePlugins,
    editableProps: {
      className: classNames,
      readOnly: props.isDisabled
    },
    onChange: onValueChanged,
    firstChildren: !props.isToolbarHidden && /*#__PURE__*/React__default.createElement(StickyToolbarWrapper, {
      isDisabled: props.isDisabled
    }, /*#__PURE__*/React__default.createElement(Toolbar, {
      isDisabled: props.isDisabled
    }))
  }))));
};

var RichTextEditor = function RichTextEditor(props) {
  var sdk = props.sdk,
      isInitiallyDisabled = props.isInitiallyDisabled,
      onAction = props.onAction,
      restrictedMarks = props.restrictedMarks,
      otherProps = _objectWithoutPropertiesLoose(props, _excluded);

  var isEmptyValue = React.useCallback(function (value) {
    return !value || areEqual(value, Contentful.EMPTY_DOCUMENT);
  }, []);
  var id = getContentfulEditorId(props.sdk);
  return /*#__PURE__*/React__default.createElement(fieldEditorReference.EntityProvider, {
    sdk: sdk
  }, /*#__PURE__*/React__default.createElement(fieldEditorShared.FieldConnector, {
    throttle: 0,
    field: sdk.field,
    isInitiallyDisabled: isInitiallyDisabled,
    isEmptyValue: isEmptyValue,
    isEqualValues: areEqual
  }, function (_ref) {
    var lastRemoteValue = _ref.lastRemoteValue,
        disabled = _ref.disabled,
        setValue = _ref.setValue;
    return /*#__PURE__*/React__default.createElement(ConnectedRichTextEditor, _extends({}, otherProps, {
      key: "rich-text-editor-" + id,
      value: lastRemoteValue,
      sdk: sdk,
      onAction: onAction,
      isDisabled: disabled,
      onChange: setValue,
      restrictedMarks: restrictedMarks
    }));
  }));
};

var LINK_TYPES$1 = {
  URI: 'uri',
  ENTRY: 'Entry',
  ASSET: 'Asset'
};

function isFeaturingEntitySelector(entitySelectorConfigs) {
  if (entitySelectorConfigs === void 0) {
    entitySelectorConfigs = {};
  }

  return !!entitySelectorConfigs.Entry || !!entitySelectorConfigs.Asset;
}

function entityToLink(entity) {
  var _entity$sys = entity.sys,
      id = _entity$sys.id,
      type = _entity$sys.type;
  return {
    sys: {
      id: id,
      type: 'Link',
      linkType: type
    }
  };
}

var HyperlinkDialog = /*#__PURE__*/function (_React$Component) {
  _inheritsLoose(HyperlinkDialog, _React$Component);

  function HyperlinkDialog(props) {
    var _entityLinks;

    var _this;

    _this = _React$Component.call(this, props) || this;

    _this.handleSubmit = function (event) {
      event.preventDefault();

      _this.props.onClose(_this.getValue());
    };

    _this.selectEntry = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee() {
      var _this$props$entitySel, locale, contentTypes, entry;

      return runtime_1.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _this$props$entitySel = _this.props.entitySelectorConfigs.Entry, locale = _this$props$entitySel.locale, contentTypes = _this$props$entitySel.contentTypes;
              _context.next = 3;
              return _this.props.sdk.dialogs.selectSingleEntry({
                locale: locale,
                contentTypes: contentTypes
              });

            case 3:
              entry = _context.sent;

              _this.setTargetEntity(LINK_TYPES$1.ENTRY, entry);

            case 5:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));
    _this.selectAsset = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee2() {
      var locale, asset;
      return runtime_1.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              locale = _this.props.entitySelectorConfigs.Asset.locale;
              _context2.next = 3;
              return _this.props.sdk.dialogs.selectSingleAsset({
                locale: locale
              });

            case 3:
              asset = _context2.sent;

              _this.setTargetEntity(LINK_TYPES$1.ASSET, asset);

            case 5:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    }));
    var _props$value = props.value,
        text = _props$value.text,
        type = _props$value.type,
        uri = _props$value.uri,
        target = _props$value.target;
    var isEntityLink = Boolean(target);
    var entityLinks = (_entityLinks = {}, _entityLinks[LINK_TYPES$1.ENTRY] = null, _entityLinks[LINK_TYPES$1.ASSET] = null, _entityLinks);
    var linkType = type;

    if (isEntityLink) {
      linkType = target.sys.linkType;
      entityLinks[linkType] = target;
    } else if (props.allowedHyperlinkTypes.includes(LINK_TYPES$1.URI)) {
      linkType = LINK_TYPES$1.URI;
    } else {
      linkType = props.allowedHyperlinkTypes[0];
    }

    _this.state = {
      text: text,
      uri: uri,
      entityLinks: entityLinks,
      type: linkType
    };
    return _this;
  }

  var _proto = HyperlinkDialog.prototype;

  _proto.setTargetEntity = function setTargetEntity(type, entity) {
    this.setState(function (state) {
      var _extends2;

      return {
        entityLinks: _extends({}, state.entityLinks, (_extends2 = {}, _extends2[type] = entity ? entityToLink(entity) : undefined, _extends2))
      };
    });
  };

  _proto.getValue = function getValue() {
    var _this$state = this.state,
        text = _this$state.text,
        type = _this$state.type,
        uri = _this$state.uri;
    var value = {
      type: type
    };

    if (text) {
      value.text = text;
    }

    if (type === LINK_TYPES$1.URI) {
      value.uri = uri;
    } else {
      value.target = this.state.entityLinks[type];
    }

    return value;
  };

  _proto.isLinkComplete = function isLinkComplete() {
    var _this$getValue = this.getValue(),
        text = _this$getValue.text,
        type = _this$getValue.type,
        uri = _this$getValue.uri,
        target = _this$getValue.target;

    var requiresText = !this.props.hideText;

    if (requiresText && !text) {
      return false;
    }

    return type === LINK_TYPES$1.URI && uri || target;
  };

  _proto.render = function render() {
    var _this2 = this;

    var labels = this.props.labels;
    return /*#__PURE__*/React__default.createElement(fieldEditorReference.EntityProvider, {
      sdk: this.props.sdk
    }, /*#__PURE__*/React__default.createElement(React__default.Fragment, null, /*#__PURE__*/React__default.createElement(f36Components.ModalContent, null, this.renderFields()), /*#__PURE__*/React__default.createElement(f36Components.ModalControls, null, /*#__PURE__*/React__default.createElement(f36Components.Button, {
      type: "button",
      onClick: function onClick() {
        return _this2.props.onClose(null);
      },
      variant: "secondary",
      testId: "cancel-cta",
      size: "small"
    }, "Cancel"), /*#__PURE__*/React__default.createElement(f36Components.Button, {
      type: "submit",
      variant: "positive",
      onClick: this.handleSubmit,
      isDisabled: !this.isLinkComplete(),
      testId: "confirm-cta",
      size: "small"
    }, labels.confirm))));
  };

  _proto.renderFields = function renderFields() {
    var _this3 = this;

    var _this$props = this.props,
        hideText = _this$props.hideText,
        allowedHyperlinkTypes = _this$props.allowedHyperlinkTypes,
        entitySelectorConfigs = _this$props.entitySelectorConfigs;
    var _this$state2 = this.state,
        uri = _this$state2.uri,
        text = _this$state2.text,
        type = _this$state2.type;
    var isUriInputAutoFocused = type === LINK_TYPES$1.URI && (hideText || !!text);
    return /*#__PURE__*/React__default.createElement(f36Components.Form, null, hideText ? null : /*#__PURE__*/React__default.createElement(f36Components.FormControl, {
      id: "link-text",
      isRequired: true
    }, /*#__PURE__*/React__default.createElement(f36Components.FormControl.Label, null, "Link text"), /*#__PURE__*/React__default.createElement(f36Components.TextInput, {
      testId: "link-text-input",
      name: "link-text",
      value: text || '',
      onChange: function onChange(e) {
        return _this3.setState({
          text: e.target.value
        });
      } // eslint-disable-next-line -- TODO: describe this disable  jsx-a11y/no-autofocus
      ,
      autoFocus: !isUriInputAutoFocused
    })), isFeaturingEntitySelector(entitySelectorConfigs) && /*#__PURE__*/React__default.createElement(f36Components.FormControl, {
      id: "link-type",
      name: "link-type"
    }, /*#__PURE__*/React__default.createElement(f36Components.FormControl.Label, null, "Link type"), /*#__PURE__*/React__default.createElement(f36Components.Select, {
      value: type,
      onChange: function onChange(e) {
        return _this3.setState({
          type: e.target.value
        });
      },
      testId: "link-type-select"
    }, allowedHyperlinkTypes.includes(LINK_TYPES$1.URI) || type === LINK_TYPES$1.URI ? /*#__PURE__*/React__default.createElement(f36Components.Select.Option, {
      value: LINK_TYPES$1.URI
    }, "URL") : null, allowedHyperlinkTypes.includes(LINK_TYPES$1.ENTRY) || type === LINK_TYPES$1.ENTRY ? /*#__PURE__*/React__default.createElement(f36Components.Select.Option, {
      value: LINK_TYPES$1.ENTRY
    }, "Entry") : null, allowedHyperlinkTypes.includes(LINK_TYPES$1.ASSET) || type === LINK_TYPES$1.ASSET ? /*#__PURE__*/React__default.createElement(f36Components.Select.Option, {
      value: LINK_TYPES$1.ASSET
    }, "Asset") : null)), type === LINK_TYPES$1.URI ? /*#__PURE__*/React__default.createElement(f36Components.FormControl, {
      id: "link-uri",
      isRequired: true
    }, /*#__PURE__*/React__default.createElement(f36Components.FormControl.Label, null, "Link target"), /*#__PURE__*/React__default.createElement(f36Components.TextInput, {
      testId: "link-target-input",
      name: "link-uri",
      value: uri || '',
      placeholder: "https://",
      onChange: function onChange(e) {
        return _this3.setState({
          uri: e.target.value
        });
      } // eslint-disable-next-line -- TODO: describe this disable  jsx-a11y/no-autofocus
      ,
      autoFocus: isUriInputAutoFocused
    }), /*#__PURE__*/React__default.createElement(f36Components.FormControl.HelpText, null, "A protocol may be required, e.g. https://")) : this.renderEntityField());
  };

  _proto.renderEntityField = function renderEntityField() {
    var _this4 = this;

    var _this$state3 = this.state,
        type = _this$state3.type,
        entityLinks = _this$state3.entityLinks;

    var resetEntity = function resetEntity() {
      return _this4.setTargetEntity(type, null);
    };

    var entityLink = entityLinks[type];
    var isEntitySelectorVisible = !entityLink;
    return /*#__PURE__*/React__default.createElement("div", null, /*#__PURE__*/React__default.createElement(f36Components.FormLabel, {
      required: true,
      htmlFor: ""
    }, "Link target"), !isEntitySelectorVisible && /*#__PURE__*/React__default.createElement(f36Components.TextLink, {
      as: "button",
      className: emotion.css({
        marginLeft: tokens.spacingS
      }),
      onClick: resetEntity
    }, "Remove selection"), entityLink && /*#__PURE__*/React__default.createElement("div", null, type === LINK_TYPES$1.ENTRY && /*#__PURE__*/React__default.createElement(FetchingWrappedEntryCard, {
      sdk: this.props.sdk,
      locale: this.props.entitySelectorConfigs.Entry.locale,
      entryId: entityLink.sys.id,
      isDisabled: true,
      isSelected: false
    }), type == LINK_TYPES$1.ASSET && /*#__PURE__*/React__default.createElement(FetchingWrappedAssetCard, {
      sdk: this.props.sdk,
      locale: this.props.entitySelectorConfigs.Asset.locale,
      assetId: entityLink.sys.id,
      isDisabled: true,
      isSelected: false
    })), isEntitySelectorVisible && this.renderEntitySelector(type, isEntitySelectorVisible));
  };

  _proto.renderEntitySelector = function renderEntitySelector(type) {
    return /*#__PURE__*/React__default.createElement("div", {
      className: emotion.css({
        marginTop: tokens.spacingS
      })
    }, type === LINK_TYPES$1.ENTRY && /*#__PURE__*/React__default.createElement(f36Components.TextLink, {
      as: "button",
      onClick: this.selectEntry
    }, "Select entry"), type === LINK_TYPES$1.ASSET && /*#__PURE__*/React__default.createElement(f36Components.TextLink, {
      as: "button",
      onClick: this.selectAsset
    }, "Select asset"));
  };

  return HyperlinkDialog;
}(React__default.Component);
HyperlinkDialog.propTypes = {
  sdk: PropTypes.object.isRequired,
  labels: /*#__PURE__*/PropTypes.shape({
    title: PropTypes.string,
    confirm: PropTypes.string
  }),
  value: /*#__PURE__*/PropTypes.shape({
    text: PropTypes.string,
    uri: PropTypes.string,
    target: PropTypes.object,
    // Will be overwritten accordingly if `uri` or `target.sys.linkType` are set.
    type: /*#__PURE__*/PropTypes.oneOf(['uri', 'Entry', 'Asset'])
  }),
  entitySelectorConfigs: PropTypes.object,
  allowedHyperlinkTypes: /*#__PURE__*/PropTypes.arrayOf( /*#__PURE__*/PropTypes.oneOf([LINK_TYPES$1.ENTRY, LINK_TYPES$1.ASSET, LINK_TYPES$1.URI])),
  hideText: PropTypes.bool,
  onClose: PropTypes.func.isRequired
};
HyperlinkDialog.defaultProps = {
  labels: {
    title: 'Insert link',
    confirm: 'Insert link'
  },
  value: {},
  hideText: false,
  entitySelectorConfigs: {},
  allowedHyperlinkTypes: [LINK_TYPES$1.ENTRY, LINK_TYPES$1.ASSET, LINK_TYPES$1.URI]
};

var openRichTextDialog = function openRichTextDialog(sdk) {
  return function (options) {
    var _options$parameters;

    if (((_options$parameters = options.parameters) == null ? void 0 : _options$parameters.type) === 'rich-text-hyperlink-dialog') {
      return fieldEditorShared.ModalDialogLauncher.openDialog(options, function (_ref) {
        var onClose = _ref.onClose;
        return /*#__PURE__*/React__default.createElement(HyperlinkDialog, _extends({}, options.parameters, {
          onClose: onClose,
          sdk: sdk
        }));
      });
    }

    return Promise.reject();
  };
};

var renderRichTextDialog = function renderRichTextDialog(sdk) {
  var parameters = sdk.parameters.invocation;

  if ((parameters == null ? void 0 : parameters.type) === 'rich-text-hyperlink-dialog') {
    sdk.window.startAutoResizer();
    return /*#__PURE__*/React__default.createElement(HyperlinkDialog, _extends({}, sdk.parameters.invocation, {
      onClose: sdk.close,
      sdk: sdk
    }));
  }

  return /*#__PURE__*/React__default.createElement("div", null);
};

exports.ConnectedRichTextEditor = ConnectedRichTextEditor;
exports.RichTextEditor = RichTextEditor;
exports.openRichTextDialog = openRichTextDialog;
exports.renderRichTextDialog = renderRichTextDialog;
//# sourceMappingURL=field-editor-rich-text.cjs.development.js.map
