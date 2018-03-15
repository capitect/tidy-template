'use strict';

const enforceUsage = (strings) => {
  if (!Array.isArray(strings)) {
    throw new Error('tidyTemplate must be used as a tag (without parentheses)');
  }
  if (!isBlockFormat(strings)) {
    throw new Error(
      'tidyTemplate template literal must start with a newline and end with a blank line'
    );
  }
};

const isBlockFormat = (strings) => {
  return startsWithNewline(strings) && endsWithNewlineAndSpaces(strings);
};

const startsWithNewline = (strings) => {
  return strings[0].match(/^\n/);
};

const endsWithNewlineAndSpaces = (strings) => {
  const lastString = strings[strings.length - 1];
  return lastString.match(/\n\s*$/);
};

module.exports = enforceUsage;
