// cypress.config.ts
import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    pageLoadTimeout: 20000,
    baseUrl: 'https://66756b92ff107b703e3e5159--sportsnews301.netlify.app/', // Replace with your actual Netlify URL
    setupNodeEvents(on, config) {
      // implement node event listeners here
      
    },
  },
});
