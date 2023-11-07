/**
 * @type {import('./directory').PageNode}
 */
export const directory = {
  path: 'src/pages/index.tsx',
  children: [
    {
      path: 'src/pages/[platform]/index.tsx'
    },
    {
      path: 'src/pages/gen2/index.tsx',
      children: [
        {
          path: 'src/pages/gen2/how-amplify-works/index.mdx'
        },
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
            },
            {
              path: 'src/pages/gen2/build-a-backend/auth/index.mdx',
              children: [
                {
                  path: 'src/pages/gen2/build-a-backend/auth/add-social-provider/index.mdx'
                },
                {
                  path: 'src/pages/gen2/build-a-backend/auth/set-up-auth/index.mdx'
                }
              ]
            },
            {
              path: 'src/pages/gen2/build-a-backend/data/index.mdx',
              children: [
                {
                  path: 'src/pages/gen2/build-a-backend/data/connect-existing-data/index.mdx'
                },
                {
                  path: 'src/pages/gen2/build-a-backend/data/set-up-data/index.mdx'
                }
              ]
            },
            {
              path: 'src/pages/gen2/build-a-backend/functions/index.mdx'
            },
            {
              path: 'src/pages/gen2/build-a-backend/storage/index.mdx'
            }
          ]
        },
        {
          path: 'src/pages/gen2/build-ui/index.mdx'
        },
        {
          path: 'src/pages/gen2/deploy-and-host/index.mdx',
          children: [
            {
              path: 'src/pages/gen2/deploy-and-host/fullstack-branching/index.mdx',
              children: [
                {
                  path: 'src/pages/gen2/deploy-and-host/fullstack-branching/branch-deployments/index.mdx'
                },
                {
                  path: 'src/pages/gen2/deploy-and-host/fullstack-branching/sandbox-deployments/index.mdx'
                }
              ]
            },
            {
              path: 'src/pages/gen2/deploy-and-host/hosting-features/index.mdx'
            },
            {
              path: 'src/pages/gen2/deploy-and-host/local-development/index.mdx'
            }
          ]
        },
        {
          path: 'src/pages/gen2/how-amplify-works/index.mdx',
          children: [
            {
              path: 'src/pages/gen2/how-amplify-works/concepts/index.mdx'
            },
            {
              path: 'src/pages/gen2/how-amplify-works/existing-projects/index.mdx'
            },
            {
              path: 'src/pages/gen2/how-amplify-works/project-structure/index.mdx'
            }
          ]
        },
        {
          path: 'src/pages/gen2/reference/index.mdx',
          children: [
            {
              path: 'src/pages/gen2/reference/CLI-commands/index.mdx'
            },
            {
              path: 'src/pages/gen2/reference/amplifyconfiguration/index.mdx'
            }
          ]
        },
        {
          path: 'src/pages/gen2/start/index.mdx'
        }
      ]
    }
  ]
};
