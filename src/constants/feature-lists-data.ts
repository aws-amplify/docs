//this is the data for the feature list component and developer can add the features in this file
const featureListData = {
  android: {
    categories: [
      {
        items: [
          {
            content:
              'Easily configure auth for your app with Amplify CLI and Studio—supports login, MFA, social providers, and more. Then integrate auth with intuitive client library APIs.',
            linkText: 'Simple configuration',
            link: 'build-a-backend/auth/set-up-auth/'
          },
          {
            content:
              'Quickly add polished auth and account UIs with <Authenticator> and <AccountSettings> UI components. Integrate seamlessly with minimal code.',
            linkText: 'Pre-built UI components',
            link: 'https://ui.docs.amplify.aws/android/connected-components/authenticator',
            isExternal: true
          },
          {
            content:
              'Manage and maintain full control of your user base in Amplify Studio, without writing code.',
            linkText: 'User management',
            link: 'tools/console/auth/user-management/'
          }
        ],
        heading: 'Auth'
      },

      {
        items: [
          {
            content:
              "Model relationships between types, customize fields, and configure validation rules using the CLI or Amplify Studio's visual editor. Amplify turns your schema into fully implemented backend and frontend code. ",
            linkText: 'Powerful data modeling',
            link: 'build-a-backend/graphqlapi/data-modeling/'
          },
          {
            content:
              'Fetch and mutate data through generated GraphQL queries and mutations from your frontend. Sync data in real time and integrate backend data sources easily.',
            linkText: 'Seamless real-time data access',
            link: 'build-a-backend/graphqlapi/subscribe-data/'
          },
          {
            content:
              'Implement fine-grained authorization to securely access data, while controlling auth at the API level or on individual fields. Manage access with AWS IAM policies or your own auth provider.',
            linkText: 'Granular authorization',
            link: 'build-a-backend/graphqlapi/customize-authorization-rules/'
          }
        ],
        heading: 'GraphQL API'
      },
      {
        items: [
          {
            content:
              'Write backend code in your preferred language or framework. Amplify handles deployment on AWS Lambda for serverless execution.',
            linkText: 'Flexible runtime support',
            link: 'build-a-backend/functions/set-up-function/'
          },
          {
            content:
              'Mock functions locally to build and test without deploying to the cloud. Debug and iterate rapidly by emulating function behavior on your local machine.',
            linkText: 'Local testing',
            link: 'build-a-backend/functions/layers/'
          },
          {
            content:
              'Connect functions to data and auth events to trigger server-side workflows. Manage secrets, keys, and access controls.',
            linkText: 'Event-driven workflows',
            link: 'build-a-backend/graphqlapi/subscribe-data/'
          }
        ],
        heading: 'Functions'
      },
      {
        items: [
          {
            content:
              'Upload and download files to and from cloud storage with advanced controls like pausing and resuming upload operations.',
            linkText: 'Upload and Download files',
            link: 'build-a-backend/storage/upload/'
          },
          {
            content:
              'Manage content through APIs for listing, accessing, and manipulating files. Set file permission levels, configure automatic events and triggers, and more.',
            linkText: 'Advanced file operations and access control',
            link: 'build-a-backend/storage/configure-access/'
          }
        ],
        heading: 'Storage'
      }
    ]
  },
  angular: {
    categories: [
      {
        items: [
          {
            content:
              'Easily configure auth for your app with Amplify CLI and Studio—supports login, MFA, social providers, and more. Then integrate auth with intuitive client library APIs.',
            linkText: 'Simple configuration',
            link: 'build-a-backend/auth/set-up-auth/'
          },
          {
            content:
              'Quickly add polished auth and account UIs with <Authenticator> and <AccountSettings> UI components. Integrate seamlessly with minimal code.',
            linkText: 'Pre-built UI components',
            link: 'https://ui.docs.amplify.aws/angular/connected-components/authenticator',
            isExternal: true
          },
          {
            content:
              'Manage and maintain full control of your user base in Amplify Studio, without writing code.',
            linkText: 'User management',
            link: 'tools/console/auth/user-management/'
          }
        ],
        heading: 'Auth'
      },

      {
        items: [
          {
            content:
              "Model relationships between types, customize fields, and configure validation rules using the CLI or Amplify Studio's visual editor. Amplify turns your schema into fully implemented backend and frontend code. ",
            linkText: 'Powerful data modeling',
            link: 'build-a-backend/graphqlapi/data-modeling/'
          },
          {
            content:
              'Fetch and mutate data through generated GraphQL queries and mutations from your frontend. Sync data in real time and integrate backend data sources easily.',
            linkText: 'Seamless real-time data access',
            link: 'build-a-backend/graphqlapi/subscribe-data/'
          },
          {
            content:
              'Implement fine-grained authorization to securely access data, while controlling auth at the API level or on individual fields. Manage access with AWS IAM policies or your own auth provider.',
            linkText: 'Granular authorization',
            link: 'build-a-backend/graphqlapi/customize-authorization-rules/'
          }
        ],
        heading: 'GraphQL API'
      },

      {
        items: [
          {
            content:
              'Write backend code in your preferred language or framework. Amplify handles deployment on AWS Lambda for serverless execution.',
            linkText: 'Flexible runtime support',
            link: 'build-a-backend/functions/set-up-function/'
          },
          {
            content:
              'Mock functions locally to build and test without deploying to the cloud. Debug and iterate rapidly by emulating function behavior on your local machine.',
            linkText: 'Local testing',
            link: 'build-a-backend/functions/layers/'
          },
          {
            content:
              'Connect functions to data and auth events to trigger server-side workflows. Manage secrets, keys, and access controls.',
            linkText: 'Event-driven workflows',
            link: 'build-a-backend/graphqlapi/subscribe-data/'
          }
        ],
        heading: 'Functions'
      },
      {
        items: [
          {
            content:
              'Upload and download files to and from cloud storage with advanced controls like pausing and resuming upload operations.',
            linkText: 'Upload and Download files',
            link: 'build-a-backend/storage/upload/'
          },
          {
            content:
              'Manage content through APIs for listing, accessing, and manipulating files. Set file permission levels, configure automatic events and triggers, and more.',
            linkText: 'Advanced file operations and access control',
            link: 'build-a-backend/storage/configure-access/'
          }
        ],
        heading: 'Storage'
      }
    ]
  },
  flutter: {
    categories: [
      {
        items: [
          {
            content:
              'Easily configure auth for your app with Amplify CLI and Studio—supports login, MFA, social providers, and more. Then integrate auth with intuitive client library APIs.',
            linkText: 'Simple configuration',
            link: 'build-a-backend/auth/set-up-auth/'
          },
          {
            content:
              'Quickly add polished auth and account UIs with <Authenticator> and <AccountSettings> UI components. Integrate seamlessly with minimal code.',
            linkText: 'Pre-built UI components',
            link: 'https://ui.docs.amplify.aws/flutter/connected-components/authenticator',
            isExternal: true
          },
          {
            content:
              'Manage and maintain full control of your user base in Amplify Studio, without writing code.',
            linkText: 'User management',
            link: 'tools/console/auth/user-management/'
          }
        ],
        heading: 'Auth'
      },

      {
        items: [
          {
            content:
              "Model relationships between types, customize fields, and configure validation rules using the CLI or Amplify Studio's visual editor. Amplify turns your schema into fully implemented backend and frontend code. ",
            linkText: 'Powerful data modeling',
            link: 'build-a-backend/graphqlapi/data-modeling/'
          },
          {
            content:
              'Fetch and mutate data through generated GraphQL queries and mutations from your frontend. Sync data in real time and integrate backend data sources easily.',
            linkText: 'Seamless real-time data access',
            link: 'build-a-backend/graphqlapi/subscribe-data/'
          },
          {
            content:
              'Implement fine-grained authorization to securely access data, while controlling auth at the API level or on individual fields. Manage access with AWS IAM policies or your own auth provider.',
            linkText: 'Granular authorization',
            link: 'build-a-backend/graphqlapi/customize-authorization-rules/'
          }
        ],
        heading: 'GraphQL API'
      },

      {
        items: [
          {
            content:
              'Write backend code in your preferred language or framework. Amplify handles deployment on AWS Lambda for serverless execution.',
            linkText: 'Flexible runtime support',
            link: 'build-a-backend/functions/set-up-function/'
          },
          {
            content:
              'Mock functions locally to build and test without deploying to the cloud. Debug and iterate rapidly by emulating function behavior on your local machine.',
            linkText: 'Local testing',
            link: 'build-a-backend/functions/layers/'
          },
          {
            content:
              'Connect functions to data and auth events to trigger server-side workflows. Manage secrets, keys, and access controls.',
            linkText: 'Event-driven workflows',
            link: 'build-a-backend/graphqlapi/subscribe-data/'
          }
        ],
        heading: 'Functions'
      },
      {
        items: [
          {
            content:
              'Upload and download files to and from cloud storage with advanced controls like pausing and resuming upload operations.',
            linkText: 'Upload and Download files',
            link: 'build-a-backend/storage/upload/'
          },
          {
            content:
              'Manage content through APIs for listing, accessing, and manipulating files. Set file permission levels, configure automatic events and triggers, and more.',
            linkText: 'Advanced file operations and access control',
            link: 'build-a-backend/storage/configure-access/'
          }
        ],
        heading: 'Storage'
      }
    ]
  },
  javascript: {
    categories: [
      {
        items: [
          {
            content:
              'Easily configure auth for your app with Amplify CLI and Studio—supports login, MFA, social providers, and more. Then integrate auth with intuitive client library APIs.',
            linkText: 'Simple configuration',
            link: 'build-a-backend/auth/set-up-auth/'
          },
          {
            content:
              'Quickly add polished auth and account UIs with <Authenticator> and <AccountSettings> UI components. Integrate seamlessly with minimal code.',
            linkText: 'Pre-built UI components',
            link: 'https://ui.docs.amplify.aws/react/connected-components/authenticator',
            isExternal: true
          },
          {
            content:
              'Manage and maintain full control of your user base in Amplify Studio, without writing code.',
            linkText: 'User management',
            link: 'tools/console/auth/user-management/'
          }
        ],
        heading: 'Auth'
      },

      {
        items: [
          {
            content:
              "Model relationships between types, customize fields, and configure validation rules using the CLI or Amplify Studio's visual editor. Amplify turns your schema into fully implemented backend and frontend code. ",
            linkText: 'Powerful data modeling',
            link: 'build-a-backend/graphqlapi/data-modeling/'
          },
          {
            content:
              'Fetch and mutate data through generated GraphQL queries and mutations from your frontend. Sync data in real time and integrate backend data sources easily.',
            linkText: 'Seamless real-time data access',
            link: 'build-a-backend/graphqlapi/subscribe-data/'
          },
          {
            content:
              'Implement fine-grained authorization to securely access data, while controlling auth at the API level or on individual fields. Manage access with AWS IAM policies or your own auth provider.',
            linkText: 'Granular authorization',
            link: 'build-a-backend/graphqlapi/customize-authorization-rules/'
          }
        ],
        heading: 'GraphQL API'
      },

      {
        items: [
          {
            content:
              'Write backend code in your preferred language or framework. Amplify handles deployment on AWS Lambda for serverless execution.',
            linkText: 'Flexible runtime support',
            link: 'build-a-backend/functions/set-up-function/'
          },
          {
            content:
              'Mock functions locally to build and test without deploying to the cloud. Debug and iterate rapidly by emulating function behavior on your local machine.',
            linkText: 'Local testing',
            link: 'build-a-backend/functions/layers/'
          },
          {
            content:
              'Connect functions to data and auth events to trigger server-side workflows. Manage secrets, keys, and access controls.',
            linkText: 'Event-driven workflows',
            link: 'build-a-backend/graphqlapi/subscribe-data/'
          }
        ],
        heading: 'Functions'
      },
      {
        items: [
          {
            content:
              'Upload and download files to and from cloud storage with advanced controls like pausing and resuming upload operations.',
            linkText: 'Upload and Download files',
            link: 'build-a-backend/storage/upload/'
          },
          {
            content:
              'Manage content through APIs for listing, accessing, and manipulating files. Set file permission levels, configure automatic events and triggers, and more.',
            linkText: 'Advanced file operations and access control',
            link: 'build-a-backend/storage/configure-access/'
          },
          {
            content:
              'Integrate pre-built UI components to upload, display, and manage cloud-stored content with minimal coding. Focus on building your app instead of writing boilerplate UI code ',
            linkText: 'Cloud-connected UI components',
            link: 'https://ui.docs.amplify.aws/react/connected-components/storage',
            isExternal: true
          }
        ],
        heading: 'Storage'
      }
    ]
  },
  nextjs: {
    categories: [
      {
        items: [
          {
            content:
              'Easily configure auth for your app with Amplify CLI and Studio—supports login, MFA, social providers, and more. Then integrate auth with intuitive client library APIs.',
            linkText: 'Simple configuration',
            link: 'build-a-backend/auth/set-up-auth/'
          },
          {
            content:
              'Quickly add polished auth and account UIs with <Authenticator> and <AccountSettings> UI components. Integrate seamlessly with minimal code.',
            linkText: 'Pre-built UI components',
            link: 'https://ui.docs.amplify.aws/react/connected-components/authenticator',
            isExternal: true
          },
          {
            content:
              'Manage and maintain full control of your user base in Amplify Studio, without writing code.',
            linkText: 'User management',
            link: 'tools/console/auth/user-management/'
          }
        ],
        heading: 'Auth'
      },

      {
        items: [
          {
            content:
              "Model relationships between types, customize fields, and configure validation rules using the CLI or Amplify Studio's visual editor. Amplify turns your schema into fully implemented backend and frontend code. ",
            linkText: 'Powerful data modeling',
            link: 'build-a-backend/graphqlapi/data-modeling/'
          },
          {
            content:
              'Fetch and mutate data through generated GraphQL queries and mutations from your frontend. Sync data in real time and integrate backend data sources easily.',
            linkText: 'Seamless real-time data access',
            link: 'build-a-backend/graphqlapi/subscribe-data/'
          },
          {
            content:
              'Implement fine-grained authorization to securely access data, while controlling auth at the API level or on individual fields. Manage access with AWS IAM policies or your own auth provider.',
            linkText: 'Granular authorization',
            link: 'build-a-backend/graphqlapi/customize-authorization-rules/'
          }
        ],
        heading: 'GraphQL API'
      },

      {
        items: [
          {
            content:
              'Write backend code in your preferred language or framework. Amplify handles deployment on AWS Lambda for serverless execution.',
            linkText: 'Flexible runtime support',
            link: 'build-a-backend/functions/set-up-function/'
          },
          {
            content:
              'Mock functions locally to build and test without deploying to the cloud. Debug and iterate rapidly by emulating function behavior on your local machine.',
            linkText: 'Local testing',
            link: 'build-a-backend/functions/layers/'
          },
          {
            content:
              'Connect functions to data and auth events to trigger server-side workflows. Manage secrets, keys, and access controls.',
            linkText: 'Event-driven workflows',
            link: 'build-a-backend/graphqlapi/subscribe-data/'
          }
        ],
        heading: 'Functions'
      },
      {
        items: [
          {
            content:
              'Upload and download files to and from cloud storage with advanced controls like pausing and resuming upload operations.',
            linkText: 'Upload and Download files',
            link: 'build-a-backend/storage/upload/'
          },
          {
            content:
              'Manage content through APIs for listing, accessing, and manipulating files. Set file permission levels, configure automatic events and triggers, and more.',
            linkText: 'Advanced file operations and access control',
            link: 'build-a-backend/storage/configure-access/'
          }
        ],
        heading: 'Storage'
      }
    ]
  },
  react: {
    categories: [
      {
        items: [
          {
            content:
              'Easily configure auth for your app with Amplify CLI and Studio—supports login, MFA, social providers, and more. Then integrate auth with intuitive client library APIs.',
            linkText: 'Simple configuration',
            link: 'build-a-backend/auth/set-up-auth/'
          },
          {
            content:
              'Quickly add polished auth and account UIs with <Authenticator> and <AccountSettings> UI components. Integrate seamlessly with minimal code.',
            linkText: 'Pre-built UI components',
            link: 'https://ui.docs.amplify.aws/react/connected-components/authenticator',
            isExternal: true
          },
          {
            content:
              'Manage and maintain full control of your user base in Amplify Studio, without writing code.',
            linkText: 'User management',
            link: 'tools/console/auth/user-management/'
          }
        ],
        heading: 'Auth'
      },

      {
        items: [
          {
            content:
              "Model relationships between types, customize fields, and configure validation rules using the CLI or Amplify Studio's visual editor. Amplify turns your schema into fully implemented backend and frontend code. ",
            linkText: 'Powerful data modeling',
            link: 'build-a-backend/graphqlapi/data-modeling/'
          },
          {
            content:
              'Fetch and mutate data through generated GraphQL queries and mutations from your frontend. Sync data in real time and integrate backend data sources easily.',
            linkText: 'Seamless real-time data access',
            link: 'build-a-backend/graphqlapi/subscribe-data/'
          },
          {
            content:
              'Implement fine-grained authorization to securely access data, while controlling auth at the API level or on individual fields. Manage access with AWS IAM policies or your own auth provider.',
            linkText: 'Granular authorization',
            link: 'build-a-backend/graphqlapi/customize-authorization-rules/'
          }
        ],
        heading: 'GraphQL API'
      },
      {
        items: [
          {
            content:
              'Write backend code in your preferred language or framework. Amplify handles deployment on AWS Lambda for serverless execution.',
            linkText: 'Flexible runtime support',
            link: 'build-a-backend/functions/set-up-function/'
          },
          {
            content:
              'Mock functions locally to build and test without deploying to the cloud. Debug and iterate rapidly by emulating function behavior on your local machine.',
            linkText: 'Local testing',
            link: 'build-a-backend/functions/layers/'
          },
          {
            content:
              'Connect functions to data and auth events to trigger server-side workflows. Manage secrets, keys, and access controls.',
            linkText: 'Event-driven workflows',
            link: 'build-a-backend/graphqlapi/subscribe-data/'
          }
        ],
        heading: 'Functions'
      },
      {
        items: [
          {
            content:
              'Upload and download files to and from cloud storage with advanced controls like pausing and resuming upload operations.',
            linkText: 'Upload and Download files',
            link: 'build-a-backend/storage/upload/'
          },
          {
            content:
              'Manage content through APIs for listing, accessing, and manipulating files. Set file permission levels, configure automatic events and triggers, and more.',
            linkText: 'Advanced file operations and access control',
            link: 'build-a-backend/storage/configure-access/'
          },
          {
            content:
              'Integrate pre-built UI components to upload, display, and manage cloud-stored content with minimal coding. Focus on building your app instead of writing boilerplate UI code ',
            linkText: 'Cloud-connected UI components',
            link: 'https://ui.docs.amplify.aws/react/connected-components/storage',
            isExternal: true
          }
        ],
        heading: 'Storage'
      }
    ]
  },
  'react-native': {
    categories: [
      {
        items: [
          {
            content:
              'Easily configure auth for your app with Amplify CLI and Studio—supports login, MFA, social providers, and more. Then integrate auth with intuitive client library APIs.',
            linkText: 'Simple configuration',
            link: 'build-a-backend/auth/set-up-auth/'
          },
          {
            content:
              'Quickly add polished auth and account UIs with <Authenticator> and <AccountSettings> UI components. Integrate seamlessly with minimal code.',
            linkText: 'Pre-built UI components',
            link: 'https://ui.docs.amplify.aws/react-native/connected-components/authenticator',
            isExternal: true
          },
          {
            content:
              'Manage and maintain full control of your user base in Amplify Studio, without writing code.',
            linkText: 'User management',
            link: 'tools/console/auth/user-management/'
          }
        ],
        heading: 'Auth'
      },

      {
        items: [
          {
            content:
              "Model relationships between types, customize fields, and configure validation rules using the CLI or Amplify Studio's visual editor. Amplify turns your schema into fully implemented backend and frontend code. ",
            linkText: 'Powerful data modeling',
            link: 'build-a-backend/graphqlapi/data-modeling/'
          },
          {
            content:
              'Fetch and mutate data through generated GraphQL queries and mutations from your frontend. Sync data in real time and integrate backend data sources easily.',
            linkText: 'Seamless real-time data access',
            link: 'build-a-backend/graphqlapi/subscribe-data/'
          },
          {
            content:
              'Implement fine-grained authorization to securely access data, while controlling auth at the API level or on individual fields. Manage access with AWS IAM policies or your own auth provider.',
            linkText: 'Granular authorization',
            link: 'build-a-backend/graphqlapi/customize-authorization-rules/'
          }
        ],
        heading: 'GraphQL API'
      },

      {
        items: [
          {
            content:
              'Write backend code in your preferred language or framework. Amplify handles deployment on AWS Lambda for serverless execution.',
            linkText: 'Flexible runtime support',
            link: 'build-a-backend/functions/set-up-function/'
          },
          {
            content:
              'Mock functions locally to build and test without deploying to the cloud. Debug and iterate rapidly by emulating function behavior on your local machine.',
            linkText: 'Local testing',
            link: 'build-a-backend/functions/layers/'
          },
          {
            content:
              'Connect functions to data and auth events to trigger server-side workflows. Manage secrets, keys, and access controls.',
            linkText: 'Event-driven workflows',
            link: 'build-a-backend/graphqlapi/subscribe-data/'
          }
        ],
        heading: 'Functions'
      },
      {
        items: [
          {
            content:
              'Upload and download files to and from cloud storage with advanced controls like pausing and resuming upload operations.',
            linkText: 'Upload and Download files',
            link: 'build-a-backend/storage/upload/'
          },
          {
            content:
              'Manage content through APIs for listing, accessing, and manipulating files. Set file permission levels, configure automatic events and triggers, and more.',
            linkText: 'Advanced file operations and access control',
            link: 'build-a-backend/storage/configure-access/'
          },
          {
            content:
              'Integrate pre-built UI components to upload, display, and manage cloud-stored content with minimal coding. Focus on building your app instead of writing boilerplate UI code ',
            linkText: 'Cloud-connected UI components',
            link: 'https://ui.docs.amplify.aws/react/connected-components/storage',
            isExternal: true
          }
        ],
        heading: 'Storage'
      }
    ]
  },
  swift: {
    categories: [
      {
        items: [
          {
            content:
              'Easily configure auth for your app with Amplify CLI and Studio—supports login, MFA, social providers, and more. Then integrate auth with intuitive client library APIs.',
            linkText: 'Simple configuration',
            link: 'build-a-backend/auth/set-up-auth/'
          },
          {
            content:
              'Quickly add polished auth and account UIs with <Authenticator> and <AccountSettings> UI components. Integrate seamlessly with minimal code.',
            linkText: 'Pre-built UI components',
            link: 'https://ui.docs.amplify.aws/swift/connected-components/authenticator',
            isExternal: true
          },
          {
            content:
              'Manage and maintain full control of your user base in Amplify Studio, without writing code.',
            linkText: 'User management',
            link: 'tools/console/auth/user-management/'
          }
        ],
        heading: 'Auth'
      },

      {
        items: [
          {
            content:
              "Model relationships between types, customize fields, and configure validation rules using the CLI or Amplify Studio's visual editor. Amplify turns your schema into fully implemented backend and frontend code. ",
            linkText: 'Powerful data modeling',
            link: 'build-a-backend/graphqlapi/data-modeling/'
          },
          {
            content:
              'Fetch and mutate data through generated GraphQL queries and mutations from your frontend. Sync data in real time and integrate backend data sources easily.',
            linkText: 'Seamless real-time data access',
            link: 'build-a-backend/graphqlapi/subscribe-data/'
          },
          {
            content:
              'Implement fine-grained authorization to securely access data, while controlling auth at the API level or on individual fields. Manage access with AWS IAM policies or your own auth provider.',
            linkText: 'Granular authorization',
            link: 'build-a-backend/graphqlapi/customize-authorization-rules/'
          }
        ],
        heading: 'GraphQL API'
      },
      {
        items: [
          {
            content:
              'Write backend code in your preferred language or framework. Amplify handles deployment on AWS Lambda for serverless execution.',
            linkText: 'Flexible runtime support',
            link: 'build-a-backend/functions/set-up-function/'
          },
          {
            content:
              'Mock functions locally to build and test without deploying to the cloud. Debug and iterate rapidly by emulating function behavior on your local machine.',
            linkText: 'Local testing',
            link: 'build-a-backend/functions/layers/'
          },
          {
            content:
              'Connect functions to data and auth events to trigger server-side workflows. Manage secrets, keys, and access controls.',
            linkText: 'Event-driven workflows',
            link: 'build-a-backend/graphqlapi/subscribe-data/'
          }
        ],
        heading: 'Functions'
      },
      {
        items: [
          {
            content:
              'Upload and download files to and from cloud storage with advanced controls like pausing and resuming upload operations.',
            linkText: 'Upload and Download files',
            link: 'build-a-backend/storage/upload/'
          },
          {
            content:
              'Manage content through APIs for listing, accessing, and manipulating files. Set file permission levels, configure automatic events and triggers, and more.',
            linkText: 'Advanced file operations and access control',
            link: 'build-a-backend/storage/configure-access/'
          }
        ],
        heading: 'Storage'
      }
    ]
  },
  vue: {
    categories: [
      {
        items: [
          {
            content:
              'Easily configure auth for your app with Amplify CLI and Studio—supports login, MFA, social providers, and more. Then integrate auth with intuitive client library APIs.',
            linkText: 'Simple configuration',
            link: 'build-a-backend/auth/set-up-auth/'
          },
          {
            content:
              'Quickly add polished auth and account UIs with <Authenticator> and <AccountSettings> UI components. Integrate seamlessly with minimal code.',
            linkText: 'Pre-built UI components',
            link: 'https://ui.docs.amplify.aws/vue/connected-components/authenticator',
            isExternal: true
          },
          {
            content:
              'Manage and maintain full control of your user base in Amplify Studio, without writing code.',
            linkText: 'User management',
            link: 'tools/console/auth/user-management/'
          }
        ],
        heading: 'Auth'
      },

      {
        items: [
          {
            content:
              "Model relationships between types, customize fields, and configure validation rules using the CLI or Amplify Studio's visual editor. Amplify turns your schema into fully implemented backend and frontend code. ",
            linkText: 'Powerful data modeling',
            link: 'build-a-backend/graphqlapi/data-modeling/'
          },
          {
            content:
              'Fetch and mutate data through generated GraphQL queries and mutations from your frontend. Sync data in real time and integrate backend data sources easily.',
            linkText: 'Seamless real-time data access',
            link: 'build-a-backend/graphqlapi/subscribe-data/'
          },
          {
            content:
              'Implement fine-grained authorization to securely access data, while controlling auth at the API level or on individual fields. Manage access with AWS IAM policies or your own auth provider.',
            linkText: 'Granular authorization',
            link: 'build-a-backend/graphqlapi/customize-authorization-rules/'
          }
        ],
        heading: 'GraphQL API'
      },

      {
        items: [
          {
            content:
              'Write backend code in your preferred language or framework. Amplify handles deployment on AWS Lambda for serverless execution.',
            linkText: 'Flexible runtime support',
            link: 'build-a-backend/functions/set-up-function/'
          },
          {
            content:
              'Mock functions locally to build and test without deploying to the cloud. Debug and iterate rapidly by emulating function behavior on your local machine.',
            linkText: 'Local testing',
            link: 'build-a-backend/functions/layers/'
          },
          {
            content:
              'Connect functions to data and auth events to trigger server-side workflows. Manage secrets, keys, and access controls.',
            linkText: 'Event-driven workflows',
            link: 'build-a-backend/graphqlapi/subscribe-data/'
          }
        ],
        heading: 'Functions'
      },
      {
        items: [
          {
            content:
              'Upload and download files to and from cloud storage with advanced controls like pausing and resuming upload operations.',
            linkText: 'Upload and Download files',
            link: 'build-a-backend/storage/upload/'
          },
          {
            content:
              'Manage content through APIs for listing, accessing, and manipulating files. Set file permission levels, configure automatic events and triggers, and more.',
            linkText: 'Advanced file operations and access control',
            link: 'build-a-backend/storage/configure-access/'
          }
        ],
        heading: 'Storage'
      }
    ]
  }
};

export default featureListData;
