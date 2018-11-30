---
---

# Interactions

AWS Amplify Interactions category enables AI-powered chatbots in your web or mobile apps. You can use *Interactions* to configure your backend chatbot provider and to integrate a chatbot UI into your app with just a single line of code.

Ensure you have [installed and configured the Amplify CLI and library]({%if jekyll.environment == 'production'%}{{site.amplify.docs_baseurl}}{%endif%}/js/start).
{: .callout .callout--info}

**Amazon Lex**

AWS Amplify implements [Amazon Lex](https://aws.amazon.com/lex) as the default chatbots service. Amazon Lex supports creating conversational bots with the same deep learning technologies that power Amazon Alexa.

#### Automated Setup

Run the following command in your project's root folder:

```bash
$ amplify add interactions
```

The CLI will lead you through the steps to specify the chatbot to be created. 

You can choose to start from a sample chatbot or start from scratch.  If you choose to start from scratch, the CLI will prompt you with a series of questions to set the intents and slots for the chatbot. 

You are allowed to run the `amplify add interactions` command multiple times to add multiple chatbots into your project.

{The Interactions category utilizes the Authentication category behind the scenes to authorize your app to send analytics events.}
{: .callout .callout--info}

The `add` command automatically creates a backend configuration locally. To update your backend in the cloud, run:

```bash
$ amplify push
```

Upon successful execution of the push command, a configuration file called `aws-exports.js` will be copied to your configured source directory, for example `./src`. 

##### Configure Your App

Import and load the configuration file in your app. It's recommended you add the Amplify configuration step to your app's root entry point. For example `App.js` in React or `main.ts` in Angular.

```javascript
import Amplify, { Interactions } from 'aws-amplify';
import aws_exports from './aws-exports';

Amplify.configure(aws_exports);
```

Click [HERE](#WorkingWithAPI) for usage in your app

### Manual Setup

#### Create your Chatbot

You can create Amazon Lex chatbox in Amazon Lex console. To create your bot, follow the steps shown in [Amazon Lex Developer Guide](https://docs.aws.amazon.com/lex/latest/dg/getting-started.html).
 
![Interactions]({%if jekyll.environment == 'production'%}{{site.amplify.docs_baseurl}}{%endif%}/js/images/interactions_lex_console_edit_bot.jpg){: class="screencap" style="max-height:600px;"}


With manual setup, you need to provide your auth credentials and bot details to configure your app:

```javascript
import Amplify from 'aws-amplify';

Amplify.configure({
  Auth: {
    identityPoolId: 'us-east-1:xxx-xxx-xxx-xxx-xxx',
    region: 'us-east-1'
  },
  Interactions: {
    bots: {
      "BookTrip": {
        "name": "BookTrip",
        "alias": "$LATEST",
        "region": "us-east-1",
      },
    }
  }
});
```

##<a name="WorkingWithAPI"></a> Working with the Interactions API

You can import *Interactions* module from 'aws-amplify' package to work with the API.

```javascript
import { Interactions } from 'aws-amplify';
```

#### send() Method

You can send a text message to chatbot backend with *send()* command. The method returns a promise that includes the chatbot response.

```javascript
import { Interactions } from 'aws-amplify';

let userInput = "I want to reserve a hotel for tonight";

// Provide a bot name and user input
const response = await Interactions.send("BookTrip", userInput);

// Log chatbot response
console.log (response.message);
```

#### onComplete() Method

You can use *onComplete()* method to register a function to catch errors or chatbot confirmations when the session successfully ends.  

```javascript

var handleComplete = function (err, confirmation) {
    if (err) {
        alert('bot conversation failed')
        return;
    }
    alert('done: ' + JSON.stringify(confirmation, null, 2));

    return 'Trip booked. Thank you! what would you like to do next?';
}

Interactions.onComplete(botName, handleComplete );
```

## Using UI Components

For React and React Native apps, the simplest way to add a conversational UI into your app is to use our *ChatBot* Component.

*ChatBot* automatically renders a complete chat messaging interface that can be used out-of-the-box, or it can be customized using theming support. 

### Using with React

When using React, you can use *ChatBot* with following properties;

```html
<ChatBot
    title="My Bot"
    theme={myTheme}
    botName="BookTrip"
    welcomeMessage="Welcome, how can I help you today?"
    onComplete={this.handleComplete.bind(this)}
    clearOnComplete={true}
    conversationModeOn={false}
/>
```
The `conversationModeOn` props turns voice conversation mode on/off.

If needed, you can also pass `voiceConfig` in the props to modify the silence detection parameters, like in this example:

```jsx
const customVoiceConfig = {
    silenceDetectionConfig: {
        time: 2000,
        amplitude: 0.2
    }   
}

<ChatBot
    ...
    voiceConfig={customVoiceConfig}
/>

```


Following simple app shows how to use **ChatBot** component in a React app, with the automatic setup outlined above;

```javascript
import React, { Component } from 'react';
import Amplify, { Interactions } from 'aws-amplify';
import { ChatBot, AmplifyTheme } from 'aws-amplify-react';
import aws_exports from './aws-exports';

Amplify.configure(aws_exports);

// Imported default theme can be customized by overloading attributes
const myTheme = {
  ...AmplifyTheme,
  sectionHeader: {
    ...AmplifyTheme.sectionHeader,
    backgroundColor: '#ff6600'
  }
};

class App extends Component {

  handleComplete(err, confirmation) {
    if (err) {
      alert('Bot conversation failed')
      return;
    }

    alert('Success: ' + JSON.stringify(confirmation, null, 2));
    return 'Trip booked. Thank you! what would you like to do next?';
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Welcome to ChatBot Demo</h1>
        </header>
        <ChatBot
          title="My Bot"
          theme={myTheme}
          botName="BookTrip"
          welcomeMessage="Welcome, how can I help you today?"
          onComplete={this.handleComplete.bind(this)}
          clearOnComplete={true}
          conversationModeOn={false}
        />
      </div>
    );
  }
}

export default App;
```

### Using with React Native

To support voice interaction, the React Native ChatBot component requires linking Native Modules for the dependencies [react-native-voice](https://github.com/wenkesj/react-native-voice), [react-native-sound](https://github.com/zmxv/react-native-sound), and [react-native-fs](https://github.com/itinance/react-native-fs). Run these commands:

```
react-native link react-native-voice 
react-native link react-native-fs
react-native link react-native-sound
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



When using React Native, you can use *ChatBot* with following properties;

```html
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
    conversationModeOn={false}
/>
```
You can turn voice conversation mode on/off by passing boolean `conversationModeOn` in the props.


Following simple app shows how to use **ChatBot** component in a React Native app;

 ```javascript
import React from 'react';
import { StyleSheet, Text, SafeAreaView, Alert, StatusBar } from 'react-native';
import Amplify from 'aws-amplify';
import { ChatBot } from 'aws-amplify-react-native';

import aws_exports from './aws-exports';

Amplify.configure(aws_exports);

const styles = StyleSheet.create({
  container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
      paddingTop: StatusBar.currentHeight,
  },
});

export default class App extends React.Component {

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
            conversationModeOn={false}
            />
        </SafeAreaView>
        );
    }

}
 ```
 
### Using with Angular and Ionic

Please see [Angular]({%if jekyll.environment == 'production'%}{{site.amplify.docs_baseurl}}{%endif%}/js/angular#interactions) and [Ionic]({%if jekyll.environment == 'production'%}{{site.amplify.docs_baseurl}}{%endif%}/js/ionic#interactions) documentation for Interactions UI components.

### API Reference

For the complete API documentation for Interactions module, visit our [API Reference]({%if jekyll.environment == 'production'%}{{site.amplify.docs_baseurl}}{%endif%}/api/classes/interactions.html)
{: .callout .callout--info}
