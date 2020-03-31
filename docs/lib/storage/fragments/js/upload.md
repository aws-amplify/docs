## Put
The `Put` method uploads files into Amazon S3.

It returns a `{key: S3 Object key}` object on success:

```javascript
Storage.put('test.txt', 'Hello')
    .then (result => console.log(result)) // {key: "test.txt"}
    .catch(err => console.log(err));
```

### Public level

```javascript
Storage.put('test.txt', 'Hello')
    .then (result => console.log(result))
    .catch(err => console.log(err));
```

### Protected level

```javascript
Storage.put('test.txt', 'Protected Content', {
    level: 'protected',
    contentType: 'text/plain'
})
.then (result => console.log(result))
.catch(err => console.log(err));
```

### Private level

```javascript
Storage.put('test.txt', 'Private Content', {
    level: 'private',
    contentType: 'text/plain'
})
.then (result => console.log(result))
.catch(err => console.log(err));
```

### Monitor progress of upload

To track the progress of your upload, you can use the ```progressCallback```: 

```javascript
Storage.put('test.txt', 'File content', {
    progressCallback(progress) {
        console.log(`Uploaded: ${progress.loaded}/${progress.total}`);
  },
});
```
### Encrypted uploads

To utilize Server-Side Encryption with AWS KMS, the following options can be passed in with the Put API like so:

```javascript
const serverSideEncryption = AES256 | aws:kms;
const SSECustomerAlgorithm = 'string';
const SSECustomerKey = new Buffer('...') || 'string';
const SSECustomerKeyMD5 = 'string';
const SSEKMSKeyId = 'string';
Storage.put('test.txt', 'File content', {
    serverSideEncryption, SSECustomerAlgorithm, SSECustomerKey, SSECustomerKeyMD5, SSEKMSKeyId
})
.then (result => console.log(result))
.catch (err => console.log(err));
```

Other options available are:

```javascript
Storage.put('test.txt', 'My Content', {
    cacheControl: '', // (String) Specifies caching behavior along the request/reply chain
    contentDisposition: '', // (String) Specifies presentational information for the object
    expires: new Date().now() + 60 * 60 * 24 * 7, // (Date) The date and time at which the object is no longer cacheable. ISO-8601 string, or a UNIX timestamp in seconds
    metadata: { key: 'value' }, // (map<String>) A map of metadata to store with the object in S3.
})
.then (result => console.log(result))
.catch(err => console.log(err));
```

## Browser uploads
Upload an image in the browser:

```javascript
class S3ImageUpload extends React.Component {
  onChange(e) {
      const file = e.target.files[0];
      Storage.put('example.png', file, {
          contentType: 'image/png'
      })
      .then (result => console.log(result))
      .catch(err => console.log(err));
  }

  render() {
      return (
          <input
              type="file" accept='image/png'
              onChange={(evt) => this.onChange(evt)}
          />
      )
  }
}
```

## React Native uploads
Upload an image in your React Native app:

```javascript
uploadToStorage = async pathToImageFile => {
  try {
    const response = await fetch(pathToImageFile)
    
    const blob = await response.blob()
    
    Storage.put('yourKeyHere.jpeg', blob, {
      contentType: 'image/jpeg',
    })
  } catch (err) {
    console.log(err)
  }
}
```

When a networking error happens during the upload, Storage module retries upload for a maximum of 4 attempts. If the upload fails after all retries, you will get an error.