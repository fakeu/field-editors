'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var React = require('react');
var React__default = _interopDefault(React);
var isNumber = _interopDefault(require('lodash/isNumber'));
var throttle = _interopDefault(require('lodash/throttle'));
var fieldEditorShared = require('@contentful/field-editor-shared');
var deepEqual = _interopDefault(require('deep-equal'));
var emotion = require('emotion');
var tokens = _interopDefault(require('@contentful/f36-tokens'));
var f36Components = require('@contentful/f36-components');
var GoogleMapReact = _interopDefault(require('google-map-react'));

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

var ViewType;

(function (ViewType) {
  ViewType["Address"] = "Address";
  ViewType["Coordinates"] = "Coordinates";
})(ViewType || (ViewType = {}));

var styles = {
  root: /*#__PURE__*/emotion.css({
    width: '100%'
  }),
  input: /*#__PURE__*/emotion.css({
    position: 'relative',
    width: '100%'
  }),
  spinner: /*#__PURE__*/emotion.css({
    position: 'absolute',
    right: 10,
    top: 10,
    zIndex: 99
  }),
  validationMessage: /*#__PURE__*/emotion.css({
    marginTop: tokens.spacingS
  }),
  suggestion: /*#__PURE__*/emotion.css({
    position: 'absolute',
    transform: 'translateY(100%)',
    bottom: 0,
    left: 0,
    zIndex: 1
  })
};
function LocationSearchInput(props) {
  var _React$useState = React__default.useState(false),
      isSearching = _React$useState[0],
      setIsSearching = _React$useState[1];

  var _React$useState2 = React__default.useState(''),
      address = _React$useState2[0],
      setAddress = _React$useState2[1];

  var _React$useState3 = React__default.useState(false),
      hasError = _React$useState3[0],
      setHasError = _React$useState3[1];

  var _React$useState4 = React__default.useState(null),
      suggestion = _React$useState4[0],
      setSuggestion = _React$useState4[1];

  React__default.useEffect(function () {
    setIsSearching(true);
    props.onGetAddressFromLocation(props.value, address).then(function (address) {
      setAddress(address);
      setIsSearching(false);
    }); // eslint-disable-next-line react-hooks/exhaustive-deps -- TODO: Evaluate the dependencies
  }, [props.value, props.disabled]);
  return React__default.createElement("div", {
    className: styles.root
  }, React__default.createElement("div", {
    className: styles.input
  }, React__default.createElement(f36Components.TextInput, {
    testId: "location-editor-search",
    isInvalid: hasError,
    placeholder: "Start typing to find location",
    value: address,
    onChange: function onChange(e) {
      setAddress(e.target.value);
      setHasError(false);
      setSuggestion(null);

      if (e.target.value === '') {
        props.onChangeLocation(undefined);
        return;
      }

      setIsSearching(true);
      props.onSearchAddress(e.target.value).then(function (value) {
        setIsSearching(false);

        if (value === null) {
          setHasError(false);
        } else if (value.length === 0) {
          setHasError(true);
        } else {
          setHasError(false);
          setSuggestion({
            address: value[0].formatted_address,
            location: {
              lat: Number(value[0].geometry.location.lat().toString().slice(0, 8)),
              lng: Number(value[0].geometry.location.lng().toString().slice(0, 8))
            }
          });
        }
      });
    },
    isDisabled: props.disabled
  }), isSearching && React__default.createElement(f36Components.Spinner, {
    className: styles.spinner
  }), suggestion && React__default.createElement(f36Components.Card, {
    padding: "none",
    className: styles.suggestion
  }, React__default.createElement(f36Components.Button, {
    variant: "transparent",
    testId: "location-editor-suggestion",
    onClick: function onClick() {
      setAddress(suggestion.address);
      props.onChangeLocation(suggestion.location);
      setSuggestion(null);
    }
  }, suggestion.address)), hasError && React__default.createElement(f36Components.ValidationMessage, {
    testId: "location-editor-not-found",
    className: styles.validationMessage
  }, "No results found for ", React__default.createElement("strong", null, address), ". Please make sure that address is spelled correctly.")));
}

