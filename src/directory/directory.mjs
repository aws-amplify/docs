import { commands } from '../data/cli-commands.mjs';

/**
 * @type {Record<string, import('./directory').Directory>}
 */
export const directory = {
  contribute: {
    productRoot: {
      title: 'Contribute',
      route: '/contribute'
    },
    items: {}
  },
  'flutter-references': {
    productRoot: {
      title: 'Amplify Libraries for Flutter API References',
      route: '/flutter-references'
    },
    items: {}
  },
  lib: {
    productRoot: {
      title: 'Amplify Libraries',
      route: '/lib'
    },
    items: {
      'project-setup': {
        title: 'Project Setup',
        items: [
          {
            title: 'Prerequisites',
            route: '/lib/project-setup/prereq',
            filters: ['android', 'ios', 'flutter', 'js', 'react-native']
          },
          {
            title: 'Create your application',
            route: '/lib/project-setup/create-application',
            filters: ['android', 'ios', 'flutter', 'js', 'react-native']
          },
          {
            title: 'Platform Setup',
            route: '/lib/project-setup/platform-setup',
            filters: ['flutter']
          },
          {
            title: 'Escape hatch',
            route: '/lib/project-setup/escape-hatch',
            filters: ['flutter']
          },
          {
            title: 'Using Combine with Amplify',
            route: '/lib/project-setup/combine',
            filters: ['ios']
          },
          {
            title: 'Upgrade guide',
            route: '/lib/project-setup/upgrade-guide',
            filters: ['android', 'ios', 'flutter']
          },
          {
            title: 'Async Programming Model',
            route: '/lib/project-setup/async',
            filters: ['android']
          },
          {
            title: 'Kotlin Coroutines Support',
            route: '/lib/project-setup/coroutines',
            filters: ['android']
          },
          {
            title: 'Using RxJava with Amplify',
            route: '/lib/project-setup/rxjava',
            filters: ['android']
          },
          {
            title: 'Use existing AWS resources',
            route: '/lib/project-setup/use-existing-resources',
            filters: ['android', 'ios']
          }
        ]
      },
      auth: {
        title: 'Authentication',
        items: [
          {
            title: 'Set up Amplify Auth',
            route: '/lib/auth/getting-started',
            filters: ['android', 'flutter', 'ios', 'js', 'react-native']
          },
          {
            title: 'Enable sign-up, sign-in, and sign-out',
            route: '/lib/auth/emailpassword',
            filters: ['js', 'react-native']
          },
          {
            title: 'Social sign-in (OAuth)',
            route: '/lib/auth/social',
            filters: ['js', 'react-native']
          },
          {
            title: 'Multi-factor authentication',
            route: '/lib/auth/mfa',
            filters: ['js', 'react-native', 'android', 'flutter', 'ios']
          },
          {
            title: 'Password & user management',
            route: '/lib/auth/manageusers',
            filters: ['js', 'react-native']
          },
          {
            title: 'Switching authentication flows',
            route: '/lib/auth/switch-auth',
            filters: ['js', 'react-native']
          },
          {
            title: 'Advanced workflows',
            route: '/lib/auth/advanced',
            filters: ['js', 'react-native']
          },
          {
            title: 'Sign in',
            route: '/lib/auth/signin',
            filters: ['android', 'flutter', 'ios']
          },
          {
            title: 'Switching authentication flows',
            route: '/lib/auth/switch-auth',
            filters: ['ios', 'android']
          },
          {
            title: 'Sign in with custom flow',
            route: '/lib/auth/signin_with_custom_flow',
            filters: ['ios', 'android', 'flutter']
          },
          {
            title: 'Sign in with web UI',
            route: '/lib/auth/signin_web_ui',
            filters: ['android', 'flutter', 'ios']
          },
          {
            title: 'Social sign-in (OAuth)',
            route: '/lib/auth/social',
            filters: ['android', 'flutter', 'ios']
          },
          {
            title: 'SMS flows',
            route: '/lib/auth/sms_flows',
            filters: ['flutter', 'ios', 'android']
          },
          {
            title: 'Sign in next steps',
            route: '/lib/auth/signin_next_steps',
            filters: ['ios', 'android', 'flutter']
          },
          {
            title: 'Guest access',
            route: '/lib/auth/guest_access',
            filters: ['android', 'flutter', 'ios']
          },
          {
            title: 'Auth events',
            route: '/lib/auth/auth-events',
            filters: ['android', 'flutter', 'ios', 'js', 'react-native']
          },
          {
            title: 'User attributes',
            route: '/lib/auth/user-attributes',
            filters: ['android', 'flutter', 'ios']
          },
          {
            title: 'Remember a device',
            route: '/lib/auth/device_features',
            filters: ['android', 'ios', 'js', 'flutter', 'react-native']
          },
          {
            title: 'Password management',
            route: '/lib/auth/password_management',
            filters: ['android', 'flutter', 'ios']
          },
          {
            title: 'Sign out',
            route: '/lib/auth/signOut',
            filters: ['android', 'flutter', 'ios']
          },
          {
            title: 'Accessing credentials',
            route: '/lib/auth/access_credentials',
            filters: ['android', 'flutter', 'ios']
          },
          {
            title: 'Managing credentials',
            route: '/lib/auth/managing_credentials',
            filters: ['flutter']
          },
          {
            title: 'Delete user',
            route: '/lib/auth/delete_user',
            filters: ['android', 'flutter', 'ios', 'js', 'react-native']
          },
          {
            title: 'Escape hatch',
            route: '/lib/auth/escapehatch',
            filters: ['android', 'ios']
          },
          {
            title: 'Advanced workflows',
            route: '/lib/auth/advanced',
            filters: ['android', 'ios', 'flutter']
          },
          {
            title: 'Under the hood',
            route: '/lib/auth/overview',
            filters: ['android', 'ios', 'js', 'react-native']
          }
        ]
      },
      analytics: {
        title: 'Analytics',
        items: [
          {
            title: 'Getting started',
            route: '/lib/analytics/getting-started',
            filters: ['android', 'flutter', 'ios', 'js', 'react-native']
          },
          {
            title: 'Record events',
            route: '/lib/analytics/record',
            filters: ['android', 'flutter', 'ios', 'js', 'react-native']
          },
          {
            title: 'Update Endpoint',
            route: '/lib/analytics/update-endpoint',
            filters: ['js', 'react-native']
          },
          {
            title: 'Automatically track sessions',
            route: '/lib/analytics/autotrack',
            filters: ['android', 'flutter', 'ios', 'js', 'react-native']
          },
          {
            title: 'Enable/Disable Analytics',
            route: '/lib/analytics/enable-disable',
            filters: ['android', 'flutter', 'ios', 'js', 'react-native']
          },
          {
            title: 'Identify user',
            route: '/lib/analytics/identifyuser',
            filters: ['android', 'flutter', 'ios', 'react-native', 'js']
          },
          {
            title: 'Streaming analytics data',
            route: '/lib/analytics/streaming',
            filters: ['js', 'react-native']
          },
          {
            title: 'Create a custom analytics plugin',
            route: '/lib/analytics/create-custom-plugin',
            filters: ['js', 'react-native']
          },
          {
            title: 'Storing analytics data',
            route: '/lib/analytics/storing',
            filters: ['js', 'react-native']
          },
          {
            title: 'Personalized recommendations',
            route: '/lib/analytics/personalize',
            filters: ['js', 'react-native']
          },
          {
            title: 'Escape hatch',
            route: '/lib/analytics/escapehatch',
            filters: ['android', 'ios']
          },
          {
            title: 'Use existing AWS resources',
            route: '/lib/analytics/existing-resources',
            filters: ['android', 'flutter', 'ios', 'js', 'react-native']
          }
        ]
      },
      graphqlapi: {
        title: 'API (GraphQL)',
        items: [
          {
            title: 'Getting started',
            route: '/lib/graphqlapi/getting-started',
            filters: ['android', 'flutter', 'ios', 'js', 'react-native']
          },
          {
            title: 'Concepts',
            route: '/lib/graphqlapi/concepts',
            filters: ['android', 'flutter', 'ios', 'js', 'react-native']
          },
          {
            title: 'Configure authorization modes',
            route: '/lib/graphqlapi/authz',
            filters: ['android', 'flutter', 'ios', 'js', 'react-native']
          },
          {
            title: 'Create, update, delete data',
            route: '/lib/graphqlapi/mutate-data',
            filters: ['android', 'flutter', 'ios', 'js', 'react-native']
          },
          {
            title: 'Fetch data',
            route: '/lib/graphqlapi/query-data',
            filters: ['android', 'flutter', 'ios', 'js', 'react-native']
          },
          {
            title: 'Subscribe to data',
            route: '/lib/graphqlapi/subscribe-data',
            filters: ['android', 'flutter', 'ios', 'js', 'react-native']
          },
          {
            title: 'Working with files and attachments',
            route: '/lib/graphqlapi/working-with-files',
            filters: ['js', 'ios']
          },
          {
            title: 'Optimistic UI',
            route: '/lib/graphqlapi/optimistic-ui',
            filters: ['js', 'ios']
          },
          {
            title: 'Cancel API requests',
            route: '/lib/graphqlapi/cancel-request',
            filters: ['js', 'react-native']
          },
          {
            title: 'Offline scenarios',
            route: '/lib/graphqlapi/offline',
            filters: ['js', 'react-native', 'flutter', 'android', 'ios']
          },
          {
            title: 'GraphQL from NodeJS',
            route: '/lib/graphqlapi/graphql-from-nodejs',
            filters: ['js', 'react-native', 'react-native']
          },
          {
            title: 'Advanced Workflows',
            route: '/lib/graphqlapi/advanced-workflows',
            filters: ['android', 'flutter', 'ios', 'js', 'react-native']
          },
          {
            title: 'Use existing AWS resources',
            route: '/lib/graphqlapi/existing-resources',
            filters: ['android', 'flutter', 'ios', 'js', 'react-native']
          },
          {
            title: 'Upgrade guide from AppSync SDK',
            route: '/lib/graphqlapi/upgrade-guide',
            filters: ['js', 'ios']
          }
        ]
      },
      restapi: {
        title: 'API (REST)',
        items: [
          {
            title: 'Getting started',
            route: '/lib/restapi/getting-started',
            filters: ['android', 'ios', 'flutter', 'js', 'react-native']
          },
          {
            title: 'Fetching data',
            route: '/lib/restapi/fetch',
            filters: ['android', 'ios', 'flutter', 'js', 'react-native']
          },
          {
            title: 'Updating data',
            route: '/lib/restapi/update',
            filters: ['android', 'ios', 'flutter', 'js', 'react-native']
          },
          {
            title: 'Deleting data',
            route: '/lib/restapi/delete',
            filters: ['android', 'ios', 'flutter', 'js', 'react-native']
          },
          {
            title: 'Cancel API requests',
            route: '/lib/restapi/cancel',
            filters: ['js', 'react-native']
          },
          {
            title: 'Define authorization rules',
            route: '/lib/restapi/authz',
            filters: ['android', 'ios', 'flutter', 'js', 'react-native']
          },
          {
            title: 'Use existing AWS resources',
            route: '/lib/restapi/existing-resources',
            filters: ['android', 'ios', 'flutter']
          }
        ]
      },
      datastore: {
        title: 'DataStore',
        items: [
          {
            title: 'Getting started',
            route: '/lib/datastore/getting-started',
            filters: ['android', 'flutter', 'ios', 'js', 'react-native']
          },
          {
            title: 'Manipulating data',
            route: '/lib/datastore/data-access',
            filters: ['android', 'flutter', 'ios', 'js', 'react-native']
          },
          {
            title: 'Relational models',
            route: '/lib/datastore/relational',
            filters: ['android', 'flutter', 'ios', 'js', 'react-native']
          },
          {
            title: 'Syncing data to cloud',
            route: '/lib/datastore/sync',
            filters: ['android', 'flutter', 'ios', 'js', 'react-native']
          },
          {
            title: 'Setup authorization rules',
            route: '/lib/datastore/setup-auth-rules',
            filters: ['android', 'flutter', 'ios', 'js', 'react-native']
          },
          {
            title: 'Conflict resolution',
            route: '/lib/datastore/conflict',
            filters: ['android', 'flutter', 'ios', 'js', 'react-native']
          },
          {
            title: 'Real time',
            route: '/lib/datastore/real-time',
            filters: ['android', 'flutter', 'ios', 'js', 'react-native']
          },
          {
            title: 'DataStore Events',
            route: '/lib/datastore/datastore-events',
            filters: ['android', 'flutter', 'ios', 'js', 'react-native']
          },
          {
            title: 'Other methods',
            route: '/lib/datastore/other-methods',
            filters: ['android', 'flutter', 'ios', 'js', 'react-native']
          },
          {
            title: 'Schema updates',
            route: '/lib/datastore/schema-updates',
            filters: ['android', 'flutter', 'ios', 'js', 'react-native']
          },
          {
            title: 'How it works',
            route: '/lib/datastore/how-it-works',
            filters: ['android', 'flutter', 'ios', 'js', 'react-native']
          },
          {
            title: 'Examples',
            route: '/lib/datastore/examples',
            filters: ['js', 'react-native']
          },
          {
            title: 'Advanced workflows',
            route: '/lib/datastore/advanced-workflows',
            filters: ['android', 'flutter', 'ios', 'js', 'react-native']
          }
        ]
      },
      geo: {
        title: 'Geo',
        items: [
          {
            title: 'Getting started',
            route: '/lib/geo/getting-started',
            filters: ['js', 'ios', 'android']
          },
          {
            title: 'Maps',
            route: '/lib/geo/maps',
            filters: ['js', 'ios', 'android']
          },
          {
            title: 'Location Search',
            route: '/lib/geo/search',
            filters: ['js', 'ios', 'android']
          },
          {
            title: 'Geofences',
            route: '/lib/geo/geofences',
            filters: ['js']
          },
          {
            title: 'Use existing Amazon Location resources',
            route: '/lib/geo/existing-resources',
            filters: ['js', 'ios', 'android']
          },
          {
            title: 'Migrating from Google Maps',
            route: '/lib/geo/google-migration',
            filters: ['js']
          },
          {
            title: 'Escape Hatch',
            route: '/lib/geo/escapehatch',
            filters: ['js', 'ios', 'android']
          }
        ]
      },
      'in-app-messaging': {
        title: 'In-App Messaging',
        items: [
          {
            title: 'Overview',
            route: '/lib/in-app-messaging/overview',
            filters: ['react-native', 'js']
          },
          {
            title: 'Getting started',
            route: '/lib/in-app-messaging/getting-started',
            filters: ['react-native', 'js']
          },
          {
            title: 'Create an In-App Messaging campaign',
            route: '/lib/in-app-messaging/create-campaign',
            filters: ['react-native', 'js']
          },
          {
            title: 'Integrate your application',
            route: '/lib/in-app-messaging/integrate-your-application',
            filters: ['react-native', 'js']
          },
          {
            title: 'Sync messages',
            route: '/lib/in-app-messaging/sync-messages',
            filters: ['react-native', 'js']
          },
          {
            title: 'Display message',
            route: '/lib/in-app-messaging/display-message',
            filters: ['react-native', 'js']
          },
          {
            title: 'Clear messages',
            route: '/lib/in-app-messaging/clear-messages',
            filters: ['react-native', 'js']
          },
          {
            title: 'Identify a user',
            route: '/lib/in-app-messaging/identify-user',
            filters: ['react-native', 'js']
          },
          {
            title: 'Respond to interaction events',
            route: '/lib/in-app-messaging/respond-interaction-events',
            filters: ['react-native', 'js']
          },
          {
            title: 'Resolving conflicts',
            route: '/lib/in-app-messaging/resolve-conflicts',
            filters: ['react-native', 'js']
          }
        ]
      },
      interactions: {
        title: 'Interactions',
        items: [
          {
            title: 'Getting started',
            route: '/lib/interactions/getting-started',
            filters: ['js', 'react-native']
          },
          {
            title: 'Interact with bots',
            route: '/lib/interactions/chatbot',
            filters: ['js', 'react-native']
          }
        ]
      },
      predictions: {
        title: 'Predictions',
        items: [
          // TODO Rewrite why do we have an intro for RN and JS and not iOS/Android?
          {
            title: 'Overview',
            route: '/lib/predictions/intro',
            filters: ['js', 'react-native']
          },
          {
            title: 'Getting started',
            route: '/lib/predictions/getting-started',
            filters: ['android', 'ios', 'js', 'react-native']
          },
          {
            title: 'Text to speech',
            route: '/lib/predictions/text-speech',
            filters: ['android', 'ios', 'js', 'react-native']
          },
          {
            title: 'Transcribe audio to text',
            route: '/lib/predictions/transcribe',
            filters: ['js', 'ios', 'react-native']
          },
          {
            title: 'Translate language',
            route: '/lib/predictions/translate',
            filters: ['android', 'ios', 'js', 'react-native']
          },
          {
            title: 'Identify text',
            route: '/lib/predictions/identify-text',
            filters: ['android', 'ios', 'js', 'react-native']
          },
          {
            title: 'Identify entities from images',
            route: '/lib/predictions/identify-entity',
            filters: ['android', 'ios', 'js', 'react-native']
          },
          {
            title: 'Label objects in image',
            route: '/lib/predictions/label-image',
            filters: ['android', 'ios', 'js', 'react-native']
          },
          {
            title: 'Interpret sentiment',
            route: '/lib/predictions/interpret',
            filters: ['android', 'ios', 'js', 'react-native']
          },
          {
            title: 'Escape hatch',
            route: '/lib/predictions/escapehatch',
            filters: ['android', 'ios']
          },
          {
            title: 'Example',
            route: '/lib/predictions/sample',
            filters: ['js', 'react-native']
          }
        ]
      },
      pubsub: {
        title: 'PubSub',
        items: [
          {
            title: 'Getting started',
            route: '/lib/pubsub/getting-started',
            filters: ['js', 'react-native']
          },
          {
            title: 'Subscribe & Unsubscribe',
            route: '/lib/pubsub/subunsub',
            filters: ['js', 'react-native']
          },
          {
            title: 'Publish',
            route: '/lib/pubsub/publish',
            filters: ['js', 'react-native']
          }
        ]
      },
      'push-notifications': {
        title: 'Push Notifications',
        items: [
          {
            title: 'Getting started',
            route: '/lib/push-notifications/getting-started',
            filters: ['android', 'flutter', 'ios', 'react-native']
          },
          {
            title: 'Register device',
            route: '/lib/push-notifications/register-device',
            filters: ['ios']
          },
          {
            title: 'Record notification events',
            route: '/lib/push-notifications/record-notifications',
            filters: ['ios']
          },
          {
            title: 'Request permissions',
            route: '/lib/push-notifications/request-permissions',
            filters: ['flutter', 'react-native']
          },
          {
            title: 'Receive device token',
            route: '/lib/push-notifications/receive-device-token',
            filters: ['flutter', 'react-native']
          },
          {
            title: 'Interact with notifications',
            route: '/lib/push-notifications/interact-with-notifications',
            filters: ['flutter', 'react-native']
          },
          {
            title: 'Identify user',
            route: '/lib/push-notifications/identify-user',
            filters: ['android', 'flutter', 'ios', 'react-native']
          },
          {
            title: 'App badge count',
            route: '/lib/push-notifications/app-badge-count',
            filters: ['flutter', 'react-native']
          },
          {
            title: 'Enable rich notifications',
            route: '/lib/push-notifications/enable-rich-notifications',
            filters: ['flutter', 'react-native']
          },
          {
            title: 'Remote media',
            route: '/lib/push-notifications/remote-media',
            filters: ['ios']
          },
          {
            title: 'Testing',
            route: '/lib/push-notifications/testing',
            filters: ['android', 'flutter', 'ios', 'react-native']
          },
          {
            title: 'Set up push notification services',
            route: '/lib/push-notifications/setup-push-service',
            filters: ['android', 'flutter', 'ios', 'react-native']
          },
          {
            title: 'Migrate from previous version',
            route: '/lib/push-notifications/migrate-from-previous-version',
            filters: ['react-native']
          }
        ]
      },
      storage: {
        title: 'Storage',
        items: [
          {
            title: 'Set up Amplify Storage',
            route: '/lib/storage/getting-started',
            filters: ['android', 'ios', 'flutter', 'js', 'react-native']
          },
          {
            title: 'Concepts',
            route: '/lib/storage/overview',
            filters: ['android', 'ios', 'flutter', 'js', 'react-native']
          },
          {
            title: 'Upload files',
            route: '/lib/storage/upload',
            filters: ['android', 'ios', 'js', 'react-native', 'flutter']
          },
          {
            title: 'Download files',
            route: '/lib/storage/download',
            filters: ['android', 'ios', 'flutter', 'js', 'react-native']
          },
          {
            title: 'Query Transfers',
            route: '/lib/storage/querytransfers',
            filters: ['android']
          },
          {
            title: 'Get file properties',
            route: '/lib/storage/get-properties',
            filters: ['flutter', 'js', 'react-native']
          },
          {
            title: 'List files',
            route: '/lib/storage/list',
            filters: ['android', 'ios', 'flutter', 'js', 'react-native']
          },
          {
            title: 'Copy files',
            route: '/lib/storage/copy',
            filters: ['js', 'react-native', 'flutter']
          },
          {
            title: 'Move files',
            route: '/lib/storage/move',
            filters: ['flutter']
          },
          {
            title: 'Remove files',
            route: '/lib/storage/remove',
            filters: ['android', 'ios', 'flutter', 'js', 'react-native']
          },
          {
            title: 'Cancel requests',
            route: '/lib/storage/cancel-requests',
            filters: ['js', 'react-native']
          },
          {
            title: 'File access levels',
            route: '/lib/storage/configureaccess',
            filters: ['android', 'ios', 'flutter', 'js', 'react-native']
          },
          {
            title: 'Automatically track Storage events',
            route: '/lib/storage/autotrack',
            filters: ['js', 'react-native']
          },
          {
            title: 'Use Transfer Acceleration',
            route: '/lib/storage/transfer-acceleration',
            filters: ['android', 'js', 'react-native', 'flutter']
          },
          {
            title: 'Lambda triggers',
            route: '/lib/storage/triggers',
            filters: ['android', 'ios', 'flutter', 'js', 'react-native']
          },
          {
            title: 'Custom Plugin',
            route: '/lib/storage/custom-plugin',
            filters: ['js', 'react-native']
          },
          {
            title: 'Escape hatch',
            route: '/lib/storage/escapehatch',
            filters: ['android', 'ios']
          },
          {
            title: 'Use existing AWS resources',
            route: '/lib/storage/existing-resources',
            filters: ['android', 'ios', 'flutter', 'js', 'react-native']
          }
        ]
      },
      logging: {
        title: 'Logging',
        items: [
          {
            title: 'Set up Logging',
            route: '/lib/logging/setup-logging',
            filters: ['ios', 'android']
          },
          {
            title: 'Send Logs',
            route: '/lib/logging/sending-logs',
            filters: ['ios', 'android']
          },
          {
            title: 'Change Log Levels',
            route: '/lib/logging/change-log-levels',
            filters: ['ios', 'android']
          },
          {
            title: 'Flush Logs',
            route: '/lib/logging/flush-logs',
            filters: ['ios', 'android']
          },
          {
            title: 'Enable/Disable Logging',
            route: '/lib/logging/enable-disable',
            filters: ['ios', 'android']
          },
          {
            title: 'Configure User Allow List',
            route: '/lib/logging/configure-user',
            filters: ['ios', 'android']
          },
          {
            title: 'View Logs',
            route: '/lib/logging/access-logs',
            filters: ['ios', 'android']
          },
          {
            title: 'Remotely Change Log Levels',
            route: '/lib/logging/remote-configuration',
            filters: ['ios', 'android']
          },
          {
            title: 'Change Local Storage',
            route: '/lib/logging/change-local-storage',
            filters: ['ios', 'android']
          },
          {
            title: 'Listen to Log Events',
            route: '/lib/logging/hub-events',
            filters: ['ios', 'android']
          },
          {
            title: 'Escape Hatch',
            route: '/lib/logging/escapehatch',
            filters: ['ios', 'android']
          }
        ]
      },
      utilities: {
        title: 'Utilities',
        items: [
          // TODO Rewrite do we have service workers for React native?
          {
            title: 'Service Worker',
            route: '/lib/utilities/serviceworker',
            filters: ['js']
          },
          {
            title: 'Cache',
            route: '/lib/utilities/cache',
            filters: ['js', 'react-native']
          },
          {
            title: 'Hub',
            route: '/lib/utilities/hub',
            filters: ['android', 'ios', 'js', 'react-native']
          },
          {
            title: 'Internationalization',
            route: '/lib/utilities/i18n',
            filters: ['js', 'react-native']
          },
          {
            title: 'Logger',
            route: '/lib/utilities/logger',
            filters: ['js', 'react-native']
          }
        ]
      },
      'client-configuration': {
        title: 'Client configuration',
        items: [
          {
            title: 'Configuring Amplify Categories',
            route: '/lib/client-configuration/configuring-amplify-categories',
            filters: ['js', 'react-native']
          }
        ]
      },
      debugging: {
        title: 'Debugging',
        items: [
          {
            title: 'Developer Menu',
            route: '/lib/debugging/dev-menu',
            filters: ['android', 'ios']
          }
        ]
      },
      info: {
        title: 'Info',
        items: [
          {
            title: 'Data Information',
            route: '/lib/info/overview',
            filters: ['ios']
          },
          {
            title: 'Uninstalling the app',
            route: '/lib/info/app-uninstall',
            filters: ['android', 'ios']
          }
        ]
      },
      ssr: {
        title: 'Server-Side Rendering',
        items: [
          {
            title: 'Getting Started with Server-Side Rendering (SSR)',
            route: '/lib/ssr',
            filters: ['js']
          }
        ]
      },
      troubleshooting: {
        title: 'Troubleshooting',
        items: [
          {
            title: 'Upgrading Amplify packages',
            route: '/lib/troubleshooting/upgrading',
            filters: ['flutter', 'js', 'react-native']
          },
          {
            title: 'TypeScript strict mode',
            route: '/lib/troubleshooting/strict-mode',
            filters: ['js', 'react-native']
          }
        ]
      }
    }
  },
  'lib-v1': {
    productRoot: {
      title: 'Amplify Libraries',
      route: '/lib-v1'
    },
    items: {
      'project-setup': {
        title: 'Project Setup',
        items: [
          {
            title: 'Prerequisites',
            route: '/lib-v1/project-setup/prereq',
            filters: ['android', 'ios', 'flutter', 'js', 'react-native']
          },
          {
            title: 'Create your application',
            route: '/lib-v1/project-setup/create-application',
            filters: ['android', 'ios', 'flutter', 'js']
          },
          {
            title: 'Using Combine with Amplify',
            route: '/lib-v1/project-setup/combine',
            filters: ['ios']
          },
          {
            title: 'Async Programming Model',
            route: '/lib-v1/project-setup/async',
            filters: ['android']
          },
          {
            title: 'Kotlin Coroutines Support',
            route: '/lib-v1/project-setup/coroutines',
            filters: ['android']
          },
          {
            title: 'Using RxJava with Amplify',
            route: '/lib-v1/project-setup/rxjava',
            filters: ['android']
          },
          {
            title: 'Use existing AWS resources',
            route: '/lib-v1/project-setup/use-existing-resources',
            filters: ['android', 'ios']
          },
          {
            title: 'Platform Setup',
            route: '/lib-v1/project-setup/platform-setup',
            filters: ['flutter']
          },
          {
            title: 'Escape hatch',
            route: '/lib-v1/project-setup/escape-hatch',
            filters: ['flutter']
          }
        ]
      },
      analytics: {
        title: 'Analytics',
        items: [
          {
            title: 'Getting started',
            route: '/lib-v1/analytics/getting-started',
            filters: ['android', 'ios', 'flutter', 'js', 'react-native']
          },
          {
            title: 'Record events',
            route: '/lib-v1/analytics/record',
            filters: ['android', 'ios', 'flutter', 'js', 'react-native']
          },
          {
            title: 'Identify user',
            route: '/lib-v1/analytics/identifyuser',
            filters: ['android', 'ios', 'flutter', 'js', 'react-native']
          },
          {
            title: 'Automatically track sessions',
            route: '/lib-v1/analytics/autotrack',
            filters: ['android', 'ios', 'flutter']
          },
          {
            title: 'Enable/Disable Analytics',
            route: '/lib-v1/analytics/enable-disable',
            filters: ['android', 'ios', 'flutter']
          },
          {
            title: 'Escape hatch',
            route: '/lib-v1/analytics/escapehatch',
            filters: ['android', 'ios']
          },
          {
            title: 'Use existing AWS resources',
            route: '/lib-v1/analytics/existing-resources',
            filters: ['android', 'ios', 'flutter']
          }
        ]
      },
      graphqlapi: {
        title: 'API (GraphQL)',
        items: [
          {
            title: 'Getting started',
            route: '/lib-v1/graphqlapi/getting-started',
            filters: ['android', 'ios', 'flutter']
          },
          {
            title: 'Concepts',
            route: '/lib-v1/graphqlapi/concepts',
            filters: ['android', 'ios', 'flutter']
          },
          {
            title: 'Configure authorization modes',
            route: '/lib-v1/graphqlapi/authz',
            filters: ['android', 'ios', 'flutter']
          },
          {
            title: 'Create, update, delete data',
            route: '/lib-v1/graphqlapi/mutate-data',
            filters: ['android', 'ios', 'flutter']
          },
          {
            title: 'Fetch data',
            route: '/lib-v1/graphqlapi/query-data',
            filters: ['android', 'ios', 'flutter']
          },
          {
            title: 'Subscribe to data',
            route: '/lib-v1/graphqlapi/subscribe-data',
            filters: ['android', 'ios', 'flutter']
          },
          {
            title: 'Offline scenarios',
            route: '/lib-v1/graphqlapi/offline',
            filters: ['android', 'ios', 'flutter']
          },
          {
            title: 'Advanced Workflows',
            route: '/lib-v1/graphqlapi/advanced-workflows',
            filters: ['android', 'ios', 'flutter']
          },
          {
            title: 'Use existing AWS resources',
            route: '/lib-v1/graphqlapi/existing-resources',
            filters: ['android', 'ios', 'flutter']
          }
        ]
      },
      restapi: {
        title: 'API (REST)',
        items: [
          {
            title: 'Getting started',
            route: '/lib-v1/restapi/getting-started',
            filters: ['android', 'ios', 'flutter']
          },
          {
            title: 'Fetching data',
            route: '/lib-v1/restapi/fetch',
            filters: ['android', 'ios', 'flutter']
          },
          {
            title: 'Updating data',
            route: '/lib-v1/restapi/update',
            filters: ['android', 'ios', 'flutter']
          },
          {
            title: 'Deleting data',
            route: '/lib-v1/restapi/delete',
            filters: ['android', 'ios', 'flutter']
          },
          {
            title: 'Define authorization rules',
            route: '/lib-v1/restapi/authz',
            filters: ['android', 'ios', 'flutter']
          },
          {
            title: 'Use existing AWS resources',
            route: '/lib-v1/restapi/existing-resources',
            filters: ['android', 'ios', 'flutter']
          }
        ]
      },
      auth: {
        title: 'Authentication',
        items: [
          {
            title: 'Set up Amplify Auth',
            route: '/lib-v1/auth/getting-started',
            filters: ['android', 'ios', 'flutter', 'js', 'react-native']
          },
          {
            title: 'Enable sign-up, sign-in, and sign-out',
            route: '/lib-v1/auth/emailpassword',
            filters: ['js', 'react-native']
          },
          {
            title: 'Sign in',
            route: '/lib-v1/auth/signin',
            filters: ['android', 'ios', 'flutter']
          },
          {
            title: 'Sign in with custom flow',
            route: '/lib-v1/auth/signin_with_custom_flow',
            filters: ['ios', 'flutter']
          },
          {
            title: 'Sign in with web UI',
            route: '/lib-v1/auth/signin_web_ui',
            filters: ['android', 'ios', 'flutter']
          },
          {
            title: 'Social sign-in (OAuth)',
            route: '/lib-v1/auth/social',
            filters: ['android', 'ios', 'flutter', 'js', 'react-native']
          },
          {
            title: 'Multi-factor authentication',
            route: '/lib-v1/auth/mfa',
            filters: ['js', 'react-native']
          },
          {
            title: 'Password & user management',
            route: '/lib-v1/auth/manageusers',
            filters: ['js', 'react-native']
          },
          {
            title: 'Switching authentication flows',
            route: '/lib-v1/auth/switch-auth',
            filters: ['js', 'react-native']
          },
          {
            title: 'Advanced workflows',
            route: '/lib-v1/auth/advanced',
            filters: ['js', 'react-native']
          },
          {
            title: 'Sign in next steps',
            route: '/lib-v1/auth/signin_next_steps',
            filters: ['ios']
          },
          {
            title: 'SMS flows',
            route: '/lib-v1/auth/sms_flows',
            filters: ['flutter']
          },
          {
            title: 'Guest access',
            route: '/lib-v1/auth/guest_access',
            filters: ['android', 'ios', 'flutter']
          },
          {
            title: 'Auth events',
            route: '/lib-v1/auth/auth-events',
            filters: ['android', 'ios', 'flutter', 'js', 'react-native']
          },
          {
            title: 'User attributes',
            route: '/lib-v1/auth/user-attributes',
            filters: ['android', 'ios', 'flutter']
          },
          {
            title: 'Remember a device',
            route: '/lib-v1/auth/device_features',
            filters: ['android', 'ios', 'flutter', 'js', 'react-native']
          },
          {
            title: 'Password management',
            route: '/lib-v1/auth/password_management',
            filters: ['android', 'ios', 'flutter']
          },
          {
            title: 'Sign out',
            route: '/lib-v1/auth/signOut',
            filters: ['android', 'ios', 'flutter']
          },
          {
            title: 'Accessing credentials',
            route: '/lib-v1/auth/access_credentials',
            filters: ['android', 'ios', 'flutter']
          },
          {
            title: 'Managing credentials',
            route: '/lib-v1/auth/managing_credentials',
            filters: ['flutter']
          },
          {
            title: 'Delete user',
            route: '/lib-v1/auth/delete_user',
            filters: ['android', 'ios', 'flutter', 'js', 'react-native']
          },
          {
            title: 'Escape hatch',
            route: '/lib-v1/auth/escapehatch',
            filters: ['android', 'ios']
          },
          {
            title: 'Under the hood',
            route: '/lib-v1/auth/overview',
            filters: ['android', 'ios', 'js', 'react-native']
          }
        ]
      },
      datastore: {
        title: 'DataStore',
        items: [
          {
            title: 'Getting started',
            route: '/lib-v1/datastore/getting-started',
            filters: ['android', 'ios', 'flutter']
          },
          {
            title: 'Manipulating data',
            route: '/lib-v1/datastore/data-access',
            filters: ['android', 'ios', 'flutter']
          },
          {
            title: 'Relational models',
            route: '/lib-v1/datastore/relational',
            filters: ['android', 'ios', 'flutter']
          },
          {
            title: 'Syncing data to cloud',
            route: '/lib-v1/datastore/sync',
            filters: ['android', 'ios', 'flutter']
          },
          {
            title: 'Setup authorization rules',
            route: '/lib-v1/datastore/setup-auth-rules',
            filters: ['android', 'ios', 'flutter']
          },
          {
            title: 'Conflict resolution',
            route: '/lib-v1/datastore/conflict',
            filters: ['android', 'ios', 'flutter']
          },
          {
            title: 'Real time',
            route: '/lib-v1/datastore/real-time',
            filters: ['android', 'ios', 'flutter']
          },
          {
            title: 'DataStore Events',
            route: '/lib-v1/datastore/datastore-events',
            filters: ['android', 'ios', 'flutter']
          },
          {
            title: 'Other methods',
            route: '/lib-v1/datastore/other-methods',
            filters: ['android', 'ios', 'flutter']
          },
          {
            title: 'Schema updates',
            route: '/lib-v1/datastore/schema-updates',
            filters: ['android', 'ios', 'flutter']
          },
          {
            title: 'How it works',
            route: '/lib-v1/datastore/how-it-works',
            filters: ['android', 'ios', 'flutter']
          },
          {
            title: 'Advanced workflows',
            route: '/lib-v1/datastore/advanced-workflows',
            filters: ['flutter']
          }
        ]
      },
      geo: {
        title: 'Geo',
        items: [
          {
            title: 'Getting started',
            route: '/lib-v1/geo/getting-started',
            filters: ['android', 'ios']
          },
          {
            title: 'Maps',
            route: '/lib-v1/geo/maps',
            filters: ['android', 'ios']
          },
          {
            title: 'Location Search',
            route: '/lib-v1/geo/search',
            filters: ['android', 'ios']
          },
          {
            title: 'Use existing Amazon Location resources',
            route: '/lib-v1/geo/existing-resources',
            filters: ['android', 'ios']
          },
          {
            title: 'Escape Hatch',
            route: '/lib-v1/geo/escapehatch',
            filters: ['android', 'ios']
          }
        ]
      },
      predictions: {
        title: 'Predictions',
        items: [
          {
            title: 'Getting started',
            route: '/lib-v1/predictions/getting-started',
            filters: ['android', 'ios']
          },
          {
            title: 'Text to speech',
            route: '/lib-v1/predictions/text-speech',
            filters: ['android', 'ios']
          },
          {
            title: 'Transcribe audio to text',
            route: '/lib-v1/predictions/transcribe',
            filters: ['android', 'ios']
          },
          {
            title: 'Translate language',
            route: '/lib-v1/predictions/translate',
            filters: ['android', 'ios']
          },
          {
            title: 'Identify text',
            route: '/lib-v1/predictions/identify-text',
            filters: ['android', 'ios']
          },
          {
            title: 'Identify entities from images',
            route: '/lib-v1/predictions/identify-entity',
            filters: ['android', 'ios']
          },
          {
            title: 'Label objects in image',
            route: '/lib-v1/predictions/label-image',
            filters: ['android', 'ios']
          },
          {
            title: 'Interpret sentiment',
            route: '/lib-v1/predictions/interpret',
            filters: ['android', 'ios']
          },
          {
            title: 'Escape hatch',
            route: '/lib-v1/predictions/escapehatch',
            filters: ['android', 'ios']
          }
        ]
      },
      storage: {
        title: 'Storage',
        items: [
          {
            title: 'Getting started',
            route: '/lib-v1/storage/getting-started',
            filters: ['android', 'ios', 'flutter', 'js', 'react-native']
          },
          {
            title: 'Concepts',
            route: '/lib-v1/storage/overview',
            filters: ['android', 'ios', 'flutter', 'js', 'react-native']
          },
          {
            title: 'Upload files',
            route: '/lib-v1/storage/upload',
            filters: ['android', 'ios', 'flutter', 'js', 'react-native']
          },
          {
            title: 'Download files',
            route: '/lib-v1/storage/download',
            filters: ['android', 'ios', 'flutter', `js`, `react-native`]
          },
          {
            title: 'Get file properties',
            route: '/lib-v1/storage/get-properties',
            filters: ['flutter', 'js', 'react-native']
          },
          {
            title: 'List files',
            route: '/lib-v1/storage/list',
            filters: ['android', 'ios', 'flutter', 'js', 'react-native']
          },
          {
            title: 'Copy files',
            route: '/lib-v1/storage/copy',
            filters: ['js', 'react-native', 'flutter', 'js', 'react-native']
          },
          {
            title: 'Remove file',
            route: '/lib-v1/storage/remove',
            filters: ['android', 'ios', 'flutter', 'js', 'react-native']
          },
          {
            title: 'File access levels',
            route: '/lib-v1/storage/configureaccess',
            filters: ['android', 'ios', 'flutter', 'js', 'react-native']
          },
          {
            title: 'Lambda triggers',
            route: '/lib-v1/storage/triggers',
            filters: ['android', 'ios', 'flutter', 'js', 'react-native']
          },
          {
            title: 'Escape hatch',
            route: '/lib-v1/storage/escapehatch',
            filters: ['android', 'ios']
          },
          {
            title: 'Use existing AWS resources',
            route: '/lib-v1/storage/existing-resources',
            filters: ['android', 'ios', 'flutter', 'js', 'react-native']
          }
        ]
      },
      ssr: {
        title: 'Server-Side Rendering',
        items: [
          {
            title: 'Getting Started with Server-Side Rendering (SSR)',
            route: '/lib-v1/ssr',
            filters: ['js']
          }
        ]
      },
      troubleshooting: {
        title: 'Troubleshooting',
        items: [
          {
            title: 'Upgrading Amplify packages',
            route: '/lib-v1/troubleshooting/upgrading',
            filters: ['flutter', 'js', 'react-native']
          },
          {
            title: 'TypeScript strict mode',
            route: '/lib/troubleshooting/strict-mode',
            filters: ['js', 'react-native']
          }
        ]
      },
      utilities: {
        title: 'Utilities',
        items: [
          {
            title: 'Hub',
            route: '/lib-v1/utilities/hub',
            filters: ['android', 'ios']
          }
        ]
      },
      debugging: {
        title: 'Debugging',
        items: [
          {
            title: 'Developer Menu',
            route: '/lib-v1/debugging/dev-menu',
            filters: ['android', 'ios']
          }
        ]
      },
      info: {
        title: 'Info',
        items: [
          {
            title: 'Data Information',
            route: '/lib-v1/info/overview',
            filters: ['ios']
          },
          {
            title: 'Uninstalling the app',
            route: '/lib-v1/info/app-uninstall',
            filters: ['ios']
          }
        ]
      }
    }
  },
  sdk: {
    productRoot: {
      title: 'AWS Mobile SDK',
      route: '/sdk'
    },
    items: {
      api: {
        title: 'API',
        items: [
          {
            title: 'GraphQL - Realtime and Offline',
            route: '/sdk/api/graphql',
            filters: ['android', 'ios']
          },
          {
            title: 'REST API',
            route: '/sdk/api/rest',
            filters: ['android', 'ios']
          }
        ]
      },
      analytics: {
        title: 'Analytics',
        items: [
          {
            title: 'Getting Started',
            route: '/sdk/analytics/getting-started',
            filters: ['android', 'ios']
          },
          {
            title: 'Events',
            route: '/sdk/analytics/events',
            filters: ['android', 'ios']
          },
          {
            title: 'Endpoints',
            route: '/sdk/analytics/endpoints',
            filters: ['android', 'ios']
          },
          {
            title: 'Using Amazon Kinesis',
            route: '/sdk/analytics/kinesis',
            filters: ['android', 'ios']
          }
        ]
      },
      auth: {
        title: 'Authentication',
        items: [
          {
            title: 'Getting started',
            route: '/sdk/auth/getting-started',
            filters: ['android', 'ios']
          },
          {
            title: 'Overview',
            route: '/sdk/auth/how-it-works',
            filters: ['android', 'ios']
          },
          {
            title: 'Guest access',
            route: '/sdk/auth/guest-access',
            filters: ['android', 'ios']
          },
          {
            title: 'Drop-in auth',
            route: '/sdk/auth/drop-in-auth',
            filters: ['android', 'ios']
          },
          {
            title: 'Working with the API',
            route: '/sdk/auth/working-with-api',
            filters: ['android', 'ios']
          },
          {
            title: 'Federated identities',
            route: '/sdk/auth/federated-identities',
            filters: ['android', 'ios']
          },
          {
            title: 'Hosted UI',
            route: '/sdk/auth/hosted-ui',
            filters: ['android', 'ios']
          },
          {
            title: 'Custom auth flow',
            route: '/sdk/auth/custom-auth-flow',
            filters: ['android', 'ios']
          },
          {
            title: 'Device features',
            route: '/sdk/auth/device-features',
            filters: ['android', 'ios']
          }
        ]
      },
      'push-notifications': {
        title: 'Push notifications',
        items: [
          {
            title: 'Getting started',
            route: '/sdk/push-notifications/getting-started',
            filters: ['android', 'ios']
          },
          {
            title: 'Messaging campaigns',
            route: '/sdk/push-notifications/messaging-campaign',
            filters: ['android', 'ios']
          },
          {
            title: 'Setting up push notification services',
            route: '/sdk/push-notifications/setup-push-service',
            filters: ['android', 'ios']
          }
        ]
      },
      pubsub: {
        title: 'PubSub',
        items: [
          {
            title: 'Getting started',
            route: '/sdk/pubsub/getting-started',
            filters: ['android', 'ios']
          },
          {
            title: 'Using with Amplify',
            route: '/sdk/pubsub/aws-iot-and-amplify',
            filters: ['ios']
          },
          {
            title: 'Working with the API',
            route: '/sdk/pubsub/working-api',
            filters: ['android', 'ios']
          }
        ]
      },
      storage: {
        title: 'Storage',
        items: [
          {
            title: 'Getting started',
            route: '/sdk/storage/getting-started',
            filters: ['android', 'ios']
          },
          {
            title: 'Using TransferUtility',
            route: '/sdk/storage/transfer-utility',
            filters: ['android', 'ios']
          },
          {
            title: 'Using GraphQL API',
            route: '/sdk/storage/graphql-api',
            filters: ['android', 'ios']
          },
          {
            title: 'Configure Access',
            route: '/sdk/storage/configure-access',
            filters: ['android', 'ios']
          }
        ]
      },
      configuration: {
        title: 'Configuration',
        items: [
          {
            title: 'SDK Setup Options',
            route: '/sdk/configuration/setup-options',
            filters: ['android', 'ios']
          }
        ]
      },
      info: {
        title: 'Info',
        items: [
          {
            title: 'Data Information',
            route: '/sdk/info/overview',
            filters: ['ios']
          },
          {
            title: 'Uninstalling the app',
            route: '/sdk/info/app-uninstall',
            filters: ['ios']
          }
        ]
      }
    }
  },
  cli: {
    productRoot: {
      title: 'Amplify CLI',
      route: '/cli'
    },
    items: {
      start: {
        title: 'Get started',
        items: [
          {
            title: 'Installation',
            route: '/cli/start/install',
            filters: []
          },
          {
            title: 'Typical workflows',
            route: '/cli/start/workflows',
            filters: []
          }
        ]
      },
      commands: {
        title: 'Commands',
        items: commands
          .sort((a, b) => ((a.name > b.name ? 1 : -1)))
          .map(({ name }) => ({
            isCodeTitle: true,
            title: name,
            route: `/cli/commands/${name}`
          }))
      },
      graphql: {
        title: 'API (GraphQL)',
        items: [
          {
            title: 'Overview',
            route: '/cli/graphql/overview',
            filters: []
          },
          {
            title: 'Data modeling',
            route: '/cli/graphql/data-modeling',
            filters: []
          },
          {
            title: 'Authorization rules',
            route: '/cli/graphql/authorization-rules',
            filters: []
          },
          {
            title:
              'Custom business logic (Lambda function, HTTP, VTL resolvers)',
            route: '/cli/graphql/custom-business-logic',
            filters: []
          },
          {
            title: 'Search and result aggregations',
            route: '/cli/graphql/search-and-result-aggregations',
            filters: []
          },
          // {
          //   title: "Offline data and conflict resolution (DataStore)",
          //   route: "/cli/graphql/offline-data-access-and-conflict-resolution",
          //   filters: []
          // },
          {
            title: 'Connect to machine learning services',
            route: '/cli/graphql/connect-to-machine-learning-services',
            filters: []
          },
          {
            title: 'Evolving GraphQL schemas',
            route: '/cli/graphql/schema-evolution',
            filters: []
          },
          {
            title: 'Directives reference',
            route: '/cli/graphql/directives-reference',
            filters: []
          },
          {
            title: 'JavaScript, Java, Swift code generation',
            route: '/cli/graphql/client-code-generation',
            filters: []
          },
          {
            title: 'Override Amplify-generated AppSync resources',
            route: '/cli/graphql/override',
            filters: []
          },
          {
            title: 'Troubleshooting',
            route: '/cli/graphql/troubleshooting',
            filters: []
          },
          {
            title: 'Examples and solutions',
            route: '/cli/graphql/examples-and-solutions',
            filters: []
          }
        ]
      },
      restapi: {
        title: 'API (REST)',
        items: [
          {
            title: 'Overview',
            route: '/cli/restapi/restapi',
            filters: []
          },
          { title: 'Test', route: '/cli/restapi/testing', filters: [] },
          {
            title: 'Override Amplify-generated API Gateway resources',
            route: '/cli/restapi/override',
            filters: []
          }
        ]
      },
      auth: {
        title: 'Authentication',
        items: [
          {
            title: 'Overview',
            route: '/cli/auth/overview',
            filters: []
          },
          {
            title: 'User groups',
            route: '/cli/auth/groups',
            filters: []
          },
          {
            title: 'Admin actions',
            route: '/cli/auth/admin',
            filters: []
          },
          {
            title: 'Use an existing Cognito User Pool and Identity Pool',
            route: '/cli/auth/import',
            filters: []
          },
          {
            title: 'Override Amplify-generated Cognito resources',
            route: '/cli/auth/override',
            filters: []
          }
        ]
      },
      storage: {
        title: 'Storage',
        items: [
          {
            title: 'Overview',
            route: '/cli/storage/overview',
            filters: []
          },
          {
            title: 'Use an existing S3 bucket or DynamoDB table',
            route: '/cli/storage/import',
            filters: []
          },
          {
            title: 'Override Amplify-generated S3 and DynamoDB resources',
            route: '/cli/storage/override',
            filters: []
          }
        ]
      },
      function: {
        title: 'Functions',
        items: [
          { title: 'Overview', route: '/cli/function', filters: [] },
          {
            title: 'Reuse code & assets using layers',
            route: '/cli/function/layers',
            filters: []
          },
          {
            title: 'Environment variables',
            route: '/cli/function/env-vars',
            filters: []
          },
          {
            title: 'Access secret values',
            route: '/cli/function/secrets',
            filters: []
          },
          {
            title: 'Build options',
            route: '/cli/function/build-options',
            filters: []
          },
          {
            title: 'Configuring Lambda function settings',
            route: '/cli/function/configure-options',
            filters: []
          }
        ]
      },
      geo: {
        title: 'Geo',
        items: [
          {
            title: 'Maps',
            route: '/cli/geo/maps',
            filters: []
          },
          {
            title: 'Location Search',
            route: '/cli/geo/search',
            filters: []
          },
          {
            title: 'Geofencing',
            route: '/cli/geo/geofencing',
            filters: []
          }
        ]
      },
      hosting: {
        title: 'Hosting',
        items: [
          {
            title: 'Overview',
            route: '/cli/hosting/hosting',
            filters: []
          }
        ]
      },
      custom: {
        title: 'Custom AWS resources',
        items: [
          {
            title: 'Use CDK to add custom AWS resources',
            route: '/cli/custom/cdk',
            filters: []
          },
          {
            title: 'Use CloudFormation to add custom AWS resources',
            route: '/cli/custom/cloudformation',
            filters: []
          }
        ]
      },
      project: {
        title: 'Project-level configurations',
        items: [
          {
            title: 'Apply tags to generated resources',
            route: '/cli/project/tags',
            filters: []
          },
          {
            title: 'IAM Permissions Boundary for Amplify-generated roles',
            route: '/cli/project/permissions-boundary',
            filters: []
          },
          {
            title: 'Command Hooks',
            route: '/cli/project/command-hooks',
            filters: []
          },
          {
            title: 'Monorepo project structure',
            route: '/cli/project/monorepo',
            filters: []
          },
          {
            title: 'Override Amplify-generated project-level IAM resources',
            route: '/cli/project/override',
            filters: []
          },
          {
            title: 'Troubleshooting',
            route: '/cli/project/troubleshooting',
            filters: []
          }
        ]
      },
      teams: {
        title: 'Team environments',
        items: [
          {
            title: 'Overview',
            route: '/cli/teams/overview',
            filters: []
          },
          {
            title: 'Share single environment',
            route: '/cli/teams/shared',
            filters: []
          },
          {
            title: 'Sandbox environments',
            route: '/cli/teams/sandbox',
            filters: []
          },
          {
            title: 'Multiple frontends',
            route: '/cli/teams/multi-frontend',
            filters: []
          },
          {
            title: 'Continuous deployment',
            route: '/cli/teams/cicd',
            filters: []
          },
          {
            title: 'Commands',
            route: '/cli/teams/commands',
            filters: []
          }
        ]
      },
      usage: {
        title: 'Advanced workflows',
        items: [
          {
            title: 'Lambda Triggers',
            route: '/cli/usage/lambda-triggers',
            filters: []
          },
          {
            title: 'Mocking and testing',
            route: '/cli/usage/mock',
            filters: []
          },
          {
            title: 'Serverless containers',
            route: '/cli/usage/containers',
            filters: []
          },
          {
            title: 'Export Amplify project to CDK',
            route: '/cli/usage/export-to-cdk'
          },
          {
            title: 'Headless mode for CI/CD',
            route: '/cli/usage/headless',
            filters: []
          }
        ]
      },
      plugins: {
        title: 'Plugins',
        items: [
          {
            title: 'Overview',
            route: '/cli/plugins/plugins',
            filters: []
          },
          {
            title: 'Architecture',
            route: '/cli/plugins/architecture',
            filters: []
          },
          {
            title: 'Authoring a new plugin',
            route: '/cli/plugins/authoring',
            filters: []
          }
        ]
      },
      migration: {
        title: 'Migration & Backwards Compatibility',
        items: [
          {
            title: 'AWS CDK v1 to v2 migration',
            route: '/cli/migration/aws-cdk-migration',
            filters: []
          },
          {
            title: 'Lazy Loading and Custom Selection Set',
            route: '/cli/migration/lazy-load-custom-selection-set',
            filters: []
          },
          {
            title: 'GraphQL Transformer v1 to v2 migration',
            route: '/cli/migration/transformer-migration',
            filters: []
          },
          {
            title: 'Override feature enablement migration',
            route: '/cli/migration/override',
            filters: []
          },
          {
            title: 'Lambda layer behavior updates',
            route: '/cli/migration/lambda-layers-update',
            filters: []
          },
          {
            title: 'CLI Auth Signup Changes',
            route: '/cli/migration/cli-auth-signup-changes',
            filters: []
          },
          {
            title:
              'Amplify Codegen Models - List and list components nullability',
            route: '/cli/migration/list-nullability',
            filters: []
          },
          {
            title: 'Migrate project to another AWS account',
            route: '/cli/migration/cli-migrate-aws-account',
            filters: []
          },
          {
            title: 'GraphQL Transformer @auth identity claim changes',
            route: '/cli/migration/identity-claim-changes',
            filters: []
          }
        ]
      },
      reference: {
        title: 'Reference',
        items: [
          {
            title: 'IAM Policy',
            route: '/cli/reference/iam',
            filters: []
          },
          {
            title: 'IAM Roles & MFA',
            route: '/cli/reference/iam-roles-mfa',
            filters: []
          },
          {
            title: 'Files and Folders',
            route: '/cli/reference/files',
            filters: []
          },
          {
            title: 'Usage Data in Amplify CLI',
            route: '/cli/reference/usage-data',
            filters: []
          },
          {
            title: 'Diagnose',
            route: '/cli/reference/diagnose',
            filters: []
          },
          {
            title: 'Feature Flags',
            route: '/cli/reference/feature-flags',
            filters: []
          },
          {
            title: 'SSM Parameter Store',
            route: '/cli/reference/ssm-parameter-store',
            filters: []
          }
        ]
      }
    }
  },
  'cli-legacy': {
    productRoot: {
      title: 'Amplify CLI (Legacy)',
      route: '/cli-legacy'
    },
    items: {
      'graphql-transformer': {
        title: 'API (GraphQL)',
        items: [
          {
            title: 'Overview',
            route: '/cli-legacy/graphql-transformer/overview',
            filters: []
          },
          {
            title: 'Directives',
            route: '/cli-legacy/graphql-transformer/directives',
            filters: []
          },
          {
            title: 'Define your model types',
            route: '/cli-legacy/graphql-transformer/model',
            filters: []
          },
          {
            title: 'Index your data with keys',
            route: '/cli-legacy/graphql-transformer/key',
            filters: []
          },
          {
            title: 'Setup authorization rules',
            route: '/cli-legacy/graphql-transformer/auth',
            filters: []
          },
          {
            title: 'Add relationships between types',
            route: '/cli-legacy/graphql-transformer/connection',
            filters: []
          },
          {
            title: 'Configure Lambda resolvers',
            route: '/cli-legacy/graphql-transformer/function',
            filters: []
          },
          {
            title: 'Configure HTTP resolvers',
            route: '/cli-legacy/graphql-transformer/http',
            filters: []
          },
          {
            title: 'Connect machine learning services',
            route: '/cli-legacy/graphql-transformer/predictions',
            filters: []
          },
          {
            title: 'Make your data searchable',
            route: '/cli-legacy/graphql-transformer/searchable',
            filters: []
          },
          {
            title: 'Versioning and conflict resolution',
            route: '/cli-legacy/graphql-transformer/versioned',
            filters: []
          },
          {
            title: 'Data access patterns',
            route: '/cli-legacy/graphql-transformer/dataaccess',
            filters: []
          },
          {
            title: 'GraphQL transform and Storage',
            route: '/cli-legacy/graphql-transformer/storage',
            filters: []
          },
          {
            title: 'Relational Databases',
            route: '/cli-legacy/graphql-transformer/relational',
            filters: []
          },
          {
            title: 'Client code generation',
            route: '/cli-legacy/graphql-transformer/codegen',
            filters: []
          },
          {
            title: 'Overwrite & customize resolvers',
            route: '/cli-legacy/graphql-transformer/resolvers',
            filters: []
          },
          {
            title: 'Configurable Parameters',
            route: '/cli-legacy/graphql-transformer/config-params',
            filters: []
          },
          {
            title: 'Examples',
            route: '/cli-legacy/graphql-transformer/examples',
            filters: []
          }
        ]
      }
    }
  },
  start: {
    productRoot: {
      title: 'Getting started',
      route: '/start'
    },
    items: {
      start: {
        title: 'Getting started',
        route: '/start',
        filters: [
          'js',
          'react',
          'react-native',
          'angular',
          'vue',
          'next',
          'android',
          'ios',
          'flutter'
        ],
        items: []
      },
      'getting-started': {
        title: 'Tutorial',
        items: [
          {
            title: 'Prerequisites',
            route: '/start/getting-started/installation',
            filters: [
              'js',
              'react',
              'react-native',
              'angular',
              'vue',
              'next',
              'android',
              'ios',
              'flutter'
            ]
          },
          {
            title: 'Set up fullstack project',
            route: '/start/getting-started/setup',
            filters: [
              'js',
              'react',
              'react-native',
              'angular',
              'vue',
              'next',
              'android',
              'ios',
              'flutter'
            ]
          },
          {
            title: 'Generate model files',
            route: '/start/getting-started/generate-model',
            filters: ['android', 'ios', 'flutter']
          },
          {
            title: 'Integrate your app',
            route: '/start/getting-started/integrate',
            filters: ['android', 'ios', 'flutter']
          },
          {
            title: 'Connect to the cloud',
            route: '/start/getting-started/add-api',
            filters: ['android', 'ios']
          },
          {
            title: 'Connect API and database to the app',
            route: '/start/getting-started/data-model',
            filters: ['js', 'react', 'angular', 'vue', 'next', 'react-native']
          },
          {
            title: 'Add authentication',
            route: '/start/getting-started/auth',
            filters: ['react', 'angular', 'vue', 'react-native']
          },
          {
            title: 'Deploy and host app',
            route: '/start/getting-started/hosting',
            filters: ['js', 'react', 'angular', 'vue', 'next']
          },
          {
            title: 'Next steps',
            route: '/start/getting-started/nextsteps',
            filters: [
              'js',
              'react',
              'react-native',
              'angular',
              'vue',
              'next',
              'android',
              'ios',
              'flutter'
            ]
          }
        ]
      },
      'sample-apps': {
        title: 'Sample Apps',
        items: [
          {
            title: 'ToDo App',
            route: '/start/sample-apps/todo-app',
            filters: ['android']
          }
        ]
      }
    }
  },
  console: {
    productRoot: {
      title: 'Amplify Studio',
      route: '/console'
    },
    items: {
      adminui: {
        title: 'Basics',
        items: [
          {
            title: 'Getting started',
            route: '/console/adminui/start'
          },
          {
            title: 'Extend with the Amplify CLI',
            route: '/console/adminui/extend-cli'
          },
          {
            title: 'Manage team access',
            route: '/console/adminui/access-management'
          },
          {
            title: 'Custom domains',
            route: '/console/adminui/custom-domain'
          }
        ]
      },
      tutorial: {
        title: 'Tutorial',
        items: [
          {
            title: 'Build UI',
            route: '/console/tutorial/buildui'
          },
          {
            title: 'Model database',
            route: '/console/tutorial/data'
          },
          {
            title: 'Bind UI to data',
            route: '/console/tutorial/bindui'
          },
          {
            title: 'Collections',
            route: '/console/tutorial/collections'
          },
          {
            title: 'Write React code',
            route: '/console/tutorial/code'
          }
        ]
      },
      formbuilder: {
        title: 'Form Builder (React)',
        items: [
          {
            title: 'Overview',
            route: '/console/formbuilder/overview'
          },
          {
            title: 'Customize form inputs',
            route: '/console/formbuilder/customize'
          },
          {
            title: 'Data binding',
            route: '/console/formbuilder/data-binding'
          },
          {
            title: 'Configure special inputs',
            route: '/console/formbuilder/special-inputs'
          },
          {
            title: 'Validate form data',
            route: '/console/formbuilder/validations'
          },
          {
            title: 'Manage form lifecycle',
            route: '/console/formbuilder/lifecycle'
          },
          {
            title: 'Customize action buttons (Submit, Cancel, Clear, Reset)',
            route: '/console/formbuilder/call-to-action'
          },
          {
            title: 'Extend input element in code',
            route: '/console/formbuilder/overrides'
          }
        ]
      },
      uibuilder: {
        title: 'Figma to Code (React)',
        items: [
          {
            title: 'Overview',
            route: '/console/uibuilder/figmatocode'
          },
          {
            title: 'Data binding',
            route: '/console/uibuilder/databinding'
          },
          {
            title: 'UI event handler',
            route: '/console/uibuilder/eventhandling'
          },
          {
            title: 'Collections',
            route: '/console/uibuilder/collections'
          },
          {
            title: 'Component slots',
            route: '/console/uibuilder/slots'
          },
          {
            title: 'Theming',
            route: '/console/uibuilder/theming'
          },
          {
            title: 'Responsive components',
            route: '/console/uibuilder/responsive'
          },
          {
            title: 'Extend with code',
            route: '/console/uibuilder/override'
          },
          {
            title: 'Best practices',
            route: '/console/uibuilder/bestpractices'
          }
        ]
      },
      data: {
        title: 'Data',
        items: [
          {
            title: 'Data modeling',
            route: '/console/data/data-model'
          },
          {
            title: 'Relationships',
            route: '/console/data/relationships'
          },
          {
            title: 'Data management',
            route: '/console/data/content-management'
          }
        ]
      },
      auth: {
        title: 'Authentication',
        items: [
          {
            title: 'Authentication',
            route: '/console/auth/authentication'
          },
          {
            title: 'Manage authentication for users and groups',
            route: '/console/auth/user-management'
          },
          {
            title: 'Import Amazon Cognito resources',
            route: '/console/auth/import'
          }
        ]
      },
      authz: {
        title: 'Authorization',
        items: [
          {
            title: 'Overview',
            route: '/console/authz/authorization'
          },
          {
            title: 'Access control',
            route: '/console/authz/permissions'
          }
        ]
      },
      storage: {
        title: 'Storage',
        items: [
          {
            title: 'File browser',
            route: '/console/storage/file-browser'
          },
          {
            title: 'File storage',
            route: '/console/storage/file-storage'
          }
        ]
      }
    }
  },
  guides: {
    productRoot: {
      title: 'Guides',
      route: '/guides'
    },
    items: {
      guides: {
        title: 'Guides',
        route: '/guides',
        filters: ['js', 'android', 'ios', 'flutter'],
        items: []
      },
      'api-graphql': {
        title: 'API (GraphQL)',
        items: [
          {
            title: 'How to Manage Image & File Uploads & Downloads',
            route: '/guides/api-graphql/image-and-file-uploads',
            filters: ['js']
          },
          {
            title: 'Building a Form API with GraphQL',
            route: '/guides/api-graphql/building-a-form-api',
            filters: ['js', 'android', 'ios']
          },
          {
            title: 'How to create GraphQL subscriptions by id',
            route: '/guides/api-graphql/subscriptions-by-id',
            filters: ['js', 'android', 'ios', 'flutter']
          },
          {
            title: 'GraphQL pagination',
            route: '/guides/api-graphql/graphql-pagination',
            filters: ['js', 'android', 'ios']
          },
          {
            title: 'GraphQL query with sorting by date',
            route: '/guides/api-graphql/query-with-sorting',
            filters: ['js', 'android', 'ios']
          },
          {
            title: 'How to use Lambda GraphQL Resolvers',
            route: '/guides/api-graphql/lambda-resolvers',
            filters: ['js', 'android', 'ios']
          }
        ]
      },
      'api-rest': {
        title: 'API (REST)',
        items: [
          {
            title: 'NodeJS API',
            route: '/guides/api-rest/node-api',
            filters: ['js', 'android', 'ios']
          },
          {
            title: 'Express Server',
            route: '/guides/api-rest/express-server',
            filters: ['js', 'android', 'ios']
          },
          {
            title: 'Go API',
            route: '/guides/api-rest/go-api',
            filters: ['js', 'android', 'ios']
          },
          {
            title: 'Python API',
            route: '/guides/api-rest/python-api',
            filters: ['js', 'android', 'ios']
          }
        ]
      },
      authentication: {
        title: 'Authentication',
        items: [
          {
            title: 'Creating a custom authentication flow',
            route: '/guides/authentication/custom-auth-flow',
            filters: ['js']
          },
          {
            title: 'Email-only sign up and sign in',
            route: '/guides/authentication/email-only-authentication',
            filters: ['js']
          },
          {
            title: 'Listening for authentication events',
            route: '/guides/authentication/listening-for-auth-events',
            filters: ['js']
          },
          {
            title: 'Managing user attributes',
            route: '/guides/authentication/managing-user-attributes',
            filters: ['js']
          }
        ]
      },
      datastore: {
        title: 'DataStore',
        items: [
          {
            title: 'Parallel Processing',
            route: '/guides/datastore/parallel-processing',
            filters: ['ios']
          }
        ]
      },
      functions: {
        title: 'Functions',
        items: [
          {
            title:
              'Exporting AppSync operations to a Lambda layer for easy reuse',
            route: '/guides/functions/appsync-operations-to-lambda-layer',
            filters: ['js', 'android', 'ios']
          },
          {
            title: 'Connecting a REST API to a Lambda function',
            route: '/guides/functions/connecting-a-rest-api',
            filters: ['js', 'android', 'ios']
          },
          {
            title: 'Integrating DynamoDB with Lambda',
            route: '/guides/functions/integrating-dynamodb-with-lambda',
            filters: ['js', 'android', 'ios']
          },
          {
            title: 'Calling DynamoDB from Lambda in Node.js',
            route: '/guides/functions/dynamodb-from-js-lambda',
            filters: ['js', 'android', 'ios']
          },
          {
            title: 'Calling DynamoDB from a Lambda function in Python',
            route: '/guides/functions/dynamodb-from-python-lambda',
            filters: ['js', 'android', 'ios']
          },
          {
            title: 'Calling GraphQL API from a Lambda function',
            route: '/guides/functions/graphql-from-lambda',
            filters: ['js', 'android', 'ios']
          },
          {
            title: 'GraphQL Server in Lambda',
            route: '/guides/functions/graphql-server-in-lambda',
            filters: ['js', 'android', 'ios']
          },
          {
            title: 'Calling DynamoDB using AWS Cognito triggers',
            route: '/guides/functions/cognito-trigger-lambda-dynamodb',
            filters: ['js', 'android', 'ios']
          }
        ]
      },
      hosting: {
        title: 'Hosting',
        items: [
          {
            title: 'Git-based deployments',
            route: '/guides/hosting/git-based-deployments',
            filters: ['js']
          },
          {
            title: 'Local deployments',
            route: '/guides/hosting/local-deployments',
            filters: ['js']
          },
          {
            title: 'Custom Domains',
            route: '/guides/hosting/custom-domains',
            filters: ['js']
          },
          {
            title: 'Password protected deployments',
            route: '/guides/hosting/password-protected-deployments',
            filters: ['js']
          },
          {
            title: 'Pull-request previews',
            route: '/guides/hosting/pull-request-previews',
            filters: ['js']
          },
          {
            title: 'Gatsby',
            route: '/guides/hosting/gatsby',
            filters: ['js']
          },
          {
            title: 'Next.js',
            route: '/guides/hosting/nextjs',
            filters: ['js']
          },
          {
            title: 'Gridsome',
            route: '/guides/hosting/gridsome',
            filters: ['js']
          },
          {
            title: 'Nuxt.js',
            route: '/guides/hosting/nuxt',
            filters: ['js']
          },
          {
            title: 'Vite',
            route: '/guides/hosting/vite',
            filters: ['js']
          }
        ]
      }
    }
  }
};

export default directory;
