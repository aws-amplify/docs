To start provisioning resources in the backend, change directories to your project directory and run `amplify init`:
```bash
cd ~/Developer/MyAmplifyApp/
amplify init
```

Enter the following when prompted:
```console
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

Upon successfully running `amplify init`, you should see two new created files in your project directory: `amplifyconfiguration.json` and `awsconfiguration.json`.  These two files must be manually added to your project so that they are bundled with your application.  This is required so that Amplify libraries know how to reach your provisioned backend resources.
