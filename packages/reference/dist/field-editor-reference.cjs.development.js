'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var React = require('react');
var React__default = _interopDefault(React);
var emotion = require('emotion');
var tokens = _interopDefault(require('@contentful/f36-tokens'));
var f36Components = require('@contentful/f36-components');
var f36Icons = require('@contentful/f36-icons');
var get = _interopDefault(require('lodash/get'));
var moment = _interopDefault(require('moment'));
var fieldEditorShared = require('@contentful/field-editor-shared');
var deepEqual = _interopDefault(require('deep-equal'));
var reactQuery = require('@tanstack/react-query');
var constate = _interopDefault(require('constate'));
var contentfulManagement = require('contentful-management');
var PQueue = _interopDefault(require('p-queue'));
var isNumber = _interopDefault(require('lodash/isNumber'));
var arrayMove = _interopDefault(require('array-move'));
var reactSortableHoc = require('react-sortable-hoc');
var mimetype = _interopDefault(require('@contentful/mimetype'));
var reactIntersectionObserver = require('react-intersection-observer');

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

var container = /*#__PURE__*/emotion.css({
  display: 'flex',
  border: "1px dashed " + tokens.gray500,
  borderRadius: tokens.borderRadiusMedium,
  justifyContent: 'center',
  padding: tokens.spacingXl
});
var action = /*#__PURE__*/emotion.css({
  textDecoration: 'none',
  fontWeight: 'bold'
});

/* eslint-disable @typescript-eslint/no-explicit-any */
var MAX_ITEMS_WITHOUT_SEARCH = 5;
var menuPlacementMap = {
  'bottom-left': 'bottom-start',
  'bottom-right': 'bottom-end'
};
var styles = {
  wrapper: /*#__PURE__*/emotion.css({
    position: 'relative'
  }),
  inputWrapper: /*#__PURE__*/emotion.css({
    position: 'relative',
    padding: "0 " + tokens.spacing2Xs
  }),
  searchInput: /*#__PURE__*/emotion.css({
    paddingRight: tokens.spacingXl,
    textOverflow: 'ellipsis'
  }),
  searchIcon: /*#__PURE__*/emotion.css({
    position: 'absolute',
    right: tokens.spacingM,
    top: tokens.spacingS,
    zIndex: /*#__PURE__*/Number(tokens.zIndexDefault),
    fill: tokens.gray600
  }),
  separator: /*#__PURE__*/emotion.css({
    background: tokens.gray200,
    margin: '10px 0'
  }),
  dropdownList: /*#__PURE__*/emotion.css({
    borderColor: tokens.gray200
  })
};
var CreateEntryMenuTrigger = function CreateEntryMenuTrigger(_ref) {
  var contentTypes = _ref.contentTypes,
      suggestedContentTypeId = _ref.suggestedContentTypeId,
      contentTypesLabel = _ref.contentTypesLabel,
      onSelect = _ref.onSelect,
      testId = _ref.testId,
      _ref$dropdownSettings = _ref.dropdownSettings,
      dropdownSettings = _ref$dropdownSettings === void 0 ? {
    position: 'bottom-left'
  } : _ref$dropdownSettings,
      customDropdownItems = _ref.customDropdownItems,
      children = _ref.children;

  var _useState = React.useState(false),
      isOpen = _useState[0],
      setOpen = _useState[1];

  var _useState2 = React.useState(false),
      isSelecting = _useState2[0],
      setSelecting = _useState2[1];

  var _useState3 = React.useState(''),
      searchInput = _useState3[0],
      setSearchInput = _useState3[1];

  var wrapper = React.useRef(null);
  var textField = React.useRef(null);
  var menuListRef = React.useRef(null);
  /*
    By default, dropdown wraps it's content, so it's width = the width of the widest item
    During search, menu items change, and so the widest menu item can change
    This leads to menu always changing it's width
    To prevent this, we get the width of the menu item after the first mount of a dropdown (when all the content is displayed)
    And hardcode it through the class name. This way we ensure that even during search the menu will keep that max width
    That it had on initial mount and that fits any menu item in has
  */

  var _useState4 = React.useState(),
      dropdownWidth = _useState4[0],
      setDropdownWidth = _useState4[1];

  var hasDropdown = contentTypes.length > 1 || !!customDropdownItems;

  var closeMenu = function closeMenu() {
    return setOpen(false);
  };

  React.useEffect(function () {
    if (isOpen) {
      setTimeout(function () {
        var _textField$current, _textField$current$qu;

        (_textField$current = textField.current) == null ? void 0 : (_textField$current$qu = _textField$current.querySelector('input')) == null ? void 0 : _textField$current$qu.focus({
          preventScroll: true
        });
      }, 200);
    }
  }, [isOpen]);
  React.useEffect(function () {
    if (isOpen && !dropdownWidth) {
      var _menuListRef$current;

      setDropdownWidth((_menuListRef$current = menuListRef.current) == null ? void 0 : _menuListRef$current.clientWidth);
    }
  }, [isOpen, dropdownWidth]);

  var handleSelect = function handleSelect(item) {
    closeMenu();
    var res = onSelect(item.sys.id); // TODO: Convert to controllable component.

    if (res && typeof res.then === 'function') {
      setSelecting(true);
      res.then(function () {
        return setSelecting(false);
      }, function () {
        return setSelecting(false);
      });
    }
  };

  var handleMenuOpen = function handleMenuOpen() {
    if (hasDropdown) {
      setOpen(true);
    } else {
      handleSelect(contentTypes[0]);
    }
  };

  React.useEffect(function () {
    if (!isOpen) {
      setSearchInput('');
    }
  }, [isOpen]);

  var renderSearchResultsCount = function renderSearchResultsCount(resultsLength) {
    return resultsLength ? React__default.createElement(f36Components.Menu.SectionTitle, {
      testId: "add-entru-menu-search-results"
    }, resultsLength, " result", resultsLength > 1 ? 's' : '') : null;
  };

  var isSearchable = contentTypes.length > MAX_ITEMS_WITHOUT_SEARCH;
  var maxDropdownHeight = suggestedContentTypeId ? 300 : 250;
  var suggestedContentType = contentTypes.find(function (ct) {
    return ct.sys.id === suggestedContentTypeId;
  });
  var filteredContentTypes = contentTypes.filter(function (ct) {
    return !searchInput || get(ct, 'name', 'Untitled').toLowerCase().includes(searchInput.toLowerCase());
  });
  return React__default.createElement("span", {
    className: styles.wrapper,
    ref: wrapper,
    "data-test-id": testId
  }, React__default.createElement(f36Components.Menu, {
    placement: menuPlacementMap[dropdownSettings.position],
    isAutoalignmentEnabled: dropdownSettings.isAutoalignmentEnabled,
    isOpen: isOpen,
    onClose: closeMenu,
    onOpen: handleMenuOpen
  }, React__default.createElement(f36Components.Menu.Trigger, null, children({
    isOpen: isOpen,
    isSelecting: isSelecting
  })), isOpen && React__default.createElement(f36Components.Menu.List, {
    className: styles.dropdownList,
    style: {
      width: dropdownWidth != undefined ? dropdownWidth + "px" : undefined,
      maxHeight: maxDropdownHeight + "px"
    },
    ref: menuListRef,
    testId: "add-entry-menu"
  }, Boolean(customDropdownItems) && React__default.createElement(React__default.Fragment, null, customDropdownItems, React__default.createElement(f36Components.Menu.Divider, null)), isSearchable && React__default.createElement(React__default.Fragment, null, React__default.createElement("div", {
    ref: textField,
    className: styles.inputWrapper
  }, React__default.createElement(f36Components.TextInput, {
    className: styles.searchInput,
    placeholder: "Search all content types",
    testId: "add-entry-menu-search",
    value: searchInput,
    onChange: function onChange(e) {
      return setSearchInput(e.target.value);
    }
  }), React__default.createElement(f36Icons.SearchIcon, {
    className: styles.searchIcon
  })), React__default.createElement(f36Components.Menu.Divider, null)), searchInput && renderSearchResultsCount(filteredContentTypes.length), suggestedContentType && !searchInput && React__default.createElement(React__default.Fragment, null, React__default.createElement(f36Components.Menu.SectionTitle, null, "Suggested Content Type"), React__default.createElement(f36Components.Menu.Item, {
    testId: "suggested",
    onClick: function onClick() {
      return handleSelect(suggestedContentType);
    }
  }, get(suggestedContentType, 'name')), React__default.createElement(f36Components.Menu.Divider, null)), !searchInput && React__default.createElement(f36Components.Menu.SectionTitle, null, contentTypesLabel), filteredContentTypes.length ? filteredContentTypes.map(function (contentType, i) {
    return React__default.createElement(f36Components.Menu.Item, {
      testId: "contentType",
      key: get(contentType, 'name') + "-" + i,
      onClick: function onClick() {
        return handleSelect(contentType);
      }
    }, get(contentType, 'name', 'Untitled'));
  }) : React__default.createElement(f36Components.Menu.Item, {
    testId: "add-entru-menu-search-results"
  }, "No results found"))));
};
CreateEntryMenuTrigger.defaultProps = {
  testId: 'create-entry-button-menu-trigger',
  contentTypesLabel: 'All Content Types'
};

var standardStyles = {
  spinnerMargin: /*#__PURE__*/emotion.css({
    marginRight: tokens.spacingXs
  }),
  action: undefined
};

var redesignStyles = /*#__PURE__*/_extends({}, standardStyles, {
  action: /*#__PURE__*/emotion.css({
    textDecoration: 'none',
    fontWeight: 'bold',
    maxWidth: '300px'
  })
});

var CreateEntryLinkButton = function CreateEntryLinkButton(_ref) {
  var contentTypes = _ref.contentTypes,
      onSelect = _ref.onSelect,
      customDropdownItems = _ref.customDropdownItems,
      text = _ref.text,
      testId = _ref.testId,
      _ref$hasPlusIcon = _ref.hasPlusIcon,
      hasPlusIcon = _ref$hasPlusIcon === void 0 ? false : _ref$hasPlusIcon,
      useExperimentalStyles = _ref.useExperimentalStyles,
      suggestedContentTypeId = _ref.suggestedContentTypeId,
      dropdownSettings = _ref.dropdownSettings,
      _ref$disabled = _ref.disabled,
      disabled = _ref$disabled === void 0 ? false : _ref$disabled;
  contentTypes = contentTypes.sort(function (a, b) {
    return a.name.localeCompare(b.name);
  });
  var suggestedContentType = contentTypes.find(function (ct) {
    return ct.sys.id === suggestedContentTypeId;
  });
  var buttonText = text || "Add " + get(suggestedContentType || (contentTypes.length === 1 ? contentTypes[0] : {}), 'name', 'entry');
  var hasDropdown = contentTypes.length > 1 || customDropdownItems; // TODO: Introduce `icon: string` and remove `hasPlusIcon` or remove "Plus" if we keep new layout.

  var plusIcon = hasPlusIcon ? React__default.createElement(f36Icons.PlusIcon, null) : undefined; // TODO: Always use "New content" here if we fully switch to new layout.

  var contentTypesLabel = useExperimentalStyles ? 'New content' : undefined;
  var styles = useExperimentalStyles ? redesignStyles : standardStyles;
  return React__default.createElement(CreateEntryMenuTrigger, {
    contentTypes: contentTypes,
    suggestedContentTypeId: suggestedContentTypeId,
    contentTypesLabel: contentTypesLabel,
    onSelect: onSelect,
    testId: testId,
    dropdownSettings: dropdownSettings,
    customDropdownItems: customDropdownItems
  }, function (_ref2) {
    var isSelecting = _ref2.isSelecting;
    return React__default.createElement(f36Components.Button, {
      endIcon: hasDropdown ? React__default.createElement(f36Icons.ChevronDownIcon, null) : undefined,
      variant: "secondary",
      className: styles.action,
      isDisabled: disabled || isSelecting,
      startIcon: isSelecting ? undefined : plusIcon,
      size: "small",
      testId: "create-entry-link-button",
      isLoading: isSelecting
    }, buttonText);
  });
};

function NoLinkPermissionsInfo() {
  return React__default.createElement(f36Components.Paragraph, null, "You don't have permission to view this content or this field is not correctly configured. Contact your administrator for help.");
}

var container$1 = /*#__PURE__*/emotion.css({
  display: 'flex',
  width: '100%',
  marginTop: tokens.spacingS
});
var separator = /*#__PURE__*/emotion.css({
  marginRight: tokens.spacingXl
});

var defaultEntryLabels = {
  createNew: function createNew(props) {
    return props != null && props.contentType ? "Create new " + props.contentType + " and link" : 'Create new entry and link';
  },
  linkExisting: function linkExisting(props) {
    return props != null && props.canLinkMultiple ? 'Link existing entries' : 'Link existing entry';
  }
};
var defaultAssetLabels = {
  createNew: function createNew() {
    return "Create new asset and link";
  },
  linkExisting: function linkExisting(props) {
    return props != null && props.canLinkMultiple ? 'Link existing assets' : 'Link existing asset';
  }
};
var testIds = {
  dropdown: 'linkEditor.dropdown',
  createAndLink: 'linkEditor.createAndLink',
  createAndLinkWrapper: 'create-entry-button-menu-trigger',
  linkExisting: 'linkEditor.linkExisting'
};
function LinkActions(props) {
  if (props.isFull) {
    return null; // Don't render link actions if we reached max allowed links.
  }

  var defaultLabels = props.entityType === 'Entry' ? defaultEntryLabels : defaultAssetLabels;

  var labels = _extends({}, defaultLabels, props.actionLabels);

  return React.createElement("div", {
    className: container$1
  }, props.canCreateEntity && React.createElement(React.Fragment, null, props.entityType === 'Entry' && React.createElement(CreateEntryLinkButton, {
    testId: testIds.createAndLink,
    disabled: props.isDisabled,
    text: labels.createNew({
      contentType: props.contentTypes.length === 1 ? props.contentTypes[0].name : undefined
    }),
    contentTypes: props.contentTypes,
    hasPlusIcon: true,
    onSelect: function onSelect(contentTypeId) {
      return contentTypeId ? props.onCreate(contentTypeId, props.itemsLength) : Promise.resolve();
    }
  }), props.entityType === 'Asset' && React.createElement(f36Components.Button, {
    isDisabled: props.isDisabled,
    testId: testIds.createAndLink,
    onClick: function onClick() {
      props.onCreate(undefined, props.itemsLength);
    },
    variant: "secondary",
    startIcon: React.createElement(f36Icons.PlusIcon, null),
    size: "small"
  }, labels.createNew()), React.createElement("span", {
    className: separator
  })), props.canLinkEntity && React.createElement(f36Components.Button, {
    isDisabled: props.isDisabled,
    testId: testIds.linkExisting,
    onClick: function onClick() {
      props.onLinkExisting();
    },
    variant: "secondary",
    startIcon: React.createElement(f36Icons.LinkIcon, null),
    size: "small"
  }, labels.linkExisting({
    canLinkMultiple: props.canLinkMultiple
  })), !props.canCreateEntity && !props.canLinkEntity && React.createElement(NoLinkPermissionsInfo, null));
}

