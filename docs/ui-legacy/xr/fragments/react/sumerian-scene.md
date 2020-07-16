Once you have [published and configured your Sumerian scene](~/lib/xr/getting-started.md) you can use a Sumerian Scene UI component in one of the following supported frameworks

<amplify-callout>

Note: Each of the following UI components will inherit the height and width of the direct parent DOM element. Make sure to set the width and height styling on the parent DOM element to your desired size.

</amplify-callout>

## Installation
```
$ npm install aws-amplify-react
```

## Usage
```javascript
import { SumerianScene } from 'aws-amplify-react';
...

render() {
  return (
    <div className="App">
      // sceneName: the configured friendly scene you would like to load
      <SumerianScene sceneName="scene1" />
    </div>
  );
}
```
