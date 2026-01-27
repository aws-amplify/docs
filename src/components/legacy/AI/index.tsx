import { Avatar } from '@aws-amplify/ui-react';
import { ConversationMessage } from '@aws-amplify/ui-react-ai';
import { AmplifyLogo } from '@/components/GlobalNav/components/icons';

export const UserAvatar = () => {
  return <Avatar src="/images/user.jpg" />;
};

export const AssistantAvatar = () => {
  return (
    <Avatar backgroundColor={'primary.20'}>
      <AmplifyLogo />
    </Avatar>
  );
};

export const MESSAGES: ConversationMessage[] = [
  {
    conversationId: 'foobar',
    id: '1',
    content: [{ text: 'Hello' }],
    role: 'user' as const,
    createdAt: new Date(2023, 4, 21, 15, 23).toISOString()
  },
  {
    conversationId: 'foobar',
    id: '2',
    content: [
      {
        text: 'Hello! I am your virtual assistant how may I help you?'
      }
    ],
    role: 'assistant' as const,
    createdAt: new Date(2023, 4, 21, 15, 24).toISOString()
  }
];

export const MESSAGES_RESPONSE_COMPONENTS: ConversationMessage[] = [
  {
    conversationId: 'foobar',
    id: '1',
    content: [{ text: 'Whats the weather in San Jose?' }],
    role: 'user' as const,
    createdAt: new Date(2023, 4, 21, 15, 23).toISOString()
  },
  {
    conversationId: 'foobar',
    id: '2',
    content: [
      {
        text: 'Let me get the weather for San Jose for you.'
      },
      {
        toolUse: {
          name: 'AMPLIFY_UI_WeatherCard',
          input: { city: 'San Jose' },
          toolUseId: '1234'
        }
      }
    ],
    role: 'assistant' as const,
    createdAt: new Date(2023, 4, 21, 15, 24).toISOString()
  }
];
