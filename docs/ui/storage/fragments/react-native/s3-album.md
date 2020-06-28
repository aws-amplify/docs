`S3Album` renders a list of `S3Image` objects:

![S3Album](~/images/s3album.png)

```jsx
import React from 'react';

import Amplify from 'aws-amplify';
import awsconfig from './aws-exports';

import { withAuthenticator, S3Album } from 'aws-amplify-react-native';

Amplify.configure(awsconfig);

const App = () => {
    return (
        <S3Album path='/pictures' />
    );
}

export default withAuthenticator(App);
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
