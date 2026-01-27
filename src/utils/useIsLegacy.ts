import { useRouter } from 'next/router';

export const useIsLegacy = () => {
  const router = useRouter();
  return router.asPath.startsWith('/legacy/');
}