var styles$1 = {
  root: /*#__PURE__*/emotion.css({
    display: 'flex',
    flexDirection: 'row',
    marginTop: tokens.spacingS,
    alignItems: 'flex-end'
  }),
  main: /*#__PURE__*/emotion.css({
    flexGrow: 1
  }),
  secondary: /*#__PURE__*/emotion.css({
    minWidth: '70px',
    textAlign: 'right'
  }),
  inputsRow: /*#__PURE__*/emotion.css({
    display: 'flex',
    marginTop: tokens.spacingS,
    fontSize: tokens.fontSizeM,
    color: tokens.gray900,
    fontFamily: tokens.fontStackPrimary,
    alignItems: 'center'
  }),
  splitter: /*#__PURE__*/emotion.css({
    width: tokens.spacingL
  }),
  clearBtn: /*#__PURE__*/emotion.css({
    marginBottom: tokens.spacingS
  })
};
function LocationSelector(props) {
  return React__default.createElement("div", {
    className: styles$1.root
  }, React__default.createElement("div", {
    className: styles$1.main
  }, React__default.createElement(f36Components.Flex, {
    flexDirection: "row"
  }, React__default.createElement(f36Components.Radio, {
    className: emotion.css({
      flexBasis: '100%'
    }),
    id: ViewType.Address,
    testId: "location-editor-address-radio",
    isDisabled: props.disabled,
    value: ViewType.Address,
    isChecked: props.view === ViewType.Address,
    onChange: function onChange() {
      props.onChangeView(ViewType.Address);
    }
  }, "Address"), React__default.createElement(f36Components.Radio, {
    className: emotion.css({
      flexBasis: '100%'
    }),
    id: ViewType.Coordinates,
    testId: "location-editor-coordinates-radio",
    isDisabled: props.disabled,
    value: ViewType.Coordinates,
    isChecked: props.view === ViewType.Coordinates,
    onChange: function onChange() {
      props.onChangeView(ViewType.Coordinates);
    }
  }, "Coordinates")), props.view === ViewType.Address && React__default.createElement("div", {
    className: styles$1.inputsRow
  }, React__default.createElement(LocationSearchInput, {
    onSearchAddress: props.onSearchAddress,
    onGetAddressFromLocation: props.onGetAddressFromLocation,
    disabled: props.disabled,
    value: props.value,
    onChangeLocation: props.onChangeLocation
  })), props.view === ViewType.Coordinates && React__default.createElement("div", {
    className: styles$1.inputsRow
  }, React__default.createElement("label", {
    htmlFor: "latitude"
  }, "Latitude"), React__default.createElement("div", {
    className: styles$1.splitter
  }), React__default.createElement(f36Components.TextInput, {
    id: "latitude",
    testId: "location-editor-latitude",
    placeholder: "Between -90 and 90",
    isDisabled: props.disabled,
    value: props.value ? String(props.value.lat) : '',
    onChange: function onChange(e) {
      props.onChangeLocation({
        lng: props.value && props.value.lng !== undefined ? props.value.lng : 0,
        lat: Number(e.target.value) || 0
      });
    },
    type: "number",
    max: "90",
    min: "-90",
    step: "0.1"
  }), React__default.createElement("div", {
    className: styles$1.splitter
  }), React__default.createElement("label", {
    htmlFor: "longitude"
  }, "Longitude"), React__default.createElement("div", {
    className: styles$1.splitter
  }), React__default.createElement(f36Components.TextInput, {
    id: "longitude",
    testId: "location-editor-longitude",
    placeholder: "Between -180 and 180",
    isDisabled: props.disabled,
    value: props.value ? String(props.value.lng) : '',
    onChange: function onChange(e) {
      props.onChangeLocation({
        lat: props.value && props.value.lat !== undefined ? props.value.lat : 0,
        lng: Number(e.target.value) || 0
      });
    },
    type: "number",
    max: "180",
    min: "-180",
    step: "0.1"
  }))), React__default.createElement("div", {
    className: styles$1.secondary
  }, React__default.createElement(f36Components.TextLink, {
    as: "button",
    isDisabled: props.disabled,
    testId: "location-editor-clear",
    className: styles$1.clearBtn,
    onClick: function onClick() {
      props.onChangeLocation(undefined);
    }
  }, "Clear")));
}

