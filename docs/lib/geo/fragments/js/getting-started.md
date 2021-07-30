> Prerequisite: [Install and configure the Amplify CLI](~/cli/start/install.md)

## Provisioning resources

The primary way to provision Geo resources is through the Amplify CLI. Currently, Amplify Geo is in developer preview and you need to install the CLI with the `@geo` tag. You can use the following command to install this version globally.

```sh
npm i -g @aws-amplify/cli@geo
```

Now, let's make sure that the right version was installed:

```sh
amplify --version
```

That should show a version with the `-geo.x` tag, such as:

```sh
5.2.2-geo.0
```


Once that is complete, you can run the following command from your project's root folder to add a `geo` resource:

```sh
amplify add geo
```

The CLI will prompt configuration options for the Geo category such as what type of capability you want to add (maps and search) and default or advanced settings.

The add command automatically creates the backend configuration. Once all your configuration is complete run the following:

```sh
amplify push
```

A configuration file called `aws-exports.js` will be copied to your configured source directory, for example `./src`.

## Configure your app

Install the necessary dependencies by running the following command:

```sh
npm install aws-amplify@geo maplibre-gl maplibre-gl-js-amplify
```

Import and load the configuration file generated in previous step using Amplify CLI in your app. It’s recommended you add the Amplify configuration step to your app’s root entry point. For example `App.js` in React or `main.ts` in Angular or Ionic.

```javascript
import Amplify, { Auth } from 'aws-amplify';
import awsconfig from './aws-exports';
Amplify.configure(awsconfig);
```
## Display a map in your app
Import maplibre and maplibre-gl-js-amplify in your app and use the `createMapLibreMap` to initialize a maplibre Map instance.

```javascript
import Amplify, { Auth } from 'aws-amplify';
import awsconfig from './aws-exports';
import { Map } from "maplibre-gl";
import { AmplifyMapLibreRequest } from "maplibre-gl-js-amplify";

Amplify.configure(awsconfig);

async function initializeMap() {
    const map = await AmplifyMapLibreRequest.createMapLibreMap({
        container: "map",
        center: [-123.1187, 49.2819],
        zoom: 11
    });
}
```
