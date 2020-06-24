Once you have the social provider configured, run the following in your project’s root folder:

```bash
amplify add auth     ## "amplify update auth" if already configured
```

Select Default configuration with Social Provider (Federation):

```console
Do you want to use the default authentication and security configuration? 
  Default configuration 
❯ Default configuration with Social Provider (Federation) 
  Manual configuration 
  I want to learn more.
```

<amplify-callout>

For *Sign in Redirect URI(s)* inputs, you can put one URI for local development and one for production. Example: `http://localhost:3000/` in dev and `https://www.example.com/` in production. The same is true for *Sign out redirect URI(s)*.

</amplify-callout>

For React Native applications, You need to define a custom URL scheme for your application before testing locally or publishing to the app store. This is different for Expo or vanilla React Native. Follow the steps at the [React Native Linking docs](https://facebook.github.io/react-native/docs/linking) or [Expo Linking docs](https://docs.expo.io/versions/latest/workflow/linking/) for more information. After completing those steps, assuming you are using "myapp" as the name of your URL Scheme (or whatever friendly name you have chosen), you will use these URLs as *Sign in Redirect URI(s)* and/or *Sign out redirect URI(s)* inputs. Your URIs could look like any of these:

- `myapp://`
- `exp://127.0.0.1:19000/--/` (Local development if your app is running [in the Expo client](https://docs.expo.io/versions/latest/workflow/linking/#linking-to-your-app)).