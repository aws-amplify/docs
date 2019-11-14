/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const listAlbums = `query ListAlbums(
  $filter: ModelAlbumFilterInput
  $limit: Int
  $nextToken: String
) {
  listAlbums(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      name
      version
      owner
      photos {
        nextToken
      }
    }
    nextToken
  }
}
`;
export const getAlbum = `query GetAlbum($id: ID!) {
  getAlbum(id: $id) {
    id
    name
    version
    owner
    photos {
      items {
        id
        bucket
        labels
        description
        version
        owner
      }
      nextToken
    }
  }
}
`;
export const getPhoto = `query GetPhoto($id: ID!) {
  getPhoto(id: $id) {
    id
    bucket
    fullsize {
      key
      width
      height
    }
    labels
    description
    version
    album {
      id
      name
      version
      owner
      photos {
        nextToken
      }
    }
    owner
  }
}
`;
export const listPhotos = `query ListPhotos(
  $filter: ModelPhotoFilterInput
  $limit: Int
  $nextToken: String
) {
  listPhotos(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      bucket
      fullsize {
        key
        width
        height
      }
      labels
      description
      version
      album {
        id
        name
        version
        owner
      }
      owner
    }
    nextToken
  }
}
`;
