# Write your own Amplify CLI Plugin Tutorial

Plugins enable you to add additional commands and functionality to existing Amplify CLI. 
The Amplify CLI is using [Gluegun](https://infinitered.github.io/gluegun/) by Infinitered as the CLI framework which supports a [plugin based architecture](https://infinitered.github.io/gluegun/#/tutorial-making-a-plugin).
This tutorial goes through the steps needed to create a utility plugin like the [`amplify-codegen` ](https://github.com/aws-amplify/amplify-cli/tree/master/packages/amplify-codegen) plugin.

# Steps to create an Amplify CLI Plugin

  - If you don't already have the Amplify CLI installed, run `npm install -g @aws-amplify/cli` 
  - `mkdir amplify-myplugin` (for plugins to work, the directory/package should have directory name syntax like amplify-*)
  - Create a `package.json` file inside amplify-myplugin/ directory
  -  Fill out the `package.json` file with the information below along with any dependencies
  ```
  {
    "name": "amplify-myplugin",
    "version": "0.1.0",
    "description": "amplify myplugin",
    "license": "whatever"
  }
  ```
  - mkdir commands/ inside amplify-myplugin/
  - create a file inside amplify/myplugin/commands/ - `myplugin.js`
  - Fill in the `myplugin.js` file with the collowing code
  ```js
  
// Context would have all the relevant amplify CLI info/metadata/helper functions that are needed by the plugins
module.exports = {
        name: 'myplugin',
        run: async (context) => {
        // All the logic for your CLI command should go in here
        console.log('Welcome to my plugin!!');
 },
}
  ```
  - Here's how the plugin/package directory structure should look like
   ```
   |_amplify-myplugin/
    |_package.json
    |_commands/
      |_myplugin.js
   ```
   Note: The commands directory can have multiple command files with the above-mentioned structure
 - Run `npm install -g` from the root of our plugin to make it available for the Amplify CLI to pick up
 - To test the plugin command run `amplify myplugin`
 - The expected output on the terminal should be -> `Welcome to my plugin!!`
