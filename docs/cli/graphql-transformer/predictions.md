---
title: Connect machine learning services
description: The @predictions directive allows you to query an orchestration of AI/ML services such as Amazon Rekognition, Amazon Translate, and/or Amazon Polly.
---

## @predictions

The `@predictions` directive allows you to query an orchestration of AI/ML services such as Amazon Rekognition, Amazon Translate, and/or Amazon Polly.

> Note: Support for adding the `@predictions` directive uses the s3 storage bucket which is configured via the CLI. At the moment this directive works only with objects located within `public/`.

### Definition

The supported actions in this directive are included in the definition.

```graphql
  directive @predictions(actions: [PredictionsActions!]!) on FIELD_DEFINITION
  enum PredictionsActions {
    identifyText # uses Amazon Rekognition to detect text
    identifyLabels # uses Amazon Rekognition to detect labels
    convertTextToSpeech # uses Amazon Polly in a lambda to output a presigned url to synthesized speech
    translateText # uses Amazon Translate to translate text from source to target language
  }
```

### Usage


Given the following schema a query operation is defined which will do the following with the provided image.

- Identify text from the image
- Translate the text from that image
- Synthesize speech from the translated text.

```graphql
type Query {
  speakTranslatedImageText: String @predictions(actions: [
    identifyText
    translateText
    convertTextToSpeech
  ])
}
```

An example of that query will look like:

```graphql
query SpeakTranslatedImageText($input: SpeakTranslatedImageTextInput!) {
  speakTranslatedImageText(input: {
    identifyText: {
      key: "myimage.jpg"
    }
    translateText: {
      sourceLanguage: "en"
      targetLanguage: "es"
    }
    convertTextToSpeech: {
      voiceID: "Conchita"
    }
  })
}
```

A code example of this using the JS Library:
```js
import React, { useState } from 'react';
import Amplify, { Storage, API, graphqlOperation } from 'aws-amplify';
import awsconfig from './aws-exports';
import { speakTranslatedImageText } from './graphql/queries';

/* Configure Exports */
Amplify.configure(awsconfig);

function SpeakTranslatedImage() {
  const [ src, setSrc ] = useState("");
  const [ img, setImg ] = useState("");

  function putS3Image(event) {
    const file = event.target.files[0];
    Storage.put(file.name, file)
    .then (async (result) => {
      setSrc(await speakTranslatedImageTextOP(result.key))
      setImg(await Storage.get(result.key));
    })
    .catch(err => console.log(err));
  }

  return (
    <div className="Text">
      <div>
        <h3>Upload Image</h3>
        <input
              type = "file" accept='image/jpeg'
              onChange = {(event) => {
                putS3Image(event)
              }}
          />
        <br />
        { img && <img src = {img}></img>}
        { src &&
          <div> <audio id="audioPlayback" controls>
              <source id="audioSource" type="audio/mp3" src = {src}/>
          </audio> </div>
        }
      </div>
    </div>
  );
}

async function speakTranslatedImageTextOP(key) {
  const inputObj = {
    translateText: {
      sourceLanguage: "en", targetLanguage: "es" },
    identifyText: { key },
    convertTextToSpeech: { voiceID: "Conchita" }
  };
  const response = await API.graphql(
    graphqlOperation(speakTranslatedImageText, { input: inputObj }));
  return response.data.speakTranslatedImageText;
}
function App() {
  return (
    <div className="App">
        <h1>Speak Translated Image</h1>
        < SpeakTranslatedImage />
    </div>
  );
}
export default App;
```

### How it works
From example schema above, `@predictions` will create resources to communicate with Amazon Rekognition, Translate and Polly.
For each action the following is created:

- IAM Policy for each service (e.g. Amazon Rekognition `detectText` Policy)
- An AppSync VTL function
- An AppSync DataSource

Finally a resolver is created for `speakTranslatedImageText` which is a pipeline resolver composed of AppSync functions which are defined by the action list provided in the directive.

### Actions
Each of the actions described in the @predictions definition section can be used individually, as well as in a sequence. Sequence of actions supported today are as follows:

- `identifyText -> translateText -> convertTextToSpeech`
- `identifyLabels -> translateText -> convertTextToSpeech`
- `translateText -> convertTextToSpeech`


### Action resources
- [`translateText` Supported Language Codes](https://docs.aws.amazon.com/translate/latest/dg/what-is.html#what-is-languages)
- [`convertTextToSpeech` Supported Voice IDs](https://docs.aws.amazon.com/polly/latest/dg/voicelist.html)
