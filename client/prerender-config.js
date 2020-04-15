module.exports = {
  hydrateOptions() {
    const hydrateOptions = {
      addModulePreloads: true,
      removeUnusedStyles: true,
      minifyStyleElements: true,
      minifyScriptElements: true,
    };

    return hydrateOptions;
  },

  filterUrl(url) {
    const {pathname} = url;
    if (
      (pathname.includes("/lib") && pathname.includes("/sdk")) ||
      pathname.includes("/lib/api/graphql") ||
      pathname.includes("/amplify/latest/userguide")
    ) {
      return false;
    }
    return true;
  },
};
