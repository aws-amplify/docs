import {
  View,
  Flex,
  Heading,
  Card,
  Divider,
  Button
} from '@aws-amplify/ui-react';
import { IconX } from '../../Icons';
import { ParameterType } from './ParameterType';
import { ApiComment } from '../ApiComment';
import { TypeLink } from './TypeLink';

export const ApiModal = ({
  data,
  showModal,
  close,
  breadCrumbs,
  clearBC,
  references
}) => {
  let name = data.name;
  if (data.type === 'reference') {
    data = references[data.target];
  }
  const description = data?.comment?.summary;

  const closeModal = () => {
    clearBC();
    close();
  };

  let typeParameters = data.typeArguments;
  if (data?.typeObject?.type == 'alias' && data.typeObject.typeParameters) {
    typeParameters = data.typeObject.typeParameters;
  } else if (
    data?.typeObject?.type == 'interface' &&
    data.typeObject.typeParameters &&
    data.typeObject.name == data.name
  ) {
    typeParameters = data.typeObject.typeParameters;
  }
  const params = typeParameters?.map((p) => {
    return p.name;
  });
  if (params && params.length) {
    name += `<${params.join(',')}>`;
  }
  const typeData = data.typeObject || data.value;
  // look for objects or interfaces to render additional data
  const displayProperties = {};
  function recursivelyParseType(typeData, displayProperties) {
    if (!typeData) return;
    if (typeData.type === 'alias') {
      recursivelyParseType(typeData.value, displayProperties);
    } else if (typeData.type === 'intersection') {
      for (const key in typeData.types) {
        recursivelyParseType(typeData.types[key], displayProperties);
      }
    } else if (typeData.type === 'union') {
      for (const key in typeData.elements) {
        recursivelyParseType(typeData.elements[key], displayProperties);
      }
    } else if (typeData.type === 'object' || typeData.type === 'interface') {
      Object.keys(typeData.properties).forEach((key) => {
        if (typeData.properties[key].description) {
          // only add displayProperties that have a description to be displayed
          displayProperties[key] = typeData.properties[key];
        }
      });
    }
  }
  recursivelyParseType(typeData, displayProperties);

  return (
    <View display={showModal ? 'flex' : 'none'} className="api-modal-container">
      <View>
        <Card
          className="api-modal"
          borderRadius="medium"
          variation="outlined"
          textAlign="center"
          position="relative"
        >
          <View padding="xs" fontSize="large">
            <Flex className={'bread-crumbs'}>
              {breadCrumbs.length &&
                breadCrumbs.reduce((acc, bc, idx) => {
                  const bcArray = breadCrumbs.slice(0, idx + 1);
                  const next = <TypeLink linkData={bc} breadCrumbs={bcArray} />;
                  if (idx > 0) {
                    acc.push(' > ');
                  }
                  acc.push(next);
                  return acc;
                }, [])}
            </Flex>
            <Button
              onClick={closeModal}
              size="small"
              variation="link"
              className={'close-button'}
            >
              <IconX />
            </Button>
            <Flex justifyContent="space-between">
              <Heading padding="large" level={2}>
                {name}
              </Heading>
            </Flex>
            <Divider padding="xs" />
            <Flex justifyContent={'center'}>
              <View as={'code'} fontSize="large" className={'parameter'}>
                <ParameterType
                  typeData={data.type || data}
                  references={references}
                />
              </View>
            </Flex>
            <View className={'description-wrapper'}>
              <View className={'description'}>
                {description && (
                  <>
                    <ApiComment apiComment={description} />
                  </>
                )}
              </View>
            </View>
          </View>
        </Card>
      </View>
    </View>
  );
};
