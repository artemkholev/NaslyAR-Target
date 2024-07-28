import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
      },
      backgroundImage: {
        'gradient-bg': 'linear-gradient(90deg, #7BD5F5, #787FF6, #50c1e4, #6ecaff)',
      },
      animation: {
        'bg-gradient': 'bg-gradient 8s ease infinite',
      },
      keyframes: {
        'bg-gradient': {
          '0%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
          '100%': { backgroundPosition: '0% 50%' },
        },
      },
    },
  },
  plugins: [],
};
export default config;
