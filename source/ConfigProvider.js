import Provider from './Provider';



const _CFG_PROTO = Object.freeze({
	set : function(props) {
		if (typeof props !== 'object' || props === null) throw new TypeError();

		for (let prop in props) {
			if (props.hasOwnProperty(prop)) this[prop] = props[prop];
		}

		return this;
	}
});


const _base = new WeakMap();
const _symbol = new WeakMap();
const _reverse = {};



function _factory(sym) {
	if (!(sym in _reverse)) throw new RangeError();

	const cns = _reverse[sym];

	delete _reverse[sym];

	const parentCns = Object.getPrototypeOf(cns.prototype).constructor;

	if (parentCns === Object) return Object.create(_CFG_PROTO).set(_base.get(this));
	else return Object.create(this.get(parentCns));
}



export default class ConfigProvider extends Provider {
	constructor(base) {
		if (typeof base !== 'object' || base === null) throw new TypeError();

		super(_factory);

		_base.set(this, base);
	}


	get(cns) {
		if (typeof cns !== 'function') throw new TypeError();

		if (!_symbol.has(cns)) {
			const sym = Symbol();

			_symbol.set(cns, sym);
			_reverse[sym] = cns;
		}

		return super.get(_symbol.get(cns));
	}
}
