import _assert from 'assert';

import Provider from '../source/Provider';



describe("Provider", () => {
	describe('#constructor', () => {
		it("should create a new instance", () => {
			const ins = new Provider(() => 1);

			_assert(ins instanceof Provider);
		});

		it("should only accept a function as its first argument", () => {
			_assert.throws(() => new Provider(), TypeError);
			_assert.throws(() => new Provider(true), TypeError);
			_assert.throws(() => new Provider(1), TypeError);
			_assert.throws(() => new Provider("1"), TypeError);
			_assert.throws(() => new Provider({}), TypeError);
			_assert.doesNotThrow(() => new Provider(() => 1));
			_assert.throws(() => new Provider(Symbol()), TypeError);
		});
	});

	describe("#get", () => {
		it("should only accept a nonempty string or symbol as its sole argument", () => {
			function factory(id) {
				return { id };
			}

			const ins = new Provider(factory);

			_assert.throws(() => ins.get(), TypeError);
			_assert.throws(() => ins.get(true), TypeError);
			_assert.throws(() => ins.get(1), TypeError);
			_assert.throws(() => ins.get(""), TypeError);
			_assert.doesNotThrow(() => ins.get("1"));
			_assert.throws(() => ins.get({}), TypeError);
			_assert.throws(() => ins.get(() => 1), TypeError);
			_assert.doesNotThrow(() => ins.get(Symbol()));
		});

		it("should return the object supplied by the factory function", () => {
			const factoryResult = {};

			function factory(id) {
				return factoryResult;
			}

			const ins = new Provider(factory);
			const ret = ins.get(Symbol());

			_assert.strictEqual(ret, factoryResult);
		});

		it("should always return the same instance for each supplied id", () => {
			function factory(id) {
				return { id };
			}

			const ins = new Provider(factory);
			const ret = ins.get('a');

			_assert.strictEqual(ret, ins.get('a'));
		});

		it("should never run the factory more than once for each supplied id", () => {
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

	describe("#getUnique", () => {
		it("should return the object supplied by the factory function", () => {
			const factoryResult = {};

			function factory(id) {
				return factoryResult;
			}

			const ins = new Provider(factory);
			const ret = ins.getUnique();

			_assert.strictEqual(ret, factoryResult);
		});

		it("should always run the factory function", () => {
			let count = 0;

			function factory(id) {
				count += 1;

				return { id };
			}

			const ins = new Provider(factory);
			const a = ins.getUnique();
			const b = ins.getUnique();

			_assert.strictEqual(count, 2);
		});

		it("should always return the new result of the factory function", () => {
			function factory(id) {
				return {};
			}

			const ins = new Provider(factory);
			const a = ins.getUnique();
			const b = ins.getUnique();

			_assert.notStrictEqual(a, b);
		});
	});
});