/** @type {import("prettier").Config} */
const config = {
  printWidth: 100,
  tabWidth: 2,
  useTabs: false,
  semi: true,
  singleQuote: true,
  trailingComma: 'es5',
  bracketSpacing: false,
  arrowParens: 'always',
  endOfLine: 'lf',
  tailwindStylesheet: './src/app.css',
  tailwindFunctions: ['cn', 'clsx'],
  plugins: ['prettier-plugin-tailwindcss'],
};

export default config;
