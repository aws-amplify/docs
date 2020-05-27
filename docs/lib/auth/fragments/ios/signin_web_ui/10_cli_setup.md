In terminal, navigate to your project, run `amplify add auth`, and choose the following options:


```terminal
? Do you want to use the default authentication and security configuration? 
    `Default configuration with Social Provider (Federation)`
? How do you want users to be able to sign in? 
    `Username`
? Do you want to configure advanced settings? 
    `No, I am done.`
? What domain name prefix you want us to create for you? 
    `(default)`
? Enter your redirect signin URI: 
    `myapp://`
? Do you want to add another redirect signin URI 
    `No`
? Enter your redirect signout URI: 
    `myapp://`
? Do you want to add another redirect signout URI 
    `No`
? Select the social providers you want to configure for your user pool: 
    `<hit enter>`
```

Once finished, run `amplify push` to publish your changes.
