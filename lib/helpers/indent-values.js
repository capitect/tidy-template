'use strict';

const indentValues = (strings, values) => {
  return values.map((value, index) => indentValue(strings[index], value));
};

const indentValue = (string, value) => {
  if (isMultilineString(value)) {
    let indentation = lastLineIndentation(string);
    return indentMultilineString(indentation, value);
  }
  return value;
};

const isMultilineString = (value) => {
  return typeof value === 'string' && value.includes('\n');
};

const lastLineIndentation = (string) => {
  const match = string.match(/\n([ \t]*)$/);
  return match ? match[1] : '';
};

const indentMultilineString = (indentation, string) => {
  return string.replace(/\n/g, `\n${indentation}`);
};

module.exports = indentValues;
