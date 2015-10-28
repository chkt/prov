'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _factory = new WeakMap();
var _instance = new WeakMap();

var Provider = (function () {
	function Provider(factory) {
		_classCallCheck(this, Provider);

		if (typeof factory !== 'function') throw new TypeError();

		_factory.set(this, factory);
		_instance.set(this, {});
	}

	_createClass(Provider, [{
		key: 'get',
		value: function get(id) {
			if ((typeof id !== 'string' || id === '') && typeof id !== 'symbol') throw new TypeError();

			var ins = _instance.get(this);

			if (!(id in ins)) ins[id] = _factory.get(this).call(this, id);

			return ins[id];
		}
	}, {
		key: 'getUnique',
		value: function getUnique() {
			return _factory.get(this)(Symbol());
		}
	}]);

	return Provider;
})();

exports['default'] = Provider;
module.exports = exports['default'];