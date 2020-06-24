## Use Xcode with Amplify Tools

Open the `amplifyxc.config` in your project and set `push` to `true`. Then build your app with **Product > Build** (`Cmd+b`), and a push will take place.

<amplify-callout>

If Xcode reports build errors like `Undefined symbol: _OBJC_CLASS_$_AWSSignatureV4Signer`, as shown in the screenshot below, clean build folder with **Product > Clean Build Folder** (`Shift+Cmd+K`) and rebuild the project (`Cmd+b`).

![Xcode Build Error](~/images/xcode-build-error.png)

</amplify-callout>

If you do not already have a local AWS profile with credentials (automatically setup with the Amplify CLI) you will be prompted to do this on the first push.

## Use Amplify CLI

```
amplify push
```
