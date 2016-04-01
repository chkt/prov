'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

var _Provider2 = require('./Provider');

var _Provider3 = _interopRequireDefault(_Provider2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _CFG_PROTO = Object.freeze({
	set: function set(props) {
		if ((typeof props === 'undefined' ? 'undefined' : _typeof(props)) !== 'object' || props === null) throw new TypeError();

		for (var prop in props) {
			if (props.hasOwnProperty(prop)) this[prop] = props[prop];
		}

		return this;
	}
});

var _base = new WeakMap();
var _symbol = new WeakMap();
var _reverse = {};

function _factory(sym) {
	if (!(sym in _reverse)) throw new RangeError();

	var cns = _reverse[sym];

	delete _reverse[sym];

	var parentCns = Object.getPrototypeOf(cns.prototype).constructor;

	if (parentCns === Object) return Object.create(_CFG_PROTO).set(_base.get(this));else return Object.create(this.get(parentCns));
}

var ConfigProvider = function (_Provider) {
	_inherits(ConfigProvider, _Provider);

	function ConfigProvider(base) {
		_classCallCheck(this, ConfigProvider);

		if ((typeof base === 'undefined' ? 'undefined' : _typeof(base)) !== 'object' || base === null) throw new TypeError();

		var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(ConfigProvider).call(this, _factory));

		_base.set(_this, base);
		return _this;
	}

	_createClass(ConfigProvider, [{
		key: 'get',
		value: function get(cns) {
			if (typeof cns !== 'function') throw new TypeError();

			if (!_symbol.has(cns)) {
				var sym = Symbol();

				_symbol.set(cns, sym);
				_reverse[sym] = cns;
			}

			return _get(Object.getPrototypeOf(ConfigProvider.prototype), 'get', this).call(this, _symbol.get(cns));
		}
	}]);

	return ConfigProvider;
}(_Provider3.default);

exports.default = ConfigProvider;