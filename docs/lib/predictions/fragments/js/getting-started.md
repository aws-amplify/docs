> Prerequisite: [Install and configure the Amplify CLI](~/cli/start/install.md)

## Create new backend

Run the following command in your project's root folder:

```bash
amplify add predictions
```

The CLI will prompt configuration options for the Predictions category such as what type of use case you have (identifying objects from an image, translating text, etc) and default or advanced settings.

The Predictions category utilizes the Auth category behind the scenes to authorize your app to perform AI/ML actions.

The `add` command automatically creates the backend configuration. Once all your configuration is complete run the following:

```bash
amplify push
```

A configuration file called `aws-exports.js` will be copied to your configured source directory, for example `./src`.

## Configure the frontend

Import and load the configuration file in your app. It's recommended you add the Amplify configuration step to your app's root entry point. For example `App.js` in React or `main.ts` in Angular or Ionic.

```javascript
import Amplify from 'aws-amplify';
import Predictions, { AmazonAIPredictionsProvider } from '@aws-amplify/predictions';
import awsconfig from './aws-exports';

Amplify.configure(awsconfig);
Amplify.addPluggable(new AmazonAIPredictionsProvider());
```

## Import existing backend

The manual setup enables you to use your existing Amazon AI and ML resources in your app.

```javascript
import Amplify from 'aws-amplify';

Amplify.configure({
    // To get the AWS Credentials, you need to configure 
    // the Auth module with your Cognito Federated Identity Pool
    "Auth": {
        "identityPoolId": "us-east-1:xxx-xxx-xxx-xxx-xxx",
        "region": "us-east-1"
    },
    "predictions": {
        "convert": {
            "translateText": {
                "region": "us-east-1",
                "proxy": false,
                "defaults": {
                    "sourceLanguage": "en",
                    "targetLanguage": "zh"
                }
            },
            "speechGenerator": {
                "region": "us-east-1",
                "proxy": false,
                "defaults": {
                    "VoiceId": "Ivy",
                    "LanguageCode": "en-US"
                }
            },
            "transcription": {
                "region": "us-east-1",
                "proxy": false,
                "defaults": {
                    "language": "en-US"
                }
            }
        },
        "identify": {
            "identifyText": {
                "proxy": false,
                "region": "us-east-1",
                "defaults": {
                    "format": "PLAIN"
                }
            },
            "identifyEntities": {
                "proxy": false,
                "region": "us-east-1",
                "celebrityDetectionEnabled": true,
                "defaults": {
                    "collectionId": "identifyEntities8b89c648-test",
                    "maxEntities": 50
                }
            },
            "identifyLabels": {
                "proxy": false,
                "region": "us-east-1",
                "defaults": {
                    "type": "LABELS"
                }
            }
        },
        "interpret": {
            "interpretText": {
                "region": "us-east-1",
                "proxy": false,
                "defaults": {
                    "type": "ALL"
                }
            }
        }
    }
});
```

### IAM Policy

The Amplify CLI will set appropriate IAM policy for Roles in your Cognito Identity Pool in order to use an appropriate feature. If you are using the library manually you will need to configure this yourself. The below policy demonstrates setting policy for all services in the Predictions category:

```json
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Effect": "Allow",
            "Action": [
                "translate:TranslateText",
                "polly:SynthesizeSpeech",
                "transcribe:StartStreamTranscriptionWebSocket",
                "comprehend:DetectSentiment",
                "comprehend:DetectEntities",
                "comprehend:DetectDominantLanguage",
                "comprehend:DetectSyntax",
                "comprehend:DetectKeyPhrases",
                "rekognition:DetectFaces",
                "rekognition:RecognizeCelebrities"
                "rekognition:DetectLabels",
                "rekognition:DetectModerationLabels",
                "rekognition:DetectText",
                "rekognition:DetectLabel",
                "textract:AnalyzeDocument",
                "textract:DetectDocumentText",
                "textract:GetDocumentAnalysis",
                "textract:StartDocumentAnalysis",
                "textract:StartDocumentTextDetection",
                "rekognition:SearchFacesByImage"
            ],
            "Resource": [
                "*"
            ]
        }
    ]
}
```

For `rekognition:SearchFacesByImage` you can scope the Resource down to an individual collection such as `arn:aws:rekognition:<REGION>:<ACCOUNT_ID>:collection/<COLLECTION_ID>`. Amplify CLI automatically does this.
