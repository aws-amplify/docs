import { Children } from 'react';
import { AccordionItem } from './AccordionItem';
import { Accordion, View } from '@aws-amplify/ui-react';

type MultiAccordionProps = {
  children: React.ReactElement<AccordionItem>[];
};

export const MultiAccordion: React.FC<MultiAccordionProps> = ({
  children
}: MultiAccordionProps) => {
  return (
    <View className="multi-accordion">
      <Accordion.Container>
        {Children.map(children, (child, index) => {
          const name = child?.props?.name;

          return (
            <Accordion.Item value={`item-${index}`} key={`${name}-${index}`}>
              <Accordion.Trigger className="multi-accordion__item__trigger">
                {name}
                <Accordion.Icon />
              </Accordion.Trigger>
              <Accordion.Content>{child}</Accordion.Content>
            </Accordion.Item>
          );
        })}
      </Accordion.Container>
    </View>
  );
};
