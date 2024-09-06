import { API_CATEGORIES, API_SUB_CATEGORIES } from '@/data/api-categories';
import { JS_PLATFORMS } from '@/data/platforms';

export const getApiStaticPath = (sub) => {
  const paths: any = [];

  if (sub) {
    Object.keys(API_SUB_CATEGORIES).forEach((catKey) => {
      JS_PLATFORMS.forEach((platKey) => {
        paths.push({
          params: {
            platform: platKey,
            category: catKey
          }
        });
      });
    });

    return {
      paths: paths,
      fallback: false
    };
  } else {
    Object.keys(API_CATEGORIES).forEach((catKey) => {
      JS_PLATFORMS.forEach((platKey) => {
        paths.push({
          params: {
            platform: platKey,
            category: catKey
          }
        });
      });
    });

    return {
      paths: paths,
      fallback: false
    };
  }
};
