## GET requests

To make a GET request, first build a `RestOptions` object and then use the `Amplify.API.get` API to issue the request:

```dart
try {
    RestOptions options = RestOptions(
        path: '/todo'
    );
    RestOperation restOperation = Amplify.API.get(
        restOptions: options
    );
    RestResponse response = await restOperation.response;
    print('GET call succeeded');
} on ApiException catch (e) {
    print('GET call failed: $e');
}
```

## Accessing query parameters & body in Lambda proxy function

> To learn more about Lambda Proxy Integration, please visit [Amazon API Gateway Developer Guide](https://docs.aws.amazon.com/apigateway/latest/developerguide/api-gateway-create-api-as-simple-proxy-for-lambda.html).

If you are using a REST API which is generated with Amplify CLI, your backend is created with Lambda Proxy Integration, and you can access your query parameters & body within your Lambda function via the *event* object:

```javascript
exports.handler = function(event, context, callback) {
    console.log(event.queryStringParameters);
    console.log('body: ', event.body);
}
```

Alternatively, you can update your backend file which is located at `amplify/backend/function/[your-lambda-function]/app.js` with the middleware:

```javascript
const awsServerlessExpressMiddleware = require('aws-serverless-express/middleware');
app.use(awsServerlessExpressMiddleware.eventContext());
```

Accessing Query Parameters with Serverless Express

In your request handler use `req.apiGateway.event` or `req.query`:

```javascript
app.get('/todo', function(req, res) {
  const query = req.query;
  // or
  // const query = req.apiGateway.event.queryStringParameters
  res.json({
    event: req.apiGateway.event, // to view all event data
    query: query
  });
});
```

Then you can use query parameters in your path as follows:

```dart
try {
    RestOptions options = RestOptions(
        path: '/todo',
        queryParameters: {
            'q' : 'test'
        }
    );
    RestOperation restOperation = Amplify.API.get(
        restOptions: options
    );
    RestResponse response = await restOperation.response;
    print('GET call succeeded'); 
    print(new String.fromCharCodes(response.data));
} on ApiException catch (e) {
    print('GET call failed: $e');
} 
```
