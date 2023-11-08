import { useRouter } from 'next/router';

export function usePathWithoutHash() {
  const router = useRouter();

  // Get everything before the hashmark (#)
  const path = router.asPath.split('#')[0];

  return path;
}
