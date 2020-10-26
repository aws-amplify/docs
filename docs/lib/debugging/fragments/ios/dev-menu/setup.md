In your project, drag and drop the file `./amplify/.config/local-env-info.json` to xcode. This file contains environment information that will be displayed on the developer menu.

<amplify-callout warning>

If you do not see the `amplify` directory, please follow the [project setup instructions](https://docs.amplify.aws/lib/project-setup/prereq/q/platform/ios).

</amplify-callout>

To be able to activate the developer menu when running a debug build of your app, add the following line of code before calling `Amplify.configure()`:

```
Amplify.enableDevMenu(contextProvider: obj1)
```

where `obj1` is an object that implements `DevMenuPresentationContextProvider`.