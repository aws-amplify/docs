You can enable automatic tracking of storage events such as uploads and downloads, by setting `{ track: true }` when calling the Storage API. 

(Note: this option is currently only supported in aws-amplify). Enabling this will automatically send Storage events to Amazon Pinpoint and you will be able to see them within the AWS Pinpoint console under Custom Events. The event name will be 'Storage' and in *Event Attributes*, you can see details about the event, e.g. *Storage > Method > Put*.

Track all the Storage events:

```javascript
Storage.configure({ track: true })
```

Track a specific storage action:

```javascript
Storage.get('welcome.png', { track: true });
```

You can also use the track property directly on [React components](#analytics-for-s3-components).