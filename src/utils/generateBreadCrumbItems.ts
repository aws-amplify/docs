import directory from '../directory/directory.mjs';
import generateCategories from './generatedCategories';

export type BreadcrumbItem = {
  label: string;
  href?: string;
  isCurrent?: boolean;
};

export interface Breadcrumb {
  href: string;
  label: string;
}
const getBreadcrumbsItems = (breadCrumbs: Breadcrumb[]): BreadcrumbItem[] => {
  const removeUnusedUrls = breadCrumbs.filter(
    (breadcrumbs) =>
      breadcrumbs.label !== 'q' &&
      breadcrumbs.label !== 'platform' &&
      breadcrumbs.label !== 'integration' &&
      breadcrumbs.label !== '#'
  );

  //Home
  const generatedBreadItems: BreadcrumbItem[] = [breadCrumbs[0]];
  const secondNavCategory = breadCrumbs[1]?.label;
  const libraries: Record<string, string> = {
    'react-native': 'React Native',
    js: 'JavaScript',
    react: 'React',
    angular: 'Angular',
    android: 'Android',
    ios: 'Swift',
    flutter: 'Flutter',
    next: 'Next.js',
    vue: 'Vue'
  };
  const librariesFilter = Object.keys(libraries);
  const libraryLabel = breadCrumbs.pop()?.label;
  //js team is using this format for library versions
  const libraryVersions = {
    ios: { previous: 'v1', latest: 'v2 (latest)' },
    android: { previous: 'v1', latest: 'v2 (latest)' },
    flutter: { previous: 'v0', latest: 'v1 (latest)' },
    js: { latest: 'v5', previous: 'v6 (preview)' }
  };
  const libraryVersion = secondNavCategory === 'lib' ? 'latest' : 'previous';

  Object.keys(libraryVersions).includes(libraryLabel as string) &&
  libraryVersions[libraryLabel as string] !== null &&
  (secondNavCategory === 'lib' || secondNavCategory === 'lib-v1')
    ? generatedBreadItems.push({
        label: libraryVersions[libraryLabel as string][libraryVersion]
      })
    : null;

  const secondaryNavCategoryItems = directory[secondNavCategory]?.items;

  //library doesn't have an url

  if (librariesFilter?.includes(libraryLabel as string)) {
    generatedBreadItems.push({
      label: libraries[libraryLabel as keyof typeof libraries]
    });
  }
  generatedBreadItems.push({
    href: directory[secondNavCategory]?.productRoot?.route,
    label: directory[secondNavCategory]?.productRoot?.title
  });

  //start

  const category = removeUnusedUrls[2]?.label;

  const nCategoryBreadcrumbs: Breadcrumb[] = [];

  secondaryNavCategoryItems[category]?.title
    ? generatedBreadItems.push({
        label: secondaryNavCategoryItems[category]?.title
      })
    : null;

  const subCategoryItems = directory[secondNavCategory]?.items[category]?.items;

  generatedBreadItems.push(
    ...generateCategories(
      removeUnusedUrls.slice(3),
      subCategoryItems,
      nCategoryBreadcrumbs
    )
  );
  return generatedBreadItems;
};

export default getBreadcrumbsItems;
