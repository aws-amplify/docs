In this tutorial, you will integrate the different functionality for **Authentication**, **Storage**, and **Analytics**.

The sample-app you downloaded in the previous section already has all UI Widgets implemented in Flutter.  

We will now implement its blank methods to allow it to use the Amplify Flutter SDK To power its functionality.  

## Initializing the Amplify Flutter SDK 
Before using any methods in the Amplify Flutter SDK, it's important to add all necessary plugins and to call configure.  These init methods should only be called once at the root level of your flutter app. 

Within `lib/main.dart` modify the method `_initAmplifyFlutter_` and add the following code: 

```dart
  void _initAmplifyFlutter() async {

    // Add Auth
    AmplifyAuthCognito auth = new AmplifyAuthCognito();
    amplify.addPlugin(authPlugin: [auth]);

    // Add Storage
    AmplifyStorageS3 storage = new AmplifyStorageS3();
    amplify.addPlugin(storagePlugin: [storage]);

    // Add Analytics 
    AmplifyAnalyticsPinpoint analytics = new AmplifyAnalyticsPinpoint();
    amplify.addPlugin(analyticsPlugin: [analytics]);

    // Initialize AmplifyFlutter
    await amplify.configure(amplifyconfig);
    setState(() {
      _isAmplifyConfigured = true;
    });
  }
```

Note that all calls to `addPlugin` are made before `amplify.configure` is called.


## Authentication

### Sign Up 
Within `lib/Views/SignUpView.dart`
modify the method `_signUp` and invoke the following api to initiate a sign up flow. 

This view is displayed for you from the `LandingPage.dart` class.  It prompts the user to enter information to sign up and calls the `_signUp` method when the user confirms. 

```dart
  void _signUp() async {
    Map<String, dynamic> userAttributes = {
      "email": emailController.text,
      "phone_number": phoneController.text,
    };
    try {
      SignUpResult res = await Amplify.Auth.signUp(
        request: SignUpRequest(
            username: usernameController.text.trim(),
            password: passwordController.text.trim(),
            options: CognitoSignUpOptions(userAttributes: userAttributes)),
      );
      Navigator.pop(context, true);
    } on AuthError catch (e) {
      setState(() {
        _signUpError = e.cause;
        _signUpExceptions.clear();
        e.exceptionList.forEach((el) {
          _signUpExceptions.add(el.exception);
        });
      });
    }
  }
```

We use the `CognitoSignUpOptions` object to send additional sign up attributes such as email and phone number that we want to associate with this newly created user. 

Note how we use a try/catch block to be able to gracefully handle any issues with calling the API.  All Auth methods in the Flutter SDK throw "AuthError" when something goes wrong.   

Note the flow of creating a SignUpRequest and receive a SignUpResult.  This basic flow is repeated throughout Auth, in which you send a ---Request and receive a ---Result. 

### Sign In 
Within `lib/Views/SignInView.dart`
modify the method `_signIn` and invoke the following api to initiate a sign in flow. 

```dart
  void _signIn() async {
    try {
      SignInResult res = await Amplify.Auth.signIn(
        request: SignInRequest(
            username: usernameController.text.trim(),
            password: passwordController.text.trim()),
      );

      // On successful signup, close this widget 
      Navigator.pop(context, true);
    } on AuthError catch (e) {
      // Update our "error" state so we can display it in the UI   
      setState(() {
        _signInError = e.cause;
        _signInExceptions.clear();
        e.exceptionList.forEach((el) {
          _signInExceptions.add(el.exception);
        });
      });
    }
  }
```

This code is largely the same as the previous signUp code we added before.  The overall flow is simpler as we just need to send a username and password to Auth. 

### Sign Out 
Within `lib/Views/UserView.dart`
modify the method `_signOut_` and invoke the following api to initiate a sign out flow. 

```dart
  void _signOut() async {
    try {
      SignOutResult res = await Amplify.Auth.signOut();

      Navigator.pushAndRemoveUntil(
          context,
          MaterialPageRoute(builder: (context) => LandingPage()),
          (route) => false);
    } on AuthError catch (e) {
      print(e);
    }
  }
```

### Listening to Auth Hub Events 

**TODO** Waiting for Auth Hub Events to be completed.  

We will use the Auth Hub to listen to changes in user auth status to display the current login status and user id in our app.  



## Storage 

**TODO** Waiting for Storage category to be completed 

## Analytics 

**TODO** Waiting to add Analytics category to be added to sample-app

We will call the following methods: 

```dart
void _recordEvent() async {
    AnalyticsEvent event = AnalyticsEvent("test");

    event.properties.addBoolProperty("boolKey", true);
    event.properties.addDoubleProperty("doubleKey", 10.0);
    event.properties.addIntProperty("intKey", 10);
    event.properties.addStringProperty("stringKey", "stringValue");

    Amplify.Analytics.recordEvent(event: event);
  }

  void _flushEvents() async {
    Amplify.Analytics.flushEvents();
  }
  void _registerGlobalProperties() async {

    print("register global properties: " + _globalProp);

    AnalyticsProperties properties = new AnalyticsProperties();
    properties.addBoolProperty(_globalProp + "_boolKey", true);
    properties.addDoubleProperty(_globalProp + "_doubleKey", 10.0);
    properties.addIntProperty(_globalProp + "_intKey", 10);
    properties.addStringProperty(_globalProp + "_stringKey", "stringValue");

    Amplify.Analytics.registerGlobalProperties(globalProperties: properties);

  }

    void _identifyUser() async {
    AnalyticsUserProfile analyticsUserProfile = new AnalyticsUserProfile();
    analyticsUserProfile.name = _userId + "_name";
    analyticsUserProfile.email = _userId + "_email";
    analyticsUserProfile.plan = _userId + "_plan";

    AnalyticsUserProfileLocation analyticsUserLocation = new AnalyticsUserProfileLocation();
    analyticsUserLocation.latitude = 5;
    analyticsUserLocation.longitude = 5;
    analyticsUserLocation.postalCode = "94070";
    analyticsUserLocation.city = "SanFrancisco";
    analyticsUserLocation.region = "California";
    analyticsUserLocation.country = "USA";

    analyticsUserProfile.location = analyticsUserLocation;


    AnalyticsProperties properties = new AnalyticsProperties();
    properties.addStringProperty(_userId + "_stringKey" , "stringValue");

    analyticsUserProfile.properties = properties;

    Amplify.Analytics.identifyUser(userId: _userId, userProfile: analyticsUserProfile);
  }
  ```