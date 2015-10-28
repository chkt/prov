# prov

Simple Provider & Readymades

## Install

```sh
$ npm install prov
```

## Use

```js
import Provider from 'prov/dist/Provider';


function factoryFunction(id) {
	return new MyObject(id);
}


let myProvider = new Provider(factoryFunction);

let obj = myProvider.get("objectIdentifier");
```

## Extend

```js
import Provider from 'prov/dist/Provider';


export default class MyProvider extends Provider {
	constructor() {
		super(myProviderObjectFactory);

		//additional construction code
	}

	//public api
}
```