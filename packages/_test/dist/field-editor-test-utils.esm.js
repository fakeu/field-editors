import mitt from 'mitt';
import React from 'react';
import { css } from 'emotion';
import tokens from '@contentful/f36-tokens';

function createFakeCMAAdapter(overrides) {
  function makeRequest(_ref) {
    var _overrides$entityType, _overrides$entityType2, _overrides$entityType3;

    var entityType = _ref.entityType,
        action = _ref.action,
        params = _ref.params;
    return (// @ts-expect-error
      (_overrides$entityType = overrides == null ? void 0 : (_overrides$entityType2 = overrides[entityType]) == null ? void 0 : (_overrides$entityType3 = _overrides$entityType2[action]) == null ? void 0 : _overrides$entityType3.call(_overrides$entityType2, params)) != null ? _overrides$entityType : Promise.reject("Override for " + entityType + "." + action + " is not defined")
    );
  }

  return {
    makeRequest: makeRequest
  };
}

function identity(item) {
  return item;
}

function createFakeFieldAPI(customizeMock, initialValue) {
  if (customizeMock === void 0) {
    customizeMock = identity;
  }

  var emitter = mitt(); // eslint-disable-next-line -- TODO: describe this disable

  var _value = initialValue;
  return [customizeMock({
    id: 'fake-id',
    locale: 'en-US',
    type: 'Symbol',
    validations: [],
    required: false,
    onValueChanged: function onValueChanged() {
      var fn;

      if (typeof (arguments.length <= 0 ? undefined : arguments[0]) === 'string') {
        fn = arguments.length <= 1 ? undefined : arguments[1];
      } else {
        fn = arguments.length <= 0 ? undefined : arguments[0];
      }

      emitter.on('onValueChanged', fn);
      return function () {
        emitter.off('onValueChanged', fn);
      };
    },
    onIsDisabledChanged: function onIsDisabledChanged(fn) {
      emitter.on('onIsDisabledChanged', fn);
      return function () {
        emitter.off('onIsDisabledChanged', fn);
      };
    },
    onSchemaErrorsChanged: function onSchemaErrorsChanged(fn) {
      emitter.on('onSchemaErrorsChanged', fn);
      return function () {
        emitter.off('onSchemaErrorsChanged', fn);
      };
    },
    getValue: function getValue() {
      emitter.emit('getValue');
      return _value;
    },
    setInvalid: function setInvalid() {
      emitter.emit('setInvalid');
    },
    setValue: function setValue(value) {
      _value = value;
      emitter.emit('setValue', _value);
      emitter.emit('onValueChanged', _value);
      return Promise.resolve(undefined);
    },
    removeValue: function removeValue() {
      _value = undefined;
      emitter.emit('removeValue');
      emitter.emit('onValueChanged', undefined);
      return Promise.resolve();
    }
  }), emitter];
}

function identity$1(item) {
  return item;
}

function createFakeLocalesAPI(customizeMock) {
  if (customizeMock === void 0) {
    customizeMock = identity$1;
  }

  return customizeMock({
    "default": 'en-US',
    available: ['en-US', 'de-DE'],
    fallbacks: {
      'en-US': undefined,
      'de-DE': undefined
    },
    names: {
      'en-US': 'English',
      'de-DE': 'Deutsch'
    },
    optional: {
      'en-US': false,
      'de-DE': false
    },
    direction: {
      'en-US': 'ltr',
      'de-DE': 'ltr'
    }
  });
}

var createEntry = function createEntry(contentTypeId, fields) {
  return {
    fields: fields,
    sys: {
      id: "entry-" + Math.round(Math.random() * 1000),
      type: 'Entry',
      space: {
        sys: {
          id: 'space',
          type: 'Link',
          linkType: 'Space'
        }
      },
      environment: {
        sys: {
          id: 'e123',
          type: 'Link',
          linkType: 'Environment'
        }
      },
      version: 2,
      publishedVersion: 2,
      publishedCounter: 1,
      createdAt: '2020-02-15T17:41:01.000Z',
      updatedAt: '2020-02-17T20:20:01.000Z',
      publishedAt: '2020-02-18T17:41:01.000Z',
      firstPublishedAt: '2020-02-18T17:41:01.000Z',
      createdBy: {
        sys: {
          id: 'u123',
          type: 'Link',
          linkType: 'User'
        }
      },
      updatedBy: {
        sys: {
          id: 'u123',
          type: 'Link',
          linkType: 'User'
        }
      },
      publishedBy: {
        sys: {
          id: 'u123',
          type: 'Link',
          linkType: 'User'
        }
      },
      contentType: {
        sys: {
          id: contentTypeId,
          type: 'Link',
          linkType: 'ContentType'
        }
      }
    },
    metadata: {
      tags: []
    }
  };
};

function identity$2(item) {
  return item;
}