var testIds$1 = /*#__PURE__*/_extends({}, testIds, {
  actionsWrapper: 'link-actions-menu-trigger'
});
/**
 * Alternative, experimental alternative to <LinkActions /> that is planned to
 * replace the current default LinkActions in reference and media editors.
 *
 * Places both actions to create and link new, as well as link existing, behind
 * one action dropdown and introduces new copy for action labels.
 */


function CombinedLinkActions(props) {
  if (props.isFull) {
    return null; // Don't render link actions if we reached max allowed links.
  } // We don't want to render a spacious container in case there are are already
  // assets linked (in case of entries, always show it) as the border wouldn't be
  // nicely aligned with asset cards.


  var hideEmptyCard = props.entityType === 'Asset' && !props.isEmpty;
  return React.createElement("div", {
    className: hideEmptyCard ? '' : container
  }, !props.canCreateEntity && !props.canLinkEntity && React.createElement(NoLinkPermissionsInfo, null), props.entityType === 'Entry' && React.createElement(CombinedEntryLinkActions, _extends({}, props)), props.entityType === 'Asset' && React.createElement(CombinedAssetLinkActions, _extends({}, props)));
}

function CombinedEntryLinkActions(props) {
  if (props.canCreateEntity) {
    return React.createElement(CreateEntryLinkButton, {
      testId: testIds$1.actionsWrapper,
      disabled: props.isDisabled,
      text: props.combinedActionsLabel || 'Add content',
      contentTypes: props.contentTypes,
      hasPlusIcon: true,
      useExperimentalStyles: true,
      dropdownSettings: {
        position: 'bottom-left'
      },
      onSelect: function onSelect(contentTypeId) {
        return contentTypeId ? props.onCreate(contentTypeId) : Promise.resolve();
      },
      customDropdownItems: props.canLinkEntity ? React.createElement(f36Components.Menu.Item, {
        testId: testIds$1.linkExisting,
        onClick: function onClick() {
          props.onLinkExisting();
        }
      }, "Add existing content") : undefined
    });
  } else if (props.canLinkEntity) {
    return React.createElement(f36Components.Button, {
      isDisabled: props.isDisabled,
      testId: testIds$1.linkExisting,
      className: action,
      onClick: function onClick() {
        props.onLinkExisting();
      },
      variant: "secondary",
      startIcon: React.createElement(f36Icons.LinkIcon, null),
      size: "small"
    }, "Add existing content");
  }

  return null;
}

function CombinedAssetLinkActions(props) {
  var _React$useState = React.useState(false),
      isOpen = _React$useState[0],
      setOpen = _React$useState[1];

  if (!props.canLinkEntity || !props.canCreateEntity) {
    if (props.canLinkEntity) {
      return React.createElement(f36Components.Button, {
        isDisabled: props.isDisabled,
        testId: testIds$1.linkExisting,
        className: action,
        onClick: function onClick() {
          props.onLinkExisting();
        },
        variant: "secondary",
        startIcon: React.createElement(f36Icons.PlusIcon, null),
        size: "small"
      }, "Add existing media");
    }

    if (props.canCreateEntity) {
      return React.createElement(f36Components.Button, {
        isDisabled: props.isDisabled,
        testId: testIds$1.createAndLink,
        className: action,
        onClick: function onClick() {
          props.onCreate();
        },
        variant: "secondary",
        startIcon: React.createElement(f36Icons.PlusIcon, null),
        size: "small"
      }, "Add media");
    }

    return null;
  } // TODO: If we fully switch to this new layout, make a more generic `CreateEntityLinkButton`
  //  that works without content types to cover asset use-case.


  return React.createElement(f36Components.Menu, {
    isOpen: isOpen,
    onClose: function onClose() {
      setOpen(false);
    },
    onOpen: function onOpen() {
      setOpen(true);
    }
  }, React.createElement(f36Components.Menu.Trigger, null, React.createElement(f36Components.Button, {
    endIcon: React.createElement(f36Icons.ChevronDownIcon, null),
    isDisabled: props.isDisabled,
    testId: testIds$1.actionsWrapper,
    className: action,
    variant: "secondary",
    startIcon: React.createElement(f36Icons.PlusIcon, null),
    size: "small"
  }, "Add media")), isOpen && React.createElement(f36Components.Menu.List, {
    testId: testIds$1.dropdown
  }, React.createElement(f36Components.Menu.Item, {
    testId: testIds$1.linkExisting,
    onClick: function onClick() {
      props.onLinkExisting();
    }
  }, "Add existing media"), React.createElement(f36Components.Menu.Item, {
    testId: testIds$1.createAndLink,
    onClick: function onClick() {
      props.onCreate();
    }
  }, "Add new media")));
}

var card = /*#__PURE__*/emotion.css({
  position: 'relative'
});
var squareCard = /*#__PURE__*/emotion.css({
  display: 'flex',
  alignItems: 'center',
  width: '135px',
  height: '160px',
  textAlign: 'center'
});

function MissingEntityCard(props) {
  return React__default.createElement(f36Components.Card, {
    className: card,
    testId: "cf-ui-missing-entry-card"
  }, React__default.createElement(f36Components.Flex, {
    alignItems: "center",
    justifyContent: "space-between"
  }, React__default.createElement("div", {
    className: props.asSquare ? squareCard : ''
  }, React__default.createElement(f36Components.SectionHeading, {
    marginBottom: "none"
  }, props.entityType, " is missing or inaccessible")), !props.isDisabled && props.onRemove && React__default.createElement(f36Components.IconButton, {
    variant: "transparent",
    icon: React__default.createElement(f36Icons.CloseIcon, {
      variant: "muted"
    }),
    "aria-label": "Delete",
    onClick: function onClick() {
      props.onRemove && props.onRemove();
    }
  })));
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

var getContentTypeIds = function getContentTypeIds(contentTypes) {
  return contentTypes.map(function (ct) {
    return ct.sys.id;
  });
};

function createEntity(_x) {
  return _createEntity.apply(this, arguments);
}

function _createEntity() {
  _createEntity = _asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee(props) {
    var _yield$props$sdk$navi, entity, slide, _yield$props$sdk$navi2, _entity, _slide;

    return runtime_1.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            if (!(props.entityType === 'Entry')) {
              _context.next = 11;
              break;
            }

            if (props.contentTypeId) {
              _context.next = 3;
              break;
            }

            return _context.abrupt("return", {});

          case 3:
            _context.next = 5;
            return props.sdk.navigator.openNewEntry(props.contentTypeId, {
              slideIn: true
            });

          case 5:
            _yield$props$sdk$navi = _context.sent;
            entity = _yield$props$sdk$navi.entity;
            slide = _yield$props$sdk$navi.slide;
            return _context.abrupt("return", {
              entity: entity,
              slide: slide
            });

          case 11:
            _context.next = 13;
            return props.sdk.navigator.openNewAsset({
              slideIn: true
            });

          case 13:
            _yield$props$sdk$navi2 = _context.sent;
            _entity = _yield$props$sdk$navi2.entity;
            _slide = _yield$props$sdk$navi2.slide;
            return _context.abrupt("return", {
              entity: _entity,
              slide: _slide
            });

          case 17:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _createEntity.apply(this, arguments);
}

function selectSingleEntity(_x2) {
  return _selectSingleEntity.apply(this, arguments);
}

function _selectSingleEntity() {
  _selectSingleEntity = _asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee2(props) {
    return runtime_1.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            if (!(props.entityType === 'Entry')) {
              _context2.next = 6;
              break;
            }

            _context2.next = 3;
            return props.sdk.dialogs.selectSingleEntry({
              locale: props.sdk.field.locale,
              contentTypes: getContentTypeIds(props.editorPermissions.readableContentTypes)
            });

          case 3:
            return _context2.abrupt("return", _context2.sent);

          case 6:
            return _context2.abrupt("return", props.sdk.dialogs.selectSingleAsset({
              locale: props.sdk.field.locale,
              mimetypeGroups: props.editorPermissions.validations.mimetypeGroups
            }));

          case 7:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));
  return _selectSingleEntity.apply(this, arguments);
}

function selectMultipleEntities(_x3) {
  return _selectMultipleEntities.apply(this, arguments);
}

function _selectMultipleEntities() {
  _selectMultipleEntities = _asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee3(props) {
    var _props$editorPermissi, _props$editorPermissi2;

    var value, linkCount, min, max;
    return runtime_1.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            value = props.sdk.field.getValue();
            linkCount = Array.isArray(value) ? value.length : value ? 1 : 0; // TODO: Why not always set `min: 1` by default? Does it make sense to enforce
            //  user to select as many entities as the field's "min" requires? What if e.g.
            // "min" is 4 and the user wants to insert 2 entities first, then create 2 new ones?

            min = Math.max((((_props$editorPermissi = props.editorPermissions.validations.numberOfLinks) == null ? void 0 : _props$editorPermissi.min) || 1) - linkCount, 1); // TODO: Consider same for max. If e.g. "max" is 4, we disable the button if the
            //  user wants to select 5 but we show no information why the button is disabled.

            max = (((_props$editorPermissi2 = props.editorPermissions.validations.numberOfLinks) == null ? void 0 : _props$editorPermissi2.max) || +Infinity) - linkCount;

            if (!(props.entityType === 'Entry')) {
              _context3.next = 10;
              break;
            }

            _context3.next = 7;
            return props.sdk.dialogs.selectMultipleEntries({
              locale: props.sdk.field.locale,
              contentTypes: getContentTypeIds(props.editorPermissions.readableContentTypes),
              min: min,
              max: max
            });

          case 7:
            return _context3.abrupt("return", _context3.sent);

          case 10:
            return _context3.abrupt("return", props.sdk.dialogs.selectMultipleAssets({
              locale: props.sdk.field.locale,
              mimetypeGroups: props.editorPermissions.validations.mimetypeGroups,
              min: min,
              max: max
            }));

          case 11:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));
  return _selectMultipleEntities.apply(this, arguments);
}

var _excluded = ["renderCustomActions"],
    _excluded2 = ["renderCustomActions"];
