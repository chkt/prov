import _assert from 'assert';

import ConfigProvider from '../source/ConfigProvider';



describe('ConfigProvider', () => {
	describe('#constructor', () => {
		it("should return a new instance", () => {
			const ins = new ConfigProvider({});

			_assert(ins instanceof ConfigProvider);
		});

		it("should require an object as first argument", () => {
			_assert.throws(() => new ConfigProvider(), TypeError);
			_assert.throws(() => new ConfigProvider(true), TypeError);
			_assert.throws(() => new ConfigProvider(1), TypeError);
			_assert.throws(() => new ConfigProvider("1"), TypeError);
			_assert.throws(() => new ConfigProvider(null), TypeError);
			_assert.throws(() => new ConfigProvider(() => 1), TypeError);
			_assert.throws(() => new ConfigProvider(Symbol()), TypeError);
		});
	});

	describe('#get', () => {
		it("should only accept a function as its sole argument", () => {
			const ins =  new ConfigProvider({});

			_assert.throws(() => ins.get(), TypeError);
			_assert.throws(() => ins.get(true), TypeError);
			_assert.throws(() => ins.get(1), TypeError);
			_assert.throws(() => ins.get("1"), TypeError);
			_assert.throws(() => ins.get({}), TypeError);
			_assert.doesNotThrow(() => ins.get(() => 1));
		});

		it("should always return the same instance for each supplied function", () => {
			function fn () {}

			const ins = new ConfigProvider({});

			const a = ins.get(fn);
			const b = ins.get(fn);

			_assert.strictEqual(a, b);
		});

		it("should return an object containing a set method", () => {
			function fn () {}

			const ins = new ConfigProvider({});

			const cfg = ins.get(fn);

			_assert(!('a' in cfg));
			_assert(typeof cfg.set === 'function');

			cfg.set({
				a : 1
			});

			_assert.strictEqual(cfg.a, 1);
		});

		it("should return the base config object for simple functions", () => {
			function fn () {}

			const ins = new ConfigProvider({ a : 1});

			const cfg = ins.get(fn);

			_assert.strictEqual(cfg.a, 1);
		});

		it("should return a inheriting object for inheriting classes", () => {
			function fna () {}
			function fnb () {}

			fnb.prototype = Object.create(fna.prototype);

			const ins = new ConfigProvider({ a : 1, b : 1 });

			ins.get(fnb).set({ b : 2 });

			_assert.strictEqual(ins.get(fnb).a, 1);
			_assert.strictEqual(ins.get(fnb).b, 2);
			_assert.strictEqual(ins.get(fna).a, 1);
			_assert.strictEqual(ins.get(fna).b, 1);
		});
	});
});