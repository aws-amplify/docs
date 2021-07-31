<amplify-callout>

**Note:** Amplify Geo is in developer preview and is not intended to be used in production environments. Please reach out to us for any feedback and/or issues [here](https://github.com/aws-amplify/amplify-js/issues)

</amplify-callout>

> Prerequisite: [Install and configure](~/cli/start/install.md) the Amplify CLI

## Provision a Search resource

The primary way to provision Geo resources is through the Amplify CLI. Currently, you need to install the CLI with the `@geo` tag in order to get the Geo functionality. You can use the following command to install this version globally.

```bash
npm i -g aws-amplify@geo
```

Once that is complete, you can run the following command from your project's root folder to add a `geo` resource:

```bash
amplify add geo
```

```
? Select which capability you want to add: (Use arrow keys)
  Map (visualize the geospatial data)
❯ Location search (search by places, addresses, coordinates)
```

From here you can follow the prompts to generate your new Place Index to be used for Search.

<!-- TODO: replace with proper link to CLI docs -->
For more information, you can visit the full [Amplify CLI Geo Search docs](~/lib/geo/search.md).

## Set up your app with the Geo category

First, make sure you've provisioned a "Location search" resource by running `amplify add geo`, selecting the **Location search (search by places, addresses, coordinates)** option and running `amplify push` to deploy.

Next, ensure you have [installed and configured the Amplify library](~/lib/geo/getting-started.md).

Then, import the `Geo` category package where you need it:

```javascript
import { Geo } from 'aws-amplify';
```

## Add location search functionality on map

To add a location search UI component to your map, you need to use the [maplibre-gl-geocoder](https://github.com/maplibre/maplibre-gl-geocoder) library with Amplify Geo's `maplibre-gl-js-amplify` package. `maplibre-gl-js-amplify` is a library that makes it easy to integration MapLibre with Amplify Geo. 

Install the necessary dependencies with the following command:

```bash
npm install -S @maplibre/maplibre-gl-geocoder maplibre-gl maplibre-gl-js-amplify 
```

First, create a map onto which you want to add the location search UI component. See the guide on [creating and displaying maps](~/lib/geo/maps.md). 

The location search UI component (`maplibre-gl-geocoder`) requires a "geocoding API" to facilitate location-based search. To define a "geocoding API", use the sample below that leverages Amplify Geo's `searchByText` capability. (See `const geocodingAPI = ...`).

Finally, add the location search UI component (`MaplibreGeocoder`) to the map.

```javascript
import Amplify, { Geo } from "aws-amplify";
import { AmplifyMapLibreRequest } from "maplibre-gl-js-amplify";
import maplibregl, { Map } from "maplibre-gl";
import MaplibreGeocoder from "@maplibre/maplibre-gl-geocoder";
import "@maplibre/maplibre-gl-geocoder/dist/maplibre-gl-geocoder.css";
import awsconfig from './aws-exports';

Amplify.configure(awsconfig);

async function initializeMap() {
    const el = document.createElement("div");
    el.setAttribute("id", "map");
    document.body.appendChild(el);

    const map = await AmplifyMapLibreRequest.createMapLibreMap({
        container: "map",
        center: [-123.1187, 49.2819],
        zoom: 11,
        region: "us-west-2"
    })

    // Define a geocoderApi to be used by `MaplibreGeocoder` that wraps the Amplify Geo APIs
    const geocoderApi = {
        forwardGeocode: async (config) => {
            const data = await Geo.searchByText(config.query);

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
            return { features }; // Must return an object with an array of features
        }
    };

    const geocoder = new MaplibreGeocoder(geocoderApi, {
        maplibregl: maplibregl,
        showResultMarkers: true,
    });
    map.addControl(geocoder);
}

initializeMap();
```

![A search box on the top right corner of a map](~/images/geocoder-search-box-map.png)

### Display the location search box outside the map

You can also use [maplibre-gl-geocoder](https://github.com/maplibre/maplibre-gl-geocoder) to display the location search UI component anywhere in your application, even outside the map.

To do so, extract the html element using function `onAdd()` and attach it anywhere in your DOM instead of adding it via the map's `addControl` function.

```javascript
const geocoder = new MaplibreGeocoder(geocoderApi, {
    showResultMarkers: true,
});
document.getElementById("search").appendChild(geocoder.onAdd());
```

![A search box](~/images/geocoder-search-box.png)

## Location-based search capabilities

Amplify Geo enables you to search for locations by text, addresses, or geo-coordinates.

### Search by text, address, business names, city, and more 

The `Geo.searchByText()` function enables you to search by free-form text, such as an address, name, city, or region to allow you to search for places or points of interest.

```javascript
Geo.searchByText("Amazon Go Store")
```

Optimize your search results further by providing:
- `countries` - to limit the search results to given countries (specified in [ISO Alpha-3 country codes](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-3))
- `maxResults` - to limit the maximum result set
- `biasPosition` - to act as the search origination location
- `searchAreaConstraints` - to limit the area to search inside of

 **Note:** Providing both `biasPosition` and `searchAreaConstraints` parameters simultaneously returns an error.

```javascript
const searchOptionsWithBiasPosition = {
  countries: string[], // Alpha-3 country codes
  maxResults: number, // 50 is the max and the default
  biasPosition: [
    latitude // number,
    longitude // number
  ], // Coordinates point to act as the center of the search
}

const searchOptionsWithSearchAreaConstraints = {
  countries: ["USA"], // Alpha-3 country codes
  maxResults: 25, // 50 is the max and the default
  searchAreaConstraints: [SWLatitude, SWLongitude, NELatitude, NELongitude], // Bounding box to search inside of
}

Geo.searchByText('Amazon Go Stores', searchOptionsWithBiasPosition)
```

This will return a list of places with coordinates that match the search constraints. A place can have additional metadata returned as shown in the example below.

```javascript
// returns
[
  {
    geometry: {
      point:
        [
          -122.34014899999994, // Latitude point
          47.61609000000004 // Longitude point
        ],
    },  
    addressNumber: "2131" // optional string for the address number alone
    country: "USA" // optional Alpha-3 country code
    label: "Amazon Go, 2131 7th Ave, Seattle, WA, 98121, USA" // Optional string
    municipality: "Seattle" // Optional string
    neighborhood: undefined // Optional string
    postalCode: "98121" // Optional string
    region: "Washington" // Optional string
    street: "7th Ave" // Optional string
    subRegion: "King County" // Optional string
  }
]
```

### Search by coordinates

The `Geo.searchByCoordinates()` API is a reverse Geocoder that takes a coordinate point as its input and will return information about what it finds at that point on the map. The returned object is same as in the `searchByText()` API above.

```javascript
Geo.searchByCoordinates([latitudePoint, longitudePoint])
```

You can optionally provide additional parameters to narrow your list of results.

```javascript
const searchOptionsWithBiasPosition = {
  maxResults: number, // 50 is the max and the default
}

Geo.searchByCoordinates([47.616179, -122.3399573], searchOptionsWithBiasPosition)
```


## API Reference
<!-- TODO: update with Geo link when it is shipped to production -->
<!-- For the complete API documentation for Geo module, visit our [API Reference](https://aws-amplify.github.io/amplify-js/api/classes/storageclass.html). -->
