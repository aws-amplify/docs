import { View } from '@aws-amplify/ui-react';

const TestNav = () => {
  return (
    <View>
      <a href="/">Home</a>
      <ul>
        <li>
          <a href="/javascript">/javascript</a>
          <ul>
            <li>
              <a href="/javascript/get-started">/javascript/get-started</a>
            </li>
          </ul>
        </li>

        <li>
          <a href="/android">/android</a>
          <ul>
            <a href="/android/get-started">/android/get-started</a>
          </ul>
        </li>
      </ul>
    </View>
  );
};

export default TestNav;
