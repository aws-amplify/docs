---
title: Plugins & Extensions
---
{% if jekyll.environment == 'production' %}
  {% assign base_dir = site.amplify.docs_baseurl %}
{% endif %}
{% assign media_base = base_dir | append: page.dir | append: "images" %}
# Plugins

## List of existing 3rd party CLI Plugins

* [amplify-category-video](https://www.npmjs.com/package/amplify-category-video)
* [amplify-category-docs](https://www.npmjs.com/package/amplify-category-docs)

## Authoring a CLI Plugin

Plugins enable you to add additional commands and functionality to existing Amplify CLI. 
This tutorial goes through the steps needed to create a utility plugin like the <a href="https://github.com/aws-amplify/amplify-cli/tree/master/packages/amplify-codegen" target="_blank">`amplify-codegen`</a> plugin.

### Step 1: Install Amplify CLI

```bash
$ npm install -g @aws-amplify/cli

```
### Step 2: Create the basic plugin structure

Let's create a utility plugin having add/update/remove commands. It'll be called `amplify-utility`.

NOTE: This is the naming scheme we recommend for amplify-powered plugins -- put the name of your CLI, a dash, and then the name of your plugin. We support this naming scheme right out of the box.

```bash
$ mkdir amplify-utility
$ cd amplify-utility
$ npm init
```

At this point, go through npm's init. It doesn't matter too much what you put here. I just hit enter on everything.

Lastly, add a `commands` and an `extensions` folder.

```bash
$ mkdir commands extensions
```

### Step 3: Create a command

We're going to make a command that we'll invoke with `amplify utility add` which will display the log statement `Adding Amplify utility` but should ideally consist of the entire walk through or the business logic for that command

```bash
$ mkdir commands/utility
$ touch commands/utility/add.js
```

Open this file, and put the following:

 ```js
// context would have all the relevant amplify CLI info/metadata/helper functions that are needed by the plugins
module.exports = {
  name: 'add',
  run: async (context) => {
    console.log('Adding Amplify utility');
  });
}
```

   
### Step 4: Create an extension

While the above is a simple command, if the logic started getting more complex, we'd probably want to move it into an extension. Let's do that here.

In `extensions`, create a new file called `customprint-extension.js`:

```bash
$ touch extensions/customprint-extension.js
```

Edit this file like so:

```js
module.exports = context => {
  context.printMyInfo = async () => {
    context.print.info(`My custom print statement`)
  }
}
```

This adds a new property to gluegun's awesome `context` object, called `printMyInfo`, which is a function that returns the info we need. Since all extensions are loaded automatically during the CLI runtime, it's available in our command, so let's use it in `commands/utility/add.js`:


```js
// context would have all the relevant amplify CLI info/metadata/helper functions that are needed by the plugins
module.exports = {
  name: 'add',
  run: async (context) => {
    console.log('Adding Amplify utility');
    context.printMyInfo();
  });
}

```

Here's how the plugin/package directory structure should look like at the end
 ```
 |_amplify-utility/
  |_package.json
  |_commands/
    |_utility/
      |_ add.js
      |_ update.js
      |_ remove.js
    |_extensions
      |_customprint-extension.js
      
 ```
 
### Step 5: Test your plugin

Go to the root of your plugin/package and run the following commands

```bash
$ npm install -g
$ amplify utility add
Adding Amplify utility
My custom print statement

```

### Step 6: Publish to NPM

You can learn how to publish an NPM package here: [https://docs.npmjs.com/getting-started/publishing-npm-packages](https://docs.npmjs.com/getting-started/publishing-npm-packages)

Once it's published, anyone can add your new plugin to their system and the Amplify CLI would pickup

```bash
$ npm install -g amplify-utility
```

## Custom GraphQL Transformers

This section outlines the process of writing custom GraphQL transformers. The `graphql-transform` package serves as a lightweight framework that takes as input a GraphQL SDL document
and a list of **GraphQL Transformers** and returns a cloudformation document that fully implements the data model defined by the input schema. A GraphQL Transformer is a class the defines a directive and a set of functions that manipulate a context and are called whenever that directive is found in an input schema.

For example, the AWS Amplify CLI calls the GraphQL Transform like this:

```javascript
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

```javascript
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

```javascript
const VERSIONED_DIRECTIVE = `
    directive @versioned(versionField: String = "version", versionInput: String = "expectedVersion") on OBJECT
`
```

Our `@versioned` directive can be applied to `OBJECT` type definitions and automatically adds object versioning and conflict detection to an APIs mutations. For example, we might write

```
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
by exporting a common class through which we may define transformers. User's extend the `Transformer` class and implement the required functions.

```javascript
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

```javascript
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

## [VS Code Extension](https://marketplace.visualstudio.com/items?itemName=aws-amplify.aws-amplify-vscode)

