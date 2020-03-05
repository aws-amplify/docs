> To enable Storage, you must first enable authentication if you have not already by running `amplify add auth` from the command line.

The Amplify CLI supports creating and interacting with two types of Storage categories: Files (Amazon S3) and Database (Amazon DynamoDB).

The Storage example you will be creating in this step is an image upload and viewing app using Amazon S3.

## React Native Image Picker native module

If you are __not using Expo__, you must first install and configure the [React Native Image Picker native module](https://github.com/react-native-community/react-native-image-picker) in order to retrieve images from the camera roll.


```sh
$ npm install react-native-image-picker

$ cd ios && pod install && cd ..
```

You will also need to add `UsageDescription` on iOS and some permissions on Android, refer to the Install doc.

## Add Storage to the backend

To add Storage, run the following command.

```sh
$ amplify add storage

? Please select from one of the below mentioned services: Content
? Please provide a friendly name for your resource that will be used to label this category in the project: <your_resource_name>
? Please provide bucket name: <your_globally_unique_bucket_name>
? Who should have access: Auth and guest users
? What kind of access do you want for Authenticated users? create, read, update, delete
? What kind of access do you want for Guest users? create, read, update, delete
? Do you want to add a Lambda Trigger for your S3 Bucket? N
```

Deploy the service by running the following command:

```sh
$ amplify push
```

To view the Amazon S3 bucket at any time, you can open the Amplify console and click on __File storage__:

```sh
$ amplify console
```

From the React Native application, you can use the Amplify `Storage` category to interact with the Amazon S3 bucket.

In this example, you will use `Storage.put` to upload an image to the S3 bucket.

This example will differ depending on whether you are using Expo or the React Native CLI.

## Uploading an image with a project created using with Expo

```javascript
import React, { useState, useEffect} from 'react';
import { Button, Image, View } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';
import { Storage } from 'aws-amplify'

import Amplify from 'aws-amplify'
import config from './aws-exports'
Amplify.configure(config)

function App() {
  useEffect(() => {
    getPermissionAsync();
  }, [])

  async function getPermissionAsync() {
    if (Constants.platform.ios) {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status !== 'granted') {
        alert('Sorry, we need camera roll permissions to make this work!');
      }
    }
  }

  async function getImageFromCameraRoll() {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1
    });

    if (!result.cancelled) {
      const fileName = result.uri.split('/')[result.uri.split('/').length - 1]
      uploadToStorage(result.uri, fileName)
    }
  };

  async function uploadToStorage (pathToImageFile, fileName) {
    try {
      const response = await fetch(pathToImageFile)
      const blob = await response.blob()
      await Storage.put(fileName, blob)
      console.log('image successfully stored!')
    } catch (err) {
      console.log('error storing image:', err)
    }
  }

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Button
        title="Choose image"
        onPress={getImageFromCameraRoll}
      />
    </View>
  );
}

export default App
```

## Uploading an image with a project created using the React Native CLI

```javascript
import React from 'react'
import {
  View, Text, StyleSheet, Button
} from 'react-native'

import ImagePicker from 'react-native-image-picker';
import { Storage } from 'aws-amplify'

const options = {
  title: 'Select Photo',
}

const App = () => {
  async function getImageFromCameraRoll() {
    ImagePicker.showImagePicker(options, (response) => {    
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else {
        const fileName = response.uri.split('/')[response.uri.split('/').length - 1]
        uploadToStorage(response.uri, fileName)
      }
    });
  }

  async function uploadToStorage(pathToImageFile, fileName) {
    try {
      const response = await fetch(pathToImageFile)
      const blob = await response.blob()
      await Storage.put(fileName, blob)
      console.log('image successfully stored!')
    } catch (err) {
      console.log('error storing image:', err)
    }
  }

  return (
    <View style={styles.container}>
      <Text>Image Storage Example</Text>
      <Button
        title="Choose image" onPress={getImageFromCameraRoll}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
})

export default App
```

## Fetching and rendering images from Amazon S3

To fetch files, you can use one of the following two Storage methods:

__Storage.get('imagekey')__ - Gets a single signed file by key

__Storage.list('/path-to-files')__ - Gets a list of file keys

In the below example, you will use `Storage.get('')` to retrieve all of the image keys in the S3 bucket and then `Storage.get` to retrieve a signed image for each image key in the array.

```javascript
import React, { useState, useEffect } from 'react'
import {
  View, Text, StyleSheet, Image
} from 'react-native'

import Amplify from 'aws-amplify'
import config from './aws-exports'
Amplify.configure(config)

import { Storage } from 'aws-amplify'

const App = () => {
  const [images, setImages] = useState([])
  useEffect(() => {
    fetchImages()
  }, [])
  async function fetchImages() {
    const imageData = await Storage.list('')
    const imagesToSign = imageData.map(image => Storage.get(image.key))
    const signedImages = await Promise.all(imagesToSign)
    setImages(signedImages)
  }
  console.log('images:', images)
  return (
    <View style={styles.container}>
      <Text>Images from Storage</Text>
      {
        images.map(image => (
          <Image
            style={{marginTop: 10, width: '100%', height: 200}} key={image} source={{uri: image}} />
          ))
      }
    </View>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 }
})

export default App
```