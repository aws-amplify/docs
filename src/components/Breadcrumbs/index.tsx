import Link from 'next/link';
import { Breadcrumbs } from '@aws-amplify/ui-react';
import { findDirectoryNode as findNode } from '@/utils/findDirectoryNode';

type BreadcrumbItem = {
  href?: {pathname:string, query?: { platform: string }};
  label: string;
  isDisabled?: boolean;
};

type Props = {
  route: string;
  platform: string;
};

function generateBreadcrumbs(route:string, platform:string):BreadcrumbItem[]{
  const breadcrumbs:BreadcrumbItem[] = [];

  const pieces = route.split('/').filter((str) => str);
  let urls:string[] = [];
  for(let i = 1; i <= pieces.length; i++){
    urls.push(`/${pieces.slice(0,i).join('/')}`);
  }
  urls.splice(0,1,"/");

  urls.forEach((url) => {
    const directoryEntry = findNode(url);
    breadcrumbs.push({
      href:{
        pathname: url,
        query: { platform: platform }
      },
      label: directoryEntry ? directoryEntry.title : url
    });
  });

  return breadcrumbs;
}

function BreadcrumbsComponent({ route, platform }: Props) {
  const items = generateBreadcrumbs(route, platform);
  return (
    <div className={'breadcrumb__container'}>
      <Breadcrumbs.Container>
        {items?.map(({ href, label }, i) => {
          const isCurrent = i === items.length - 1;
          return (
            <Breadcrumbs.Item key={href}>
              {href ? (
                <Link href={href} passHref>
                  <Breadcrumbs.Link isCurrent={isCurrent}>
                    {label}
                  </Breadcrumbs.Link>
                </Link>
              ) : (
                <>
                  <Breadcrumbs.Link
                    className={'breadcrumb__link'}
                    isCurrent={isCurrent}
                  >
                    {label}
                  </Breadcrumbs.Link>
                </>
              )}

              {isCurrent ? null : <Breadcrumbs.Separator />}
            </Breadcrumbs.Item>
          );
        })}
      </Breadcrumbs.Container>
    </div>
  );
}

export { BreadcrumbsComponent as Breadcrumbs }