function useLinkActionsProps(props) {
  var _editorPermissions$va;

  var sdk = props.sdk,
      editorPermissions = props.editorPermissions,
      entityType = props.entityType,
      canLinkMultiple = props.canLinkMultiple,
      isDisabled = props.isDisabled,
      actionLabels = props.actionLabels,
      itemsLength = props.itemsLength;
  var maxLinksCount = (_editorPermissions$va = editorPermissions.validations.numberOfLinks) == null ? void 0 : _editorPermissions$va.max;
  var value = sdk.field.getValue();
  var linkCount = Array.isArray(value) ? value.length : value ? 1 : 0;
  var isFull = !!maxLinksCount && maxLinksCount <= linkCount;
  var isEmpty = linkCount === 0;
  var onCreated = React.useCallback(function (entity, index, slide) {
    if (index === void 0) {
      index = itemsLength;
    }

    props.onCreate(entity.sys.id, index);
    props.onAction && props.onAction({
      type: 'create_and_link',
      entity: entityType,
      entityData: entity,
      slide: slide,
      index: index
    });
  }, // eslint-disable-next-line react-hooks/exhaustive-deps -- TODO: Evaluate the dependencies
  [entityType, props.onCreate, props.onAction]);
  var onLinkedExisting = React.useCallback(function (entities, index) {
    if (index === void 0) {
      index = itemsLength;
    }

    props.onLink(entities.map(function (item) {
      return item.sys.id;
    }), index);
    entities.forEach(function (entity, i) {
      props.onAction && props.onAction({
        type: 'select_and_link',
        entity: entityType,
        entityData: entity,
        index: index === undefined ? undefined : index + i
      });
    });
  }, // eslint-disable-next-line react-hooks/exhaustive-deps -- TODO: Evaluate the dependencies
  [entityType, props.onLink, props.onAction]);
  var onCreate = React.useCallback( /*#__PURE__*/function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee(contentTypeId, index) {
      var _yield$createEntity, entity, slide;

      return runtime_1.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return createEntity({
                sdk: sdk,
                entityType: entityType,
                contentTypeId: contentTypeId
              });

            case 2:
              _yield$createEntity = _context.sent;
              entity = _yield$createEntity.entity;
              slide = _yield$createEntity.slide;

              if (entity) {
                _context.next = 7;
                break;
              }

              return _context.abrupt("return");

            case 7:
              onCreated(entity, index, slide);

            case 8:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));

    return function (_x, _x2) {
      return _ref.apply(this, arguments);
    };
  }(), [sdk, entityType, onCreated]);
  var onLinkExisting = React.useCallback( /*#__PURE__*/function () {
    var _ref2 = _asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee2(index) {
      var entity;
      return runtime_1.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.next = 2;
              return selectSingleEntity({
                sdk: sdk,
                entityType: entityType,
                editorPermissions: editorPermissions
              });

            case 2:
              entity = _context2.sent;

              if (entity) {
                _context2.next = 5;
                break;
              }

              return _context2.abrupt("return");

            case 5:
              onLinkedExisting([entity], index);

            case 6:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    }));

    return function (_x3) {
      return _ref2.apply(this, arguments);
    };
  }(), // eslint-disable-next-line react-hooks/exhaustive-deps -- TODO: Evaluate the dependencies
  [sdk, entityType, onLinkedExisting]);
  var onLinkSeveralExisting = React.useCallback( /*#__PURE__*/function () {
    var _ref3 = _asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee3(index) {
      var entities;
      return runtime_1.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _context3.next = 2;
              return selectMultipleEntities({
                sdk: sdk,
                entityType: entityType,
                editorPermissions: editorPermissions
              });

            case 2:
              entities = _context3.sent;

              if (!(!entities || entities.length === 0)) {
                _context3.next = 5;
                break;
              }

              return _context3.abrupt("return");

            case 5:
              onLinkedExisting(entities, index);

            case 6:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3);
    }));

    return function (_x4) {
      return _ref3.apply(this, arguments);
    };
  }(), // eslint-disable-next-line react-hooks/exhaustive-deps -- TODO: Evaluate the dependencies
  [sdk, entityType, onLinkedExisting]); // FIXME: The memoization might rerun every time due to the always changing callback identities above

  return React.useMemo(function () {
    return {
      entityType: entityType,
      canLinkMultiple: canLinkMultiple,
      isDisabled: isDisabled,
      isEmpty: isEmpty,
      isFull: isFull,
      canCreateEntity: editorPermissions.canCreateEntity,
      canLinkEntity: editorPermissions.canLinkEntity,
      contentTypes: editorPermissions.creatableContentTypes,
      onCreate: onCreate,
      onLinkExisting: canLinkMultiple ? onLinkSeveralExisting : onLinkExisting,
      actionLabels: actionLabels,
      onCreated: onCreated,
      onLinkedExisting: onLinkedExisting,
      itemsLength: itemsLength
    };
  }, // eslint-disable-next-line react-hooks/exhaustive-deps -- TODO: Evaluate the dependencies
  [entityType, canLinkMultiple, isDisabled, isEmpty, isFull, editorPermissions.canCreateEntity, editorPermissions.canLinkEntity, actionLabels, // eslint-disable-next-line react-hooks/exhaustive-deps -- TODO: Evaluate the dependencies
  editorPermissions.creatableContentTypes.map(function (ct) {
    return ct.sys.id;
  }).join(':'), onCreate, onLinkExisting, onLinkSeveralExisting, onCreated, onLinkedExisting, itemsLength]);
}
function LinkEntityActions(_ref4) {
  var renderCustomActions = _ref4.renderCustomActions,
      props = _objectWithoutPropertiesLoose(_ref4, _excluded);

  return renderCustomActions ? renderCustomActions(props) : React.createElement(LinkActions, _extends({}, props));
}
function CombinedLinkEntityActions(_ref5) {
  var renderCustomActions = _ref5.renderCustomActions,
      props = _objectWithoutPropertiesLoose(_ref5, _excluded2);

  return renderCustomActions ? renderCustomActions(props) : React.createElement(CombinedLinkActions, _extends({}, props));
}

// eslint-disable-next-line -- TODO: describe this disable  no-restricted-imports
/**
 * @param {Date|string} date A valid constructor argument for moment()
 * @param {boolean=} short Render only Today/Tomorrow/Yesterday if valid. Defaults to false
 */

var formatDate = function formatDate(date, _short) {
  switch (moment().startOf('day').diff(moment(date).startOf('day'), 'days')) {
    case 0:
      return _short ? 'Today' : "Today, " + moment(date).format('DD MMM YYYY');

    case -1:
      return _short ? 'Tomorrow' : "Tomorrow, " + moment(date).format('DD MMM YYYY');

    case 1:
      return _short ? 'Yesterday' : "Yesterday, " + moment(date).format('DD MMM YYYY');

    default:
      return moment(date).format('ddd, DD MMM YYYY');
  }
};
/**
 * Returns the time portion of a date in the local time in the format H:MM AM/PM
 *
 * == Examples
 * * `T15:36:45.000Z` => 3:36 PM (if in +0:00 offset)
 */

var formatTime = function formatTime(date) {
  return moment.utc(date).local().format('h:mm A');
};
var formatDateAndTime = function formatDateAndTime(date, _short2) {
  return formatDate(date, _short2) + " at " + formatTime(date);
};

var getScheduleTooltipContent = function getScheduleTooltipContent(_ref) {
  var job = _ref.job,
      jobsCount = _ref.jobsCount;
  return "Will " + job.action.toLowerCase() + " " + formatDateAndTime(job.scheduledFor.datetime).toLowerCase() + "\n  " + (jobsCount > 1 ? "+ " + (jobsCount - 1) + " more" : '');
};
var ScheduleTooltip = function ScheduleTooltip(_ref2) {
  var job = _ref2.job,
      jobsCount = _ref2.jobsCount,
      children = _ref2.children;
  return React__default.createElement(f36Components.Tooltip, {
    placement: "top",
    testId: job.sys.id,
    as: "div",
    content: getScheduleTooltipContent({
      job: job,
      jobsCount: jobsCount
    })
  }, children);
};

var ScheduledIconWithTooltip = function ScheduledIconWithTooltip(_ref) {
  var _status$jobs;

  var entityType = _ref.entityType,
      entityId = _ref.entityId,
      getEntityScheduledActions = _ref.getEntityScheduledActions,
      children = _ref.children;

  var _React$useState = React__default.useState({
    type: 'loading'
  }),
      status = _React$useState[0],
      setStatus = _React$useState[1];

  React__default.useEffect(function () {
    getEntityScheduledActions(entityType, entityId).then(function (data) {
      setStatus({
        type: 'loaded',
        jobs: data
      });
    })["catch"](function (e) {
      setStatus({
        type: 'error',
        error: e
      });
    }); // This should only be ever called once. Following the eslint hint to add used
    // dependencies will cause page freeze (infinite loop)
    // eslint-disable-next-line -- TODO: describe this disable
  }, []);

  if (status.type === 'loading' || status.type === 'error') {
    return null;
  }

  var jobs = (_status$jobs = status.jobs) != null ? _status$jobs : [];

  if (jobs.length === 0) {
    return null;
  }

  var mostRelevantJob = jobs[0];
  return React__default.createElement(ScheduleTooltip, {
    job: mostRelevantJob,
    jobsCount: jobs.length
  }, children);
};

var dimensions = {
  width: 70,
  height: 70
};
function AssetThumbnail(props) {
  return React__default.createElement("img", {
    alt: props.file.fileName,
    src: props.file.url + "?w=" + dimensions.width + "&h=" + dimensions.height + "&fit=thumb",
    height: dimensions.height,
    width: dimensions.width
  });
}

var _excluded$1 = ["priority"],
    _excluded2$1 = ["children"];

var globalQueue = /*#__PURE__*/new PQueue({
  concurrency: 50
});
var UnsupportedError = /*#__PURE__*/function (_Error) {
  _inheritsLoose(UnsupportedError, _Error);

  function UnsupportedError(message) {
    var _this;

    _this = _Error.call(this, message) || this;
    _this.isUnsupportedError = void 0;
    _this.isUnsupportedError = true;
    return _this;
  }

  return UnsupportedError;
}( /*#__PURE__*/_wrapNativeSuper(Error));
function isUnsupportedError(value) {
  return typeof value === 'object' && (value == null ? void 0 : value.isUnsupportedError) === true;
}

var isEntityQueryKey = function isEntityQueryKey(queryKey) {
  return Array.isArray(queryKey) && (queryKey[0] === 'Entry' || queryKey[0] === 'Asset') && queryKey.length === 4;
};

function fetchContentfulEntry(_x) {
  return _fetchContentfulEntry.apply(this, arguments);
}

function _fetchContentfulEntry() {
  _fetchContentfulEntry = _asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee3(params) {
    var urn, fetch, options, resourceId, _resourceId$split, spaceId, entryId, environmentId, _yield$Promise$all, space, entry, contentTypeId, _yield$Promise$all2, contentType, defaultLocaleCode;

    return runtime_1.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            urn = params.urn, fetch = params.fetch, options = params.options;
            resourceId = urn.split(':', 6)[5];
            _resourceId$split = resourceId.split('/'), spaceId = _resourceId$split[1], entryId = _resourceId$split[3];
            environmentId = 'master';
            _context3.next = 6;
            return Promise.all([fetch(['space', spaceId], function (_ref10) {
              var cmaClient = _ref10.cmaClient;
              return cmaClient.space.get({
                spaceId: spaceId
              });
            }, options), fetch(['entry', spaceId, environmentId, entryId], function (_ref11) {
              var cmaClient = _ref11.cmaClient;
              return cmaClient.entry.get({
                spaceId: spaceId,
                environmentId: environmentId,
                entryId: entryId
              });
            }, options)]);

          case 6:
            _yield$Promise$all = _context3.sent;
            space = _yield$Promise$all[0];
            entry = _yield$Promise$all[1];
            contentTypeId = entry.sys.contentType.sys.id;
            _context3.next = 12;
            return Promise.all([fetch(['contentType', spaceId, environmentId, contentTypeId], function (_ref12) {
              var cmaClient = _ref12.cmaClient;
              return cmaClient.contentType.get({
                contentTypeId: contentTypeId,
                spaceId: spaceId,
                environmentId: environmentId
              });
            }, options), fetch(['defaultLocale', spaceId, environmentId], /*#__PURE__*/function () {
              var _ref14 = _asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee2(_ref13) {
                var _locales$items$find;

                var cmaClient, locales, defaultLocaleCode;
                return runtime_1.wrap(function _callee2$(_context2) {
                  while (1) {
                    switch (_context2.prev = _context2.next) {
                      case 0:
                        cmaClient = _ref13.cmaClient;
                        _context2.next = 3;
                        return cmaClient.locale.getMany({
                          spaceId: spaceId,
                          environmentId: environmentId,
                          query: {
                            limit: 100
                          }
                        });

                      case 3:
                        locales = _context2.sent;
                        defaultLocaleCode = (_locales$items$find = locales.items.find(function (locale) {
                          return locale["default"];
                        })) == null ? void 0 : _locales$items$find.code;
                        return _context2.abrupt("return", defaultLocaleCode);

                      case 6:
                      case "end":
                        return _context2.stop();
                    }
                  }
                }, _callee2);
              }));

              return function (_x3) {
                return _ref14.apply(this, arguments);
              };
            }(), options)]);

          case 12:
            _yield$Promise$all2 = _context3.sent;
            contentType = _yield$Promise$all2[0];
            defaultLocaleCode = _yield$Promise$all2[1];
            return _context3.abrupt("return", {
              defaultLocaleCode: defaultLocaleCode,
              resource: entry,
              space: space,
              contentType: contentType
            });

          case 16:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));
  return _fetchContentfulEntry.apply(this, arguments);
}

