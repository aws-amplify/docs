import { useEffect, useCallback } from 'react';
import { Badge, View, Flex, Grid, Card, Button } from '@aws-amplify/ui-react';

import { ApiModalBreadcrumbs } from './ApiModalBreadcrumbs';
import { IconX } from '../../Icons';
import { ParameterType } from './ParameterType';
import { ApiComment } from '../ApiComment';
import { LinkDataType, TypeLinkInterface } from './TypeLink';
import references from '@/directory/apiReferences.json';

interface ApiModalInterface {
  breadCrumbs: LinkDataType[];
  clearBC: () => void;
  close: () => void;
  data: any;
  modalRef: React.RefObject<HTMLDialogElement>;
  showModal?: boolean;
}

export const ApiModal = ({
  breadCrumbs,
  clearBC,
  close,
  data,
  modalRef,
  showModal = false
}: ApiModalInterface) => {
  if (data.type === 'reference') {
    data = references[data.target];
  }
  const description = data?.comment?.summary;

  const closeModal = useCallback(() => {
    clearBC();
    close();
  }, [clearBC, close]);

  const handleEscape = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        closeModal();
      }
    },
    [closeModal]
  );

  // Use esc key to close modal
  useEffect(() => {
    const modal = modalRef.current;
    if (showModal && modal) {
      window.addEventListener('keyup', handleEscape);

      return () => {
        window.removeEventListener('keyup', handleEscape);
      };
    }
  }, [showModal, handleEscape, modalRef]);

  let name = data.name;
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

  const breadcrumbItems = breadCrumbs.length
    ? breadCrumbs.reduce((acc, breadcrumb, index) => {
        const bcArray = breadCrumbs.slice(0, index + 1);
        acc.push({ linkData: breadcrumb, breadCrumbs: bcArray });
        return acc;
      }, [] as TypeLinkInterface[])
    : [];

  return (
    <View
      className={`api-modal-container${showModal ? ' api-modal-container--open' : ''}`}
    >
      <View className="api-modal-backdrop" onClick={closeModal}></View>
      <Card
        as="dialog"
        aria-label={`${name} API Reference`}
        className="api-modal"
        aria-modal="true"
        ref={modalRef}
        tabIndex={-1}
      >
        <Flex className="api-model__header">
          <ApiModalBreadcrumbs items={breadcrumbItems} />
          <Button
            aria-label={`Close ${name} API Reference modal`}
            onClick={closeModal}
            size="small"
            variation="link"
            className="api-modal__close"
          >
            <IconX />
          </Button>
        </Flex>

        <Grid as="dl" className="api-modal__content">
          <dt>Name:</dt>
          <Flex as="dd" className="api-modal__content__name">
            <Badge size="small">
              {data.type?.type ? data.type.type : 'interface'}{' '}
            </Badge>
            <span className="api-modal__api-name">{name}</span>
          </Flex>
          <dt>Value:</dt>
          {/** This dd is not scrollable if the value is only a reference, because
           * then it is a single link to an item (avoids having to tab again). It is
           * scrollable for others because the code might overflow the container on smaller
           * viewports.
           */}
          <dd
            className="api-modal__api-value"
            tabIndex={data.type?.type === 'reference' ? -1 : 0}
          >
            <View as="code" className="parameter">
              <ParameterType typeData={data.type || data} />
            </View>
          </dd>
          {description ? (
            <>
              <dt>Description:</dt>
              <dd>
                <ApiComment apiComment={description} />
              </dd>
            </>
          ) : null}
        </Grid>
      </Card>
    </View>
  );
};
