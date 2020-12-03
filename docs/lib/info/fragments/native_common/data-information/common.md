Apple requires app developers to provide the data usage policy of the app when they submit their app to the App Store. Below are the different categories identified by Apple and the corresponding data type used by the Amplify library.

## Contact info 

|Data Type|Legacy SDK|Amplify Category	|Purpose	|Linked To Identity	|Tracking 	|Provided by developer	|
|-------|-----|----|----|----|----|----|
|Name	|	|	|	|	|	|	|
|	|AWSMobileClient	|Auth	|App Functionality	|Y	|N	|Y	|
|	|AWSCognitoAuth	|Auth	|App Functionality	|Y	|N	|Y	|
|	|AWSCognitoIdentityProvider	|Auth	|App Functionality	|Y	|N	|Y	|
|	|AWSConnect	|NA	|App Functionality	|Y	|N	|Y	|
|Email Address	|	|	|	|	|	|	|
|	|AWSMobileClient	|Auth	|App Functionality	|Y	|N	|Y	|
|	|AWSCognitoAuth	|Auth	|App Functionality	|Y	|N	|Y	|
|	|AWSCognitoIdentityProvider	|Auth	|App Functionality	|Y	|N	|Y	|
|	|AWSConnect	|NA	|App Functionality	|Y	|N	|Y	|
|Phone Number	|	|	|	|	|	|	|
|	|AWSMobileClient	|Auth	|App Functionality	|Y	|N	|Y	|
|	|AWSCognitoAuth	|Auth	|App Functionality	|Y	|N	|Y	|
|	|AWSCognitoIdentityProvider	|Auth	|App Functionality	|Y	|N	|Y	|
|	|AWSConnect	|NA	|App Functionality	|Y	|N	|Y	|


## User Content							

|Data Type	|Legacy SDK	|Amplify Category	|Purpose	|Linked To Identity	|Tracking	|Provided by developer	|
|-------|-----|----|----|----|----|----|
|Photos or Videos	|	|	|	|	|	|	|
|	|AWSS3	|Storage	|App Functionality	|N	|N	|Y	|
|	|AWSRekognition	|Prediction	|App Functionality	|N	|N	|Y	|
|	|AWSTextract	|Prediction	|App Functionality	|N	|N	|Y	|
|	|AWSTranslate	|Prediction	|App Functionality	|N	|N	|Y	|
|Audio Data	|	|	|	|	|	|	|
|	|AWSTranscribe	|Prediction	|App Functionality	|N	|N	|Y	|
|	|AWSTranscribeStreaming	|Prediction	|App Functionality	|N	|N	|Y	|

## Identifiers
|Data Type	|Legacy SDK	|Amplify Category	|Purpose	|Linked To Identity	|Tracking	|Provided by developer	|
|-------|-----|----|----|----|----|----|
|User ID	|	|	|	|	|	|	|
|	|AWSMobileClient	|Auth	|App Functionality	|Y	|N	|N	|
|	|AWSCognitoAuth	|Auth	|App Functionality	|Y	|N	|N	|
|	|AWSCognitoIdentityProvider	|Auth	|App Functionality	|Y	|N	|N	|
|	|AWSCognitoIdentity	|Auth	|App Functionality	|Y	|N	|N	|
|	|AWSCore	|Auth	|App Functionality	|Y	|N	|N	|
|	|AWSConnect	|NA	|App Functionality	|Y	|N	|N	|
|	|AWSConnectParticipant	|NA	|App Functionality	|Y	|N	|N	|
|	|AWSSTS	|NA	|App Functionality	|Y	|N	|N	|
|	|AWSLex	|NA	|App Functionality	|Y	|N	|N	|
|	|AWSPinpoint	|Analytics	|Analytics	|Y	|Y	|N	|
|Device ID	|	|	|	|	|	|	|
|	|AWSMobileClient	|Auth	|App Functionality	|Y	|N	|N	|
|	|AWSCognitoAuth	|Auth	|App Functionality	|Y	|N	|N	|
|	|AWSCognitoIdentityProvider	|Auth	|App Functionality	|Y	|N	|N	|
|	|AWSPinpoint	|Analytics	|Analytics	|Y	|Y	|N	|