var _constate = /*#__PURE__*/constate(function useInitServices(props) {
  var _props$sdk$ids$enviro;

  var currentSpaceId = props.sdk.ids.space;
  var currentEnvironmentId = (_props$sdk$ids$enviro = props.sdk.ids.environmentAlias) != null ? _props$sdk$ids$enviro : props.sdk.ids.environment;
  var environmentIds = React.useMemo(function () {
    return [props.sdk.ids.environmentAlias, props.sdk.ids.environment];
  }, [props.sdk.ids.environmentAlias, props.sdk.ids.environment]);
  var queryClient = reactQuery.useQueryClient();
  var queryCache = queryClient.getQueryCache();
  var entityChangeUnsubscribers = React.useRef({});
  var cmaClient = React.useMemo(function () {
    return contentfulManagement.createClient({
      apiAdapter: props.sdk.cmaAdapter
    }, {
      type: 'plain'
    });
  }, [props.sdk.cmaAdapter]);
  var queryQueue = React.useMemo(function () {
    if (props.queryConcurrency) {
      return new PQueue({
        concurrency: props.queryConcurrency
      });
    }

    return globalQueue;
  }, [props.queryConcurrency]);
  var fetch = React.useCallback(function fetch(queryKey, fn, options) {
    if (options === void 0) {
      options = {};
    }

    var _options = options,
        priority = _options.priority,
        queryOptions = _objectWithoutPropertiesLoose(_options, _excluded$1);

    return queryClient.fetchQuery(queryKey, function () {
      return queryQueue.add(function () {
        return fn({
          cmaClient: cmaClient
        });
      }, {
        priority: priority
      });
    }, queryOptions);
  }, [queryClient, queryQueue, cmaClient]);
  var getEntity = React.useCallback(function getEntity(entityType, entityId, options) {
    var _options$spaceId, _options$environmentI;

    var spaceId = (_options$spaceId = options == null ? void 0 : options.spaceId) != null ? _options$spaceId : currentSpaceId;
    var environmentId = (_options$environmentI = options == null ? void 0 : options.environmentId) != null ? _options$environmentI : currentEnvironmentId;
    var queryKey = [entityType, entityId, spaceId, environmentId];
    return fetch(queryKey, function (_ref) {
      var cmaClient = _ref.cmaClient;

      if (entityType === 'Entry') {
        return cmaClient.entry.get({
          entryId: entityId,
          spaceId: spaceId,
          environmentId: environmentId
        });
      }

      if (entityType === 'Asset') {
        return cmaClient.asset.get({
          assetId: entityId,
          spaceId: spaceId,
          environmentId: environmentId
        });
      }

      throw new UnsupportedError('Unsupported entity type');
    }, options);
  }, [fetch, currentSpaceId, currentEnvironmentId]);
  /**
   * Fetch all scheduled actions for a given entity.
   * This function fetches all schedules for all entries and then returns
   * a filtered result based on the entityID provided.
   *
   * The result is then reused/cached for subsequent calls to this function.
   */

  /**
   * Fetch all scheduled actions for a given entity.
   * This function fetches all schedules for all entries and then returns
   * a filtered result based on the entityID provided.
   *
   * The result is then reused/cached for subsequent calls to this function.
   */
  var getEntityScheduledActions = React.useCallback(function getEntityScheduledActions(entityType, entityId, options) {
    var _options$spaceId2, _options$environmentI2;

    // This is fixed to force the cache to reuse previous results
    var fixedEntityCacheId = 'scheduledActionEntityId'; // A space+environment combo can only have up to 500 scheduled actions
    // With this request we fetch all schedules and can reuse the results.
    // See https://www.contentful.com/developers/docs/references/content-management-api/#/reference/scheduled-actions/limitations

    // A space+environment combo can only have up to 500 scheduled actions
    // With this request we fetch all schedules and can reuse the results.
    // See https://www.contentful.com/developers/docs/references/content-management-api/#/reference/scheduled-actions/limitations
    var maxScheduledActions = 500;
    var spaceId = (_options$spaceId2 = options == null ? void 0 : options.spaceId) != null ? _options$spaceId2 : currentSpaceId;
    var environmentId = (_options$environmentI2 = options == null ? void 0 : options.environmentId) != null ? _options$environmentI2 : currentEnvironmentId;
    var queryKey = ['scheduled-actions', entityType, fixedEntityCacheId, spaceId, environmentId]; // Fetch + Filter by entity ID in the end

    // Fetch + Filter by entity ID in the end
    return fetch(queryKey, /*#__PURE__*/function () {
      var _ref3 = _asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee(_ref2) {
        var cmaClient, response;
        return runtime_1.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                cmaClient = _ref2.cmaClient;
                _context.next = 3;
                return cmaClient.scheduledActions.getMany({
                  spaceId: spaceId,
                  query: {
                    'environment.sys.id': environmentId,
                    'sys.status[in]': 'scheduled',
                    order: 'scheduledFor.datetime',
                    limit: maxScheduledActions
                  }
                });

              case 3:
                response = _context.sent;
                return _context.abrupt("return", response.items);

              case 5:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      return function (_x2) {
        return _ref3.apply(this, arguments);
      };
    }(), options).then(function (items) {
      return items.filter(function (action) {
        return action.entity.sys.id === entityId;
      });
    });
  }, [fetch, currentSpaceId, currentEnvironmentId]);
  var getResource = React.useCallback(function getResource(resourceType, urn, options) {
    var queryKey = ['Resource', resourceType, urn];
    return fetch(queryKey, function () {
      if (resourceType === 'Contentful:Entry') {
        return fetchContentfulEntry({
          fetch: fetch,
          urn: urn,
          options: options
        });
      }

      throw new UnsupportedError('Unsupported resource type');
    }, options);
  }, [fetch]);
  var isSameSpaceEntityQueryKey = React.useCallback(function (queryKey) {
    var isEntityKey = isEntityQueryKey(queryKey);
    var isSameSpaceEntityKey = isEntityKey && queryKey[2] === currentSpaceId && environmentIds.includes(queryKey[3]);
    return isSameSpaceEntityKey;
  }, [currentSpaceId, environmentIds]); // @ts-expect-error ...

  // @ts-expect-error ...
  var onEntityChanged = props.sdk.space.onEntityChanged;
  var onSlideInNavigation = props.sdk.navigator.onSlideInNavigation;
  React.useEffect(function () {
    function findSameSpaceQueries() {
      return queryCache.findAll({
        type: 'active',
        predicate: function predicate(query) {
          return isSameSpaceEntityQueryKey(query.queryKey);
        }
      });
    }

    if (typeof onEntityChanged !== 'function') {
      return onSlideInNavigation(function (_ref4) {
        var oldSlideLevel = _ref4.oldSlideLevel,
            newSlideLevel = _ref4.newSlideLevel;

        if (oldSlideLevel > newSlideLevel) {
          findSameSpaceQueries().forEach(function (query) {
            // automatically refetches the query
            void queryClient.invalidateQueries(query.queryKey);
          });
        }
      });
    }

    var subscribeQuery = function subscribeQuery(_ref5) {
      var queryKey = _ref5.queryKey,
          queryHash = _ref5.queryHash;
      var entityType = queryKey[0],
          entityId = queryKey[1];
      entityChangeUnsubscribers.current[queryHash] = onEntityChanged(entityType, entityId, function (data) {
        queryClient.setQueryData(queryKey, data);
      });
    };

    findSameSpaceQueries().forEach(subscribeQuery);
    var unsubscribe = queryCache.subscribe(function (event) {
      if (!event) {
        return;
      }

      var type = event.type,
          query = event.query;
      var queryKey = query.queryKey,
          queryHash = query.queryHash;

      if (!isSameSpaceEntityQueryKey(queryKey)) {
        return;
      }

      if (type === 'added') {
        subscribeQuery(query);
      }

      if (type === 'removed') {
        var _entityChangeUnsubscr, _entityChangeUnsubscr2;

        // calling unsubscribe
        (_entityChangeUnsubscr = (_entityChangeUnsubscr2 = entityChangeUnsubscribers.current)[queryHash]) == null ? void 0 : _entityChangeUnsubscr.call(_entityChangeUnsubscr2);
      }
    });
    return function () {
      unsubscribe();
      Object.values(entityChangeUnsubscribers.current).forEach(function (off) {
        return off();
      });
      entityChangeUnsubscribers.current = {};
    };
  }, [onEntityChanged, queryCache, isSameSpaceEntityQueryKey, queryClient, getEntity, onSlideInNavigation]);
  return {
    ids: props.sdk.ids,
    cmaClient: cmaClient,
    fetch: fetch,
    getResource: getResource,
    getEntity: getEntity,
    getEntityScheduledActions: getEntityScheduledActions
  };
}, function (_ref6) {
  var fetch = _ref6.fetch;
  return fetch;
}, function (_ref7) {
  var getResource = _ref7.getResource,
      getEntity = _ref7.getEntity,
      getEntityScheduledActions = _ref7.getEntityScheduledActions;
  return {
    getResource: getResource,
    getEntity: getEntity,
    getEntityScheduledActions: getEntityScheduledActions
  };
}, function (_ref8) {
  var _ids$environmentAlias;

  var ids = _ref8.ids;
  return {
    environment: (_ids$environmentAlias = ids.environmentAlias) != null ? _ids$environmentAlias : ids.environment,
    space: ids.space
  };
}),
    InternalServiceProvider = _constate[0],
    useEntityLoader = _constate[2],
    useCurrentIds = _constate[3];

function useEntity(entityType, entityId, options) {
  var _options$spaceId3, _options$environmentI3;

  var _useCurrentIds = useCurrentIds(),
      space = _useCurrentIds.space,
      environment = _useCurrentIds.environment;

  var _useEntityLoader = useEntityLoader(),
      getEntity = _useEntityLoader.getEntity;

  var queryKey = [entityType, entityId, (_options$spaceId3 = options == null ? void 0 : options.spaceId) != null ? _options$spaceId3 : space, (_options$environmentI3 = options == null ? void 0 : options.environmentId) != null ? _options$environmentI3 : environment];

  var _useQuery = reactQuery.useQuery(queryKey, function () {
    return getEntity(entityType, entityId, options);
  }, {
    enabled: options == null ? void 0 : options.enabled
  }),
      status = _useQuery.status,
      data = _useQuery.data;

  return {
    status: status,
    data: data
  };
}
function useResource(resourceType, urn, options) {
  var queryKey = ['Resource', resourceType, urn];

  var _useEntityLoader2 = useEntityLoader(),
      getResource = _useEntityLoader2.getResource;

  var _useQuery2 = reactQuery.useQuery(queryKey, function () {
    return getResource(resourceType, urn, options);
  }, {
    enabled: options == null ? void 0 : options.enabled
  }),
      status = _useQuery2.status,
      data = _useQuery2.data,
      error = _useQuery2.error;

  return {
    status: status,
    data: data,
    error: error
  };
}

function EntityProvider(_ref9) {
  var children = _ref9.children,
      props = _objectWithoutPropertiesLoose(_ref9, _excluded2$1);

  var reactQueryClient = React.useMemo(function () {
    var queryCache = new reactQuery.QueryCache();
    var queryClient = new reactQuery.QueryClient({
      queryCache: queryCache,
      defaultOptions: {
        queries: {
          useErrorBoundary: false,
          refetchOnWindowFocus: false,
          refetchOnReconnect: true,
          refetchOnMount: false,
          staleTime: Infinity,
          retry: false
        }
      }
    });
    return queryClient;
  }, []);
  return React__default.createElement(reactQuery.QueryClientProvider, {
    client: reactQueryClient
  }, React__default.createElement(InternalServiceProvider, _extends({}, props), children));
}

function ReferenceEditor(props) {
  return React.createElement(EntityProvider, {
    sdk: props.sdk
  }, React.createElement(fieldEditorShared.FieldConnector, {
    throttle: 0,
    field: props.sdk.field,
    isInitiallyDisabled: props.isInitiallyDisabled,
    isEqualValues: function isEqualValues(value1, value2) {
      return deepEqual(value1, value2);
    }
  }, props.children));
}
ReferenceEditor.defaultProps = {
  isInitiallyDisabled: true,
  hasCardEditActions: true
};

var AllowActionsOnContentType = function AllowActionsOnContentType() {
  return Promise.resolve(true);
};

function useAccessApi(accessApi) {
  var _accessApi$canPerform;

  var canPerformAction = accessApi.can;
  var canPerformActionOnEntryOfType = (_accessApi$canPerform = accessApi.canPerformActionOnEntryOfType) != null ? _accessApi$canPerform : AllowActionsOnContentType;
  return {
    canPerformAction: canPerformAction,
    canPerformActionOnEntryOfType: canPerformActionOnEntryOfType
  };
}

function filter(_x, _x2) {
  return _filter.apply(this, arguments);
}

function _filter() {
  _filter = _asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee3(arr, predicate) {
    var fail, results;
    return runtime_1.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            // intentionally parallel as we assume it's cached in the implementation of the access api
            fail = Symbol();
            _context3.next = 3;
            return Promise.all(arr.map( /*#__PURE__*/function () {
              var _ref = _asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee2(item) {
                return runtime_1.wrap(function _callee2$(_context2) {
                  while (1) {
                    switch (_context2.prev = _context2.next) {
                      case 0:
                        _context2.next = 2;
                        return predicate(item);

                      case 2:
                        if (!_context2.sent) {
                          _context2.next = 6;
                          break;
                        }

                        _context2.t0 = item;
                        _context2.next = 7;
                        break;

                      case 6:
                        _context2.t0 = fail;

                      case 7:
                        return _context2.abrupt("return", _context2.t0);

                      case 8:
                      case "end":
                        return _context2.stop();
                    }
                  }
                }, _callee2);
              }));

              return function (_x3) {
                return _ref.apply(this, arguments);
              };
            }()));

          case 3:
            results = _context3.sent;
            return _context3.abrupt("return", results.filter(function (x) {
              return x !== fail;
            }));

          case 5:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));
  return _filter.apply(this, arguments);
}

function useContentTypePermissions(props) {
  var availableContentTypes = React.useMemo(function () {
    if (props.entityType === 'Asset') {
      return [];
    }

    if (props.validations.contentTypes) {
      return props.allContentTypes.filter(function (ct) {
        var _props$validations$co;

        return (_props$validations$co = props.validations.contentTypes) == null ? void 0 : _props$validations$co.includes(ct.sys.id);
      });
    }

    return props.allContentTypes;
  }, [props.allContentTypes, props.validations.contentTypes, props.entityType]);

  var _useState = React.useState(availableContentTypes),
      creatableContentTypes = _useState[0],
      setCreatableContentTypes = _useState[1];

  var _useState2 = React.useState(availableContentTypes),
      readableContentTypes = _useState2[0],
      setReadableContentTypes = _useState2[1];

  var _useAccessApi = useAccessApi(props.sdk.access),
      canPerformActionOnEntryOfType = _useAccessApi.canPerformActionOnEntryOfType;

  React.useEffect(function () {
    function getContentTypes(action) {
      return filter(availableContentTypes, function (ct) {
        return canPerformActionOnEntryOfType(action, ct.sys.id);
      });
    }

    function checkContentTypeAccess() {
      return _checkContentTypeAccess.apply(this, arguments);
    }

    function _checkContentTypeAccess() {
      _checkContentTypeAccess = _asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee() {
        var creatable, readable;
        return runtime_1.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return getContentTypes('create');

              case 2:
                creatable = _context.sent;
                _context.next = 5;
                return getContentTypes('read');

              case 5:
                readable = _context.sent;
                setCreatableContentTypes(creatable);
                setReadableContentTypes(readable);

              case 8:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));
      return _checkContentTypeAccess.apply(this, arguments);
    }

    void checkContentTypeAccess(); // eslint-disable-next-line react-hooks/exhaustive-deps -- TODO: Evaluate the dependencies
  }, [availableContentTypes]);
  return {
    creatableContentTypes: creatableContentTypes,
    readableContentTypes: readableContentTypes,
    availableContentTypes: availableContentTypes
  };
}

