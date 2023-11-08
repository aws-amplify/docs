import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

export function usePathWithoutHash() {
  const [path, setPath] = useState<string>('');
  const router = useRouter();

  useEffect(() => {
    // Get everything before the hashmark (#)
    setPath(router.asPath.split('#')[0]);
  }, [router.asPath]);

  return path;
}