var testContentTypes = [{
  name: 'Example Content Type',
  sys: {
    id: 'exampleCT',
    type: 'ContentType',
    space: {
      sys: {
        id: 'space',
        type: 'link',
        linkType: 'Space'
      }
    },
    environment: {
      sys: {
        id: 'env',
        type: 'link',
        linkType: 'Environment'
      }
    },
    version: 1,
    createdAt: '2020-08-11T09:30:29.326Z',
    updatedAt: '2020-08-11T09:30:29.326Z'
  },
  fields: [{
    id: 'exField',
    disabled: false,
    localized: false,
    name: 'Example Field',
    omitted: false,
    required: true,
    type: 'Symbol',
    validations: []
  }, {
    id: 'exDesc',
    disabled: false,
    localized: false,
    name: 'Description Field',
    omitted: false,
    required: false,
    type: 'Text',
    validations: []
  }],
  displayField: 'exField',
  description: ''
}, {
  name: 'Another Content Type',
  sys: {
    id: 'anotherCT',
    type: 'ContentType',
    space: {
      sys: {
        id: 'space',
        type: 'link',
        linkType: 'Space'
      }
    },
    environment: {
      sys: {
        id: 'env',
        type: 'link',
        linkType: 'Environment'
      }
    },
    version: 1,
    createdAt: '2020-08-11T09:30:29.326Z',
    updatedAt: '2020-08-11T09:30:29.326Z'
  },
  fields: [],
  displayField: '',
  description: ''
}];
function createFakeSpaceAPI(customizeMock) {
  if (customizeMock === void 0) {
    customizeMock = identity$2;
  }

  return customizeMock({
    getCachedContentTypes: function getCachedContentTypes() {
      return testContentTypes;
    },
    getContentTypes: function getContentTypes() {
      return Promise.resolve({
        items: testContentTypes,
        total: testContentTypes.length,
        skip: 0,
        limit: 100,
        sys: {
          type: 'Array'
        }
      });
    },
    getEntries: function getEntries(query) {
      var items = [createEntry('exampleCT', {
        exField: {
          'en-US': 'Hello world'
        }
      }), createEntry('exampleCT', {})];
      return Promise.resolve({
        items: !query || query.content_type === 'exampleCT' ? items : [],
        total: items.length,
        skip: 0,
        limit: 100,
        sys: {
          type: 'Array'
        }
      });
    },
    getAssets: function getAssets() {
      return Promise.resolve({
        items: [],
        total: 0,
        skip: 0,
        limit: 100,
        sys: {
          type: 'Array'
        }
      });
    },
    createEntry: function createEntry$1(contentTypeId) {
      return Promise.resolve(createEntry(contentTypeId, {}));
    },
    createAsset: function createAsset() {
      return Promise.resolve({});
    }
  });
}

function createFakeNavigatorAPI() {
  return {
    openEntry: function openEntry(entryId) {
      window.alert("Open entry " + entryId);
    },
    openAsset: function openAsset(assetId) {
      window.alert("Open asset " + assetId);
    }
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

function reducer(state, action) {
  if (action.type === 'add') {
    return _extends({}, state, {
      events: [{
        id: state.events.length + 1,
        type: action.payload.type,
        value: action.payload.value
      }].concat(state.events)
    });
  }

  return state;
}

function ActionsPlayground(props) {
  var _React$useReducer = React.useReducer(reducer, {
    events: []
  }),
      state = _React$useReducer[0],
      dispatch = _React$useReducer[1];

  var onLog = function onLog(type, event) {
    dispatch({
      type: 'add',
      payload: {
        type: type,
        value: event
      }
    });
  };

  React.useEffect(function () {
    props.mitt.on('*', onLog);

    if (window.Cypress) {
      window.editorEvents = [];

      window.setValueExternal = function (value) {
        props.mitt.emit('onValueChanged', value);
      };
    }

    return function () {
      props.mitt.off('*', onLog);
      window.editorEvents = undefined;
      window.setValueExternal = undefined;
    };
  }, [props.mitt]);
  React.useEffect(function () {
    window.editorEvents = [].concat(state.events);
  }, [props, state.events]);
  return React.createElement("div", {
    className: css({
      border: "1px solid " + tokens.gray200,
      padding: tokens.spacingS,
      marginTop: tokens.spacingXl
    })
  }, React.createElement("div", {
    className: css({
      height: 150,
      overflowY: 'scroll',
      fontSize: tokens.fontSizeM
    })
  }, state.events.map(function (log) {
    return React.createElement("div", {
      key: log.id
    }, React.createElement("div", null, React.createElement("code", null, log.id, ". ", log.type)), React.createElement("div", null, log.value ? props.renderValue(log.value, log.type) : React.createElement("pre", null, "undefined")));
  })));
}

ActionsPlayground.defaultProps = {
  renderValue: function JsonStringifiedValue(value) {
    return React.createElement("pre", null, JSON.stringify(value, null, 2));
  }
};

export { ActionsPlayground, createFakeCMAAdapter, createFakeFieldAPI, createFakeLocalesAPI, createFakeNavigatorAPI, createFakeSpaceAPI };
//# sourceMappingURL=field-editor-test-utils.esm.js.map
