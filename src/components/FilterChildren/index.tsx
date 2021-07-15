import {useRouter} from "next/router";

export default function FilterChildren({children}) {
  const router = useRouter();

  let filterKey = "";
  if ("platform" in router.query) {
    filterKey = router.query.platform as string;
  } else if ("integration" in router.query) {
    filterKey = router.query.integration as string;
  } else if ("framework" in router.query) {
    filterKey = router.query.framework as string;
  }
  const filteredChildren = children.filter(
    (el) => el.key === filterKey || el.key === "all",
  );
  return filteredChildren;
}
