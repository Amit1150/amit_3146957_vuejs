var id = new Date().valueOf();
const article = {
    title: `Auto_${id}`,
    description: `desc_${id}`,
    body: `body_${id}`,
    tags: 'cy,test'
};
const comment = `comment_${id}`;

const baseUrl = 'https://conduit.productionready.io/api/';

describe('Article', function() {

    it('Create New Article', function() {
        cy.login('nagp31@test.com', 'Test@123');
        cy.get('#add-article').click();
        cy.get('#title').type(article.title);
        cy.get('#descrition').type(article.description);
        cy.get('#body').type(article.body);
        cy.get('#tags').type(article.tags);
        cy.get('form').find('button').click();
    });

    it('View My Article', function() {
        cy.get('.card-title:first').find('a').click();
    });

    it('Add Comment', function() {
        cy.get('#comment').type(comment);
        cy.server().route('POST', `${baseUrl}/articles/**`).as('reqComplete');
        cy.get('#post-comment').click();
        cy.wait('@reqComplete').its('status').should('be', 200);
    });

    it('Delete Comment', function() {
        cy.server().route('DELETE', `${baseUrl}/articles/**`).as('reqComplete');
        cy.get('.delete-comment:last').click();
        cy.wait('@reqComplete').its('status').should('be', 200);
    });

    it('Edit Article', function() {
        cy.get('#edit-article').click();
    });

    it('Update Article', function() {
        cy.get('#title').clear().type(`New_${article.title}`);
        cy.get('#descrition').clear().type(`New_${article.description}`);
        cy.get('#body').clear().type(`New_${article.body}`);
        cy.server().route('PUT', `${baseUrl}/articles/**`).as('reqComplete');
        cy.get('form').find('button').click();
        cy.wait('@reqComplete').its('status').should('be', 200);
    });

    it('View My Article', function() {
        cy.get('.card-title:first').find('a').click();
    });

    it('Toggle Favorite Article', function() {
        cy.server().route('POST', `${baseUrl}/articles/**`).as('reqComplete');
        cy.get('#fav-article').click();
        cy.wait('@reqComplete').its('status').should('be', 200);
    });

    it('Delete Article', function(){
        cy.get('#delete-article').click();
    });

    it('View Article By Tag', function() {
        cy.get('#tag-container').find('a:first').click();
    });

    it('View Global Article', function() {
        cy.get('#global-articles').click();
    });

    it('Toggle Favorite Top 5 Article', function() {
        cy.get('button.fav-count:lt(5)')
            .click({multiple: true});
    });

    it('View Favorite Article', function() {
        cy.get('#fav-articles').click();
    });
})