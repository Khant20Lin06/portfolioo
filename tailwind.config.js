/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // Editor surfaces
        bg: '#080c10', // editor bg
        bg2: '#0d1117', // cards, top bar
        bg3: '#111820', // sidebar, skill chips
        line: '#1e2d3d', // borders
        statusbar: '#1d2d3e',
        // GitHub Dark syntax theme
        syn: {
          keyword: '#ff7b72', // const, import, export, async, return
          func: '#58a6ff', // function names
          string: '#a5d6ff', // strings
          number: '#f0883e', // numbers
          type: '#e3b341', // types
          comment: '#3a5068', // comments
          punc: '#58697a', // punctuation/brackets
          ident: '#c9d1d9', // default identifiers
        },
        // Accents
        accent: {
          blue: '#58a6ff',
          green: '#3fb950',
          red: '#ff5f57',
          yellow: '#ffbd2e',
          greenDot: '#28ca40',
          orange: '#f0883e',
          purple: '#bc8cff',
        },
        muted: '#586675',
      },
      fontFamily: {
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      fontSize: {
        code: ['12.5px', '20px'],
        label: ['11px', '16px'],
        micro: ['10px', '14px'],
      },
      keyframes: {
        blink: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0' },
        },
      },
      animation: {
        cursor: 'blink 1.1s step-end infinite',
      },
    },
  },
  plugins: [],
}
