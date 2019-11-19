import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { Card, Label } from 'semantic-ui-react';

import Photo from './Photo';

export default function PhotoDetails({ photo }) {
  const { albumId } = useParams();
  const [description, labels] = photo;

  return (
    <Card data-test="photo-card" raised>
      <Link
        data-test="photo-card-thumbnail"
        style={{ background: 'black' }}
        to={`/albums/${albumId}/photos/${photo.id}`}
      >
        <Photo photo={photo} thumbnail />
      </Link>

      <Card.Content data-test="photo-card-description">
        <Card.Meta style={{ whiteSpace: 'pre-line' }}>{description}</Card.Meta>
      </Card.Content>

      {labels.length ? (
        <Card.Content extra>
          <Card.Description>
            <Label.Group>
              {labels.map(label => (
                <Label key={label} size="tiny">
                  {label}
                </Label>
              ))}
            </Label.Group>
          </Card.Description>
        </Card.Content>
      ) : null}
    </Card>
  );
}