## Other Data
|Data Type	|Legacy SDK	|Amplify Category	|Purpose	|Linked To Identity	|Tracking	|Provided by developer	|
|-------|-----|----|----|----|----|----|
|OS Version	|	|	|	|	|	|	|
|	|AWSCore	|All category	|Analytics	|N	|Y	|N	|
|OS Name	|	|	|	|	|	|	|
|	|AWSCore	|All category	|Analytics	|N	|Y	|N	|
|Locale Info	|	|	|	|	|	|	|
|	|AWSCore	|All category	|Analytics	|N	|Y	|N	|
|	|	|	|	|	|	|	|
|App Version	|	|	|	|	|	|	|
|	|AWSMobileClient	|Auth	|App Functionality	|Y	|N	|N	|
|	|AWSCognitoAuth	|Auth	|App Functionality	|Y	|N	|N	|
|	|AWSCognitoIdentityProvider	|Auth	|App Functionality	|Y	|N	|N	|
|Min OS target of the app	|	|	|	|	|	|	|
|	|AWSMobileClient	|Auth	|App Functionality	|Y	|N	|N	|
|	|AWSCognitoAuth	|Auth	|App Functionality	|Y	|N	|N	|
|	|AWSCognitoIdentityProvider	|Auth	|App Functionality	|Y	|N	|N	|
|Timezone information	|	|	|	|	|	|	|
|	|AWSMobileClient	|Auth	|App Functionality	|Y	|N	|N	|
|	|AWSCognitoAuth	|Auth	|App Functionality	|Y	|N	|N	|
|	|AWSCognitoIdentityProvider	|Auth	|App Functionality	|Y	|N	|N	|
|Network information	|	|	|	|	|	|	|
|	|AWSMobileClient	|Auth	|App Functionality	|Y	|N	|N	|
|	|AWSCognitoAuth	|Auth	|App Functionality	|Y	|N	|N	|
|	|AWSCognitoIdentityProvider	|Auth	|App Functionality	|Y	|N	|N	|
|Has SIM card	|	|	|	|	|	|	|
|	|AWSMobileClient	|Auth	|App Functionality	|Y	|N	|N	|
|	|AWSCognitoAuth	|Auth	|App Functionality	|Y	|N	|N	|
|	|AWSCognitoIdentityProvider	|Auth	|App Functionality	|Y	|N	|N	|
|Cellular Carrier Name	|	|	|	|	|	|	|
|	|AWSMobileClient	|Auth	|App Functionality	|Y	|N	|N	|
|	|AWSCognitoAuth	|Auth	|App Functionality	|Y	|N	|N	|
|	|AWSCognitoIdentityProvider	|Auth	|App Functionality	|Y	|N	|N	|
|Device Model	|	|	|	|	|	|	|
|	|AWSMobileClient	|Auth	|App Functionality	|Y	|N	|N	|
|	|AWSCognitoAuth	|Auth	|App Functionality	|Y	|N	|N	|
|	|AWSCognitoIdentityProvider	|Auth	|App Functionality	|Y	|N	|N	|
|Device Name	|	|	|	|	|	|	|
|	|AWSMobileClient	|Auth	|App Functionality	|Y	|N	|N	|
|	|AWSCognitoAuth	|Auth	|App Functionality	|Y	|N	|N	|
|	|AWSCognitoIdentityProvider	|Auth	|App Functionality	|Y	|N	|N	|
|Device OS Version	|	|	|	|	|	|	|
|	|AWSMobileClient	|Auth	|App Functionality	|Y	|N	|N	|
|	|AWSCognitoAuth	|Auth	|App Functionality	|Y	|N	|N	|
|	|AWSCognitoIdentityProvider	|Auth	|App Functionality	|Y	|N	|N	|
|Device Height and Width	|	|	|	|	|	|	|
|	|AWSMobileClient	|Auth	|App Functionality	|Y	|N	|N	|
|	|AWSCognitoAuth	|Auth	|App Functionality	|Y	|N	|N	|
|	|AWSCognitoIdentityProvider	|Auth	|App Functionality	|Y	|N	|N	|
|Device Language	|	|	|	|	|	|	|
|	|AWSMobileClient	|Auth	|App Functionality	|Y	|N	|N	|
|	|AWSCognitoAuth	|Auth	|App Functionality	|Y	|N	|N	|
|	|AWSCognitoIdentityProvider	|Auth	|App Functionality	|Y	|N	|N	|
|UIDevice.identifierForVendor	|	|	|	|	|	|	|
|	|AWSMobileClient	|Auth	|App Functionality	|Y	|N	|N	|
|	|AWSCognitoAuth	|Auth	|App Functionality	|Y	|N	|N	|
|	|AWSCognitoIdentityProvider	|Auth	|App Functionality	|Y	|N	|N	|


## Health and Fitness	
No data is collected

## Financial Info
No data is collected

## Location							
No data is collected

## Sensitive Info							
No data is collected

## Contacts							
No data is collected

## Browsing History
No data is collected

## Search History
No data is collected

## Diagnostics
No data is collected


