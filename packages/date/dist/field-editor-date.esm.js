import React__default, { useMemo, useState, useEffect, useCallback, createElement, Fragment, useRef } from 'react';
import { css } from 'emotion';
import tokens from '@contentful/f36-tokens';
import { FieldConnector } from '@contentful/field-editor-shared';
import { Datepicker, Flex, TextInput, Select, TextLink } from '@contentful/f36-components';
import moment from 'moment';

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

var YEAR_RANGE = 100;
var styles = {
  root: /*#__PURE__*/css({
    maxWidth: '270px'
  })
};
var DatepickerInput = function DatepickerInput(props) {
  var _props$value;

  var _useMemo = useMemo(function () {
    var fromDate = new Date();
    fromDate.setFullYear(fromDate.getFullYear() - YEAR_RANGE);
    var toDate = new Date();
    toDate.setFullYear(toDate.getFullYear() + YEAR_RANGE);
    return [fromDate, toDate];
  }, []),
      fromDate = _useMemo[0],
      toDate = _useMemo[1]; // The DatepickerInput should be time and timezone agnostic,
  // thats why we don't use moment().toDate() to get Date object.
  // moment().toDate() takes into account time and timezone and converts it
  // based on your system timezone which can result in the date change.
  // e.g. if user has a timezone +02:00, moment('2022-09-16T00:00+04:00').toDate()
  // will return September 15 instead of September 16


  var dateObj = (_props$value = props.value) == null ? void 0 : _props$value.toObject();
  var selectedDate = dateObj ? new Date(dateObj.years, dateObj.months, dateObj.date) : undefined;
  return React__default.createElement(Datepicker, {
    className: styles.root,
    selected: selectedDate,
    onSelect: function onSelect(day) {
      var momentDay = day ? moment(day) : undefined;
      props.onChange(momentDay);
    },
    inputProps: {
      isDisabled: props.disabled,
      placeholder: ''
    },
    fromDate: fromDate,
    toDate: toDate
  });
};

var validInputFormats = ['hh:mm a', 'hh:mm A', 'h:mm a', 'h:mm A', 'hh:mm', 'k:mm', 'kk:mm', 'h a', 'h A', 'h', 'hh', 'HH'];

function parseRawInput(raw) {
  var time = null; // eslint-disable-next-line -- TODO: describe this disable  @typescript-eslint/prefer-for-of

  for (var i = 0; i < validInputFormats.length; i++) {
    var date = moment(raw, validInputFormats[i]);

    if (date.isValid()) {
      time = date;
      break;
    }
  }

  return time;
}

var getDefaultTime = function getDefaultTime() {
  return moment("12:00 AM", 'hh:mm A');
};

var formatToString = function formatToString(uses12hClock, value) {
  return uses12hClock ? value.format('hh:mm A') : value.format('HH:mm');
};

var TimepickerInput = function TimepickerInput(_ref) {
  var disabled = _ref.disabled,
      uses12hClock = _ref.uses12hClock,
      _ref$time = _ref.time,
      time = _ref$time === void 0 ? '12:00' : _ref$time,
      _ref$ampm = _ref.ampm,
      ampm = _ref$ampm === void 0 ? 'AM' : _ref$ampm,
      onChange = _ref.onChange;

  var _useState = useState(function () {
    return formatToString(uses12hClock, getDefaultTime());
  }),
      selectedTime = _useState[0],
      setSelectedTime = _useState[1];

  useEffect(function () {
    setSelectedTime(formatToString(uses12hClock, moment(time + " " + ampm, 'hh:mm A')));
  }, [time, ampm, uses12hClock]);
  var handleChange = useCallback(function (e) {
    setSelectedTime(e.currentTarget.value);
  }, []);
  var handleFocus = useCallback(function (e) {
    e.preventDefault();
    e.target.select();
  }, []);

  var handleBlur = function handleBlur() {
    var parsedTime = parseRawInput(selectedTime);
    var value = parsedTime != null ? parsedTime : getDefaultTime();
    setSelectedTime(formatToString(uses12hClock, value));
    onChange({
      time: value.format('hh:mm'),
      ampm: value.format('A')
    });
  };

  return React__default.createElement(Flex, {
    className: css({
      width: '145px'
    })
  }, React__default.createElement(TextInput, {
    "aria-label": "Select time",
    placeholder: uses12hClock ? '12:00 AM' : '00:00',
    "date-time-type": uses12hClock ? '12' : '24',
    testId: "time-input",
    value: selectedTime,
    isDisabled: disabled,
    onFocus: handleFocus,
    onBlur: handleBlur,
    onChange: handleChange
  }));
};

