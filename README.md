# tidy-template
Indentation fixer for [nested] multiline JavaScript template literals

## Installation
```
npm install tidy-template
```

## Usage
**Node v6.0.0+ is required.**

```javascript
const tidy = require('tidy-template');
```

The first and last lines are removed.
```javascript
tidy`
1
`;
// '1'
```

Common indentation is removed.
```javascript
tidy`
  1
  2
`;
// '1\n2'
```

Relative indentation is preserved.
```javascript
tidy`
  1
    2
`;
// '1\n  2'
```

Relative indentation of interpolated multiline strings is preserved.
```javascript
tidy`
  0
    ${'1\n  2'}
`;
// '0\n  1\n    2'
```

The content and last line can be indented as much or as little as you like.
```javascript
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
```

Tabs can be used instead of spaces.
```javascript
tidy`
\t1
\t\t2
`;
// '1\n\t2'
```

Empty and whitespace-only lines are ignored when calculating common indentation,
but are included when removing it.
```javascript
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

1. The template literal backticks must be on separate lines from the content.
This eliminates ambiguity around indentation and trailing newlines.  

   Don't do this:
   ```javascript
   tidy`1
          2`;
   // Error
   ```

   Or this:
   ```javascript
   tidy`
     1
       2`;
   // Error
   ```
   
   Or this:
   ```javascript
   tidy`1
          2
   `;
   // Error
   ```

2. TidyTemplate must be used as a tag, without parentheses. This allows the
indentation of interpolated values to be adjusted.

   Don't do this either:
   ```javascript
   tidy(`
     1
       2
   `);
   // Error
   ```
