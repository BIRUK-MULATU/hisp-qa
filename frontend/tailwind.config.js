/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        hispBlue: '#005B7F', // Official DHIS2 Blue
        hispGreen: '#00A65A', // Official HISP Green
        hispLight: '#F5F5F5', // Light Gray
        hispDarkText: '#2C3E50', // Dark Text
        hispActive: '#006F9B', // Lighter Blue for active states
      },
    },
  },
  plugins: [],
}