/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./layouts/**/*.html', './content/**/*.md', './content/**/*.html'],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#fff7ed',
          100: '#ffedd5',
          200: '#ffd7aa',
          300: '#ffb77a',
          400: '#ff8c3c',
          500: '#ff6601',
          600: '#f05800',
          700: '#c44600',
          800: '#9c3800',
          900: '#7c2d00',
        },
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
};
