## Subscribing Events

You can take specific actions when users sign-in or sign-out by subscribing authentication events in your app. Please see our [Hub Module Developer Guide](lib/utilities/hub) for more information.

## Working with AWS service objects

You can use AWS *Service Interface Objects* to work AWS Services in authenticated State. You can call methods on any AWS Service interface object by passing your credentials from `Auth` object to the service call constructor:

```javascript
import Route53 from 'aws-sdk/clients/route53';

Auth.currentCredentials()
  .then(credentials => {
    const route53 = new Route53({
      apiVersion: '2013-04-01',
      credentials: Auth.essentialCredentials(credentials)
    });

    // more code working with route53 object
    // route53.changeResourceRecordSets();
  })
```

Full API Documentation for Service Interface Objects is available [here](https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/_index.html).

<amplify-callout warning>

Note: To work with Service Interface Objects, your Amazon Cognito users' [IAM role](https://docs.aws.amazon.com/cognito/latest/developerguide/iam-roles.html) must have the appropriate permissions to call the requested services.

</amplify-callout>

## Using modular imports

If you only need to use Auth, you can do: `npm install @aws-amplify/auth` which will only install the Auth module for you.

Then in your code, you can import the Auth module by:
```javascript
import Auth from '@aws-amplify/auth';

Auth.configure();
```

## API reference

For the complete API documentation for Authentication module, visit our [API Reference](https://aws-amplify.github.io/amplify-js/api/classes/authclass.html)
