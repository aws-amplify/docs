// import fs from 'fs';
// import path from 'path';

// const metaObjectProperties = {
//   title: 'title',
//   description: 'description',
//   platforms: 'platforms'
// };

/**
 * @typedef PageNode
 * @type {object}
 * @property {string} title - Title of the page
 * @property {string} description - Description of the page
 * @property {booleam} isExternal - The node is an external link
 * @property {string[]} platforms - The platforms that the pages apply to
 * @property {string} route - The page's file path
 * @property {PageNode[]} children - The children pages - optional
 */

// async function visitPage(directoryPath) {
//   /** @type {PageNode} */
//   const node = {
//     route: path.basename(directoryPath)
//   };

//   const contents = fs.readdirSync(directoryPath);

//   for (const item of contents) {
//     if (
//       path.extname(item).toLowerCase() === '.mdx' ||
//       path.extname(item).toLowerCase() === ''
//     ) {
//       const itemPath = path.join(directoryPath, item);

//       // Check if the item is a directory
//       if (fs.statSync(itemPath).isDirectory()) {
//         // Recurse
//         visitPage(itemPath);

//         if (contents.includes('index.mdx')) {
//           // Root file for the directory
//           // Get the frontmatter here
//           const { meta } = await import(path.join(directoryPath, 'index.mdx'));

//           for (const key of Object.keys(meta)) {
//             node[key] = meta[key];
//           }
//         }
//       } else {
//         if (item === 'index.mdx') {
//           // Skip this file since we already got the data when checking the directory
//           continue;
//         } else {
//           // Child page
//           const { meta } = await import(itemPath);

//           for (const key of Object.keys(meta)) {
//             node[key] = meta[key];
//           }

//           if (!Object.prototype.hasOwnProperty.call(node, 'children')) {
//             node.children = [node];
//           } else {
//             node.children.push(node);
//           }
//         }
//       }
//     }
//   }

//   return node;
// }

// const result = await visitPage(
//   '/Users/timngyn/Development/github/aws-amplify/docs/src/pages/'
// );

// console.log(result);

export const directory = {
  title: 'Amplify Docs',
  description:
    'Amplify documentation - Learn how to use Amplify to develop and deploy cloud-powered mobile and web apps.',
  route: 'pages/index.tsx',
  children: [
    {
      title: 'Overview',
      description: `This is a description for the overview page.`,
      platforms: ['javascript', 'android'],
      route: 'pages/[platform]/index.tsx',
      children: [
        {
          title: `Get started`,
          description: `A getting started page`,
          platforms: ['android', 'javascript'],
          route: 'pages/[platform]/get-started/index.mdx',
          children: [
            {
              title: `Project setup`,
              description: `Project setup`,
              platforms: ['android', 'javascript'],
              route: 'pages/[platform]/get-started/project-setup/index.mdx'
            },
            {
              title: `Sample apps`,
              description: `Sample apps`,
              platforms: ['android', 'javascript'],
              route: 'pages/[platform]/get-started/sample-apps/index.mdx'
            },
            {
              title: `Tutorials`,
              description: `Tutorials`,
              platforms: ['android', 'javascript'],
              route: 'pages/[platform]/get-started/tutorials/index.mdx',
              children: [
                {
                  title: `Connect API and Database`,
                  description: `Connect API and Database`,
                  platforms: ['android', 'javascript'],
                  route:
                    'pages/[platform]/get-started/tutorials/connect-api-and-database.mdx'
                },
                {
                  title: `Deploy and Host App`,
                  description: `Deploy and Host App`,
                  platforms: ['android', 'javascript'],
                  route:
                    'pages/[platform]/get-started/tutorials/deploy-and-host-app.mdx'
                },
                {
                  title: `Setup Amplify`,
                  description: `Setup Amplify`,
                  platforms: ['android', 'javascript'],
                  route:
                    'pages/[platform]/get-started/tutorials/setup-amplify.mdx'
                },
                {
                  title: `Setup fullstack project`,
                  description: `Setup fullstack project`,
                  platforms: ['android', 'javascript'],
                  route:
                    'pages/[platform]/get-started/tutorials/setup-fullstack-project.mdx'
                },
                {
                  title: `Next Steps`,
                  description: `Next Steps`,
                  platforms: ['android', 'javascript'],
                  route: 'pages/[platform]/get-started/tutorials/next-steps.mdx'
                }
              ]
            }
          ]
        },
        {
          title: 'Build a backend',
          description: 'Build a backend',
          platforms: ['android', 'javascript'],
          route: 'pages/[platform]/build-a-backend/index.mdx',
          children: [
            {
              title: `API GraphQL`,
              description: `API GraphQL`,
              platforms: ['android', 'javascript'],
              route: 'pages/[platform]/build-a-backend/api-graphql/index.mdx'
            },
            {
              title: `API (Rest)`,
              description: `API (Rest)`,
              platforms: ['android', 'javascript']
            }
          ]
        }
      ]
    }
  ]
};
