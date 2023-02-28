'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var React = require('react');
var React__default = _interopDefault(React);
var fieldEditorShared = require('@contentful/field-editor-shared');
var useDebounce = require('use-debounce');
var getSlug = _interopDefault(require('speakingurl'));
var tokens = _interopDefault(require('@contentful/f36-tokens'));
var emotion = require('emotion');
var f36Components = require('@contentful/f36-components');
var f36Icons = require('@contentful/f36-icons');

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

function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };

  return _setPrototypeOf(o, p);
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

function getTitleField(sdk, trackingFieldId) {
  var entry = sdk.entry,
      contentType = sdk.contentType;

  if (trackingFieldId && entry.fields[trackingFieldId]) {
    return entry.fields[trackingFieldId];
  }

  return entry.fields[contentType.displayField];
}

var TrackingFieldConnector = /*#__PURE__*/function (_React$Component) {
  _inheritsLoose(TrackingFieldConnector, _React$Component);

  function TrackingFieldConnector(props) {
    var _this;

    _this = _React$Component.call(this, props) || this;
    _this.unsubscribeValue = null;
    _this.unsubscribeLocalizedValue = null;
    _this.unsubscribeSysChanges = null;
    var titleField = getTitleField(props.sdk, props.trackingFieldId);
    var entrySys = props.sdk.entry.getSys();
    var isSame = titleField ? props.field.id === titleField.id : false;
    _this.state = {
      titleValue: titleField ? titleField.getValue() : '',
      isPublished: Boolean(entrySys.publishedVersion),
      isSame: isSame
    };
    return _this;
  }

  var _proto = TrackingFieldConnector.prototype;

  _proto.componentDidMount = function componentDidMount() {
    var _this2 = this;

    this.unsubscribeSysChanges = this.props.sdk.entry.onSysChanged(function (sys) {
      _this2.setState({
        isPublished: Boolean(sys.publishedVersion)
      });
    });
    var titleField = getTitleField(this.props.sdk, this.props.trackingFieldId); // the content type's display field might not exist

    if (!titleField) {
      return;
    }

    if (!this.state.isSame) {
      this.unsubscribeLocalizedValue = titleField.onValueChanged(this.props.field.locale, function (value) {
        _this2.setState({
          titleValue: value
        });
      });
    }

    if (this.props.field.locale !== this.props.defaultLocale) {
      if (!this.props.isOptionalLocaleWithFallback) {
        this.unsubscribeValue = titleField.onValueChanged(this.props.defaultLocale, function (value) {
          if (!titleField.getValue(_this2.props.field.locale)) {
            _this2.setState({
              titleValue: value
            });
          }
        });
      }
    }
  };

  _proto.componentWillUnmount = function componentWillUnmount() {
    if (typeof this.unsubscribeValue === 'function') {
      this.unsubscribeValue();
    }

    if (typeof this.unsubscribeLocalizedValue === 'function') {
      this.unsubscribeLocalizedValue();
    }

    if (typeof this.unsubscribeSysChanges === 'function') {
      this.unsubscribeSysChanges();
    }
  };

  _proto.render = function render() {
    return this.props.children(_extends({}, this.state));
  };

  return TrackingFieldConnector;
}(React__default.Component);
TrackingFieldConnector.defaultProps = {
  children: function children() {
    return null;
  }
};

var CF_GENERATED_SLUG_MAX_LENGTH = 75;
var languages = ['ar', 'az', 'cs', 'de', 'dv', 'en', 'es', 'fa', 'fi', 'fr', 'ge', 'gr', 'hu', 'it', 'lt', 'lv', 'my', 'mk', 'nl', 'pl', 'pt', 'ro', 'ru', 'sk', 'sr', 'tr', 'uk', 'vn'];
/**
 * Extracts the first two lowercased characters from the locale,
 * and returns the supported language prefix.
 */

