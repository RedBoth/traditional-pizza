module.exports = {
  content: [
    "./src/**/*.{html,js,ts,jsx,tsx,astro}",
  ],
  theme: {
    extend: {
      colors: {
        background: 'rgb(var(--background) / <alpha-value>)',
        primary: 'rgb(var(--primary) / <alpha-value>)',
        secondary: 'rgb(var(--secondary) / <alpha-value>)',
        accent: 'rgb(var(--accent) / <alpha-value>)',
        text: 'rgb(var(--text) / <alpha-value>)',
      },
    },
  },
  plugins: [],
}