## Install Dependencies

After initialization in your project directory with `amplify init`, edit your `Podfile` with the following:

```ruby
target 'MyApp' do             ##Replace MyApp with your application name
  use_frameworks!
  pod 'AWSMobileClient', '~> 2.12.0'      # Required dependency
  pod 'AWSAuthUI', '~> 2.12.0'            # Optional dependency required to use drop-in UI
  pod 'AWSUserPoolsSignIn', '~> 2.12.0'   # Optional dependency required to use drop-in UI
end
```

Next run the following command:

```bash
amplify push
pod install --repo-update
```

Open the **.xcworkspace** file of your project (close the **.xcodeproj** file if you already have it open). Drag in the `awsconfiguration.json` file from finder into your **.xcworkspace**. Finally, build your project once to ensure all frameworks are pulled in and compile correctly.

## Automated Setup

Run the following command in your project's root folder:

```bash
$ amplify add auth
```

If you have previously enabled an Amplify category that uses Auth behind the scenes, e.g. API category, you may already have an Auth configuration. In such a case, run `amplify auth update` command to edit your configuration.
{: .callout .callout--info}

The CLI prompts will help you to customize your auth flow for your app. With the provided options, you can:
- Customize sign-in/registration flow 
- Customize email and SMS messages for Multi-Factor Authentication
- Customize attributes for your users, e.g. name, email
- Enable 3rd party authentication providers, e.g. Facebook, Twitter, Google and Amazon

After configuring your Authentication options, update your backend:

```bash
$ amplify push
```

A configuration file called `awsconfiguration.json` will be copied to your project source directory. In the Finder, drag the file into Xcode under the top Project Navigator folder. When the `Options` dialog box appears, do the following:

* Clear the `Copy items if needed` check box.
* Choose `Create groups`, and then choose `Next`.

[Click here to learn more about this process.](./start#step-3-how-it-works)

### Lambda Triggers

The CLI allows you to configure [Lambda Triggers](https://docs.aws.amazon.com/cognito/latest/developerguide/cognito-user-identity-pools-working-with-aws-lambda-triggers.html) for your AWS Cognito User Pool.  These enable you to add custom functionality to your registration and authentication flows. [Read more]({%if jekyll.environment == 'production'%}{{site.amplify.docs_baseurl}}{%endif%}/cli-toolchain/)

## Manual Setup

For manual configuration without the CLI, you must have an `awsconfiguration.json` file with the following:
- Cognito User Pools: `CognitoUserPool : { Default: ...}`
- Cognito Identity Pools: `IdentityManager` and `CredentialsProvider: {CognitoIdentity: ...}`

```xml
    {
        "IdentityManager": {
            "Default": {}
        },
        "CredentialsProvider": {
            "CognitoIdentity": {
                "Default": {
                    "PoolId": "XX-XXXX-X:XXXXXXXX-XXXX-1234-abcd-1234567890ab",
                    "Region": "XX-XXXX-X"
                }
            }
        },
        "CognitoUserPool": {
            "Default": {
                "PoolId": "XX-XXXX-X_abcd1234",
                "AppClientId": "XXXXXXXX",
                "AppClientSecret": "XXXXXXXXX",
                "Region": "XX-XXXX-X"
            }
        }
    }
```

If you are using both Cognito User Pools and Identity Pools, such as in Federated scenarios, you will need all of the keys mentioned above.

## Initialization

Open the AppDelegate of your Xcode project, or optionally in your View Controller `viewDidLoad()` and invoke the `initialize` routine:

```swift
import AWSMobileClient

    override func viewDidLoad() {
        super.viewDidLoad()
        AWSMobileClient.default().initialize { (userState, error) in
            if let userState = userState {
                print("UserState: \(userState.rawValue)")
            } else if let error = error {
                print("error: \(error.localizedDescription)")
            }
        }
    }
```

Build and run your program to see the initialized client in Xcode messages. Since you haven't logged in yet it will print a state of `signedOut`. The `userState` returns an ENUM which you can perform different actions in your workflow. For example:

```swift
    @IBOutlet weak var signInStateLabel: UILabel!
    
    override func viewDidLoad() {
        super.viewDidLoad()
        AWSMobileClient.default().initialize { (userState, error) in
            if let userState = userState {
                switch(userState){
                case .signedIn:
                        DispatchQueue.main.async {
                            self.signInStateLabel.text = "Logged In"
                    }
                case .signedOut:
                    AWSMobileClient.default().showSignIn(navigationController: self.navigationController!, { (userState, error) in
                            if(error == nil){       //Successful signin
                                DispatchQueue.main.async {
                                    self.signInStateLabel.text = "Logged In"
                                }
                            }
                        })
                default:
                    AWSMobileClient.default().signOut()
                }
                
            } else if let error = error {
                print(error.localizedDescription)
            }
        }
    }
```

You might leverage the above workflow to perform other actions in the `signedIn` case, such as calling [GraphQL or REST APIs with AWS AppSync and Amazon API Gateway](./api) or uploading content with [Amazon S3](./storage).
