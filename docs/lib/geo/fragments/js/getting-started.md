<amplify-callout>

**Note:** Amplify Geo is in developer preview and is not intended to be used in production environments. Please reach out to us for any feedback and/or issues [here](https://github.com/aws-amplify/amplify-js/issues)

</amplify-callout>

Amplify Geo provides APIs and map UI components for maps and location search for JavaScript-based web apps. You can add maps and location search functionality to your app in just a few lines of code. Amplify Geo APIs are powered by [Amazon Location Service](https://aws.amazon.com/location/) and the map UI components from MapLibre are already integrated with the Geo APIs. You can quickly get started using [Amplify CLI](~/cli/geo/maps.md) to provision your map and location search resources.

Follow this guide to get started with Amplify Geo through the Amplify CLI.

**Note:** If you want to use existing Amazon Location Service resources [follow this guide](~/lib/geo/existing-resources.md) instead.

## Provisioning resources through CLI

> Prerequisite: [Install and configure the Amplify CLI](~/cli/start/install.md)

The primary way to provision Geo resources is through the Amplify CLI. Currently, Amplify Geo is in developer preview and you need to install the CLI with the `@geo` tag. You can use the following command to install this version globally.

```sh
npm i -g @aws-amplify/cli@geo
```

Now, let's make sure that the right version was installed:

```sh
amplify --version
```

That should show a version with the `-geo.x` tag, for example, `5.2.2-geo.0`.

Once that is complete, you can run the following command from your project's root folder to add a `geo` resource, such as map resources or a search index:

```sh
amplify add geo
```

The CLI will prompt configuration options for the Geo category for what type of capability you want to add (maps and search) and default or advanced settings.

The add command automatically creates the backend configuration. Once all your configuration is complete run the following:

```sh
amplify push
```

A file called `aws-exports.js` that contains all geo-related configuration information is placed in your app's source directory.

For more information, you can visit the full [Amplify CLI Geo Maps docs](~/cli/geo/maps.md).

## Configure your application

Install the necessary dependencies by running the following command:

```sh
npm install aws-amplify@geo
```

> **Note:** Make sure that version `0.0.2-geo.6654` or above is installed.

Import and load the configuration file generated in previous step using Amplify CLI in your app. It’s recommended you add the Amplify configuration step to your app’s root entry point. For example `App.js` in React or `main.ts` in Angular or Ionic.

```javascript
import Amplify from 'aws-amplify';
import awsconfig from './aws-exports';
Amplify.configure(awsconfig);
```
