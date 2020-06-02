To add these configuration files to your project, **open finder within your project** and **drag both `amplifyconfiguration.json` and `awsconfiguration.json` to the Xcode window**, under your project's folder as seen in this screenshot:

![GSA](~/images/project-setup/50_1_dragDrop.png)

* Enable **Copy items if needed** if not already enabled
* For “Added folders”, have **Create groups** selected.
* For “Add to targets”, make sure the app target (**MyAmplifyApp**) is checked.

Click **Finish** to add these files to your project as shown in this screenshot:

![GSA](~/images/project-setup/50_2_addFiles.png)

Now when you build (`Cmd+b`) and run (`Cmd+r`) your application, you should not see any errors on the console.

<amplify-callout>

If Xcode reports build errors like `Undefined symbol: _OBJC_CLASS_$_AWSSignatureV4Signer`, as shown in the screenshot below, clean build folder with **Product > Clean Build Folder** (`Shift+Cmd+K`) and rebuild the project (`Cmd+b`).

![Xcode Build Error](~/images/xcode-build-error.png)

</amplify-callout>
