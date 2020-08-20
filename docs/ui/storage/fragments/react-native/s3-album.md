`S3Album` renders a list of `S3Image` objects:

![S3Album](~/images/s3album.png)

## Usage

```jsx
import React from 'react';

import Amplify from 'aws-amplify';
import awsconfig from './aws-exports';

import { S3Album } from 'aws-amplify-react-native';

Amplify.configure(awsconfig);

const App = () => {
    return (
        <S3Album path='/pictures' />
    );
}

export default App;
```

To display objects in a specific folder, supply the `path` property:

```jsx
return (
    <S3Album path={path} />
);
```

To display private objects, supply the `level` property:

```jsx
return (
    <S3Album level="private" path={path} />
);
```

You can use the `filter` property to customize the path of your album:

```jsx
return (
    <S3Album
        level="private"
        path={path}
        filter={(item) => /jpg/i.test(item.path)}
    />
);
```

Set the `picker` property to enable image upload to S3:

```jsx
return (
    <S3Album
        path={path}
        picker
    />
);
```

## Properties

| Name          | Description                                                   | Type                                       |
|---------------|---------------------------------------------------------------|--------------------------------------------|
| fileToKey     | Callback used to generate custom key value                    | (data: object) => string                   |
| filter        | Filter to be applied on album list                            | (list: StorageObject[]) => StorageObject[] |
| handleOnError | Function executed when error occurs for the s3-image          | (event: Event) => void                     |
| handleOnLoad  | Function executed when s3-image loads                         | (event: Event) => void                     |
| level         | The access level of the files                                 | AccessLevel?                               |
| track         | Whether or not to use track the get/put of the text file      | boolean?                                   |
| identityId    | Cognito identity id of the another user's text file           | string?                                    |
| picker        | Boolean to enable or disable picker                           | boolean?                                   |
| pickerText    | Picker button text                                            | string?                                    |
| sort          | Sort to be applied on album list                              | (list: StorageObject[]) => StorageObject[] |
| theme         | A custom theme to be applied to the underlying Text component | AmplifyThemeType?                          |

## Customization

To customize `S3Album`, pass a custom `AmplifyTheme` to the `theme` property:

```jsx
const theme = StyleSheet.create({
    album: {
		width: '50%',
	},
});

return (
    <S3Album
        path={path}
        theme={theme}
    />
);
```