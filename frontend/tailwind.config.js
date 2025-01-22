/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        primary: '#4EA685',
        secondary: '#57B894',
        gray2: '#efefef',
       
        facebook: '#4267B2',
        google: '#DB4437',
        twitter: '#1DA1F2',
        insta: '#E1306C',
        pink:'#F52870'
      },
      fontFamily:{
        quattrocento: ['Quattrocento', 'serif'],
        inter: ['Inter', 'serif'],
      }
    },
  },
  plugins: [],
}

