'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var React = _interopDefault(require('react'));
var isEqual = _interopDefault(require('lodash/isEqual'));
var throttle = _interopDefault(require('lodash/throttle'));
var f36Note = require('@contentful/f36-note');
var tokens = _interopDefault(require('@contentful/f36-tokens'));
var emotion = require('emotion');
var isNumber = _interopDefault(require('lodash/isNumber'));
var ReactDOM = _interopDefault(require('react-dom'));
var f36Components = require('@contentful/f36-components');
var get = _interopDefault(require('lodash/get'));
var isObject = _interopDefault(require('lodash/isObject'));
var isString = _interopDefault(require('lodash/isString'));

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

var FieldConnector = /*#__PURE__*/function (_React$Component) {
  _inheritsLoose(FieldConnector, _React$Component);

  function FieldConnector(props) {
    var _this;

    _this = _React$Component.call(this, props) || this;
    _this.unsubscribeErrors = null;
    _this.unsubscribeDisabled = null;
    _this.unsubscribeValue = null;

    _this.setValue = /*#__PURE__*/function () {
      var _ref = _asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee(value) {
        return runtime_1.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (_this.props.isEmptyValue(value != null ? value : null)) {
                  _this.setState({
                    value: undefined
                  });
                } else {
                  _this.setState({
                    value: value
                  });
                }

                _context.next = 3;
                return _this.triggerSetValueCallbacks(value);

              case 3:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      return function (_x) {
        return _ref.apply(this, arguments);
      };
    }();

    _this.triggerSetValueCallbacks = throttle(function (value) {
      return new Promise(function (resolve, reject) {
        if (_this.props.isEmptyValue(value != null ? value : null)) {
          _this.props.field.removeValue().then(resolve)["catch"](reject);
        } else {
          _this.props.field.setValue(value).then(resolve)["catch"](reject);
        }
      });
    }, _this.props.throttle, {
      leading: _this.props.throttle === 0
    });
    var initialValue = props.field.getValue();
    _this.state = {
      isLocalValueChange: false,
      externalReset: 0,
      value: initialValue,
      lastRemoteValue: initialValue,
      disabled: props.isInitiallyDisabled,
      errors: []
    };
    return _this;
  }

  var _proto = FieldConnector.prototype;

  _proto.componentDidMount = function componentDidMount() {
    var _this2 = this;

    var field = this.props.field;
    this.unsubscribeErrors = field.onSchemaErrorsChanged(function (errors) {
      _this2.setState({
        errors: errors || []
      });
    });
    this.unsubscribeDisabled = field.onIsDisabledChanged(function (disabled) {
      _this2.setState({
        disabled: disabled
      });
    });
    this.unsubscribeValue = field.onValueChanged(function (value) {
      _this2.setState(function (currentState) {
        var isLocalValueChange = _this2.props.isEqualValues(value, currentState.value);

        var lastRemoteValue = isLocalValueChange ? currentState.lastRemoteValue : value;
        var externalReset = currentState.externalReset + (isLocalValueChange ? 0 : 1);
        return {
          value: value,
          lastRemoteValue: lastRemoteValue,
          isLocalValueChange: isLocalValueChange,
          externalReset: externalReset
        };
      });
    });
  };

  _proto.componentWillUnmount = function componentWillUnmount() {
    if (typeof this.unsubscribeErrors === 'function') {
      this.unsubscribeErrors();
    }

    if (typeof this.unsubscribeDisabled === 'function') {
      this.unsubscribeDisabled();
    }

    if (typeof this.unsubscribeValue === 'function') {
      this.unsubscribeValue();
    }
  };

  _proto.render = function render() {
    return this.props.children(_extends({}, this.state, {
      setValue: this.setValue
    }));
  };

  return FieldConnector;
}(React.Component);
FieldConnector.defaultProps = {
  children: function children() {
    return null;
  },
  // eslint-disable-next-line -- TODO: describe this disable
  isEmptyValue: function isEmptyValue(value) {
    return value === null || value === '';
  },
  // eslint-disable-next-line -- TODO: describe this disable
  isEqualValues: function isEqualValues(value1, value2) {
    return isEqual(value1, value2);
  },
  throttle: 300
};

function PredefinedValuesError() {
  return React.createElement(f36Note.Note, {
    variant: "warning",
    testId: "predefined-values-warning"
  }, "The widget failed to initialize. You can fix the problem by providing predefined values under the validations tab in the field settings.");
}

var styles = {
  invalid: /*#__PURE__*/emotion.css({
    color: tokens.red600
  })
};
function CharCounter(props) {
  var _cx;

  var count = 0;

  if (props.value) {
    count = props.value.length;
  }

  var valid = count === 0 || props.checkConstraint(count);
  return React.createElement("span", {
    "data-status-code": valid ? null : 'invalid-size',
    className: emotion.cx((_cx = {}, _cx[styles.invalid] = !valid, _cx))
  }, count, " characters");
}

function CharValidation(props) {
  var constraints = props.constraints;

  if (constraints.type === 'max') {
    return React.createElement("span", null, "Maximum ", constraints.max, " characters");
  } else if (constraints.type === 'min') {
    return React.createElement("span", null, "Requires at least ", constraints.min, " characters");
  } else {
    return React.createElement("span", null, "Requires between ", constraints.min, " and ", constraints.max, " characters");
  }
}

function open(componentRenderer) {
  var rootDom = null;

  var getRoot = function getRoot() {
    if (rootDom === null) {
      rootDom = document.createElement('div');
      rootDom.setAttribute('id', 'field-editor-modal-root');
      document.body.appendChild(rootDom);
    }

    return rootDom;
  };

  return new Promise(function (resolve) {
    var currentConfig = {
      onClose: onClose,
      isShown: true
    };

    function render(_ref) {
      var onClose = _ref.onClose,
          isShown = _ref.isShown;
      ReactDOM.render(componentRenderer({
        onClose: onClose,
        isShown: isShown
      }), getRoot());
    }

    function onClose() {
      currentConfig = _extends({}, currentConfig, {
        isShown: false
      });
      render(currentConfig); // eslint-disable-next-line -- TODO: describe this disable  @typescript-eslint/ban-ts-comment
      // @ts-ignore

      resolve.apply(void 0, arguments);
      getRoot().remove();
    }

    render(currentConfig);
  });
}
function openDialog(options, Component) {
  var key = Date.now();
  var size = isNumber(options.width) ? options.width + "px" : options.width;
  return open(function (_ref2) {
    var isShown = _ref2.isShown,
        onClose = _ref2.onClose;

    var onCloseHandler = function onCloseHandler() {
      return onClose();
    };

    return React.createElement(f36Components.Modal, {
      key: key,
      shouldCloseOnOverlayClick: options.shouldCloseOnOverlayClick || false,
      shouldCloseOnEscapePress: options.shouldCloseOnEscapePress || false,
      allowHeightOverflow: options.allowHeightOverflow || false,
      position: options.position || 'center',
      isShown: isShown,
      onClose: onCloseHandler,
      size: size || '700px'
    }, function () {
      return React.createElement(React.Fragment, null, options.title && React.createElement(f36Components.ModalHeader, {
        testId: "dialog-title",
        title: options.title,
        onClose: onCloseHandler
      }), React.createElement("div", {
        style: {
          minHeight: options.minHeight || 'auto'
        }
      }, React.createElement(Component, {
        onClose: onClose
      })));
    });
  });
}
var ModalDialogLauncher = {
  openDialog: openDialog
};

var ModalDialogLauncher$1 = {
  __proto__: null,
  open: open,
  openDialog: openDialog,
  'default': ModalDialogLauncher
};

function titleOrDefault(title, defaultTitle) {
  if (!isString(title)) {
    return defaultTitle;
  }

  if (title) {
    var trimmedTitle = title.trim();

    if (trimmedTitle.length === 0) {
      return defaultTitle;
    }

    return trimmedTitle;
  }

  return defaultTitle;
}

function getFieldValue(_ref) {
  var entity = _ref.entity,
      fieldId = _ref.fieldId,
      localeCode = _ref.localeCode,
      defaultLocaleCode = _ref.defaultLocaleCode;
  var values = get(entity, ['fields', fieldId]);

  if (!isObject(values)) {
    return;
  }

  var firstLocaleCode = Object.keys(values)[0];
  return values[localeCode] || values[defaultLocaleCode] || values[firstLocaleCode];
}
function getAssetTitle(_ref2) {
  var _asset$fields;

  var asset = _ref2.asset,
      localeCode = _ref2.localeCode,
      defaultLocaleCode = _ref2.defaultLocaleCode,
      defaultTitle = _ref2.defaultTitle;
  var title = getFieldValue({
    entity: {
      fields: {
        title: (_asset$fields = asset.fields) == null ? void 0 : _asset$fields.title
      }
    },
    fieldId: 'title',
    localeCode: localeCode,
    defaultLocaleCode: defaultLocaleCode
  });
  return titleOrDefault(title, defaultTitle);
}
/**
 * Returns true if field is an Asset
 *
 * @param field
 * @returns {boolean}
 */

var isAssetField = function isAssetField(field) {
  return field.type === 'Link' && field.linkType === 'Asset';
};
/**
 * Returns true if field is a Title
 */

function isDisplayField(_ref3) {
  var field = _ref3.field,
      contentType = _ref3.contentType;
  return field.id === contentType.displayField;
}
/**
 * Returns true if field is a short Description
 */

function isDescriptionField(_ref4) {
  var field = _ref4.field,
      contentType = _ref4.contentType;

  var isTextField = function isTextField(field) {
    return ['Symbol', 'Text'].includes(field.type);
  };

  var isMaybeSlugField = function isMaybeSlugField(field) {
    return /\bslug\b/.test(field.name);
  };

  return isTextField(field) && !isDisplayField({
    field: field,
    contentType: contentType
  }) && !isMaybeSlugField(field);
}
function getEntityDescription(_ref5) {
  var entity = _ref5.entity,
      contentType = _ref5.contentType,
      localeCode = _ref5.localeCode,
      defaultLocaleCode = _ref5.defaultLocaleCode;

  if (!contentType) {
    return '';
  }

  var descriptionField = contentType.fields.find(function (field) {
    return isDescriptionField({
      field: field,
      contentType: contentType
    });
  });

  if (!descriptionField) {
    return '';
  }

  return getFieldValue({
    entity: entity,
    fieldId: descriptionField.id,
    localeCode: localeCode,
    defaultLocaleCode: defaultLocaleCode
  }) || '';
}
function getEntryTitle(_ref6) {
  var entry = _ref6.entry,
      contentType = _ref6.contentType,
      localeCode = _ref6.localeCode,
      defaultLocaleCode = _ref6.defaultLocaleCode,
      defaultTitle = _ref6.defaultTitle;
  var title;

  if (!contentType) {
    return defaultTitle;
  }

  var displayField = contentType.displayField;

  if (!displayField) {
    return defaultTitle;
  }

  var displayFieldInfo = contentType.fields.find(function (field) {
    return field.id === displayField;
  });

  if (!displayFieldInfo) {
    return defaultTitle;
  } // when localization for a field is "turned off",
  // we don't clean up the "old" localized data, so it is still in the response.
  // Therefore, we're checking if displayField is localizable.


  if (displayFieldInfo.localized) {
    title = getFieldValue({
      entity: entry,
      fieldId: displayField,
      localeCode: localeCode,
      defaultLocaleCode: defaultLocaleCode
    });

    if (!title) {
      // Older content types may return id/apiName, but some entry lookup paths do not fetch raw data
      // In order to still return a title in this case, look for displayField as apiName in content type,
      // ...but still look for displayField as a field in the entry
      title = getFieldValue({
        entity: entry,
        fieldId: displayFieldInfo.id,
        localeCode: localeCode,
        defaultLocaleCode: defaultLocaleCode
      });
    }
  } else {
    title = getFieldValue({
      entity: entry,
      fieldId: displayField,
      defaultLocaleCode: defaultLocaleCode,
      localeCode: ''
    });

    if (!title) {
      title = getFieldValue({
        entity: entry,
        fieldId: displayFieldInfo.id,
        defaultLocaleCode: defaultLocaleCode,
        localeCode: ''
      });
    }
  }

  return titleOrDefault(title, defaultTitle);
}
function getEntryStatus(sys) {
  if (!sys || sys.type !== 'Entry' && sys.type !== 'Asset') {
    throw new TypeError('Invalid entity metadata object');
  }

  if (sys.deletedVersion) {
    return 'deleted';
  } else if (sys.archivedVersion) {
    return 'archived';
  } else if (sys.publishedVersion) {
    if (sys.version > sys.publishedVersion + 1) {
      return 'changed';
    } else {
      return 'published';
    }
  } else {
    return 'draft';
  }
}
/**
 * Gets a promise resolving with a localized asset image field representing a
 * given entities file. The promise may resolve with null.
 */

var getEntryImage = /*#__PURE__*/function () {
  var _ref8 = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee(_ref7, getAsset) {
    var entry, contentType, localeCode, assetLink, assetId, asset, file, isImage;
    return runtime_1.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            entry = _ref7.entry, contentType = _ref7.contentType, localeCode = _ref7.localeCode;

            if (contentType) {
              _context.next = 3;
              break;
            }

            return _context.abrupt("return", null);

          case 3:
            assetLink = contentType.fields.find(isAssetField);

            if (assetLink) {
              _context.next = 6;
              break;
            }

            return _context.abrupt("return", null);

          case 6:
            assetId = get(entry.fields, [assetLink.id, localeCode, 'sys', 'id']);

            if (assetId) {
              _context.next = 9;
              break;
            }

            return _context.abrupt("return", null);

          case 9:
            _context.prev = 9;
            _context.next = 12;
            return getAsset(assetId);

          case 12:
            asset = _context.sent;
            file = get(asset, ['fields', 'file', localeCode]);
            isImage = Boolean(get(file, ['details', 'image'], false));
            return _context.abrupt("return", isImage ? file : null);

          case 18:
            _context.prev = 18;
            _context.t0 = _context["catch"](9);
            return _context.abrupt("return", null);

          case 21:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[9, 18]]);
  }));

  return function getEntryImage(_x, _x2) {
    return _ref8.apply(this, arguments);
  };
}();

