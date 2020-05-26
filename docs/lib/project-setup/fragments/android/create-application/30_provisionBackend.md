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
    IntelliJ IDEA
? Choose the type of app that you're building
    android
? Where is your Res directory?
    app/src/main/res
? Do you want to use an AWS profile?
    Yes
? Please choose the profile you want to use
    default
```

Upon successfully running `amplify init`, you should see two newly created files under `./app/src/main/res/raw/`:

  - `amplifyconfiguration.json`, and
  - `awsconfiguration.json`.
 
These two files must be bundled into your application so that the Amplify libraries know how to reach your provisioned backend resources, at runtime.
