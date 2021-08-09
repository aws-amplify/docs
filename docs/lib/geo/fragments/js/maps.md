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
import awsconfig from './aws-exports';

Amplify.configure(awsconfig);
```

Next, create and render the [Map](https://maplibre.org/maplibre-gl-js-docs/api/map/) with the help of [AmplifyMapLibreRequest's](https://github.com/aws-amplify/maplibre-gl-js-amplify/blob/main/API.md#amplifymaplibrerequest).

Use the same `region` that you chose in the `amplify-cli` setup. This can also be found in your `aws-exports.js` file

```javascript
async function initializeMap() {
    const map = await AmplifyMapLibreRequest.createMapLibreMap({
        container: "map", // An HTML Element or HTML element ID to render the map in https://maplibre.org/maplibre-gl-js-docs/api/map/
        center: [-123.1187, 49.2819],
        zoom: 11,
        region: "<PUT_YOUR_REGION_HERE>"
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

First, import the `drawPoints` method in your app. Your import section should include look like this -

```javascript
import Amplify from 'aws-amplify';
import { AmplifyMapLibreRequest, drawPoints } from "maplibre-gl-js-amplify";
import awsconfig from './aws-exports';

Amplify.configure(awsconfig);
```

<amplify-callout>

The `drawPoints` method returns ids of the source and layers used to display the markers on the map. These ids can be used for further customization through maplibre-gl-js [source](https://maplibre.org/maplibre-gl-js-docs/api/sources/), [paint](https://maplibre.org/maplibre-gl-js-docs/style-spec/layers/#paint-property), and [layer](https://maplibre.org/maplibre-gl-js-docs/style-spec/layers/) options.

</amplify-callout>

Next, use the following code snippet when you want to display the markers on the map. Add it to the `initializeMap()` function if you want the markers to show up on map load.

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
    mapName: 'myAmplifyGeoEsriStreetMap',
    style: 'VectorEsriStreets'
  },
  {
    mapName: 'myAmplifyGeoEsriTopographicMap',
    style: 'VectorEsriTopographic'
  },
]
```

You can resize and customize a map with the `resize` and `setStyle` functions:

```javascript
map.setStyle("myAmplifyGeoEsriTopographicMap"); // map name received from getAvailableMaps()
map.resize(); // forces the map to re-render
```

## Add map to html website

To display a map on your html website, add the following scripts to your html webpage.

```html
<link href="https://cdn.amplify.aws/packages/maplibre-gl/1.14.0/maplibre-gl.css" rel="stylesheet" integrity="sha384-sZlnv03zeGbcXDiuZ98TrNVZFIfpsVhN0itUxRFONLo6lOZskJPIMlOwDy+nloRF" crossorigin="anonymous" referrerpolicy="no-referrer"></link>
<script src="https://cdn.amplify.aws/packages/maplibre-gl/1.14.0/maplibre-gl.js" integrity="sha384-jWZKsznBFj0Nl3kUaRKmmk89Hew9zDhTnmOz0pOLceWY7iag+l/8QNPeD0cQYaVG" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
<script src="https://cdn.amplify.aws/packages/core/4.2.1-geo/aws-amplify-core.min.js" integrity="sha384-ZJ0BipyxRjDHPcTLilxOMRf9grNEwTTUOmr8l8MUprgnpAnpK4Fz20ndOQElCtWb" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
<script src="https://cdn.amplify.aws/packages/auth/5.0.4-geo/aws-amplify-auth.min.js" integrity="sha384-rqyJfFR2070OQyXIQqomdGCYa6TaR/1asvv2oaz9wB6R8YSiIBC08mWwgVtr1NNk" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
<script src="https://cdn.amplify.aws/packages/geo/0.0.2-geo.6648/aws-amplify-geo.min.js" integrity="sha384-VBNaB4q1F3zSs1BgIf7mYogamWN2lITAmfVw3FyxuyFdyaKucigyjrJ6RmQvdbN2" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
<script src="https://cdn.amplify.aws/packages/maplibre-gl-js-amplify/1.0.2/maplibre-gl-js-amplify.umd.min.js" integrity="sha384-g2Tb3Pa8Gpt7OYj324blBhR91QsJeBhvwWqRwcjRHvWk8XE8rjiUs8E0aW/iDnPe" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
```

Next, add a div element with id `map` anywhere in your webpage where you want to render the map. Include the following code snippet to configure Amplify (update the `aws_exports.js` file path accordingly) and instantiate the map. 

Use the same `region` that you chose in the `amplify-cli` setup. This can also be found in your `aws-exports.js` file.

```html
<script type="module">
    import awsconfig from "./aws-exports.js";
    const { Amplify } = aws_amplify_core;
    const { AmplifyMapLibreRequest } = maplibreAmplify;
    Amplify.configure(awsconfig);
    AmplifyMapLibreRequest.createMapLibreMap({
        container: "map",
        center: [-123.1187, 49.2819],
        zoom: 13,
        region: "<PUT_YOUR_REGION_HERE>"
    });
</script>
```

<!-- If you provisioned your location resources manually, you can use this [guide]() to configure Amplify.-->
### Sample application
```html
<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8">
        <title>Display a map on a webpage</title>
        <meta name="viewport" content="initial-scale=1,maximum-scale=1,user-scalable=no">
        <link href="https://cdn.amplify.aws/packages/maplibre-gl/1.14.0/maplibre-gl.css" rel="stylesheet" integrity="sha384-sZlnv03zeGbcXDiuZ98TrNVZFIfpsVhN0itUxRFONLo6lOZskJPIMlOwDy+nloRF" crossorigin="anonymous" referrerpolicy="no-referrer"></link>
        <script src="https://cdn.amplify.aws/packages/maplibre-gl/1.14.0/maplibre-gl.js" integrity="sha384-jWZKsznBFj0Nl3kUaRKmmk89Hew9zDhTnmOz0pOLceWY7iag+l/8QNPeD0cQYaVG" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
        <script src="https://cdn.amplify.aws/packages/core/4.2.1-geo/aws-amplify-core.min.js" integrity="sha384-ZJ0BipyxRjDHPcTLilxOMRf9grNEwTTUOmr8l8MUprgnpAnpK4Fz20ndOQElCtWb" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
        <script src="https://cdn.amplify.aws/packages/auth/5.0.4-geo/aws-amplify-auth.min.js" integrity="sha384-rqyJfFR2070OQyXIQqomdGCYa6TaR/1asvv2oaz9wB6R8YSiIBC08mWwgVtr1NNk" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
        <script src="https://cdn.amplify.aws/packages/geo/0.0.2-geo.6648/aws-amplify-geo.min.js" integrity="sha384-VBNaB4q1F3zSs1BgIf7mYogamWN2lITAmfVw3FyxuyFdyaKucigyjrJ6RmQvdbN2" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
        <script src="https://cdn.amplify.aws/packages/maplibre-gl-js-amplify/1.0.2/maplibre-gl-js-amplify.umd.min.js" integrity="sha384-g2Tb3Pa8Gpt7OYj324blBhR91QsJeBhvwWqRwcjRHvWk8XE8rjiUs8E0aW/iDnPe" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
        <style>
            body { margin: 0; padding: 0; }
            #map { position: absolute; top: 0; bottom: 0; width: 100%; }
        </style>
    </head>
    <body>
        <div id="map"></div>
        <script type="module">
            import awsconfig from "./aws-exports.js";
            const { Amplify } = aws_amplify_core;
            const { AmplifyMapLibreRequest } = maplibreAmplify;
            Amplify.configure(awsconfig);
            AmplifyMapLibreRequest.createMapLibreMap({
                container: "map",
                center: [-123.1187, 49.2819],
                zoom: 13,
                region: "<PUT_YOUR_REGION_HERE>"
            });
        </script>
    </body>
</html>
```
