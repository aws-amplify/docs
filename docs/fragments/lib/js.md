## Amplify JavaScript 
The Amplify JavaScript libraries are supported for different web and mobile frameworks including React, React Native, Angular, Ionic, and Vue. It is recommended that you first complete the [Getting Started](~/start/start.md) guide for Amplify JavaScript.

What's next? Here are some things you can add to your app: 

- [Authentication](~/lib/auth/getting-started.md)
- [DataStore](~/lib/datastore/getting-started.md)
- [User File Storage](~/lib/storage/getting-started.md)
- [Serverless APIs](~/lib/graphqlapi/getting-started.md)
- [Analytics](~/lib/analytics/getting-started.md)
- [AI/ML](~/lib/predictions/getting-started.md)
- [Push Notification](~/lib/push-notifications/getting-started.md)
- [PubSub](~/lib/pubsub/getting-started.md)
- [AR/VR](~/lib/xr/getting-started.md)


### Addressing Bundle Size Concerns

Amplify is highly sensitive to the importance of bundle size for fast web apps and takes it very seriously. [A lot of work was done between v2 and v3](https://github.com/aws-amplify/amplify-js/issues/3365) to make Amplify tree-shakable, and further modularization is an ongoing priority with monitoring in place to prevent regression. 

Today, `aws-amplify` is a single library with multiple modules that can be tree-shaken based on usage. Automated tooling like [BundlePhobia](https://bundlephobia.com/result?p=aws-amplify) overstate the bundle size impact because it assumes *all* exports are used by your app. A more accurate assessment would look at the final bundle in a production build of your app, including g-zip. This is not to say Amplify's work is done here - there is more work to do (like moving to [AWS SDK v3](https://github.com/aws/aws-sdk-js-v3)) to reduce bundle size footprint, against the constraint of keeping the full functionality we want our users to enjoy instead of hand-writing code against the underlying AWS service SDKs.

Each Amplify Libraries category also comes with modular import options ([example for REST](https://docs.amplify.aws/lib/restapi/getting-started/q/platform/js#modular-imports)) you can use if you are having trouble with tree-shaking and desire more control. However we expect the majority of users can simply rely on tree-shaking `aws-amplify` and will not need to use explicit modular imports.
