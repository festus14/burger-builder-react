const truncateStringToLength = (string, maxLength) => {
  return string.slice(0, maxLength) + ' ...';
};

module.exports = {
  truncateStringToLength
};
