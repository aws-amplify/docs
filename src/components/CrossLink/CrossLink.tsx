import Link from 'next/link';
import { useRouter } from 'next/router';
import { Platform } from '@/data/platforms';

type CrossLinkProps = {
  href: string;
  label: string;
  text: string;
  targetSection?: string;
};

export function CrossLink({ href, label, text, targetSection }: CrossLinkProps) {
  const router = useRouter();
  const currentPlatform = (router.query.platform as Platform) || 'react';
  const resolvedHref = href.replace('[platform]', currentPlatform);

  const handleClick = () => {
    if (targetSection) {
      sessionStorage.setItem('activeSection', targetSection);
    }
  };

  return (
    <div className="cross-link">
      <div className="cross-link__content">
        <span className="cross-link__text">{text}</span>
        <Link href={resolvedHref} className="cross-link__link" onClick={handleClick}>
          {label} &rarr;
        </Link>
      </div>
    </div>
  );
}
