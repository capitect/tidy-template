'use strict';

describe('tidyTemplate', () => {
  const tidyTemplate = require('../lib/tidy-template');

  describe('function', () => {
    describe('usage', () => {
      describe('parentheses', () => {
        describe('without', () => {
          const tryFunc = () => {
            tidyTemplate`
              hello
              world
            `;
          };

          it('should not throw an error', () => {
            expect(tryFunc).not.toThrow();
          });
        });

        describe('with', () => {
          const tryFunc = () => {
            tidyTemplate(`
              hello
              world
            `);
          };

          it('should throw an error', () => {
            expect(tryFunc).toThrow();
          });
        });
      });

      describe('template literal format', () => {
        describe('block', () => {
          const tryFunc = () => {
            tidyTemplate`
              hello
              world
            `;
          };

          it('should not throw an error', () => {
            expect(tryFunc).not.toThrow();
          });
        });

        describe('inline block', () => {
          const tryFunc = () => {
            tidyTemplate`hello
                            world`;
          };

          it('should throw an error', () => {
            expect(tryFunc).toThrow();
          });
        });

        describe('block start, inline block end', () => {
          const tryFunc = () => {
            tidyTemplate`
              hello
              world`;
          };

          it('should throw an error', () => {
            expect(tryFunc).toThrow();
          });
        });

        describe('inline block start, block end', () => {
          const tryFunc = () => {
            tidyTemplate`hello
                            world
            `;
          };

          it('should throw an error', () => {
            expect(tryFunc).toThrow();
          });
        });
      });
    });

    describe('behavior', () => {
      it('should remove common indentation and the first leading and trailing lines', () => {
        expect(
          tidyTemplate`
            hello
            world
          `
        ).toBe('hello\nworld');
      });

      it('should keep relative indentation', () => {
        expect(
          tidyTemplate`
            hello
              world
          `
        ).toBe('hello\n  world');
      });

      it('should allow the first line to be indented further than other lines', () => {
        expect(
          tidyTemplate`
              hello
            world
          `
        ).toBe('  hello\nworld');
      });

      it('should keep leading lines except the first', () => {
        expect(
          tidyTemplate`


            hello
            world
          `
        ).toBe('\n\nhello\nworld');
      });

      it('should keep trailing lines except the last', () => {
        expect(
          tidyTemplate`
            hello
            world


          `
        ).toBe('hello\nworld\n\n');
      });

      it('should ignore whitespace-only lines when determining the common indentation', () => {
        expect(
          tidyTemplate`
                hello
                world
            \t
          `
        ).toBe('hello\nworld\n');
      });

      it('should trim whitespace-only lines that are shorter than the common indentation', () => {
        expect(
          tidyTemplate`
                hello
                world
            \t
          `
        ).toBe('hello\nworld\n');
      });

      it('should trim whitespace-only lines that are longer than the common indentation', () => {
        expect(
          tidyTemplate`
            hello
            world
              \t
          `
        ).toBe('hello\nworld\n  \t');
      });

      it('should keep relative indentation of interpolated multiline strings', () => {
        const inner = tidyTemplate`
            3
              4
                5
          \t
        `;

        expect(inner).toBe('3\n  4\n    5\n');

        const outer = tidyTemplate`
            \t
          1
            2
              ${inner}
        `;

        expect(outer).toBe('  \t\n1\n  2\n    3\n      4\n        5\n    ');
      });

      it('should work with tab indentation', () => {
        const inner = tidyTemplate`
\t\t\t\t\t\t3
\t\t\t\t\t\t\t4
\t\t\t\t\t\t\t\t5
\t\t\t\t\t
\t\t\t\t`;

        expect(inner).toBe('3\n\t4\n\t\t5\n');

        const outer = tidyTemplate`
\t\t\t\t\t\t\t
\t\t\t\t\t1
\t\t\t\t\t\t2
\t\t\t\t\t\t\t${inner}
\t\t\t\t`;

        expect(outer).toBe('\t\t\n1\n\t2\n\t\t3\n\t\t\t4\n\t\t\t\t5\n\t\t');
      });
    });
  });
});
