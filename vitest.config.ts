import { defineConfig,configDefaults } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['src/__tests__/setup.ts'],
    coverage: {
      provider: 'v8',
      reportsDirectory: 'coverage',
      reporter: ['text', 'json', 'html'],
      include:[
        ...configDefaults.include,
        '**/src/**',
      ],
      exclude:[
          ...configDefaults.exclude,
          '**/*.config.js',
      ]
    },
  },
});
