import {useRouter} from "next/router";

export default function FilterContent({children}) {
  const router = useRouter();

  const {platform} = router.query;
  const filteredChildren = children.filter((el) => el.key === platform);
  return filteredChildren;
}
