module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
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
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
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
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
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
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = require("react");

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Taboola = function () {
    function loadScript(_ref) {
        var publisher = _ref.publisher,
            pageType = _ref.pageType;

        window._taboola = window._taboola || [];
        window._taboola.push(_defineProperty({}, pageType, 'auto'));
        (function (e, f, u, i) {
            if (!document.getElementById(i)) {
                e.async = 1;
                e.src = u;
                e.id = i;
                if (!f) {
                    document.head.append(e);
                } else {
                    f.parentNode.insertBefore(e, f);
                }
            }
        })(document.createElement('script'), document.getElementsByTagName('script')[0], 'https://cdn.taboola.com/libtrc/' + publisher + '/loader.js', 'tb_loader_script');
        if (window.performance && typeof window.performance.mark == 'function') {
            window.performance.mark('tbl_ic');
        }
    }

    function formatContainerId(placement) {
        return placement.toLowerCase().split(' ').join('-');
    }

    function loadWidget(_ref2) {
        var mode = _ref2.mode,
            placement = _ref2.placement,
            targetType = _ref2.targetType,
            containerId = _ref2.containerId;

        window._taboola = window._taboola || [];
        window._taboola.push({
            mode: mode,
            container: containerId,
            placement: placement,
            target_type: targetType
        });
    }

    return function (_ref3) {
        var publisher = _ref3.publisher,
            mode = _ref3.mode,
            placement = _ref3.placement,
            pageType = _ref3.pageType,
            targetType = _ref3.targetType;

        loadScript({ publisher: publisher, pageType: pageType });
        var containerId = formatContainerId(placement);

        return _react2.default.createElement(
            _react2.default.Fragment,
            null,
            _react2.default.createElement('div', { id: containerId }),
            loadWidget({ mode: mode, placement: placement, targetType: targetType, containerId: containerId })
        );
    };
}();

exports.default = Taboola;

/***/ })
/******/ ]);