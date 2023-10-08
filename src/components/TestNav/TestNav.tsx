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
              <a href="/javascript/test-page">/javascript/test-page</a>
            </li>
          </ul>
        </li>

        <li>
          <a href="/android">/android</a>
          <ul>
            <a href="/android/test-page">/android/test-page</a>
          </ul>
        </li>
      </ul>
    </View>
  );
};
