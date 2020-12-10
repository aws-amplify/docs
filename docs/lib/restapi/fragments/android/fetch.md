## GET requests

To make a GET request, first build a RestOptions object and then use the Amplify.API.get api to issue the request:

<amplify-block-switcher>
<amplify-block name="Java">

```java
void getTodo() {
    RestOptions options = RestOptions.builder()
        .addPath("/todo")
        .build();

    Amplify.API.get(options,
        restResponse -> Log.i("MyAmplifyApp", "GET succeeded: " + restResponse),
        apiFailure -> Log.e("MyAmplifyApp", "GET failed.", apiFailure)
    );
}
```

</amplify-block>
<amplify-block name="Kotlin">

```kotlin
fun getTodo() {
    val options = RestOptions.builder()
        .addPath("/todo")
        .build()

    Amplify.API.get(options,
        { Log.i("MyAmplifyApp", "GET succeeded: ${it.data}") },
        { Log.e("MyAmplifyApp", "GET failed", it) }
    )
}
```

</amplify-block>
<amplify-block name="RxJava">

```java
void getTodo() {
    RestOptions options = RestOptions.builder()
        .addPath("/todo")
        .build();

    RxAmplify.API.get(options)
        .subscribe(
            restResponse -> Log.i("MyAmplifyApp", "GET succeeded: " + restResponse),
            apiFailure -> Log.e("MyAmplifyApp", "GET failed.", apiFailure)
        );
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
<amplify-block name="Java">

```java
RestOptions options = RestOptions.builder()
    .addPath("/todo")
    .addQueryParameters(Collections.singletonMap("q", "test"))
    .build();

Amplify.API.get(options,
    response -> Log.i("MyAmplifyApp", "GET succeeded: " + response),
    error -> Log.e("MyAmplifyApp", "GET failed.", error)
);
```

</amplify-block>
<amplify-block name="Kotlin">

```kotlin
val options: RestOptions = RestOptions.builder()
    .addPath("/todo")
    .addQueryParameters(Collections.singletonMap("q", "test"))
    .build()

Amplify.API.get(options,
    { Log.i("MyAmplifyApp", "GET succeeded: $it.") },
    { Log.e("MyAmplifyApp", "GET failed.", it) }
)
```

</amplify-block>
<amplify-block name="RxJava">

```java
RestOptions options = RestOptions.builder()
    .addPath("/todo")
    .addQueryParameters(Collections.singletonMap("q", "test"))
    .build();

RxAmplify.API.get(options)
    .subscribe(
        response -> Log.i("MyAmplifyApp", "GET succeeded: " + response),
        error -> Log.e("MyAmplifyApp", "GET failed.", error)
    );
```

</amplify-block>
</amplify-block-switcher>
