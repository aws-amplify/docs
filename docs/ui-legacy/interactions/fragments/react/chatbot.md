For React, the simplest way to add a conversational UI into your app is to use our *ChatBot* Component.

ChatBot automatically renders a complete chat messaging interface that can be used out-of-the-box, or it can be customized using theming support. 

## Usage

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

By default, the ChatBot will allow for only text interaction. You can turn off text interaction by passing prop `textEnabled={false}` or you can turn on voice interaction by passing prop `voiceEnabled={true}`. You should not disable both; this will cause no user inputs to be available. 

Note: In order for voice input to work with Amazon Lex, you may have to enable Output voice in the AWS Console. Under the Amazon Lex service, click on your configured Lex chatbot and go to Settings -> General and pick your desired Output voice. Then, click Build. If you have forgotten to enable Output voice, you will get an error like this:
```
ChatBot Error: Invalid Bot Configuration: This bot does not have a Polly voice ID associated with it. For voice interaction with the user, set a voice ID
```

The `conversationModeOn` props turns continuous conversation cycle mode on/off for voice interaction. In continuous conversation mode, the user will only have to click the microphone button once to complete a chatbot conversation. This means that the component will detect when the user is done speaking to stop recording, and then send data to interactions provider, and then start recording again when a response is received from the interactions provider. The cycle will stop when the conversation is finished. 

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

## Sample React app

Following simple app shows how to use **ChatBot** component in a React app, with the automatic setup outlined above;

```javascript
import React, { Component } from 'react';
import Amplify, { Interactions } from 'aws-amplify';
import { ChatBot, AmplifyTheme } from 'aws-amplify-react';
import awsconfig from './aws-exports';

Amplify.configure(awsconfig);

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