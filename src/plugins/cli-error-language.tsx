module.exports = function(Prism) {
  // common error messages
  Prism.languages.error = {
    error: /.*/
  };

  // amplify cli output messages
  Prism.languages['amplify-cli-output'] = {
    success: /^✔|✅.*/,
    warning: /^[\u26A0\uFE0F].*/, // Unicode representation of the warning emoji
    error: /^🛑.*/
  };
};