function fromFieldValidations(field) {
  var _field$items$validati, _field$items, _linkContentTypeValid, _linkMimetypeGroupVal;

  // eslint-disable-next-line -- TODO: describe this disable  @typescript-eslint/no-explicit-any
  var validations = [].concat(field.validations, (_field$items$validati = (_field$items = field.items) == null ? void 0 : _field$items.validations) != null ? _field$items$validati : []);
  var linkContentTypeValidations = validations.find(function (v) {
    return 'linkContentType' in v;
  });
  var linkMimetypeGroupValidations = validations.find(function (v) {
    return 'linkMimetypeGroup' in v;
  });
  var sizeValidations = validations.find(function (v) {
    return 'size' in v;
  });
  var size = sizeValidations && sizeValidations.size || {};
  var min = size.min;
  var max = size.max;
  var numberOfLinks = undefined;

  if (isNumber(min) && isNumber(max)) {
    numberOfLinks = {
      type: 'min-max',
      min: min,
      max: max
    };
  } else if (isNumber(min)) {
    numberOfLinks = {
      type: 'min',
      min: min,
      max: undefined
    };
  } else if (isNumber(max)) {
    numberOfLinks = {
      type: 'max',
      max: max,
      min: undefined
    };
  }

  var result = {
    contentTypes: (_linkContentTypeValid = linkContentTypeValidations == null ? void 0 : linkContentTypeValidations.linkContentType) != null ? _linkContentTypeValid : undefined,
    mimetypeGroups: (_linkMimetypeGroupVal = linkMimetypeGroupValidations == null ? void 0 : linkMimetypeGroupValidations.linkMimetypeGroup) != null ? _linkMimetypeGroupVal : undefined,
    numberOfLinks: numberOfLinks // todo: there are multiple BE problems that need to be solved first, for now we don't want to apply size constraints
    // linkedFileSize: findValidation(field, 'assetFileSize', {}),
    // linkedImageDimensions: findValidation(field, 'assetImageDimensions', {})

  };
  return result;
}

function useEditorPermissions(props) {
  var sdk = props.sdk,
      entityType = props.entityType,
      parameters = props.parameters;
  var validations = React.useMemo(function () {
    return fromFieldValidations(props.sdk.field);
  }, [props.sdk.field]);

  var _useState = React.useState(true),
      canCreateEntity = _useState[0],
      setCanCreateEntity = _useState[1];

  var _useState2 = React.useState(true),
      canLinkEntity = _useState2[0],
      setCanLinkEntity = _useState2[1];

  var _useContentTypePermis = useContentTypePermissions(_extends({}, props, {
    validations: validations
  })),
      creatableContentTypes = _useContentTypePermis.creatableContentTypes,
      readableContentTypes = _useContentTypePermis.readableContentTypes,
      availableContentTypes = _useContentTypePermis.availableContentTypes;

  var _useAccessApi = useAccessApi(sdk.access),
      canPerformAction = _useAccessApi.canPerformAction;

  React.useEffect(function () {
    if (parameters.instance.showCreateEntityAction === false) {
      setCanCreateEntity(false);
      return;
    }

    function checkCreateAccess() {
      return _checkCreateAccess.apply(this, arguments);
    }

    function _checkCreateAccess() {
      _checkCreateAccess = _asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee() {
        var canCreate, _canCreate;

        return runtime_1.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (!(entityType === 'Asset')) {
                  _context.next = 8;
                  break;
                }

                _context.next = 3;
                return canPerformAction('create', 'Asset');

              case 3:
                _context.t0 = _context.sent;

                if (_context.t0) {
                  _context.next = 6;
                  break;
                }

                _context.t0 = true;

              case 6:
                canCreate = _context.t0;
                setCanCreateEntity(canCreate);

              case 8:
                if (entityType === 'Entry') {
                  // Hardcoded `true` value following https://contentful.atlassian.net/browse/DANTE-486
                  // TODO: refine permissions check in order to account for tags in rules
                  _canCreate = creatableContentTypes.length > 0 || true;
                  setCanCreateEntity(_canCreate);
                }

              case 9:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));
      return _checkCreateAccess.apply(this, arguments);
    }

    void checkCreateAccess(); // eslint-disable-next-line react-hooks/exhaustive-deps -- TODO: Evaluate the dependencies
  }, [entityType, parameters.instance, creatableContentTypes]);
  React.useEffect(function () {
    if (parameters.instance.showLinkEntityAction === false) {
      setCanLinkEntity(false);
      return;
    }

    function checkLinkAccess() {
      return _checkLinkAccess.apply(this, arguments);
    }

    function _checkLinkAccess() {
      _checkLinkAccess = _asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee2() {
        var canRead, _canRead;

        return runtime_1.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                if (!(entityType === 'Asset')) {
                  _context2.next = 8;
                  break;
                }

                _context2.next = 3;
                return canPerformAction('read', 'Asset');

              case 3:
                _context2.t0 = _context2.sent;

                if (_context2.t0) {
                  _context2.next = 6;
                  break;
                }

                _context2.t0 = true;

              case 6:
                canRead = _context2.t0;
                setCanLinkEntity(canRead);

              case 8:
                if (entityType === 'Entry') {
                  // Hardcoded `true` value following https://contentful.atlassian.net/browse/DANTE-486
                  // TODO: refine permissions check in order to account for tags in rules
                  // TODO: always show every content type (it's just a filter) to avoid people not seeing
                  // their (partly limited) content types
                  _canRead = true;
                  setCanLinkEntity(_canRead);
                }

              case 9:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }));
      return _checkLinkAccess.apply(this, arguments);
    }

    void checkLinkAccess(); // eslint-disable-next-line react-hooks/exhaustive-deps -- TODO: Evaluate the dependencies
  }, [entityType, parameters.instance, readableContentTypes]);
  return {
    canCreateEntity: canCreateEntity,
    canLinkEntity: canLinkEntity,
    creatableContentTypes: creatableContentTypes,
    readableContentTypes: readableContentTypes,
    availableContentTypes: availableContentTypes,
    validations: validations
  };
}

function Editor(props) {
  var setValue = props.setValue,
      entityType = props.entityType;
  var editorPermissions = useEditorPermissions(props);
  var onCreate = React.useCallback(function (id) {
    return void setValue({
      sys: {
        type: 'Link',
        linkType: entityType,
        id: id
      }
    });
  }, [setValue, entityType]);
  var onLink = React.useCallback(function (ids) {
    var id = ids[0];
    setValue({
      sys: {
        type: 'Link',
        linkType: entityType,
        id: id
      }
    });
  }, [setValue, entityType]);
  var linkActionsProps = useLinkActionsProps(_extends({}, props, {
    canLinkMultiple: false,
    editorPermissions: editorPermissions,
    onCreate: onCreate,
    onLink: onLink
  })); // Inject card actions props into the given custom card renderer

  var customCardRenderer = React.useCallback(function (cardProps, _, renderDefaultCard) {
    return props.renderCustomCard ? props.renderCustomCard(cardProps, linkActionsProps, renderDefaultCard) : false;
  }, // eslint-disable-next-line react-hooks/exhaustive-deps -- TODO: Evaluate the dependencies
  [linkActionsProps]);

  if (!props.entityId) {
    return React.createElement(LinkEntityActions, _extends({
      renderCustomActions: props.renderCustomActions
    }, linkActionsProps));
  }

  return props.children(_extends({}, props, {
    renderCustomCard: props.renderCustomCard && customCardRenderer
  }));
}

function SingleReferenceEditor(props) {
  var allContentTypes = props.sdk.space.getCachedContentTypes();
  return React.createElement(ReferenceEditor, _extends({}, props), function (_ref) {
    var _value$sys;

    var value = _ref.value,
        setValue = _ref.setValue,
        disabled = _ref.disabled,
        externalReset = _ref.externalReset;
    return React.createElement(Editor, _extends({}, props, {
      key: externalReset + "-reference",
      entityId: value ? value == null ? void 0 : (_value$sys = value.sys) == null ? void 0 : _value$sys.id : '',
      isDisabled: disabled,
      setValue: setValue,
      allContentTypes: allContentTypes
    }));
  });
}
SingleReferenceEditor.defaultProps = {
  hasCardEditActions: true,
  hasCardRemoveActions: true
};

var styles$1 = {
  spaceIcon: /*#__PURE__*/emotion.css({
    flexShrink: 0,
    fill: tokens.purple600
  }),
  spaceName: /*#__PURE__*/emotion.css({
    color: tokens.gray700,
    fontSize: tokens.fontSizeS,
    fontWeight: tokens.fontWeightDemiBold,
    maxWidth: '80px',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    whiteSpace: 'nowrap'
  })
};
function SpaceName(props) {
  return React.createElement(f36Components.Tooltip, {
    placement: "top",
    as: "div",
    content: "Space: " + props.spaceName
  }, React.createElement(f36Components.Flex, {
    alignItems: "center",
    gap: "spacingXs",
    marginRight: "spacingS"
  }, React.createElement(f36Icons.FolderOpenTrimmedIcon, {
    className: styles$1.spaceIcon,
    size: "tiny",
    "aria-label": "Source space"
  }), React.createElement(f36Components.Text, {
    className: styles$1.spaceName
  }, props.spaceName)));
}

var getEntryTitle = fieldEditorShared.entityHelpers.getEntryTitle,
    getEntityDescription = fieldEditorShared.entityHelpers.getEntityDescription,
    getEntryStatus = fieldEditorShared.entityHelpers.getEntryStatus,
    getEntryImage = fieldEditorShared.entityHelpers.getEntryImage;
var styles$2 = {
  scheduleIcon: /*#__PURE__*/emotion.css({
    marginRight: tokens.spacing2Xs
  })
};
var defaultProps = {
  isClickable: true,
  hasCardEditActions: true,
  hasCardMoveActions: true,
  hasCardRemoveActions: true
};
function WrappedEntryCard(props) {
  var _props$entry;

  var _React$useState = React.useState(null),
      file = _React$useState[0],
      setFile = _React$useState[1];

  var contentType = props.contentType;
  React.useEffect(function () {
    if (props.entry) {
      getEntryImage({
        entry: props.entry,
        contentType: contentType,
        localeCode: props.localeCode,
        defaultLocaleCode: props.defaultLocaleCode
      }, props.getAsset).then(function (file) {
        setFile(file);
      })["catch"](function () {
        setFile(null);
      });
    }
  }, [props.entry, props.getAsset, contentType, props.localeCode, props.defaultLocaleCode]);
  var status = getEntryStatus((_props$entry = props.entry) == null ? void 0 : _props$entry.sys);

  if (status === 'deleted') {
    return React.createElement(MissingEntityCard, {
      entityType: "Entry",
      isDisabled: props.isDisabled,
      onRemove: props.onRemove
    });
  }

  var title = getEntryTitle({
    entry: props.entry,
    contentType: contentType,
    localeCode: props.localeCode,
    defaultLocaleCode: props.defaultLocaleCode,
    defaultTitle: 'Untitled'
  });
  var description = getEntityDescription({
    entity: props.entry,
    contentType: contentType,
    localeCode: props.localeCode,
    defaultLocaleCode: props.defaultLocaleCode
  });
  return React.createElement(f36Components.EntryCard, {
    as: props.entryUrl ? 'a' : 'article',
    href: props.entryUrl,
    title: title,
    description: description,
    contentType: contentType == null ? void 0 : contentType.name,
    size: props.size,
    isSelected: props.isSelected,
    status: status,
    icon: props.spaceName ? React.createElement(SpaceName, {
      spaceName: props.spaceName
    }) : React.createElement(ScheduledIconWithTooltip, {
      getEntityScheduledActions: props.getEntityScheduledActions,
      entityType: "Entry",
      entityId: props.entry.sys.id
    }, React.createElement(f36Icons.ClockIcon, {
      className: styles$2.scheduleIcon,
      size: "small",
      variant: "muted",
      testId: "schedule-icon"
    })),
    thumbnailElement: file && fieldEditorShared.isValidImage(file) ? React.createElement(AssetThumbnail, {
      file: file
    }) : undefined,
    dragHandleRender: props.renderDragHandle,
    withDragHandle: !!props.renderDragHandle,
    actions: props.onEdit || props.onRemove ? [props.hasCardEditActions && props.onEdit ? React.createElement(f36Components.MenuItem, {
      key: "edit",
      testId: "edit",
      onClick: function onClick() {
        props.onEdit && props.onEdit();
      }
    }, "Edit") : null, props.hasCardRemoveActions && props.onRemove ? React.createElement(f36Components.MenuItem, {
      key: "delete",
      testId: "delete",
      onClick: function onClick() {
        props.onRemove && props.onRemove();
      }
    }, "Remove") : null, props.hasCardMoveActions && (props.onMoveTop || props.onMoveBottom) ? React.createElement(f36Components.MenuDivider, {
      key: "divider"
    }) : null, props.hasCardMoveActions && props.onMoveTop ? React.createElement(f36Components.MenuItem, {
      key: "move-top",
      onClick: function onClick() {
        return props.onMoveTop && props.onMoveTop();
      },
      testId: "move-top"
    }, "Move to top") : null, props.hasCardMoveActions && props.onMoveBottom ? React.createElement(f36Components.MenuItem, {
      key: "move-bottom",
      onClick: function onClick() {
        return props.onMoveBottom && props.onMoveBottom();
      },
      testId: "move-bottom"
    }, "Move to bottom") : null].filter(function (item) {
      return item;
    }) : [],
    onClick: // Providing an onClick handler messes up with some rich text
    // features e.g. pressing ENTER on a card to add a new paragraph
    // underneath. It's crucial not to pass a custom handler when
    // isClickable is disabled which in the case of RT it's.
    props.isClickable ? function (e) {
      e.preventDefault();
      if (props.onClick) return props.onClick(e);
      props.onEdit && props.onEdit();
    } : undefined
  });
}
WrappedEntryCard.defaultProps = defaultProps;

function openEntry(_x, _x2, _x3) {
  return _openEntry.apply(this, arguments);
}

function _openEntry() {
  _openEntry = _asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee2(sdk, entryId, options) {
    var slide, _options$index, _result, result;

    return runtime_1.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            if (!options.bulkEditing) {
              _context2.next = 11;
              break;
            }

            _context2.prev = 1;
            _context2.next = 4;
            return sdk.navigator.openBulkEditor(sdk.entry.getSys().id, {
              fieldId: sdk.field.id,
              locale: sdk.field.locale,
              index: (_options$index = options.index) != null ? _options$index : 0
            });

          case 4:
            _result = _context2.sent;
            slide = _result.slide;
            return _context2.abrupt("return", slide);

          case 9:
            _context2.prev = 9;
            _context2.t0 = _context2["catch"](1);

          case 11:
            _context2.next = 13;
            return sdk.navigator.openEntry(entryId, {
              slideIn: true
            });

          case 13:
            result = _context2.sent;
            slide = result.slide;
            return _context2.abrupt("return", slide);

          case 16:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[1, 9]]);
  }));
  return _openEntry.apply(this, arguments);
}

