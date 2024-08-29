import { API_CATEGORIES } from '@/data/api-categories';
import { JS_PLATFORMS } from '@/data/platforms';

export const getApiStaticPath = () => {
  const paths: any = [];

  Object.keys(API_CATEGORIES).forEach((catKey) => {
    paths.push({
      params: {
        platform: JS_PLATFORMS,
        category: catKey
      }
    });
  });

  return {
    paths: paths,
    fallback: false
  };
};