function supportedLanguage(locale) {
  var prefix = locale.slice(0, 2).toLowerCase();
  return languages[languages.indexOf(prefix)];
}
/**
 * Returns the slug for a given string and locale.
 * If the locale belongs to a language supported by SpeakingURL, it
 * is used as the symbol language. Otherwise, the symbol language
 * is english.
 * Slug suggestions are limited to 75 characters.
 *
 * @param {string} text To be turned into a slug.
 * @param {string?} locale
 * @returns {string} Slug for provided text.
 */


function slugify(text, locale) {
  if (locale === void 0) {
    locale = 'en';
  }

  return getSlug(text, {
    separator: '-',
    lang: supportedLanguage(locale) || 'en',
    truncate: CF_GENERATED_SLUG_MAX_LENGTH + 1,
    custom: {
      "'": '',
      '`': '',
      '’': '',
      '‘': ''
    }
  });
}

function formatTwoDigit(num) {
  var asString = String(num);
  return asString.length === 1 ? "0" + asString : asString;
}

function formatUtcDate(date) {
  var year = date.getFullYear();
  var month = formatTwoDigit(date.getUTCMonth() + 1);
  var day = formatTwoDigit(date.getUTCDate());
  var hour = formatTwoDigit(date.getUTCHours());
  var minutes = formatTwoDigit(date.getUTCMinutes());
  var seconds = formatTwoDigit(date.getUTCSeconds());
  return year + " " + month + " " + day + " at " + hour + " " + minutes + " " + seconds;
}

function untitledSlug(_ref) {
  var isOptionalLocaleWithFallback = _ref.isOptionalLocaleWithFallback,
      createdAt = _ref.createdAt;

  if (isOptionalLocaleWithFallback) {
    return ''; // Will result in `undefined` slug.
  }

  var createdAtFormatted = formatUtcDate(new Date(createdAt));
  return slugify('Untitled entry ' + createdAtFormatted, 'en-US');
}

function makeSlug(title, options) {
  return title ? slugify(title, options.locale) : untitledSlug(options);
}

var inputContainer = /*#__PURE__*/emotion.css({
  position: 'relative'
});
var input = /*#__PURE__*/emotion.css({
  paddingLeft: '40px'
});
var icon = /*#__PURE__*/emotion.css({
  position: 'absolute',
  left: '10px',
  top: '8px',
  zIndex: 2,
  width: '25px',
  height: '25px',
  fill: tokens.gray500
});
var spinnerContainer = /*#__PURE__*/emotion.css({
  position: 'absolute',
  zIndex: 2,
  right: '8px',
  top: '8px'
});
var uniqueValidationError = /*#__PURE__*/emotion.css({
  marginTop: tokens.spacingS
});

function useSlugUpdater(props, check) {
  var value = props.value,
      setValue = props.setValue,
      createdAt = props.createdAt,
      locale = props.locale,
      titleValue = props.titleValue,
      isOptionalLocaleWithFallback = props.isOptionalLocaleWithFallback;
  React__default.useEffect(function () {
    if (check === false) {
      return;
    }

    var newSlug = makeSlug(titleValue, {
      isOptionalLocaleWithFallback: isOptionalLocaleWithFallback,
      locale: locale,
      createdAt: createdAt
    });

    if (newSlug !== value) {
      setValue(newSlug);
    }
  }, [value, titleValue, isOptionalLocaleWithFallback, check, createdAt, locale, setValue]);
}

function useUniqueChecker(props) {
  var performUniqueCheck = props.performUniqueCheck;

  var _React$useState = React__default.useState(props.value ? 'checking' : 'unique'),
      status = _React$useState[0],
      setStatus = _React$useState[1];

  var _useDebounce = useDebounce.useDebounce(props.value, 1000),
      debouncedValue = _useDebounce[0];
  /**
   * Check the uniqueness of the slug in the current space.
   * The slug is unique if there is no published entry other than the
   * current one, with the same slug.
   */


  React__default.useEffect(function () {
    if (!debouncedValue) {
      setStatus('unique');
      return;
    }

    setStatus('checking');
    performUniqueCheck(debouncedValue).then(function (unique) {
      setStatus(unique ? 'unique' : 'duplicate');
    })["catch"](function () {
      setStatus('checking');
    });
  }, [debouncedValue, performUniqueCheck]);
  return status;
}

