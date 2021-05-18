```javascript
async function forgetDevice() {
    try{
        const result = await Amplify.Auth.forgetDevice()
        console.log(result)
    }catch (error) {
        console.log('Error forgeting device', error)
    }
}
```