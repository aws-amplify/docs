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

**Note**: When using custom auth providers, `getLatestAuthToken` must be called before every API call, so it's important to minimize the amount of work this method performs. Consider caching your token in-memory so that it's available synchronously to the plugin, and only refresh it when necessary.

</amplify-callout>
