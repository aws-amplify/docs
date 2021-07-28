> Prerequisite: [Install and configure](~/cli/start/install.md) the Amplify CLI

## Maps with Amplify

AWS Amplify Storage module provides a simple mechanism for managing user content for your app in public, protected or private storage buckets. The Storage category comes with built-in support for Amazon S3.

There are two ways to add storage with Amplify - manual and automated. Both methods require the `auth` category with Amazon Cognito to also be enabled. If you are creating an S3 bucket from scratch, you should use the **Automated Setup**. However if you are reusing existing Cognito and S3 resources, you should opt for **Manual Setup**.

## Provision a map resource

## Get Map Data

### getAvailableMaps

### getDefaultMap

## Display a map
Add Amplify to your app with `yarn` or `npm`:

```bash
npm install -S aws-amplify
```

Add maplibre-gl-js to your app with `yarn` or `npm`:

```bash
npm install -S maplibre-gl
```

In your app’s entry point i.e. `App.js`, import and load the configuration file `aws-exports.js` which has been created and replaced into `/src` folder in the previous step.
```javascript
import { Map } from "maplibre-gl";
import Amplify, { Auth } from 'aws-amplify';
import awsconfig from './aws-exports';
Amplify.configure(awsconfig);
```

### Create a Maplibre map with Amplify

In your app create an async function to load `Auth` credentials, then create an [AmplifyMapLibreRequest](https://github.com/aws-amplify/maplibre-gl-js-amplify/blob/main/API.md#amplifymaplibrerequest) object and pass the transformRequest as well as the map name to a new maplibre-gl-js [Map](https://maplibre.org/maplibre-gl-js-docs/api/map/).
```javascript
async function initializeMap() {
    const credentials = await Auth.currentCredentials();
    const amplifyMapLibreRequest = new AmplifyMapLibreRequest(credentials, "us-west-2")
    const defaultMap = Geo.getDefaultMap();

    const map = new Map({
        container: "map",
        center: [-123.1187, 49.2819],
        zoom: 13,
        style: defaultMap.mapName,
        transformRequest: amplifyMapLibreRequest.transformRequest,
    });
}
```

## Display map with predefined places

After initialization of a maplibre-gl-js Map, call the utility function [drawPoints](https://github.com/aws-amplify/maplibre-gl-js-amplify/blob/main/API.md#drawpoints) by passing in a `sourceName`, coordinate data, a maplibre-gl-js Map, styling options, and the map style. For a full list of styling options check the `drawPoints` [documentation](https://github.com/aws-amplify/maplibre-gl-js-amplify/blob/main/API.md#drawpoints)

<amplify-callout>

The `drawPoints` method returns an object containing the string ids of the source and layers used to create the points on the map. These ids can be used to add any additional customizations through maplibre-gl-js [source](https://maplibre.org/maplibre-gl-js-docs/api/sources/), [paint](https://maplibre.org/maplibre-gl-js-docs/style-spec/layers/#paint-property), and [layer](https://maplibre.org/maplibre-gl-js-docs/style-spec/layers/) options.

</amplify-callout>

```javascript
map.on("load", function () {
    const defaultMap = Geo.getDefaultMap();

    drawPoints("myPointData", // Arbitrary source name
        [[-123.1187, 49.2819], [-122.849, 49.1913]], // Any coordinate or Feature data 
        map,
        {
            showCluster: true,
            unclusteredOptions: {
                showMarkerPopup: true,
            },
            clusterOptions: {
                showCount: true,
            },
        },
        defaultMap.style
    );
});

```

## Use existing Amazon Location Service Map resources

## API Reference

For the complete API documentation for Storage module, visit our [API Reference](https://aws-amplify.github.io/amplify-js/api/classes/storageclass.html).
