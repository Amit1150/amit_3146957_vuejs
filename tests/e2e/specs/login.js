describe('login', () => {
    it('should successfully log into our app', () => {
        cy.visit('#/login');
        cy.contains('h1', 'Sign in');
        cy.get('#email').type('nagp31@test.com');
        cy.get('#password').type('Test@123');
        cy.get('form').find('button').click();
    })
  })