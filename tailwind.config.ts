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
        sans:  ['var(--font-sans)', 'system-ui', 'sans-serif'],
        mono:  ['var(--font-mono)', 'ui-monospace', 'monospace'],
      },
      colors: {
        /* ── New v2 tokens ── */
        'bg-base':      'var(--bg-base)',
        'bg-surface':   'var(--bg-surface)',
        'bg-subtle':    'var(--bg-subtle)',
        'bg-muted':     'var(--bg-muted)',

        'border-light':  'var(--border-light)',
        'border-medium': 'var(--border-medium)',
        'border-strong': 'var(--border-strong)',

        'accent-light':  'var(--accent-light)',
        'accent-border': 'var(--accent-border)',

        'gold-light':    'var(--gold-light)',
        'gold-border':   'var(--gold-border)',

        'success-bg':     'var(--success-bg)',
        'success-border': 'var(--success-border)',
        'warning-bg':     'var(--warning-bg)',
        'warning-border': 'var(--warning-border)',
        'danger-bg':      'var(--danger-bg)',
        'danger-border':  'var(--danger-border)',

        /* ── Shell colors ── */
        'navy-deep':    'var(--navy-deep)',
        'navy-mid':     'var(--navy-mid)',
        'navy-light':   'var(--navy-light)',
        pink:           'var(--pink)',
        'pink-glow':    'var(--pink-glow)',
        'pink-subtle':  'var(--pink-subtle)',
        'pink-border':  'var(--pink-border)',

        /* ── Backward-compat aliases ── */
        background:       'var(--background)',
        surface:          'var(--surface)',
        'surface-subtle': 'var(--surface-subtle)',
        border:           'var(--border)',

        'text-primary':   'var(--text-primary)',
        'text-secondary': 'var(--text-secondary)',
        'text-tertiary':  'var(--text-tertiary)',
        'text-disabled':  'var(--text-disabled)',

        accent:           'var(--accent)',
        'accent-hover':   'var(--accent-hover)',
        'accent-subtle':  'var(--accent-subtle)',
        'accent-text':    'var(--accent-text)',

        gold:             'var(--gold)',
        'gold-subtle':    'var(--gold-subtle)',

        success:          'var(--success)',
        'success-subtle': 'var(--success-subtle)',
        warning:          'var(--warning)',
        'warning-subtle': 'var(--warning-subtle)',
        danger:           'var(--danger)',
        'danger-subtle':  'var(--danger-subtle)',
      },
      borderRadius: {
        sm:      '4px',
        DEFAULT: '8px',
        lg:      '12px',
        xl:      '16px',
        pill:    '999px',
      },
      boxShadow: {
        focus: 'var(--shadow-focus)',
        card:  'var(--shadow-card)',
        modal: 'var(--shadow-modal)',
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
