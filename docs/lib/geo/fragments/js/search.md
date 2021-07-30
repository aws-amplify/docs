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

## Set up your app with the AWS Amplify Geo category

First, make sure to have the [Amplify configuration step](~/lib/geo/getting-started.md) done in your app's root entry point.

Then, bring in the `Geo` category package where you need it:

```javascript
import { Geo } from 'aws-amplify';
```

## Display search box on a map

You can use [maplibre-gl-geocoder](https://github.com/maplibre/maplibre-gl-geocoder) with Amplify Geo to add fully functional search component on your map. Install maplibre-gl-geocoder with the following command:

```bash
npm install -S @maplibre/maplibre-gl-geocoder
```

If you haven't already add maplibre-gl-js and maplibre-gl-js-amplify to your app with `yarn` or `npm`:

```bash
npm install -S maplibre-gl maplibre-gl-js-amplify
```

Create a map onto which you can add the maplibre-gl-geocoder as a [control](https://maplibre.org/maplibre-gl-js-docs/api/markers/#icontrol). Documentation on creating and displaying [maps](~/lib/geo/maps.md). maplibre-gl-geocoder requires a geocoding API for exexuting the search requests. You can easily define a geocoding API that wraps the Amplify Geo APIs. Finally we add the geocoder control to the map.

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

## Display location search box

Add maplibre-gl-geocoder to your app with `yarn` or `npm`:

```bash
npm install -S @maplibre/maplibre-gl-geocoder
```

In your app create an element for holding the search box. MaplibreGeocoder requires a geocoding API so define a geocoding API that wraps the Amplify Geo API. Pass this Geocoding API to a new MaplibreGeocoder and append it to the existing search element.
```javascript
import { Geo } from "aws-amplify";
import MaplibreGeocoder from "@maplibre/maplibre-gl-geocoder";
import "@maplibre/maplibre-gl-geocoder/dist/maplibre-gl-geocoder.css";

// Remove this portion if you have already defined your own element to container the searchbox
const el = document.createElement("div");
el.setAttribute("id", "search");

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
    showResultMarkers: true,
});
document.getElementById("search").appendChild(geocoder.onAdd());

// Do something with the resulting search data
geocoder.on("results", (results) => {
    console.log(results);
});
```

![A search box](~/images/geocoder-search-box.png)


## Search by text

The `Geo.searchByText` API Geocodes free-form text, such as an address, name, city, or region to allow you to search for places or points of interest.

```javascript
geo.searchByText("Amazon Go Store")
```

We also include options to apply additional parameters to narrow your list of results.

NOTE: You can search for places near a given position using `biasPosition`, or filter results within a bounding box using `searchAreaConstraints`. Providing both parameters simultaneously returns an error.

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

geo.searchByText('Amazon Go Stores', searchOptionsWithBiasPosition)
```

This will return a list of places that match the search constraints.

```javascript
// returns
[
  {
    addressNumber: "2131" // optional string for the address number alone
    country: "USA" // optional Alpha-3 country code
    geometry: {
      point:
        [
          -122.34014899999994, // Latitude point
          47.61609000000004 // Longitude point
        ],
      },
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

## Search by coordinates

The `geo.searchByCoordinates` API is a reverse Geocoder that takes a coordinate point as it's input and will return information about what it finds at that point on the map.

```javascript
geo.searchByCoordinates([latitudePoint, longitudePoint])
```

We also include options to apply additional parameters to narrow your list of results.

```javascript
const searchOptionsWithBiasPosition = {
	maxResults: number, // 50 is the max and the default
}

geo.searchByCoordinates([47.616179, -122.3399573], searchOptionsWithBiasPosition)
```

This will return a list of places that match the search constraints.

```javascript
// returns
{
  addressNumber: "2131" // optional string for the address number alone
  country: "USA" // optional Alpha-3 country code
  geometry: {
    point:
      [
        -122.34014899999994, // Latitude point
        47.61609000000004 // Longitude point
      ],
    },
  label: "Amazon Go, 2131 7th Ave, Seattle, WA, 98121, USA" // Optional string
  municipality: "Seattle" // Optional string
  neighborhood: undefined // Optional string
  postalCode: "98121" // Optional string
  region: "Washington" // Optional string
  street: "7th Ave" // Optional string
  subRegion: "King County" // Optional string
}
```

## API Reference
<!-- TODO -->
For the complete API documentation for Geo module, visit our [API Reference](https://aws-amplify.github.io/amplify-js/api/classes/geoclass.html).
