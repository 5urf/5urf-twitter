/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        pixel: ['Press Start 2P', 'monospace'],
        mono: ['Space Mono', 'monospace'],
      },
      colors: {
        // 배경 색상
        surface: {
          primary: 'var(--bg-primary)',
          secondary: 'var(--bg-secondary)',
          tertiary: 'var(--bg-tertiary)',
        },
        // 텍스트 및 콘텐츠 색상
        content: {
          primary: 'var(--text-primary)',
          secondary: 'var(--text-secondary)',
          tertiary: 'var(--text-tertiary)',
        },
        // 테두리 색상
        outline: {
          primary: 'var(--border-primary)',
          secondary: 'var(--border-secondary)',
        },
        // 브랜드/강조 색상
        brand: {
          primary: 'var(--accent-primary)',
          secondary: 'var(--accent-secondary)',
          light: 'var(--accent-light)',
        },
        // 상태 색상
        status: {
          error: 'var(--error)',
          'error-light': 'var(--error-light)',
          success: 'var(--success)',
        },
        // 인터랙션 색상
        interaction: {
          hover: 'var(--hover-bg)',
          light: 'var(--hover-light)',
        },
        // 특수 용도
        special: {
          'button-on-accent': 'var(--button-text-on-accent)',
        },
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
};
