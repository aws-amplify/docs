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
          path: 'src/pages/[platform]/get-started/index.mdx',
          children: [
            {
              path: 'src/pages/[platform]/get-started/project-setup/index.mdx'
            },
            {
              path: 'src/pages/[platform]/get-started/sample-apps/index.mdx'
            },
            {
              path: 'src/pages/[platform]/get-started/tutorials/index.mdx',
              children: [
                {
                  path: 'src/pages/[platform]/get-started/tutorials/connect-api-and-database.mdx'
                },
                {
                  path: 'src/pages/[platform]/get-started/tutorials/deploy-and-host-app.mdx'
                },
                {
                  path: 'src/pages/[platform]/get-started/tutorials/setup-amplify.mdx'
                },
                {
                  path: 'src/pages/[platform]/get-started/tutorials/setup-fullstack-project.mdx'
                },
                {
                  path: 'src/pages/[platform]/get-started/tutorials/next-steps.mdx'
                }
              ]
            }
          ]
        },
        {
          path: 'src/pages/[platform]/build-a-backend/index.mdx',
          children: [
            {
              path: 'src/pages/[platform]/build-a-backend/api-graphql/index.mdx'
            },
            {
              path: 'src/pages/[platform]/build-a-backend/api-rest/index.mdx'
            }
          ]
        },
        {
          path: 'src/pages/[platform]/build-a-ui/index.mdx',
          children: [
            {
              title: 'UI Library Docs',
              platforms: ['android', 'javascript'],
              route: 'https://ui.docs.amplify.aws/',
              isExternal: true
            }
          ]
        }
      ]
    }
  ]
};
