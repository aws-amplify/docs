<br />

**Note**
Amplify iOS is in preview mode and not intended for production usage at this time. We welcome feedback to improve your experience in using Amplify iOS.
{: .callout .callout--warning}

# Predictions

The Predictions category for iOS provides a solution to use machine learning in your apps without any prior machine learning expertise. The Predictions library come with built-in support for both online and offline scenarios. The online usage is powered by Amazon services such as [Amazon Translate](https://docs.aws.amazon.com/translate/latest/dg/what-is.html), [Amazon Polly](https://docs.aws.amazon.com/polly/latest/dg/what-is.html), [Amazon Transcribe](https://docs.aws.amazon.com/transcribe/latest/dg/what-is-transcribe.html), [Amazon Rekognition](https://docs.aws.amazon.com/rekognition/latest/dg/what-is.html), [Amazon Textract](https://docs.aws.amazon.com/textract/latest/dg/what-is.html), and [Amazon Comprehend](https://docs.aws.amazon.com/comprehend/latest/dg/what-is.html) along with Apple's CoreML [Vision Framework](https://developer.apple.com/documentation/vision). The offline usage is supported through Apple's CoreML Vision framework. With the CoreML Vision framework, we are able to support both offline and online use cases with automatic switching between the two unless indicated otherwise. In addition to providing automatic network support per device, we also provide a union of both the cloud models as well as the offline models to provide you the most accurate results for each of the use cases Apple's CoreML Vision Framework supports. An asterisk below indicates the use case is supported by CoreML and a merged accurate result will be returned if the device is online. Some supported use cases include:

* Translating text from one language to another
* Converting text to speech
* Text recognition from image *
* Entities recognition *
* Label real world objects *
* Interpretation of text *
* Uploading images for automatic training
* Transcribing text

Additionally Predictions supports generic invocation of SageMaker Inference API from a native (iOS/Android) application.

## Set up your backend

**Prerequisites:**
* An iOS project targeting at least iOS 13.0
* Install and configure the Amplify CLI

```terminal
$ npm install -g @aws-amplify/cli
$ amplify configure
```

### Automated Configuration

The Amplify CLI helps you to create the appropriate IAM permissions to hit the AWS machine learning APIs. As part of the automated setup, the CLI helps you provision resources that leverage AWS AI/ML services. In addition to those services, we also support offline functionality and improved responses between online/offline models provided by Apple's CoreML [Vision Framework](https://developer.apple.com/documentation/vision).

To create a project with the Predictions category, run the following command:

1. Run `amplify init` command as shown:

```terminal
$ amplify init
? Enter a name for the project AmplifyPredictions
? Enter a name for the environment dev
? Choose your default editor: Visual Studio Code
? Choose the type of app that you're building ios
? Do you want to use an AWS profile? Yes
? Please choose the profile you want to use default
```

2. Add auth `amplify add auth` and choose `Default configuration`, allow users to sign in with `Email` and do not configure `advanced settings`

3. Add predictions `amplify add predictions`
    * choose `Convert (translate text, text to speech), Identify (labels, text, celebs, etc.), or Interpret (language characteristics, sentiment, etc)`
    * Who should have access: `Auth and guest users`

4. Run `amplify push`to create the resources in the cloud.

When your backend is successfully updated, add `amplifyconfiguration.json` and `awsconfiguration.json` to your project using Xcode. Your new configuration file `awsconfiguration.json` will contain your default project `region` value as well as any necessary configuration options for each predictions method (i.e. target language and source language for translate, etc)


### Manual Configuration

If you have already created the resources in the cloud and would like to take advantage of those existing resources but still use the Amplify library in swift, please follow the directions below:

Create the file `amplifyconfiguration.json`
```
touch amplifyconfiguration.json
```

Copy the contents over and update the values for the specific predictions method you are looking to use
```
{
    "UserAgent": "aws-amplify-cli/2.0",
    "Version": "1.0",
    "Storage": {
        "plugins": {
            "awsPredictionsPlugin": {
                "defaultRegion": "us-west-2",
                 "identify": {
                    "identifyText": {
                        "format": "ALL",
                        "region": "us-west-2",
                        "defaultNetworkPolicy": "auto"
                    },
                    "identifyEntities": {
                        "maxEntities": "0",
                        "celebrityDetectionEnabled": "true",
                        "region": "us-west-2",
                        "defaultNetworkPolicy": "auto"
                    },
                    "identifyLabels": {
                        "region": "us-west-2",
                        "type": "LABELS",
                        "defaultNetworkPolicy": "auto"
                    }
                },
                "convert": {
                    "translateText": {
                        "targetLang": "zh",
                        "sourceLang": "en",
                        "region": "us-west-2",
                        "defaultNetworkPolicy": "auto"
                    },
                    "speechGenerator": {
                        "voice": "Salli",
                        "language": "en-US",
                        "region": "us-west-2",
                        "defaultNetworkPolicy": "auto"
                    }
                },
                "interpret": {
                    "interpretText": {
                        "region": "us-west-2",
                        "defaultNetworkPolicy": "auto"
                    }
                }
            }
        }
    }
}
```
Add both the `amplifyconfiguration.json` and the `awsconfiguration.json` to your project using Xcode.

## Connect to Your Backend

Use the following steps to add file storage backend services to your app.

Add the dependencies to the `Podfile`:

```ruby
target :'YOUR-APP-NAME' do
	use_frameworks!
	pod 'AWSPredictionsPlugin'
	pod 'AWSMobileClient', '~> 2.12.0'
end
```

Run `pod install --repo-update` before you continue.

Add the following code to your AppDelegate:

```swift
import Amplify
import AWSMobileClient
import AmplifyPlugins

// Inside  AppDelegate's application method
func application(_ application: UIApplication, didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey: Any]?) -> Bool {
	// Override point for customization after application launch.
	AWSMobileClient.default().initialize { (userState, error) in
		guard error == nil else {
			print("Error initializing AWSMobileClient. Error: \(error!.localizedDescription)")
			return
		}
		guard let userState = userState else {
			print("userState is unexpectedly empty initializing AWSMobileClient")
			return
		}

		print("AWSMobileClient initialized, userstate: \(userState)")
	}

	let predictionsPlugin = AWSPredictionsPlugin()
	try! Amplify.add(plugin: predictionsPlugin)
	try! Amplify.configure()
	print("Amplify initialized")

	window = UIWindow()
	window?.rootViewController  = MainTabBarController()
	return true
}
```

## Use cases

Predictions is broadly organized into 4 key use cases - Identify, Convert, Interpret, and Infer - which are available in the client API as well as CLI workflows.

* `Identify` will find text (words, tables, pages from a book), entities (faces and/or celebrities) from images. You can also identify real world objects such as chairs, desks, etc. which are referred to as “labels” from images.
* `Convert` allows you to translate text from one source language to a target language. You can also generate speech audio from text input. Lastly, you can take an audio input and transcribe it using a websocket stream.
* `Interpret` allows you to analyze text for language, entities (places, people), key phrases, sentiment (positive, neutral, negative), and syntax (pronouns, verbs, adjectives).
* `Infer` allows you to interact with custom models hosted on Amazon SageMaker via a REST API.

### Identify Labels

If you haven't already done so, run `amplify init` inside your project and then `amplify add auth` (we recommend selecting the *default configuration*).

Run `amplify add predictions` and select **Identify**. Then use the following answers:

```terminal
? What would you like to identify? 
  Identify Text
  Identify Entities
❯ Identify Labels
  Learn More 

? Would you like use the default configuration? (Use arrow keys)
❯ Default Configuration
  Advanced Configuration

? Who should have access? Auth and Guest users
```

The Advanced Configuration will allow you to select moderation for unsafe content or all of the identified labels. Default uses both.

You can identify labels in your app using the following code sample:

```swift
func detectLabels(_ image:URL) {
	//for offline calls only to coreml models replace options in the call below with the below instantiation of it
	// let options = PredictionsIdentifyRequest.Options(defaultNetworkPolicy: .offline, pluginOptions: nil)
	_ = Amplify.Predictions.identify(type: .detectLabels(.labels), image: image, options: PredictionsIdentifyRequest.Options(), listener: { (event) in

		switch event {
		case .completed(let result):
			let data = result as! IdentifyLabelsResult
			print(data.labels)
			//use the labels in your app as you like or display them
		case .failed(let error):
			print(error)
		default:
			print("")
		}
	})
}

//to identify labels with unsafe content
	func detectLabels(_ image:URL) {
	_ = Amplify.Predictions.identify(type: .detectLabels(.all), image: image, options: PredictionsIdentifyRequest.Options(), listener: { (event) in

		switch event {
		case .completed(let result):
			let data = result as! IdentifyLabelsResult
			print(data.labels)
			//use the labels in your app as you like or display them
		case .failed(let error):
			print(error)
		default:
			print("")
		}
	})
}
```

### Identify Celebrities

``` swift
func detectCelebs(_ image: URL) {
	_ = Amplify.Predictions.identify(type: .detectCelebrity, image: image, options: PredictionsIdentifyRequest.Options(), listener: { (event) in
		switch event {
		case .completed(let result):
			let data = result as! IdentifyCelebritiesResult
			self.celebName = data.celebrities[0].metadata.name
			print(result)
		case .failed(let error):
			print(error)
		default:
			print("")
		}
	})
}
```

### Identify Entities

If you haven't already done so, run `amplify init` inside your project and then `amplify add auth` (we recommend selecting the *default configuration*).

Run `amplify add predictions` and select **Identify**. Then use the following answers:

```terminal
? What would you like to identify? 
  Identify Text
❯ Identify Entities
  Identify Labels
  Learn More 

? Would you like use the default configuration? Default Configuration

? Who should have access? Auth and Guest users
```

In order to match entities from a pre-created [Amazon Rekognition Collection](https://docs.aws.amazon.com/rekognition/latest/dg/collections.html), make sure there is a `collectionId` set in your `amplifyconfiguration.json` file. If there is no `collectionId` set in the `amplifyconfiguration.json` file, then this call will just detect entities in general with facial features, landmarks, etc. Bounding boxes for entities are returned as ratios so make sure if you would like to place the bounding box of your entity on an image that you multiple the x by the width of the image, the y by the width of the image, and both height and width ratios by the image's respective height and width.

You can identify entities in your app using the following code sample:

``` swift
func detectEntities(_ image: URL) {
	_ = Amplify.Predictions.identify(type: .detectEntities, image: image, options: PredictionsIdentifyRequest.Options(), listener: { (event) in
		switch event {
		case .completed(let result):
			let data = result as! IdentifyEntityMatchesResult
			print(data.entities)
		case .failed(let error):
			print(error)
		default:
			print("")
		}
	})
}
```
If you would like to only detect entities and you do not have a collection of existing entities to match entities to, the call will be similar but the result is mapped to `IdentifyEntitiesResult` instead of the `IdentifyEntityMatchesResult`.

``` swift
func detectEntities(_ image: URL) {
	_ = Amplify.Predictions.identify(type: .detectEntities, image: image, options: PredictionsIdentifyRequest.Options(), listener: { (event) in
		switch event {
		case .completed(let result):
			let data = result as! IdentifyEntitiesResult
			print(data.entities)
		case .failed(let error):
			print(error)
		default:
			print("")
		}
	})
}
```

### Detecting Text in an Image

If you haven't already done so, run `amplify init` inside your project and then `amplify add auth` (we recommend selecting the *default configuration*).

Run `amplify add predictions` and select **Identify**. Then use the following answers:

```terminal
? What would you like to identify? (Use arrow keys)
❯ Identify Text
  Identify Entities
  Identify Labels
  Learn More 

? Would you also like to identify documents? Yes
? Who should have access? Auth and Guest users
```

Amplify will make calls to both Amazon Textract and Rekognition depending on the type of text you are looking to identify (i.e. image or document). If you are detecting text from an image you would send in `.plain` as your text format as shown below. Similarly, you can obtain `.offline` functionality or get combined results with AWS services for better results with the `.plain` text format selected. Bounding boxes for text are returned as ratios so make sure if you would like to place your bounding box on an image that you multiple the x by the width of the image, the y by the width of the image, and both height and width ratios by the image's respective height and width. Additionally, because Rekognition places (0,0) at the top left and CoreML places (0,0) at the bottom left, we have flipped the y axis of the CoreML bounding box for you since iOS starts (0,0) from the top left.

``` swift
func detectText(_ image: URL) {
	_ = Amplify.Predictions.identify(type: .detectText(.plain), image: image, options: PredictionsIdentifyRequest.Options(), listener: { (event) in
		switch event {
		case .completed(let result):
			let data = result as! IdentifyTextResult
			print(data)
		case .failed(let error):
			print(error)
		default:
			print("")
		}
	})
}
```

### Detecting Text in a Document
Sending in `.form` or `.table` or `.all` will do document analysis as well as text detection to detect tables and forms in a document. See below for an example with `.form`.

```swift
func detectText(_ image: URL) {
	_ = Amplify.Predictions.identify(type: .detectText(.form), image: image, options: PredictionsIdentifyRequest.Options(), listener: { (event) in
		switch event {
		case .completed(let result):
			let data = result as! IdentifyDocumentTextResult
			print(data)
		case .failed(let error):
			print(error)
		default:
			print("")
		}
	})
}
```

### Convert Text to Speech

If you haven't already done so, run `amplify init` inside your project and then `amplify add auth` (we recommend selecting the *default configuration*).

Run `amplify add predictions` and select **Convert**. Then use the following answers:

```terminal
? What would you like to convert?
  Convert text into a different language
❯ Convert text to speech
  Convert speech to text
  Learn More

? Who should have access? Auth and Guest users
```

Here is an example of converting text to speech. In order to override any choices you made while adding this resource using the Amplify CLI, you can pass in a voice in the options object as shown below.

```swift
func textToSpeech(text: String) {
	let options = PredictionsTextToSpeechRequest.Options(voiceType: .englishFemaleIvy, pluginOptions: nil)

	_ = Amplify.Predictions.convert(textToSpeech: text, options: options, listener: { (event) in

		switch event {
		case .completed(let result):
			print(result.audioData)
			self.audioData = result.audioData
			let player = try? AVAudioPlayer(data: result.audioData)
			player?.play()
		default:
			print("")

		}
	})
}
```

### Convert - Translate Text

If you haven't already done so, run `amplify init` inside your project and then `amplify add auth` (we recommend selecting the *default configuration*).

Run `amplify add predictions` and select **Convert**. Then use the following answers:

```terminal
? What would you like to convert? (Use arrow keys)
❯ Convert text into a different language
  Convert text to speech
  Convert speech to text
  Learn More

? Who should have access? Auth and Guest users
```

Here is an example of translating text. In order to override any choices you made in regards to target or source languages while adding this resource using the Amplify CLI, you can pass in them in directly as parameters as shown below.

```swift
func translateText(text:String) {
	_ = Amplify.Predictions.convert(textToTranslate: text,
                language: .english,
                targetLanguage: .italian,
                options: PredictionsTranslateTextRequest.Options(),
						listener: { (event) in
							switch event {
								case .completed(let result):
										print(result.text)
								default:
										print("")
								}
						})
	}
```

### Interpret

This will allow you to determine key phrases, sentiment, language, syntax, and entities from text. If you haven't already done so, run `amplify init` inside your project and then `amplify add auth` (we recommend selecting the *default configuration*).

Run `amplify add predictions` and select **Interpret**. Then use the following answers:

```terminal
? What would you like to interpret? (Use arrow keys)
❯ Interpret Text
  Learn More

? What kind of interpretation would you like?
  Language
  Entity
  Keyphrase
  Sentiment
  Syntax
❯ All

? Who should have access? Auth and Guest users
```

Here is an example of sending text for interpretation such as sentiment analysis or natural language characteristics. 

```swift
func interpret(text: String) {

	_ = Amplify.Predictions.interpret(text: text, options: PredictionsInterpretRequest.Options(), listener: { (event) in

			switch event {
			case .completed(let result):
			    print(result)
			case .failed(let error):
			    print(error)
			default:
			break
		}
		})
}
```

## Escape Hatch

For any of the AWS services behind predictions, you can use the SDK object to get access to any methods we are not calling on your behalf by using the Escape Hatch like so:

```swift
let rekognitionService = Amplify.Predictions.getEscapeHatch(key: .rekognition) as! AWSRekognition
let request = rekognitionService.AWSRekognitionCreateCollectionRequest()
rekognitionService.createCollection(request)
```

