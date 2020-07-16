## Set up the backend

IIf you haven't already done so, run `amplify init` inside your project and then `amplify add auth` (we recommend selecting the *default configuration*).

Run `amplify add predictions` and select **Convert**. Then use the following answers:

```console
? What would you like to convert? 
  Convert text into a different language 
  Convert text to speech 
❯ Convert speech to text 
  Learn More 

? Who should have access? Auth and Guest users
```

Now run `amplify push` which will generate your `aws-exports.js` and create resources in the cloud. You can now either add this to your backend or skip and add more features to your app.

Services used: Amazon Transcribe

## Working with the API

You can transcribe a PCM Audio byte buffer to Text, such as a recording from microphone.

```javascript
Predictions.convert({
  transcription: {
    source: {
      bytes
    },
    // language: "en-US", // other options are "en-GB", "fr-FR", "fr-CA", "es-US"
  }
})
.then(({ transcription: { fullText } }) => console.log({ fullText }))
.catch(err => console.log({ err }));
```
