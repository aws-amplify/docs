The following APIs will allow you to identify text (words, tables, pages from a book) from an image.

## Set up your backend

If you haven't already done so, run `amplify init` inside your project and then `amplify add auth` (we recommend selecting the *default configuration*).

Run `amplify add predictions`, then use the following answers:

```console
? Please select from one of the categories below (Use arrow keys)
❯ Identify
  Convert
  Interpret
  Infer
  Learn More

? What would you like to identify? (Use arrow keys)
❯ Identify Text
  Identify Entities
  Identify Labels

? Provide a friendly name for your resource
  <Enter a friendly name here>

? Would you also like to identify documents? (y/N)
  <Enter 'y'>

? Who should have access? (Use arrow keys)
  Auth users only
❯ Auth and Guest users
```

## Working with the API

### Detect text in an image

Amplify will make calls to both Amazon Textract and Amazon Rekognition depending on the type of text you are looking to identify (i.e. image or document).

Passing in `TextFormatType.PLAIN` as the identify action will yield `IdentifyResult`, which must be cast into `IdentifyTextResult`. See below for an example of plain text detection from an image.

```java
public void detectText(Bitmap image) {
    Amplify.Predictions.identify(
            TextFormatType.PLAIN,
            image,
            result -> {
                IdentifyTextResult identifyResult = (IdentifyTextResult) result;
                Log.i("AmplifyQuickstart", identifyResult.getFullText())
            },
            error -> Log.e("AmplifyQuickstart", error.toString(), error)
    );
}
```

### Detect text in a document

Passing in any other format of `TextFormatType` (i.e. `FORM`, `TABLE` or `ALL`) will yield `IdentifyResult`, which must be cast into `IdentifyDocumentTextResult`. See below for an example with `TextFormatType.FORM` for detecting forms from a document.

```java
public void detectText(Bitmap image) {
    Amplify.Predictions.identify(
            TextFormatType.FORM,
            image,
            result -> {
                IdentifyDocumentTextResult identifyResult = (IdentifyDocumentTextResult) result;
                Log.i("AmplifyQuickstart", identifyResult.getFullText())
            },
            error -> Log.e("AmplifyQuickstart", error.toString(), error)
    );
}
```
