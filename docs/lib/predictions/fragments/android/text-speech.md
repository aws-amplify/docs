## Set up the backend

If you haven't already done so, run `amplify init` inside your project and then `amplify add auth` (we recommend selecting the *default configuration*).

Run `amplify add predictions`, then use the following answers:

```console
? Please select from one of the categories below
  Identify
❯ Convert
  Interpret
  Infer
  Learn More

? What would you like to convert? (Use arrow keys)
  Translate text into a different language
❯ Generate speech audio from text
  Transcribe text from audio

? Provide a friendly name for your resource
  <Enter a friendly name here>

? What is the source language? (Use arrow keys)
  <Select your default source language>

? Select a speaker (Use arrow keys)
  <Select your default speaker voice>

? Who should have access? (Use arrow keys)
  Auth users only
❯ Auth and Guest users
```

Run `amplify push` to create the resources in the cloud

## Working with the API

Here is an example of converting text to speech. In order to override any choices you made while adding this resource using the Amplify CLI, you can pass in a voice in the options object as shown below.

```java
private final MediaPlayer mp = new MediaPlayer();

// MediaPlayer does not support InputStream as its directly data source.
// Write to a file to obtain its file descriptor.
private void playAudio(InputStream data) {
    File mp3File = new File(getCacheDir(), "audio.mp3");
    try (OutputStream out = new FileOutputStream(mp3File)) {
        byte[] buffer = new byte[8 * 1_024];
        int bytesRead;
        while ((bytesRead = data.read(buffer)) != -1) {
            out.write(buffer, 0, bytesRead);
        }
        mp.reset();
        mp.setOnPreparedListener(MediaPlayer::start);
        mp.setDataSource(new FileInputStream(mp3File).getFD());
        mp.prepareAsync();
    } catch (IOException error) {
        Log.e("PredictionsQuickstart", "Error writing audio file.");
    }
}

public void textToSpeech(String text) {
    Amplify.Predictions.convertTextToSpeech(
            text,
            result -> playAudio(result.getAudioData()),
            error -> Log.e("PredictionsQuickstart", error.toString(), error)
    );
}
```
As a result of running this code, you will hear audio of the text being emitted from your device.

**Note**: Android API 23 added support for [`MediaDataSource`](https://developer.android.com/reference/android/media/MediaDataSource), which allows for `InputStream` from Amplify to be read directly without writing to a file.
