To start provisioning resources in the backend, change directories to your project directory and run `amplify init`:

```bash
amplify init
```

Enter the following when prompted:

```console
? Enter a name for the environment (dev)
    MyAmplifyApp
? Choose your default editor:
    IntelliJ IDEA
? Do you want to use an AWS profile?
    Yes
? Please choose the profile you want to use
    default
```

The Amplify CLI had initialized your project in the cloud, created an `amplify` directory, and placed a `amplifyconfiguration.json` in the `./app/src/main/res/raw/` directory to connect your application with its new backend.