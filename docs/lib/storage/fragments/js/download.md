## Get

Get a presigned URL of a stored file. You can specify 2 options: [file access `level`](https://docs.amplify.aws/lib/storage/configureaccess/q/platform/js) and whether to `download` the file:

```typescript
Storage.get(key: string, config: {
  level?: private | protected | public,
  identityId?: string // id of another user, if `level: protected`
  download?: boolean // default false
})
```

### File download

```javascript
Storage.get(`filename.txt`, { download: true })
    .then(result =>  console.log(result))
```

### Public level

```javascript
Storage.get('filename.txt')
    .then(result => console.log(result))
    .catch(err => console.log(err));
```

### Protected level

To get current user's objects

```javascript
Storage.get('filename.txt', { level: 'protected' })
    .then(result => console.log(result))
    .catch(err => console.log(err));
```

To get other users' objects

```javascript
Storage.get('filename.txt', { 
    level: 'protected', 
    identityId: 'xxxxxxx' // the identityId of that user
})
.then(result => console.log(result))
.catch(err => console.log(err));
```

### Private level

```javascript
Storage.get('filename.txt', { level: 'private' })
    .then(result => console.log(result))
    .catch(err => console.log(err));
```

## Generate a download URL

You can use `expires` option to limit the availability of your URLs. This configuration returns the pre-signed URL that expires in 60 seconds:

```javascript
Storage.get('filename.txt', { expires: 60 })
    .then(result => console.log(result))
    .catch(err => console.log(err));
```