var styles$2 = {
  root: /*#__PURE__*/emotion.css({
    height: '300px',
    width: '100%'
  })
};
var BerlinLocation = {
  lat: 52.5018,
  lng: 13.41115439
};
var GoogleMapView = /*#__PURE__*/function (_React$Component) {
  _inheritsLoose(GoogleMapView, _React$Component);

  function GoogleMapView(props) {
    var _this;

    _this = _React$Component.call(this, props) || this;

    _this.onGoogleApiLoaded = function (event) {
      var maps = event.maps,
          map = event.map;
      var marker = new maps.Marker({
        map: map,
        position: map.getCenter(),
        cursor: _this.props.disabled ? 'not-allowed' : 'auto',
        draggable: !_this.props.disabled,
        visible: Boolean(_this.props.location)
      });
      maps.event.addListener(map, 'click', function (event) {
        if (_this.props.disabled || !_this.state.marker || !_this.state.maps) {
          return;
        }

        _this.state.marker.setPosition(event.latLng);

        _this.state.marker.setVisible(true);

        _this.props.onChangeLocation({
          lat: event.latLng.lat(),
          lng: event.latLng.lng()
        });
      });
      maps.event.addListener(marker, 'dragend', function (event) {
        _this.props.onChangeLocation({
          lat: event.latLng.lat(),
          lng: event.latLng.lng()
        });
      });

      _this.setState({
        marker: marker,
        maps: maps
      }, function () {
        _this.props.onGoogleApiLoaded({
          maps: maps
        });
      });
    };

    _this.state = {
      marker: undefined,
      maps: undefined
    };
    return _this;
  }

  var _proto = GoogleMapView.prototype;

  _proto.componentDidUpdate = function componentDidUpdate() {
    if (this.state.marker && this.state.maps) {
      if (this.props.location) {
        var latLng = new this.state.maps.LatLng(this.props.location.lat, this.props.location.lng);
        this.state.marker.setPosition(latLng);
        this.state.marker.setVisible(true);
      } else {
        this.state.marker.setVisible(false);
      }

      this.state.marker.setDraggable(!this.props.disabled);
      this.state.marker.setCursor(this.props.disabled ? 'not-allowed' : 'auto');
    }
  };

  _proto.render = function render() {
    return React__default.createElement("div", {
      className: styles$2.root
    }, React__default.createElement(GoogleMapReact, {
      draggable: !this.props.disabled,
      bootstrapURLKeys: this.props.googleMapsKey ? {
        key: this.props.googleMapsKey
      } : undefined,
      defaultCenter: BerlinLocation,
      center: this.props.location,
      options: {
        scrollwheel: false,
        mapTypeId: 'roadmap'
      },
      defaultZoom: 6,
      yesIWantToUseGoogleMapApiInternals: true,
      onGoogleApiLoaded: this.onGoogleApiLoaded
    }));
  };

  return GoogleMapView;
}(React__default.Component);

function toLocationValue(coords) {
  if (coords && isNumber(coords.lat) && isNumber(coords.lng)) {
    return {
      lat: coords.lat,
      lon: coords.lng
    };
  } else {
    return null;
  }
}

