/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.tsx"],
  theme: {
    extend: {
      colors:{
        primary: 'transparent',
        primaryLight: '#ddd',
        primaryDark: '#000',     
        bgModal: 'rgba(228, 228, 231, 0.8)',
        card: {
          background: '#303030',
          border:'#CD48FF'
        },  
        checkmark: '#CD48FF',
        nav:{
          background: '#373737'
        },
        brand : {
          300: '#996DFF',
          500: '#8257e6'
        }
      },
      borderRadius:{
        md:'4px'
      },
      strokeWidth: {
        '6': '6px',
      }
    },
  },
  plugins: [],
}
