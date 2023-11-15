describe('Homepage', () => {
  it('should display the homepage', () => {
    cy.intercept('POST', 'https://api.petfinder.com/v2/oauth2/token', {
      statusCode: 200,
      body: {
        access_token: 'sampleToken',
        token_type: 'Bearer',
        expires_in: 3600,
      },
    }).as('getToken');

    cy.intercept('https://maps.googleapis.com/maps/api/js*', (req) => {
      req.reply({
        statusCode: 200,
        body: 'console.log("Google Maps API script loaded successfully");',
      });
    }).as('googleMapsAPI');

    cy.intercept('GET', 'https://api.petfinder.com/v2/animals*', 
    {
      statusCode: 200,
      fixture: 'pets.json' 
    }
  ).as('getPetResults');

    cy.visit('http://localhost:3000');

    cy.wait('@getToken');
    cy.wait('@googleMapsAPI');
    cy.wait('@getPetResults');

    cy.url().should('eq', 'http://localhost:3000/');
    cy.get('.header').should('exist');

    cy.get('.header').contains('Home');
  })
    it('test a wildcard page', () => {
      cy.visit('http://localhost:3000/test');
      cy.get('.header').should('exist');
      cy.get('.not-found-hound').should('exist');
  });
});
