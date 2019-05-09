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

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var viewIds = [];

var Taboola = function (_React$Component) {
	_inherits(Taboola, _React$Component);

	function Taboola(props) {
		_classCallCheck(this, Taboola);

		var _this = _possibleConstructorReturn(this, (Taboola.__proto__ || Object.getPrototypeOf(Taboola)).call(this, props));

		_this.state = {
			loaderCalled: false
		};
		return _this;
	}

	_createClass(Taboola, [{
		key: 'isFirstPage',
		value: function isFirstPage() {
			// it is the first page if the loader has not been loaded
			return !document.getElementById('tb_loader_script');
		}
	}, {
		key: 'callTaboolaLoader',
		value: function callTaboolaLoader() {
			var publisher = this.props.publisher;

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
			})(document.createElement('script'), document.getElementsByTagName('script')[0], '//cdn.taboola.com/libtrc/' + publisher + '/loader.js', 'tb_loader_script');
			if (window.performance && typeof window.performance.mark == 'function') {
				window.performance.mark('tbl_ic');
			}
		}
	}, {
		key: 'shouldPushNewPage',
		value: function shouldPushNewPage() {
			var currentUrl = this.props.currentUrl;
			// if we have the loader but this is a new URL, we should push the notify-new-page event and the currentUrl

			return !!document.getElementById('tb_loader_script') && !viewIds.includes(currentUrl);
		}

		// This function calls the loader

	}, {
		key: 'onPageLoad',
		value: function onPageLoad() {
			var _ref;

			var _props = this.props,
			    pageType = _props.pageType,
			    currentUrl = _props.currentUrl;

			// if it's a new page, pass the new url, else pass the page type

			var topInfo = this.shouldPushNewPage() ? (_ref = {}, _defineProperty(_ref, pageType, 'auto'), _defineProperty(_ref, 'url', currentUrl), _ref) : _defineProperty({}, pageType, 'auto');

			window._taboola = window._taboola || [];
			window._taboola.push(topInfo);

			// if it is a new page, notify a new page has loaded
			if (this.shouldPushNewPage()) {
				window._taboola.push({ notify: 'newPageLoad' });
			}

			// if it's the first page loaded
			if (this.isFirstPage()) {
				this.callTaboolaLoader();
			}

			// finally, mark this page as seen
			viewIds.push(currentUrl);
		}
	}, {
		key: 'loadWidget',
		value: function loadWidget(_ref3) {
			var mode = _ref3.mode,
			    placement = _ref3.placement,
			    targetType = _ref3.targetType,
			    containerId = _ref3.containerId;

			window._taboola = window._taboola || [];
			window._taboola.push({
				mode: mode,
				container: containerId,
				placement: placement,
				target_type: targetType
			});
		}
	}, {
		key: 'formatContainerId',
		value: function formatContainerId(placement) {
			var saltedPlacement = placement + '-' + Math.floor(Math.random() * 100000);
			return saltedPlacement.toLowerCase().split(' ').join('-');
		}
	}, {
		key: 'componentDidMount',
		value: function componentDidMount() {
			try {
				this.onPageLoad();
			} catch (e) {
				console.log('Error in taboola-react-plugin: ', e.message);
			} finally {
				this.setState({
					loaderCalled: true,
					containerId: this.formatContainerId(this.props.placement)
				});
			}
		}
	}, {
		key: 'render',
		value: function render() {
			var _props2 = this.props,
			    mode = _props2.mode,
			    placement = _props2.placement,
			    targetType = _props2.targetType;
			var containerId = this.state.containerId;

			return _react2.default.createElement(
				_react2.default.Fragment,
				null,
				this.state.loaderCalled && _react2.default.createElement('div', { id: containerId }),
				this.state.loaderCalled && this.loadWidget({ mode: mode, placement: placement, targetType: targetType, containerId: containerId })
			);
		}
	}]);

	return Taboola;
}(_react2.default.Component);

exports.default = Taboola;

/***/ })
/******/ ]);