import { getCustomStaticPath } from '@/utils/getCustomStaticPath';
import { Flex } from '@aws-amplify/ui-react';
import { commands } from '@/data/cli-commands.mjs';
import { Command } from '@/components/CliCommands';

export const meta = {
  title: 'Commands',
  description: 'Commands',
  platforms: [
    'android',
    'angular',
    'flutter',
    'javascript',
    'nextjs',
    'react',
    'react-native',
    'swift',
    'vue'
  ]
};

export const getStaticPaths = async () => {
  return getCustomStaticPath(meta.platforms);
};

export function getStaticProps(context) {
  const sortedCommands = commands.sort((a, b) => (a.name > b.name ? 1 : -1));

  return {
    props: {
      platform: context.params.platform,
      meta,
      sortedCommands
    }
  };
}

function CommandsPage({ sortedCommands }) {
  return (
    <>
      <Flex className="commands-list">
        {sortedCommands.map((command) => (
          <Command key={command.name} {...command} />
        ))}
      </Flex>
    </>
  );
}

export default CommandsPage;
