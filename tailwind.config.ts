import flowbite from 'flowbite-react/tailwind';

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js,ts,tsx}', flowbite.content()],
  theme: {
    extend: {},
  },
  plugins: [flowbite.plugin()],
};
