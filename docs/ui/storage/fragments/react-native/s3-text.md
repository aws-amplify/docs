`S3Text` renders an *Amazon S3 object key* as a react-native `Text` component:

![S3Text](~/images/s3text.png)

## Usage

```jsx
import React from 'react';

import Amplify from 'aws-amplify';
import { S3Text } from 'aws-amplify-react-native';

import awsconfig from './aws-exports';

Amplify.configure(awsconfig);

const App = () => (
 <S3Text textKey="example.txt" />
);
```

## Properties

| Name         | Description                                                              | Type                     |
|--------------|--------------------------------------------------------------------------|--------------------------|
| textKey      | The key of the text object in S3                                         | string?                  |
| path         | The path to the text file                                                | string?                  |
| body         | Text content to be uploaded                                              | string?                  |
| contentType  | The content type header used when uploading to S3 (defaults to 'text/*') | string?                  |
| level        | The access level of the text file                                        | AccessLevel?             |
| track        | Whether or not to use track the get/put of the text file                 | boolean?                 |
| identityId   | Cognito identity id of the another user's text file                      | string?                  |
| fallbackText | The fallback text                                                        | string?                  |
| style        | A custom style to be applied to the underlying Text component            | StyleProp < TextStyle >? |
| theme        |  A custom theme to be applied to the underlying Text component           | AmplifyThemeType?        |

## Use Cases

### Getting files from protected access level

Protected files from S3 bucket can be accessed by anyone other than the owner by using the `identityId` of the owner.

```jsx
const App = () => (
 <S3Text level={AccessLevel.Protected} textKey="example.txt" identityId="us-east-1:XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXX"/>
);
```

## Customization

There are two methods to customize the S3Text component:

1. Either pass an `AmplifyTheme` with a `storageText` property to `theme`:

```jsx
const amplifyTheme = StyleSheet.create({
    storageText: {
		color: '#152939',
		fontSize: 14,
	},
});

const App = () => (
 <S3Text textKey="example.txt" theme={amplifyTheme}/>
);
```

2. Or pass a custom `StyleSheet` to the `style` property:

```jsx
const styles = StyleSheet.create({
    text: {
		color: '#152939',
		fontSize: 14,
	},
});

const App = () => (
 <S3Text textKey="example.txt" style={style.text}/>
);
```