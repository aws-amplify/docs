## Get

Get a presigned URL of a stored file. You can specify some options: mainly [file access `level`](https://docs.amplify.aws/lib/storage/configureaccess/q/platform/js) and whether to `download` the file:

```typescript
await Storage.get(key: string, config: {
  level?: private | protected | public, // defaults to `public`
  identityId?: string, // id of another user, if `level: protected`
  download?: boolean, // defaults to false
  expires?: number, // validity, in seconds. defaults to no expiry
})
```

`Storage.get` returns a `data` object if `download` is false, which is the default.

`Storage.get` returns a `string` of object data if `download` is true.


### File download

Send object data for immediate file download:

```javascript
await Storage.get(`filename.txt`, { download: true })
```

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
