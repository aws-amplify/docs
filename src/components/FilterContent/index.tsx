import { useRouter } from 'next/router';

export default function FilterContent(props) {
  const router = useRouter();

  let shouldShow: boolean;
  let filterKey = '';
  if ('platform' in router.query) {
    filterKey = router.query.platform as string;
    shouldShow = filterKey === props.platform;
  } else if ('integration' in router.query) {
    filterKey = router.query.integration as string;
    shouldShow = filterKey === props.integration;
  } else {
    filterKey = router.query.framework as string;
    shouldShow = filterKey === props.framework;
  }
  if (shouldShow) return props.children;
  return <></>;
}
