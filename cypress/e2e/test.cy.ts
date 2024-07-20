import { verify } from "crypto";

describe('Sportnewsapp', () => {
    it('should load the homepage', () => {
      cy.visit('/');
      cy.contains('Live Sports'); 
    });
  
    it('should navigate to the signin page', () => {
      cy.visit('/'); 
      // Click on the "Sign In" button
      cy.contains('Sign In').click();  
      // Verify the URL changes to /signin
      cy.url().should('include', '/signin'); 
      cy.contains('Sign in to your account');
    });
    
    it('should navigate to the signup page', () => {
        cy.visit('/'); 
        // Click on the "Sign Up" button
        cy.contains('Sign Up').click();  
        // Verify the URL changes to /signup
        cy.url().should('include', '/signup'); 
        cy.contains('Sign up to your account');
      });

      it('should sign in with valid credentials', () => {
        cy.visit('/signin'); 
        // Fill in the sign-in form
        cy.get('input[name="email"]').type('test@gmail1.com');
        cy.get('input[name="password"]').type('test123456');
        cy.contains('Sign In').click(); // Click the sign-in button

        cy.contains('Live Sports'); //verify homepage
        cy.url().should('not.include', '/signin'); // Verify that you're not on the sign-in page anymore
    });
});
  