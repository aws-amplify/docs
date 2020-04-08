The Predictions category for iOS enables you to integrate machine learning in your application without any prior machine learning experience. The Predictions category comes with built-in support for both online and offline use cases. The online use case is powered by Amazon services including, but not limited to: [Amazon Translate](https://docs.aws.amazon.com/translate/latest/dg/what-is.html), [Amazon Polly](https://docs.aws.amazon.com/polly/latest/dg/what-is.html), [Amazon Transcribe](https://docs.aws.amazon.com/transcribe/latest/dg/what-is-transcribe.html), [Amazon Rekognition](https://docs.aws.amazon.com/rekognition/latest/dg/what-is.html), [Amazon Textract](https://docs.aws.amazon.com/textract/latest/dg/what-is.html), and [Amazon Comprehend](https://docs.aws.amazon.com/comprehend/latest/dg/what-is.html) along with Apple's CoreML [Vision Framework](https://developer.apple.com/documentation/vision). The offline use case is supported through Apple's Core ML Vision framework. With the Apple Core ML Vision framework, we are able to support both offline and online use cases with automatic switching between the two unless indicated otherwise. In addition to automatic switching, we also provide the union of both the cloud models as well as the offline models to provide you the most accurate results.

Below are a list of use cases we support. The ones denoted with an asterisk indicate that they are augmented by CoreML and a unioned result will be returned if the device can successfully communicate with Amazon's services. 

* Translating text from one language to another
* Converting text to speech
* Text recognition from image *
* Entities recognition *
* Label real world objects *
* Interpretation of text *
* Uploading images for automatic training
* Transcribing text

Additionally Predictions supports generic invocation of SageMaker Inference API from a native (iOS/Android) application.

Predictions is broadly organized into 4 key use cases - Identify, Convert, Interpret, and Infer - which are available in the client API as well as CLI workflows.

* `Identify` will find text (words, tables, pages from a book), entities (faces and/or celebrities) from images. You can also identify real world objects such as chairs, desks, etc. which are referred to as “labels” from images.
* `Convert` allows you to translate text from one source language to a target language. You can also generate speech audio from text input. Lastly, you can take an audio input and transcribe it using a websocket stream.
* `Interpret` allows you to analyze text for language, entities (places, people), key phrases, sentiment (positive, neutral, negative), and syntax (pronouns, verbs, adjectives).
* `Infer` allows you to interact with custom models hosted on Amazon SageMaker via a REST API.
