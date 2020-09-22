## Get

Get a presigned URL of a stored file. You can specify some options: mainly [file access `level`](https://docs.amplify.aws/lib/storage/configureaccess/q/platform/js) and whether to `download` the file:

```typescript
await Storage.get(key: string, config: {
  level?: private | protected | public, // defaults to `public`
  identityId?: string, // id of another user, if `level: protected`
  download?: boolean, // defaults to false
  expires?: number, // validity, in seconds. defaults to no expiry
  contentType?: string // set return content type, eg "text/html"
})
```

`Storage.get` returns a signed URL `string` to your file if `download` is false, which is the default.

`Storage.get` returns a [`Blob`](https://developer.mozilla.org/en-US/docs/Web/API/Blob) of object data if `download` is true.

### File download

Send object data for immediate file download:

```javascript
const data = await Storage.get(`filename.txt`, { download: true })

// data is a Blob
data.Body.text().then(string => { 
  // handle the String data return String 
})
```

Note that the `Blob` methods like `.text()` are not supported on [IE/Opera/Safari](https://developer.mozilla.org/en-US/docs/Web/API/Blob/text); in those cases you can [parse manually](https://developer.mozilla.org/en-US/docs/Web/API/Blob#JavaScript).

### File Access Levels

You can choose to configure access level ahead of time, or at the point of calling `Storage.get`:

```javascript
// Option 1: configure access ahead of time
Storage.configure({ level: 'private' });
await Storage.get('welcome.png'); // Gets the welcome.png belonging to current user


// Option 2: configure access inside the call
await Storage.get('welcome.png', { level: 'private' }); // same effect
```

Here is a quick guide to the access levels - [see the docs](https://docs.amplify.aws/lib/storage/configureaccess/q/platform/js) for more detail:

- `public`: Accessible by all users of your app. Files are stored under the `public/` path in your S3 bucket.
- `protected`: Readable by all users, but writable only by the creating user. Files are stored under `protected/{user_identity_id}/` where the `user_identity_id` corresponds to the unique Amazon Cognito Identity ID for that user.
    **:**

    ```javascript
    // To get current user's objects
    await Storage.get('filename.txt', { level: 'protected' })
    // To get other users' objects
    await Storage.get('filename.txt', { 
        level: 'protected', 
        identityId: 'xxxxxxx' // the identityId of that user
    })
    ```
- `private`: **Only accessible for the signed in user**. Files are stored under `private/{user_identity_id}/` where the `user_identity_id` corresponds to the unique Amazon Cognito Identity ID for that user.


### Download expiry

You can use `expires` option to limit the availability of your URLs. This configuration returns the pre-signed URL that expires in 60 seconds:

```javascript
await Storage.get('filename.txt', { expires: 60 })
```


### Frequently Asked Questions

Users can run into unexpected issues, so we are giving you advance notice in documentation with links to open issues - please vote for what you need, to help the team prioritize.

- Very common issue: Calling `Storage.get` for a nonexistent file, or incorrect credentials, **does not throw an error** because that would involve an extra API call. [Active issue here](https://github.com/aws-amplify/amplify-js/issues/1145). If you are having trouble accessing a file, make sure to check that you have the right filename, bucket, region, and auth configs. You can get a current list of files from `Storage.list`.
- `Storage.get` is cached; if you have recently modified a file you may not get the most recent version right away. [There is an active issue for a new option to enable cache busting.](https://github.com/aws-amplify/amplify-js/issues/6413)
- `Storage.get` only returns the latest cached version of the file; there is [not yet an API to view prior versions](https://github.com/aws-amplify/amplify-js/issues/2131).
- Download progress tracking is not yet possible. [Active issue here](https://github.com/aws-amplify/amplify-js/issues/4734).
- You cannot [only get file metadata](https://github.com/aws-amplify/amplify-js/issues/6157) yet.
- [Image compression](https://github.com/aws-amplify/amplify-js/issues/6081) or CloudFront CDN caching for your S3 buckets is not yet possible.
- There is no API for [Cognito Group-based access to files](https://github.com/aws-amplify/amplify-js/issues/3388).
- There is currently [no API for getting the identityId of other users](https://github.com/aws-amplify/amplify-js/issues/5177); you have to retrieve this from elsewhere before calling `Storage.get`.
