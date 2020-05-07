### Step 4: Provision the backend with Amplify CLI
To start provisioning resources in the backend, go to your project directory and run the `amplify init`.  For example:
```
$ cd ~/Developer/MyAmplifyApp/
$ amplify init
```

Enter the following when prompted:
```
? Enter a name for the project
    MyAmplifyApp
? Enter a name for the environment
    dev
? Choose your default editor:
    Visual Studio Code
? Choose the type of app that you're building
    ios
? Do you want to use an AWS profile?
    Yes
? Please choose the profile you want to use
    default
```

Upon successfully running `amplify init`, you should now see two new created files in your project directory: `amplifyconfiguration.json` and `awsconfiguration.json`.  These two files need to be manually added to your project so that they are bundled with your application.  This is required so that Amplify libraries know how to reach your provisioned backend resources.

To add these configuration files to your project, **open finder within your project** and **drag both `amplifyconfiguration.json` and `awsconfiguration.json` to the Xcode window**, under your project's folder as seen in this screenshot:

![GSA](~/images/getting-started-amplify/50_1_dragDrop.png)

* Enable **Copy items if needed** if not already enabled
* For “Added folders”, have **Create groups** selected.
* For “Add to targets”, make sure the app target (**MyAmplifyApp**) is checked.

Click **Finish** to add these files to your project as shown in this screenshot:

![GSA](~/images/getting-started-amplify/50_2_addFiles.png)

Now when you build (CMD+ b) and run (CMD + r) your application, you should not see any errors on the console.