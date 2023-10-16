import { View } from '@aws-amplify/ui-react';

export const TestNav = () => {
  return (
    <View padding="xxl">
      <a href="/">Home</a>
      <ul>
        <li>
          <a href="/javascript">/javascript</a>
          <ul>
            <li>
              <a href="/javascript/get-started">Get started</a>
              <ul>
                <li><a href="/javascript/get-started/project-setup">Project setup</a></li>
                <li><a href="/javascript/get-started/sample-apps">Sample Apps</a></li>
                <li>
                  <a href="/javascript/get-started/tutorials">Tutorials</a>
                  <ul>
                    <li><a href="/javascript/get-started/tutorials/connect-api-and-database">Connect API and Database</a></li>
                    <li><a href="/javascript/get-started/tutorials/deploy-and-host-app">Deploy and Host App</a></li>
                    <li><a href="/javascript/get-started/tutorials/setup-amplify">Setup Amplify</a></li>
                    <li><a href="/javascript/get-started/tutorials/setup-fullstack-project">Setup fullstack project</a></li>
                    <li><a href="/javascript/get-started/tutorials/next-steps">Next Steps</a></li>
                  </ul>
                </li>
              </ul>
            </li>
            <li>
              <a href="/javascript/build-a-backend">Build a backend</a>
              <ul>
                <li>
                  <a href="/javascript/build-a-backend/api-graphql">API GraphQL</a>
                </li>
                <li>
                  <a href="/javascript/build-a-backend/api-rest">API Rest</a>
                </li>
              </ul>
            </li>
            <li>
              <a href="/javascript/test-page">/javascript/test-page</a>
            </li>
          </ul>
        </li>

        <li>
          <a href="/android">/android</a>
          <ul>
            <li>
              <a href="/android/get-started">Get started</a>
              <ul>
                <li><a href="/android/get-started/project-setup">Project setup</a></li>
                <li><a href="/android/get-started/sample-apps">Sample Apps</a></li>
                <li>
                  <a href="/android/get-started/tutorials">Tutorials</a>
                  <ul>
                    <li><a href="/android/get-started/tutorials/connect-api-and-database">Connect API and Database</a></li>
                    <li><a href="/android/get-started/tutorials/deploy-and-host-app">Deploy and Host App</a></li>
                    <li><a href="/android/get-started/tutorials/setup-amplify">Setup Amplify</a></li>
                    <li><a href="/android/get-started/tutorials/setup-fullstack-project">Setup fullstack project</a></li>
                    <li><a href="/android/get-started/tutorials/next-steps">Next Steps</a></li>
                  </ul>
                </li>
              </ul>
            </li>
            <li>
              <a href="/android/build-a-backend">Build a backend</a>
              <ul>
                <li>
                  <a href="/android/build-a-backend/api-graphql">API GraphQL</a>
                </li>
                <li>
                  <a href="/android/build-a-backend/api-rest">API Rest</a>
                </li>
              </ul>
            </li>
            <li>
              <a href="/android/test-page">/javascript/test-page</a>
            </li>
          </ul>
        </li>

       
      </ul>
    </View>
  );
};
