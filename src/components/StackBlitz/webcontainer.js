import { WebContainer } from '@webcontainer/api';
import { files } from './files';

let webcontainerInstance;

export const getWebContainer = async () => {
  if (!webcontainerInstance) {
    webcontainerInstance = await WebContainer.boot();
    webcontainerInstance.mount(files);
  }

  return webcontainerInstance;
};
