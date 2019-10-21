describe('Logout', function() {
    it('Logout from app', function() {
        cy.login('nagp31@test.com', 'Test@123');
        cy.get('#profile').click();
        cy.get('#logout').click();
    });
});