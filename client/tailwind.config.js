const flowbite = require("flowbite-react/tailwind");
/** @type {import('tailwindcss').Config} */

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    flowbite.content(),, // Add this line for proper content path of flowbite-react
  ],
  theme: {
    extend: {},
  },
  plugins: [
    flowbite.plugin(), // Use the flowbite plugin directly
  ],
}