function SlugEditorFieldStatic(props) {
  var hasError = props.hasError,
      isDisabled = props.isDisabled,
      value = props.value,
      setValue = props.setValue,
      _onChange = props.onChange,
      _onBlur = props.onBlur;
  var status = useUniqueChecker(props);
  return React__default.createElement("div", {
    className: inputContainer
  }, React__default.createElement(f36Icons.LinkIcon, {
    className: icon
  }), React__default.createElement(f36Components.TextInput, {
    className: input,
    isInvalid: hasError || status === 'duplicate',
    isDisabled: isDisabled,
    value: value || '',
    onChange: function onChange(e) {
      setValue(e.target.value);

      if (_onChange) {
        _onChange();
      }
    },
    onBlur: function onBlur() {
      if (_onBlur) {
        _onBlur();
      }
    }
  }), status === 'checking' && React__default.createElement("div", {
    className: spinnerContainer
  }, React__default.createElement(f36Components.Spinner, {
    testId: "slug-editor-spinner"
  })), status === 'duplicate' && React__default.createElement(f36Components.ValidationMessage, {
    testId: "slug-editor-duplicate-error",
    className: uniqueValidationError
  }, "This slug has already been published in another entry"));
}
function SlugEditorField(props) {
  var titleValue = props.titleValue,
      isOptionalLocaleWithFallback = props.isOptionalLocaleWithFallback,
      locale = props.locale,
      createdAt = props.createdAt,
      value = props.value;
  var areEqual = React__default.useCallback(function () {
    var potentialSlug = makeSlug(titleValue, {
      isOptionalLocaleWithFallback: isOptionalLocaleWithFallback,
      locale: locale,
      createdAt: createdAt
    });
    return value === potentialSlug;
  }, [titleValue, isOptionalLocaleWithFallback, locale, createdAt, value]);

  var _React$useState2 = React__default.useState(function () {
    if (props.value) {
      if (!props.titleValue) {
        return false;
      }

      return areEqual();
    }

    return true;
  }),
      check = _React$useState2[0],
      setCheck = _React$useState2[1];

  React__default.useEffect(function () {
    if (areEqual()) {
      setCheck(true);
    }
  }, [props.titleValue, areEqual]);
  useSlugUpdater(props, check);
  return React__default.createElement(SlugEditorFieldStatic, _extends({}, props, {
    onChange: function onChange() {
      setCheck(false);
    },
    onBlur: function onBlur() {
      if (areEqual()) {
        setCheck(true);
      }
    }
  }));
}

function isSupportedFieldTypes(val) {
  return val === 'Symbol';
}

function FieldConnectorCallback(_ref) {
  var Component = _ref.Component,
      value = _ref.value,
      disabled = _ref.disabled,
      setValue = _ref.setValue,
      errors = _ref.errors,
      titleValue = _ref.titleValue,
      isOptionalLocaleWithFallback = _ref.isOptionalLocaleWithFallback,
      locale = _ref.locale,
      createdAt = _ref.createdAt,
      performUniqueCheck = _ref.performUniqueCheck;
  // it is needed to silent permission errors
  // this happens when setValue is called on a field which is disabled for permission reasons
  var safeSetValue = React.useCallback( /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee() {
    var _args = arguments;
    return runtime_1.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return setValue.apply(void 0, _args);

          case 3:
            _context.next = 7;
            break;

          case 5:
            _context.prev = 5;
            _context.t0 = _context["catch"](0);

          case 7:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 5]]);
  })), [setValue]);
  return React.createElement("div", {
    "data-test-id": "slug-editor"
  }, React.createElement(Component, {
    locale: locale,
    createdAt: createdAt,
    performUniqueCheck: performUniqueCheck,
    hasError: errors.length > 0,
    value: value,
    isOptionalLocaleWithFallback: isOptionalLocaleWithFallback,
    isDisabled: disabled,
    titleValue: titleValue,
    setValue: safeSetValue
  }));
}

