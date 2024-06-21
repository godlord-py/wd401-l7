// cypress.config.ts
import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    pageLoadTimeout: 60000,
    baseUrl: 'https://6675341083621c4054373a4f--sportsnews301.netlify.app/', // Replace with your actual Netlify URL
    setupNodeEvents(on, config) {
      // implement node event listeners here
      
    },
  },
});
