const _instances = new WeakMap();
const _transform = new WeakMap();
const _factory = new WeakMap();



function _identityTrn(id) {
	return id;
}



export default class Provider {
	constructor(factory, transform = _identityTrn) {
		if (
			typeof factory !== 'function' ||
			typeof transform !== 'function'
		) throw new TypeError();

		_instances.set(this, {});
		_transform.set(this, transform);
		_factory.set(this, factory);
	}


	get(id) {
		if ((typeof id !== 'string' || id === '') && typeof id !== 'symbol') throw new TypeError();

		const instances = _instances.get(this);

		id = _transform.get(this)(id, instances);

		if (!(id in instances)) instances[id] = _factory.get(this).call(this, id);

		return instances[id];
	}

	set(id, ins) {
		if (
			(typeof id !== 'string' || id === '') && typeof id !== 'symbol' ||
			typeof ins !== 'object' || ins === null
		) throw new TypeError();

		_instances.get(this)[id] = ins;

		return this;
	}

	reset(id) {
		if ((typeof id !== 'string' || id === '') && typeof id !== 'symbol') throw new TypeError();

		delete _instances.get(this)[id];

		return this;
	}
}
