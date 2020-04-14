You can automatically track `Storage` operations on the following React components: `S3Album`, `S3Text`, `S3Image` by providing a `track` prop:

```jsx
return <S3Album track />
```

Enabling tracking will automatically send 'Storage' events to Amazon Pinpoint, and you will be able to see the results in AWS Pinpoint console under *Custom Events*. The event name will be *Storage*, and event details will be displayed in *attributes* , e.g. Storage -> Method -> Put.

