const directory = {
  lib: {
    productRoot: {
      title: "Amplify Libraries",
      route: "/lib",
    },
    items: {
      "project-setup": {
        title: "Project Setup",
        items: [
          {
            title: "Prerequisites",
            route: "/lib/project-setup/prereq",
            filters: ["android", "ios", "flutter"],
          },
          {
            title: "Create your application",
            route: "/lib/project-setup/create-application",
            filters: ["android", "ios", "flutter"],
          },
          {
            title: "Null safety",
            route: "/lib/project-setup/null-safety",
            filters: ["flutter"],
          },
          {
            title: "Using Combine with Amplify",
            route: "/lib/project-setup/combine",
            filters: ["ios"],
          },
          {
            title: "Async Programming Model",
            route: "/lib/project-setup/async",
            filters: ["android"],
          },
          {
            title: "Kotlin Coroutines Support",
            route: "/lib/project-setup/coroutines",
            filters: ["android"],
          },
          {
            title: "Using RxJava with Amplify",
            route: "/lib/project-setup/rxjava",
            filters: ["android"],
          },
          {
            title: "Use existing AWS resources",
            route: "/lib/project-setup/use-existing-resources",
            filters: ["android", "ios"],
          },
        ],
      },
      analytics: {
        title: "Analytics",
        items: [
          {
            title: "Getting started",
            route: "/lib/analytics/getting-started",
            filters: ["android", "flutter", "ios", "js"],
          },
          {
            title: "Record events",
            route: "/lib/analytics/record",
            filters: ["android", "flutter", "ios", "js"],
          },
          {
            title: "Automatically track sessions",
            route: "/lib/analytics/autotrack",
            filters: ["android", "flutter", "ios", "js"],
          },
          {
            title: "Identify user",
            route: "/lib/analytics/identifyuser",
            filters: ["android", "flutter", "ios"],
          },
          {
            title: "Streaming analytics data",
            route: "/lib/analytics/streaming",
            filters: ["js"],
          },
          {
            title: "Storing analytics data",
            route: "/lib/analytics/storing",
            filters: ["js"],
          },
          {
            title: "Personalized recommendations",
            route: "/lib/analytics/personalize",
            filters: ["js"],
          },
          {
            title: "Escape hatch",
            route: "/lib/analytics/escapehatch",
            filters: ["android", "ios"],
          },
          {
            title: "Use existing AWS resources",
            route: "/lib/analytics/existing-resources",
            filters: ["android", "flutter", "ios"],
          },
        ],
      },
      graphqlapi: {
        title: "API (GraphQL)",
        items: [
          {
            title: "Getting started",
            route: "/lib/graphqlapi/getting-started",
            filters: ["android", "flutter", "ios", "js"],
          },
          {
            title: "Concepts",
            route: "/lib/graphqlapi/concepts",
            filters: ["android", "flutter", "ios", "js"],
          },
          {
            title: "Create or re-use existing backend",
            route: "/lib/graphqlapi/create-or-re-use-existing-backend",
            filters: ["js"],
          },
          {
            title: "Configure authorization modes",
            route: "/lib/graphqlapi/authz",
            filters: ["android", "flutter", "ios", "js"],
          },
          {
            title: "Create, update, delete data",
            route: "/lib/graphqlapi/mutate-data",
            filters: ["android", "flutter", "ios", "js"],
          },
          {
            title: "Fetch data",
            route: "/lib/graphqlapi/query-data",
            filters: ["android", "flutter", "ios", "js"],
          },
          {
            title: "Subscribe to data",
            route: "/lib/graphqlapi/subscribe-data",
            filters: ["android", "flutter", "ios", "js"],
          },
          {
            title: "Cancel API requests",
            route: "/lib/graphqlapi/cancel-request",
            filters: ["js"],
          },
          {
            title: "Offline scenarios",
            route: "/lib/graphqlapi/offline",
            filters: ["js"],
          },
          {
            title: "GraphQL from NodeJS",
            route: "/lib/graphqlapi/graphql-from-nodejs",
            filters: ["js"],
          },
          {
            title: "Advanced Workflows",
            route: "/lib/graphqlapi/advanced-workflows",
            filters: ["android", "ios", "js"],
          },
          {
            title: "Use existing AWS resources",
            route: "/lib/graphqlapi/existing-resources",
            filters: ["android", "flutter", "ios"],
          },
        ],
      },
      restapi: {
        title: "API (REST)",
        items: [
          {
            title: "Getting started",
            route: "/lib/restapi/getting-started",
            filters: ["android", "ios", "flutter", "js"],
          },
          {
            title: "Fetching data",
            route: "/lib/restapi/fetch",
            filters: ["android", "ios", "flutter", "js"],
          },
          {
            title: "Updating data",
            route: "/lib/restapi/update",
            filters: ["android", "ios", "flutter", "js"],
          },
          {
            title: "Deleting data",
            route: "/lib/restapi/delete",
            filters: ["android", "ios", "flutter", "js"],
          },
          {
            title: "Cancel API requests",
            route: "/lib/restapi/cancel",
            filters: ["js"],
          },
          {
            title: "Define authorization rules",
            route: "/lib/restapi/authz",
            filters: ["android", "ios", "flutter", "js"],
          },
          {
            title: "Use existing AWS resources",
            route: "/lib/restapi/existing-resources",
            filters: ["android", "ios", "flutter"],
          },
        ],
      },
      auth: {
        title: "Authentication",
        items: [
          {
            title: "Getting started",
            route: "/lib/auth/getting-started",
            filters: ["android", "flutter", "ios", "js"],
          },
          {
            title: "Create or re-use existing backend",
            route: "/lib/auth/start",
            filters: ["js"],
          },
          {
            title: "Sign up, Sign in & Sign out",
            route: "/lib/auth/emailpassword",
            filters: ["js"],
          },
          {
            title: "Social sign-in (OAuth)",
            route: "/lib/auth/social",
            filters: ["js"],
          },
          {
            title: "Multi-factor authentication",
            route: "/lib/auth/mfa",
            filters: ["js"],
          },
          {
            title: "Password & user management",
            route: "/lib/auth/manageusers",
            filters: ["js"],
          },
          {
            title: "Switching authentication flows",
            route: "/lib/auth/switch-auth",
            filters: ["js"],
          },
          {
            title: "Customize UI components",
            route: "/lib/auth/customui",
            filters: ["js"],
          },
          {
            title: "Advanced workflows",
            route: "/lib/auth/advanced",
            filters: ["js"],
          },
          {
            title: "Sign in",
            route: "/lib/auth/signin",
            filters: ["android", "flutter", "ios"],
          },
          {
            title: "Sign in with custom flow",
            route: "/lib/auth/signin_with_custom_flow",
            filters: ["ios"],
          },
          {
            title: "Sign in with web UI",
            route: "/lib/auth/signin_web_ui",
            filters: ["android", "flutter", "ios"],
          },
          {
            title: "Social sign in with web UI",
            route: "/lib/auth/social_signin_web_ui",
            filters: ["android", "flutter", "ios"],
          },
          {
            title: "Sign in next steps",
            route: "/lib/auth/signin_next_steps",
            filters: ["ios"],
          },
          {
            title: "Guest access",
            route: "/lib/auth/guest_access",
            filters: ["android", "flutter", "ios"],
          },
          {
            title: "Auth events",
            route: "/lib/auth/auth-events",
            filters: ["android", "flutter", "ios", "js"],
          },
          {
            title: "User attributes",
            route: "/lib/auth/user-attributes",
            filters: ["android", "flutter", "ios"],
          },
          {
            title: "Remember a device",
            route: "/lib/auth/device_features",
            filters: ["android", "ios", "js"],
          },
          {
            title: "Password management",
            route: "/lib/auth/password_management",
            filters: ["android", "flutter", "ios"],
          },
          {
            title: "Sign out",
            route: "/lib/auth/signOut",
            filters: ["android", "flutter", "ios"],
          },
          {
            title: "Accessing credentials",
            route: "/lib/auth/access_credentials",
            filters: ["android", "flutter", "ios"],
          },
          {
            title: "Escape hatch",
            route: "/lib/auth/escapehatch",
            filters: ["android", "ios"],
          },
          {
            title: "Under the hood",
            route: "/lib/auth/overview",
            filters: ["android", "ios", "js"],
          },
          {
            title: "Use existing Amazon Cognito resources",
            route: "/lib/auth/existing-resources",
            filters: ["android", "flutter", "ios"],
          },
        ],
      },
      datastore: {
        title: "DataStore",
        items: [
          {
            title: "Getting started",
            route: "/lib/datastore/getting-started",
            filters: ["android", "flutter", "ios", "js"],
          },
          {
            title: "Manipulating data",
            route: "/lib/datastore/data-access",
            filters: ["android", "flutter", "ios", "js"],
          },
          {
            title: "Relational models",
            route: "/lib/datastore/relational",
            filters: ["android", "flutter", "ios", "js"],
          },
          {
            title: "Syncing data to cloud",
            route: "/lib/datastore/sync",
            filters: ["android", "flutter", "ios", "js"],
          },
          {
            title: "Setup authorization rules",
            route: "/lib/datastore/setup-auth-rules",
            filters: ["android", "flutter", "ios", "js"],
          },
          {
            title: "Conflict resolution",
            route: "/lib/datastore/conflict",
            filters: ["android", "flutter", "ios", "js"],
          },
          {
            title: "Real time",
            route: "/lib/datastore/real-time",
            filters: ["android", "flutter", "ios", "js"],
          },
          {
            title: "DataStore Events",
            route: "/lib/datastore/datastore-events",
            filters: ["android", "flutter", "ios", "js"],
          },
          {
            title: "Other methods",
            route: "/lib/datastore/other-methods",
            filters: ["android", "ios", "js"],
          },
          {
            title: "Schema updates",
            route: "/lib/datastore/schema-updates",
            filters: ["android", "flutter", "ios", "js"],
          },
          {
            title: "How it works",
            route: "/lib/datastore/how-it-works",
            filters: ["android", "flutter", "ios", "js"],
          },
          {
            title: "Examples",
            route: "/lib/datastore/examples",
            filters: ["js"],
          },
        ],
      },
      interactions: {
        title: "Interactions",
        items: [
          {
            title: "Getting started",
            route: "/lib/interactions/getting-started",
            filters: ["js"],
          },
          {
            title: "Interact with bots",
            route: "/lib/interactions/chatbot",
            filters: ["js"],
          },
        ],
      },
      predictions: {
        title: "Predictions",
        items: [
          {
            title: "Overview",
            route: "/lib/predictions/intro",
            filters: ["js"],
          },
          {
            title: "Getting started",
            route: "/lib/predictions/getting-started",
            filters: ["android", "ios", "js"],
          },
          {
            title: "Text to speech",
            route: "/lib/predictions/text-speech",
            filters: ["android", "ios", "js"],
          },
          {
            title: "Transcribe audio to text",
            route: "/lib/predictions/transcribe",
            filters: ["ios", "js"],
          },
          {
            title: "Translate language",
            route: "/lib/predictions/translate",
            filters: ["android", "ios", "js"],
          },
          {
            title: "Identify text",
            route: "/lib/predictions/identify-text",
            filters: ["android", "ios", "js"],
          },
          {
            title: "Identify entities from images",
            route: "/lib/predictions/identify-entity",
            filters: ["android", "ios", "js"],
          },
          {
            title: "Label objects in image",
            route: "/lib/predictions/label-image",
            filters: ["android", "ios", "js"],
          },
          {
            title: "Interpret sentiment",
            route: "/lib/predictions/interpret",
            filters: ["android", "ios", "js"],
          },
          {
            title: "Escape hatch",
            route: "/lib/predictions/escapehatch",
            filters: ["android", "ios"],
          },
          {title: "Example", route: "/lib/predictions/sample", filters: ["js"]},
        ],
      },
      pubsub: {
        title: "PubSub",
        items: [
          {
            title: "Getting started",
            route: "/lib/pubsub/getting-started",
            filters: ["js"],
          },
          {
            title: "Subscribe & Unsubscribe",
            route: "/lib/pubsub/subunsub",
            filters: ["js"],
          },
          {title: "Publish", route: "/lib/pubsub/publish", filters: ["js"]},
        ],
      },
      "push-notifications": {
        title: "Push Notifications",
        items: [
          {
            title: "Overview",
            route: "/lib/push-notifications/overview",
            filters: ["js"],
          },
          {
            title: "Getting started",
            route: "/lib/push-notifications/getting-started",
            filters: ["js"],
          },
          {
            title: "Working with API",
            route: "/lib/push-notifications/working-with-api",
            filters: ["js"],
          },
          {
            title: "Testing",
            route: "/lib/push-notifications/testing",
            filters: ["js"],
          },
        ],
      },
      storage: {
        title: "Storage",
        items: [
          {
            title: "Getting started",
            route: "/lib/storage/getting-started",
            filters: ["android", "ios", "flutter", "js"],
          },
          {
            title: "Concepts",
            route: "/lib/storage/overview",
            filters: ["android", "ios", "flutter", "js"],
          },
          {
            title: "Upload files",
            route: "/lib/storage/upload",
            filters: ["android", "ios", "flutter", "js"],
          },
          {
            title: "Download files",
            route: "/lib/storage/download",
            filters: ["android", "ios", "flutter", "js"],
          },
          {
            title: "List files",
            route: "/lib/storage/list",
            filters: ["android", "ios", "flutter", "js"],
          },
          {
            title: "Copy files",
            route: "/lib/storage/copy",
            filters: ["js"],
          },
          {
            title: "Remove files",
            route: "/lib/storage/remove",
            filters: ["android", "ios", "flutter", "js"],
          },
          {
            title: "Cancel requests",
            route: "/lib/storage/cancel-requests",
            filters: ["js"],
          },
          {
            title: "File access levels",
            route: "/lib/storage/configureaccess",
            filters: ["android", "ios", "flutter", "js"],
          },
          {
            title: "Automatically track events",
            route: "/lib/storage/autotrack",
            filters: ["js"],
          },
          {
            title: "Lambda triggers",
            route: "/lib/storage/triggers",
            filters: ["android", "ios", "flutter", "js"],
          },
          {
            title: "Escape hatch",
            route: "/lib/storage/escapehatch",
            filters: ["android", "ios"],
          },
          {
            title: "Use existing AWS resources",
            route: "/lib/storage/existing-resources",
            filters: ["android", "ios", "flutter"],
          },
        ],
      },
      xr: {
        title: "XR",
        items: [
          {
            title: "Getting started",
            route: "/lib/xr/getting-started",
            filters: ["js"],
          },
          {title: "Scene API", route: "/lib/xr/sceneapi", filters: ["js"]},
        ],
      },
      utilities: {
        title: "Utilities",
        items: [
          {
            title: "Service Worker",
            route: "/lib/utilities/serviceworker",
            filters: ["js"],
          },
          {title: "Cache", route: "/lib/utilities/cache", filters: ["js"]},
          {title: "Hub", route: "/lib/utilities/hub", filters: ["js"]},
          {
            title: "Internationalization",
            route: "/lib/utilities/i18n",
            filters: ["js"],
          },
          {title: "Logger", route: "/lib/utilities/logger", filters: ["js"]},
        ],
      },
      "client-configuration": {
        title: "Client configuration",
        items: [
          {
            title: "Configuring Amplify Categories",
            route: "/lib/client-configuration/configuring-amplify-categories",
            filters: ["js"],
          },
        ],
      },
      debugging: {
        title: "Debugging",
        items: [
          {
            title: "Developer Menu",
            route: "/lib/debugging/dev-menu",
            filters: ["android", "ios"],
          },
        ],
      },
      info: {
        title: "Info",
        items: [
          {
            title: "Data Information",
            route: "/lib/info/overview",
            filters: ["ios"],
          },
          {
            title: "Uninstalling the app",
            route: "/lib/info/app-uninstall",
            filters: ["ios"],
          },
        ],
      },
      ssr: {
        title: "Server-Side Rendering",
        items: [
          {
            title: "Getting Started with Server-Side Rendering (SSR)",
            route: "/lib/ssr",
            filters: ["js"],
          },
        ],
      },
      troubleshooting: {
        title: "Troubleshooting",
        items: [
          {
            title: "Upgrading Amplify packages",
            route: "/lib/upgrading",
            filters: ["flutter", "js"],
          },
        ],
      },
    },
  },
  sdk: {
    productRoot: {
      title: "AWS Mobile SDK",
      route: "/sdk",
    },
    items: {
      api: {
        title: "API",
        items: [
          {
            title: "GraphQL - Realtime and Offline",
            route: "/sdk/api/graphql",
            filters: ["android", "ios"],
          },
          {
            title: "REST API",
            route: "/sdk/api/rest",
            filters: ["android", "ios"],
          },
        ],
      },
      analytics: {
        title: "Analytics",
        items: [
          {
            title: "Getting Started",
            route: "/sdk/analytics/getting-started",
            filters: ["android", "ios"],
          },
          {
            title: "Events",
            route: "/sdk/analytics/events",
            filters: ["android", "ios"],
          },
          {
            title: "Endpoints",
            route: "/sdk/analytics/endpoints",
            filters: ["android", "ios"],
          },
          {
            title: "Using Amazon Kinesis",
            route: "/sdk/analytics/kinesis",
            filters: ["android", "ios"],
          },
        ],
      },
      auth: {
        title: "Authentication",
        items: [
          {
            title: "Getting started",
            route: "/sdk/auth/getting-started",
            filters: ["android", "ios"],
          },
          {
            title: "Overview",
            route: "/sdk/auth/how-it-works",
            filters: ["android", "ios"],
          },
          {
            title: "Guest access",
            route: "/sdk/auth/guest-access",
            filters: ["android", "ios"],
          },
          {
            title: "Drop-in auth",
            route: "/sdk/auth/drop-in-auth",
            filters: ["android", "ios"],
          },
          {
            title: "Working with the API",
            route: "/sdk/auth/working-with-api",
            filters: ["android", "ios"],
          },
          {
            title: "Federated identities",
            route: "/sdk/auth/federated-identities",
            filters: ["android", "ios"],
          },
          {
            title: "Hosted UI",
            route: "/sdk/auth/hosted-ui",
            filters: ["android", "ios"],
          },
          {
            title: "Custom auth flow",
            route: "/sdk/auth/custom-auth-flow",
            filters: ["android", "ios"],
          },
          {
            title: "Device features",
            route: "/sdk/auth/device-features",
            filters: ["android", "ios"],
          },
        ],
      },
      "push-notifications": {
        title: "Push notifications",
        items: [
          {
            title: "Getting started",
            route: "/sdk/push-notifications/getting-started",
            filters: ["android", "ios"],
          },
          {
            title: "Messaging campaigns",
            route: "/sdk/push-notifications/messaging-campaign",
            filters: ["android", "ios"],
          },
          {
            title: "Setting up push notification services",
            route: "/sdk/push-notifications/setup-push-service",
            filters: ["android", "ios"],
          },
        ],
      },
      pubsub: {
        title: "PubSub",
        items: [
          {
            title: "Getting started",
            route: "/sdk/pubsub/getting-started",
            filters: ["android", "ios"],
          },
          {
            title: "Working with the API",
            route: "/sdk/pubsub/working-api",
            filters: ["android", "ios"],
          },
        ],
      },
      storage: {
        title: "Storage",
        items: [
          {
            title: "Getting started",
            route: "/sdk/storage/getting-started",
            filters: ["android", "ios"],
          },
          {
            title: "Using TransferUtility",
            route: "/sdk/storage/transfer-utility",
            filters: ["android", "ios"],
          },
          {
            title: "Using GraphQL API",
            route: "/sdk/storage/graphql-api",
            filters: ["android", "ios"],
          },
          {
            title: "Configure Access",
            route: "/sdk/storage/configure-access",
            filters: ["android", "ios"],
          },
        ],
      },
      configuration: {
        title: "Configuration",
        items: [
          {
            title: "SDK Setup Options",
            route: "/sdk/configuration/setup-options",
            filters: ["android", "ios"],
          },
        ],
      },
      info: {
        title: "Info",
        items: [
          {title: "Data Information", route: "/overview", filters: ["android"]},
          {
            title: "Uninstalling the app",
            route: "/sdk/info/app-uninstall",
            filters: ["android"],
          },
        ],
      },
    },
  },
  ui: {
    productRoot: {
      title: "Amplify UI Components",
      route: "/ui",
    },
    items: {
      api: {
        title: "API",
        items: [
          {
            title: "Connect",
            route: "/ui/api/connect",
            filters: ["react-native"],
          },
        ],
      },
      auth: {
        title: "Authentication",
        items: [
          {
            title: "Authenticator",
            route: "/ui/auth/authenticator",
            filters: [
              "angular",
              "ionic",
              "next",
              "react",
              "react-native",
              "vue",
            ],
          },
          {
            title: "Sign Out",
            route: "/ui/auth/sign-out",
            filters: ["angular", "ionic", "react", "vue"],
          },
          {
            title: "Select MFA Type",
            route: "/ui/auth/select-mfa-type",
            filters: ["angular", "ionic", "react", "vue"],
          },
        ],
      },
      interactions: {
        title: "Interactions",
        items: [
          {
            title: "Chatbot",
            route: "/ui/interactions/chatbot",
            filters: ["angular", "ionic", "react", "react-native", "vue"],
          },
        ],
      },
      storage: {
        title: "Storage",
        items: [
          {
            title: "S3 Album",
            route: "/ui/storage/s3-album",
            filters: ["angular", "ionic", "react", "react-native", "vue"],
          },
          {
            title: "S3 Image",
            route: "/ui/storage/s3-image",
            filters: ["angular", "ionic", "react", "react-native", "vue"],
          },
          {
            title: "S3 Image Picker",
            route: "/ui/storage/s3-image-picker",
            filters: ["angular", "ionic", "react", "vue"],
          },
          {
            title: "S3 Text",
            route: "/ui/storage/s3-text",
            filters: ["angular", "ionic", "react", "vue"],
          },
          {
            title: "S3 Text Picker",
            route: "/ui/storage/s3-text-picker",
            filters: ["angular", "ionic", "react", "vue"],
          },
          {
            title: "Tracking Events",
            route: "/ui/storage/tracking-events",
            filters: ["angular", "ionic", "react", "react-native", "vue"],
          },
          {
            title: "Customization",
            route: "/ui/storage/customization",
            filters: ["react-native"],
          },
        ],
      },
      customization: {
        title: "Customization",
        items: [
          {
            title: "Theming",
            route: "/ui/customization/theming",
            filters: ["angular", "ionic", "react", "react-native", "vue"],
          },
          {
            title: "Customizing CSS",
            route: "/ui/customization/customizing-css",
            filters: [
              "angular",
              "ionic",
              "next",
              "react",
              "react-native",
              "vue",
            ],
          },
          {
            title: "Translations",
            route: "/ui/customization/translations",
            filters: [
              "angular",
              "ionic",
              "next",
              "react",
              "react-native",
              "vue",
            ],
          },
        ],
      },
    },
  },
  "ui-legacy": {
    productRoot: {
      title: "Amplify UI (Legacy)",
      route: "/ui-legacy",
    },
    items: {
      auth: {
        title: "Authentication",
        items: [
          {
            title: "Authenticator",
            route: "/ui-legacy/auth/authenticator",
            filters: ["angular", "ionic", "react", "react-native", "vue"],
          },
        ],
      },
      api: {
        title: "API",
        items: [
          {
            title: "Connect",
            route: "/ui-legacy/api/connect",
            filters: ["react", "react-native", "vue"],
          },
        ],
      },
      storage: {
        title: "Storage",
        items: [
          {
            title: "Photo Picker",
            route: "/ui-legacy/storage/photo-picker",
            filters: ["angular", "ionic", "react", "vue"],
          },
          {
            title: "S3 Album",
            route: "/ui-legacy/storage/s3-album",
            filters: ["angular", "ionic", "react", "react-native", "vue"],
          },
          {
            title: "S3 Image",
            route: "/ui-legacy/storage/s3-image",
            filters: ["react", "react-native", "vue"],
          },
          {
            title: "Tracking Events",
            route: "/ui-legacy/storage/tracking-events",
            filters: ["react", "react-native"],
          },
          {
            title: "Customization",
            route: "/ui-legacy/storage/customization",
            filters: ["react", "react-native"],
          },
        ],
      },
      interactions: {
        title: "Interactions",
        items: [
          {
            title: "Chatbot",
            route: "/ui-legacy/interactions/chatbot",
            filters: ["angular", "ionic", "react", "react-native", "vue"],
          },
        ],
      },
      xr: {
        title: "XR",
        items: [
          {
            title: "Sumerian Scene",
            route: "/ui-legacy/xr/sumerian-scene",
            filters: ["angular", "ionic", "react", "vue"],
          },
        ],
      },
      customization: {
        title: "Customization",
        items: [
          {
            title: "Theming",
            route: "/ui-legacy/customization/theming",
            filters: ["react-native"],
          },
        ],
      },
    },
  },
  cli: {
    productRoot: {
      title: "Amplify CLI",
      route: "/cli",
    },
    items: {
      start: {
        title: "Get started",
        items: [
          {title: "Installation", route: "/cli/start/install", filters: []},
          {
            title: "Typical workflows",
            route: "/cli/start/workflows",
            filters: [],
          },
        ],
      },
      "graphql-transformer": {
        title: "API (GraphQL)",
        items: [
          {
            title: "Overview",
            route: "/cli/graphql-transformer/overview",
            filters: [],
          },
          {
            title: "Directives",
            route: "/cli/graphql-transformer/directives",
            filters: [],
          },
          {
            title: "Define your model types",
            route: "/cli/graphql-transformer/model",
            filters: [],
          },
          {
            title: "Index your data with keys",
            route: "/cli/graphql-transformer/key",
            filters: [],
          },
          {
            title: "Setup authorization rules",
            route: "/cli/graphql-transformer/auth",
            filters: [],
          },
          {
            title: "Add relationships between types",
            route: "/cli/graphql-transformer/connection",
            filters: [],
          },
          {
            title: "Configure Lambda resolvers",
            route: "/cli/graphql-transformer/function",
            filters: [],
          },
          {
            title: "Configure HTTP resolvers",
            route: "/cli/graphql-transformer/http",
            filters: [],
          },
          {
            title: "Connect machine learning services",
            route: "/cli/graphql-transformer/predictions",
            filters: [],
          },
          {
            title: "Make your data searchable",
            route: "/cli/graphql-transformer/searchable",
            filters: [],
          },
          {
            title: "Versioning and conflict resolution",
            route: "/cli/graphql-transformer/versioned",
            filters: [],
          },
          {
            title: "Data access patterns",
            route: "/cli/graphql-transformer/dataaccess",
            filters: [],
          },
          {
            title: "GraphQL transform and Storage",
            route: "/cli/graphql-transformer/storage",
            filters: [],
          },
          {
            title: "Relational Databases",
            route: "/cli/graphql-transformer/relational",
            filters: [],
          },
          {
            title: "Client code generation",
            route: "/cli/graphql-transformer/codegen",
            filters: [],
          },
          {
            title: "Overwrite & customize resolvers",
            route: "/cli/graphql-transformer/resolvers",
            filters: [],
          },
          {
            title: "Configurable Parameters",
            route: "/cli/graphql-transformer/config-params",
            filters: [],
          },
          {
            title: "Examples",
            route: "/cli/graphql-transformer/examples",
            filters: [],
          },
        ],
      },
      restapi: {
        title: "API (REST)",
        items: [
          {title: "Overview", route: "/cli/restapi/restapi", filters: []},
          {title: "Test", route: "/cli/restapi/testing", filters: []},
        ],
      },
      auth: {
        title: "Authentication",
        items: [
          {title: "Overview", route: "/cli/auth/overview", filters: []},
          {title: "User groups", route: "/cli/auth/groups", filters: []},
          {title: "Admin actions", route: "/cli/auth/admin", filters: []},
          {
            title: "Use an existing Cognito User Pool and Identity Pool",
            route: "/cli/auth/import",
            filters: [],
          },
        ],
      },
      storage: {
        title: "Storage",
        items: [
          {title: "Overview", route: "/cli/storage/overview", filters: []},
          {
            title: "Use an existing S3 bucket or DynamoDB table",
            route: "/cli/storage/import",
            filters: [],
          },
        ],
      },
      function: {
        title: "Functions",
        items: [
          {title: "Overview", route: "/cli/function/function", filters: []},
          {
            title: "Reuse code & assets using layers",
            route: "/cli/function/layers",
            filters: [],
          },
          {
            title: "Environment variables",
            route: "/cli/function/env-vars",
            filters: [],
          },
          {
            title: "Access secret values",
            route: "/cli/function/secrets",
            filters: [],
          },
          {
            title: "Build options",
            route: "/cli/function/build-options",
            filters: [],
          },
        ],
      },
      hosting: {
        title: "Hosting",
        items: [
          {title: "Overview", route: "/cli/hosting/hosting", filters: []},
        ],
      },
      plugins: {
        title: "Plugins",
        items: [
          {title: "Overview", route: "/cli/plugins/plugins", filters: []},
          {
            title: "Architecture",
            route: "/cli/plugins/architecture",
            filters: [],
          },
          {
            title: "Authoring a new plugin",
            route: "/cli/plugins/authoring",
            filters: [],
          },
        ],
      },
      teams: {
        title: "Team environments",
        items: [
          {title: "Overview", route: "/cli/teams/overview", filters: []},
          {
            title: "Share single environment",
            route: "/cli/teams/shared",
            filters: [],
          },
          {
            title: "Sandbox environments",
            route: "/cli/teams/sandbox",
            filters: [],
          },
          {
            title: "Multiple frontends",
            route: "/cli/teams/multi-frontend",
            filters: [],
          },
          {
            title: "Continuous deployment",
            route: "/cli/teams/cicd",
            filters: [],
          },
          {title: "Commands", route: "/cli/teams/commands", filters: []},
        ],
      },
      usage: {
        title: "Advanced workflows",
        items: [
          {
            title: "Apply tags to generated resources",
            route: "/cli/usage/tags",
            filters: [],
          },
          {
            title: "Monorepo project structure",
            route: "/cli/usage/monorepo",
            filters: [],
          },
          {
            title: "Lambda Triggers",
            route: "/cli/usage/lambda-triggers",
            filters: [],
          },
          {
            title: "Serverless containers",
            route: "/cli/usage/containers",
            filters: [],
          },
          {title: "Mocking and testing", route: "/cli/usage/mock", filters: []},
          {
            title: "Add custom AWS resources",
            route: "/cli/usage/customcf",
            filters: [],
          },
          {title: "IAM Policy", route: "/cli/usage/iam", filters: []},
          {
            title: "IAM Roles & MFA",
            route: "/cli/usage/iam-roles-mfa",
            filters: [],
          },
          {
            title: "IAM Permissions Boundary for Amplify-generated roles",
            route: "/cli/usage/permissions-boundary",
            filters: [],
          },
          {
            title: "Headless mode for CI/CD",
            route: "/cli/usage/headless",
            filters: [],
          },
          {
            title: "Upgrading the CLI",
            route: "/cli/usage/upgrade",
            filters: [],
          },
          {
            title: "Uninstalling the CLI",
            route: "/cli/usage/uninstall",
            filters: [],
          },
        ],
      },
      migration: {
        title: "Migration & Backwards Compatibility",
        items: [
          {
            title: "Node Version Update",
            route: "/lib/migration/lambda-node-version-update",
            filters: [],
          },
          {
            title: "Lambda layer behavior updates",
            route: "/lib/migration/lambda-layers-update",
            filters: [],
          },
        ],
      },
      reference: {
        title: "Reference",
        items: [
          {
            title: "Files and Folders",
            route: "/lib/reference/files",
            filters: [],
          },
          {
            title: "Usage Data in Amplify CLI",
            route: "/lib/reference/usage-data",
            filters: [],
          },
          {
            title: "Feature Flags",
            route: "/lib/reference/feature-flags",
            filters: [],
          },
        ],
      },
    },
  },
  start: {
    productRoot: {
      title: "Getting started",
      route: "/start",
    },
    items: {
      start: {
        title: "Getting started",
        route: "/start",
        filters: [
          "js",
          "react",
          "react-native",
          "angular",
          "vue",
          "next",
          "android",
          "ios",
          "ionic",
          "flutter",
        ],
        items: [],
      },
      "getting-started": {
        title: "Tutorial",
        items: [
          {
            title: "Prerequisites",
            route: "/start/getting-started/installation",
            filters: [
              "js",
              "react",
              "react-native",
              "angular",
              "vue",
              "next",
              "android",
              "ios",
              "ionic",
              "flutter",
            ],
          },
          {
            title: "Set up full stack project",
            route: "/start/getting-started/setup",
            filters: [
              "js",
              "react",
              "react-native",
              "angular",
              "vue",
              "next",
              "android",
              "ios",
              "ionic",
              "flutter",
            ],
          },
          {
            title: "Generate model files",
            route: "/start/getting-started/generate-model",
            filters: ["android", "ios", "flutter"],
          },
          {
            title: "Integrate your app",
            route: "/start/getting-started/integrate",
            filters: ["android", "ios", "ionic", "flutter"],
          },
          {
            title: "Connect to the cloud",
            route: "/start/getting-started/add-api",
            filters: ["android", "ios", "ionic", "flutter"],
          },
          {
            title: "Connect API and database to the app",
            route: "/start/getting-started/data-model",
            filters: [
              "js",
              "react",
              "react-native",
              "angular",
              "vue",
              "next",
              "android",
              "ios",
              "ionic",
              "flutter",
            ],
          },
          {
            title: "Add authentication",
            route: "/start/getting-started/auth",
            filters: ["react", "react-native", "angular", "vue"],
          },
          {
            title: "Deploy and host app",
            route: "/start/getting-started/hosting",
            filters: [
              "js",
              "react",
              "react-native",
              "angular",
              "vue",
              "next",
              "ionic",
            ],
          },
          {
            title: "Next steps",
            route: "/start/getting-started/nextsteps",
            filters: [
              "js",
              "react",
              "react-native",
              "angular",
              "vue",
              "next",
              "android",
              "ios",
              "ionic",
              "flutter",
            ],
          },
        ],
      },
    },
  },
  console: {
    productRoot: {
      title: "Amplify Console",
      route: "/console",
    },
    items: {
      adminui: {
        title: "Admin UI Basics",
        items: [
          {
            title: "Introduction",
            route: "/console/adminui/intro",
          },
          {
            title: "Getting started",
            route: "/console/adminui/start",
          },
          {
            title: "Extend with the Amplify CLI",
            route: "/console/adminui/extend-cli",
          },
          {
            title: "Manage team access",
            route: "/console/adminui/access-management",
          },
          {
            title: "Custom domains",
            route: "/console/adminui/custom-domain",
          },
        ],
      },
      data: {
        title: "Data",
        items: [
          {
            title: "Data modeling",
            route: "/console/data/data-model",
          },
          {
            title: "Relationships",
            route: "/console/data/relationships",
          },
          {
            title: "Content management",
            route: "/console/data/content-management",
          },
        ],
      },
      auth: {
        title: "Authentication",
        items: [
          {
            title: "Authentication",
            route: "/console/auth/authentication",
          },
          {
            title: "Manage authentication for users and groups",
            route: "/console/auth/user-management",
          },
          {
            title: "Import Amazon Cognito resources",
            route: "/console/auth/import",
          },
        ],
      },
      authz: {
        title: "Authorization",
        items: [
          {
            title: "Overview",
            route: "/console/authz/authorization",
          },
          {
            title: "Access control",
            route: "/console/authz/permissions",
          },
        ],
      },
    },
  },
  guides: {
    productRoot: {
      title: "Guides",
      route: "/guides",
    },
    items: {
      guides: {
        title: "Guides",
        route: "/guides",
        filters: ["js", "android", "ios"],
        items: [],
      },
      "api-graphql": {
        title: "API (GraphQL)",
        items: [
          {
            title: "How to Manage Image & File Uploads & Downloads",
            route: "/guides/api-graphql/image-and-file-uploads",
            filters: ["js"],
          },
          {
            title: "Building a Form API with GraphQL",
            route: "/guides/api-graphql/building-a-form-api",
            filters: ["js", "android", "ios"],
          },
          {
            title: "How to create GraphQL subscriptions by id",
            route: "/guides/api-graphql/subscriptions-by-id",
            filters: ["js", "android", "ios"],
          },
          {
            title: "GraphQL pagination",
            route: "/guides/api-graphql/graphql-pagination",
            filters: ["js", "android", "ios"],
          },
          {
            title: "GraphQL query with sorting by date",
            route: "/guides/api-graphql/query-with-sorting",
            filters: ["js", "android", "ios"],
          },
          {
            title: "How to use Lambda GraphQL Resolvers",
            route: "/guides/api-graphql/lambda-resolvers",
            filters: ["js", "android", "ios"],
          },
        ],
      },
      "api-rest": {
        title: "API (REST)",
        items: [
          {
            title: "NodeJS API",
            route: "/guides/api-rest/node-api",
            filters: ["js", "android", "ios"],
          },
          {
            title: "Express Server",
            route: "/guides/api-rest/express-server",
            filters: ["js", "android", "ios"],
          },
          {
            title: "Go API",
            route: "/guides/api-rest/go-api",
            filters: ["js", "android", "ios"],
          },
          {
            title: "Python API",
            route: "/guides/api-rest/python-api",
            filters: ["js", "android", "ios"],
          },
        ],
      },
      authentication: {
        title: "Authentication",
        items: [
          {
            title: "Creating a custom authentication flow",
            route: "/guides/authentication/custom-auth-flow",
            filters: ["js"],
          },
          {
            title: "Email-only sign up and sign in",
            route: "/guides/authentication/email-only-authentication",
            filters: ["js"],
          },
          {
            title: "Listening for authentication events",
            route: "/guides/authentication/listening-for-auth-events",
            filters: ["js"],
          },
          {
            title: "Managing user attributes",
            route: "/guides/authentication/managing-user-attributes",
            filters: ["js"],
          },
        ],
      },
      datastore: {
        title: "Datastore",
        items: [
          {
            title: "Parallel Processing",
            route: "/guides/datastore/parallel-processing",
            filters: ["ios"],
          },
        ],
      },
      functions: {
        title: "Functions",
        items: [
          {
            title:
              "Exporting AppSync operations to a Lambda layer for easy reuse",
            route: "/guides/functions/appsync-operations-to-lambda-layer",
            filters: ["js", "android", "ios"],
          },
          {
            title: "Connecting a REST API to a Lambda function",
            route: "/guides/functions/connecting-a-rest-api",
            filters: ["js", "android", "ios"],
          },
          {
            title: "Integrating DynamoDB with Lambda",
            route: "/guides/functions/integrating-dynamodb-with-lambda",
            filters: ["js", "android", "ios"],
          },
          {
            title: "Calling DynamoDB from Lambda in Node.js",
            route: "/guides/functions/dynamodb-from-js-lambda",
            filters: ["js", "android", "ios"],
          },
          {
            title: "Calling DynamoDB from a Lambda function in Python",
            route: "/guides/functions/dynamodb-from-python-lambda",
            filters: ["js", "android", "ios"],
          },
          {
            title: "Calling GraphQL API from a Lambda function",
            route: "/guides/functions/graphql-from-lambda",
            filters: ["js", "android", "ios"],
          },
          {
            title: "GraphQL Server in Lambda",
            route: "/guides/functions/graphql-server-in-lambda",
            filters: ["js", "android", "ios"],
          },
          {
            title: "Calling DynamoDB using AWS Cognito triggers",
            route: "/guides/functions/cognito-trigger-lambda-dynamodb",
            filters: ["js", "android", "ios"],
          },
          {
            title: "Configuring Lambda function settings",
            route: "/guides/functions/configuring-lambda",
            filters: ["js", "android", "ios"],
          },
        ],
      },
      hosting: {
        title: "Hosting",
        items: [
          {
            title: "Git-based deployments",
            route: "/guides/hosting/git-based-deployments",
            filters: ["js"],
          },
          {
            title: "Local deployments",
            route: "/guides/hosting/local-deployments",
            filters: ["js"],
          },
          {
            title: "Custom Domains",
            route: "/guides/hosting/custom-domains",
            filters: ["js"],
          },
          {
            title: "Password protected deployments",
            route: "/guides/hosting/password-protected-deployments",
            filters: ["js"],
          },
          {
            title: "Pull-request previews",
            route: "/guides/hosting/pull-request-previews",
            filters: ["js"],
          },
          {
            title: "Gatsby",
            route: "/guides/hosting/gatsby",
            filters: ["js"],
          },
          {
            title: "Next.js",
            route: "/guides/hosting/nextjs",
            filters: ["js"],
          },
          {
            title: "Gridsome",
            route: "/guides/hosting/gridsome",
            filters: ["js"],
          },
          {
            title: "Nuxt.js",
            route: "/guides/hosting/nuxt",
            filters: ["js"],
          },
        ],
      },
      "location-service": {
        title: "Location",
        items: [
          {
            title: "Accessing Amazon Location Service",
            route: "/guides/location-service/setting-up-your-app",
            filters: ["js", "android", "ios"],
          },
          {
            title: "Tracking a Device Location",
            route: "/guides/location-service/tracking-device-location",
            filters: ["android", "ios"],
          },
        ],
      },
    },
  },
};

module.exports = directory;
