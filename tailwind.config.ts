import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        serif: ['var(--font-serif)', 'Georgia', 'serif'],
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
      },
      colors: {
        background:     'var(--background)',
        surface:        'var(--surface)',
        'surface-subtle': 'var(--surface-subtle)',
        border:         'var(--border)',
        'border-strong': 'var(--border-strong)',
        'text-primary':   'var(--text-primary)',
        'text-secondary': 'var(--text-secondary)',
        'text-tertiary':  'var(--text-tertiary)',
        'text-disabled':  'var(--text-disabled)',
        accent:         'var(--accent)',
        'accent-hover': 'var(--accent-hover)',
        'accent-subtle': 'var(--accent-subtle)',
        'accent-text':  'var(--accent-text)',
        gold:           'var(--gold)',
        'gold-subtle':  'var(--gold-subtle)',
        success:        'var(--success)',
        'success-subtle': 'var(--success-subtle)',
        warning:        'var(--warning)',
        'warning-subtle': 'var(--warning-subtle)',
        danger:         'var(--danger)',
        'danger-subtle': 'var(--danger-subtle)',
      },
      borderRadius: {
        sm:  '4px',
        DEFAULT: '8px',
        lg:  '12px',
        pill: '20px',
      },
      spacing: {
        '18': '72px',
      },
      maxWidth: {
        content: '880px',
      },
    },
  },
  plugins: [],
}
export default config
