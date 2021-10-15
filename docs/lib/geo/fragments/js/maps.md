<amplify-callout>

**Note:** Amplify Geo is in developer preview and is not intended to be used in production environments. Please reach out to us for any feedback and/or issues [here](https://github.com/aws-amplify/amplify-js/issues)

</amplify-callout>

## Display a map

First, ensure you've provisioned an Amazon Location Service Map resource and configured your app using the instructions in either [Getting started](~/lib/geo/getting-started.md) or [Use existing resources](~/lib/geo/existing-resources.md) guide.

To render a map, the [MapLibre GL](https://github.com/maplibre/maplibre-gl-js) and the `maplibre-gl-js-amplify` libraries are required. MapLibre GL is an open source map rendering library and `maplibre-gl-js-amplify` library makes it easy to integrate MapLibre with Amplify Geo and handles Authentication.

Add the dependencies to your app:

```bash
npm install -S maplibre-gl maplibre-gl-js-amplify
```

> **Note:** Make sure that `maplibre-gl-js-amplify` version `1.0.5` or above is installed.

Add [maplibre-gl.css](https://maplibre.org/maplibre-gl-js-docs/api/#mapbox-css) and styles in the `head` element of your html page. (In a new react app, it will be `index.html` in `public` folder)
```html
<link href="https://cdn.amplify.aws/packages/maplibre-gl/1.14.0/maplibre-gl.css" rel="stylesheet"
  integrity="sha384-sZlnv03zeGbcXDiuZ98TrNVZFIfpsVhN0itUxRFONLo6lOZskJPIMlOwDy+nloRF" crossorigin="anonymous"
  referrerpolicy="no-referrer">
<style> #map { position: absolute; top: 0; bottom: 0; width: 100%; } </style>
```

Import the library into your application:

```javascript
import { createMap } from "maplibre-gl-js-amplify";
```

Next, create and render the [Map](https://maplibre.org/maplibre-gl-js-docs/api/map/) with the help of [createMap](https://github.com/aws-amplify/maplibre-gl-js-amplify/blob/main/API.md#createmap).

```javascript
async function initializeMap() {
    const map = await createMap({
        container: "map", // An HTML Element or HTML element ID to render the map in https://maplibre.org/maplibre-gl-js-docs/api/map/
        center: [-123.1187, 49.2819],
        zoom: 11,
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
import { AmplifyMapLibreRequest, drawPoints } from "maplibre-gl-js-amplify";
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
<script src="https://cdn.amplify.aws/packages/core/4.2.1-geo.20/aws-amplify-core.min.js" integrity="sha384-ZJ0BipyxRjDHPcTLilxOMRf9grNEwTTUOmr8l8MUprgnpAnpK4Fz20ndOQElCtWb" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
<script src="https://cdn.amplify.aws/packages/auth/4.1.3-geo.20/aws-amplify-auth.min.js" integrity="sha384-rqyJfFR2070OQyXIQqomdGCYa6TaR/1asvv2oaz9wB6R8YSiIBC08mWwgVtr1NNk" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
<script src="https://cdn.amplify.aws/packages/geo/0.0.2-geo.6654/aws-amplify-geo.min.js" integrity="sha384-3WpvDe5YSr8Xdmc31s/1cKXlG5DCmeQA2PZkuQUIgwPPwGNY/kbrTYYItxSO8JJJ" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
<script src="https://cdn.amplify.aws/packages/maplibre-gl-js-amplify/1.0.5/maplibre-gl-js-amplify.umd.min.js" integrity="sha384-mIlJ3nhWvPKhs796/34/EVG0obtz0tzOtxdIWctuJ6Rt7KUwDQQQG394mZ2Nv6WE" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
```

Next, add a div element with id `map` anywhere in your webpage where you want to render the map. Include the following code snippet to configure Amplify (update the `aws_exports.js` file path accordingly) and instantiate the map.

```html
<script type="module">
    import awsconfig from "./aws-exports.js";
    const { Amplify } = aws_amplify_core;
    const { createMap } = maplibreAmplify;
    Amplify.configure(awsconfig);
    createMap({
        container: "map",
        center: [-123.1187, 49.2819],
        zoom: 13,
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
        <script src="https://cdn.amplify.aws/packages/core/4.2.1-geo.20/aws-amplify-core.min.js" integrity="sha384-ZJ0BipyxRjDHPcTLilxOMRf9grNEwTTUOmr8l8MUprgnpAnpK4Fz20ndOQElCtWb" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
        <script src="https://cdn.amplify.aws/packages/auth/4.1.3-geo.20/aws-amplify-auth.min.js" integrity="sha384-rqyJfFR2070OQyXIQqomdGCYa6TaR/1asvv2oaz9wB6R8YSiIBC08mWwgVtr1NNk" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
        <script src="https://cdn.amplify.aws/packages/geo/0.0.2-geo.6654/aws-amplify-geo.min.js" integrity="sha384-3WpvDe5YSr8Xdmc31s/1cKXlG5DCmeQA2PZkuQUIgwPPwGNY/kbrTYYItxSO8JJJ" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
        <script src="https://cdn.amplify.aws/packages/maplibre-gl-js-amplify/1.0.5/maplibre-gl-js-amplify.umd.min.js" integrity="sha384-mIlJ3nhWvPKhs796/34/EVG0obtz0tzOtxdIWctuJ6Rt7KUwDQQQG394mZ2Nv6WE" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
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
            const { createMap } = maplibreAmplify;
            Amplify.configure(awsconfig);
            createMap({
                container: "map",
                center: [-123.1187, 49.2819],
                zoom: 13,
            });
        </script>
    </body>
</html>
```
