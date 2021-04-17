In this tutorial, you will integrate basic functionality for **Analytics**.

First, delete the contents of your app's *main.dart* file and paste in this starter boilerplate UI code.   

```dart
import 'package:flutter/material.dart';
import 'package:amplify_flutter/amplify.dart';
import 'package:amplify_analytics_pinpoint/amplify_analytics_pinpoint.dart';
import 'package:amplify_auth_cognito/amplify_auth_cognito.dart';
import 'amplifyconfiguration.dart';

void main() {
  runApp(MyApp());
}

class MyApp extends StatefulWidget {
  @override
  _MyAppState createState() => _MyAppState();
}

class _MyAppState extends State<MyApp> {
  bool _amplifyConfigured = false;

  @override
  void initState() {
    super.initState();
    _configureAmplify(); 
  }

  void _configureAmplify() async {
  }

  void _recordEvent() async {
  }

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      home: Scaffold(
          appBar: AppBar(
            title: const Text('Amplify Core example app'),
          ),
          body: ListView(padding: EdgeInsets.all(10.0), children: <Widget>[
            Center( 
              child: Column (
                children: [
                  const Padding(padding: EdgeInsets.all(5.0)),
                  Text(
                    _amplifyConfigured ? 'configured' : 'not configured'
                  ),                  
                  ElevatedButton(
                    onPressed: _amplifyConfigured ? _recordEvent : null,
                    child: const Text('record event')
                  )
                ]
              ),
            )
          ])
      )
    );
  }
}
```


## Initializing the Amplify Flutter Library 
Before using any methods in the Amplify Flutter Library, it's important to add all necessary plugins and to call configure.  These init methods should only be called once at the root level of your flutter app. 

Add the following to your *_configureAmplify* method:

```dart
void _configureAmplify() async {
  if (!mounted) return;

  // Add Pinpoint and Cognito Plugins
  Amplify.addPlugin(AmplifyAnalyticsPinpoint());
  Amplify.addPlugin(AmplifyAuthCognito());

  // Once Plugins are added, configure Amplify
  // Note: Amplify can only be configured once.
  try {
    await Amplify.configure(amplifyconfig);
  } on AmplifyAlreadyConfiguredException {
    print("Amplify was already configured. Was the app restarted?");
  }
  try {
    setState(() {
      _amplifyConfigured = true;
    });
  } catch (e) {
    print(e);
  }

}
```

Note that all calls to `addPlugin()` are made before `Amplify.configure()` is called.

`Amplify.configure()` should only be called once.  Calling it multiple times will result in an exception. 

## Recording a simple event with Analytics 

Now that modules are initialized, modify the *_recordEvent* method to send events to Amazon Pinpoint. 

```dart
// Send an event to Pinpoint
void _recordEvent() async {
  AnalyticsEvent event = AnalyticsEvent('test');
  event.properties.addBoolProperty('boolKey', true);
  event.properties.addDoubleProperty('doubleKey', 10.0);
  event.properties.addIntProperty('intKey', 10);
  event.properties.addStringProperty('stringKey', 'stringValue');
  Amplify.Analytics.recordEvent(event: event);
}
```

At this point you are almost ready to run your app.  In the next section, we will use Amplify CLI to configure your backend AWS resources.

## Using Flutter Hot Reload and Hot Restart

Flutter offers [hot reload and hot restart](https://flutter.dev/docs/development/tools/hot-reload) functionality in order to aid the development process.

A key difference between hot reload and restart is that hot restart destroys the state in dart, while hot reload does not.

Amplify-flutter should automatically re-configure your application and re-wire its plugins upon a hot restart, so there is no additional effort needed on your part.

During **hot reload**, depending on how and when you are calling `Amplify.configure`, you may wish to check whether or not Amplify has already been configured using `Amplify.isConfigured` because it should not be configured more than once.  

To do this, you can use the `Amplify.isConfigured` getter.

<amplify-callout warning>

Note: Handling of hot restart was introduced with amplify-flutter version 0.1.2. If you have upgraded from a previous version, you may need to refresh your Amplify-related Pods in order to successfully leverage hot restart on the iOS platform. You should be able to do this by removing or modifying your `Podfile.lock` file in the `/ios` directory. When you rebuild your project, your Amplify pods should be at version 1.8.1 or above.

</amplify-callout>
