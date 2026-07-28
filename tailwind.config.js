/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{ts,tsx}', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        canvas: '#F5F4ED',
        ink: '#1C1D18',
        lime: '#C8FF00',
        olive: '#70716B',
        charcoal: '#20211C',
        /* ARCH: shadcn-convention semantic tokens, reading from the HSL vars
           in globals.css. Enables bg-primary, text-muted-foreground,
           border-border, etc. — required for the /services page markup,
           which was built against this exact naming convention. */
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        card: { DEFAULT: 'hsl(var(--card))', foreground: 'hsl(var(--card-foreground))' },
        primary: { DEFAULT: 'hsl(var(--primary))', foreground: 'hsl(var(--primary-foreground))' },
        secondary: { DEFAULT: 'hsl(var(--secondary))', foreground: 'hsl(var(--secondary-foreground))' },
        muted: { DEFAULT: 'hsl(var(--muted))', foreground: 'hsl(var(--muted-foreground))' },
        border: 'hsl(var(--border))',
        ring: 'hsl(var(--ring))',
      },
      fontFamily: {
        display: ['var(--font-display)'],
        body: ['var(--font-body)'],
        serif: ['var(--font-display)'],
        sans: ['var(--font-body)'],
      },
      spacing: {
        1: '0.5rem', 2: '1rem', 3: '1.5rem', 4: '2rem',
        5: '3rem', 6: '4rem', 7: '6rem', 8: '9rem',
      },
    },
  },
  plugins: [],
};
