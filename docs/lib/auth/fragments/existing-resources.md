
If you are using the Amplify CLI, an existing Amazon Cognito User Pool and Identity Pool can be used with the Amplify Libraries by running:

```bash
amplify import auth
```

For more details, see how to [Use an existing Cognito User Pool and Identity Pool](~/cli/auth/import.md).


If you are not using the Amplify CLI, a Cognito User Pool and Identity Pool can be used by referencing them in your `amplifyconfiguration.json` file.

```json
{
    "auth": {
        "plugins": {
            "awsCognitoAuthPlugin": {
                "IdentityManager": {
                    "Default": {}
                },
                "CredentialsProvider": {
                    "CognitoIdentity": {
                        "Default": {
                            "PoolId": "[COGNITO IDENTITY POOL ID]",
                            "Region": "[REGION]"
                        }
                    }
                },
                "CognitoUserPool": {
                    "Default": {
                        "PoolId": "[COGNITO USER POOL ID]",
                        "AppClientId": "[COGNITO USER POOL APP CLIENT ID]",
                        "Region": "[REGION]"
                    }
                },
                "Auth": {
                    "Default": {
                        "authenticationFlowType": "USER_SRP_AUTH",
                        "OAuth": {
                            "WebDomain": "[YOUR COGNITO DOMAIN ]",
                            "AppClientId": "[COGNITO USER POOL APP CLIENT ID]",
                            "SignInRedirectURI": "[CUSTOM REDIRECT SCHEME AFTER SIGN IN, e.g. myapp://]",
                            "SignOutRedirectURI": "[CUSTOM REDIRECT SCHEME AFTER SIGN OUT, e.g. myapp://]",
                            "Scopes": [ 
                                "phone",
                                "email",
                                "openid",
                                "profile",
                                "aws.cognito.signin.user.admin"
                            ]
                        },
                    }
                }
            }
        }
    }
}
```

- **CredentialsProvider**:
  - **Cognito Identity**:
    - **Default**:
      - **PoolID**: ID of the Amazon Cognito Identity Pool (e.g. `us-east-1:123e4567-e89b-12d3-a456-426614174000`)
      - **Region**: AWS Region where the resources are provisioned (e.g. `us-east-1`)
- **CognitoUserPool**:
  - **Default**:
    - **PoolId**: ID of the Amazon Cognito User Pool (e.g. `us-east-1_abcdefghi`)
    - **AppClientId**: ID for the client used to authenticate against the user pool
    - **Region**: AWS Region where the resources are provisioned (e.g. `us-east-1`)
- **Auth**:
  - **Default**:
    - **authenticationFlowType**: The authentication flow type, takes values `USER_SRP_AUTH`, `CUSTOM_AUTH`. Default is `USER_SRP_AUTH`.
    - **OAuth**: Hosted UI Configuration (only include this if using the Hosted UI flow)
    
Note that before you can add an AWS resource to your application, the application must have the Amplify libraries installed. If you need to perform this step, see [Install Amplify Libraries](~/lib/project-setup/create-application.md#n2-install-amplify-libraries). 

If you are using a Cognito User Pool, without a Cognito Identity Pool, you can omit the **CredentialsProvider** section in the configuration.
