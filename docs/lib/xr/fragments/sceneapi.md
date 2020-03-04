## Using optional progress handlers and options

To configure the appearance and the behavior of your Sumerian scene, you can use `sceneOptions` parameter in the method call:

```javascript
async loadAndStartScene() {
    const progressCallback = (progress) => {
        console.log(`Sumerian scene load progress: ${progress * 100}%`);
    }

    const sceneOptions = {
        progressCallback
    }
    
    await XR.loadScene("scene1", "sumerian-scene-dom-id", sceneOptions);
    XR.start("scene1");
}
```

## Retrieving the Scene Information

You can check the loading status of the scene with *isSceneLoaded* method. Also, you can use *isMuted* method to retrieve audio information about the loaded scene:

```javascript
if (XR.isSceneLoaded('scene1')) {

    if (XR.isMuted('scene1')) {
        // The scene is muted
        XR.setMuted('scene1', false) // Unmute
    }

}
```

## Entering VR mode

For compatible devices, you can enable VR mode for your scene. When a user enters VR mode with a controller attached, the VR controller component tracks its location in 3D space. 

Entering VR requires user input i.e. button press or similar.
{: .callout .callout--info}

```javascript
if (XR.isSceneLoaded('scene1')) {

    if (XR.isVRCapable('scene1')) {
        XR.enterVR('scene1')
    }

}
```

## Capturing Audio Events

XR Category's scene controller emits audio-related events during scene playback. You can subscribe to those events with `XR.onSceneEvent` and provide audio controls in your app, e.g.: providing a *volume on* button when the browser audio is disabled.

```javascript

XR.onSceneEvent('scene1', 'AudioEnabled', () => console.log ('Audio is enabled') );
XR.onSceneEvent('scene1', 'AudioDisabled', () => console.log ('Audio is disabled') ));

```

## Enabling Audio

In some browsers, playback of audio is disabled until the user provides input. To reliably enable audio in your scene, wait until the user's first input, such as a mouse click or screen touch, and then call the `enableAudio()` method with the scene name.

If the browser is blocking autoplay, the Audio Disabled event will get thrown the first time the scene attempts to PLAY audio, if no user input has been given
{: .callout .callout--info}

```javascript
XR.enableAudio('scene1')
```

## UI Components
### Sumerian Scene
After you have [published and configured your Sumerian scene]({%if jekyll.environment == 'production'%}{{site.amplify.docs_baseurl}}{%endif%}/js/xr#configuration) you can use a Sumerian Scene UI component in one of the following supported frameworks

Note: Each of the following UI components will inherit the height and width of the direct parent DOM element. Make sure to set the width and height styling on the parent DOM element to your desired size.
{: .callout .callout--info}

#### React
**Installation**
```
$ npm install aws-amplify-react
```

**Usage**
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
See [React configuration]({%if jekyll.environment == 'production'%}{{site.amplify.docs_baseurl}}{%endif%}/js/react#configuration) for additional configuration details.

#### Angular
**Installation**
```
$ npm install aws-amplify-angular
```

**Theme**

In *styles.css*:
```javascript
@import '~aws-amplify-angular/theme.css';
```

**Usage**
```javascript
// sceneName: the configured friendly scene you would like to load
<amplify-sumerian-scene sceneName="scene1"></amplify-sumerian-scene>
```

See [Angular configuration]({%if jekyll.environment == 'production'%}{{site.amplify.docs_baseurl}}{%endif%}/js/angular#configuration) for additional configuration details.

#### Ionic
**Installation**
```
$ npm install aws-amplify-angular
```

**Theme**

In *global.scss*:
```javascript
@import '~aws-amplify-angular/ionic.css';
```
**Usage**
```javascript
// sceneName: the configured friendly scene you would like to load
<amplify-sumerian-scene sceneName="scene1" framework="Ionic"></amplify-sumerian-scene> 
```
See [Ionic configuration]({%if jekyll.environment == 'production'%}{{site.amplify.docs_baseurl}}{%endif%}/js/angular#configuration) for additional configuration details.

#### Vue
**Installation**
```
$ npm install aws-amplify-vue
```

**Usage**
```javascript
// scene-name: the configured friendly scene you would like to load
<amplify-sumerian-scene scene-name="scene1"></amplify-sumerian-scene> 
```
See [Vue configuration]({%if jekyll.environment == 'production'%}{{site.amplify.docs_baseurl}}{%endif%}/js/vue#configuration) for additional configuration details.
