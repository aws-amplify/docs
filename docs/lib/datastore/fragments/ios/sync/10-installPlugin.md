### Add the API plugin

The cloud synchronization uses the [API category](~/lib/graphqlapi/getting-started.md) behind the scenes. Therefore the first step is to configure the API plugin.

Make sure you have the following plugin dependency in your `Podfile`.

```ruby
pod 'AmplifyPlugins/AWSAPIPlugin'
```

Then add the plugin in your Amplify initialization code alongside with the previously added `AWSDataStorePlugin`.

```swift
try Amplify.add(plugin: AWSAPIPlugin())
```
