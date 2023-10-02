import Link from 'next/link';
import { Breadcrumbs, useTheme } from '@aws-amplify/ui-react';
import styles from './Breadcrumbs.module.scss';

type BreadcrumbItem = {
  href?: string;
  label: string;
  isDisabled?: boolean;
};

type Props = {
  items: BreadcrumbItem[];
};

export default function BreadcrumbsComponent({ items }: Props) {
  return (
    <div className={styles['breadcrumb-container']}>
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
                    className={styles['breadcrumb-link']}
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