function FetchingWrappedEntryCard(props) {
  var _useEntity = useEntity('Entry', props.entryId),
      entry = _useEntity.data,
      status = _useEntity.status;

  var _useEntityLoader = useEntityLoader(),
      getEntityScheduledActions = _useEntityLoader.getEntityScheduledActions;

  var loadEntityScheduledActions = React.useCallback(function () {
    return getEntityScheduledActions('Entry', props.entryId);
  }, [getEntityScheduledActions, props.entryId]);
  var size = props.viewType === 'link' ? 'small' : 'default';

  var _useEntityLoader2 = useEntityLoader(),
      getEntity = _useEntityLoader2.getEntity;

  var getAsset = function getAsset(assetId) {
    return getEntity('Asset', assetId);
  };

  var onEdit = /*#__PURE__*/function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee() {
      var slide;
      return runtime_1.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return openEntry(props.sdk, props.entryId, {
                bulkEditing: props.parameters.instance.bulkEditing,
                index: props.index
              });

            case 2:
              slide = _context.sent;
              props.onAction && props.onAction({
                entity: 'Entry',
                type: 'edit',
                id: props.entryId,
                contentTypeId: get(entry, 'sys.contentType.sys.id'),
                slide: slide
              });

            case 4:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));

    return function onEdit() {
      return _ref.apply(this, arguments);
    };
  }();

  var onRemoveEntry = function onRemoveEntry() {
    props.onRemove();
    props.onAction && props.onAction({
      entity: 'Entry',
      type: 'delete',
      id: props.entryId,
      contentTypeId: get(entry, 'sys.contentType.sys.id')
    });
  };

  React.useEffect(function () {
    if (entry) {
      props.onAction && props.onAction({
        type: 'rendered',
        entity: 'Entry'
      });
    } // eslint-disable-next-line react-hooks/exhaustive-deps -- TODO: Evaluate the dependencies

  }, [entry]);
  return React.useMemo(function () {
    if (status === 'error') {
      var card = React.createElement(MissingEntityCard, {
        entityType: "Entry",
        isDisabled: props.isDisabled,
        onRemove: onRemoveEntry
      });

      if (props.renderCustomMissingEntityCard) {
        return props.renderCustomMissingEntityCard({
          defaultCard: card,
          entity: {
            id: props.entryId,
            type: 'Entry'
          }
        });
      }

      return card;
    }

    if (status === 'loading') {
      return React.createElement(f36Components.EntryCard, {
        size: size,
        isLoading: true
      });
    }

    var sharedCardProps = {
      index: props.index,
      entity: entry,
      entityUrl: props.getEntityUrl && props.getEntityUrl(entry.sys.id),
      contentType: props.allContentTypes.find(function (contentType) {
        return contentType.sys.id === entry.sys.contentType.sys.id;
      }),
      isDisabled: props.isDisabled,
      size: size,
      localeCode: props.sdk.field.locale,
      defaultLocaleCode: props.sdk.locales["default"],
      renderDragHandle: props.renderDragHandle,
      onEdit: onEdit,
      onRemove: onRemoveEntry,
      onMoveTop: props.onMoveTop,
      onMoveBottom: props.onMoveBottom,
      isBeingDragged: props.isBeingDragged
    };
    var hasCardEditActions = props.hasCardEditActions,
        hasCardMoveActions = props.hasCardMoveActions,
        hasCardRemoveActions = props.hasCardRemoveActions;

    function renderDefaultCard(props) {
      var builtinCardProps = _extends({}, sharedCardProps, props, {
        hasCardEditActions: hasCardEditActions,
        hasCardMoveActions: hasCardMoveActions,
        hasCardRemoveActions: hasCardRemoveActions,
        getAsset: getAsset,
        getEntityScheduledActions: loadEntityScheduledActions,
        entry: (props == null ? void 0 : props.entity) || sharedCardProps.entity,
        entryUrl: (props == null ? void 0 : props.entityUrl) || sharedCardProps.entityUrl
      });

      return React.createElement(WrappedEntryCard, _extends({}, builtinCardProps));
    }

    if (props.renderCustomCard) {
      // LinkActionsProps are injected higher SingleReferenceEditor/MultipleReferenceEditor
      var renderedCustomCard = props.renderCustomCard(sharedCardProps, {}, renderDefaultCard); // Only `false` indicates to render the original card. E.g. `null` would result in no card.

      if (renderedCustomCard !== false) {
        return renderedCustomCard;
      }
    }

    return renderDefaultCard(); // eslint-disable-next-line react-hooks/exhaustive-deps -- TODO: Evaluate the dependencies
  }, [props, status, entry]);
}

function SingleEntryReferenceEditor(props) {
  return React.createElement(SingleReferenceEditor, _extends({}, props, {
    entityType: "Entry"
  }), function (_ref) {
    var allContentTypes = _ref.allContentTypes,
        isDisabled = _ref.isDisabled,
        entityId = _ref.entityId,
        setValue = _ref.setValue,
        renderCustomCard = _ref.renderCustomCard,
        hasCardRemoveActions = _ref.hasCardRemoveActions,
        hasCardEditActions = _ref.hasCardEditActions;
    return React.createElement(FetchingWrappedEntryCard, _extends({}, props, {
      allContentTypes: allContentTypes,
      isDisabled: isDisabled,
      entryId: entityId,
      renderCustomCard: renderCustomCard,
      hasCardEditActions: hasCardEditActions,
      hasCardRemoveActions: hasCardRemoveActions,
      onRemove: function onRemove() {
        setValue(null);
      }
    }));
  });
}
SingleEntryReferenceEditor.defaultProps = {
  isInitiallyDisabled: true
};

function onLinkOrCreate(setValue, entityType, items, ids, index) {
  if (index === void 0) {
    index = items.length;
  }

  var links = ids.map(function (id) {
    return {
      sys: {
        type: 'Link',
        linkType: entityType,
        id: id
      }
    };
  });
  var newItems = Array.from(items);
  newItems.splice.apply(newItems, [index, 0].concat(links));
  setValue(newItems);
}

var emptyArray = [];
var nullableValue = {
  sys: {
    id: 'null-value'
  }
};

function Editor$1(props) {
  var setValue = props.setValue,
      entityType = props.entityType,
      setIndexToUpdate = props.setIndexToUpdate;
  var editorPermissions = useEditorPermissions(props);
  var items = React.useMemo(function () {
    return (props.items || []). // If null values have found their way into the persisted
    // value for the multiref field, replace them with an object
    // that has the shape of a Link to make the missing entry/asset
    // card render
    map(function (link) {
      return link || nullableValue;
    });
  }, [props.items]);
  var onSortStart = React.useCallback(function (_, event) {
    if (event instanceof MouseEvent) {
      document.body.classList.add('grabbing');
    }

    event.preventDefault();
  }, []);
  var onSortEnd = React.useCallback(function (_ref) {
    var oldIndex = _ref.oldIndex,
        newIndex = _ref.newIndex;
    // custom callback that is invoked *before* we sort the array
    // e.g. in Compose we want to sort the references in the referenceMap before re-rendering drag and drop
    props.onSortingEnd && props.onSortingEnd({
      oldIndex: oldIndex,
      newIndex: newIndex
    });
    var newItems = arrayMove(items, oldIndex, newIndex);
    setValue(newItems);
    setIndexToUpdate && setIndexToUpdate(undefined);
    document.body.classList.remove('grabbing');
  }, [items, props, setIndexToUpdate, setValue]);
  var onMove = React.useCallback(function (oldIndex, newIndex) {
    var newItems = arrayMove(items, oldIndex, newIndex);
    setValue(newItems);
  }, [items, setValue]);
  var onCreate = React.useCallback(function (id, index) {
    return onLinkOrCreate(setValue, entityType, items, [id], index);
  }, [setValue, items, entityType]);
  var onLink = React.useCallback(function (ids, index) {
    return onLinkOrCreate(setValue, entityType, items, ids, index);
  }, [setValue, items, entityType]);
  var linkActionsProps = useLinkActionsProps(_extends({}, props, {
    canLinkMultiple: true,
    editorPermissions: editorPermissions,
    onCreate: onCreate,
    onLink: onLink,
    itemsLength: items.length
  }));
  var customCardRenderer = React.useCallback(function (cardProps, _, renderDefaultCard) {
    return props.renderCustomCard ? props.renderCustomCard(cardProps, linkActionsProps, renderDefaultCard) : false;
  }, // eslint-disable-next-line react-hooks/exhaustive-deps -- TODO: Evaluate the dependencies
  [linkActionsProps]);
  return React.createElement(React.Fragment, null, props.children(_extends({}, props, {
    onSortStart: onSortStart,
    onSortEnd: onSortEnd,
    onMove: onMove,
    renderCustomCard: props.renderCustomCard && customCardRenderer
  })), React.createElement(LinkEntityActions, _extends({
    renderCustomActions: props.renderCustomActions
  }, linkActionsProps)));
}

function MultipleReferenceEditor(props) {
  var allContentTypes = props.sdk.space.getCachedContentTypes();
  return React.createElement(ReferenceEditor, _extends({}, props), function (_ref2) {
    var value = _ref2.value,
        disabled = _ref2.disabled,
        setValue = _ref2.setValue,
        externalReset = _ref2.externalReset;
    return React.createElement(Editor$1, _extends({}, props, {
      items: value || emptyArray,
      isDisabled: disabled,
      setValue: setValue,
      key: externalReset + "-list",
      allContentTypes: allContentTypes
    }));
  });
}
MultipleReferenceEditor.defaultProps = {
  hasCardEditActions: true
};

var styles$3 = {
  container: /*#__PURE__*/emotion.css({
    position: 'relative'
  }),
  item: /*#__PURE__*/emotion.css({
    marginBottom: tokens.spacingM,
    zIndex: tokens.zIndexModal // setting this to an index above 99 fixes dragged item disappearing issue. Should not be higher than 100 so it does not overlap the asset modal.

  })
};

var DragHandle = function DragHandle(props) {
  var SortableDragHandle = reactSortableHoc.SortableHandle(function () {
    return props.drag;
  });
  return React__default.createElement(SortableDragHandle, null);
};

var SortableLink = /*#__PURE__*/reactSortableHoc.SortableElement(function (props) {
  return React__default.createElement("div", {
    className: styles$3.item
  }, props.children);
});
var SortableLinkListInternal = /*#__PURE__*/reactSortableHoc.SortableContainer(function (props) {
  return React__default.createElement("div", {
    className: emotion.cx(styles$3.container, props.className)
  }, props.items.map(function (item, index) {
    var _item$sys$urn;

    return React__default.createElement(SortableLink, {
      disabled: props.isDisabled,
      key: ((_item$sys$urn = item.sys.urn) != null ? _item$sys$urn : item.sys.id) + "-" + index,
      index: index
    }, props.children({
      items: props.items,
      isDisabled: props.isDisabled,
      item: item,
      index: index,
      DragHandle: props.isDisabled ? undefined : DragHandle
    }));
  }));
}); // HOC does not support generics, so we mimic it via additional component

function SortableLinkList(props) {
  // with the default distance of 0 the drag start event is "confused" with the click event,
  // so the latter one isn't fired and click handlers on child elements don't work
  return React__default.createElement(SortableLinkListInternal, _extends({
    distance: 1
  }, props), props.children);
}

function MultipleEntryReferenceEditor(props) {
  var _React$useState = React.useState(undefined),
      indexToUpdate = _React$useState[0],
      setIndexToUpdate = _React$useState[1];

  var updateBeforeSortStart = function updateBeforeSortStart(_ref) {
    var index = _ref.index;
    setIndexToUpdate(index);
  };

  return React.createElement(MultipleReferenceEditor, _extends({}, props, {
    entityType: "Entry",
    setIndexToUpdate: setIndexToUpdate
  }), function (childrenProps) {
    return React.createElement(SortableLinkList, _extends({}, childrenProps, {
      axis: "y",
      useDragHandle: true,
      updateBeforeSortStart: updateBeforeSortStart
    }), function (_ref2) {
      var items = _ref2.items,
          item = _ref2.item,
          index = _ref2.index,
          isDisabled = _ref2.isDisabled,
          DragHandle = _ref2.DragHandle;
      var lastIndex = items.length - 1;
      return React.createElement(FetchingWrappedEntryCard, _extends({}, childrenProps, {
        key: item.sys.id + "-" + index,
        index: index,
        allContentTypes: childrenProps.allContentTypes,
        isDisabled: isDisabled,
        entryId: item.sys.id,
        onRemove: function onRemove() {
          childrenProps.setValue(items.filter(function (_value, i) {
            return i !== index;
          }));
        },
        onMoveTop: index !== 0 ? function () {
          return childrenProps.onMove(index, 0);
        } : undefined,
        onMoveBottom: index !== lastIndex ? function () {
          return childrenProps.onMove(index, lastIndex);
        } : undefined,
        renderDragHandle: DragHandle,
        isBeingDragged: index === indexToUpdate
      }));
    });
  });
}

function downloadAsset(url) {
  window.open(url, '_blank', 'noopener,noreferrer');
}

