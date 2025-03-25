/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
    theme: {
      extend: {
        backgroundImage: {
          'soft-pattern': `linear-gradient(135deg, #f3f4f6 25%, transparent 25%, transparent 50%, #f3f4f6 50%, #f3f4f6 75%, transparent 75%, transparent),
                           linear-gradient(45deg, #1F2937 25%, transparent 25%, transparent 75%, #1F2937 75%, #1F2937)`
        },
        backgroundSize: {
          'pattern': '50px 50px'
        },
        backgroundPosition: {
          'pattern': '0 0, 20px 20px'
        }
      },
  },
  plugins: [],
}

