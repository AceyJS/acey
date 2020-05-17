module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = require('../../../ssr-module-cache.js');
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		var threw = true;
/******/ 		try {
/******/ 			modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 			threw = false;
/******/ 		} finally {
/******/ 			if(threw) delete installedModules[moduleId];
/******/ 		}
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 3);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./pages/index.js":
/*!************************!*\
  !*** ./pages/index.js ***!
  \************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var acey__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! acey */ "acey");
/* harmony import */ var acey__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(acey__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _src_models__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../src/models */ "./src/models/index.ts");
var _jsxFileName = "/Users/louis/Acey/next-test/pages/index.js";

var __jsx = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement;


const STORE_TYPE = 'cookie';

const Home = props => {
  const todolists = [_src_models__WEBPACK_IMPORTED_MODULE_2__["Todolist"], _src_models__WEBPACK_IMPORTED_MODULE_2__["User"].todolist()];
  const counters = [_src_models__WEBPACK_IMPORTED_MODULE_2__["Counter"], _src_models__WEBPACK_IMPORTED_MODULE_2__["User"].counter()];
  Object(acey__WEBPACK_IMPORTED_MODULE_1__["useAcey"])([_src_models__WEBPACK_IMPORTED_MODULE_2__["Counter"], _src_models__WEBPACK_IMPORTED_MODULE_2__["Todolist"], _src_models__WEBPACK_IMPORTED_MODULE_2__["User"]]);

  const method = (list = [], method = '', then = '' | 'coookie' | 'localStore') => {
    list.forEach(v => {
      const ret = v[method]();
      then && ret[then]();
    });
  };

  const increment = (then = '' | 'coookie' | 'localStore') => {
    method(counters, 'increment', then);
    const list = [];
    todolists.map(l => l.map(t => list.push(t.counter())));
    method(list, 'increment', then);
  };

  const decrement = (then = '' | 'coookie' | 'localStore') => {
    method(counters, 'decrement', then);
    const list = [];
    todolists.map(l => l.map(t => list.push(t.counter())));
    method(list, 'decrement', then);
  };

  const addTodo = (then = '' | 'coookie' | 'localStore') => method(todolists, 'add', then);

  const deleteFirst = (then = '' | 'coookie' | 'localStore') => method(todolists, 'deleteFirst', then);

  const deleteLast = (then = '' | 'coookie' | 'localStore') => method(todolists, 'deleteLast', then);

  const toZZZLast = (then = '' | 'coookie' | 'localStore') => method(todolists, 'toZZZLast', then);

  const clearAllCookie = () => {
    _src_models__WEBPACK_IMPORTED_MODULE_2__["Todolist"].removeCookies();
    _src_models__WEBPACK_IMPORTED_MODULE_2__["Counter"].removeCookies();
    _src_models__WEBPACK_IMPORTED_MODULE_2__["User"].removeCookies();
    location.reload();
  };

  const clearLocalStore = () => {
    _src_models__WEBPACK_IMPORTED_MODULE_2__["Todolist"].removeLocalStore();
    _src_models__WEBPACK_IMPORTED_MODULE_2__["Counter"].removeLocalStore();
    _src_models__WEBPACK_IMPORTED_MODULE_2__["User"].removeLocalStore();
    location.reload();
  };

  return __jsx("div", {
    className: "container",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 56,
      columnNumber: 5
    }
  }, __jsx("h1", {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 57,
      columnNumber: 7
    }
  }, props.id), __jsx("button", {
    onClick: clearAllCookie,
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 58,
      columnNumber: 7
    }
  }, "clear cookies"), __jsx("button", {
    onClick: clearLocalStore,
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 59,
      columnNumber: 7
    }
  }, "clear local stores"), __jsx("br", {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 60,
      columnNumber: 7
    }
  }), __jsx("br", {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 61,
      columnNumber: 7
    }
  }), __jsx("button", {
    onClick: () => decrement(STORE_TYPE),
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 63,
      columnNumber: 7
    }
  }, "decrement"), counters.map((v, index) => __jsx("span", {
    style: {
      marginLeft: 10,
      marginRight: 10
    },
    key: index,
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 64,
      columnNumber: 35
    }
  }, v.get())), __jsx("button", {
    onClick: () => increment(STORE_TYPE),
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 65,
      columnNumber: 7
    }
  }, "increment"), __jsx("br", {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 66,
      columnNumber: 7
    }
  }), __jsx("button", {
    onClick: () => addTodo(STORE_TYPE),
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 68,
      columnNumber: 7
    }
  }, "Add element"), __jsx("button", {
    onClick: () => deleteFirst(STORE_TYPE),
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 69,
      columnNumber: 7
    }
  }, "Del 1st element"), __jsx("button", {
    onClick: () => deleteLast(STORE_TYPE),
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 70,
      columnNumber: 7
    }
  }, "Del last element"), __jsx("button", {
    onClick: () => toZZZLast(STORE_TYPE),
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 71,
      columnNumber: 7
    }
  }, "ToZZ last"), __jsx("div", {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 73,
      columnNumber: 7
    }
  }, todolists.map((list, index) => {
    return __jsx("div", {
      key: index,
      __self: undefined,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 75,
        columnNumber: 20
      }
    }, __jsx("h1", {
      __self: undefined,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 76,
        columnNumber: 15
      }
    }, "Todolist ", index), list.map((todo, index) => {
      return __jsx("div", {
        key: index,
        __self: undefined,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 78,
          columnNumber: 24
        }
      }, __jsx("span", {
        __self: undefined,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 79,
          columnNumber: 19
        }
      }, todo.content()), __jsx("span", {
        __self: undefined,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 80,
          columnNumber: 19
        }
      }, " : "), __jsx("span", {
        __self: undefined,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 81,
          columnNumber: 19
        }
      }, todo.ID()), __jsx("span", {
        __self: undefined,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 82,
          columnNumber: 19
        }
      }, " = "), __jsx("span", {
        style: {
          color: 'red'
        },
        __self: undefined,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 83,
          columnNumber: 19
        }
      }, todo.counter().get()));
    }));
  })));
};

