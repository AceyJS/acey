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
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ({

/***/ 1:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("RNiq");


/***/ }),

/***/ "283l":
/***/ (function(module, exports) {

module.exports = require("acey");

/***/ }),

/***/ "BvLG":
/***/ (function(module, exports) {

module.exports = require("react-acey");

/***/ }),

/***/ "RNiq":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, "getServerSideProps", function() { return /* binding */ getServerSideProps; });

// EXTERNAL MODULE: external "react"
var external_react_ = __webpack_require__("cDcd");
var external_react_default = /*#__PURE__*/__webpack_require__.n(external_react_);

// EXTERNAL MODULE: external "react-acey"
var external_react_acey_ = __webpack_require__("BvLG");

// EXTERNAL MODULE: external "acey"
var external_acey_ = __webpack_require__("283l");

// CONCATENATED MODULE: ./src/models/counter.ts
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }



class counter_Counter extends external_acey_["Model"] {
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

/* harmony default export */ var counter = (counter_Counter);
// CONCATENATED MODULE: ./src/models/todo.ts
function todo_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }



const DEFAULT_DATA = {
  content: '',
  id: 0,
  counter: {
    counter: 0
  }
};

class todo_Todo extends external_acey_["Model"] {
  constructor(data = DEFAULT_DATA, options) {
    super(data, options);

    todo_defineProperty(this, "counter", () => this.state.counter);

    todo_defineProperty(this, "content", () => this.state.content);

    todo_defineProperty(this, "ID", () => this.state.id);

    this.setState({
      counter: new counter(data.counter, this.kids())
    });
  }

}

/* harmony default export */ var todo = (todo_Todo);
// CONCATENATED MODULE: ./src/models/todolist.ts
function todolist_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }




class todolist_Todolist extends external_acey_["Collection"] {
  constructor(data = [], options) {
    super(data, [todo, todolist_Todolist], options);

    todolist_defineProperty(this, "add", () => this.push({
      content: Math.random().toString(),
      id: Math.random()
    }).save());

    todolist_defineProperty(this, "deleteLast", () => this.deleteIndex(this.count() - 1).save());

    todolist_defineProperty(this, "deleteFirst", () => this.deleteIndex(0).save());

    todolist_defineProperty(this, "toZZZLast", () => this.nodeAt(this.count() - 1).setState({
      content: 'ZZZ',
      id: 'ZZZ'
    }).save());
  }

}

/* harmony default export */ var todolist = (todolist_Todolist);
// CONCATENATED MODULE: ./src/models/user.ts
function user_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }




const user_DEFAULT_DATA = {
  first_name: '',
  counter: 0
};

class user_User extends external_acey_["Model"] {
  constructor(data = user_DEFAULT_DATA, options) {
    super(data, options);

    user_defineProperty(this, "counter", () => this.state.counter);

    user_defineProperty(this, "todolist", () => this.state.todolist);

    user_defineProperty(this, "firstName", () => this.state.first_name);

    this.setState({
      counter: new counter({
        counter: data.counter
      }, this.kids()),
      todolist: new todolist([], this.kids())
    }).save();
  }

}

/* harmony default export */ var user = (user_User);
// CONCATENATED MODULE: ./src/models/index.ts



const models_Counter = new counter(undefined, {
  connected: true,
  key: 'counter'
});
const models_User = new user(undefined, {
  connected: true,
  key: 'user'
});
const models_Todolist = new todolist([], {
  connected: true,
  key: 'todolist'
});
// CONCATENATED MODULE: ./pages/index.js

var __jsx = external_react_default.a.createElement;

function pages_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }



const STORE_TYPE = 'store';

class pages_PCounter extends external_react_default.a.Component {
  constructor(...args) {
    super(...args);

    pages_defineProperty(this, "render", () => {
      return __jsx("p", null, " connected class: ", models_User.counter().get(), " ");
    });
  }

}

const PrintCounter = Object(external_react_acey_["connect"])([models_User])(pages_PCounter);

function Home(props) {
  const todolists = [models_Todolist, models_User.todolist()];
  const counters = [models_Counter, models_User.counter()];
  Object(external_react_acey_["useAcey"])([models_Counter, models_Todolist, models_User]);

  const method = (list = [], method = '', then = '' | 'store') => {
    list.forEach(v => {
      const ret = v[method]();
      then && ret[then]();
    });
  };

  const increment = (then = '' | 'localStore') => {
    method(counters, 'increment', then);
    const list = [];
    todolists.map(l => l.map(t => list.push(t.counter())));
    method(list, 'increment', then);
  };

  const decrement = (then = '' | 'localStore') => {
    method(counters, 'decrement', then);
    const list = [];
    todolists.map(l => l.map(t => list.push(t.counter())));
    method(list, 'decrement', then);
  };

  const addTodo = (then = '' | 'localStore') => method(todolists, 'add', then);

  const deleteFirst = (then = '' | 'localStore') => method(todolists, 'deleteFirst', then);

  const deleteLast = (then = '' | 'localStore') => method(todolists, 'deleteLast', then);

  const toZZZLast = (then = '' | 'localStore') => method(todolists, 'toZZZLast', then);

  const clearLocalStore = () => {
    models_Todolist.localStore().remove();
    models_Counter.localStore().remove();
    models_User.localStore().remove();
    location.reload();
  };

  return __jsx("div", {
    className: "container"
  }, __jsx("h1", null, props.id), __jsx("button", {
    onClick: clearLocalStore
  }, "clear local stores"), __jsx("br", null), __jsx("br", null), __jsx(PrintCounter, null), __jsx("br", null), __jsx("button", {
    onClick: () => decrement(STORE_TYPE)
  }, "decrement"), counters.map((v, index) => __jsx("span", {
    style: {
      marginLeft: 10,
      marginRight: 10
    },
    key: index
  }, v.get())), __jsx("button", {
    onClick: () => increment(STORE_TYPE)
  }, "increment"), __jsx("br", null), __jsx("button", {
    onClick: () => addTodo(STORE_TYPE)
  }, "Add element"), __jsx("button", {
    onClick: () => deleteFirst(STORE_TYPE)
  }, "Del 1st element"), __jsx("button", {
    onClick: () => deleteLast(STORE_TYPE)
  }, "Del last element"), __jsx("button", {
    onClick: () => toZZZLast(STORE_TYPE)
  }, "ToZZ last"), __jsx("div", null, todolists.map((list, index) => {
    return __jsx("div", {
      key: index
    }, __jsx("h1", null, "Todolist ", index), list.map((todo, index) => {
      return __jsx("div", {
        key: index
      }, __jsx("span", null, todo.content()), __jsx("span", null, " : "), __jsx("span", null, todo.ID()), __jsx("span", null, " = "), __jsx("span", {
        style: {
          color: 'red'
        }
      }, todo.counter().get()));
    }));
  })));
}

async function getServerSideProps(context) {
  models_Counter.increment();
  return {
    props: {
      id: 10
    } // will be passed to the page component as props

  };
}
/* harmony default export */ var pages = __webpack_exports__["default"] = (Home);

/***/ }),

/***/ "cDcd":
/***/ (function(module, exports) {

module.exports = require("react");

/***/ })

/******/ });