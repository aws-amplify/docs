module.exports = function slug(str) {
  let slugged = '';
  for (const c of str) {
    if ((c >= 'A' && c <= 'Z') || (c >= 'a' && c <= 'z')) {
      slugged += c.toLowerCase();
    } else if (c >= '0' && c <= '9') {
      slugged += c;
    } else if (c === ' ' || c === '-') {
      slugged += '-';
    }
  }
  return slugged;
};
