## Get
Retrieves a publicly accessible URL for data stored.

### Public level

```javascript
Storage.get('test.txt')
    .then(result => console.log(result))
    .catch(err => console.log(err));
```

### Protected level

To get current user's objects
```javascript
Storage.get('test.txt', { level: 'protected' })
    .then(result => console.log(result))
    .catch(err => console.log(err));
```
To get other users' objects
```javascript
Storage.get('test.txt', { 
    level: 'protected', 
    identityId: 'xxxxxxx' // the identityId of that user
})
.then(result => console.log(result))
.catch(err => console.log(err));
```

### Private level

```javascript
Storage.get('test.txt', { level: 'private' })
    .then(result => console.log(result))
    .catch(err => console.log(err));
```
## Generate a download URL

You can use `expires` option to limit the availability of your URLs. This configuration returns the pre-signed URL that expires in 60 seconds:
```javascript
Storage.get('test.txt', { expires: 60 })
    .then(result => console.log(result))
    .catch(err => console.log(err));
```