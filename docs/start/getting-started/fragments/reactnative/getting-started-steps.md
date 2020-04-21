### Expo

With Expo, you only have to install the dependencies and then move on to the next step - [__Integrate with the front end__](#integrate-with-the-front-end).

```sh
npm install aws-amplify aws-amplify-react-native @react-native-community/netinfo
```

### React Native CLI

If you've created the project using the React Native CLI, install these dependencies:

```sh
npm install aws-amplify aws-amplify-react-native amazon-cognito-identity-js react-native-vector-icons @react-native-community/netinfo
```

You will next need to change into the the ios directory and install the pod dependencies:

```sh
cd ios
pod install
cd ../
```

Now open __ios/RNAmpIntr/Info.plist__ and add the following properties:

```xml
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