var entityHelpers = {
  __proto__: null,
  getFieldValue: getFieldValue,
  getAssetTitle: getAssetTitle,
  isAssetField: isAssetField,
  isDisplayField: isDisplayField,
  isDescriptionField: isDescriptionField,
  getEntityDescription: getEntityDescription,
  getEntryTitle: getEntryTitle,
  getEntryStatus: getEntryStatus,
  getEntryImage: getEntryImage
};

/* eslint-disable @typescript-eslint/no-explicit-any */
function fromFieldValidations(validations, fieldType) {
  if (validations === void 0) {
    validations = [];
  }

  var sizeValidation = validations.find(function (v) {
    return 'size' in v;
  });
  var size = sizeValidation && sizeValidation.size || {};
  var min = size.min;
  var max = size.max;

  if (isNumber(min) && isNumber(max)) {
    return {
      type: 'min-max',
      min: min,
      max: max
    };
  } else if (isNumber(min)) {
    return {
      type: 'min',
      min: min
    };
  } else if (isNumber(max)) {
    return {
      type: 'max',
      max: max
    };
  } else {
    return {
      type: 'max',
      max: fieldType === 'Symbol' ? 256 : 50000
    };
  }
}
function makeChecker(constraint) {
  return function checkConstraint(length) {
    if (constraint.type === 'max') {
      return length <= constraint.max;
    } else if (constraint.type === 'min') {
      return length >= constraint.min;
    } else {
      return length >= constraint.min && length <= constraint.max;
    }
  };
}

