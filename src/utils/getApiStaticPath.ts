import { REFERENCE_IMPORTS } from '@/data/api-categories.mjs';
import { JS_PLATFORMS } from '@/data/platforms';

export const getApiStaticPath = () => {
  const paths: any = [];
  Object.keys(REFERENCE_IMPORTS).forEach((importKey: string) => {
    REFERENCE_IMPORTS[importKey].forEach((importName: string[]) => {
      JS_PLATFORMS.forEach((platKey) => {
        paths.push({
          params: {
            platform: platKey,
            importName: importName
          }
        });
      });
    });
  });

  return {
    paths: paths,
    fallback: false
  };
};
