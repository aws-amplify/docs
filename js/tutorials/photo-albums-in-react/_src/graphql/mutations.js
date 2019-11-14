/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createAlbum = `mutation CreateAlbum($input: CreateAlbumInput!) {
  createAlbum(input: $input) {
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
export const updateAlbum = `mutation UpdateAlbum($input: UpdateAlbumInput!) {
  updateAlbum(input: $input) {
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
export const deleteAlbum = `mutation DeleteAlbum($input: DeleteAlbumInput!) {
  deleteAlbum(input: $input) {
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
export const createPhoto = `mutation CreatePhoto($input: CreatePhotoInput!) {
  createPhoto(input: $input) {
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
export const updatePhoto = `mutation UpdatePhoto($input: UpdatePhotoInput!) {
  updatePhoto(input: $input) {
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
export const deletePhoto = `mutation DeletePhoto($input: DeletePhotoInput!) {
  deletePhoto(input: $input) {
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
