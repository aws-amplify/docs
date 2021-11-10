import * as fs from "fs-extra";

// apply patch in https://github.com/vercel/next.js/pull/27195
// and https://github.com/vercel/next.js/discussions/13804
const fix = function() {
  const indexPath = "node_modules/next/dist/client/index.js";
  let index = fs.readFileSync(indexPath).toString();
  index = index
    .split("componentDidUpdate(){this.scrollToHash();}")
    .join("componentDidUpdate(){}");
  fs.writeFileSync(indexPath, index);

  const routerPath = "node_modules/next/dist/next-server/lib/router/router.js";
  let router = fs.readFileSync(routerPath).toString();
  router = router.split("this.scrollToHash(cleanedAs);").join("");
  fs.writeFileSync(routerPath, router);
};

fix();
