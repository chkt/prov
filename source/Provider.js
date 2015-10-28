const _factory = new WeakMap();
const _instance = new WeakMap();



export default class Provider {
	constructor(factory) {
		if (typeof factory !== 'function') throw new TypeError();

		_factory.set(this, factory);
		_instance.set(this, {});
	}


	get(id) {
		if (
			(typeof id !== 'string' || id === '') &&
			typeof id !== 'symbol'
		) throw new TypeError();

		const ins = _instance.get(this);

		if (!(id in ins)) ins[id] = _factory.get(this).call(this, id);

		return ins[id];
	}


	getUnique() {
		return _factory.get(this)(Symbol());
	}
}