function SlugEditor(props) {
  var _parameters$instance$, _parameters$instance, _entrySys$contentType3, _entrySys$contentType4;

  var field = props.field,
      parameters = props.parameters;
  var _props$baseSdk = props.baseSdk,
      locales = _props$baseSdk.locales,
      entry = _props$baseSdk.entry,
      space = _props$baseSdk.space;

  if (!isSupportedFieldTypes(field.type)) {
    throw new Error("\"" + field.type + "\" field type is not supported by SlugEditor");
  }

  var trackingFieldId = (_parameters$instance$ = parameters == null ? void 0 : (_parameters$instance = parameters.instance) == null ? void 0 : _parameters$instance.trackingFieldId) != null ? _parameters$instance$ : undefined;
  var entrySys = entry.getSys();
  var isLocaleOptional = locales.optional[field.locale];
  var localeFallbackCode = locales.fallbacks[field.locale]; // If the field or the locale are not required (there's a locale setting that
  // allows publishing even if the field is required) and if the locale has a
  // fallback than there's no need for a slug unless the user manually enters
  // one or the title field is also localized with a custom value.

  var isOptionalFieldLocale = Boolean(!field.required || isLocaleOptional);
  var isOptionalLocaleWithFallback = Boolean(isOptionalFieldLocale && localeFallbackCode && locales.available.includes(localeFallbackCode));
  var performUniqueCheck = React.useCallback(function (value) {
    var _entrySys$contentType, _entrySys$contentType2, _searchQuery;

    var searchQuery = (_searchQuery = {
      content_type: entrySys == null ? void 0 : (_entrySys$contentType = entrySys.contentType) == null ? void 0 : (_entrySys$contentType2 = _entrySys$contentType.sys) == null ? void 0 : _entrySys$contentType2.id
    }, _searchQuery["fields." + field.id + "." + field.locale] = value, _searchQuery['sys.id[ne]'] = entrySys.id, _searchQuery['sys.publishedAt[exists]'] = true, _searchQuery.limit = 0, _searchQuery);
    return space.getEntries(searchQuery).then(function (res) {
      return res.total === 0;
    });
  }, [entrySys == null ? void 0 : (_entrySys$contentType3 = entrySys.contentType) == null ? void 0 : (_entrySys$contentType4 = _entrySys$contentType3.sys) == null ? void 0 : _entrySys$contentType4.id, field.id, field.locale, entrySys.id, space]);
  return React.createElement(TrackingFieldConnector, {
    sdk: props.baseSdk,
    field: field,
    defaultLocale: locales["default"],
    isOptionalLocaleWithFallback: isOptionalLocaleWithFallback,
    trackingFieldId: trackingFieldId
  }, function (_ref3) {
    var titleValue = _ref3.titleValue,
        isPublished = _ref3.isPublished,
        isSame = _ref3.isSame;
    return React.createElement(fieldEditorShared.FieldConnector, {
      field: field,
      isInitiallyDisabled: props.isInitiallyDisabled,
      throttle: 0
    }, function (_ref4) {
      var value = _ref4.value,
          errors = _ref4.errors,
          disabled = _ref4.disabled,
          setValue = _ref4.setValue,
          externalReset = _ref4.externalReset;
      var shouldTrackTitle = isPublished === false && isSame === false;
      var Component = shouldTrackTitle ? SlugEditorField : SlugEditorFieldStatic;
      return React.createElement(FieldConnectorCallback, {
        Component: Component,
        titleValue: titleValue,
        value: value,
        errors: errors,
        disabled: disabled,
        setValue: setValue,
        isOptionalLocaleWithFallback: isOptionalLocaleWithFallback,
        createdAt: entrySys.createdAt,
        locale: field.locale,
        performUniqueCheck: performUniqueCheck,
        key: "slug-editor-" + externalReset
      });
    });
  });
}
SlugEditor.defaultProps = {
  isInitiallyDisabled: true
};

exports.SlugEditor = SlugEditor;
exports.makeSlug = makeSlug;
exports.slugify = slugify;
//# sourceMappingURL=field-editor-slug.cjs.development.js.map
