---
title: Plugin platform
description: Plugins enable you to add additional commands and functionality to existing Amplify CLI. Learn how to create, publish, consume a plugin package.
---  

Plugins are explicitly managed in the Amplify CLI pluggable platform. Plugins enable you to add additional commands and functionality to existing Amplify CLI. This section goes through the steps to create, publish, consume a plugin package, explains the folder structure, and key files in the plugin package. 

## Official plugins
- amplify-category-analytics
- amplify-category-api
- amplify-category-auth
- amplify-category-function
- amplify-category-hosting
- amplify-category-interactions
- amplify-category-notifications
- amplify-category-predictions
- amplify-category-storage
- amplify-category-xr
- amplify-codegen
- amplify-frontend-javascript
- amplify-frontend-android
- amplify-frontend-ios
- amplify-provider-awscloudformation

## Third-party plugins

* [amplify-category-video](https://www.npmjs.com/package/amplify-category-video)
* [amplify-category-docs](https://www.npmjs.com/package/amplify-category-docs)

## Plugin installation

You can add a 3rd party plugin to the Amplify CLI with the following steps:
- If the plugin author named the plugin package according to the [naming convention](#plugin-types).
1. Run `npm install -g <plugin>` and install the plugin to the global node_modules directory.<br/>
2. Run `amplify plugin scan` so the Amplify CLI plugin platform will pick up the newly added plugin.

- If the plugin author did NOT name the plugin package according to the naming convention outlined above.
1. Run `npm install -g <plugin>` and install the plugin to the global node_modules directory.<br/>
2. Run `amplify plugin add` and provide the path to the plugin to explicitly add the plugin package into the Amplify CLI plugin platform.

## Architecture

The Amplify CLI has a pluggable architecture. The CLI core provides the pluggable platform, and most of the CLI category functions are implemented as plugins.

![Image](~/images/plugin-platform.png)

The Amplify CLI Core maintains a `plugins.json` file to store the plugin management configuration settings and information of all the installed plugins.  <br/>
The Amplify CLI plugins each contains a `amplify-plugin.json` file to manifest itself as a valid plugin.  <br/>
The Amplify CLI Core provides a set of utility commands under `amplify plugin` for plugin management and to facilitate the development of plugins.

The Amplify CLI Core does not dynamically scan for plugins at the beginning of each command execution. Instead, information about the installed plugins are retrieved from the `plugins.json` file and only the plugins that are needed for the execution of the command will be loaded.

The `plugins.json` file is stored at path `<os.homedir>/.amplify/plugins.json`. Unless you really know what you are doing, you should NOT manually edit this file, otherwise you run the risk of corrupting your local installation of the Amplify CLI.

The `plugins.json` file will be created or updated in the following situations:

* If the `plugins.json` file is not found when the Amplify CLI Core tries to access it, the Amplify CLI Core will create this file and scan the local environment for plugins, and then store the information in the file.
* If the last scan time was more than one day (configurable) ago, the Amplify CLI Core will scan again and update the information.
* If inaccuracy is detected, e.g. a specified plugin can not be loaded, the Amplify CLI Core will scan again and update the information.
* After the execution of any of the `amplify plugin` commands that could change it, e.g. `amplify plugin scan`, `amplify plugin add/remove`.

By default, the CLI core searches for plugins in its parent directory, its local `node_modules` directory, and the global `node_modules` directory. Plugins are recognized by the `amplify-` prefix in the package names.

Plugins communicate with the CLI core and with each other through the project metadata. The CLI core provides the read and write access to the project metadata for the plugins. The project metadata is stored in file `amplify/backend/amplify-meta.json` in the user project.

## Plugin types
![Image](~/images/AmplifyCliConcept.jpg)

There are four types of plugins
- category
- provider
- frontend
- util

### Category plugin
Amplify maintained category plugins are recognized by the `amplify-category-` prefix in the package name.<br/>
A category plugin wraps up the logic to create and manage one category of backend resources in the cloud. It defines the "shape" of the cloud resources based on user (the developer) input, constructs parameters to CRUD cloud resource, and exports relevant cloud resource information to the project metadata.

Categories are managed by AWS and are a functional use case that a client engineer is building as part of their UX, rather than service implementations.

### Provider plugin
Amplify maintained provider plugins are recognized by the `amplify-provider-` prefix in the package name.<br/>
A provider plugin abstracts the actual cloud resource provider. It wraps up communication details such as access credentials, api invoke, wait logic, and response data parsing. It also exposes simple interface methods for the category plugins to CRUD cloud resource.

#### AWS CloudFormation provider
Currently, the only official provider plugin, amplify-provider-awscloudformation, uses the AWS CloudFormation to form and update the backend resources in the AWS for the amplify categories. For more information about  AWS CloudFormation, check its user guide:
[AWS CloudFormation User Guide](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/Welcome.html). The `amplify-provider-awscloudformation` uses
[nested stacks](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/using-cfn-nested-stacks.html).

### Frontend plugin
Amplify maintained frontend plugins are recognized by the `amplify-frontend-` prefix in the package name.<br/>
A frontend plugin handles a specific type of frontend projects, such as Javascript, Android or iOS projects. Among other things, it provides the following functionalities:
- Formats the cloud resource information and writes it to a file at the right location so it can be recognized and consumed by the frontend project
- Builds and serves the frontend application locally with backend hot-wired to the cloud resources
- Builds and publishes the application (frontend and backend) to its intended users

### util plugin
Official util plugins are recognized by the `amplify-` prefix, without a plugin type decoration in the package name, a util purpose plugin does not manage any backend resources in the cloud, but provides certain CLI commands and/or certain functionalities for the CLI core, and other plugins.

## Plugin Commands

The following is the suite of the commands under the `amplify plugin`:

* amplify plugin configure
* amplify plugin scan
* amplify plugin add
* amplify plugin remove
* amplify plugin list
* amplify plugin init
* amplify plugin verify
* amplify plugin help

### configure

`amplify plugin configure` is used to configure the following settings in the `plugins.json` file:

* `plugin-directories` : contains the directories that plugin packages are searched for during a plugin scan.
* `plugin-prefixes`: contains the plugin package name prefixes. A package named with such prefix is considered a plugin candidate and checked during a plugin scan. If `plugin-prefixes` is empty, all packages inside the scanned directories will be checked.
* `max-scan-interval-in-seconds` : the Amplify CLI Core will scan again if the last scan time has passed for longer than `max-scan-interval-in-seconds`. Setting this value to 0 will result in fresh scan at the beginning of each Amplify CLI command execution. The default value is 1 day.

### scan

`amplify plugin scan` will start a fresh scan for plugins in the local environment. A configurable set of directories specified in `plugin-directories`, such as the global node_modules, are scanned for plugins.<br/>
Execution of this command will completely update the contents of the `plugins` field in the `plugins.json`.
The `last-scan-time` field in the `plugins.json` is the time stamp of the last plugin scan.
Note that, other than manually started by this command, a plugin scan can also be triggered by a regular amplify command execution, for example if the Amplify CLI Core noticed something is incorrect, or the last scan time has passed for longer than `max-scan-interval-in-seconds`(set to be one day by default).

### add

`amplify plugin add` will prompt you to select a previously removed plugin (see below), or enter the full path of a local package to be added as a plugin into the Amplify CLI. The Amplify CLI Core verifies the existence and validity of the plugin package during execution of the this command. You can use this command to add a plugin that will not be found by the plugin scan process, e.g. if it is not in one of the `plugin-directories`, or its package name does not have the proper prefix as specified in the `plugin-prefixes`.

### remove

`amplify plugin remove` will prompt you with the list of all the currently active plugins, and allow you to select the ones that you do not want to be included in the Amplify CLI. The Amplify CLI Core will remove the manifest of those plugins from the `plugins` field, so they will NOT be counted as active plugins anymore and will NOT be loaded during command executions.<br/>
If a removed plugin is in one of the directories specified in the `plugin-directories`, and its package name has the prefix as specified in the `plugin-prefixes`, it is then inserted in the `excluded` field of the `plugins.json` file. This will not be inserted back to the `plugins` field in the next plugin scan.
The actual plugin packages themselves are not removed from your computer, and they can be added back as active plugins by `amplify plugin add`.

### list

`amplify plugin list` lists all the active plugins, along with other information of the local Amplify CLI plugin platform.

### init

The Amplify CLI provides the command `amplify plugin init` (with alias `amplify plugin new`) for the development of plugins.<br/>
This command first collects the requirements from you and then creates the skeleton of the plugin package for you to start the development.
The newly created plugin package is added to your local Amplify CLI platform, so you can conveniently test its functionalities while it is being developed.
It can be easily removed from the platform with the `amplify plugin remove` command and added back with the `amplify plugin add` command.

### verify

The Amplify CLI provides the utility command `amplify plugin verify` to verify that:

* The package implements the required interface methods for plugins.
* The `commands` field contains all the required commands for the type of the plugin.
`amplify plugin verify` command treats the folder where it is executed as the root directory of the plugin package. The command can be executed manually. Its functionality is also invoked by the `amplify plugin scan` and `amplify plugin add` commands.

### help

Prints out help information for the commands under `amplify plugin`.


## Authoring a CLI Plugin

The Amplify CLI provides the command `amplify plugin init` (with alias `amplify plugin new`) for the development of plugins. This command first collects requirements, and then creates the skeleton of the plugin package for you to start the development. The newly created plugin is added to your local Amplify CLI plugin platform, so you can conveniently test its functionalities while it is being developed. It can be easily removed form the local plugin platform with the `amplify plugin remove` command, and added back with the `amplify plugin add` command.

### Step 1: Install Amplify CLI

```bash
$ npm install -g @aws-amplify/cli

```

### Step 2: Initialize plugin

```bash
$ amplify plugin init
```

You will be prompted to enter the plugin name, then select the plugin type, and event subscriptions. The CLI will then create a plugin package for you and add it to the local Amplify CLI plugin platform.

### Step 3: Test your plugin

The newly created plugin package is already added to the local Amplify CLI, so you can start testing it immediately.
Let's say you have chosen to use the default plugin name: `my-amplify-plugin`

```bash
$ amplify my-amplify-plugin help
help command to be implemented.
```

You will see that the default help message is printed out.
At this point, there are only two sub commands in the plugin package, `help` and `version`, with dummy implementations. If you try to execute any other command, it will trigger the Amplify CLI plugin platform to perform a fresh scan, and then after it failed to find the command, it will print out the default help message.

From here, you can start to develop the plugin package. See below for the detailed explanation of the package structure.

### Step 4: Publish to NPM

After the completion of one development cycle and you are ready to release your plugin to the public, you can publish it to the NPM: [https://docs.npmjs.com/getting-started/publishing-npm-packages](https://docs.npmjs.com/getting-started/publishing-npm-packages)

### Step 5: Install and Use

Once your plugin is published to the NPM, other developers can install and use it

```bash
$ npm install -g my-amplify-plugin
$ amplify plugin add my-amplify-plugin
$ amplify my-amplify-plugin help
```

## Plugin Package Structure

Here's the plugin package directory structure

```md
 |_my-amplify-plugin/
    |_commands/
    |   |_ help.js
    |   |_ version.js
    |
    |_event-handlers
    |   |_handle-PostInit.js
    |   |_handle-PostPush.js
    |   |_handle-PreInit.js
    |   |_handle-PrePush.js
    |
    |_amplify-plugin.json
    |_index.js
    |_package.json
```

### amplify-plugin.json

The `amplify-plugin.json` file is the plugin's manifest file, it specifies the plugin's name, type, commands and event handlers. The Amplify CLI uses it to verify and add the plugin package into its plugin platform.

Here's the contents of the file when it's first generated by the `amplify plugin init` command for a util plugin.

```json
 {
    "name": "my-amplify-plugin",
    "type": "util",
    "commands": [
        "version",
        "help"
    ],
    "eventHandlers": [
        "PreInit",
        "PostInit",
        "PrePush",
        "PostPush"
    ]
}
```

### index.js

The `"main"` file specified in the `package.json` is the Amplify CLI's entry to invoke the plugin's functionalities specified in the manifest file `amplify-plugin.json`.

Here's the contents of the file when it's first generated by the `amplify plugin init` command for a util plugin.

```js
const path = require('path');

async function executeAmplifyCommand(context) {
  const commandsDirPath = path.normalize(path.join(__dirname, 'commands'));
  const commandPath = path.join(commandsDirPath, context.input.command);
  const commandModule = require(commandPath);
  await commandModule.run(context);
}

async function handleAmplifyEvent(context, args) {
  const eventHandlersDirPath = path.normalize(path.join(__dirname, 'event-handlers'));
  const eventHandlerPath = path.join(eventHandlersDirPath, `handle-${args.event}`);
  const eventHandlerModule = require(eventHandlerPath);
  await eventHandlerModule.run(context, args);
}

module.exports = {
  executeAmplifyCommand,
  handleAmplifyEvent,
};
```

### commands

The `commands` folder contains files that implement the `commands` specified in the manifest file `amplify-plugin.json`.

### event-handlers

The `event-handlers` folder contains files that implement the `eventHandlers` specified in the manifest file `amplify-plugin.json`.

## Custom GraphQL Transformers

This section outlines the process of writing custom GraphQL transformers. The `graphql-transform` package serves as a lightweight framework that takes as input a GraphQL SDL document
and a list of **GraphQL Transformers** and returns a cloudformation document that fully implements the data model defined by the input schema. A GraphQL Transformer is a class the defines a directive and a set of functions that manipulate a context and are called whenever that directive is found in an input schema.

For example, the AWS Amplify CLI calls the GraphQL Transform like this:

```js
import GraphQLTransform from 'graphql-transformer-core'
import DynamoDBModelTransformer from 'graphql-dynamodb-transformer'
import ModelConnectionTransformer from 'graphql-connection-transformer'
import ModelAuthTransformer from 'graphql-auth-transformer'
import AppSyncTransformer from 'graphql-appsync-transformer'
import VersionedModelTransformer from 'graphql-versioned-transformer'

// Note: This is not exact as we are omitting the @searchable transformer.
const transformer = new GraphQLTransform({
    transformers: [
        new AppSyncTransformer(),
        new DynamoDBModelTransformer(),
        new ModelAuthTransformer(),
        new ModelConnectionTransformer(),
        new VersionedModelTransformer()
    ]
})
const schema = `
type Post @model {
    id: ID!
    title: String!
    comments: [Comment] @connection(name: "PostComments")
}
type Comment @model {
    id: ID!
    content: String!
    post: Post @connection(name: "PostComments")
}
`
const cfdoc = transformer.transform(schema);
const out = await createStack(cfdoc, name, region)
console.log('Application creation successfully started. It may take a few minutes to finish.')
```

As shown above the `GraphQLTransform` class takes a list of transformers and later is able to transform
GraphQL SDL documents into CloudFormation documents.

### The Transform Lifecycle

At a high level the `GraphQLTransform` takes the input SDL, parses it, and validates the schema
is complete and satisfies the directive definitions. It then iterates through the list of transformers
passed to the transform when it was created and calls `.before()` if it exists. It then walks the parsed AST
and calls the relevant transformer methods (e.g. `object()`, `field()`, `interface()` etc) as directive matches are found.
In reverse order it then calls each transformer's `.after()` method if it exists, and finally returns the context's finished template.

Here is pseudo code for how `const cfdoc = transformer.transform(schema);` works.

```js
function transform(schema: string): Template {

    // ...

    for (const transformer of this.transformers) {
        // Run the before function one time per transformer.
        if (isFunction(transformer.before)) {
            transformer.before(context)
        }
        // Transform each definition in the input document.
        for (const def of context.inputDocument.definitions as TypeDefinitionNode[]) {
            switch (def.kind) {
                case 'ObjectTypeDefinition':
                    this.transformObject(transformer, def, context)
                    // Walk the fields and call field transformers.
                    break
                case 'InterfaceTypeDefinition':
                    this.transformInterface(transformer, def, context)
                    // Walk the fields and call field transformers.
                    break;
                case 'ScalarTypeDefinition':
                    this.transformScalar(transformer, def, context)
                    break;
                case 'UnionTypeDefinition':
                    this.transformUnion(transformer, def, context)
                    break;
                case 'EnumTypeDefinition':
                    this.transformEnum(transformer, def, context)
                    break;
                case 'InputObjectTypeDefinition':
                    this.transformInputObject(transformer, def, context)
                    break;
                // Note: Extension and operation definition nodes are not supported.
                default:
                    continue
            }
        }
    }
    // After is called in the reverse order as if they were popping off a stack.
    let reverseThroughTransformers = this.transformers.length - 1;
    while (reverseThroughTransformers >= 0) {
        const transformer = this.transformers[reverseThroughTransformers]
        if (isFunction(transformer.after)) {
            transformer.after(context)
        }
        reverseThroughTransformers -= 1
    }
    // Return the template.
    // In the future there will likely be a formatter concept here.
    return context.template
}
```

### The Transformer Context

The transformer context serves like an accumulator that is manipulated by transformers. See the code to see what methods are available
to you.

[https://github.com/aws-amplify/amplify-cli/blob/7f0cb11915fa945ad9d518e8f9a8f74378fef5de/packages/graphql-transformer-core/src/TransformerContext.ts](https://github.com/aws-amplify/amplify-cli/blob/7f0cb11915fa945ad9d518e8f9a8f74378fef5de/packages/graphql-transformer-core/src/TransformerContext.ts)

> For now, the transform only support cloudformation and uses a library called `cloudform` to create cloudformation resources in code. In the future we would like to support alternative deployment mechanisms like terraform.

### Example

As an example let's walk through how we implemented the @versioned transformer. The first thing to do is to define a directive for our transformer.

```js
const VERSIONED_DIRECTIVE = `
    directive @versioned(versionField: String = "version", versionInput: String = "expectedVersion") on OBJECT
`
```

Our `@versioned` directive can be applied to `OBJECT` type definitions and automatically adds object versioning and conflict detection to an APIs mutations. For example, we might write

```graphql
# Any mutations that deal with the Post type will ask for an `expectedVersion`
# input that will be checked using DynamoDB condition expressions.
type Post @model @versioned {
    id: ID!
    title: String!
    version: Int!
}
```

> Note: @versioned depends on @model so we must pass `new DynamoDBModelTransformer()` before `new VersionedModelTransformer()`. Also note that `new AppSyncTransformer()` must go first for now. In the future we can add a dependency mechanism and topologically sort it ourselves.

The next step after defining the directive is to implement the transformer's business logic. The `graphql-transformer-core` package makes this a little easier
by exporting a common class through which we may define transformers. Users extend the `Transformer` class and implement the required functions.

```js
export class Transformer {
    before?: (acc: TransformerContext) => void
    after?: (acc: TransformerContext) => void
    object?: (definition: ObjectTypeDefinitionNode, directive: DirectiveNode, acc: TransformerContext) => void
    interface?: (definition: InterfaceTypeDefinitionNode, directive: DirectiveNode, acc: TransformerContext) => void
    field?: (
        parent: ObjectTypeDefinitionNode | InterfaceTypeDefinitionNode,
        definition: FieldDefinitionNode,
        directive: DirectiveNode,
        acc: TransformerContext) => void
    argument?: (definition: InputValueDefinitionNode, directive: DirectiveNode, acc: TransformerContext) => void
    union?: (definition: UnionTypeDefinitionNode, directive: DirectiveNode, acc: TransformerContext) => void
    enum?: (definition: EnumTypeDefinitionNode, directive: DirectiveNode, acc: TransformerContext) => void
    enumValue?: (definition: EnumValueDefinitionNode, directive: DirectiveNode, acc: TransformerContext) => void
    scalar?: (definition: ScalarTypeDefinitionNode, directive: DirectiveNode, acc: TransformerContext) => void
    input?: (definition: InputObjectTypeDefinitionNode, directive: DirectiveNode, acc: TransformerContext) => void
    inputValue?: (definition: InputValueDefinitionNode, directive: DirectiveNode, acc: TransformerContext) => void
}
```

Since our `VERSIONED_DIRECTIVE` only specifies `OBJECT` in its **on** condition, we only **NEED* to implement the `object` function. You may also
implement the `before` and `after` functions which will be called once at the beginning and end respectively of the transformation process.

```js
/**
 * Users extend the Transformer class and implement the relevant functions.
 */
export class VersionedModelTransformer extends Transformer {

    constructor() {
        super(
            'VersionedModelTransformer',
            VERSIONED_DIRECTIVE
        )
    }

    /**
     * When a type is annotated with @versioned enable conflict resolution for the type.
     *
     * Usage:
     *
     * type Post @model @versioned(versionField: "version", versionInput: "expectedVersion") {
     *   id: ID!
     *   title: String
     *   version: Int!
     * }
     *
     * Enabling conflict resolution automatically manages a "version" attribute in
     * the @model type's DynamoDB table and injects a conditional expression into
     * the types mutations that actually perform the conflict resolutions by
     * checking the "version" attribute in the table with the "expectedVersion" passed
     * by the user.
     */
    public object = (def: ObjectTypeDefinitionNode, directive: DirectiveNode, ctx: TransformerContext): void => {
        // @versioned may only be used on types that are also @model
        const modelDirective = def.directives.find((dir) => dir.name.value === 'model')
        if (!modelDirective) {
            throw new InvalidDirectiveError('Types annotated with @versioned must also be annotated with @model.')
        }

        const isArg = (s: string) => (arg: ArgumentNode) => arg.name.value === s
        const getArg = (arg: string, dflt?: any) => {
            const argument = directive.arguments.find(isArg(arg))
            return argument ? valueFromASTUntyped(argument.value) : dflt
        }

        const versionField = getArg('versionField', "version")
        const versionInput = getArg('versionInput', "expectedVersion")
        const typeName = def.name.value

        // Make the necessary changes to the context
        this.augmentCreateMutation(ctx, typeName, versionField, versionInput)
        this.augmentUpdateMutation(ctx, typeName, versionField, versionInput)
        this.augmentDeleteMutation(ctx, typeName, versionField, versionInput)
        this.stripCreateInputVersionedField(ctx, typeName, versionField)
        this.addVersionedInputToDeleteInput(ctx, typeName, versionInput)
        this.addVersionedInputToUpdateInput(ctx, typeName, versionInput)
        this.enforceVersionedFieldOnType(ctx, typeName, versionField)
    }

    // ... Implement the functions that do the real work by calling the context methods.
}
```
## VS Code Extension

Add the [VSCode extension](https://marketplace.visualstudio.com/items?itemName=aws-amplify.aws-amplify-vscode) to get code snippets and automatic code compeletion for Amplify APIs. 

