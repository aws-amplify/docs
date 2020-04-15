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
    if (pathname.includes("amplify/latest")) {
      return false;
    }
    return true;
  },
};