var defaultZoneOffset = '+00:00';
var zoneOffsets = ['-12:00', '-11:00', '-10:00', '-09:30', '-09:00', '-08:00', '-07:00', '-06:00', '-05:00', '-04:30', '-04:00', '-03:30', '-03:00', '-02:00', '-01:00', '+00:00', '+01:00', '+02:00', '+03:00', '+03:30', '+04:00', '+04:30', '+05:00', '+05:30', '+05:45', '+06:00', '+06:30', '+07:00', '+08:00', '+08:45', '+09:00', '+09:30', '+10:00', '+10:30', '+11:00', '+11:30', '+12:00', '+12:45', '+13:00', '+14:00'];

var TimezonepickerInput = function TimezonepickerInput(_ref) {
  var disabled = _ref.disabled,
      _onChange = _ref.onChange,
      _ref$value = _ref.value,
      value = _ref$value === void 0 ? defaultZoneOffset : _ref$value;
  return React__default.createElement(Select, {
    "aria-label": "Select timezone",
    testId: "timezone-input",
    value: value,
    isDisabled: disabled,
    onChange: function onChange(e) {
      _onChange(e.currentTarget.value);
    }
  }, zoneOffsets.map(function (offset) {
    return React__default.createElement(Select.Option, {
      key: offset,
      value: offset
    }, "UTC", offset);
  }));
};

// eslint-disable-next-line -- TODO: describe this disable  no-restricted-imports
var ZONE_RX = /(Z|[+-]\d{2}[:+]?\d{2})$/;

function startOfToday(format) {
  return moment().set({
    hours: 0,
    minutes: 0
  }).format(format);
}

function fieldValueToMoment(datetimeString) {
  if (!datetimeString) {
    return null;
  }

  var datetime = moment(datetimeString);

  if (ZONE_RX.test(datetimeString)) {
    datetime.utcOffset(datetimeString);
  }

  return datetime;
}

function timeFromUserInput(input) {
  var timeInput = input.time || '00:00';
  return moment.utc(timeInput + '!' + input.ampm, 'HH:mm!A');
}
/**
 * Convert the user input object into either a 'moment' value or an
 * invalid symbol.
 *
 * Success is indicated by returning '{valid: value}' and failure is
 * indicated by returning '{invalid: true}'. If 'input.date' is
 * 'null' we return '{valid: null}'
 */


function datetimeFromUserInput(input) {
  if (!input.date) {
    return {
      valid: null
    };
  }

  var time = timeFromUserInput(input);
  var date = moment.parseZone(input.utcOffset, 'Z').set(input.date.toObject()).set({
    hours: time.hours(),
    minutes: time.minutes()
  });

  if (date.isValid()) {
    return {
      valid: date
    };
  } else {
    return {
      invalid: true,
      valid: null
    };
  }
}
/**
 * Parse user input into a string that is stored in the API.
 *
 * Returns a sum type with either the string as the `valid` property
 * or the `invalid` property set to `false`.
 */


function buildFieldValue(_ref) {
  var data = _ref.data,
      usesTime = _ref.usesTime,
      usesTimezone = _ref.usesTimezone;
  var date = datetimeFromUserInput(data);

  if (date.invalid) {
    return {
      invalid: true
    };
  }

  var format;

  if (usesTimezone) {
    format = 'YYYY-MM-DDTHH:mmZ';
  } else if (usesTime) {
    format = 'YYYY-MM-DDTHH:mm';
  } else {
    format = 'YYYY-MM-DD';
  }

  return {
    valid: date != null && date.valid ? date.valid.format(format) : null,
    invalid: false
  };
}
function getDefaultAMPM() {
  return 'AM';
}
function getDefaultUtcOffset() {
  return startOfToday('Z');
}
/**
 * Create the user input object from the field value.
 */

function userInputFromDatetime(_ref2) {
  var value = _ref2.value,
      uses12hClock = _ref2.uses12hClock;
  var datetime = fieldValueToMoment(value);

  if (datetime) {
    var timeFormat = uses12hClock ? 'hh:mm' : 'HH:mm';
    return {
      date: datetime,
      time: datetime.format(timeFormat),
      ampm: datetime.format('A'),
      utcOffset: datetime.format('Z')
    };
  } else {
    return {
      ampm: getDefaultAMPM(),
      utcOffset: getDefaultUtcOffset()
    };
  }
}

var styles$1 = {
  root: /*#__PURE__*/css({
    display: 'flex',
    alignItems: 'center'
  }),
  separator: /*#__PURE__*/css({
    marginLeft: tokens.spacingM
  })
};

