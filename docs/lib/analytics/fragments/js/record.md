## Recording Custom Events

To record custom events call the `record` method:

```javascript
Analytics.record({ name: 'albumVisit' });
```

## Record a Custom Event with Attributes

The `record` method lets you add additional attributes to an event. For example, to record *artist* information with an *albumVisit* event:

```javascript
Analytics.record({
    name: 'albumVisit', 
    // Attribute values must be strings
    attributes: { genre: '', artist: '' }
});
```

Attribute values must have the type `String` or be an array of strings.

## Record Engagement Metrics

Data can also be added to an event:

```javascript
Analytics.record({
    name: 'albumVisit', 
    attributes: {}, 
    metrics: { minutesListened: 30 }
});
```

Metric values must be a `Number` type such as a float or integer.

## Disable Analytics

You can also disable or re-enable Analytics:
```javascript
// to disable Analytics
Analytics.disable();

// to enable Analytics
Analytics.enable();
```