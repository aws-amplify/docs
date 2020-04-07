## Use Xcode with Ampify Tools

Open the `amplifyxc.config` in your project and set `push` to `true`. Then build your app with **Product > Build** (*CMD+B*), and a push will take place.

If you do not already have a local AWS profile with credentials (automatically setup with the Amplify CLI) you will be prompted to do this on the first push.

## Use Amplify CLI

```
amplify push
```
