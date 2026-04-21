/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'spin-slow': 'spin 8s linear infinite',
        'bar1': 'bar 1.0s ease-in-out infinite',
        'bar2': 'bar 1.2s ease-in-out infinite 0.2s',
        'bar3': 'bar 0.9s ease-in-out infinite 0.1s',
        'bar4': 'bar 1.1s ease-in-out infinite 0.3s',
        'bar5': 'bar 1.3s ease-in-out infinite 0.15s',
      },
      keyframes: {
        bar: {
          '0%, 100%': { transform: 'scaleY(0.3)' },
          '50%': { transform: 'scaleY(1)' },
        },
      },
    },
  },
  plugins: [],
}
