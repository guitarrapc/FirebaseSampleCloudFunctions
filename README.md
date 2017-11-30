Description
----

- use VSCode as an editor.
- Use TypeScript for AltJS. DO NOT WRITE RAW JavaScript at all.
- Use Yarn instead of npm.
- Deploy via firebse tools.
- use latest version package if available. Especially if you use firestore packages for "firebase-admin": "^5.0.0", "firebase-functions": "^0.7.0" or higher is required.

Before hand
----

Prepare tools and yarn.

```
npm install -g firebase-tools
npm instakk -g yarn
```

Style Guide
----

> - [TypeScript : Coding guidelines](https://github.com/Microsoft/TypeScript/wiki/Coding-guidelines)
> - [TypeScript StyleGuide and Coding Conversions](https://github.com/basarat/typescript-book/blob/master/docs/styleguide/styleguide.md)

Step to Start
----

1. initialize firebase project
    - `firebase init`

1. move to `functions` directory.
    - `functions` directory will be created by firebase init.

1. create `function/src` directory and move `functions/index.js` to `functions/src/index.ts` as for TypeScript.

1. add `functions/package.json` file.
1. install dependencies with `yarn` or `npm`. I recommend use yarn.
    - `yarn install`

1. create a `tsconfig.json`.

### package.json

```package.json
{
  "name": "function",
  "version": "0.0.0",
  "description": "cloud functions for twitter authorize",
  "main": "index.js",
  "scripts": {
    "serve": "firebase serve --only functions",
    "shell": "firebase experimental:functions:shell",
    "start": "npm run shell",
    "logs": "firebase functions:log",
    "build": "tsc",
    "watch": "tsc --watch",
    "deploy": "tsc && firebase deploy --only functions"
  },
  "author": "guitarrapc",
  "license": "",
  "dependencies": {
    "@google-cloud/firestore": "^0.10.0",
    "@types/firebase": "^2.4.32",
    "firebase-admin": "~5.5.1",
    "firebase-functions": "^0.7.3"
  },
  "devDependencies": {
    "typescript": "^2.2.2"
  }
}
```

### tsconfig.json

```tsconfig.json
{
	"compilerOptions": {
	  "lib": ["es6", "es2015.promise"],
	  "module": "commonjs",
	  "outDir": "./",
	  "noImplicitAny": false,
	  "strictNullChecks": true,
		"sourceMap": true,
		"target": "es5",
		"typeRoots": [
			"node_modules/@types"
		]
	},
	"include": [
		"src/**/*.ts",
		"spec/**/*.ts"
	],
	"exclude": [
		"node_modeles"
	]
}
```

### typings.json

```typings.json
{
  "dependencies": {}
}
```

Write your Function
----

you can specify which is entry point .js of function with define in 3 way.

1. index.js : export 1 or more function.
1. app.js : export 1 or more functions with package.json file that contains `"main" : "app.js"`
1. index.js : import one or more functions from goo.js file and then export one or more functions.

### Write in TypeScript

In this scenario, use TypeScript to define functions then transcompile to js.

these .ts files should be under `functions/src` directory.

1. index.ts : this handles export functions. no logics at all.
1. main.ts : this handles initializer and import package.
1. db.ts : this handles firebase realtimedatabase reference to be used in each functions.
1. store.ts : this handles firestore reference to be used in each function.
1. ****.ts : each functions. you will load index.ts and (db.ts | store.ts) for package reference. Make sure return promise.

Login to GCP Project
----

if needed, run following.
```
firebase login
```

> Specify GCP Project-Id at `.firebaserc`


```.firebaserc
{
  "projects": {
    "default": "fir-sample-15558"
  }
}
```

Build
----

this is required to transcompile .ts to .js using tsc.

```
npm run build
```

Local Serve
----


```
npm run serve
```

Deploy
----

### deploy all functions

```
npm run deploy
```

or

```
firebase deploy --only functions
```

### deploy specific function

```
firebase deploy --only functions:functionName
```