function useEffectWithoutFirstRender(callback, deps) {
  var isFirstRun = useRef(true);
  useEffect(function () {
    if (isFirstRun.current) {
      isFirstRun.current = false;
      return;
    }

    callback(); // eslint-disable-next-line react-hooks/exhaustive-deps -- TODO: Evaluate the dependencies
  }, deps);
}

function DateEditorContainer(_ref) {
  var initialValue = _ref.initialValue,
      usesTime = _ref.usesTime,
      usesTimezone = _ref.usesTimezone,
      uses12hClock = _ref.uses12hClock,
      disabled = _ref.disabled,
      hasClear = _ref.hasClear,
      onChange = _ref.onChange;

  var _React$useState = useState(function () {
    return initialValue;
  }),
      value = _React$useState[0],
      setValue = _React$useState[1];

  useEffectWithoutFirstRender(function () {
    onChange(value);
  }, [value]);
  return createElement("div", {
    "data-test-id": "date-editor",
    className: styles$1.root
  }, createElement(DatepickerInput, {
    disabled: disabled,
    value: value.date,
    onChange: function onChange(date) {
      setValue(function (value) {
        return _extends({}, value, {
          date: date
        });
      });
    }
  }), usesTime && createElement(Fragment, null, createElement("div", {
    className: styles$1.separator
  }), createElement(TimepickerInput, {
    disabled: disabled,
    time: value.time,
    ampm: value.ampm,
    onChange: function onChange(_ref2) {
      var time = _ref2.time,
          ampm = _ref2.ampm;
      setValue(function (value) {
        return _extends({}, value, {
          time: time,
          ampm: ampm
        });
      });
    },
    uses12hClock: uses12hClock
  })), usesTimezone && createElement(Fragment, null, createElement("div", {
    className: styles$1.separator
  }), createElement(TimezonepickerInput, {
    disabled: disabled,
    value: value.utcOffset,
    onChange: function onChange(utcOffset) {
      setValue(function (value) {
        return _extends({}, value, {
          utcOffset: utcOffset
        });
      });
    }
  })), hasClear && createElement(Fragment, null, createElement("div", {
    className: styles$1.separator
  }), createElement(TextLink, {
    as: "button",
    isDisabled: disabled,
    testId: "date-clear",
    onClick: function onClick() {
      setValue({
        date: undefined,
        time: undefined,
        ampm: getDefaultAMPM(),
        utcOffset: getDefaultUtcOffset()
      });
    }
  }, "Clear")));
}

function DateEditor(props) {
  var _parameters$instance$, _parameters$instance, _parameters$instance$2, _parameters$instance2;

  var field = props.field,
      parameters = props.parameters;
  var formatParam = (_parameters$instance$ = parameters == null ? void 0 : (_parameters$instance = parameters.instance) == null ? void 0 : _parameters$instance.format) != null ? _parameters$instance$ : 'timeZ';
  var ampmParam = (_parameters$instance$2 = parameters == null ? void 0 : (_parameters$instance2 = parameters.instance) == null ? void 0 : _parameters$instance2.ampm) != null ? _parameters$instance$2 : '24';
  var usesTime = formatParam !== 'dateonly';
  var usesTimezone = formatParam === 'timeZ';
  var uses12hClock = ampmParam === '12';
  return createElement(FieldConnector, {
    field: field,
    isInitiallyDisabled: props.isInitiallyDisabled,
    throttle: 0
  }, function (_ref3) {
    var value = _ref3.value,
        disabled = _ref3.disabled,
        setValue = _ref3.setValue,
        externalReset = _ref3.externalReset;
    var datetimeValue = userInputFromDatetime({
      value: value,
      uses12hClock: uses12hClock
    });
    return createElement(DateEditorContainer, {
      initialValue: datetimeValue,
      uses12hClock: uses12hClock,
      usesTimezone: usesTimezone,
      usesTime: usesTime,
      disabled: disabled,
      hasClear: Boolean(value),
      onChange: function onChange(data) {
        var fieldValue = buildFieldValue({
          data: data,
          usesTime: usesTime,
          usesTimezone: usesTimezone
        });

        if (fieldValue.invalid) {
          return;
        } // if value is present - then override it with a new one
        // if value is not present - then set a new one if it's not nullable only


        if (Boolean(value) || !value && Boolean(fieldValue.valid)) {
          setValue(fieldValue.valid);
        }
      },
      key: "date-container-" + externalReset
    });
  });
}
DateEditor.defaultProps = {
  isInitiallyDisabled: true
};

export { DateEditor, zoneOffsets };
//# sourceMappingURL=field-editor-date.esm.js.map
