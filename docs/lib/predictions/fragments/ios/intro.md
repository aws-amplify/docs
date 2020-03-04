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

Predictions is broadly organized into 4 key use cases - Identify, Convert, Interpret, and Infer - which are available in the client API as well as CLI workflows.

* `Identify` will find text (words, tables, pages from a book), entities (faces and/or celebrities) from images. You can also identify real world objects such as chairs, desks, etc. which are referred to as “labels” from images.
* `Convert` allows you to translate text from one source language to a target language. You can also generate speech audio from text input. Lastly, you can take an audio input and transcribe it using a websocket stream.
* `Interpret` allows you to analyze text for language, entities (places, people), key phrases, sentiment (positive, neutral, negative), and syntax (pronouns, verbs, adjectives).
* `Infer` allows you to interact with custom models hosted on Amazon SageMaker via a REST API.
