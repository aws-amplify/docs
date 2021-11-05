For React, the simplest way to add a conversational UI into your app is to use our *ChatBot* Component.

ChatBot automatically renders a complete chat messaging interface that can be used out-of-the-box, or it can be customized using theming support. 

## Usage

When using React Native, you can use *ChatBot* with following properties;

```jsx
<ChatBot
    botName={botName}
    welcomeMessage={welcomeMessage}
    onComplete={this.handleComplete}
    clearOnComplete={false}
    styles={StyleSheet.create({
        itemMe: {
            color: 'red'
        }
    })}
/>
```

By default, the ChatBot will allow for only text interaction. You can turn off text interaction by passing prop `textEnabled={false}`.
### Turning on voice interaction
To support voice interaction, the React Native ChatBot component requires installation of peer dependencies and linking of Native Modules. The peer dependencies are: [react-native-voice](https://github.com/wenkesj/react-native-voice), [react-native-sound](https://github.com/zmxv/react-native-sound), and [react-native-fs](https://github.com/itinance/react-native-fs). 

After installation, link the native modules by running:
```
react-native link react-native-voice 
react-native link react-native-fs
react-native link react-native-sound
```

Include this import at the top of your App.js
```jsx
import voiceLibs from 'aws-amplify-react-native/dist/Interactions/ReactNativeModules'
```

Some configurations of Android will require requesting permissions while others will not - please to refer to the [Android docs](https://developer.android.com/training/permissions/requesting.html)

iOS will require permissions for `NSMicrophoneUsageDescription` and `NSSpeechRecognitionUsageDescription`- you can add this snippet to your Info.plist file for iOS:
```xml  
<dict>
  ...
  <key>NSMicrophoneUsageDescription</key>
  <string>Description of why you require the use of the microphone</string>
  <key>NSSpeechRecognitionUsageDescription</key>
  <string>Description of why you require the use of the speech recognition</string>
  ...
</dict>
```
Then, turn on voice interaction by passing `voiceEnabled={true}` with `voiceLibs={voiceLibs}` to Chatbot props. Remember not to disable both voice and text input (don't set both voiceEnabled={false} and textEnabled={false})

In order for voice interaction to work with Amazon Lex, you may have to enable Output voice in the AWS Console. Under the Amazon Lex service, click on your configured Lex chatbot and go to Settings -> General and pick your desired Output voice. Then, click Build. If you have forgotten to enable Output voice, you will get an error like this:
```
ChatBot Error: Invalid Bot Configuration: This bot does not have a Polly voice ID associated with it. For voice interaction with the user, set a voice ID
```

You can also configure `silenceDelay={customTime}` where `customTime` is the silence detection time in milliseconds. The default value is 1000. 

The `conversationModeOn` props turns continuous conversation cycle mode on/off for voice interaction.

Here is an example of a configured ChatBot component with voice enabled and conversation mode turned on
```jsx
<ChatBot
    botName={botName}
    welcomeMessage={welcomeMessage}
    onComplete={this.handleComplete}
    clearOnComplete={false}
    styles={StyleSheet.create({
        itemMe: {
            color: 'red'
        }
    })}
    voiceEnabled={true}
    voiceLibs={voiceLibs}
    conversationModeOn={true}
/>
```

Following simple app shows how to use **ChatBot** component in a React Native app;

 ```javascript
import React, { Component } from 'react';
import { StyleSheet, Text, SafeAreaView, Alert, StatusBar } from 'react-native';
import Amplify from 'aws-amplify';
import { ChatBot } from 'aws-amplify-react-native';

import awsconfig from './aws-exports';

Amplify.configure(awsconfig);

const styles = StyleSheet.create({
  container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
      paddingTop: StatusBar.currentHeight,
  },
});

export default class App extends Component {

    state = {
        botName: 'BookTrip',
        welcomeMessage: 'Welcome, what would you like to do today?',
    };

    constructor(props) {
        super(props);
        this.handleComplete = this.handleComplete.bind(this);
    }

    handleComplete(err, confirmation) {
        if (err) {
        Alert.alert('Error', 'Bot conversation failed', [{ text: 'OK' }]);
        return;
        }

        Alert.alert('Done', JSON.stringify(confirmation, null, 2), [{ text: 'OK' }]);

        this.setState({
        botName: 'BookTrip',
        });

        return 'Trip booked. Thank you! what would you like to do next?';
    }

    render() {
        const { botName, showChatBot, welcomeMessage } = this.state;

        return (
        <SafeAreaView style={styles.container}>
            <ChatBot
            botName={botName}
            welcomeMessage={welcomeMessage}
            onComplete={this.handleComplete}
            clearOnComplete={false}
            styles={StyleSheet.create({
                itemMe: {
                color: 'red'
                }
            })}
            />
        </SafeAreaView>
        );
    }

}
 ```