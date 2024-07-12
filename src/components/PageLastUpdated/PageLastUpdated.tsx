import { Text, View } from '@aws-amplify/ui-react';
import { PageNode } from '@/directory/directory';

type PageLastUpdatedProps = {
  directoryData: PageNode;
};

export function PageLastUpdated({ directoryData }: PageLastUpdatedProps) {
  if (directoryData) {
    const lastUpdated = directoryData['lastUpdated'];

    if (!lastUpdated) {
      return <></>;
    }

    const date = toReadableDate(lastUpdated);

    return (
      <View className="page-last-updated">
        <View className="page-last-updated__inner">
          <Text fontSize="14px">Page updated {date}</Text>{' '}
        </View>
      </View>
    );
  }

  return <></>;
}

function toReadableDate(date) {
  const dateOptions: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  };

  return new Date(date).toLocaleDateString('en-US', dateOptions);
}