var constraints = {
  __proto__: null,
  fromFieldValidations: fromFieldValidations,
  makeChecker: makeChecker
};

/**
 * Checks whether the passed content type matches one of our valid MIME types
 */
function isValidImage(file) {
  var validMimeTypes = ['image/avif', 'image/bmp', 'image/x-windows-bmp', 'image/gif', 'image/webp', // This is not a valid MIME type but we supported it in the past.
  'image/jpg', 'image/jpeg', 'image/pjpeg', 'image/x-jps', 'image/png', 'image/svg+xml'];
  return validMimeTypes.includes(file.contentType);
}

/**
 * Transforms a number into a localized string (en-US)
 * toLocaleString(1000); // "1,000"
 * @param {Number} number
 */
function toLocaleString(number) {
  return number.toLocaleString('en-US');
}

function formatFloat(value, localize) {
  return localize ? toLocaleString(value) : value.toFixed(2) // remove floating point if not necessary
  .replace(/\.(0)*$|0*$/, '');
}
/**
 * Make a storage unit number more readable by making them smaller
 * shortenStorageUnit(1000, 'GB'); // "1 TB"
 * shortenStorageUnit(0.001, 'TB'); // "1 GB"
 * @param value
 * @param uom Unit of measure
 * @returns
 */


function shortenStorageUnit(value, uom) {
  if (value <= 0) {
    return '0 B';
  }

  var units = ['PB', 'TB', 'GB', 'MB', 'KB', 'B'];

  var getBigger = function getBigger(unit) {
    return units[units.indexOf(unit) - 1];
  };

  var getSmaller = function getSmaller(unit) {
    return units[units.indexOf(unit) + 1];
  };

  var isBiggestUnit = function isBiggestUnit(unit) {
    return units.indexOf(unit) === 0;
  };

  var isSmallestUnit = function isSmallestUnit(unit) {
    return units.indexOf(unit) === units.length - 1;
  };

  var reduce = function reduce(number, unit) {
    if (number < 0.99 && !isSmallestUnit(unit)) {
      return reduce(number * 1000, getSmaller(unit));
    } else if (number >= 1000 && !isBiggestUnit(unit)) {
      return reduce(number / 1000, getBigger(unit));
    } else {
      return {
        number: number,
        unit: unit
      };
    }
  };

  var _reduce = reduce(value, uom),
      number = _reduce.number,
      unit = _reduce.unit;

  return formatFloat(number, false) + " " + unit;
}

exports.CharCounter = CharCounter;
exports.CharValidation = CharValidation;
exports.ConstraintsUtils = constraints;
exports.FieldConnector = FieldConnector;
exports.ModalDialogLauncher = ModalDialogLauncher$1;
exports.PredefinedValuesError = PredefinedValuesError;
exports.entityHelpers = entityHelpers;
exports.isValidImage = isValidImage;
exports.shortenStorageUnit = shortenStorageUnit;
exports.toLocaleString = toLocaleString;
//# sourceMappingURL=field-editor-shared.cjs.development.js.map
