import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    extend: {
      textColor: {
        primary: {
          DEFAULT: '#252525',
          light: '#4F4F4F',
          lighter: '#686868'
        }
      },
      borderColor: {
        primary: {
          DEFAULT: '#F9B900',
          light: '#F9B900',
          lighter: '#F9B900'
        }
      },
      backgroundColor: {
        primary: {
          DEFAULT: '#FFFFFF',
          light: '#FFFFFF',
          lighter: '#FFFFFF'
        }
      }
    }
  },
  plugins: []
}
export default config
