import { API_CATEGORIES } from '@/data/api-categories';

export const getApiStaticPath = () => {
  const paths: any = [];

  Object.keys(API_CATEGORIES).forEach((catKey) => {
    paths.push({
      params: {
        platform: 'javascript',
        category: catKey
      }
    });
  });

  return {
    paths: paths,
    fallback: false
  };
};
