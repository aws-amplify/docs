/**
 * @type {import('./directory').PageNode}
 */
export const directory = {
  path: 'src/pages/index.tsx',
  children: [
    {
      path: 'src/pages/[platform]/index.tsx',
      children: [
        {
          path: 'src/pages/[platform]/start/index.mdx',
          children: [
            {
              path: 'src/pages/[platform]/start/getting-started/index.mdx',
              children: [
                {
                  path: 'src/pages/[platform]/start/getting-started/add-api/index.mdx'
                },
                {
                  path: 'src/pages/[platform]/start/getting-started/auth/index.mdx'
                },
                {
                  path: 'src/pages/[platform]/start/getting-started/data-model/index.mdx'
                },
                {
                  path: 'src/pages/[platform]/start/getting-started/generate-model/index.mdx'
                },
                {
                  path: 'src/pages/[platform]/start/getting-started/hosting/index.mdx'
                },
                {
                  path: 'src/pages/[platform]/start/getting-started/installation/index.mdx'
                },
                {
                  path: 'src/pages/[platform]/start/getting-started/integrate/index.mdx'
                },
                {
                  path: 'src/pages/[platform]/start/getting-started/introduction/index.mdx'
                },
                {
                  path: 'src/pages/[platform]/start/getting-started/nextsteps/index.mdx'
                },
                {
                  path: 'src/pages/[platform]/start/getting-started/setup/index.mdx'
                }
              ]
            },
            {
              path: 'src/pages/[platform]/start/project-setup/index.mdx',
              children: [
                {
                  path: 'src/pages/[platform]/start/project-setup/async-programming-model/index.mdx'
                },
                {
                  path: 'src/pages/[platform]/start/project-setup/combine-framework/index.mdx'
                },
                {
                  path: 'src/pages/[platform]/start/project-setup/create-application/index.mdx'
                },
                {
                  path: 'src/pages/[platform]/start/project-setup/escape-hatch/index.mdx'
                },
                {
                  path: 'src/pages/[platform]/start/project-setup/kotlin-coroutines/index.mdx'
                },
                {
                  path: 'src/pages/[platform]/start/project-setup/platform-setup/index.mdx'
                },
                {
                  path: 'src/pages/[platform]/start/project-setup/prerequisites/index.mdx'
                },
                {
                  path: 'src/pages/[platform]/start/project-setup/rxjava/index.mdx'
                },
                {
                  path: 'src/pages/[platform]/start/project-setup/upgrade-guide/index.mdx'
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
              path: 'src/pages/[platform]/build-a-backend/app-badge-count/index.mdx'
            },
            {
              path: 'src/pages/[platform]/build-a-backend/auth/index.mdx'
            },
            {
              path: 'src/pages/[platform]/build-a-backend/datastore/index.mdx'
            },
            {
              path: 'src/pages/[platform]/build-a-backend/debugging/index.mdx'
            },
            {
              path: 'src/pages/[platform]/build-a-backend/enable-rich-notifications/index.mdx'
            },
            {
              path: 'src/pages/[platform]/build-a-backend/functions/index.mdx'
            },
            {
              path: 'src/pages/[platform]/build-a-backend/graphqlapi/index.mdx'
            },
            {
              path: 'src/pages/[platform]/build-a-backend/identify-user/index.mdx'
            },
            {
              path: 'src/pages/[platform]/build-a-backend/interact-with-notifications/index.mdx'
            },
            {
              path: 'src/pages/[platform]/build-a-backend/migrate-from-previous-version/index.mdx'
            },
            {
              path: 'src/pages/[platform]/build-a-backend/more-features/index.mdx'
            },
            {
              path: 'src/pages/[platform]/build-a-backend/push-notifications/index.mdx'
            },
            {
              path: 'src/pages/[platform]/build-a-backend/restapi/index.mdx'
            },
            {
              path: 'src/pages/[platform]/build-a-backend/server-side-rendering/index.mdx'
            },
            {
              path: 'src/pages/[platform]/build-a-backend/storage/index.mdx'
            },
            {
              path: 'src/pages/[platform]/build-a-backend/test-notifications/index.mdx'
            },
            {
              path: 'src/pages/[platform]/build-a-backend/troubleshooting/index.mdx'
            },
            {
              path: 'src/pages/[platform]/build-a-backend/utilities/index.mdx'
            }
          ]
        },
        {
          path: 'src/pages/[platform]/build-ui/index.mdx',
          children: [
            { path: 'src/pages/[platform]/build-ui/formbuilder/index.mdx' },
            { path: 'src/pages/[platform]/build-ui/uibuilder/index.mdx' },
            {
              title: 'UI Library Docs',
              platforms: ['android', 'javascript'],
              route: 'https://ui.docs.amplify.aws/',
              isExternal: true
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
                  path: 'src/pages/[platform]/tools/cli/commands.tsx'
                }
              ]
            },
            {
              path: 'src/pages/[platform]/tools/cli-legacy/index.mdx'
            },
            {
              path: 'src/pages/[platform]/tools/console/index.mdx'
            },
            {
              path: 'src/pages/[platform]/tools/libraries/index.mdx'
            }
          ]
        }
      ]
    },
    {
      path: 'src/pages/gen2/index.tsx',
      children: [
        {
          path: 'src/pages/gen2/build-a-backend/index.mdx',
          children: [
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
        }
      ]
    }
  ]
};
