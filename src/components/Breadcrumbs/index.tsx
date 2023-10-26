import Link from 'next/link';
import { Breadcrumbs } from '@aws-amplify/ui-react';

type BreadcrumbItem = {
  href?: string;
  label: string;
  isDisabled?: boolean;
};

type Props = {
  items: BreadcrumbItem[];
};

function BreadcrumbsComponent({ items }: Props) {
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