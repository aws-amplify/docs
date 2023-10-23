import generateBreadCrumbItems, { Breadcrumb } from './generateBreadCrumbItems';

type Page = {
  route: string;
  title: string;
  items?: Page[];
};

type subCategory =
  | {
      label: string;
    }
  | null
  | undefined;

const generateCategories = (
  removeNotRequiredUrls: { label: string }[],
  subCategoryItems: Page[] | undefined,
  nCategoryBreadcrumbs: Breadcrumb[]
): Breadcrumb[] => {
  const subCategory: subCategory =
    removeNotRequiredUrls.length > 0 ? removeNotRequiredUrls?.shift() : null;

  if (subCategoryItems === undefined && removeNotRequiredUrls.length === 0) {
    return nCategoryBreadcrumbs;
  } else {
    const currentCategory = subCategoryItems?.filter((page) =>
      page.route.includes(subCategory?.label as string) ? page.title : null
    )[0];
    const categoryTitle = currentCategory?.title;
    categoryTitle
      ? nCategoryBreadcrumbs.push({
          href: '',
          label: categoryTitle
        })
      : null;

    removeNotRequiredUrls =
      removeNotRequiredUrls.length > 0 ? removeNotRequiredUrls?.slice(1) : [];
    removeNotRequiredUrls.length > 0
      ? generateCategories(
          removeNotRequiredUrls,
          currentCategory?.items,
          nCategoryBreadcrumbs
        )
      : null;
  }
  return nCategoryBreadcrumbs;
};

export default generateCategories;
