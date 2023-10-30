import { useState, useEffect } from 'react';
import classNames from 'classnames';
import { Button, View } from '@aws-amplify/ui-react';
import { parseLocalStorage } from '@/utils/parseLocalStorage';

export const InfoPopover = ({ platform }) => {
  const [expanded, setExpanded] = useState(false);

  useEffect(()=>{
    let returnVisitor = parseLocalStorage('returnVisitor', false);
    if(!returnVisitor){
      setExpanded(true);
      if(typeof localStorage !== 'undefined'){
        localStorage.setItem('returnVisitor', 'true');
      }
    }
  },[]);

  return (
    <View className={classNames('info-popover')}>
      <Button onClick={() => setExpanded(!expanded)} fontWeight={"bold"} variation='link'>Info</Button>
      <View
        className={classNames('popover', {
          'popover--expanded': expanded
        })}
        left={{ base: '0', small: '25%' }}
      >
        <View>
          You're viewing Amplify documentation for {platform}. To select a
          different framework or language, use the dropdown.
          <View className={classNames('info-popover__footer')}>
            <Button size="small" onClick={() => setExpanded(false)}>Got it</Button>
          </View>
        </View>
      </View>
    </View>
  );
};