function renderAssetInfo(props) {
  var entityFile = props.entityFile;
  var fileName = get(entityFile, 'fileName');
  var mimeType = get(entityFile, 'contentType');
  var fileSize = get(entityFile, 'details.size');
  var image = get(entityFile, 'details.image');
  return [React__default.createElement(f36Components.Menu.SectionTitle, {
    key: "file-section"
  }, "File info"), fileName && React__default.createElement(f36Components.Menu.Item, {
    key: "file-name"
  }, React__default.createElement(f36Components.Text, {
    isTruncated: true
  }, fileName)), mimeType && React__default.createElement(f36Components.Menu.Item, {
    key: "file-type"
  }, React__default.createElement(f36Components.Text, {
    isTruncated: true
  }, mimeType)), fileSize && React__default.createElement(f36Components.Menu.Item, {
    key: "file-size"
  }, fieldEditorShared.shortenStorageUnit(fileSize, 'B')), image && React__default.createElement(f36Components.Menu.Item, {
    key: "file-dimentions"
  }, image.width + " \xD7 " + image.height)].filter(function (item) {
    return item;
  });
}
function renderActions(props) {
  var entityFile = props.entityFile,
      isDisabled = props.isDisabled,
      onEdit = props.onEdit,
      onRemove = props.onRemove;
  return [React__default.createElement(f36Components.Menu.SectionTitle, {
    key: "section-title"
  }, "Actions"), onEdit ? React__default.createElement(f36Components.Menu.Item, {
    key: "edit",
    onClick: onEdit,
    testId: "card-action-edit"
  }, "Edit") : null, entityFile ? React__default.createElement(f36Components.Menu.Item, {
    key: "download",
    onClick: function onClick() {
      if (typeof entityFile.url === 'string') {
        downloadAsset(entityFile.url);
      }
    },
    testId: "card-action-download"
  }, "Download") : null, onRemove ? React__default.createElement(f36Components.Menu.Item, {
    key: "remove",
    disabled: isDisabled,
    onClick: onRemove,
    testId: "card-action-remove"
  }, "Remove") : null].filter(function (item) {
    return item;
  });
}

var groupToIconMap = {
  image: 'image',
  video: 'video',
  audio: 'audio',
  richtext: 'richtext',
  presentation: 'presentation',
  spreadsheet: 'spreadsheet',
  pdfdocument: 'pdf',
  archive: 'archive',
  plaintext: 'plaintext',
  code: 'code',
  markup: 'markup'
};
var styles$4 = {
  scheduleIcon: /*#__PURE__*/emotion.css({
    marginRight: tokens.spacing2Xs
  })
};
var defaultProps$1 = {
  isClickable: true
}; // eslint-disable-next-line -- TODO: describe this disable  @typescript-eslint/no-explicit-any

function getFileType(file) {
  if (!file) {
    return 'archive';
  }

  var groupName = mimetype.getGroupLabel({
    type: file.contentType,
    fallbackFileName: file.fileName
  });
  return groupToIconMap[groupName] || 'archive';
}

var WrappedAssetCard = function WrappedAssetCard(props) {
  var className = props.className,
      onEdit = props.onEdit,
      getAssetUrl = props.getAssetUrl,
      onRemove = props.onRemove,
      size = props.size,
      isDisabled = props.isDisabled,
      isSelected = props.isSelected,
      isClickable = props.isClickable;
  var status = fieldEditorShared.entityHelpers.getEntryStatus(props.asset.sys);

  if (status === 'deleted') {
    return React__default.createElement(MissingEntityCard, {
      entityType: "Asset",
      asSquare: true,
      isDisabled: props.isDisabled,
      onRemove: props.onRemove
    });
  }

  var entityTitle = fieldEditorShared.entityHelpers.getAssetTitle({
    asset: props.asset,
    localeCode: props.localeCode,
    defaultLocaleCode: props.defaultLocaleCode,
    defaultTitle: 'Untitled'
  });
  var entityFile = props.asset.fields.file ? props.asset.fields.file[props.localeCode] || props.asset.fields.file[props.defaultLocaleCode] : undefined;
  var href = getAssetUrl ? getAssetUrl(props.asset.sys.id) : undefined;
  return React__default.createElement(f36Components.AssetCard, {
    as: href ? 'a' : 'article',
    type: getFileType(entityFile),
    title: entityTitle,
    className: className,
    isSelected: isSelected,
    href: href,
    status: status,
    icon: React__default.createElement(ScheduledIconWithTooltip, {
      getEntityScheduledActions: props.getEntityScheduledActions,
      entityType: "Asset",
      entityId: props.asset.sys.id
    }, React__default.createElement(f36Icons.ClockIcon, {
      className: styles$4.scheduleIcon,
      size: "small",
      variant: "muted",
      testId: "schedule-icon"
    })),
    src: entityFile && entityFile.url ? size === 'small' ? entityFile.url + "?w=150&h=150&fit=thumb" : entityFile.url + "?h=300" : '',
    onClick: // Providing an onClick handler messes up with some rich text
    // features e.g. pressing ENTER on a card to add a new paragraph
    // underneath. It's crucial not to pass a custom handler when
    // isClickable is disabled which in the case of RT it's.
    isClickable ? function (e) {
      e.preventDefault();
      onEdit && onEdit();
    } : undefined,

    /* todo - remove this when onKeyDown is allowed as a prop for BaseCard in forma 36
    // @ts-expect-error */
    onKeyDown: isClickable ? function (e) {
      if (e.key === 'Enter' && onEdit) {
        e.preventDefault();
        onEdit();
      }
    } : undefined,
    dragHandleRender: props.renderDragHandle,
    withDragHandle: !!props.renderDragHandle,
    actions: [].concat(renderActions({
      entityFile: entityFile,
      isDisabled: isDisabled,
      onEdit: onEdit,
      onRemove: onRemove
    }), entityFile ? renderAssetInfo({
      entityFile: entityFile
    }) : []).filter(function (item) {
      return item;
    }),
    size: size
  });
};
WrappedAssetCard.defaultProps = defaultProps$1;

var styles$5 = {
  scheduleIcon: /*#__PURE__*/emotion.css({
    marginRight: tokens.spacing2Xs
  })
};
var WrappedAssetLink = function WrappedAssetLink(props) {
  var className = props.className,
      href = props.href,
      onEdit = props.onEdit,
      onRemove = props.onRemove,
      isDisabled = props.isDisabled;
  var status = fieldEditorShared.entityHelpers.getEntryStatus(props.asset.sys);

  if (status === 'deleted') {
    return React__default.createElement(MissingEntityCard, {
      entityType: "Asset",
      isDisabled: props.isDisabled,
      onRemove: props.onRemove
    });
  }

  var entityTitle = fieldEditorShared.entityHelpers.getAssetTitle({
    asset: props.asset,
    localeCode: props.localeCode,
    defaultLocaleCode: props.defaultLocaleCode,
    defaultTitle: 'Untitled'
  });
  var entityFile = props.asset.fields.file ? props.asset.fields.file[props.localeCode] || props.asset.fields.file[props.defaultLocaleCode] : undefined;
  return React__default.createElement(f36Components.EntryCard, {
    as: href ? 'a' : 'article',
    contentType: "Asset",
    title: entityTitle,
    className: className,
    href: href,
    size: "small",
    status: status,
    thumbnailElement: entityFile && fieldEditorShared.isValidImage(entityFile) ? React__default.createElement(AssetThumbnail, {
      file: entityFile
    }) : undefined,
    icon: React__default.createElement(ScheduledIconWithTooltip, {
      getEntityScheduledActions: props.getEntityScheduledActions,
      entityType: "Asset",
      entityId: props.asset.sys.id
    }, React__default.createElement(f36Icons.ClockIcon, {
      className: styles$5.scheduleIcon,
      size: "small",
      variant: "muted",
      testId: "schedule-icon"
    })),
    onClick: function onClick(e) {
      e.preventDefault();
      onEdit();
    },
    onKeyDown: function onKeyDown(e) {
      if (e.key === 'Enter' && onEdit) {
        e.preventDefault();
        onEdit();
      }
    },
    dragHandleRender: props.renderDragHandle,
    withDragHandle: !!props.renderDragHandle,
    actions: [renderActions({
      entityFile: entityFile,
      isDisabled: isDisabled,
      onEdit: onEdit,
      onRemove: onRemove
    }), entityFile ? renderAssetInfo({
      entityFile: entityFile
    }) : null].filter(function (item) {
      return item;
    })
  });
};

function FetchingWrappedAssetCard(props) {
  var _useEntity = useEntity('Asset', props.assetId),
      asset = _useEntity.data,
      status = _useEntity.status;

  var _useEntityLoader = useEntityLoader(),
      getEntityScheduledActions = _useEntityLoader.getEntityScheduledActions;

  var loadEntityScheduledActions = React.useCallback(function () {
    return getEntityScheduledActions('Asset', props.assetId);
  }, [getEntityScheduledActions, props.assetId]);
  React.useEffect(function () {
    if (asset) {
      props.onAction && props.onAction({
        type: 'rendered',
        entity: 'Asset'
      });
    } // eslint-disable-next-line react-hooks/exhaustive-deps -- TODO: Evaluate the dependencies

  }, [asset]);

  var onEdit = /*#__PURE__*/function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee() {
      var _yield$props$sdk$navi, slide;

      return runtime_1.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return props.sdk.navigator.openAsset(props.assetId, {
                slideIn: true
              });

            case 2:
              _yield$props$sdk$navi = _context.sent;
              slide = _yield$props$sdk$navi.slide;
              props.onAction && props.onAction({
                entity: 'Asset',
                type: 'edit',
                id: props.assetId,
                contentTypeId: '',
                slide: slide
              });

            case 5:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));

    return function onEdit() {
      return _ref.apply(this, arguments);
    };
  }();

  var onRemove = function onRemove() {
    props.onRemove();
    props.onAction && props.onAction({
      entity: 'Asset',
      type: 'delete',
      id: props.assetId,
      contentTypeId: ''
    });
  };

  return React.useMemo(function () {
    if (status === 'error') {
      var card = React.createElement(MissingEntityCard, {
        entityType: "Asset",
        asSquare: props.viewType !== 'link',
        isDisabled: props.isDisabled,
        onRemove: onRemove
      });

      if (props.renderCustomMissingEntityCard) {
        return props.renderCustomMissingEntityCard({
          defaultCard: card,
          entity: {
            id: props.assetId,
            type: 'Asset'
          }
        });
      }

      return card;
    }

    var getEntityUrl = props.getEntityUrl;
    var size = props.viewType === 'big_card' ? 'default' : 'small';
    var commonProps = {
      asset: asset,
      entityUrl: getEntityUrl && getEntityUrl(props.assetId),
      size: size,
      isDisabled: props.isDisabled,
      localeCode: props.sdk.field.locale,
      defaultLocaleCode: props.sdk.locales["default"],
      renderDragHandle: props.renderDragHandle,
      onEdit: onEdit,
      onRemove: onRemove
    };

    if (props.viewType === 'link') {
      if (status === 'loading') {
        return React.createElement(f36Components.EntryCard, {
          size: "small",
          isLoading: true
        });
      }

      return React.createElement(WrappedAssetLink, _extends({}, commonProps, {
        href: commonProps.entityUrl,
        getEntityScheduledActions: loadEntityScheduledActions
      }));
    }

    if (status === 'loading') {
      return React.createElement(f36Components.AssetCard, {
        size: size,
        isLoading: true
      });
    }

    function renderDefaultCard(props) {
      // isClickable has a default value, so omit it from the props
      var builtinCardProps = _extends({}, commonProps, props, {
        getEntityScheduledActions: loadEntityScheduledActions,
        asset: (props == null ? void 0 : props.entity) || commonProps.asset,
        getAssetUrl: getEntityUrl
      });

      return React.createElement(WrappedAssetCard, _extends({}, builtinCardProps));
    }

    if (props.renderCustomCard) {
      var customProps = _extends({}, commonProps, {
        entity: commonProps.asset
      }); // LinkActionsProps are injected higher SingleReferenceEditor/MultipleReferenceEditor


      var renderedCustomCard = props.renderCustomCard(customProps, {}, renderDefaultCard); // Only `false` indicates to render the original card. E.g. `null` would result in no card.

      if (renderedCustomCard !== false) {
        return renderedCustomCard;
      }
    }

    return renderDefaultCard(); // eslint-disable-next-line react-hooks/exhaustive-deps -- TODO: Evaluate the dependencies
  }, [props, status, asset]);
}

function SingleMediaEditor(props) {
  return React.createElement(SingleReferenceEditor, _extends({}, props, {
    entityType: "Asset"
  }), function (_ref) {
    var entityId = _ref.entityId,
        isDisabled = _ref.isDisabled,
        setValue = _ref.setValue;
    return React.createElement(FetchingWrappedAssetCard, _extends({}, props, {
      viewType: "big_card",
      assetId: entityId,
      isDisabled: isDisabled,
      onRemove: function onRemove() {
        setValue(null);
      }
    }));
  });
}
SingleMediaEditor.defaultProps = {
  isInitiallyDisabled: true
};

var styles$6 = {
  gridContainer: /*#__PURE__*/emotion.css({
    position: 'relative',
    display: 'flex',
    flexWrap: 'wrap'
  })
};
function MultipleMediaEditor(props) {
  return React.createElement(MultipleReferenceEditor, _extends({}, props, {
    entityType: "Asset"
  }), function (childrenProps) {
    var _cx;

    return React.createElement(SortableLinkList, _extends({}, childrenProps, {
      className: emotion.cx((_cx = {}, _cx[styles$6.gridContainer] = childrenProps.viewType === 'card', _cx)),
      axis: childrenProps.viewType === 'card' ? 'xy' : 'y',
      useDragHandle: true
    }), function (_ref) {
      var items = _ref.items,
          item = _ref.item,
          index = _ref.index,
          isDisabled = _ref.isDisabled,
          DragHandle = _ref.DragHandle;
      return React.createElement(FetchingWrappedAssetCard, _extends({}, childrenProps, {
        isDisabled: isDisabled,
        key: item.sys.id + "-" + index,
        assetId: item.sys.id,
        onRemove: function onRemove() {
          childrenProps.setValue(items.filter(function (_value, i) {
            return i !== index;
          }));
        },
        renderDragHandle: DragHandle
      }));
    });
  });
}
MultipleMediaEditor.defaultProps = {
  isInitiallyDisabled: true
};

var resolveAsset = function resolveAsset() {
  return Promise.resolve();
}; // we don't want to show scheduled actions for resources


var resolveScheduledActions = function resolveScheduledActions() {
  return Promise.resolve([]);
};

