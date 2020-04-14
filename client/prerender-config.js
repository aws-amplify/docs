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
};
