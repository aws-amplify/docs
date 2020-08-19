## GET requests

To make a GET request, first create a RESTRequest object and then use the Amplify.API.get api to issue the request:

<amplify-block-switcher>

<amplify-block name="Listener (iOS 11+)">

```swift
func getTodo() {
    let request = RESTRequest(path: "/todo")
    Amplify.API.get(request: request) { result in
        switch result {
        case .success(let data):
            let str = String(decoding: data, as: UTF8.self)
            print("Success \(str)")
        case .failure(let apiError):
            print("Failed", apiError)
        }
    }
}
```

</amplify-block>

<amplify-block name="Combine (iOS 13+)">

```swift
func getTodo() -> AnyCancellable {
    let request = RESTRequest(path: "/todo")
    let sink = Amplify.API.get(request: request)
        .resultPublisher
        .sink {
            if case let .failure(apiError) = $0 {
                print("Failed", apiError)
            }
        }
        receiveValue: { data in
            let str = String(decoding: data, as: UTF8.self)
            print("Success \(str)")
        }
    return sink
}
```

</amplify-block>

</amplify-block-switcher>

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

<amplify-block-switcher>

<amplify-block name="Listener (iOS 11+)">

```swift
func getTodo() {
    let queryParameters = ["q":"test"]
    let request = RESTRequest(path: "/todo", queryParameters: queryParameters)
    Amplify.API.get(request: request) { result in
        switch result {
        case .success(let data):
            let str = String(decoding: data, as: UTF8.self)
            print("Success \(str)")
        case .failure(let apiError):
            print("Failed", apiError)
        }
    }
}
```

</amplify-block>

<amplify-block name="Combine (iOS 13+)">

```swift
func getTodo() -> AnyCancellable {
    let queryParameters = ["q":"test"]
    let request = RESTRequest(path: "/todo", queryParameters: queryParameters)
    let sink = Amplify.API.get(request: request)
        .resultPublisher
        .sink {
            if case let .failure(apiError) = $0 {
                print("Failed", apiError)
            }
        }
        receiveValue: { data in
            let str = String(decoding: data, as: UTF8.self)
            print("Success \(str)")
        }
    return sink
}
```

</amplify-block>

</amplify-block-switcher>
