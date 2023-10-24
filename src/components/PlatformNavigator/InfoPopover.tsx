import { useState } from 'react';
import classNames from 'classnames';
import { Button, Link, View } from '@aws-amplify/ui-react';

export const InfoPopover = ({ platform }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <View className={classNames('info-popover')}>
      <Link onClick={() => setExpanded(!expanded)}>Info</Link>
      <View
        className={classNames('popover', {
          'popover--expanded': expanded
        })}
      >
        <View>
          You're viewing Amplify documentation for {platform}. To select a
          different framework or language, use the dropdown.
          <View className={classNames('info-popover__footer')}>
            <Button onClick={() => setExpanded(false)}>Got it</Button>
          </View>
        </View>
      </View>
    </View>
  );
};
