import Link from 'next/link';
import { useRouter } from 'next/router';

type CrossLinkProps = {
  href: string;
  label: string;
  text: string;
  targetSection?: string;
};

export function CrossLink({ href, label, text, targetSection }: CrossLinkProps) {
  const router = useRouter();

  // Use Next.js Link object href to avoid injecting user input into URL strings.
  // The href prop contains [platform] placeholder — pass it as pathname
  // and let Next.js resolve it safely via the query parameter.
  const linkHref = {
    pathname: href,
    ...(router.query.platform && { query: { platform: router.query.platform } })
  };

  const handleClick = () => {
    if (targetSection && typeof window !== 'undefined') {
      sessionStorage.setItem('activeSection', targetSection);
    }
  };

  return (
    <div className="cross-link">
      <div className="cross-link__content">
        <span className="cross-link__text">{text}</span>
        <Link href={linkHref} className="cross-link__link" onClick={handleClick}>
          {label} &rarr;
        </Link>
      </div>
    </div>
  );
}
