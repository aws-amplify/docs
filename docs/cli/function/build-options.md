---
title: Build options
description: Use build options for Amplify's function category to execute a script before a function is deployed, e.g. to transpile Typescript or ES6 with Babel into a format that is supported by the AWS Lambda's node runtime.
---

In some cases, it might be necessary to execute a script before a function is deployed, e.g. to transpile Typescript or ES6 with Babel into a format that is supported by the AWS Lambda's node runtime. `amplify push` will look for a `script` definition in the project root's `package.json` with the name `amplify:<resource_name>` and run it right after `npm install` is canned in the function resource's `src` directory.

**Example: Transpiling ES6 code with Babel**

Let's say, a function resource has been created with `amplify function add` and it is called `generateReport`. The ES6 source code for this function is located in `amplify/backend/function/generateReport/lib` and the resource's `src` directory only contains the auto-generated `package.json` for this function. In order to run Babel, you have to add the following script definition and dev dependencies to your project root's `package.json`:

```json
{
  "scripts": {
    "amplify:generateReport": "cd amplify/backend/function/generateReport && babel lib -d src && cd -"
  },
  "devDependencies": {
    "@babel/cli": "^7.5.5",
    "@babel/preset-env": "^7.5.5",
  }
}
```

Babel needs to be configured properly so that the transpiled code can be run on AWS Lambda. This can be done by adding a `.babelrc` file to the resource folder (`amplify/backend/function/generateReport/.babelrc` in this case):

```json
{
  "presets": [
    [
      "env",
      {
        "exclude": ["transform-regenerator"],
        "targets": {
          "node": "10.18"
        }
      }
    ]
  ],
  "plugins": [
    "transform-async-to-generator",
    "transform-exponentiation-operator",
    "transform-object-rest-spread"
  ]
}
```

Once you run `amplify push`, the `amplify:generateReport` script will be executed, either by `yarn` or by `npm` depending on the existence of a `yarn.lock` file in the project root directory.