Home.getInitialProps = ({
  query
}) => {
  _src_models__WEBPACK_IMPORTED_MODULE_2__["Counter"].increment();
  return {
    id: 10
  };
};

/* harmony default export */ __webpack_exports__["default"] = (Home);

/***/ }),

/***/ "./src/models/counter.ts":
/*!*******************************!*\
  !*** ./src/models/counter.ts ***!
  \*******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var acey__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! acey */ "acey");
/* harmony import */ var acey__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(acey__WEBPACK_IMPORTED_MODULE_0__);
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }



class Counter extends acey__WEBPACK_IMPORTED_MODULE_0__["Model"] {
  constructor(o = {
    counter: 0
  }, options) {
    super(o, options);

    _defineProperty(this, "get", () => this.state.counter);

    _defineProperty(this, "increment", () => this.setState({
      counter: this.get() + 1
    }).save());

    _defineProperty(this, "decrement", () => this.setState({
      counter: this.get() - 1
    }).save());
  }

}

/* harmony default export */ __webpack_exports__["default"] = (Counter);

/***/ }),

/***/ "./src/models/index.ts":
/*!*****************************!*\
  !*** ./src/models/index.ts ***!
  \*****************************/
/*! exports provided: Counter, User, Todolist */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Counter", function() { return Counter; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "User", function() { return User; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Todolist", function() { return Todolist; });
/* harmony import */ var _user__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./user */ "./src/models/user.ts");
/* harmony import */ var _todolist__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./todolist */ "./src/models/todolist.ts");
/* harmony import */ var _counter__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./counter */ "./src/models/counter.ts");



