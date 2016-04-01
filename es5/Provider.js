'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _instances = new WeakMap();
var _transform = new WeakMap();
var _factory = new WeakMap();

function _identityTrn(id) {
	return id;
}

var Provider = function () {
	function Provider(factory) {
		var transform = arguments.length <= 1 || arguments[1] === undefined ? _identityTrn : arguments[1];

		_classCallCheck(this, Provider);

		if (typeof factory !== 'function' || typeof transform !== 'function') throw new TypeError();

		_instances.set(this, {});
		_transform.set(this, transform);
		_factory.set(this, factory);
	}

	_createClass(Provider, [{
		key: 'get',
		value: function get(id) {
			if ((typeof id !== 'string' || id === '') && (typeof id === 'undefined' ? 'undefined' : _typeof(id)) !== 'symbol') throw new TypeError();

			var instances = _instances.get(this);

			id = _transform.get(this)(id, instances);

			if (!(id in instances)) instances[id] = _factory.get(this).call(this, id);

			return instances[id];
		}
	}, {
		key: 'set',
		value: function set(id, ins) {
			if ((typeof id !== 'string' || id === '') && (typeof id === 'undefined' ? 'undefined' : _typeof(id)) !== 'symbol' || (typeof ins === 'undefined' ? 'undefined' : _typeof(ins)) !== 'object' || ins === null) throw new TypeError();

			_instances.get(this)[id] = ins;

			return this;
		}
	}, {
		key: 'reset',
		value: function reset(id) {
			if ((typeof id !== 'string' || id === '') && (typeof id === 'undefined' ? 'undefined' : _typeof(id)) !== 'symbol') throw new TypeError();

			delete _instances.get(this)[id];

			return this;
		}
	}]);

	return Provider;
}();

exports.default = Provider;