function ContentfulEntryCard(_ref) {
  var info = _ref.info,
      isDisabled = _ref.isDisabled,
      renderDragHandle = _ref.renderDragHandle,
      onRemove = _ref.onRemove,
      onMoveTop = _ref.onMoveTop,
      onMoveBottom = _ref.onMoveBottom,
      getEntryRouteHref = _ref.getEntryRouteHref;
  var resourceSys = info.resource.sys;
  var spaceId = resourceSys.space.sys.id;
  var environmentId = resourceSys.environment.sys.id;
  var entryId = resourceSys.id;
  var resourceHref = getEntryRouteHref({
    spaceId: spaceId,
    environmentId: environmentId,
    entryId: entryId
  }); // TODO: move this into `sdk.navigator.openEntry()`, note that it's signature only include the entry id (not a space or environment)

  var openEntryDetail = function openEntryDetail() {
    window.open(resourceHref, '_blank', 'noopener,noreferrer');
  };

  return React.createElement(WrappedEntryCard, {
    entry: info.resource,
    isDisabled: isDisabled,
    hasCardEditActions: false,
    contentType: info.contentType,
    // we use the default locale from the space the entry belongs to
    // as we assume this gives a more consistent behaviour.
    // locales will inevitably differ from space to space, so it's likely
    // that the current locale does not exist in the "remote" space
    localeCode: info.defaultLocaleCode,
    defaultLocaleCode: info.defaultLocaleCode,
    size: "small",
    getAsset: resolveAsset,
    getEntityScheduledActions: resolveScheduledActions,
    spaceName: info.space.name,
    renderDragHandle: renderDragHandle,
    isClickable: true,
    onEdit: openEntryDetail,
    hasCardRemoveActions: Boolean(onRemove),
    onRemove: onRemove,
    onMoveBottom: onMoveBottom,
    onMoveTop: onMoveTop,
    entryUrl: resourceHref
  });
}

var styles$7 = {
  card: /*#__PURE__*/emotion.css({
    position: 'relative'
  })
};
function UnsupportedEntityCard(props) {
  return React__default.createElement(f36Components.Card, {
    className: styles$7.card
  }, React__default.createElement(f36Components.SectionHeading, {
    marginBottom: "none"
  }, "Resource type ", props.entityType, " is currently not supported"));
}

function ResourceCardSkeleton() {
  return React.createElement(f36Components.EntryCard, {
    size: "small",
    isLoading: true
  });
}

function ExistingResourceCard(props) {
  var resourceLink = props.resourceLink,
      inView = props.inView,
      _props$index = props.index,
      index = _props$index === void 0 ? 0 : _props$index;
  var resourceOptions = {
    priority: index * -1,
    enabled: inView
  };

  var _useResource = useResource(resourceLink.sys.linkType, resourceLink.sys.urn, resourceOptions),
      data = _useResource.data,
      error = _useResource.error;

  if (!data && !error) {
    return React.createElement(ResourceCardSkeleton, null);
  }

  if (data) {
    return React.createElement(ContentfulEntryCard, _extends({
      info: data
    }, props));
  }

  if (isUnsupportedError(error)) {
    return React.createElement(UnsupportedEntityCard, {
      entityType: resourceLink.sys.linkType
    });
  }

  return React.createElement(MissingEntityCard, {
    entityType: "Entry",
    isDisabled: props.isDisabled,
    onRemove: props.onRemove
  });
}

function ResourceCardWrapper(props) {
  if (!props.resourceLink) {
    return null;
  }

  return React.createElement(ExistingResourceCard, _extends({}, props, {
    resourceLink: props.resourceLink,
    getEntryRouteHref: props.getEntryRouteHref
  }));
}

function ResourceCard(props) {
  var _useInView = reactIntersectionObserver.useInView({
    triggerOnce: true,
    rootMargin: '300px 0px 0px 300px'
  }),
      ref = _useInView.ref,
      inView = _useInView.inView; // Forma does not offer us to pass refs, so we need an additional wrapper here


  return React.createElement("div", {
    ref: ref
  }, React.createElement(ResourceCardWrapper, _extends({}, props, {
    inView: inView
  })));
}

var toLinkItem = function toLinkItem(entry, apiUrl) {
  var _entry$sys$urn;

  return {
    sys: {
      type: 'ResourceLink',
      linkType: 'Contentful:Entry',
      urn: (_entry$sys$urn = entry.sys.urn) != null ? _entry$sys$urn : "crn:" + apiUrl + ":::content:spaces/" + entry.sys.space.sys.id + "/entries/" + entry.sys.id
    }
  };
};

var getUpdatedValue = function getUpdatedValue(field, entries, apiUrl) {
  var multiple = field.type === 'Array';

  if (multiple) {
    var linkItems = entries.map(function (entry) {
      return toLinkItem(entry, apiUrl);
    });
    var prevValue = field.getValue() || [];
    return [].concat(prevValue, linkItems);
  } else {
    return toLinkItem(entries[0], apiUrl);
  }
};

function useResourceLinkActions(_ref) {
  var dialogs = _ref.dialogs,
      field = _ref.field,
      onAfterLink = _ref.onAfterLink,
      apiUrl = _ref.apiUrl;
  var handleAfterLink = React.useCallback(function (entries) {
    if (!onAfterLink) {
      return;
    }

    entries.forEach(onAfterLink);
  }, [onAfterLink]);
  var onLinkedExisting = React.useMemo(function () {
    return function (entries) {
      var updatedValue = getUpdatedValue(field, entries, apiUrl);
      field.setValue(updatedValue);
      handleAfterLink(entries);
    };
  }, [field, handleAfterLink, apiUrl]);
  var multiple = field.type === 'Array';
  var onLinkExisting = React.useMemo(function () {
    var promptSelection = multiple ? /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee() {
      return runtime_1.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return dialogs.selectMultipleResourceEntries({
                // @ts-expect-error wait for update of app-sdk version
                allowedResources: field.allowedResources
              });

            case 2:
              return _context.abrupt("return", _context.sent);

            case 3:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    })) : /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee2() {
      return runtime_1.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.next = 2;
              return dialogs.selectSingleResourceEntry({
                // @ts-expect-error wait for update of app-sdk version
                allowedResources: field.allowedResources
              });

            case 2:
              _context2.t0 = _context2.sent;
              return _context2.abrupt("return", [_context2.t0]);

            case 4:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    }));
    return /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee3() {
      var res;
      return runtime_1.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _context3.next = 2;
              return promptSelection();

            case 2:
              res = _context3.sent;

              if (res) {
                _context3.next = 5;
                break;
              }

              return _context3.abrupt("return");

            case 5:
              onLinkedExisting(res);

            case 6:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3);
    })); // @ts-expect-error wait for update of app-sdk version
  }, [dialogs, field.allowedResources, multiple, onLinkedExisting]);
  return {
    onLinkExisting: onLinkExisting,
    onLinkedExisting: onLinkedExisting,
    // hardcoded values to match interface for standard reference field actions
    entityType: 'Entry',
    contentTypes: [],
    canCreateEntity: false,
    canLinkMultiple: multiple,
    canLinkEntity: true,
    isDisabled: false,
    isEmpty: false,
    isFull: false,
    // eslint-disable-next-line -- hardcoded values to match interface for standard reference field actions
    onCreate: function () {
      var _onCreate = _asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee4() {
        return runtime_1.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4);
      }));

      function onCreate() {
        return _onCreate.apply(this, arguments);
      }

      return onCreate;
    }(),
    // eslint-disable-next-line -- hardcoded values to match interface for standard reference field actions
    onCreated: function onCreated() {}
  };
}

function ResourceEditor(props) {
  var setValue = props.setValue,
      items = props.items,
      apiUrl = props.apiUrl;
  var onSortStart = React.useCallback(function (_, event) {
    return event.preventDefault();
  }, []);
  var onSortEnd = React.useCallback(function (_ref) {
    var oldIndex = _ref.oldIndex,
        newIndex = _ref.newIndex;
    var newItems = arrayMove(items, oldIndex, newIndex);
    setValue(newItems);
  }, [items, setValue]);
  var onMove = React.useCallback(function (oldIndex, newIndex) {
    var newItems = arrayMove(items, oldIndex, newIndex);
    setValue(newItems);
  }, [items, setValue]);
  var onRemoteItemAtIndex = React.useCallback(function (index) {
    setValue(items.filter(function (_v, i) {
      return i !== index;
    }));
  }, [items, setValue]);
  var _props$sdk = props.sdk,
      dialogs = _props$sdk.dialogs,
      field = _props$sdk.field;
  var linkActionsProps = useResourceLinkActions({
    dialogs: dialogs,
    field: field,
    apiUrl: apiUrl
  });
  return React.createElement(React.Fragment, null, props.children(_extends({}, props, {
    onSortStart: onSortStart,
    onSortEnd: onSortEnd,
    onMove: onMove,
    onRemoteItemAtIndex: onRemoteItemAtIndex
  })), React.createElement(CombinedLinkEntityActions, _extends({}, linkActionsProps, {
    renderCustomActions: props.renderCustomActions
  })));
} // provides memoized callbacks bound to a given item


function WithPerItemCallbacks(_ref2) {
  var listLength = _ref2.listLength,
      index = _ref2.index,
      onMove = _ref2.onMove,
      onRemoteItemAtIndex = _ref2.onRemoteItemAtIndex,
      children = _ref2.children;
  var handleMoveTop = React.useMemo(function () {
    return index > 0 ? function () {
      return onMove(index, 0);
    } : undefined;
  }, [index, onMove]);
  var handleMoveBottom = React.useMemo(function () {
    return index < listLength - 1 ? function () {
      return onMove(index, listLength - 1);
    } : undefined;
  }, [index, onMove, listLength]);
  var handleRemove = React.useCallback(function () {
    return onRemoteItemAtIndex(index);
  }, [index, onRemoteItemAtIndex]);
  return React.createElement(React.Fragment, null, children({
    onMoveBottom: handleMoveBottom,
    onMoveTop: handleMoveTop,
    onRemove: handleRemove
  }));
}

var EMPTY_ARRAY = [];
function MultipleResourceReferenceEditor(props) {
  return React.createElement(EntityProvider, {
    sdk: props.sdk
  }, React.createElement(fieldEditorShared.FieldConnector, {
    throttle: 0,
    field: props.sdk.field,
    isInitiallyDisabled: props.isInitiallyDisabled,
    isEqualValues: deepEqual
  }, function (_ref3) {
    var value = _ref3.value,
        disabled = _ref3.disabled,
        setValue = _ref3.setValue,
        externalReset = _ref3.externalReset;
    return React.createElement(ResourceEditor, _extends({}, props, {
      items: value || EMPTY_ARRAY,
      isDisabled: disabled,
      setValue: setValue,
      renderCustomActions: props.renderCustomActions,
      key: externalReset + "-list"
    }), function (editorProps) {
      return React.createElement(SortableLinkList, _extends({}, editorProps), function (_ref4) {
        var item = _ref4.item,
            isDisabled = _ref4.isDisabled,
            DragHandle = _ref4.DragHandle,
            index = _ref4.index;
        return React.createElement(WithPerItemCallbacks, {
          index: index,
          onMove: editorProps.onMove,
          onRemoteItemAtIndex: editorProps.onRemoteItemAtIndex,
          listLength: (value == null ? void 0 : value.length) || 0
        }, function (_ref5) {
          var onMoveBottom = _ref5.onMoveBottom,
              onMoveTop = _ref5.onMoveTop,
              onRemove = _ref5.onRemove;
          return React.createElement(ResourceCard, {
            index: index,
            resourceLink: item,
            isDisabled: isDisabled,
            renderDragHandle: DragHandle,
            onMoveTop: onMoveTop,
            onMoveBottom: onMoveBottom,
            onRemove: onRemove,
            getEntryRouteHref: props.getEntryRouteHref
          });
        });
      });
    });
  }));
}

function SingleResourceReferenceEditor(props) {
  var _props$sdk = props.sdk,
      dialogs = _props$sdk.dialogs,
      field = _props$sdk.field;
  var linkActionsProps = useResourceLinkActions({
    dialogs: dialogs,
    field: field,
    apiUrl: props.apiUrl
  });
  return React.createElement(EntityProvider, {
    sdk: props.sdk
  }, React.createElement(fieldEditorShared.FieldConnector, {
    throttle: 0,
    field: props.sdk.field,
    isInitiallyDisabled: props.isInitiallyDisabled,
    isEqualValues: deepEqual
  }, function (_ref) {
    var value = _ref.value,
        disabled = _ref.disabled;
    return value ? React.createElement(ResourceCard, {
      onRemove: function onRemove() {
        return props.sdk.field.removeValue();
      },
      resourceLink: value,
      isDisabled: disabled,
      getEntryRouteHref: props.getEntryRouteHref
    }) : React.createElement(CombinedLinkEntityActions, _extends({}, linkActionsProps, {
      renderCustomActions: props.renderCustomActions
    }));
  }));
}

exports.AssetThumbnail = AssetThumbnail;
exports.CombinedLinkActions = CombinedLinkActions;
exports.CreateEntryLinkButton = CreateEntryLinkButton;
exports.CreateEntryMenuTrigger = CreateEntryMenuTrigger;
exports.EntityProvider = EntityProvider;
exports.MissingEntityCard = MissingEntityCard;
exports.MultipleEntryReferenceEditor = MultipleEntryReferenceEditor;
exports.MultipleMediaEditor = MultipleMediaEditor;
exports.MultipleResourceReferenceEditor = MultipleResourceReferenceEditor;
exports.ScheduledIconWithTooltip = ScheduledIconWithTooltip;
exports.SingleEntryReferenceEditor = SingleEntryReferenceEditor;
exports.SingleMediaEditor = SingleMediaEditor;
exports.SingleResourceReferenceEditor = SingleResourceReferenceEditor;
exports.SortableLinkList = SortableLinkList;
exports.WrappedAssetCard = WrappedAssetCard;
exports.WrappedEntryCard = WrappedEntryCard;
exports.getScheduleTooltipContent = getScheduleTooltipContent;
exports.useEntity = useEntity;
exports.useEntityLoader = useEntityLoader;
exports.useResource = useResource;
//# sourceMappingURL=field-editor-reference.cjs.development.js.map
