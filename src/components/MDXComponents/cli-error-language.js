module.exports = function (Prism) {
  // common error messages
  Prism.languages.error = {
    error: /.*/
  };

  /*
  Example success: patterns will match lines that start with any number of spaces, followed by one or more of the symbols '✔', '✔️', '✅', '✓', or '☑️' (ignoring case), followed by any other characters.
  */

  // amplify cli output messages
  Prism.languages['amplify-cli-output'] = {
    success:
      /(^\s*(\u2714\uFE0F?|\u2705|\u2713|\u2611\uFE0F|\u1F7E2|\u1F7E9|\u1F535)+).*/gim, // Unicode representation of the success emojis
    warning: /(^\s*(\u26A0\uFE0F|\u2757|\u2755|\u26A1|\u1F4A5)+).*/gim, // Unicode representation of the warning emojis
    error: /(^\s*(\u1F6D1|\u26D4|\u1F6AB|\u274C|\u2B55)+).*/gim // Unicode representation of the error emojis
  };
};
