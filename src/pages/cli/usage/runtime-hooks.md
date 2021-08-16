---
title: Runtime Hooks
description: Execute custom scripts at Amplify lifecycle events.
---

Runtime Hooks enable you to execute custom scripts at specific Amplify CLI lifecycle events like pre-push, post-add, etc. 

## Getting Started
When running `amplify init`, a `amplify/hooks` drectory is created. We can place the hook scripts in this directory and name the scripts accoriding to the the event we want to hook into, for example `post-add-function.js`. More detailed file naming convention can be found in this [section](https://docs.amplify.aws/cli/usage/runtime-hooks#Adding-Hook-Scripts). 

This is an example of using `post-add-function` hook to convert all JavaScript created functions into TypeScript functions:
```
> cd my_project
> amplify init
```
Next we will add `post-add-function.js` in the `amplify/hooks` drectory. 

`post-add-function.js`:
```js
const path = require("path");
const fs = require("fs");
const tsConfigFileName = "tsconfig.json";
  const tsConfigContent = {
    compilerOptions: {
      outDir: "./lib",
      rootDir: "./src",
    },
    include: ["src/**/*"],
    exclude: ["node_modules"],
  };
const functionsDirPath = path.join(
  process.cwd(),
  "amplify",
  "backend",
  "function"
);

fs.readdirSync(functionsDirPath).forEach((functionName) => {
  const functionDirPath = path.join(functionsDirPath, functionName);
  if (!fs.readdirSync(functionDirPath).includes(tsConfigFileName)) {
    fs.writeFileSync(
      path.join(functionDirPath, tsConfigFileName),
      JSON.stringify(tsConfigContent)
    );
    fs.unlinkSync(path.join(functionDirPath, "src", "index.js"));
    fs.unlinkSync(path.join(functionDirPath, "src", "event.json"));
    fs.writeFileSync(
      path.join(functionDirPath, "src", "index.ts"),
      'console.log("hello world from runtime hooks!");'
    );
    console.log("converted " + functionName + " from JS to TS");
  }
});
```
Next we will add a `Hello World` Node.js Lambda function:
```
> amplify add function
? Select which capability you want to add: Lambda function (serverless function)
? Provide an AWS Lambda function name: TSFunction
? Choose the runtime that you want to use: NodeJS
? Choose the function template that you want to use: Hello World

Available advanced settings:
- Resource access permissions
- Scheduled recurring invocation
- Lambda layers configuration
- Environment variables configuration
- Secret values configuration

? Do you want to configure advanced settings? No
? Do you want to edit the local lambda function now? No
Successfully added resource TSFunction locally.

Next steps:
Check out sample function code generated in <project-dir>/amplify/backend/function/TSFunction/src
"amplify function build" builds all of your functions currently in the project
"amplify mock function <functionName>" runs your function locally
"amplify push" builds all of your local backend resources and provisions them in the cloud
"amplify publish" builds all of your local backend and front-end resources (if you added hosting category) and provisions them in the cloud


----- 🪝 post-add-function execution start -----
converted TSFunction from JS to TS
----- 🪝 post-add-function execution end -----

```

Note: For projects created before CLI version #.##.#, `amplify/hooks` directory can be manually created. 

## Adding Hook Scripts
To hook into an event, the file placed in the `amplify/hooks` directory should be named with the following naming convention: 

`pre|post-<command>[-<sub-commmand>].extension` 

- `command` (required) - Amplify command.
- `extension` (required) - by default js and sh are mapped to node and bash. To add more extensions please refer to [adding extensions](https://docs.amplify.aws/cli/usage/runtime-hooks#Extensions)
- `sub-commmand` (optional) - Amplify sub-command. Can be used to increase hook specificity. Example: `pre-add-auth` and `pre-mock-api`.

The following is an exhaustive list of all commands along with their subcommands that are supported by Amplify CLI: 

commands                | sub-commands (optional)
------------------------|------------------------
add                     |notifications<br>analytics<br>api<br>auth<br>function<br>hosting<br>interactions<br>predictions<br>storage<br>xr<br>codegen<br>env<br>
update                  |notifications<br>analytics<br>api<br>auth<br>function<br>hosting<br>interactions<br>predictions<br>storage<br>xr<br>env<br>
remove                  |notifications<br>analytics<br>api<br>auth<br>function<br>hosting<br>interactions<br>predictions<br>storage<br>xr<br>env<br>
push                    |analytics<br>api<br>auth<br>function<br>hosting<br>interactions<br>storage<br>xr<br>
pull                    |env<br>
publish                 |-
delete                  |-
checkout                |env<br>
list                    |env<br>
get                     |env<br>
mock                    |api<br>storage<br>function<br>
build                   |function<br>
status                  |notifications<br>
import                  |auth<br>storage<br>env<br>
gqlcompile              |api<br>
addgraphqldatasource    |api<br>
statements              |codegen<br>
types                   |codegen<br>


Note: Amplify CLI will throw error if multiple hook scripts with same filename exist in the hooks directory. 

## Accessing parameters in Hook Scripts

Amplify CLI passes parameters to hook scripts as a JSON string through standard input. This JSON string has two parameters, data and error, with the following object structures:

- **data**:
    ```json
    {
      "amplify": { 
        "version": String,
        "environment": String,
        "command": String,
        "subCommand": String,
        "argv": [ String ]
      }
    }
    ```
    - amplify
        - version - current Amplify version
        - environment - current Amplify environment
        - command - Amplify CLI command executed. Example: `push`
        - subCommand - Amplify CLI subcommand or plugin executed. Example `auth`, `env`. 
        - argv - list containing the arguments passed to Amplify CLI through the command line

- **error**: `undefined` if no error is emitted
    ```json
    {
      "message": String,
      "stack": String
    }
    ```
    - message - the error message emitted by Amplify CLI
    - stack - the error stack emitted by Amplify CLI

### Example script to access parameters in JavaScript:
```javascript
const fs = require("fs");
const parameters = JSON.parse(fs.readFileSync(0, { encoding: "utf8" }));
console.log(parameters.data, parameters.error)
```
### Example script to access parameters in Bash:
```bash
parameters=`cat`
data=$(jq -r '.data' <<< "$parameters")
error=$(jq -r '.error // empty' <<< "$parameters")
echo $data
echo $error
```

## Stop the execution of Amplify CLI
To stop the execution of Amplify CLI, the hook scripts can exit with a non-zero exit code. 

## Advanced Settings
You can optionally add `hooks-config.json` file in the hooks directory to configure the following advanced settings.

### Adding programming languages 
By default, JavaScript and Bash are supported out of box. To add more programming languages support, we will add `extensions` to our `hooks-config.json` file.

Following is an example where we added Python and reconfigured JavaScript runtimes: 
```json
{
  "extensions": {
    "py": {
      "runtime": "python3"
    },
    "js": {
      "runtime": "~/.nvm/versions/node/v14.17.1/bin/node",
      "runtime_windows": "node"
    }
  }
}
```
- The keys in the `extensions` ( js, py ) are values that will be used as `extension` in the [naming convention](https://docs.amplify.aws/cli/usage/runtime-hooks#Adding-Hook-Scripts) used when naming the hook scripts.
- `runtime` (required) - symlink (`node`, `python`, `bash`) or path to executable (`~/.nvm/versions/node/v14.17.1/bin/node`).
- `runtime_windows` (optional) - windows specific symlink or path to executable.

### Managing third-party dependencies

External packages can be used in hooks scripts and can be installed via package managers like npm. 

Following is an example of using `axios` in a JavaScript Hook:

```
> cd my_project/amplify/hooks
> npm init
> npm install axios
```

Dependency directories and files should be added to `ignore` in `hooks-config.json`:

```json
{
  "ignore": ["node-modules", "build"]
}
```
Note: All entries in `ignore` should follow: [.gitignore spec](http://git-scm.com/docs/gitignore)

You can now use `axios` in your hook scripts placed in the `amplify/hooks` directory.


## Using Hooks in CI/CD pipeline
Runtime hooks are supported and are executed when [CI/CD are triggered on Amplify Console](https://docs.aws.amazon.com/amplify/latest/userguide/multi-environments.html). To execute hook scripts in the Amplify Console, add the hook scripts to the `amplify/hooks` directory and run `amplify push` locally. All builds in Amplify Console with this backend environment will run the hook scripts added to `amplify/hooks` directory.

Note: Only `pre-push` and `post-push` hooks will be executed on Amplify Console.

To use programming languages other than JavaScript and bash follow the steps in [this section](https://docs.amplify.aws/cli/usage/runtime-hooks#Adding-programming-languagespts) and add Build settings to cofigure Amplify Console.  

Following is an example to use python hook scripts in Amplify Console build:

1. Add the python hook script along with `hooks-config.json` to the hooks directory. 
    ```
    $ ls amplify/hooks
    hooks-config.json       pre-push.py
    ```

2. Add `python3` to `hooks-config.json` and run `amplify push`.
    ```
    $ cat amplify/hooks/hooks-config.json
    {
        "extensions": {
            "py": { "runtime": "python3" }
        }
    }
    $ amplify push
    ```
3. Navigate to **Amplify Console > my_project > App settings >** **Build settings** and add the following `preBuild` phase to install python and configure python3 symlink.
    ```yml
    ...
        backend:
        phases:
            preBuild:
            commands:
                - yum install -y python3
        frontend:
    ...
    ```

4. You’re all set! From the next push onward, the python scripts will be executed in the Amplify Console Builds. 

More information about build settings can be found at: [https://docs.aws.amazon.com/amplify/latest/userguide/build-settings.html](https://docs.aws.amazon.com/amplify/latest/userguide/build-settings.html#yml-specification-syntax)

### Amplify Admin UI
Runtime Hooks are not supported and hence will not be executed on Amplify Admin UI. 


