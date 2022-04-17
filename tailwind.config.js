module.exports = {
  mode: 'jit',
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        'discord-blue': "#404eed",
        'discord-blurple': "#5865F2",
        'discord-fuchsia': "#EB459E",
        'discord-green': "#57F287",
        'discord-yellow': "#FEE75C",
        'discord-red': "#ED4245",
      },
    },
  },
  plugins: [require('tailwind-scrollbar-hide')],
}