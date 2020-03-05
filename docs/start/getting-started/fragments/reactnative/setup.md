##  Create a new React Native app

To get started, initialize a new React Native project and change into the new directory.

 ###  Using Expo
```sh
$ npm install -g expo-cli  
$ expo init RNAmplify
```

###  Using the React Native CLI

```sh
$ npx react-native init RNAmplify
```

## Initialize a new backend

You are now ready to initialize a new Amplify project. To do so, use the Amplify CLI:

```sh
$ amplify init

? Enter a name for the project: rnamplify
? Enter a name for the environment: demo
? Choose your default editor: <Your favorite text editor>
? Choose the type of app that youre building: javascript
? What javascript framework are you using: react-native
? Source Directory Path:  /
? Distribution Directory Path: /
? Build Command:  npm run-script build
? Start Command: npm run-script start
? Do you want to use an AWS profile? Y
? Please choose the profile you want to use: <Your AWS profile from the configuration step>
```

Once the amplify project has been initialized, you should see the following artifacts in your project:

1. __src/aws-exports.js__ - This file will hold the key value pairs of the resource information for the services created by the CLI.
2. __amplify__ directory - This will hold any back end code you will write for things like GraphQL schemas and serverless functions managed by the AWS services we'll be using.

## Install Amplify dependencies

Next, install the local Amplify dependencies. The directions here will depend on whether you are using Expo or the React Native CLI.

### Expo

With Expo, you only have to install the dependencies and then move on to the next step.

```sh
$ npm install aws-amplify aws-amplify-react-native amazon-cognito-identity-js react-native-vector-icons @react-native-community/netinfo

# or

$ yarn add aws-amplify aws-amplify-react-native amazon-cognito-identity-js react-native-vector-icons @react-native-community/netinfo
```

### React Native

```sh
$ npm install aws-amplify aws-amplify-react-native amazon-cognito-identity-js react-native-vector-icons @react-native-community/netinfo

# or

$ yarn add aws-amplify aws-amplify-react-native amazon-cognito-identity-js react-native-vector-icons @react-native-community/netinfo
```

You will next need to change into the the ios directory and install the pod dependencies:

```sh
$ cd ios
$ pod install
$ cd ../
```

Now open __ios/RNAmpIntr/Info.plist__ and add the following properties:

```
<key>UIAppFonts</key>
<array>
  <string>AntDesign.ttf</string>
  <string>Entypo.ttf</string>
  <string>EvilIcons.ttf</string>
  <string>Feather.ttf</string>
  <string>FontAwesome.ttf</string>
  <string>FontAwesome5_Brands.ttf</string>
  <string>FontAwesome5_Regular.ttf</string>
  <string>FontAwesome5_Solid.ttf</string>
  <string>Foundation.ttf</string>
  <string>Ionicons.ttf</string>
  <string>MaterialIcons.ttf</string>
  <string>MaterialCommunityIcons.ttf</string>
  <string>SimpleLineIcons.ttf</string>
  <string>Octicons.ttf</string>
  <string>Zocial.ttf</string>
</array>
```

Finally, open __android/app/build.gradle__ and add the following line at the top of the file:

```groovy
apply from: "../../node_modules/react-native-vector-icons/fonts.gradle"
```

## Set up frontend

Finally, open __App.js__ (Expo) or __index.js__(React Native CLI) and add the following lines of code at the top of the file below the last import:

```javascript
import Amplify from 'aws-amplify'
import config from './aws-exports'
Amplify.configure(config)
```

Now your project is set up and you can begin adding new features.