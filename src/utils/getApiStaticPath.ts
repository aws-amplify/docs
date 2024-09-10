import { API_CATEGORIES, API_SUB_CATEGORIES } from '../data/api-categories.mjs';
import { JS_PLATFORMS } from '@/data/platforms';

type StaticPathType = {
  params: {
    platform: string;
    category: string;
  };
};

type ApiStaticPathType = {
  paths: StaticPathType[];
  fallback: boolean;
};

export const getApiStaticPath = (isSubcategory: boolean): ApiStaticPathType => {
  const paths: any = [];
  const categories = isSubcategory ? API_SUB_CATEGORIES : API_CATEGORIES;

  Object.keys(categories).forEach((catKey) => {
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
};
