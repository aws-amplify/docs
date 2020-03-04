To stop receiving messages from a topic, you can use `unsubscribe()` method:
```javascript
const sub1 = PubSub.subscribe('myTopicA').subscribe({
    next: data => console.log('Message received', data),
    error: error => console.error(error),
    close: () => console.log('Done'),
});

sub1.unsubscribe();
// You will no longer get messages for 'myTopicA'
```