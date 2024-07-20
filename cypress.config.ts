import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    pageLoadTimeout: 20000,
    baseUrl: 'https://66756b92ff107b703e3e5159--sportsnews301.netlify.app', 
    setupNodeEvents(on, config) {
 
      
    },
    env: {
      netlifyUrl: 'https://66756b92ff107b703e3e5159--sportsnews301.netlify.app/',
      localUrl: 'http://localhost:3000'
    }
  },
});