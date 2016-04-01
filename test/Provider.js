import _assert from 'assert';

import Provider from '../source/Provider';



describe("Provider", () => {
	describe('#constructor', () => {
		it("should create a new instance", () => {
			const ins = new Provider(() => 1);

			_assert(ins instanceof Provider);
		});

		it("should accept a function as its first argument", () => {
			_assert.throws(() => new Provider(), TypeError);
			_assert.throws(() => new Provider(true), TypeError);
			_assert.throws(() => new Provider(1), TypeError);
			_assert.throws(() => new Provider("1"), TypeError);
			_assert.throws(() => new Provider({}), TypeError);
			_assert.doesNotThrow(() => new Provider(() => 1));
			_assert.throws(() => new Provider(Symbol()), TypeError);
		});

		it("should accept a function as optional second argument", () => {
			function factory() {
				return {};
			}

			_assert.throws(() => new Provider(factory, true), TypeError);
			_assert.throws(() => new Provider(factory, 1), TypeError);
			_assert.throws(() => new Provider(factory, "1"), TypeError);
			_assert.throws(() => new Provider(factory, Symbol()), TypeError);
			_assert.throws(() => new Provider(factory, {}), TypeError);
			_assert.doesNotThrow(() => new Provider(factory, id => id));
		});
	});

	describe("#get", () => {
		it("should require a nonempty string or symbol a sole argument", () => {
			const ins = new Provider(() => 1);

			_assert.throws(() => ins.get(), TypeError);
			_assert.throws(() => ins.get(true), TypeError);
			_assert.throws(() => ins.get(1), TypeError);
			_assert.throws(() => ins.get(""), TypeError);
			_assert.doesNotThrow(() => ins.get("1"));
			_assert.throws(() => ins.get({}), TypeError);
			_assert.throws(() => ins.get(() => 1), TypeError);
			_assert.doesNotThrow(() => ins.get(Symbol()));
		});

		it("should supply the id to the transform function", () => {
			const ID = Symbol();

			const ins = new Provider(id => id, id => {
				if (id !== ID) throw new Error();
			});

			_assert.doesNotThrow(() => ins.get(ID));
			_assert.throws(() => ins.get(Symbol()), Error);
		});

		it("should set this to the provider when invoking the factory function", () => {
			function factory(id) {
				return this;
			}

			const ins = new Provider(factory);

			_assert.strictEqual(ins.get(Symbol()), ins);
		});

		it("should supply the transformed id to the factory function", () => {
			const ID = Symbol();
			const TRN = Symbol();

			const ins = new Provider(id => {
				if (id !== TRN) throw new Error();
			}, id => id === ID ? TRN : id);

			_assert.doesNotThrow(() => ins.get(ID));
			_assert.throws(() => ins.get(Symbol()), Error);
		});

		it("should supply the original id to the factory if used with the default transform", () => {
			const ID = Symbol();

			const ins = new Provider(id => {
				if (id !== ID) throw new Error();
			});

			_assert.doesNotThrow(() => ins.get(ID));
			_assert.throws(() => ins.get(Symbol()), Error);
		});

		it("should return the object returned by the factory function", () => {
			const result = {};

			function factory(id) {
				return result;
			}

			const ins = new Provider(factory);
			const ret = ins.get(Symbol());

			_assert.strictEqual(ret, result);
		});

		it("should always return the same instance for each transformed id", () => {
			function factory(id) {
				return { id };
			}

			const ins = new Provider(factory);
			const ret = ins.get('a');

			_assert.strictEqual(ret, ins.get('a'));
		});

		it("should never run the factory more than once for each transformed id", () => {
			const count = {};

			function factory(id) {
				if (!(id in count)) count[id] = 1;
				else count[id] += 1;

				return { id };
			}

			const ins = new Provider(factory);
			const a = ins.get('a');
			const b = ins.get('a');

			_assert.strictEqual(a, b);
			_assert.strictEqual(count['a'], 1);
		});
	});

	describe('#set', () => {
		it("should require a nonempty string or symbol as first argument", () => {
			const ins = new Provider(() => 1);
			const obj = {};

			_assert.throws(() => ins.set(true, obj), TypeError);
			_assert.throws(() => ins.set(1, obj) , TypeError);
			_assert.throws(() => ins.set("", obj), TypeError);
			_assert.doesNotThrow(() => ins.set("1", obj));
			_assert.doesNotThrow(() => ins.set(Symbol(), obj));
			_assert.throws(() => ins.set(undefined, obj), TypeError);
			_assert.throws(() => ins.set(null, obj), TypeError);
			_assert.throws(() => ins.set({}, obj), TypeError);
			_assert.throws(() => ins.set(() => 1), TypeError);
		});

		it("should require a object as second argument", () => {
			const ins = new Provider(() => 1);
			const id = Symbol();

			_assert.throws(() => ins.set(id, true), TypeError);
			_assert.throws(() => ins.set(id, 1), TypeError);
			_assert.throws(() => ins.set(id, "1"), TypeError);
			_assert.throws(() => ins.set(id, undefined), TypeError);
			_assert.throws(() => ins.set(id, null), TypeError);
			_assert.doesNotThrow(() => ins.set(id, {}));
			_assert.doesNotThrow(() => ins.set(id, []));
		});

		it("should return the provided object when #get", () => {
			const id = Symbol();
			const result = {};

			const ins = new Provider(id => {})
				.set(id, result);

			const ret = ins.get(id);

			_assert.strictEqual(ret, result);
		});

		it ("should return the last provided object when #get", () => {
			const id = Symbol();
			const result = {};

			const ins = new Provider(id => {});

			_assert.strictEqual(ins.set(id, result).get(id), result);
			_assert.notStrictEqual(ins.set(id, {}).get(id), result);
			_assert.strictEqual(ins.set(id, result). get(id), result);
		});

		it("should return the instance", () => {
			const ins = new Provider(id => 1);

			_assert.strictEqual(ins.set(Symbol(), {}), ins);
		});
	});

	describe('#reset', () => {
		it("should require a nonempty string or symbol as sole argument", () => {
			const ins = new Provider(id => 1);

			_assert.throws(() => ins.reset(), TypeError);
			_assert.throws(() => ins.reset(true), TypeError);
			_assert.throws(() => ins.reset(1), TypeError);
			_assert.throws(() => ins.reset(""), TypeError);
			_assert.doesNotThrow(() => ins.reset("1"), TypeError);
			_assert.doesNotThrow(() => ins.reset(Symbol()), TypeError);
			_assert.throws(() => ins.reset(null), TypeError);
			_assert.throws(() => ins.reset({}), TypeError);
		});
		it("should created a new object when #get", () => {
			const id = Symbol();
			const result = {};

			const ins = new Provider(id => ({})).set(id, result);

			_assert.strictEqual(ins.get(id), result);
			_assert.notStrictEqual(ins.reset(id).get(id));
		});

		it("should return the instance", () => {
			const ins = new Provider(id => 1);

			_assert.strictEqual(ins.reset(Symbol()), ins);
		});
	});
});
