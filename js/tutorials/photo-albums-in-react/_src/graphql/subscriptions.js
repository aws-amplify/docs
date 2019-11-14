/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateAlbum = `subscription OnCreateAlbum($owner: String!) {
  onCreateAlbum(owner: $owner) {
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
export const onUpdateAlbum = `subscription OnUpdateAlbum($owner: String!) {
  onUpdateAlbum(owner: $owner) {
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
export const onDeleteAlbum = `subscription OnDeleteAlbum($owner: String!) {
  onDeleteAlbum(owner: $owner) {
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
export const onCreatePhoto = `subscription OnCreatePhoto($owner: String!) {
  onCreatePhoto(owner: $owner) {
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
export const onUpdatePhoto = `subscription OnUpdatePhoto($owner: String!) {
  onUpdatePhoto(owner: $owner) {
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
export const onDeletePhoto = `subscription OnDeletePhoto($owner: String!) {
  onDeletePhoto(owner: $owner) {
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
