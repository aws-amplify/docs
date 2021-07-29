> Prerequisite: [Install and configure](~/cli/start/install.md) the Amplify CLI

## Search with Amplify

AWS Amplify Storage module provides a simple mechanism for managing user content for your app in public, protected or private storage buckets. The Storage category comes with built-in support for Amazon S3.

There are two ways to add storage with Amplify - manual and automated. Both methods require the `auth` category with Amazon Cognito to also be enabled. If you are creating an S3 bucket from scratch, you should use the **Automated Setup**. However if you are reusing existing Cognito and S3 resources, you should opt for **Manual Setup**.

## Provision a place index

## Search by text

## Search by coordinates

## Display location search box

Add Amplify Geo to your app with `yarn` or `npm`:

```bash
npm install -S @aws-amplify/geo
```

Add maplibre-gl-geocoder to your app with `yarn` or `npm`:

```bash
npm install -S @maplibre/maplibre-gl-geocoder
```

In your app create an element for holding the search box. MaplibreGeocoder requires a geocoding API so define a geocoding API that wraps the Amplify Geo API. Pass this Geocoding API to a new MaplibreGeocoder and append it to the existing search element.
```javascript
import MaplibreGeocoder from "@maplibre/maplibre-gl-geocoder";
import { Geo } from "@aws-amplify/geo";

// Remove this portion if you have already defined your own element to container the searchbox
const el = document.createElement("div");
el.setAttribute("id", "search");

// Define a geocoderApi to be used by `MaplibreGeocoder` that wraps the Amplify Geo APIs
const geocoderApi = {
    forwardGeocode: async (config) => {
        const data = await Geo.searchByText(config.query, {
            biasPosition: config.proximity,
            searchAreaConstraints: config.bbox,
            countries: config.countries,
            maxResults: config.limit,
          });

        const features = data.map((result) => {
            const { geometry, ...otherResults } = result;
            return {
                type: "Feature",
                geometry: { type: "Point", coordinates: geometry.point },
                properties: { ...otherResults },
                place_name: otherResults.label,
                text: otherResults.label,
                center: geometry.point,
            };
        });
        return { features };
    }
};

const geocoder = new MaplibreGeocoder(geocoderApi, {
    showResultMarkers: true,
});
document.getElementById("search").appendChild(geocoder.onAdd());

// Do something with the resulting search data
geocoder.on("results", (results) => {
    console.log(results);
});
```

![A search box](~/images/geocoder-search-box.png)

## Display search box with a map

Add Amplify Geo to your app with `yarn` or `npm`:

```bash
npm install -S @aws-amplify/geo
```

Add maplibre-gl-geocoder to your app with `yarn` or `npm`:

```bash
npm install -S @maplibre/maplibre-gl-geocoder
```

Add maplibre-gl-js to your app with `yarn` or `npm`:

```bash
npm install -S maplibre-gl
```

### Create a maplibre-gl-js Map
Create a map onto which you can add the MaplibreGeocoder as a [control](https://maplibre.org/maplibre-gl-js-docs/api/markers/#icontrol). Documentation on creating and displaying [maps](~/lib/geo/maps.md)

```javascript
const map = await AmplifyMapLibreRequest.createMapLibreMap({
    container: "map",
    center: [-123.1187, 49.2819],
    zoom: 11,
    style: defaultMap.mapName,
    region: "us-west-2"
})
```

As with the above approach the setup for a new MaplibreGeocoder will be the same but instead of adding the MaplibreGeocoder to the search element add it as a control to a maplibre-gl-js Map instead.
```javascript
import maplibregl, { Map } from "maplibre-gl";
import { Geo } from "@aws-amplify/geo";

// Define a geocoderApi to be used by `MaplibreGeocoder` that wraps the Amplify Geo APIs
const geocoderApi = {
    forwardGeocode: async (config) => {
        const data = await Geo.searchByText(config.query, {
            biasPosition: config.proximity,
            searchAreaConstraints: config.bbox,
            countries: config.countries,
            maxResults: config.limit,
          });

        const features = data.map((result) => {
            const { geometry, ...otherResults } = result;
            return {
                type: "Feature",
                geometry: { type: "Point", coordinates: geometry.point },
                properties: { ...otherResults },
                place_name: otherResults.label,
                text: otherResults.label,
                center: geometry.point,
            };
        });
        return { features };
    }
};

const geocoder = new MaplibreGeocoder(geocoderApi, {
    maplibregl: maplibregl,
    showResultMarkers: true,
});
map.addControl(geocoder);
```

![A search box on the top right corner of a map](~/images/geocoder-search-box-map.png)

## Use existing Amazon Location Service search resources

## API Reference

For the complete API documentation for Storage module, visit our [API Reference](https://aws-amplify.github.io/amplify-js/api/classes/storageclass.html).
