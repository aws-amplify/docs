import { API_CATEGORIES, API_SUB_CATEGORIES } from '@/data/api-categories';

export const getApiStaticPath = (sub) => {
  const paths: any = [];

  if (sub) {
    Object.keys(API_SUB_CATEGORIES).forEach((catKey) => {
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
  } else {
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
  }
};
