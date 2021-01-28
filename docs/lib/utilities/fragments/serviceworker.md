AWS Amplify *ServiceWorker* class enables registering a service worker in the browser and communicating with it via *postMessage* events, so that you can create rich offline experiences with [Push APIs](https://developer.mozilla.org/en-US/docs/Web/API/Push_API) and analytics. 

After registering the service worker, the ServiceWorker module will listen and attempt to dispatch messages on state changes, and it will record analytics events based on the service worker's lifecycle.

<amplify-callout>

postMessage events are currently not supported in all browsers. For details and to learn more about Service Worker API, please [visit here](https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API/).

</amplify-callout>

## Installation

Import *ServiceWorker* and instantiate a new instance (you can have multiple workers on different scopes):
```javascript
import { ServiceWorker } from 'aws-amplify';
const serviceWorker = new ServiceWorker();
```

## Working with the API

### register()

You can register a service worker for the browser with `register` method. 

First, you need to create a service worker script **service-worker.js**. Your service worker script includes cache settings for offline access and event handlers for related lifecycle events. [Click to see a sample service worker script](#example-service-worker) for your app. 

Make sure that worker script is included with your build and provide a script path relative to the source directory when registering:

```javascript
// Register the service worker with `service-worker.js` with service worker scope `/`.
registeredServiceWorker = await serviceWorker.register('/service-worker.js', '/');
```

This method will enable web push notifications for your app. If your app is not previously subscribed to the push service to receive notifications, a new subscription will be created with the provided *public key*. 

```javascript
    serviceWorker.enablePush('BLx__NGvdasMNkjd6VYPdzQJVBkb2qafh')
```

<amplify-callout>

You need a web push service provider to generate the public key, and sending the actual push notifications. To test push messages with a non-production environment, you can follow [this tutorial](https://developers.google.com/web/fundamentals/codelabs/push-notifications/).

</amplify-callout>

### Handling a Push Notification

To handle incoming push notifications in your service worker, your script should register an event handler for `push` event.

In your *service-worker.js* file, add following event listener:

```javascript
/**
 * Listen for incoming Push events
 */

addEventListener('push', (event) => {
    var data = {};
    console.log('[Service Worker] Push Received.');
    console.log(`[Service Worker] Push had this data: "${event.data.text()}"`);

    if (!(self.Notification && self.Notification.permission === 'granted')) 
        return;
    
    if (event.data) 
        data = event.data.json();
    
    // Customize the UI for the message box 
    var title = data.title || "Web Push Notification";
    var message = data.message || "New Push Notification Received";
    var icon = "images/notification-icon.png";
    var badge = 'images/notification-badge.png';
    var options = {
        body: message,
        icon: icon,
        badge: badge
    };

    event.waitUntil(self.registration.showNotification(title,options));

});
```

For more information about Notifications API, please visit [here](https://developer.mozilla.org/en-US/docs/Web/API/notification).

### send()

`send` method sends a message to your service worker, from your web app. Remember that your app's code and service worker script work in different contexts, and the communication between the two is possible with *send()* method.

This is useful when you want to control your service worker logic from your app, such as cleaning the service worker cache:

```javascript

    registeredServiceWorker.send({
      'message': 'CleanAllCache'
    });

```

For more information about Message API, please visit [here](https://developer.mozilla.org/en-US/docs/Web/Events/message_(ServiceWorker)).


#### Receiving Messages 

To receive the messages in your service worker, you need to add an event handler for **message** event.

In your *service-worker.js* file, add the following event listener:

```javascript
    /**
     * The message will receive messages sent from the application.
     * This can be useful for updating a service worker or messaging
     * other clients (browser restrictions currently exist)
     * https://developer.mozilla.org/en-US/docs/Web/API/Client/postMessage
     */
    addEventListener('message', (event) => {
        console.log('[Service Worker] Message Event: ', event.data)
    })
    
```

### Monitoring Lifecycle Events

If you enable AWS Amplify [Analytics](~/lib/analytics/getting-started.md) category, *ServiceWorker* module automatically tracks service worker state changes and message events.

You can see those analytics events are related metrics in Amazon Pinpoint console.

## API Reference

For the complete API documentation for ServiceWorker module, visit our [API Reference](https://aws-amplify.github.io/amplify-js/docs/api/classes/serviceworkerclass.html)

## Example Service Worker

```javascript
var appCacheFiles = [
	'/',
	'/index.html'
], 
// The name of the Cache Storage
appCache = 'aws-amplify-v1';

/**
 * The install event is fired when the service worker 
 * is installed.
 * https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API
 */
addEventListener('install', (event) => {
	console.log('[Service Worker] Install Event', event)
	event.waitUntil(
    	caches.open(appCache).then(function(cache) {
	      return cache.addAll(appCacheFiles);
    	})
  	);
})

/**
 * The activate vent is fired when the  service worker is activated
 * and added to the home screen.
 * https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API
 */
addEventListener('activate', (event) => {
	console.log('[Service Worker] Activate Event ', event)
})

/**
 * The fetch event is fired for every network request. It is also dependent
 * on the scope of which your service worker was registered.
 * https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API
 */
addEventListener('fetch', function(event) {
	//return fetch(event.request);
  console.log('[Service Worker] Fetch: ', event);
	let url = new URL(event.request.url);
	//url.pathname
  event.respondWith(
    caches.match(event.request).then(function(resp) {
      return resp || fetch(event.request).then(function(response) {
        return caches.open(appCache).then(function(cache) {
          if (event.request.method === 'GET') {
          	cache.put(event.request, response.clone());
      	  }
          return response;
        });
      });
    })
	);
});
/**
 * The message will receive messages sent from the application.
 * This can be useful for updating a service worker or messaging
 * other clients (browser restrictions currently exist)
 * https://developer.mozilla.org/en-US/docs/Web/API/Client/postMessage
 */
addEventListener('message', (event) => {
	console.log('[Service Worker] Message Event: ', event.data)
})

/**
 * Listen for incoming Push events
 */
addEventListener('push', (event) => {
	console.log('[Service Worker] Push Received.');
	console.log(`[Service Worker] Push had this data: "${event.data.text()}"`);

	if (!(self.Notification && self.Notification.permission === 'granted'))
		return;
		
	var data = {};
  if (event.data)
    data = event.data.json();

	var title = data.title || "Web Push Notification";
	var message = data.message || "New Push Notification Received";
	var icon = "images/notification-icon.png";
	var badge = 'images/notification-badge.png';
	var options = {
		body: message,
		icon: icon,
		badge: badge
	};
	event.waitUntil(self.registration.showNotification(title,options));
});

/**
 * Handle a notification click
 */
addEventListener('notificationclick', (event) => {
	console.log('[Service Worker] Notification click: ', event);
	event.notification.close();
	event.waitUntil(
		clients.openWindow('https://aws-amplify.github.io/amplify-js')
	);
});
```
