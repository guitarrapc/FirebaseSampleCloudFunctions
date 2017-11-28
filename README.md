Before hand
----

```
npm install -g firebase-functions
npm instakk -g yarn
```

Step to Start
----

1. initialize firebase project

```
firebase init
```

2. move to `functions` directory.
    - `functions` directory will be created by firebase init.

3. create `function/src` directory and move `functions/index.js` to `functions/src/index.ts` as for TypeScript.

4. add `functions/package.json` file.
5. install dependencies with `yarn` or `npm`. I recommend use yarn.

```
yarn install
```

6. create a `tsconfig.json`.

```json
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

Login to GCP Project
----

if needed, run following.

`
firebase login
`

> Specify GCP Project-Id at `.firebaserc`

Build
----

`
npm run build
`

Deploy
----

`
firebase deploy --only functions
`