```javascript
async function rememberDevice() {
    try{
        const result = await Amplify.Auth.rememberDevice()
        console.log(result)
    }catch (error) {
        console.log('Error remembering device', error)
    }
}
```