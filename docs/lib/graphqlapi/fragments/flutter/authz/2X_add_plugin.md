Then, include it, along with any other auth providers, in the call to `addPlugin`.

```dart
await Amplify.addPlugin(AmplifyAPI(
    authProviders: const [
        CustomOIDCProvider(),
        CustomFunctionProvider(),
    ],
));
```

<amplify-callout warning>

**Note**: When using custom auth providers, `getLatestAuthToken` must be called before every API call. It's important to minimize the amount of work this method performs to ensure efficient API calls. If you're using a platform channel to retrieve your token, for example, consider caching it in-memory, so that it's available synchronously to the plugin.

</amplify-callout>
