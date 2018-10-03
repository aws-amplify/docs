# Write your own Amplify CLI Plugin Tutorial

Plugins enable you to add additional commands and functionality to existing Amplify CLI. 
The Amplify CLI is using [Gluegun](https://infinitered.github.io/gluegun/) by Infinitered as the CLI framework which supports a [plugin based architecture](https://infinitered.github.io/gluegun/#/tutorial-making-a-plugin).
This tutorial goes through the steps needed to create a utility plugin like the [`amplify-codegen` ](https://github.com/aws-amplify/amplify-cli/tree/master/packages/amplify-codegen) plugin.

# Steps to create an Amplify CLI Plugin

## Step 1: Amplify CLI

  
```bash
$ npm install -g @aws-amplify/cli

```
## Step 2: Create the basic plugin structure

Let's create a utility plugin having add/update/remove commands. It'll be called `amplify-utility`.

NOTE: This is the naming scheme we recommend for amplify-powered plugins -- put the name of your CLI, a dash, and then the name of your plugin. We support this naming scheme right out of the box.

```bash
$ mkdir amplify-myplugin
$ cd amplify-myplugin
$ npm init
```

At this point, go through npm's init. It doesn't matter too much what you put here. I just hit enter on everything.

Lastly, add a `commands` and an `extensions` folder.

```bash
$ mkdir commands extensions
```

## Step 3: Create a command

We're going to make a command that we'll invoke with `amplify utility add` which will display the log statement `Adding Amplify utility` but should ideally consist of the entire walkthrough or the business logic for that command

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
  - Here's how the plugin/package directory structure should look like
   ```
   |_amplify-utility/
    |_package.json
    |_commands/
      |_utility/
        |_ add.js
        |_ update.js
        |_ remove.js  
   ```
   Note: The commands directory can have multiple command files with the above-mentioned structure
   
## Step 4: Create an extension

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
## Step 5: Test your plugin

Go to the root of your plugin/package and run the following commands

```bash
$ npm install -g
$ amplify utility add
Adding Amplify utility
My custom print statement

```

## Step 6: Publish to NPM

You can learn how to publish an NPM package here: [https://docs.npmjs.com/getting-started/publishing-npm-packages](https://docs.npmjs.com/getting-started/publishing-npm-packages)

Once it's published, anyone can add your new plugin to their system and the Amplify CLI would pickup

```bash
$ npm install -g amplify-utility
```
