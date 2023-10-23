/**
 * @type {import('./directory').PageNode}
 */
export const directory = {
  title: 'Amplify Docs',
  description:
    'Amplify documentation - Learn how to use Amplify to develop and deploy cloud-powered mobile and web apps.',
  route: '/',
  children: [
    {
      title: 'Overview',
      description: `This is a description for the overview page.`,
      platforms: ['javascript', 'android'],
      route: '/[platform]',
      children: [
        {
          title: `Get started`,
          description: `A getting started page`,
          platforms: ['android', 'javascript'],
          route: '/[platform]/get-started',
          children: [
            {
              title: `Project setup`,
              description: `Project setup`,
              platforms: ['android', 'javascript'],
              route: '/[platform]/get-started/project-setup'
            },
            {
              title: `Sample apps`,
              description: `Sample apps`,
              platforms: ['android', 'javascript'],
              route: '/[platform]/get-started/sample-apps'
            },
            {
              title: `Tutorials`,
              description: `Tutorials`,
              platforms: ['android', 'javascript'],
              route: '/[platform]/get-started/tutorials',
              children: [
                {
                  title: `Connect API and Database`,
                  description: `Connect API and Database`,
                  platforms: ['android', 'javascript'],
                  route:
                    '/[platform]/get-started/tutorials/connect-api-and-database'
                },
                {
                  title: `Deploy and Host App`,
                  description: `Deploy and Host App`,
                  platforms: ['android', 'javascript'],
                  route: '/[platform]/get-started/tutorials/deploy-and-host-app'
                },
                {
                  title: `Setup Amplify`,
                  description: `Setup Amplify`,
                  platforms: ['android', 'javascript'],
                  route: '/[platform]/get-started/tutorials/setup-amplify'
                },
                {
                  title: `Setup fullstack project`,
                  description: `Setup fullstack project`,
                  platforms: ['android', 'javascript'],
                  route:
                    '/[platform]/get-started/tutorials/setup-fullstack-project'
                },
                {
                  title: `Next Steps`,
                  description: `Next Steps`,
                  platforms: ['android', 'javascript'],
                  route: '/[platform]/get-started/tutorials/next-steps'
                }
              ]
            }
          ]
        },
        {
          title: 'Build a backend',
          description: 'Build a backend',
          platforms: ['android', 'javascript'],
          route: '/[platform]/build-a-backend',
          children: [
            {
              title: `API GraphQL`,
              description: `API GraphQL`,
              platforms: ['android', 'javascript'],
              route: '/[platform]/build-a-backend/api-graphql'
            },
            {
              title: `API (Rest)`,
              description: `API (Rest)`,
              platforms: ['android', 'javascript'],
              route: '/[platform]/build-a-backend/api-rest'
            }
          ]
        },
        {
          title: 'Build a UI',
          description: 'Build a UI',
          platforms: ['android', 'javascript'],
          route: '/[platform]/build-a-ui',
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
