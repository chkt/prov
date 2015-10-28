'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _Provider2 = require('./Provider');

var _Provider3 = _interopRequireDefault(_Provider2);

var _BaseObservable = require('./BaseObservable');

var _observe = _interopRequireWildcard(_BaseObservable);

var _CFG_PROTO = Object.freeze({
	set: function set(props) {
		if (typeof props !== 'object' || props === null) throw new TypeError();

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

var ConfigProvider = (function (_Provider) {
	_inherits(ConfigProvider, _Provider);

	function ConfigProvider(base) {
		_classCallCheck(this, ConfigProvider);

		if (typeof base !== 'object' || base === null) throw new TypeError();

		_get(Object.getPrototypeOf(ConfigProvider.prototype), 'constructor', this).call(this, _factory);

		_base.set(this, base);
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
})(_Provider3['default']);

exports['default'] = ConfigProvider;
module.exports = exports['default'];