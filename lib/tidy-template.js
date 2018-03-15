'use strict';

const enforceUsage = require('./helpers/enforce-usage');
const indentValues = require('./helpers/indent-values');
const trimCommonIndent = require('./helpers/trim-common-indent');

// Given a template literal with an interpolated multiline string MLS, each line
// in MLS but the first will be prepended with the same indentation that
// precedes the interpolation.
const tidyTemplate = (strings, ...values) => {
  enforceUsage(strings);

  const indentedValues = indentValues(strings, values);

  let mergedString = merge(strings, indentedValues);
  mergedString = removeExtraLines(mergedString);

  return trimCommonIndent(mergedString);
};

const merge = (strings, values) => {
  let string = strings[0];

  values.forEach((value, index) => {
    string += values[index] + strings[index + 1];
  });

  return string;
};

const removeExtraLines = (string) => {
  return string.replace(/^\n/, '').replace(/\n[ \t]*$/, '');
};

module.exports = tidyTemplate;