var LocationEditor = /*#__PURE__*/function (_React$Component) {
  _inheritsLoose(LocationEditor, _React$Component);

  function LocationEditor(props) {
    var _this;

    _this = _React$Component.call(this, props) || this;
    _this.onSearchAddress = throttle(function (value) {
      if (!_this.state.mapsObject) {
        return Promise.resolve(null);
      }

      var mapsObject = _this.state.mapsObject;

      if (!value) {
        return Promise.resolve(null);
      }

      return new Promise(function (resolve) {
        var geocoder = new mapsObject.Geocoder();
        geocoder.geocode({
          address: value
        }, resolve, function () {
          resolve(null);
        });
      });
    }, 300);

    _this.onGetAddressFromLocation = function (location, value) {
      if (!_this.state.mapsObject || !location) {
        return Promise.resolve('');
      }

      var mapsObject = _this.state.mapsObject;
      return new Promise(function (resolve) {
        var geocoder = new mapsObject.Geocoder();
        geocoder.geocode({
          location: location
        }, function (result) {
          if (result && result.length > 0) {
            var addresses = result.map(function (item) {
              return item.formatted_address;
            });
            resolve(addresses.find(function (item) {
              return item === value;
            }) || addresses[0]);
          } else {
            resolve('');
          }
        }, function () {
          resolve('');
        });
      });
    };

    _this.state = {
      localValue: props.value ? {
        lng: props.value.lon,
        lat: props.value.lat
      } : undefined,
      mapsObject: null
    };
    return _this;
  } // @ts-expect-error


  var _proto = LocationEditor.prototype;

  _proto.render = function render() {
    var _this2 = this;

    var _this$state = this.state,
        mapsObject = _this$state.mapsObject,
        localValue = _this$state.localValue;
    return React.createElement("div", {
      "data-test-id": "location-editor"
    }, React.createElement(GoogleMapView, {
      disabled: this.props.disabled || mapsObject === null,
      googleMapsKey: this.props.googleMapsKey,
      location: localValue,
      onGoogleApiLoaded: function onGoogleApiLoaded(_ref) {
        var maps = _ref.maps;

        _this2.setState({
          mapsObject: maps
        });
      },
      onChangeLocation: function onChangeLocation(coords) {
        _this2.setState({
          localValue: coords
        });

        _this2.props.setValue(toLocationValue(coords));
      }
    }), React.createElement(LocationSelector, {
      disabled: this.props.disabled || mapsObject === null,
      value: localValue,
      view: this.props.selectedView,
      onChangeView: function onChangeView(view) {
        _this2.props.setSelectedView(view);
      },
      onChangeLocation: function onChangeLocation(coords) {
        _this2.setState({
          localValue: coords
        });

        _this2.props.setValue(toLocationValue(coords));
      },
      onSearchAddress: this.onSearchAddress,
      onGetAddressFromLocation: this.onGetAddressFromLocation
    }));
  };

  return LocationEditor;
}(React.Component);
function LocationEditorConnected(props) {
  var field = props.field;
  var googleMapsKey = props.parameters ? props.parameters.instance.googleMapsKey : undefined;

  var _React$useState = React.useState(ViewType.Address),
      selectedView = _React$useState[0],
      setSelectedView = _React$useState[1];

  return React.createElement(fieldEditorShared.FieldConnector, {
    isEqualValues: function isEqualValues(value1, value2) {
      return deepEqual(value1, value2);
    },
    field: field,
    isInitiallyDisabled: props.isInitiallyDisabled
  }, function (_ref2) {
    var value = _ref2.value,
        disabled = _ref2.disabled,
        setValue = _ref2.setValue,
        externalReset = _ref2.externalReset;
    return React.createElement(LocationEditor // on external change reset component completely and init with initial value again
    , {
      // on external change reset component completely and init with initial value again
      key: "location-editor-" + externalReset,
      value: value,
      disabled: disabled,
      setValue: setValue,
      googleMapsKey: googleMapsKey,
      selectedView: selectedView,
      setSelectedView: setSelectedView
    });
  });
}
LocationEditorConnected.defaultProps = {
  isInitiallyDisabled: true
};

var LocationEditor$1 = LocationEditorConnected;

exports.LocationEditor = LocationEditor$1;
//# sourceMappingURL=field-editor-location.cjs.development.js.map
