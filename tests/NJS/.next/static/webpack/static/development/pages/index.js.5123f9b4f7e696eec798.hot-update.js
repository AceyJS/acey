webpackHotUpdate("static/development/pages/index.js",{

/***/ "./src/models/user.ts":
/*!****************************!*\
  !*** ./src/models/user.ts ***!
  \****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/classCallCheck */ "./node_modules/@babel/runtime/helpers/esm/classCallCheck.js");
/* harmony import */ var _babel_runtime_helpers_esm_assertThisInitialized__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/esm/assertThisInitialized */ "./node_modules/@babel/runtime/helpers/esm/assertThisInitialized.js");
/* harmony import */ var _babel_runtime_helpers_esm_inherits__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/esm/inherits */ "./node_modules/@babel/runtime/helpers/esm/inherits.js");
/* harmony import */ var _babel_runtime_helpers_esm_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/helpers/esm/possibleConstructorReturn */ "./node_modules/@babel/runtime/helpers/esm/possibleConstructorReturn.js");
/* harmony import */ var _babel_runtime_helpers_esm_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime/helpers/esm/getPrototypeOf */ "./node_modules/@babel/runtime/helpers/esm/getPrototypeOf.js");
/* harmony import */ var _babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @babel/runtime/helpers/esm/defineProperty */ "./node_modules/@babel/runtime/helpers/esm/defineProperty.js");
/* harmony import */ var acey__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! acey */ "./node_modules/acey/dist/index.js");
/* harmony import */ var acey__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(acey__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _counter__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./counter */ "./src/models/counter.ts");
/* harmony import */ var _todolist__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./todolist */ "./src/models/todolist.ts");







function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = Object(_babel_runtime_helpers_esm_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4__["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = Object(_babel_runtime_helpers_esm_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4__["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return Object(_babel_runtime_helpers_esm_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3__["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }




var DEFAULT_DATA = {
  first_name: '',
  counter: 0
};

var User = /*#__PURE__*/function (_Model) {
  Object(_babel_runtime_helpers_esm_inherits__WEBPACK_IMPORTED_MODULE_2__["default"])(User, _Model);

  var _super = _createSuper(User);

  function User() {
    var _this;

    var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : DEFAULT_DATA;
    var options = arguments.length > 1 ? arguments[1] : undefined;

    Object(_babel_runtime_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_0__["default"])(this, User);

    _this = _super.call(this, data, options);

    Object(_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_5__["default"])(Object(_babel_runtime_helpers_esm_assertThisInitialized__WEBPACK_IMPORTED_MODULE_1__["default"])(_this), "counter", function () {
      return _this.state.counter;
    });

    Object(_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_5__["default"])(Object(_babel_runtime_helpers_esm_assertThisInitialized__WEBPACK_IMPORTED_MODULE_1__["default"])(_this), "todolist", function () {
      return _this.state.todolist;
    });

    Object(_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_5__["default"])(Object(_babel_runtime_helpers_esm_assertThisInitialized__WEBPACK_IMPORTED_MODULE_1__["default"])(_this), "firstName", function () {
      return _this.state.first_name;
    });

    _this.setState({
      counter: new _counter__WEBPACK_IMPORTED_MODULE_7__["default"]({
        counter: data.counter
      }, _this.option().kids()),
      todolist: new _todolist__WEBPACK_IMPORTED_MODULE_8__["default"]([], _this.option().kids())
    }).save();

    return _this;
  }

  return User;
}(acey__WEBPACK_IMPORTED_MODULE_6__["Model"]);

/* harmony default export */ __webpack_exports__["default"] = (User);

/***/ })

})
//# sourceMappingURL=index.js.5123f9b4f7e696eec798.hot-update.js.map