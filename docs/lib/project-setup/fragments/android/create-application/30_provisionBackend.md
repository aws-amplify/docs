To start provisioning resources in the backend, change directories to your project directory and run `amplify init`:

```bash
amplify init
```

Enter the following when prompted:

```console
? Enter a name for the environment
    `dev`
? Choose your default editor:
    `IntelliJ IDEA`
? Do you want to use an AWS profile?
    `Yes`
? Please choose the profile you want to use
    `default`
```

Upon successfully running `amplify init`, you will see a configuration file created in `./app/src/main/res/raw/` called `amplifyconfiguration.json`.
 
This file will be bundled into your application so that the Amplify libraries know how to reach your provisioned backend resources at runtime.