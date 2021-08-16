Analytics Auto Tracking helps you to automatically track user behaviors like sessions start/stop, page view change and web events like clicking, mouseover.

## Session Tracking

You can track the session both in a web app or a React Native app by using Analytics. A web session can be defined in different ways. To keep it simple we define that the web session is active when the page is not hidden and inactive when the page is hidden. 
A session in the React Native app is active when the app is in the foreground and inactive when the app is in the background.

For example: 
```javascript
Analytics.autoTrack('session', {
    // REQUIRED, turn on/off the auto tracking
    enable: true,
    // OPTIONAL, the attributes of the event, you can either pass an object or a function 
    // which allows you to define dynamic attributes
    attributes: {
        attr: 'attr'
    },
    // when using function
    // attributes: () => {
    //    const attr = somewhere();
    //    return {
    //        myAttr: attr
    //    }
    // },
    // OPTIONAL, the service provider, by default is the Amazon Pinpoint
    provider: 'AWSPinpoint'
});
```

When the page is loaded, the Analytics module will send an event to the Amazon Pinpoint Service.
```javascript
{ 
    eventType: '_session_start', 
    attributes: { 
        attr: 'attr' 
    }
}
```

To keep backward compatibility, the auto tracking of the session is enabled by default. You can turn it off by:
```javascript
Analytics.configure({
    // OPTIONAL - Allow recording session events. Default is true.
    autoSessionRecord: false,
});
```
or 
```javascript
Analytics.autoTrack('session', {
    enable: false
});

// Note: this must be called before Amplify.configure() or Analytics.configure() to cancel the session_start event
```

## Page View Tracking

If you want to track which page/url in your webapp is the most frequently viewed one, you can use this feature. It will automatically send events containing url information when the page is visited.

To turn it on:
```javascript
Analytics.autoTrack('pageView', {
    // REQUIRED, turn on/off the auto tracking
    enable: true,
    // OPTIONAL, the event name, by default is 'pageView'
    eventName: 'pageView',
    // OPTIONAL, the attributes of the event, you can either pass an object or a function 
    // which allows you to define dynamic attributes
    attributes: {
        attr: 'attr'
    },
    // when using function
    // attributes: () => {
    //    const attr = somewhere();
    //    return {
    //        myAttr: attr
    //    }
    // },
    // OPTIONAL, by default is 'multiPageApp'
    // you need to change it to 'SPA' if your app is a single-page app like React
    type: 'multiPageApp',
    // OPTIONAL, the service provider, by default is the Amazon Pinpoint
    provider: 'AWSPinpoint',
    // OPTIONAL, to get the current page url
    getUrl: () => {
        // the default function
        return window.location.origin + window.location.pathname;
    }
});
```
Note: This is not supported in React Native.

## Page Event Tracking

If you want to track user interactions with elements on the page, you can use this feature. All you need to do is attach the specified selectors to your dom element and turn on the auto tracking.

To turn it on:
```javascript
Analytics.autoTrack('event', {
    // REQUIRED, turn on/off the auto tracking
    enable: true,
    // OPTIONAL, events you want to track, by default is 'click'
    events: ['click'],
    // OPTIONAL, the prefix of the selectors, by default is 'data-amplify-analytics-'
    // in order to avoid collision with the user agent, according to https://www.w3schools.com/tags/att_global_data.asp
    // always put 'data' as the first prefix
    selectorPrefix: 'data-amplify-analytics-',
    // OPTIONAL, the service provider, by default is the Amazon Pinpoint
    provider: 'AWSPinpoint',
    // OPTIONAL, the default attributes of the event, you can either pass an object or a function 
    // which allows you to define dynamic attributes
    attributes: {
        attr: 'attr'
    }
    // when using function
    // attributes: () => {
    //    const attr = somewhere();
    //    return {
    //        myAttr: attr
    //    }
    // }
});
```

For example:
```html
<!-- you want to track this button and send an event when it is clicked -->
<button
    data-amplify-analytics-on='click'
    data-amplify-analytics-name='click'
    data-amplify-analytics-attrs='attr1:attr1_value,attr2:attr2_value'
/>
```
When the button above is clicked, an event will be sent automatically and this is equivalent to do:
```html
<script>
    var sendEvent = function() {
        Analytics.record({
            name: 'click',
            attributes: {
                attr: 'attr', // the default ones
                attr1: attr1_value, // defined in the button component
                attr2: attr2_value, // defined in the button component
            }
        });
    }
</script>
<button onclick="sendEvent()"/>
```
Note: This is not supported in React Native.
