import { useRouter } from 'next/router';

export function usePathWithoutHash() {
  const router = useRouter();

  // Get everything before the hashmark (#)
  return router.asPath.split('#')[0];
}