const Counter = new _counter__WEBPACK_IMPORTED_MODULE_2__["default"](undefined, {
  connected: true,
  key: 'counter'
});
const User = new _user__WEBPACK_IMPORTED_MODULE_0__["default"](undefined, {
  connected: true,
  key: 'user'
});
const Todolist = new _todolist__WEBPACK_IMPORTED_MODULE_1__["default"]([], {
  connected: true,
  key: 'todolist'
});

/***/ }),

/***/ "./src/models/todo.ts":
/*!****************************!*\
  !*** ./src/models/todo.ts ***!
  \****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var acey__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! acey */ "acey");
/* harmony import */ var acey__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(acey__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _counter__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./counter */ "./src/models/counter.ts");
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }



const DEFAULT_DATA = {
  content: '',
  id: 0,
  counter: {
    counter: 0
  }
};

class Todo extends acey__WEBPACK_IMPORTED_MODULE_0__["Model"] {
  constructor(data = DEFAULT_DATA, options) {
    super(data, options);

    _defineProperty(this, "counter", () => this.state.counter);

    _defineProperty(this, "content", () => this.state.content);

    _defineProperty(this, "ID", () => this.state.id);

    this.setState({
      counter: new _counter__WEBPACK_IMPORTED_MODULE_1__["default"](data.counter, this.__childOptions)
    });
  }

}

/* harmony default export */ __webpack_exports__["default"] = (Todo);

/***/ }),

/***/ "./src/models/todolist.ts":
/*!********************************!*\
  !*** ./src/models/todolist.ts ***!
  \********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var acey__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! acey */ "acey");
/* harmony import */ var acey__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(acey__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _todo__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./todo */ "./src/models/todo.ts");
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }




class Todolist extends acey__WEBPACK_IMPORTED_MODULE_0__["Collection"] {
  constructor(data = [], options) {
    super(data, _todo__WEBPACK_IMPORTED_MODULE_1__["default"], options);

    _defineProperty(this, "add", () => this.push({
      content: Math.random().toString(),
      id: Math.random()
    }).save());

    _defineProperty(this, "deleteLast", () => this.deleteIndex(this.count() - 1).save());

    _defineProperty(this, "deleteFirst", () => this.deleteIndex(0).save());

    _defineProperty(this, "toZZZLast", () => this.nodeAt(this.count() - 1).setState({
      content: 'ZZZ',
      id: 'ZZZ'
    }).save());
  }

}

/* harmony default export */ __webpack_exports__["default"] = (Todolist);

/***/ }),

/***/ "./src/models/user.ts":
/*!****************************!*\
  !*** ./src/models/user.ts ***!
  \****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var acey__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! acey */ "acey");
/* harmony import */ var acey__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(acey__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _counter__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./counter */ "./src/models/counter.ts");
/* harmony import */ var _todolist__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./todolist */ "./src/models/todolist.ts");
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }




const DEFAULT_DATA = {
  first_name: '',
  counter: 0
};

class User extends acey__WEBPACK_IMPORTED_MODULE_0__["Model"] {
  constructor(data = DEFAULT_DATA, options) {
    super(data, options);

    _defineProperty(this, "counter", () => this.state.counter);

    _defineProperty(this, "todolist", () => this.state.todolist);

    _defineProperty(this, "firstName", () => this.state.first_name);

    this.setState({
      counter: new _counter__WEBPACK_IMPORTED_MODULE_1__["default"]({
        counter: data.counter
      }, this.__childOptions),
      todolist: new _todolist__WEBPACK_IMPORTED_MODULE_2__["default"]([], this.__childOptions)
    }).save();
  }

}

/* harmony default export */ __webpack_exports__["default"] = (User);

/***/ }),

/***/ 3:
/*!******************************!*\
  !*** multi ./pages/index.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! /Users/louis/Acey/next-test/pages/index.js */"./pages/index.js");


/***/ }),

/***/ "acey":
/*!***********************!*\
  !*** external "acey" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("acey");

/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "react" ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("react");

/***/ })

/******/ });
//# sourceMappingURL=index.js.map