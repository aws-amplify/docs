In this tutorial, you will integrate the different functionality for **Authentication**, **Storage**, and **Analytics**.

The sample-app you downloaded in the previous section already has all UI Widgets implemented in Flutter.  

We will now implement its blank methods to allow it to use the Amplify Flutter Library To power its functionality.  

## Initializing the Amplify Flutter Library 
Before using any methods in the Amplify Flutter Library, it's important to add all necessary plugins and to call configure.  These init methods should only be called once at the root level of your flutter app. 

Within `lib/main.dart` modify the method `_initAmplifyFlutter_` and add the following code: 

```dart
  void _initAmplifyFlutter() async {
    AmplifyAuthCognito auth = new AmplifyAuthCognito();
    AmplifyStorageS3 storage = new AmplifyStorageS3();
    AmplifyAnalyticsPinpointPlugin analytics =
        new AmplifyAnalyticsPinpointPlugin();

    amplify.addPlugin(
        authPlugins: [auth],
        storagePlugins: [storage],
        analyticsPlugins: [analytics]);

    // Initialize AmplifyFlutter
    await amplify.configure(amplifyconfig);
    setState(() {
      _isAmplifyConfigured = true;
    });
  }
```

Note that all calls to `addPlugin` are made before `amplify.configure` is called.


# Authentication

### Sign Up 
Within `lib/Views/SignUpView.dart`
modify the method `_signUp` and invoke the following api to initiate a sign up flow. 

This view is displayed for you from the `LandingPage.dart` class.  It prompts the user to enter information to sign up and calls the `_signUp` method when the user confirms. 

```dart
  void _signIn() async {
    try {
      SignInResult res = await Amplify.Auth.signIn(
          username: usernameController.text.trim(),
          password: passwordController.text.trim());
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

Note how we use a try/catch block to be able to gracefully handle any issues with calling the API.  All Auth methods in the Flutter Library throw "AuthError" when something goes wrong.   

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


# Storage 

### List Files 
Within `lib/Pages/MainPage.dart` 
modify the method `_loadFileKeys_` and invoke the following api to get all file keys. 

We will use the result of this request to update our Widget state to display a list of all files already uploaded in S3. 

```dart 
  void _loadFileKeys() {
    Amplify.Storage.list(
        "/",
        { result ->
          setState(() {
            itemKeys = result
          });
        },
        { error -> Log.e("MyAmplifyApp", "List failure", error) }
    );
  }
```

### Upload Image 
Within `lib/Views/ImageUploader.dart`
modify the method `_uploadImage_` and invoke the following api to upload an image.

```dart
  void _uploadImage(BuildContext context) async {

    File local = await FilePicker.getFile(type: FileType.image);

    Amplify.Storage.uploadFile(
        "ExampleKey",
        exampleFile,
        { result -> Log.i("MyAmplifyApp", "Successfully uploaded: " + result.getKey()) },
        { error -> Log.e("MyAmplifyApp", "Upload failed", error) }
    )
    
    Navigator.pop(context, "fakeItemKey");
  }
```

### Download Image
Within `lib/Views/ImagePreview.dart`
modify the method `_downloadImage_` and invoke the following api to upload an image.

This will be invoked whenever we click on an item in the listView of MainPage.  We will download the image and display it as a popup for the user. 

```dart
  void _downloadImage(String storageKey) {
      Amplify.Storage.downloadFile(
          storageKey,
          File(applicationContext.filesDir.toString() + "/download.png"),
          { result -> Log.i("MyAmplifyApp", "Successfully downloaded: " + result.getFile().name) },
          { error -> Log.e("MyAmplifyApp", "Download Failure", error) }
      )
  }
```

# Analytics 

We'll use Analytics to send a simple event to Pinpoint whenever a file is downloaded from S3. 

### Record Event 

Within `lib/Views/ImagePreview.dart`
modify the method `_downloadImage_` and add this code to the end of the existing function: 

```dart
    AnalyticsEvent event = AnalyticsEvent("image_downloaded");
    event.properties.addStringProperty("file_key", storageKey);
    Amplify.Analytics.recordEvent(event: event);
```

### Recording Global Properties

When we begin to track multiple events, we might want to include a property to be registered on each event.  

Within `lib/main.dart`
modify the method `_initAmplifyFlutter` and add this code to the end of the existing function: 

```dart
    AnalyticsProperties properties = new AnalyticsProperties();
    properties.addStringProperty("platform", "flutter");
    Amplify.Analytics.registerGlobalProperties(globalProperties: properties);
```

We modify this initialization method as we know it's only called once at the beginning.  

