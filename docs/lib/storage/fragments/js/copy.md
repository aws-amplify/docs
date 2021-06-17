## Copy

`Storage.copy` method copies an existing file to a different key.

It returns a `{key: new S3 Object key}` object on success:

<amplify-callout>
Storage.copy can copy an object up to 5 GB in a single operation.
</amplify-callout

### Options

```typescript
await Storage.copy(
	src: { 
		key: string;
		level?: 'private' | 'protected' | 'public';
		identityId?: string; // only works if you are copying from a protected file 
	},
	dest: { 
		key: string;
		level?: 'private' | 'protected' | 'public' 
	}, 
	config?: {
		track?: boolean, // if true, automatically send Storage Events to Amazon Pinpoint
		progressCallback?: (progress) => any, // callback function on every successful part upload
	}
)
```

### Extra Options
```typescript
await Storage.copy({ key: 'src' }, { key: 'dest' }, {
	acl?: string, // https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/S3.html#upload-property
	cacheControl?: string, // Specifies caching behavior along the request/reply chain
	expires?: Date; // The date at which the object is no longer cacheable
	metadata?: [key: string]: string // A map of metadata to store with the object in S3
})
```

### Copy file

For the most basic use case, you can copy a file from the specified key to another key within the same [File Access
Level](~/lib/storage/configureaccess.md) (Defaults to 'public').

```typescript
console.log(await Storage.list('copied/')); // []

// Copies 'existing/srcKey' to 'copied/destKey' within the 'public' access level
const copied = await Storage.copy({ key: 'existing/srcKey' }, { key: 'copied/destKey' });

// There should now be a new file with key "copied/destKey"
console.log(await Storage.list('copied/')); // [ { ..., key: 'copied/destKey' } ]
console.log(copied); // { key: 'copied/destKey' }
```

### Copy file across access levels

Another use case of `copy` is to copy file across different access levels

```typescript
console.log(await Storage.list('copied/', { level: 'private' })); // []

// Copies 'existing/srcKey' to 'copied/destKey' from 'public' to 'private'
const copied = await Storage.copy(
	{ key: 'existing/srcKey', level: 'public' }, 
	{ key: 'copied/destKey', level: 'private' }
);

// There should now be a new file with key "copied/destKey" in the 'private' level
console.log(await Storage.list('copied/', { level: 'private' })); // [ { ..., key: 'copied/destKey' } ]
console.log(copied); // { key: 'copied/destKey' }
```

### Copy protected file from another identityId

You can also copy a protected file from another identityId.

```typescript
console.log(await Storage.list('copied/', { level: 'private' })); // []

// Copies 'existing/srcKey' to 'copied/destKey' from 'protected' of another identity ID to 'private' of the current
// authenticated user

const copied = await Storage.copy(
	{ key: 'existing/srcKey', level: 'protected', identityId: 'identityId' },
	{ key: 'copied/destKey', level: 'private' },
)

// There should now be a new file with key "copied/destKey"
console.log(await Storage.list('copied/', { level: 'private' })); // [..., key: 'copied/destKey']
console.log(copied); // { key: 'copied/destKey' }
```

<amplify-callout>
Cross identity ID copying is only allowed if the source object's access level is set to 'protected'.
</amplify-callout>

### Encrypted copy

To utilize Server-Side Encryption with AWS KMS, the following options can be passed in with the Copy API like so:

```javascript
const serverSideEncryption = AES256 | aws:kms;
const SSECustomerAlgorithm = 'string';
const SSECustomerKey = new Buffer('...') || 'string';
const SSECustomerKeyMD5 = 'string';
const SSEKMSKeyId = 'string';

const result = await Storage.copy('srcKey', 'destKey', {
		serverSideEncryption,
		SSECustomerAlgorithm,
		SSECustomerKey,
		SSECustomerKeyMD5,
		SSEKMSKeyId
});
```

