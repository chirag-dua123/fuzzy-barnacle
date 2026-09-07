/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        hydro: {
          950: '#060B13',
          900: '#0A1220',
          850: '#0F1A2E',
          800: '#14233D',
          700: '#1E355C',
          600: '#2A4A80',
          500: '#3B68B2',
          400: '#5C8DE0',
          300: '#8FB4F3',
          100: '#DBE8FE',
          50: '#F0F5FF',
        },
        radar: {
          cyan: '#00F0FF',
          glow: '#00F0FF33',
          emerald: '#10B981',
          amber: '#F59E0B',
          danger: '#EF4444',
          purple: '#8B5CF6'
        }
      },
      fontFamily: {
        mono: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'Monaco', 'Consolas', 'Liberation Mono', 'Courier New', 'monospace'],
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'radar-sweep': 'radarSweep 4s linear infinite',
        'ping-slow': 'ping 2.5s cubic-bezier(0, 0, 0.2, 1) infinite',
      },
      keyframes: {
        radarSweep: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        }
      }
    },
  },
  plugins: [],
}
