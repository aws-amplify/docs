/**
 * @type {import('./directory').PageNode}
 */
export const directory = {
  path: 'src/pages/index.tsx',
  children: [
    {
      path: 'src/pages/[platform]/index.tsx',
      children: [
        { path: 'src/pages/[platform]/how-amplify-works/index.mdx' },
        {
          path: 'src/pages/[platform]/start/index.mdx',
          children: [
            {
              path: 'src/pages/[platform]/start/getting-started/index.mdx',
              children: [
                {
                  path: 'src/pages/[platform]/start/getting-started/introduction/index.mdx'
                },
                {
                  path: 'src/pages/[platform]/start/getting-started/installation/index.mdx'
                },
                {
                  path: 'src/pages/[platform]/start/getting-started/setup/index.mdx'
                },
                {
                  path: 'src/pages/[platform]/start/getting-started/generate-model/index.mdx'
                },
                {
                  path: 'src/pages/[platform]/start/getting-started/data-model/index.mdx'
                },
                {
                  path: 'src/pages/[platform]/start/getting-started/integrate/index.mdx'
                },
                {
                  path: 'src/pages/[platform]/start/getting-started/add-api/index.mdx'
                },
                {
                  path: 'src/pages/[platform]/start/getting-started/auth/index.mdx'
                },
                {
                  path: 'src/pages/[platform]/start/getting-started/hosting/index.mdx'
                },
                {
                  path: 'src/pages/[platform]/start/getting-started/nextsteps/index.mdx'
                }
              ]
            },
            {
              path: 'src/pages/[platform]/start/project-setup/index.mdx',
              children: [
                {
                  path: 'src/pages/[platform]/start/project-setup/prerequisites/index.mdx'
                },
                {
                  path: 'src/pages/[platform]/start/project-setup/create-application/index.mdx'
                },
                {
                  path: 'src/pages/[platform]/start/project-setup/platform-setup/index.mdx'
                },
                {
                  path: 'src/pages/[platform]/start/project-setup/escape-hatch/index.mdx'
                },
                {
                  path: 'src/pages/[platform]/start/project-setup/combine-framework/index.mdx'
                },
                {
                  path: 'src/pages/[platform]/start/project-setup/upgrade-guide/index.mdx'
                },
                {
                  path: 'src/pages/[platform]/start/project-setup/async-programming-model/index.mdx'
                },
                {
                  path: 'src/pages/[platform]/start/project-setup/kotlin-coroutines/index.mdx'
                },
                {
                  path: 'src/pages/[platform]/start/project-setup/rxjava/index.mdx'
                },
                {
                  path: 'src/pages/[platform]/start/project-setup/use-existing-resources/index.mdx'
                }
              ]
            },
            {
              path: 'src/pages/[platform]/start/sample-apps/index.mdx',
              children: [
                {
                  path: 'src/pages/[platform]/start/sample-apps/to-do-app/index.mdx'
                }
              ]
            }
          ]
        },
        {
          path: 'src/pages/[platform]/build-a-backend/index.mdx',
          children: [
            {
              path: 'src/pages/[platform]/build-a-backend/auth/index.mdx',
              children: [
                {
                  path: 'src/pages/[platform]/build-a-backend/auth/set-up-auth/index.mdx'
                },
                {
                  path: 'src/pages/[platform]/build-a-backend/auth/manage-user-session/index.mdx'
                },
                {
                  path: 'src/pages/[platform]/build-a-backend/auth/accessing-credentials/index.mdx'
                },
                {
                  path: 'src/pages/[platform]/build-a-backend/auth/managing-credentials/index.mdx'
                },
                {
                  path: 'src/pages/[platform]/build-a-backend/auth/enable-sign-up/index.mdx'
                },
                {
                  path: 'src/pages/[platform]/build-a-backend/auth/enable-sign-in/index.mdx'
                },
                {
                  path: 'src/pages/[platform]/build-a-backend/auth/switch-auth/index.mdx'
                },
                {
                  path: 'src/pages/[platform]/build-a-backend/auth/sign-in-custom-flow/index.mdx'
                },
                {
                  path: 'src/pages/[platform]/build-a-backend/auth/sign-in-with-web-ui/index.mdx'
                },
                {
                  path: 'src/pages/[platform]/build-a-backend/auth/multi-step-sign-in/index.mdx'
                },
                {
                  path: 'src/pages/[platform]/build-a-backend/auth/enable-guest-access/index.mdx'
                },
                {
                  path: 'src/pages/[platform]/build-a-backend/auth/add-social-provider/index.mdx'
                },
                {
                  path: 'src/pages/[platform]/build-a-backend/auth/sign-out/index.mdx'
                },
                {
                  path: 'src/pages/[platform]/build-a-backend/auth/manage-user-profile/index.mdx'
                },
                {
                  path: 'src/pages/[platform]/build-a-backend/auth/managing-attributes/index.mdx'
                },
                {
                  path: 'src/pages/[platform]/build-a-backend/auth/manage-passwords/index.mdx'
                },
                {
                  path: 'src/pages/[platform]/build-a-backend/auth/manage-mfa/index.mdx'
                },
                {
                  path: 'src/pages/[platform]/build-a-backend/auth/add-sms-flows/index.mdx'
                },
                {
                  path: 'src/pages/[platform]/build-a-backend/auth/remember-device/index.mdx'
                },
                {
                  path: 'src/pages/[platform]/build-a-backend/auth/advanced-workflows/index.mdx'
                },
                {
                  path: 'src/pages/[platform]/build-a-backend/auth/delete-user-account/index.mdx'
                },
                {
                  path: 'src/pages/[platform]/build-a-backend/auth/admin-actions/index.mdx'
                },
                {
                  path: 'src/pages/[platform]/build-a-backend/auth/user-group-management/index.mdx'
                },
                {
                  path: 'src/pages/[platform]/build-a-backend/auth/import-existing-resources/index.mdx'
                },
                {
                  path: 'src/pages/[platform]/build-a-backend/auth/existing-resources/index.mdx'
                },
                {
                  path: 'src/pages/[platform]/build-a-backend/auth/override-cognito/index.mdx'
                },
                {
                  path: 'src/pages/[platform]/build-a-backend/auth/auth-events/index.mdx'
                },
                {
                  path: 'src/pages/[platform]/build-a-backend/auth/sdk/index.mdx'
                },
                {
                  path: 'src/pages/[platform]/build-a-backend/auth/data-usage-policy/index.mdx'
                },
                {
                  path: 'src/pages/[platform]/build-a-backend/auth/app-uninstall/index.mdx'
                },
                {
                  path: 'src/pages/[platform]/build-a-backend/auth/under-the-hood/index.mdx'
                },
                {
                  path: 'src/pages/[platform]/build-a-backend/auth/auth-migration-guide/index.mdx'
                }
              ]
            },
            {
              path: 'src/pages/[platform]/build-a-backend/graphqlapi/index.mdx',
              children: [
                {
                  path: 'src/pages/[platform]/build-a-backend/graphqlapi/set-up-graphql-api/index.mdx'
                },
                {
                  path: 'src/pages/[platform]/build-a-backend/graphqlapi/connect-api-to-existing-database/index.mdx'
                },
                {
                  path: 'src/pages/[platform]/build-a-backend/graphqlapi/connect-to-api/index.mdx'
                },
                {
                  path: 'src/pages/[platform]/build-a-backend/graphqlapi/data-modeling/index.mdx'
                },
                {
                  path: 'src/pages/[platform]/build-a-backend/graphqlapi/customize-authorization-rules/index.mdx'
                },
                {
                  path: 'src/pages/[platform]/build-a-backend/graphqlapi/api-graphql-concepts/index.mdx'
                },
                {
                  path: 'src/pages/[platform]/build-a-backend/graphqlapi/customize-authz-modes/index.mdx'
                },
                {
                  path: 'src/pages/[platform]/build-a-backend/graphqlapi/mutate-data/index.mdx'
                },
                {
                  path: 'src/pages/[platform]/build-a-backend/graphqlapi/query-data/index.mdx'
                },
                {
                  path: 'src/pages/[platform]/build-a-backend/graphqlapi/subscribe-data/index.mdx'
                },
                {
                  path: 'src/pages/[platform]/build-a-backend/graphqlapi/relational-models/index.mdx'
                },
                {
                  path: 'src/pages/[platform]/build-a-backend/graphqlapi/custom-business-logic/index.mdx'
                },
                {
                  path: 'src/pages/[platform]/build-a-backend/graphqlapi/search-and-result-aggregations/index.mdx'
                },
                {
                  path: 'src/pages/[platform]/build-a-backend/graphqlapi/working-with-files/index.mdx'
                },
                {
                  path: 'src/pages/[platform]/build-a-backend/graphqlapi/optimistic-ui/index.mdx'
                },
                {
                  path: 'src/pages/[platform]/build-a-backend/graphqlapi/offline/index.mdx'
                },
                {
                  path: 'src/pages/[platform]/build-a-backend/graphqlapi/connect-from-server-runtime/index.mdx'
                },
                {
                  path: 'src/pages/[platform]/build-a-backend/graphqlapi/client-code-generation/index.mdx'
                },
                {
                  path: 'src/pages/[platform]/build-a-backend/graphqlapi/advanced-workflows/index.mdx'
                },
                {
                  path: 'src/pages/[platform]/build-a-backend/graphqlapi/existing-resources/index.mdx'
                },
                {
                  path: 'src/pages/[platform]/build-a-backend/graphqlapi/connect-machine-learning-services/index.mdx'
                },
                {
                  path: 'src/pages/[platform]/build-a-backend/graphqlapi/schema-evolution/index.mdx'
                },
                {
                  path: 'src/pages/[platform]/build-a-backend/graphqlapi/modify-amplify-generated-resources/index.mdx'
                },
                {
                  path: 'src/pages/[platform]/build-a-backend/graphqlapi/upgrade-guide/index.mdx'
                },
                {
                  path: 'src/pages/[platform]/build-a-backend/graphqlapi/troubleshooting/index.mdx'
                },

                {
                  path: 'src/pages/[platform]/build-a-backend/graphqlapi/best-practice/index.mdx',
                  children: [
                    {
                      path: 'src/pages/[platform]/build-a-backend/graphqlapi/best-practice/batch-put-custom-resolver/index.mdx'
                    },
                    {
                      path: 'src/pages/[platform]/build-a-backend/graphqlapi/best-practice/query-with-sorting/index.mdx'
                    },
                    {
                      path: 'src/pages/[platform]/build-a-backend/graphqlapi/best-practice/warehouse-management/index.mdx'
                    }
                  ]
                }
              ]
            },
            {
              path: 'src/pages/[platform]/build-a-backend/restapi/index.mdx',
              children: [
                {
                  path: 'src/pages/[platform]/build-a-backend/restapi/configure-rest-api/index.mdx'
                },
                {
                  path: 'src/pages/[platform]/build-a-backend/restapi/set-up-rest-api/index.mdx'
                },
                {
                  path: 'src/pages/[platform]/build-a-backend/restapi/fetch-data/index.mdx'
                },
                {
                  path: 'src/pages/[platform]/build-a-backend/restapi/update-data/index.mdx'
                },
                {
                  path: 'src/pages/[platform]/build-a-backend/restapi/delete-data/index.mdx'
                },
                {
                  path: 'src/pages/[platform]/build-a-backend/restapi/customize-authz/index.mdx'
                },
                {
                  path: 'src/pages/[platform]/build-a-backend/restapi/test-api/index.mdx'
                },
                {
                  path: 'src/pages/[platform]/build-a-backend/restapi/gen-ai/index.mdx'
                },
                {
                  path: 'src/pages/[platform]/build-a-backend/restapi/existing-resources/index.mdx'
                },
                {
                  path: 'src/pages/[platform]/build-a-backend/restapi/override-api-gateway/index.mdx'
                },
                {
                  path: 'src/pages/[platform]/build-a-backend/restapi/restapi-v5-to-v6-migration-guide/index.mdx'
                }
              ]
            },
            {
              path: 'src/pages/[platform]/build-a-backend/storage/index.mdx',
              children: [
                {
                  path: 'src/pages/[platform]/build-a-backend/storage/configure-storage/index.mdx'
                },
                {
                  path: 'src/pages/[platform]/build-a-backend/storage/set-up-storage/index.mdx'
                },
                {
                  path: 'src/pages/[platform]/build-a-backend/storage/upload/index.mdx'
                },
                {
                  path: 'src/pages/[platform]/build-a-backend/storage/download/index.mdx'
                },
                {
                  path: 'src/pages/[platform]/build-a-backend/storage/query-transfers/index.mdx'
                },
                {
                  path: 'src/pages/[platform]/build-a-backend/storage/get-properties/index.mdx'
                },
                {
                  path: 'src/pages/[platform]/build-a-backend/storage/list/index.mdx'
                },
                {
                  path: 'src/pages/[platform]/build-a-backend/storage/copy/index.mdx'
                },
                {
                  path: 'src/pages/[platform]/build-a-backend/storage/move/index.mdx'
                },
                {
                  path: 'src/pages/[platform]/build-a-backend/storage/remove/index.mdx'
                },
                {
                  path: 'src/pages/[platform]/build-a-backend/storage/configure-access/index.mdx'
                },
                {
                  path: 'src/pages/[platform]/build-a-backend/storage/transfer-acceleration/index.mdx'
                },
                {
                  path: 'src/pages/[platform]/build-a-backend/storage/lambda-triggers/index.mdx'
                },
                {
                  path: 'src/pages/[platform]/build-a-backend/storage/import/index.mdx'
                },
                {
                  path: 'src/pages/[platform]/build-a-backend/storage/existing-resources/index.mdx'
                },
                {
                  path: 'src/pages/[platform]/build-a-backend/storage/modify-amplify-generated-resources/index.mdx'
                },
                {
                  path: 'src/pages/[platform]/build-a-backend/storage/sdk/index.mdx'
                },
                {
                  path: 'src/pages/[platform]/build-a-backend/storage/data-usage-policy/index.mdx'
                },
                {
                  path: 'src/pages/[platform]/build-a-backend/storage/storage-v5-to-v6-migration-guide/index.mdx'
                }
              ]
            },
            {
              path: 'src/pages/[platform]/build-a-backend/functions/index.mdx',
              children: [
                {
                  path: 'src/pages/[platform]/build-a-backend/functions/set-up-function/index.mdx'
                },
                {
                  path: 'src/pages/[platform]/build-a-backend/functions/layers/index.mdx'
                },
                {
                  path: 'src/pages/[platform]/build-a-backend/functions/environment-variables/index.mdx'
                },
                {
                  path: 'src/pages/[platform]/build-a-backend/functions/secrets/index.mdx'
                },
                {
                  path: 'src/pages/[platform]/build-a-backend/functions/build-options/index.mdx'
                },
                {
                  path: 'src/pages/[platform]/build-a-backend/functions/configure-options/index.mdx'
                },
                {
                  path: 'src/pages/[platform]/build-a-backend/functions/graphql-from-lambda/index.mdx'
                }
              ]
            },
            {
              path: 'src/pages/[platform]/build-a-backend/push-notifications/index.mdx',
              children: [
                {
                  path: 'src/pages/[platform]/build-a-backend/push-notifications/set-up-push-notifications/index.mdx'
                },
                {
                  path: 'src/pages/[platform]/build-a-backend/push-notifications/register-device/index.mdx'
                },
                {
                  path: 'src/pages/[platform]/build-a-backend/push-notifications/record-notifications/index.mdx'
                },
                {
                  path: 'src/pages/[platform]/build-a-backend/push-notifications/request-permissions/index.mdx'
                },
                {
                  path: 'src/pages/[platform]/build-a-backend/push-notifications/receive-device-token/index.mdx'
                },
                {
                  path: 'src/pages/[platform]/build-a-backend/push-notifications/interact-with-notifications/index.mdx'
                },
                {
                  path: 'src/pages/[platform]/build-a-backend/push-notifications/identify-user/index.mdx'
                },
                {
                  path: 'src/pages/[platform]/build-a-backend/push-notifications/app-badge-count/index.mdx'
                },
                {
                  path: 'src/pages/[platform]/build-a-backend/push-notifications/enable-rich-notifications/index.mdx'
                },
                {
                  path: 'src/pages/[platform]/build-a-backend/push-notifications/remote-media/index.mdx'
                },
                {
                  path: 'src/pages/[platform]/build-a-backend/push-notifications/test-notifications/index.mdx'
                },
                {
                  path: 'src/pages/[platform]/build-a-backend/push-notifications/set-up-push-service/index.mdx'
                },
                {
                  path: 'src/pages/[platform]/build-a-backend/push-notifications/push-notifications-migration-guide/index.mdx'
                }
              ]
            },
            {
              path: 'src/pages/[platform]/build-a-backend/server-side-rendering/index.mdx',
              children: [
                {
                  path: 'src/pages/[platform]/build-a-backend/server-side-rendering/nextjs/index.mdx'
                },
                {
                  path: 'src/pages/[platform]/build-a-backend/server-side-rendering/nuxt/index.mdx'
                },
                {
                  path: 'src/pages/[platform]/build-a-backend/server-side-rendering/nextjs-v5-to-v6-migration-guide/index.mdx'
                }
              ]
            },
            {
              path: 'src/pages/[platform]/build-a-backend/existing-resources/index.mdx',
              children: [
                {
                  path: 'src/pages/[platform]/build-a-backend/existing-resources/cli/index.mdx'
                },
                {
                  path: 'src/pages/[platform]/build-a-backend/existing-resources/cdk/index.mdx'
                }
              ]
            },
            {
              path: 'src/pages/[platform]/build-a-backend/utilities/index.mdx',
              children: [
                {
                  path: 'src/pages/[platform]/build-a-backend/utilities/cache/index.mdx'
                },
                {
                  path: 'src/pages/[platform]/build-a-backend/utilities/console-logger/index.mdx'
                },
                {
                  path: 'src/pages/[platform]/build-a-backend/utilities/hub/index.mdx'
                },
                {
                  path: 'src/pages/[platform]/build-a-backend/utilities/i18n/index.mdx'
                },
                {
                  path: 'src/pages/[platform]/build-a-backend/utilities/service-worker/index.mdx'
                }
              ]
            },
            {
              path: 'src/pages/[platform]/build-a-backend/more-features/index.mdx',
              children: [
                {
                  path: 'src/pages/[platform]/build-a-backend/more-features/predictions/index.mdx',
                  children: [
                    {
                      path: 'src/pages/[platform]/build-a-backend/more-features/predictions/set-up-predictions/index.mdx'
                    },
                    {
                      path: 'src/pages/[platform]/build-a-backend/more-features/predictions/text-to-speech/index.mdx'
                    },
                    {
                      path: 'src/pages/[platform]/build-a-backend/more-features/predictions/transcribe-audio/index.mdx'
                    },
                    {
                      path: 'src/pages/[platform]/build-a-backend/more-features/predictions/translate/index.mdx'
                    },
                    {
                      path: 'src/pages/[platform]/build-a-backend/more-features/predictions/identify-text/index.mdx'
                    },
                    {
                      path: 'src/pages/[platform]/build-a-backend/more-features/predictions/identify-entity/index.mdx'
                    },
                    {
                      path: 'src/pages/[platform]/build-a-backend/more-features/predictions/label-image/index.mdx'
                    },
                    {
                      path: 'src/pages/[platform]/build-a-backend/more-features/predictions/interpret-sentiment/index.mdx'
                    },
                    {
                      path: 'src/pages/[platform]/build-a-backend/more-features/predictions/example-app/index.mdx'
                    },
                    {
                      path: 'src/pages/[platform]/build-a-backend/more-features/predictions/sdk/index.mdx'
                    },
                    {
                      path: 'src/pages/[platform]/build-a-backend/more-features/predictions/data-usage-policy/index.mdx'
                    }
                  ]
                },
                {
                  path: 'src/pages/[platform]/build-a-backend/more-features/analytics/index.mdx',
                  children: [
                    {
                      path: 'src/pages/[platform]/build-a-backend/more-features/analytics/set-up-analytics/index.mdx'
                    },
                    {
                      path: 'src/pages/[platform]/build-a-backend/more-features/analytics/record-events/index.mdx'
                    },
                    {
                      path: 'src/pages/[platform]/build-a-backend/more-features/analytics/identify-user/index.mdx'
                    },
                    {
                      path: 'src/pages/[platform]/build-a-backend/more-features/analytics/auto-track-sessions/index.mdx'
                    },
                    {
                      path: 'src/pages/[platform]/build-a-backend/more-features/analytics/enable-disable/index.mdx'
                    },
                    {
                      path: 'src/pages/[platform]/build-a-backend/more-features/analytics/streaming-data/index.mdx'
                    },
                    {
                      path: 'src/pages/[platform]/build-a-backend/more-features/analytics/storing-data/index.mdx'
                    },
                    {
                      path: 'src/pages/[platform]/build-a-backend/more-features/analytics/personalize-recommendations/index.mdx'
                    },
                    {
                      path: 'src/pages/[platform]/build-a-backend/more-features/analytics/existing-resources/index.mdx'
                    },
                    {
                      path: 'src/pages/[platform]/build-a-backend/more-features/analytics/sdk/index.mdx'
                    },
                    {
                      path: 'src/pages/[platform]/build-a-backend/more-features/analytics/analytics-migration-guide/index.mdx'
                    },
                    {
                      path: 'src/pages/[platform]/build-a-backend/more-features/analytics/data-usage-policy/index.mdx'
                    },
                    {
                      path: 'src/pages/[platform]/build-a-backend/more-features/analytics/app-uninstall/index.mdx'
                    }
                  ]
                },
                {
                  path: 'src/pages/[platform]/build-a-backend/more-features/datastore/index.mdx',
                  children: [
                    {
                      path: 'src/pages/[platform]/build-a-backend/more-features/datastore/set-up-datastore/index.mdx'
                    },
                    {
                      path: 'src/pages/[platform]/build-a-backend/more-features/datastore/manipulate-data/index.mdx'
                    },
                    {
                      path: 'src/pages/[platform]/build-a-backend/more-features/datastore/relational-models/index.mdx'
                    },
                    {
                      path: 'src/pages/[platform]/build-a-backend/more-features/datastore/sync-to-cloud/index.mdx'
                    },
                    {
                      path: 'src/pages/[platform]/build-a-backend/more-features/datastore/authz-rules-setup/index.mdx'
                    },
                    {
                      path: 'src/pages/[platform]/build-a-backend/more-features/datastore/conflict-resolution/index.mdx'
                    },
                    {
                      path: 'src/pages/[platform]/build-a-backend/more-features/datastore/real-time/index.mdx'
                    },
                    {
                      path: 'src/pages/[platform]/build-a-backend/more-features/datastore/datastore-events/index.mdx'
                    },
                    {
                      path: 'src/pages/[platform]/build-a-backend/more-features/datastore/additional-methods/index.mdx'
                    },
                    {
                      path: 'src/pages/[platform]/build-a-backend/more-features/datastore/schema-updates/index.mdx'
                    },
                    {
                      path: 'src/pages/[platform]/build-a-backend/more-features/datastore/how-it-works/index.mdx'
                    },
                    {
                      path: 'src/pages/[platform]/build-a-backend/more-features/datastore/example-application/index.mdx'
                    },
                    {
                      path: 'src/pages/[platform]/build-a-backend/more-features/datastore/customize-primary-keys/index.mdx'
                    },
                    {
                      path: 'src/pages/[platform]/build-a-backend/more-features/datastore/data-usage-policy/index.mdx'
                    },
                    {
                      path: 'src/pages/[platform]/build-a-backend/more-features/datastore/app-uninstall/index.mdx'
                    }
                  ]
                },
                {
                  path: 'src/pages/[platform]/build-a-backend/more-features/geo/index.mdx',
                  children: [
                    {
                      path: 'src/pages/[platform]/build-a-backend/more-features/geo/set-up-geo/index.mdx'
                    },
                    {
                      path: 'src/pages/[platform]/build-a-backend/more-features/geo/configure-maps/index.mdx'
                    },
                    {
                      path: 'src/pages/[platform]/build-a-backend/more-features/geo/maps/index.mdx'
                    },
                    {
                      path: 'src/pages/[platform]/build-a-backend/more-features/geo/configure-location-search/index.mdx'
                    },
                    {
                      path: 'src/pages/[platform]/build-a-backend/more-features/geo/location-search/index.mdx'
                    },
                    {
                      path: 'src/pages/[platform]/build-a-backend/more-features/geo/configure-geofencing/index.mdx'
                    },
                    {
                      path: 'src/pages/[platform]/build-a-backend/more-features/geo/geofences/index.mdx'
                    },
                    {
                      path: 'src/pages/[platform]/build-a-backend/more-features/geo/existing-resources/index.mdx'
                    },
                    {
                      path: 'src/pages/[platform]/build-a-backend/more-features/geo/google-migration/index.mdx'
                    },
                    {
                      path: 'src/pages/[platform]/build-a-backend/more-features/geo/amazon-location-sdk/index.mdx'
                    }
                  ]
                },
                {
                  path: 'src/pages/[platform]/build-a-backend/more-features/in-app-messaging/index.mdx',
                  children: [
                    {
                      path: 'src/pages/[platform]/build-a-backend/more-features/in-app-messaging/set-up-in-app-messaging/index.mdx'
                    },
                    {
                      path: 'src/pages/[platform]/build-a-backend/more-features/in-app-messaging/create-campaign/index.mdx'
                    },
                    {
                      path: 'src/pages/[platform]/build-a-backend/more-features/in-app-messaging/integrate-application/index.mdx'
                    },
                    {
                      path: 'src/pages/[platform]/build-a-backend/more-features/in-app-messaging/sync-messages/index.mdx'
                    },
                    {
                      path: 'src/pages/[platform]/build-a-backend/more-features/in-app-messaging/display-messages/index.mdx'
                    },
                    {
                      path: 'src/pages/[platform]/build-a-backend/more-features/in-app-messaging/clear-messages/index.mdx'
                    },
                    {
                      path: 'src/pages/[platform]/build-a-backend/more-features/in-app-messaging/identify-user/index.mdx'
                    },
                    {
                      path: 'src/pages/[platform]/build-a-backend/more-features/in-app-messaging/respond-interaction-events/index.mdx'
                    },
                    {
                      path: 'src/pages/[platform]/build-a-backend/more-features/in-app-messaging/resolve-conflicts/index.mdx'
                    },
                    {
                      path: 'src/pages/[platform]/build-a-backend/more-features/in-app-messaging/in-app-messaging-migration-guide/index.mdx'
                    }
                  ]
                },
                {
                  path: 'src/pages/[platform]/build-a-backend/more-features/interactions/index.mdx',
                  children: [
                    {
                      path: 'src/pages/[platform]/build-a-backend/more-features/interactions/set-up-interactions/index.mdx'
                    },
                    {
                      path: 'src/pages/[platform]/build-a-backend/more-features/interactions/chatbot/index.mdx'
                    }
                  ]
                },
                {
                  path: 'src/pages/[platform]/build-a-backend/more-features/logging/index.mdx',
                  children: [
                    {
                      path: 'src/pages/[platform]/build-a-backend/more-features/logging/set-up-logging/index.mdx'
                    },
                    {
                      path: 'src/pages/[platform]/build-a-backend/more-features/logging/send-logs/index.mdx'
                    },
                    {
                      path: 'src/pages/[platform]/build-a-backend/more-features/logging/change-log-levels/index.mdx'
                    },
                    {
                      path: 'src/pages/[platform]/build-a-backend/more-features/logging/flush-logs/index.mdx'
                    },
                    {
                      path: 'src/pages/[platform]/build-a-backend/more-features/logging/enable-disable/index.mdx'
                    },
                    {
                      path: 'src/pages/[platform]/build-a-backend/more-features/logging/configure-user/index.mdx'
                    },
                    {
                      path: 'src/pages/[platform]/build-a-backend/more-features/logging/view-logs/index.mdx'
                    },
                    {
                      path: 'src/pages/[platform]/build-a-backend/more-features/logging/remote-configuration/index.mdx'
                    },
                    {
                      path: 'src/pages/[platform]/build-a-backend/more-features/logging/change-local-storage/index.mdx'
                    },
                    {
                      path: 'src/pages/[platform]/build-a-backend/more-features/logging/hub-events/index.mdx'
                    },
                    {
                      path: 'src/pages/[platform]/build-a-backend/more-features/logging/sdk/index.mdx'
                    }
                  ]
                },
                {
                  path: 'src/pages/[platform]/build-a-backend/more-features/pubsub/index.mdx',
                  children: [
                    {
                      path: 'src/pages/[platform]/build-a-backend/more-features/pubsub/set-up-pubsub/index.mdx'
                    },
                    {
                      path: 'src/pages/[platform]/build-a-backend/more-features/pubsub/subscribe/index.mdx'
                    },
                    {
                      path: 'src/pages/[platform]/build-a-backend/more-features/pubsub/publish/index.mdx'
                    }
                  ]
                }
              ]
            },
            {
              path: 'src/pages/[platform]/build-a-backend/debugging/index.mdx'
            },
            {
              path: 'src/pages/[platform]/build-a-backend/troubleshooting/index.mdx',
              children: [
                {
                  path: 'src/pages/[platform]/build-a-backend/troubleshooting/upgrade-amplify-packages/index.mdx'
                },
                {
                  path: 'src/pages/[platform]/build-a-backend/troubleshooting/migrate-from-javascript-v5-to-v6/index.mdx'
                }
              ]
            }
          ]
        },
        {
          path: 'src/pages/[platform]/build-ui/index.mdx',
          children: [
            {
              isExternal: true,
              route: 'https://ui.docs.amplify.aws/',
              title: 'Amplify UI',
              description:
                'Amplify UI simplifies building accessible, performant, and beautiful applications with cloud-connected capabilities, building blocks, theming, and utilities.',
              platforms: [
                'android',
                'javascript',
                'nextjs',
                'react',
                'react-native',
                'angular',
                'flutter',
                'swift',
                'vue'
              ]
            },
            {
              path: 'src/pages/[platform]/build-ui/formbuilder/index.mdx',
              children: [
                {
                  path: 'src/pages/[platform]/build-ui/formbuilder/customize/index.mdx'
                },
                {
                  path: 'src/pages/[platform]/build-ui/formbuilder/data-binding/index.mdx'
                },
                {
                  path: 'src/pages/[platform]/build-ui/formbuilder/special-inputs/index.mdx'
                },
                {
                  path: 'src/pages/[platform]/build-ui/formbuilder/validations/index.mdx'
                },
                {
                  path: 'src/pages/[platform]/build-ui/formbuilder/lifecycle/index.mdx'
                },
                {
                  path: 'src/pages/[platform]/build-ui/formbuilder/call-to-action/index.mdx'
                },
                {
                  path: 'src/pages/[platform]/build-ui/formbuilder/overrides/index.mdx'
                }
              ]
            },
            {
              path: 'src/pages/[platform]/build-ui/uibuilder/index.mdx',
              children: [
                {
                  path: 'src/pages/[platform]/build-ui/uibuilder/databinding/index.mdx'
                },
                {
                  path: 'src/pages/[platform]/build-ui/uibuilder/eventhandling/index.mdx'
                },
                {
                  path: 'src/pages/[platform]/build-ui/uibuilder/collections/index.mdx'
                },
                {
                  path: 'src/pages/[platform]/build-ui/uibuilder/slots/index.mdx'
                },
                {
                  path: 'src/pages/[platform]/build-ui/uibuilder/theming/index.mdx'
                },
                {
                  path: 'src/pages/[platform]/build-ui/uibuilder/responsive/index.mdx'
                },
                {
                  path: 'src/pages/[platform]/build-ui/uibuilder/override/index.mdx'
                },
                {
                  path: 'src/pages/[platform]/build-ui/uibuilder/bestpractices/index.mdx'
                }
              ]
            }
          ]
        },
        {
          path: 'src/pages/[platform]/deploy-and-host/index.mdx',
          children: [
            {
              isExternal: true,
              route:
                'https://docs.aws.amazon.com/amplify/latest/userguide/getting-started.html',
              title: 'Amplify Hosting',
              description:
                'Amplify Hosting provides a git-based workflow for hosting fullstack serverless web apps with continuous deployment.',
              platforms: [
                'android',
                'javascript',
                'nextjs',
                'react',
                'react-native',
                'angular',
                'flutter',
                'swift',
                'vue'
              ]
            },
            {
              path: 'src/pages/[platform]/deploy-and-host/deployment/index.mdx',
              children: [
                {
                  path: 'src/pages/[platform]/deploy-and-host/deployment/deploy-static-site-github/index.mdx'
                },
                {
                  path: 'src/pages/[platform]/deploy-and-host/deployment/deploy-static-site-locally/index.mdx'
                },
                {
                  path: 'src/pages/[platform]/deploy-and-host/deployment/password-protected-deployments/index.mdx'
                },
                {
                  path: 'src/pages/[platform]/deploy-and-host/deployment/pull-request-previews/index.mdx'
                }
              ]
            },
            {
              path: 'src/pages/[platform]/deploy-and-host/custom-configuration/index.mdx',
              children: [
                {
                  path: 'src/pages/[platform]/deploy-and-host/custom-configuration/configure-custom-domain/index.mdx'
                }
              ]
            }
          ]
        },
        {
          path: 'src/pages/[platform]/tools/index.mdx',
          children: [
            {
              path: 'src/pages/[platform]/tools/cli/index.mdx',
              children: [
                {
                  path: 'src/pages/[platform]/tools/cli/start/index.mdx',
                  children: [
                    {
                      path: 'src/pages/[platform]/tools/cli/start/set-up-cli/index.mdx'
                    },
                    {
                      path: 'src/pages/[platform]/tools/cli/start/key-workflows/index.mdx'
                    }
                  ]
                },
                { path: 'src/pages/[platform]/tools/cli/commands.tsx' },
                {
                  path: 'src/pages/[platform]/tools/cli/graphqlapi/index.mdx',
                  children: [
                    {
                      path: 'src/pages/[platform]/tools/cli/graphqlapi/directives-reference/index.mdx'
                    }
                  ]
                },
                { path: 'src/pages/[platform]/tools/cli/hosting/index.mdx' },
                {
                  path: 'src/pages/[platform]/tools/cli/custom/index.mdx',
                  children: [
                    {
                      path: 'src/pages/[platform]/tools/cli/custom/cdk/index.mdx'
                    },
                    {
                      path: 'src/pages/[platform]/tools/cli/custom/cloudformation/index.mdx'
                    }
                  ]
                },
                {
                  path: 'src/pages/[platform]/tools/cli/project/index.mdx',
                  children: [
                    {
                      path: 'src/pages/[platform]/tools/cli/project/tags/index.mdx'
                    },
                    {
                      path: 'src/pages/[platform]/tools/cli/project/permissions-boundary/index.mdx'
                    },
                    {
                      path: 'src/pages/[platform]/tools/cli/project/command-hooks/index.mdx'
                    },
                    {
                      path: 'src/pages/[platform]/tools/cli/project/monorepo/index.mdx'
                    },
                    {
                      path: 'src/pages/[platform]/tools/cli/project/override-iam/index.mdx'
                    },
                    {
                      path: 'src/pages/[platform]/tools/cli/project/troubleshooting/index.mdx'
                    }
                  ]
                },
                {
                  path: 'src/pages/[platform]/tools/cli/teams/index.mdx',
                  children: [
                    {
                      path: 'src/pages/[platform]/tools/cli/teams/shared/index.mdx'
                    },
                    {
                      path: 'src/pages/[platform]/tools/cli/teams/sandbox/index.mdx'
                    },
                    {
                      path: 'src/pages/[platform]/tools/cli/teams/multi-frontend/index.mdx'
                    },
                    {
                      path: 'src/pages/[platform]/tools/cli/teams/cicd/index.mdx'
                    },
                    {
                      path: 'src/pages/[platform]/tools/cli/teams/commands/index.mdx'
                    }
                  ]
                },
                {
                  path: 'src/pages/[platform]/tools/cli/usage/index.mdx',
                  children: [
                    {
                      path: 'src/pages/[platform]/tools/cli/usage/lambda-triggers/index.mdx'
                    },
                    {
                      path: 'src/pages/[platform]/tools/cli/usage/mock/index.mdx'
                    },
                    {
                      path: 'src/pages/[platform]/tools/cli/usage/containers/index.mdx'
                    },
                    {
                      path: 'src/pages/[platform]/tools/cli/usage/export-to-cdk/index.mdx'
                    },
                    {
                      path: 'src/pages/[platform]/tools/cli/usage/headless/index.mdx'
                    }
                  ]
                },
                {
                  path: 'src/pages/[platform]/tools/cli/plugins/index.mdx',
                  children: [
                    {
                      path: 'src/pages/[platform]/tools/cli/plugins/architecture/index.mdx'
                    },
                    {
                      path: 'src/pages/[platform]/tools/cli/plugins/authoring/index.mdx'
                    }
                  ]
                },
                {
                  path: 'src/pages/[platform]/tools/cli/migration/index.mdx',
                  children: [
                    {
                      path: 'src/pages/[platform]/tools/cli/migration/aws-cdk-migration/index.mdx'
                    },
                    {
                      path: 'src/pages/[platform]/tools/cli/migration/lazy-load-custom-selection-set/index.mdx'
                    },
                    {
                      path: 'src/pages/[platform]/tools/cli/migration/transformer-migration/index.mdx'
                    },
                    {
                      path: 'src/pages/[platform]/tools/cli/migration/override/index.mdx'
                    },
                    {
                      path: 'src/pages/[platform]/tools/cli/migration/lambda-layers-update/index.mdx'
                    },
                    {
                      path: 'src/pages/[platform]/tools/cli/migration/cli-auth-signup-changes/index.mdx'
                    },
                    {
                      path: 'src/pages/[platform]/tools/cli/migration/list-nullability/index.mdx'
                    },
                    {
                      path: 'src/pages/[platform]/tools/cli/migration/cli-migrate-aws-account/index.mdx'
                    },
                    {
                      path: 'src/pages/[platform]/tools/cli/migration/identity-claim-changes/index.mdx'
                    }
                  ]
                },
                {
                  path: 'src/pages/[platform]/tools/cli/reference/index.mdx',
                  children: [
                    {
                      path: 'src/pages/[platform]/tools/cli/reference/iam/index.mdx'
                    },
                    {
                      path: 'src/pages/[platform]/tools/cli/reference/iam-roles-mfa/index.mdx'
                    },
                    {
                      path: 'src/pages/[platform]/tools/cli/reference/files/index.mdx'
                    },
                    {
                      path: 'src/pages/[platform]/tools/cli/reference/usage-data/index.mdx'
                    },
                    {
                      path: 'src/pages/[platform]/tools/cli/reference/diagnose/index.mdx'
                    },
                    {
                      path: 'src/pages/[platform]/tools/cli/reference/feature-flags/index.mdx'
                    },
                    {
                      path: 'src/pages/[platform]/tools/cli/reference/ssm-parameter-store/index.mdx'
                    }
                  ]
                }
              ]
            },
            {
              path: 'src/pages/[platform]/tools/console/index.mdx',
              children: [
                {
                  path: 'src/pages/[platform]/tools/console/adminui/index.mdx',
                  children: [
                    {
                      path: 'src/pages/[platform]/tools/console/adminui/start/index.mdx'
                    },
                    {
                      path: 'src/pages/[platform]/tools/console/adminui/extend-cli/index.mdx'
                    },
                    {
                      path: 'src/pages/[platform]/tools/console/adminui/access-management/index.mdx'
                    },
                    {
                      path: 'src/pages/[platform]/tools/console/adminui/custom-domain/index.mdx'
                    }
                  ]
                },
                {
                  path: 'src/pages/[platform]/tools/console/tutorial/index.mdx',
                  children: [
                    {
                      path: 'src/pages/[platform]/tools/console/tutorial/buildui/index.mdx'
                    },
                    {
                      path: 'src/pages/[platform]/tools/console/tutorial/data/index.mdx'
                    },
                    {
                      path: 'src/pages/[platform]/tools/console/tutorial/bindui/index.mdx'
                    },
                    {
                      path: 'src/pages/[platform]/tools/console/tutorial/collections/index.mdx'
                    },
                    {
                      path: 'src/pages/[platform]/tools/console/tutorial/code/index.mdx'
                    }
                  ]
                },
                {
                  path: 'src/pages/[platform]/tools/console/data/index.mdx',
                  children: [
                    {
                      path: 'src/pages/[platform]/tools/console/data/data-model/index.mdx'
                    },
                    {
                      path: 'src/pages/[platform]/tools/console/data/relationships/index.mdx'
                    },
                    {
                      path: 'src/pages/[platform]/tools/console/data/content-management/index.mdx'
                    }
                  ]
                },
                {
                  path: 'src/pages/[platform]/tools/console/auth/index.mdx',
                  children: [
                    {
                      path: 'src/pages/[platform]/tools/console/auth/user-management/index.mdx'
                    },
                    {
                      path: 'src/pages/[platform]/tools/console/auth/import/index.mdx'
                    }
                  ]
                },
                {
                  path: 'src/pages/[platform]/tools/console/authz/index.mdx',
                  children: [
                    {
                      path: 'src/pages/[platform]/tools/console/authz/permissions/index.mdx'
                    }
                  ]
                },
                {
                  path: 'src/pages/[platform]/tools/console/storage/index.mdx',
                  children: [
                    {
                      path: 'src/pages/[platform]/tools/console/storage/file-browser/index.mdx'
                    },
                    {
                      path: 'src/pages/[platform]/tools/console/storage/file-storage/index.mdx'
                    }
                  ]
                }
              ]
            },
            {
              path: 'src/pages/[platform]/tools/libraries/index.mdx',
              children: [
                {
                  path: 'src/pages/[platform]/tools/libraries/configure-categories/index.mdx'
                }
              ]
            }
          ]
        },
        {
          isExternal: true,
          route: 'https://aws-amplify.github.io/amplify-js/api/',
          title: 'Reference',
          description: 'Reference',
          platforms: [
            'javascript',
            'nextjs',
            'react',
            'react-native',
            'angular',
            'vue'
          ]
        },
        {
          isExternal: true,
          route: 'https://aws-amplify.github.io/amplify-swift/docs/',
          title: 'Reference',
          description: 'Reference',
          platforms: ['swift']
        },
        {
          isExternal: true,
          route:
            'https://aws-amplify.github.io/aws-sdk-android/docs/reference/',
          title: 'Reference',
          description: 'Reference',
          platforms: ['android']
        },
        {
          path: 'src/pages/[platform]/reference/flutter-api/index.mdx',
          title: 'Reference',
          description: 'Reference',
          platforms: ['flutter']
        },
        {
          path: 'src/pages/[platform]/prev/index.mdx',
          children: [
            {
              path: 'src/pages/[platform]/prev/build-a-backend/index.mdx',
              children: [
                {
                  path: 'src/pages/[platform]/prev/build-a-backend/auth/index.mdx',
                  children: [
                    {
                      path: 'src/pages/[platform]/prev/build-a-backend/auth/set-up-auth/index.mdx'
                    },
                    {
                      path: 'src/pages/[platform]/prev/build-a-backend/auth/accessing-credentials/index.mdx'
                    },
                    {
                      path: 'src/pages/[platform]/prev/build-a-backend/auth/managing-credentials/index.mdx'
                    },
                    {
                      path: 'src/pages/[platform]/prev/build-a-backend/auth/enable-sign-up/index.mdx'
                    },
                    {
                      path: 'src/pages/[platform]/prev/build-a-backend/auth/enable-sign-in/index.mdx'
                    },
                    {
                      path: 'src/pages/[platform]/prev/build-a-backend/auth/switch-auth/index.mdx'
                    },
                    {
                      path: 'src/pages/[platform]/prev/build-a-backend/auth/sign-in-custom-flow/index.mdx'
                    },
                    {
                      path: 'src/pages/[platform]/prev/build-a-backend/auth/sign-in-with-web-ui/index.mdx'
                    },
                    {
                      path: 'src/pages/[platform]/prev/build-a-backend/auth/enable-guest-access/index.mdx'
                    },
                    {
                      path: 'src/pages/[platform]/prev/build-a-backend/auth/multi-step-sign-in/index.mdx'
                    },
                    {
                      path: 'src/pages/[platform]/prev/build-a-backend/auth/add-social-provider/index.mdx'
                    },
                    {
                      path: 'src/pages/[platform]/prev/build-a-backend/auth/sign-out/index.mdx'
                    },
                    {
                      path: 'src/pages/[platform]/prev/build-a-backend/auth/manage-user-profile/index.mdx'
                    },
                    {
                      path: 'src/pages/[platform]/prev/build-a-backend/auth/managing-attributes/index.mdx'
                    },
                    {
                      path: 'src/pages/[platform]/prev/build-a-backend/auth/manage-passwords/index.mdx'
                    },
                    {
                      path: 'src/pages/[platform]/prev/build-a-backend/auth/manage-mfa/index.mdx'
                    },
                    {
                      path: 'src/pages/[platform]/prev/build-a-backend/auth/add-sms-flows/index.mdx'
                    },
                    {
                      path: 'src/pages/[platform]/prev/build-a-backend/auth/remember-device/index.mdx'
                    },
                    {
                      path: 'src/pages/[platform]/prev/build-a-backend/auth/advanced-workflows/index.mdx'
                    },
                    {
                      path: 'src/pages/[platform]/prev/build-a-backend/auth/delete-user-account/index.mdx'
                    },
                    {
                      path: 'src/pages/[platform]/prev/build-a-backend/auth/existing-resources/index.mdx'
                    },
                    {
                      path: 'src/pages/[platform]/prev/build-a-backend/auth/auth-events/index.mdx'
                    },
                    {
                      path: 'src/pages/[platform]/prev/build-a-backend/auth/sdk/index.mdx'
                    },
                    {
                      path: 'src/pages/[platform]/prev/build-a-backend/auth/data-usage-policy/index.mdx'
                    },
                    {
                      path: 'src/pages/[platform]/prev/build-a-backend/auth/app-uninstall/index.mdx'
                    },
                    {
                      path: 'src/pages/[platform]/prev/build-a-backend/auth/under-the-hood/index.mdx'
                    }
                  ]
                },
                {
                  path: 'src/pages/[platform]/prev/build-a-backend/graphqlapi/index.mdx',
                  children: [
                    {
                      path: 'src/pages/[platform]/prev/build-a-backend/graphqlapi/set-up-graphql-api/index.mdx'
                    },
                    {
                      path: 'src/pages/[platform]/prev/build-a-backend/graphqlapi/connect-to-api/index.mdx'
                    },
                    {
                      path: 'src/pages/[platform]/prev/build-a-backend/graphqlapi/api-graphql-concepts/index.mdx'
                    },
                    {
                      path: 'src/pages/[platform]/prev/build-a-backend/graphqlapi/customize-authz-modes/index.mdx'
                    },
                    {
                      path: 'src/pages/[platform]/prev/build-a-backend/graphqlapi/mutate-data/index.mdx'
                    },
                    {
                      path: 'src/pages/[platform]/prev/build-a-backend/graphqlapi/query-data/index.mdx'
                    },
                    {
                      path: 'src/pages/[platform]/prev/build-a-backend/graphqlapi/subscribe-data/index.mdx'
                    },
                    {
                      path: 'src/pages/[platform]/prev/build-a-backend/graphqlapi/working-with-files/index.mdx'
                    },
                    {
                      path: 'src/pages/[platform]/prev/build-a-backend/graphqlapi/optimistic-ui/index.mdx'
                    },
                    {
                      path: 'src/pages/[platform]/prev/build-a-backend/graphqlapi/connect-from-server-runtime/index.mdx'
                    },
                    {
                      path: 'src/pages/[platform]/prev/build-a-backend/graphqlapi/offline/index.mdx'
                    },
                    {
                      path: 'src/pages/[platform]/prev/build-a-backend/graphqlapi/advanced-workflows/index.mdx'
                    },
                    {
                      path: 'src/pages/[platform]/prev/build-a-backend/graphqlapi/existing-resources/index.mdx'
                    },
                    {
                      path: 'src/pages/[platform]/prev/build-a-backend/graphqlapi/upgrade-guide/index.mdx'
                    }
                  ]
                },
                {
                  path: 'src/pages/[platform]/prev/build-a-backend/restapi/index.mdx',
                  children: [
                    {
                      path: 'src/pages/[platform]/prev/build-a-backend/restapi/set-up-rest-api/index.mdx'
                    },
                    {
                      path: 'src/pages/[platform]/prev/build-a-backend/restapi/fetch-data/index.mdx'
                    },
                    {
                      path: 'src/pages/[platform]/prev/build-a-backend/restapi/update-data/index.mdx'
                    },
                    {
                      path: 'src/pages/[platform]/prev/build-a-backend/restapi/delete-data/index.mdx'
                    },
                    {
                      path: 'src/pages/[platform]/prev/build-a-backend/restapi/cancel-api-requests/index.mdx'
                    },
                    {
                      path: 'src/pages/[platform]/prev/build-a-backend/restapi/customize-authz/index.mdx'
                    },
                    {
                      path: 'src/pages/[platform]/prev/build-a-backend/restapi/existing-resources/index.mdx'
                    }
                  ]
                },
                {
                  path: 'src/pages/[platform]/prev/build-a-backend/storage/index.mdx',
                  children: [
                    {
                      path: 'src/pages/[platform]/prev/build-a-backend/storage/set-up-storage/index.mdx'
                    },
                    {
                      path: 'src/pages/[platform]/prev/build-a-backend/storage/upload/index.mdx'
                    },
                    {
                      path: 'src/pages/[platform]/prev/build-a-backend/storage/download/index.mdx'
                    },
                    {
                      path: 'src/pages/[platform]/prev/build-a-backend/storage/get-properties/index.mdx'
                    },
                    {
                      path: 'src/pages/[platform]/prev/build-a-backend/storage/list/index.mdx'
                    },
                    {
                      path: 'src/pages/[platform]/prev/build-a-backend/storage/copy/index.mdx'
                    },
                    {
                      path: 'src/pages/[platform]/prev/build-a-backend/storage/remove/index.mdx'
                    },
                    {
                      path: 'src/pages/[platform]/prev/build-a-backend/storage/cancel-requests/index.mdx'
                    },
                    {
                      path: 'src/pages/[platform]/prev/build-a-backend/storage/configure-access/index.mdx'
                    },
                    {
                      path: 'src/pages/[platform]/prev/build-a-backend/storage/autotrack/index.mdx'
                    },
                    {
                      path: 'src/pages/[platform]/prev/build-a-backend/storage/transfer-acceleration/index.mdx'
                    },
                    {
                      path: 'src/pages/[platform]/prev/build-a-backend/storage/lambda-triggers/index.mdx'
                    },
                    {
                      path: 'src/pages/[platform]/prev/build-a-backend/storage/custom-plugin/index.mdx'
                    },
                    {
                      path: 'src/pages/[platform]/prev/build-a-backend/storage/existing-resources/index.mdx'
                    },
                    {
                      path: 'src/pages/[platform]/prev/build-a-backend/storage/sdk/index.mdx'
                    },
                    {
                      path: 'src/pages/[platform]/prev/build-a-backend/storage/data-usage-policy/index.mdx'
                    }
                  ]
                },
                {
                  path: 'src/pages/[platform]/prev/build-a-backend/push-notifications/index.mdx',
                  children: [
                    {
                      path: 'src/pages/[platform]/prev/build-a-backend/push-notifications/set-up-push-notifications/index.mdx'
                    },
                    {
                      path: 'src/pages/[platform]/prev/build-a-backend/push-notifications/request-permissions/index.mdx'
                    },
                    {
                      path: 'src/pages/[platform]/prev/build-a-backend/push-notifications/receive-device-token/index.mdx'
                    },
                    {
                      path: 'src/pages/[platform]/prev/build-a-backend/push-notifications/interact-with-notifications/index.mdx'
                    },
                    {
                      path: 'src/pages/[platform]/prev/build-a-backend/push-notifications/identify-user/index.mdx'
                    },
                    {
                      path: 'src/pages/[platform]/prev/build-a-backend/push-notifications/app-badge-count/index.mdx'
                    },
                    {
                      path: 'src/pages/[platform]/prev/build-a-backend/push-notifications/enable-rich-notifications/index.mdx'
                    },
                    {
                      path: 'src/pages/[platform]/prev/build-a-backend/push-notifications/test-notifications/index.mdx'
                    },
                    {
                      path: 'src/pages/[platform]/prev/build-a-backend/push-notifications/set-up-push-service/index.mdx'
                    },
                    {
                      path: 'src/pages/[platform]/prev/build-a-backend/push-notifications/migrate-from-previous-version/index.mdx'
                    }
                  ]
                },
                {
                  path: 'src/pages/[platform]/prev/build-a-backend/server-side-rendering/index.mdx'
                },
                {
                  path: 'src/pages/[platform]/prev/build-a-backend/utilities/index.mdx',
                  children: [
                    {
                      path: 'src/pages/[platform]/prev/build-a-backend/utilities/cache/index.mdx'
                    },
                    {
                      path: 'src/pages/[platform]/prev/build-a-backend/utilities/console-logger/index.mdx'
                    },
                    {
                      path: 'src/pages/[platform]/prev/build-a-backend/utilities/hub/index.mdx'
                    },
                    {
                      path: 'src/pages/[platform]/prev/build-a-backend/utilities/i18n/index.mdx'
                    },
                    {
                      path: 'src/pages/[platform]/prev/build-a-backend/utilities/service-worker/index.mdx'
                    }
                  ]
                },
                {
                  path: 'src/pages/[platform]/prev/build-a-backend/more-features/index.mdx',
                  children: [
                    {
                      path: 'src/pages/[platform]/prev/build-a-backend/more-features/predictions/index.mdx',
                      children: [
                        {
                          path: 'src/pages/[platform]/prev/build-a-backend/more-features/predictions/set-up-predictions/index.mdx'
                        },
                        {
                          path: 'src/pages/[platform]/prev/build-a-backend/more-features/predictions/text-to-speech/index.mdx'
                        },
                        {
                          path: 'src/pages/[platform]/prev/build-a-backend/more-features/predictions/transcribe-audio/index.mdx'
                        },
                        {
                          path: 'src/pages/[platform]/prev/build-a-backend/more-features/predictions/translate/index.mdx'
                        },
                        {
                          path: 'src/pages/[platform]/prev/build-a-backend/more-features/predictions/identify-text/index.mdx'
                        },
                        {
                          path: 'src/pages/[platform]/prev/build-a-backend/more-features/predictions/identify-entity/index.mdx'
                        },
                        {
                          path: 'src/pages/[platform]/prev/build-a-backend/more-features/predictions/label-image/index.mdx'
                        },
                        {
                          path: 'src/pages/[platform]/prev/build-a-backend/more-features/predictions/interpret-sentiment/index.mdx'
                        },
                        {
                          path: 'src/pages/[platform]/prev/build-a-backend/more-features/predictions/example-app/index.mdx'
                        },
                        {
                          path: 'src/pages/[platform]/prev/build-a-backend/more-features/predictions/sdk/index.mdx'
                        },
                        {
                          path: 'src/pages/[platform]/prev/build-a-backend/more-features/predictions/data-usage-policy/index.mdx'
                        }
                      ]
                    },
                    {
                      path: 'src/pages/[platform]/prev/build-a-backend/more-features/analytics/index.mdx',
                      children: [
                        {
                          path: 'src/pages/[platform]/prev/build-a-backend/more-features/analytics/set-up-analytics/index.mdx'
                        },
                        {
                          path: 'src/pages/[platform]/prev/build-a-backend/more-features/analytics/record-events/index.mdx'
                        },
                        {
                          path: 'src/pages/[platform]/prev/build-a-backend/more-features/analytics/identify-user/index.mdx'
                        },
                        {
                          path: 'src/pages/[platform]/prev/build-a-backend/more-features/analytics/update-endpoint/index.mdx'
                        },
                        {
                          path: 'src/pages/[platform]/prev/build-a-backend/more-features/analytics/auto-track-sessions/index.mdx'
                        },
                        {
                          path: 'src/pages/[platform]/prev/build-a-backend/more-features/analytics/enable-disable/index.mdx'
                        },
                        {
                          path: 'src/pages/[platform]/prev/build-a-backend/more-features/analytics/streaming-data/index.mdx'
                        },
                        {
                          path: 'src/pages/[platform]/prev/build-a-backend/more-features/analytics/create-custom-plugin/index.mdx'
                        },
                        {
                          path: 'src/pages/[platform]/prev/build-a-backend/more-features/analytics/storing-data/index.mdx'
                        },
                        {
                          path: 'src/pages/[platform]/prev/build-a-backend/more-features/analytics/personalize-recommendations/index.mdx'
                        },
                        {
                          path: 'src/pages/[platform]/prev/build-a-backend/more-features/analytics/existing-resources/index.mdx'
                        },
                        {
                          path: 'src/pages/[platform]/prev/build-a-backend/more-features/analytics/sdk/index.mdx'
                        },
                        {
                          path: 'src/pages/[platform]/prev/build-a-backend/more-features/analytics/data-usage-policy/index.mdx'
                        },
                        {
                          path: 'src/pages/[platform]/prev/build-a-backend/more-features/analytics/app-uninstall/index.mdx'
                        }
                      ]
                    },
                    {
                      path: 'src/pages/[platform]/prev/build-a-backend/more-features/datastore/index.mdx',
                      children: [
                        {
                          path: 'src/pages/[platform]/prev/build-a-backend/more-features/datastore/set-up-datastore/index.mdx'
                        },
                        {
                          path: 'src/pages/[platform]/prev/build-a-backend/more-features/datastore/manipulate-data/index.mdx'
                        },
                        {
                          path: 'src/pages/[platform]/prev/build-a-backend/more-features/datastore/relational-models/index.mdx'
                        },
                        {
                          path: 'src/pages/[platform]/prev/build-a-backend/more-features/datastore/sync-to-cloud/index.mdx'
                        },
                        {
                          path: 'src/pages/[platform]/prev/build-a-backend/more-features/datastore/authz-rules-setup/index.mdx'
                        },
                        {
                          path: 'src/pages/[platform]/prev/build-a-backend/more-features/datastore/conflict-resolution/index.mdx'
                        },
                        {
                          path: 'src/pages/[platform]/prev/build-a-backend/more-features/datastore/real-time/index.mdx'
                        },
                        {
                          path: 'src/pages/[platform]/prev/build-a-backend/more-features/datastore/datastore-events/index.mdx'
                        },
                        {
                          path: 'src/pages/[platform]/prev/build-a-backend/more-features/datastore/additional-methods/index.mdx'
                        },
                        {
                          path: 'src/pages/[platform]/prev/build-a-backend/more-features/datastore/schema-updates/index.mdx'
                        },
                        {
                          path: 'src/pages/[platform]/prev/build-a-backend/more-features/datastore/how-it-works/index.mdx'
                        },
                        {
                          path: 'src/pages/[platform]/prev/build-a-backend/more-features/datastore/customize-primary-keys/index.mdx'
                        },
                        {
                          path: 'src/pages/[platform]/prev/build-a-backend/more-features/datastore/data-usage-policy/index.mdx'
                        },
                        {
                          path: 'src/pages/[platform]/prev/build-a-backend/more-features/datastore/app-uninstall/index.mdx'
                        }
                      ]
                    },
                    {
                      path: 'src/pages/[platform]/prev/build-a-backend/more-features/geo/index.mdx',
                      children: [
                        {
                          path: 'src/pages/[platform]/prev/build-a-backend/more-features/geo/set-up-geo/index.mdx'
                        },
                        {
                          path: 'src/pages/[platform]/prev/build-a-backend/more-features/geo/configure-maps/index.mdx'
                        },
                        {
                          path: 'src/pages/[platform]/prev/build-a-backend/more-features/geo/maps/index.mdx'
                        },
                        {
                          path: 'src/pages/[platform]/prev/build-a-backend/more-features/geo/location-search/index.mdx'
                        },
                        {
                          path: 'src/pages/[platform]/prev/build-a-backend/more-features/geo/geofences/index.mdx'
                        },
                        {
                          path: 'src/pages/[platform]/prev/build-a-backend/more-features/geo/configure-geofencing/index.mdx'
                        },
                        {
                          path: 'src/pages/[platform]/prev/build-a-backend/more-features/geo/existing-resources/index.mdx'
                        },
                        {
                          path: 'src/pages/[platform]/prev/build-a-backend/more-features/geo/google-migration/index.mdx'
                        },
                        {
                          path: 'src/pages/[platform]/prev/build-a-backend/more-features/geo/amazon-location-sdk/index.mdx'
                        }
                      ]
                    },
                    {
                      path: 'src/pages/[platform]/prev/build-a-backend/more-features/in-app-messaging/index.mdx',
                      children: [
                        {
                          path: 'src/pages/[platform]/prev/build-a-backend/more-features/in-app-messaging/set-up-in-app-messaging/index.mdx'
                        },
                        {
                          path: 'src/pages/[platform]/prev/build-a-backend/more-features/in-app-messaging/create-campaign/index.mdx'
                        },
                        {
                          path: 'src/pages/[platform]/prev/build-a-backend/more-features/in-app-messaging/integrate-application/index.mdx'
                        },
                        {
                          path: 'src/pages/[platform]/prev/build-a-backend/more-features/in-app-messaging/sync-messages/index.mdx'
                        },
                        {
                          path: 'src/pages/[platform]/prev/build-a-backend/more-features/in-app-messaging/display-messages/index.mdx'
                        },
                        {
                          path: 'src/pages/[platform]/prev/build-a-backend/more-features/in-app-messaging/clear-messages/index.mdx'
                        },
                        {
                          path: 'src/pages/[platform]/prev/build-a-backend/more-features/in-app-messaging/identify-user/index.mdx'
                        },
                        {
                          path: 'src/pages/[platform]/prev/build-a-backend/more-features/in-app-messaging/respond-interaction-events/index.mdx'
                        },
                        {
                          path: 'src/pages/[platform]/prev/build-a-backend/more-features/in-app-messaging/resolve-conflicts/index.mdx'
                        }
                      ]
                    },
                    {
                      path: 'src/pages/[platform]/prev/build-a-backend/more-features/interactions/index.mdx',
                      children: [
                        {
                          path: 'src/pages/[platform]/prev/build-a-backend/more-features/interactions/set-up-interactions/index.mdx'
                        },
                        {
                          path: 'src/pages/[platform]/prev/build-a-backend/more-features/interactions/chatbot/index.mdx'
                        }
                      ]
                    },
                    {
                      path: 'src/pages/[platform]/prev/build-a-backend/more-features/pubsub/index.mdx',
                      children: [
                        {
                          path: 'src/pages/[platform]/prev/build-a-backend/more-features/pubsub/set-up-pubsub/index.mdx'
                        },
                        {
                          path: 'src/pages/[platform]/prev/build-a-backend/more-features/pubsub/subscribe/index.mdx'
                        },
                        {
                          path: 'src/pages/[platform]/prev/build-a-backend/more-features/pubsub/publish/index.mdx'
                        }
                      ]
                    }
                  ]
                },
                {
                  path: 'src/pages/[platform]/prev/build-a-backend/debugging/index.mdx'
                },
                {
                  path: 'src/pages/[platform]/prev/build-a-backend/troubleshooting/index.mdx',
                  children: [
                    {
                      path: 'src/pages/[platform]/prev/build-a-backend/troubleshooting/upgrade-amplify-packages/index.mdx'
                    },
                    {
                      path: 'src/pages/[platform]/prev/build-a-backend/troubleshooting/strict-mode/index.mdx'
                    }
                  ]
                }
              ]
            }
          ]
        },
        {
          path: 'src/pages/[platform]/tools/cli-legacy/index.mdx',
          children: [
            {
              path: 'src/pages/[platform]/tools/cli-legacy/overview/index.mdx'
            },
            {
              path: 'src/pages/[platform]/tools/cli-legacy/directives/index.mdx'
            },
            {
              path: 'src/pages/[platform]/tools/cli-legacy/model-directive/index.mdx'
            },
            {
              path: 'src/pages/[platform]/tools/cli-legacy/key-directive/index.mdx'
            },
            {
              path: 'src/pages/[platform]/tools/cli-legacy/auth-directive/index.mdx'
            },
            {
              path: 'src/pages/[platform]/tools/cli-legacy/connection-directive/index.mdx'
            },
            {
              path: 'src/pages/[platform]/tools/cli-legacy/function-directive/index.mdx'
            },
            {
              path: 'src/pages/[platform]/tools/cli-legacy/http-directive/index.mdx'
            },
            {
              path: 'src/pages/[platform]/tools/cli-legacy/predictions-directive/index.mdx'
            },
            {
              path: 'src/pages/[platform]/tools/cli-legacy/searchable-directive/index.mdx'
            },
            {
              path: 'src/pages/[platform]/tools/cli-legacy/versioned-directive/index.mdx'
            },
            {
              path: 'src/pages/[platform]/tools/cli-legacy/data-access-patterns/index.mdx'
            },
            {
              path: 'src/pages/[platform]/tools/cli-legacy/storage/index.mdx'
            },
            {
              path: 'src/pages/[platform]/tools/cli-legacy/relational-databases/index.mdx'
            },
            {
              path: 'src/pages/[platform]/tools/cli-legacy/client-codegen/index.mdx'
            },
            {
              path: 'src/pages/[platform]/tools/cli-legacy/overwrite-customize-resolvers/index.mdx'
            },
            {
              path: 'src/pages/[platform]/tools/cli-legacy/config-params/index.mdx'
            },
            {
              path: 'src/pages/[platform]/tools/cli-legacy/examples/index.mdx'
            }
          ]
        },
        {
          path: 'src/pages/[platform]/sdk/index.mdx',
          children: [
            {
              path: 'src/pages/[platform]/sdk/api/index.mdx',
              children: [
                { path: 'src/pages/[platform]/sdk/api/graphql/index.mdx' },
                { path: 'src/pages/[platform]/sdk/api/rest/index.mdx' }
              ]
            },
            {
              path: 'src/pages/[platform]/sdk/analytics/index.mdx',
              children: [
                {
                  path: 'src/pages/[platform]/sdk/analytics/getting-started/index.mdx'
                },
                {
                  path: 'src/pages/[platform]/sdk/analytics/events/index.mdx'
                },
                {
                  path: 'src/pages/[platform]/sdk/analytics/endpoints/index.mdx'
                },
                {
                  path: 'src/pages/[platform]/sdk/analytics/kinesis/index.mdx'
                }
              ]
            },
            {
              path: 'src/pages/[platform]/sdk/auth/index.mdx',
              children: [
                {
                  path: 'src/pages/[platform]/sdk/auth/getting-started/index.mdx'
                },
                {
                  path: 'src/pages/[platform]/sdk/auth/guest-access/index.mdx'
                },
                {
                  path: 'src/pages/[platform]/sdk/auth/drop-in-auth/index.mdx'
                },
                {
                  path: 'src/pages/[platform]/sdk/auth/working-with-api/index.mdx'
                },
                {
                  path: 'src/pages/[platform]/sdk/auth/federated-identities/index.mdx'
                },
                { path: 'src/pages/[platform]/sdk/auth/hosted-ui/index.mdx' },
                {
                  path: 'src/pages/[platform]/sdk/auth/custom-auth-flow/index.mdx'
                },
                {
                  path: 'src/pages/[platform]/sdk/auth/device-features/index.mdx'
                }
              ]
            },
            {
              path: 'src/pages/[platform]/sdk/push-notifications/index.mdx',
              children: [
                {
                  path: 'src/pages/[platform]/sdk/push-notifications/getting-started/index.mdx'
                },
                {
                  path: 'src/pages/[platform]/sdk/push-notifications/messaging-campaign/index.mdx'
                },
                {
                  path: 'src/pages/[platform]/sdk/push-notifications/setup-push-service/index.mdx'
                }
              ]
            },
            {
              path: 'src/pages/[platform]/sdk/pubsub/index.mdx',
              children: [
                {
                  path: 'src/pages/[platform]/sdk/pubsub/getting-started/index.mdx'
                },
                {
                  path: 'src/pages/[platform]/sdk/pubsub/working-api/index.mdx'
                },
                {
                  path: 'src/pages/[platform]/sdk/pubsub/aws-iot-and-amplify/index.mdx'
                }
              ]
            },
            {
              path: 'src/pages/[platform]/sdk/storage/index.mdx',
              children: [
                {
                  path: 'src/pages/[platform]/sdk/storage/getting-started/index.mdx'
                },
                {
                  path: 'src/pages/[platform]/sdk/storage/transfer-utility/index.mdx'
                },
                {
                  path: 'src/pages/[platform]/sdk/storage/graphql-api/index.mdx'
                },
                {
                  path: 'src/pages/[platform]/sdk/storage/configure-access/index.mdx'
                }
              ]
            },
            {
              path: 'src/pages/[platform]/sdk/configuration/index.mdx',
              children: [
                {
                  path: 'src/pages/[platform]/sdk/configuration/setup-options/index.mdx'
                }
              ]
            },
            {
              path: 'src/pages/[platform]/sdk/info/index.mdx',
              children: [
                {
                  path: 'src/pages/[platform]/sdk/info/overview/index.mdx'
                },
                {
                  path: 'src/pages/[platform]/sdk/info/app-uninstall/index.mdx'
                }
              ]
            }
          ]
        }
      ]
    },
    {
      path: 'src/pages/gen2/index.tsx',
      children: [
        {
          path: 'src/pages/gen2/how-amplify-works/index.mdx',
          children: [
            {
              path: 'src/pages/gen2/how-amplify-works/concepts/index.mdx'
            },
            {
              path: 'src/pages/gen2/how-amplify-works/faq/index.mdx'
            }
          ]
        },
        {
          path: 'src/pages/gen2/start/index.mdx',
          children: [
            {
              path: 'src/pages/gen2/start/quickstart/index.mdx',
              children: [
                {
                  path: 'src/pages/gen2/start/quickstart/nextjs-pages-router/index.mdx'
                },
                {
                  path: 'src/pages/gen2/start/quickstart/nextjs-app-router-client-components/index.mdx'
                },
                {
                  path: 'src/pages/gen2/start/quickstart/nextjs-app-router-server-components/index.mdx'
                }
              ]
            },
            {
              path: 'src/pages/gen2/start/account-setup/index.mdx'
            },
            {
              path: 'src/pages/gen2/start/manual-installation/index.mdx'
            },
            {
              path: 'src/pages/gen2/start/mobile-support/index.mdx'
            }
          ]
        },
        {
          path: 'src/pages/gen2/build-a-backend/index.mdx',
          children: [
            {
              path: 'src/pages/gen2/build-a-backend/auth/index.mdx',
              children: [
                {
                  path: 'src/pages/gen2/build-a-backend/auth/set-up-auth/index.mdx'
                },
                {
                  path: 'src/pages/gen2/build-a-backend/auth/enable-sign-up/index.mdx'
                },
                {
                  path: 'src/pages/gen2/build-a-backend/auth/add-social-provider/index.mdx'
                },
                {
                  path: 'src/pages/gen2/build-a-backend/auth/manage-user-session/index.mdx'
                },
                {
                  path: 'src/pages/gen2/build-a-backend/auth/manage-user-profile/index.mdx'
                },
                {
                  path: 'src/pages/gen2/build-a-backend/auth/password-management/index.mdx'
                },
                {
                  path: 'src/pages/gen2/build-a-backend/auth/manage-mfa/index.mdx'
                },
                {
                  path: 'src/pages/gen2/build-a-backend/auth/delete-user-account/index.mdx'
                },
                {
                  path: 'src/pages/gen2/build-a-backend/auth/auth-events/index.mdx'
                },
                {
                  path: 'src/pages/gen2/build-a-backend/auth/admin-actions/index.mdx'
                },
                {
                  path: 'src/pages/gen2/build-a-backend/auth/override-cognito/index.mdx'
                }
              ]
            },
            {
              path: 'src/pages/gen2/build-a-backend/data/index.mdx',
              children: [
                {
                  path: 'src/pages/gen2/build-a-backend/data/set-up-data/index.mdx'
                },
                {
                  path: 'src/pages/gen2/build-a-backend/data/connect-to-API/index.mdx'
                },
                {
                  path: 'src/pages/gen2/build-a-backend/data/mutate-data/index.mdx'
                },
                {
                  path: 'src/pages/gen2/build-a-backend/data/query-data/index.mdx'
                },
                {
                  path: 'src/pages/gen2/build-a-backend/data/subscribe-data/index.mdx'
                },
                {
                  path: 'src/pages/gen2/build-a-backend/data/data-modeling/index.mdx',
                  children: [
                    {
                      path: 'src/pages/gen2/build-a-backend/data/data-modeling/add-fields/index.mdx'
                    },
                    {
                      path: 'src/pages/gen2/build-a-backend/data/data-modeling/identifiers/index.mdx'
                    },
                    {
                      path: 'src/pages/gen2/build-a-backend/data/data-modeling/relationships/index.mdx'
                    }
                  ]
                },
                {
                  path: 'src/pages/gen2/build-a-backend/data/customize-authz/index.mdx',
                  children: [
                    {
                      path: 'src/pages/gen2/build-a-backend/data/customize-authz/public-data-access/index.mdx'
                    },
                    {
                      path: 'src/pages/gen2/build-a-backend/data/customize-authz/per-user-per-owner-data-access/index.mdx'
                    },
                    {
                      path: 'src/pages/gen2/build-a-backend/data/customize-authz/multi-user-data-access/index.mdx'
                    },
                    {
                      path: 'src/pages/gen2/build-a-backend/data/customize-authz/signed-in-user-data-access/index.mdx'
                    },
                    {
                      path: 'src/pages/gen2/build-a-backend/data/customize-authz/user-group-based-data-access/index.mdx'
                    },
                    {
                      path: 'src/pages/gen2/build-a-backend/data/customize-authz/custom-data-access-patterns/index.mdx'
                    },
                    {
                      path: 'src/pages/gen2/build-a-backend/data/customize-authz/using-oidc-authorization-provider/index.mdx'
                    },
                    {
                      path: 'src/pages/gen2/build-a-backend/data/customize-authz/configure-custom-identity-and-group-claim/index.mdx'
                    },
                    {
                      path: 'src/pages/gen2/build-a-backend/data/customize-authz/use-iam-authz-within-appsync-console/index.mdx'
                    },
                    {
                      path: 'src/pages/gen2/build-a-backend/data/customize-authz/grant-lambda-function-access-to-api/index.mdx'
                    }
                  ]
                },
                {
                  path: 'src/pages/gen2/build-a-backend/data/custom-business-logic/index.mdx'
                },
                {
                  path: 'src/pages/gen2/build-a-backend/data/connect-from-server-runtime/index.mdx'
                },
                {
                  path: 'src/pages/gen2/build-a-backend/data/override-resources/index.mdx'
                }
              ]
            },
            {
              path: 'src/pages/gen2/build-a-backend/storage/index.mdx'
            },
            {
              path: 'src/pages/gen2/build-a-backend/functions/index.mdx'
            },
            {
              path: 'src/pages/gen2/build-a-backend/server-side-rendering/index.mdx'
            },
            {
              path: 'src/pages/gen2/build-a-backend/add-aws-services/index.mdx',
              children: [
                {
                  path: 'src/pages/gen2/build-a-backend/add-aws-services/custom-resources/index.mdx'
                },
                {
                  path: 'src/pages/gen2/build-a-backend/add-aws-services/overriding-resources/index.mdx'
                }
              ]
            }
          ]
        },
        {
          path: 'src/pages/gen2/build-ui/index.mdx',
          children: [
            {
              path: 'src/pages/gen2/build-ui/forms/index.mdx'
            },
            {
              path: 'src/pages/gen2/build-ui/figma-to-code/index.mdx'
            }
          ]
        },
        {
          path: 'src/pages/gen2/deploy-and-host/index.mdx',
          children: [
            {
              path: 'src/pages/gen2/deploy-and-host/hosting/index.mdx'
            },
            {
              path: 'src/pages/gen2/deploy-and-host/sandbox-environments/index.mdx',
              children: [
                {
                  path: 'src/pages/gen2/deploy-and-host/sandbox-environments/setup/index.mdx'
                },
                {
                  path: 'src/pages/gen2/deploy-and-host/sandbox-environments/features/index.mdx'
                }
              ]
            },
            {
              path: 'src/pages/gen2/deploy-and-host/fullstack-branching/index.mdx',
              children: [
                {
                  path: 'src/pages/gen2/deploy-and-host/fullstack-branching/branch-deployments/index.mdx'
                },
                {
                  path: 'src/pages/gen2/deploy-and-host/fullstack-branching/secrets-and-vars/index.mdx'
                },
                {
                  path: 'src/pages/gen2/deploy-and-host/fullstack-branching/share-resources/index.mdx'
                },
                {
                  path: 'src/pages/gen2/deploy-and-host/fullstack-branching/mono-and-multi-repos/index.mdx'
                },
                {
                  path: 'src/pages/gen2/deploy-and-host/fullstack-branching/monorepos/index.mdx'
                },
                {
                  path: 'src/pages/gen2/deploy-and-host/fullstack-branching/pr-previews/index.mdx'
                },
                {
                  path: 'src/pages/gen2/deploy-and-host/fullstack-branching/custom-pipelines/index.mdx'
                },
                {
                  path: 'src/pages/gen2/deploy-and-host/fullstack-branching/cross-account-deployments/index.mdx'
                }
              ]
            }
          ]
        },
        {
          path: 'src/pages/gen2/reference/index.mdx',
          children: [
            {
              path: 'src/pages/gen2/reference/project-structure/index.mdx'
            },
            {
              path: 'src/pages/gen2/reference/amplifyconfiguration/index.mdx'
            },
            {
              path: 'src/pages/gen2/reference/cdk-constructs/index.mdx'
            },
            {
              path: 'src/pages/gen2/reference/cli-commands/index.mdx'
            },
            {
              path: 'src/pages/gen2/reference/iam-policy/index.mdx'
            },
            {
              path: 'src/pages/gen2/reference/telemetry/index.mdx'
            }
          ]
        }
      ]
    },
    {
      path: 'src/pages/contribute/index.tsx',
      children: [
        {
          path: 'src/pages/contribute/getting-started.tsx'
        }
      ]
    }
  ]
};
