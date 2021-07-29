> Prerequisite: [Install and configure](~/cli/start/install.md) the Amplify CLI

## Maps with Amplify

## Provision a map resource

The primary way to provision Geo map resources is through the Amplify CLI. Currently, you need to install the CLI with the `@geo` tag in order to get the Geo functionality. You can use the following command to install this version globally.

```bash
npm i -g @aws-amplify/cli@geo
```

Once that is complete, you can run the following command from your project's root folder to add a `geo` resource:

```bash
amplify add geo
```

```
? Select which capability you want to add: (Use arrow keys)
❯ Map (visualize the geospatial data)
  Location search (search by places, addresses, coordinates)
```

From here you can follow the prompts to generate your new Map resource.

<!-- TODO: replace with proper link to CLI docs -->
For more information, you can visit the full [Amplify CLI Geo Maps docs](~/lib/geo/maps.md).

## Configure your application

First, lets add the packages you need for Geo:

```bash
npm i -S aws-amplify @aws-amplify/geo
```

Now, we need to pull in the `Geo` class and `aws-exports` configuration into your project and configure Amplify

```javascript
import Amplify from "aws-amplify";
import Geo from "@aws-amplify/geo";
import awsconfig from "./aws-exports";

Amplify.configure(awsconfig)

const geo = new Geo();
```

## Get Map Data

Currently, we have two APIs for getting data about what map resources are available.

### Get the default map

One map is always set as the default map. In order to quickly get information about that map, we have the `getDefaultMap` API.

```javascript
geo.getDefaultMap();
```

This will return a single map, which is set as the current default:

```javascript
// returns
{
  mapName: 'myAmplifyGeoErsiStreetMap',
  style: 'VectorEsriStreets'
}
```

### Get all available map resources

The `getAvailableMaps` api will fetch information for all maps that are available to be displayed. In the context of Amazon Location Services maps, it will fetch the map name and the style of all maps that were generated using the Amplify CLI. This is useful is you would like to give your users a variety of maps styles to choose from.

```javascript
geo.getAvailableMaps();
```

This will return an array of maps that are available:

```javascript
//returns
[
  {
    mapName: 'myAmplifyGeoErsiStreetMap',
    style: 'VectorEsriStreets'
  },
  {
    mapName: 'myAmplifyGeoErsiTopographicMap',
    style: 'VectorEsriStreetsVectorEsriTopographic'
  },
]
```

## Display a map

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

In your app create an async function to load `Auth` credentials. Use [AmplifyMapLibreRequest's](https://github.com/aws-amplify/maplibre-gl-js-amplify/blob/main/API.md#amplifymaplibrerequest) static function `createMapLibreMap` to create a new maplibre-gl-js [Map](https://maplibre.org/maplibre-gl-js-docs/api/map/).
```javascript
async function initializeMap() {
    const defaultMap = Geo.getDefaultMap();
    const map = await AmplifyMapLibreRequest.createMapLibreMap({
        container: "map",
        center: [-123.1187, 49.2819],
        zoom: 11,
        style: defaultMap.mapName,
        region: "us-west-2"
    })
}
```

![A map centered on Vancouver](~/images/display-map.png)

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

![A map with points](~/images/display-map-with-points.png)

## Use existing Amazon Location Service Map resources
<!-- TODO -->
## API Reference

<!-- TODO: update with Geo link when finished -->
For the complete API documentation for Geo module, visit our [API Reference](https://aws-amplify.github.io/amplify-js/api/classes/storageclass.html).
