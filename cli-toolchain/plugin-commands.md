## Amplify Plugin Platform
In the new Amplify CLI plugin platform, plugins are explicitly managed. <br/>
The Amplify CLI Core maintains a `plugins.json` file to store the plugin management configuration settings and information of all the installed plugins.  <br/>
The Amplify CLI plugins each contains a *amplify-plugin.json*  file to manifest itself as a valid plugin.  <br/>
The Amplify CLI Core provides a set of utility commands under `amplify plugin` for plugin management, and to facilitate the development of plugins.

The Amplify CLI Core does not dynamically scan for plugins at the beginning of each command execution. Instead, information about the installed plugins are retrieved from the *plugins.json* file, and only the plugins that are needed for the execution of the command will be loaded. 

The `plugins.json` file is stored at path `<os.homedir>/.amplify/plugins.json`. Unless you really know what you are doing, you should NOT manually edit this file, otherwise you run the risk of corrupting your local installation of the Amplify CLI. 

The `plugins.json` file will be created or updated in the following situations: 

* If the `plugins.json` file is not found when the Amplify CLI Core tries to access it, the Amplify CLI Core will create this file and scan the local environment for plugins, and then store the information in the file.
* If  the last scan time was more than one day (configurable) ago, the Amplify CLI Core will scan again and update the information. 
* If inaccuracy is detected, e.g. a specified plugin can not be loaded, the Amplify CLI Core will scan again and update the information. 
* After the execution of any of the `amplify plugin` commands that could change it, e.g. `amplify plugin scan`, `amplify plugin add/remove`, etc..

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

### Amplify plugin configure
`amplify plugin configure` is used to configure these settings in the `plugins.json` file: <br/>
* `plugin-directories` : contains the directories that plugin packages are searched during a plugin scan. 
* `plugin-prefixes`: contains the plugin package name prefixes. A package named with such prefix is considered a plugin candidate and checked during a plugin scan. If `plugin-prefixes` is empty, all packages inside the scanned directories will be checked. 
* `max-scan-interval-in-seconds` : the Amplify CLI Core will scan again if the last scan time has passed for longer than `max-scan-interval-in-seconds`. Setting this value to 0 will result in fresh scan at the beginning of each Amplify CLI command execution.

### Amplify plugin scan
`amplify plugin scan` will start a fresh scan for plugins in the local environment. A configurable set of directories specified in `plugin-directories`, such as the global node_modules, are scanned for plugins.<br/>
Execution of this command will completely update the contents of the `plugins` field. 
The `last-scan-time` field in the `plugins.json` is the timestamp of the last plugin scan.
The `plugins` field in the `plugins.json` contains the result of the last scan, the plugin manifest (the `.amplifyplugin.json` file) is copied over for all the verified plugin.<br/>
Note that a plugin scan can also be triggered by a regular amplify command execution, for example if the Amplify CLI Core noticed something is incorrect, or the last scan time has passed for longer than `max-scan-interval-in-seconds`(set to be one day by default). 

### Amplify plugin add
`amplify plugin add` will prompt you to select a previously removed plugins (see below), or enter the full path of a package to be added as a plugin into the Amplify CLI. The Amplify CLI Core verifies the existence and validity of the plugin package in the execution of the this command. You can use this command to add a plugin that will not be found by the plugin scan process, e.g. if it is not in one of the `plugin-directories`, or its package name does not have the proper prefix as specified in the `plugin-prefixes`.

### Amplify plugin remove
`amplify plugin remove` will prompt you with the list of all the currently active plugins, and allow you to select the ones that you do not want to be included in the Amplify CLI. The Amplify CLI Core will remove the manifest of those plugins from the `plugins` field, so they will NOT be counted as active plugins anymore and will NOT be loaded during command executions.<br/>
If a removed plugin is in one of the directories specified in the `plugin-directories`, and its package name has the prefix as specified in the `plugin-prefixes`, it is then inserted in the to the `excluded` field in the `plugins.json` file, so it will not be inserted back to the `plugins` field in the next plugin scan. 
The actual plugin packages themselves are not removed from your computer, and they can be added back as active plugins by `amplify plugin add`.

### Amplify plugin list
`amplify plugin list` lists all the active plugins, along with other information of the local Amplify CLI plugin platform. 

### Amplify plugin init
The Amplify CLI provides the utility command `amplify plugin init` (and its alias `amplify plugin new`) for the development of the plugin modules.<br/>
This command prompts you with a bunch of questions, and creates the skeleton of a plugin package for you to furthur develope. You can optionally add this new plugin package into the local Amplify CLI platform, so you can test it during devleopment.
 
### Amplify plugin verify
The Amplify CLI provides the utility command `amplify plugin verify` to verify that
* The package implements the required interface methods for plugins
* The `commands` field contains all the required commands for the type of the plugin
`amplify plugin verify` treats the folder where it is executed as the root directory of the plugin package.
`amplify plugin verify` can be executed manually, and its functionality is also also invoked by the `amplify plugin scan` and `amplify plugin add` commands.


### Amplify plugin help
Prints out help information for the commands under `amplify plugin`.
 
