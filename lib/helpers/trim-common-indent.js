'use strict';

const trimCommonIndent = (string) => {
  const length = commonIndentLength(string);

  if (length === 0) {
    return string;
  }

  const indents = new RegExp(`^[ \\t]{0,${length}}`, 'gm');

  return string.replace(indents, '');
};

const commonIndentLength = (string) => {
  const indents = string.match(/^[ \t]*(?=\S)/gm);

  if (!indents) {
    return 0;
  }

  const lengths = indents.map((i) => i.length);

  return Math.min(...lengths);
};

module.exports = trimCommonIndent;
