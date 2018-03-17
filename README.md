# tidy-template
Indentation fixer for [nested] multiline JavaScript template literals

## Installation
```
npm install tidy-template
```

## Usage
```javascript
const tidy = require('tidy-template');

// The first and last lines are removed.
tidy`
1
`;
// '1'

// Common indentation is removed.
tidy`
  1
  2
`;
// '1\n2'

// Relative indentation is preserved.
tidy`
  1
    2
`;
// '1\n  2'

// Relative indentation of interpolated multiline strings is
// preserved.
tidy`
  0
    ${'1\n  2'}
`;
// '0\n  1\n    2'

// The content and last line can be indented as much or as
// little as you like.
        tidy`
          1
            2
        `; 
// '1\n  2'

tidy`
1
  2
`; 
// '1\n  2'

// Tabs can be used instead of spaces.
tidy`
\t1
\t\t2
`;
// '1\n\t2'

// Empty and whitespace-only lines are ignored when
// calculating common indentation, but are included when
// removing it.
tidy`

\t
\t\t1
\t\t\t2
\t\t\t\t
`;
// '\n\n1\n\t2\n\t\t'
```

## Errors
TidyTemplate throws errors to help ensure correct usage and results.

1. The template literal backticks must be on separate lines from the content. This
eliminates ambiguity around indentation and trailing newlines.  

  ```javascript
  // Don't do this.
  tidy`1
       2`;
  // Error
  
  // Or this.
  tidy`
    1
      2`;
  // Error
  
  // Or this.
  tidy`1
       2
  `;
  // Error
  ```

2. TidyTemplate must be used as a tag, without parentheses. This allows the indentation
of interpolated values to be adjusted.

  ```javascript
  // Don't do this either.
  tidy(`
    1
      2
  `);
  // Error
  ```
