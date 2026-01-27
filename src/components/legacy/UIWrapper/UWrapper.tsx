import {
  createTheme,
  defaultDarkModeOverride,
  ThemeProvider,
  View
} from '@aws-amplify/ui-react';
import * as React from 'react';
import { LayoutContext } from '../../Layout';

const theme = createTheme({
  name: 'default-amplify-ui-theme',
  overrides: [defaultDarkModeOverride]
});

export const UIWrapper = ({ children }: React.PropsWithChildren) => {
  const { colorMode } = React.useContext(LayoutContext);

  return (
    <ThemeProvider theme={theme} colorMode={colorMode}>
      <View
        borderRadius="small"
        padding="large"
        boxShadow={`0 0 0 2px ${theme.tokens.colors.neutral[20]}`}
      >
        {children}
      </View>
    </ThemeProvider>
  );
};
