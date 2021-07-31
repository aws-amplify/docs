<amplify-callout>

**Note:** Amplify Geo is in developer preview and is not intended to be used in production environments. Please reach out to us for any feedback and/or issues [here](https://github.com/aws-amplify/amplify-js/issues)

</amplify-callout>

## Display a map

First, make sure you've provisioned a map resource by running `amplify add geo`, selecting the **Map (visualize the geospatial data)** option and running `amplify push` to deploy

To render a map, the [MapLibre GL](https://github.com/maplibre/maplibre-gl-js) library and the `maplibre-gl-js-amplify` package are required. MapLibre GL is an open source map rendering library for JavaScript. `maplibre-gl-js-amplify` is a library that makes it easy to integrate MapLibre with Amplify Geo.

Add the dependencies to your app:

```bash
npm install -S maplibre-gl maplibre-gl-js-amplify
```

Next, configure the Amplify library in your app. All geo-related configuration information is available within the `aws-exports.js` file. Add the following to your app's entry point (i.e. App.js):

```javascript
import Amplify from 'aws-amplify';
import { AmplifyMapLibreRequest } from "maplibre-gl-js-amplify";
import { Map } from "maplibre-gl";
import awsconfig from './aws-exports';

Amplify.configure(awsconfig);
```

Next, create and render the [Map](https://maplibre.org/maplibre-gl-js-docs/api/map/) with the help of [AmplifyMapLibreRequest's](https://github.com/aws-amplify/maplibre-gl-js-amplify/blob/main/API.md#amplifymaplibrerequest).
```javascript
async function initializeMap() {
    const map = await AmplifyMapLibreRequest.createMapLibreMap({
        container: "map", // An HTML Element or HTML element ID to render the map in https://maplibre.org/maplibre-gl-js-docs/api/map/
        center: [-123.1187, 49.2819],
        zoom: 11,
        region: "us-west-2"
    })
}

initializeMap();
```

![A map centered on Vancouver](~/images/display-map.png)

## Display markers on map

To display markers on a map, use the [drawPoints](https://github.com/aws-amplify/maplibre-gl-js-amplify/blob/main/API.md#drawpoints) function. `drawPoints` expects:

- `sourceName` - specifies the layer on which the markers are rendered on. You can edit existing markers by passing the same `sourceName`
- coordinate data - the coordinate data of the markers to be displayed
- a maplibre-gl-js Map - the map object on which to render the markers

<amplify-callout>

The `drawPoints` method returns ids of the source and layers used to display the markers on the map. These ids can be used for further customization through maplibre-gl-js [source](https://maplibre.org/maplibre-gl-js-docs/api/sources/), [paint](https://maplibre.org/maplibre-gl-js-docs/style-spec/layers/#paint-property), and [layer](https://maplibre.org/maplibre-gl-js-docs/style-spec/layers/) options.

</amplify-callout>

```javascript
map.on("load", function () {
    drawPoints("mySourceName", // Arbitrary source name
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
        }
    );
});

```
![A map with points](~/images/display-map-with-points.png)

## Display different map styles

The `getAvailableMaps` API fetches information for all maps that are available to be displayed.

This is useful if you would like to give your users a variety of maps styles to choose from.

```javascript
Geo.getAvailableMaps();
```

The available maps are returned as an array with the following contents:

```javascript
//returns
[
  {
    mapName: 'myAmplifyGeoErsiStreetMap',
    style: 'VectorEsriStreets'
  },
  {
    mapName: 'myAmplifyGeoErsiTopographicMap',
    style: 'VectorEsriTopographic'
  },
]
```

You can resize and customize a map with the `resize` and `setStyle` functions:

```javascript
map.setStyle("myAmplifyGeoErsiTopographicMap"); // map name received from getAvailableMaps()
map.resize(); // forces the map to re-render
```
