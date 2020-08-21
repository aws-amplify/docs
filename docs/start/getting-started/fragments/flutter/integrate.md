In this tutorial, you will integrate basic functionality for **Analytics**.

First, delete the contents of your app's *main.dart* file and paste in this starter boilerplate UI code.   

```dart
import 'package:amplify_auth_cognito/amplify_auth_cognito.dart';
import 'package:flutter/material.dart';
import 'package:amplify_core/amplify_core.dart';
import 'package:amplify_analytics_pinpoint/amplify_analytics_pinpoint.dart';
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

  // Instantiate Amplify
  Amplify amplifyInstance = Amplify();

  @override
  void initState() {
    super.initState();
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
                  RaisedButton(
                    onPressed: _amplifyConfigured ? null : _configureAmplify,
                    child: const Text('configure Amplify')
                  ),
                  RaisedButton(
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
  AmplifyAnalyticsPinpoint analyticsPlugin = AmplifyAnalyticsPinpoint();
  AmplifyAuthCognito authPlugin = AmplifyAuthCognito();
  amplifyInstance.addPlugin(authPlugins: [authPlugin]);
  amplifyInstance.addPlugin(analyticsPlugins: [analyticsPlugin]);

  // Once Plugins are added, configure Amplify
  await amplifyInstance.configure(amplifyconfig);
  try {
    setState(() {
      _amplifyConfigured = true;
    });
  } catch (e) {
    print(e);
  }

}
```

Note that all calls to `addPlugin` are made before `amplify.configure` is called.

## Recording a simple event with Analytics 

Now that modules are initialized, modify the *_recordEvent* method to send events to Amazon Pinpoint. 

```dart
// Send an event to Pinpoint
void _recordEvent() async {
  AnalyticsEvent event = AnalyticsEvent("test");
  event.properties.addBoolProperty("boolKey", true);
  event.properties.addDoubleProperty("doubleKey", 10.0);
  event.properties.addIntProperty("intKey", 10);
  event.properties.addStringProperty("stringKey", "stringValue");
  Amplify.Analytics.recordEvent(event: event);
}
```

At this point you are almost ready to run your app.  In the next section, we will use Amplify CLI to configure your backend AWS resources.